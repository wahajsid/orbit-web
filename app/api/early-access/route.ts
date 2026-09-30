/* Access requests (owner decision 2026-09-30: Hysaab is invite-only).
   Was the waitlist signup; the body it accepted still works unchanged
   (email, company, accounting_system, name, website, loadedAt), so older
   callers keep working. New fields: role, country, monthly_volume,
   locale ("en" | "ar"), source ("access-page", …).

   Spam heuristics (honeypot + timing, both answered with a decoy success
   so bots cannot learn), business-email guard, then the store:

   1. RPC request_access(p jsonb) (supabase/early_access_v2.sql). A
      SECURITY DEFINER function, so the anon key can insert and read back
      ONLY the new row's reference; the table stays insert-only. A repeat
      email returns { already: true } and no reference.
   2. Migration not run yet: plain insert-only write with the anon key.
      If PostgREST rejects an unknown column (PGRST204 / 42703) the row
      is retried with the old columns only, and the extra fields travel
      in the internal notification instead. 409 on the lower(email)
      unique index = already requested. The reference then comes from
      the row count when the table can be counted, else none is shown.

   Emails: the requester gets "request received" (EN or AR, with the
   reference); SIGNUP_CC gets a separate internal note with every field.
   A repeat request sends nothing and reveals nothing beyond "we already
   have your request".

   Env (Vercel project): SUPABASE_URL, SUPABASE_ANON_KEY, RESEND_API_KEY,
   EMAIL_FROM, EMAIL_REPLY_TO, SIGNUP_CC, APPROVE_SECRET. */

import { NextRequest, NextResponse } from "next/server";
import { PERSONAL_WEBMAIL, DISPOSABLE, emailDomainOf } from "@/lib/email-domains";
import { requestReceivedEmail, accessRequestNoticeEmail } from "@/lib/emails";
import { sendMail, SIGNUP_CC } from "@/lib/mail";
import { SYSTEMS, VOLUMES, COUNTRIES, ROLES, formatRef, REF_RE } from "@/lib/access";

export const runtime = "nodejs";

const MIN_SUBMIT_MS = 1500;

const ERR = {
  en: {
    email: "A valid email is required.",
    disposable: "Please use a real, permanent email address. Disposable addresses are not accepted.",
    personal: "Hysaab is for companies. Please use your work email address.",
    store: "We could not record your request. Email info@hysaab.ai and a person will add it by hand.",
  },
  /* AR-REVIEW: the route's error messages. */
  ar: {
    email: "يلزم إدخال بريد إلكتروني صحيح.",
    disposable: "يُرجى استخدام عنوان بريد حقيقي ودائم. لا نقبل العناوين المؤقتة.",
    personal: "Hysaab للشركات. يُرجى استخدام بريد العمل.",
    store: "تعذّر تسجيل طلبك. راسلنا على info@hysaab.ai وسيضيفه أحد أفراد الفريق يدويًا.",
  },
} as const;

function sb(path: string, init: RequestInit = {}) {
  return fetch(`${process.env.SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: process.env.SUPABASE_ANON_KEY ?? "",
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY ?? ""}`,
      ...(init.headers ?? {}),
    },
  });
}

/** Rows the anon key can count. Under the insert-only policy this reads 0. */
async function countRows(): Promise<number | null> {
  try {
    const r = await sb("early_access?select=id", { headers: { Prefer: "count=exact", Range: "0-0" } });
    if (!r.ok && r.status !== 206) return null;
    const n = Number((r.headers.get("content-range") ?? "").split("/")[1]);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

/** PostgREST's "no such column" (schema cache) or Postgres undefined_column. */
function isUnknownColumn(status: number, text: string): boolean {
  if (status !== 400) return false;
  try {
    const j = JSON.parse(text) as { code?: string; message?: string };
    if (j.code === "PGRST204" || j.code === "42703") return true;
    return /column/i.test(j.message ?? "");
  } catch {
    return /column/i.test(text);
  }
}

type Row = Record<string, string | null>;
type Stored = { already: boolean; ref: string | null; mode: "rpc" | "insert" | "insert-legacy" | "insert-minimal" };

async function viaRpc(row: Row): Promise<Stored | null> {
  try {
    const r = await sb("rpc/request_access", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ p: row }) });
    if (!r.ok) {
      const t = await r.text();
      // 404 PGRST202 = function not created yet: expected until the migration runs.
      if (r.status !== 404) console.error("[early-access] rpc failed, falling back to insert:", r.status, t.slice(0, 300));
      return null;
    }
    const j = (await r.json()) as { ref?: string | null; already?: boolean };
    const ref = typeof j?.ref === "string" && REF_RE.test(j.ref) ? j.ref : null;
    return { already: !!j?.already, ref, mode: "rpc" };
  } catch (e) {
    console.error("[early-access] rpc error, falling back to insert:", e instanceof Error ? e.message : e);
    return null;
  }
}

async function viaInsert(row: Row): Promise<Stored | "error"> {
  const insert = (r: Row) =>
    sb("early_access", { method: "POST", headers: { "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify(r) });
  const legacy: Row = { name: row.name, email: row.email, company: row.company, accounting_system: row.accounting_system };
  const minimal: Row = { name: row.name, email: row.email, company: row.company };
  const attempts: [Row, Stored["mode"]][] = [[row, "insert"], [legacy, "insert-legacy"], [minimal, "insert-minimal"]];
  try {
    for (const [body, mode] of attempts) {
      const r = await insert(body);
      if (r.status === 409) return { already: true, ref: null, mode };
      if (r.ok) {
        const n = await countRows();
        return { already: false, ref: n && n > 0 ? formatRef(n) : null, mode };
      }
      const t = await r.text();
      if (!isUnknownColumn(r.status, t)) {
        console.error("[early-access] insert failed:", r.status, t.slice(0, 300));
        return "error";
      }
      // Column not migrated yet: keep the request, drop the new fields,
      // and log so the owner runs supabase/early_access_v2.sql.
      console.error(`[early-access] insert (${mode}) hit a missing column, retrying with fewer:`, t.slice(0, 200));
    }
    return "error";
  } catch (e) {
    console.error("[early-access] insert error:", e instanceof Error ? e.message : e);
    return "error";
  }
}

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-approve-secret");
  if (!process.env.APPROVE_SECRET || secret !== process.env.APPROVE_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const r = await sb("early_access?select=*&order=created_at.desc");
    if (!r.ok) return NextResponse.json({ error: "could not fetch list" }, { status: 502 });
    const rows = await r.json();
    return NextResponse.json({ count: rows.length, users: rows });
  } catch {
    return NextResponse.json({ error: "could not fetch list" }, { status: 502 });
  }
}

const pick = (raw: unknown, allowed: Set<string>, fallback: string | null = null) => {
  const v = String(raw ?? "").trim();
  return allowed.has(v) ? v : v ? fallback : null;
};

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* empty body → validation below rejects */ }

  const locale = body?.locale === "ar" ? "ar" : "en";
  const e = ERR[locale];
  const name = String(body?.name ?? "").trim().slice(0, 200);
  const email = String(body?.email ?? "").trim().slice(0, 320);
  const company = String(body?.company ?? "").trim().slice(0, 200);
  const accounting_system = pick(body?.accounting_system, SYSTEMS, "Other");
  const role = pick(body?.role, ROLES, "Other");
  const country = pick(body?.country, COUNTRIES, "Other");
  const monthly_volume = pick(body?.monthly_volume, VOLUMES);
  const source = String(body?.source ?? "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40) || "site";
  const website = String(body?.website ?? "");          // honeypot
  const loadedAt = Number(body?.loadedAt);

  // Spam heuristics: decoy success so bots don't learn which signal tripped.
  if (website.trim()) return NextResponse.json({ ok: true });
  if (Number.isFinite(loadedAt) && Date.now() - loadedAt < MIN_SUBMIT_MS) return NextResponse.json({ ok: true });

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: e.email, field: "email" }, { status: 400 });
  }
  const domain = emailDomainOf(email);
  if (domain && DISPOSABLE.has(domain)) return NextResponse.json({ error: e.disposable, field: "email" }, { status: 400 });
  if (domain && PERSONAL_WEBMAIL.has(domain)) return NextResponse.json({ error: e.personal, field: "email" }, { status: 400 });

  const row: Row = { name: name || null, email, company, accounting_system, role, country, monthly_volume, locale, source };

  const stored = (await viaRpc(row)) ?? (await viaInsert(row));
  if (stored === "error") return NextResponse.json({ error: e.store }, { status: 502 });

  // A repeat request: the same confirmation, nothing more, no email.
  if (stored.already) return NextResponse.json({ ok: true, already: true });

  // The request is saved, so a mail failure never breaks the response;
  // it is logged and reported (emailed:false).
  const mail = requestReceivedEmail({ ref: stored.ref, name, locale });
  const sent = await sendMail({ to: email, ...mail });
  if (!sent.ok) console.error("[early-access] request-received email failed:", sent.error);

  const notice = accessRequestNoticeEmail({
    ref: stored.ref, name, email, company, accounting_system, role, country, monthly_volume, locale, source,
    stored: stored.mode, emailed: sent.ok,
  });
  const internal = await sendMail({ to: SIGNUP_CC, reply_to: email, unsubscribe: false, ...notice });
  if (!internal.ok) console.error("[early-access] internal notice failed:", internal.error);

  return NextResponse.json({ ok: true, ref: stored.ref, emailed: sent.ok, emailError: sent.ok ? null : sent.error });
}

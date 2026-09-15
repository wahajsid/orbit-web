/* Waitlist signup. Spam heuristics (honeypot + timing, both rejected with a
   decoy success so bots cannot learn), business-email guard, insert-only
   Supabase write with 409 dedupe, then the welcome email via Resend with
   the seat number. Env (Vercel project): SUPABASE_URL, SUPABASE_ANON_KEY,
   RESEND_API_KEY, EMAIL_FROM, EMAIL_REPLY_TO, SIGNUP_CC, APPROVE_SECRET.

   Table early_access: name (nullable), email (unique on lower), company,
   accounting_system (added 2026-09 for the Hysaab form), created_at. */

import { NextRequest, NextResponse } from "next/server";
import { PERSONAL_WEBMAIL, DISPOSABLE, emailDomainOf } from "@/lib/email-domains";
import { welcomeEmail } from "@/lib/emails";
import { sendMail, SIGNUP_CC } from "@/lib/mail";
import { SEAT_BASE, FOUNDING_SEATS } from "@/lib/launch";

export const runtime = "nodejs";

const MIN_SUBMIT_MS = 1500;
const SYSTEMS = new Set(["Zoho Books", "QuickBooks", "Xero", "Tally", "Spreadsheets", "Other"]);

function sb(path: string, init: RequestInit = {}) {
  return fetch(`${process.env.SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: process.env.SUPABASE_ANON_KEY ?? "",
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY ?? ""}`,
      ...(init.headers ?? {}),
    },
  });
}

async function countSignups(): Promise<number | null> {
  try {
    const r = await sb("early_access?select=id", { headers: { Prefer: "count=exact", Range: "0-0" }, cache: "no-store" });
    if (!r.ok && r.status !== 206) return null;
    const n = Number((r.headers.get("content-range") ?? "").split("/")[1]);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-approve-secret");
  if (!process.env.APPROVE_SECRET || secret !== process.env.APPROVE_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const r = await sb("early_access?select=name,email,company,accounting_system,created_at&order=created_at.desc", { cache: "no-store" });
    if (!r.ok) return NextResponse.json({ error: "could not fetch list" }, { status: 502 });
    const rows = await r.json();
    return NextResponse.json({ count: rows.length, users: rows });
  } catch {
    return NextResponse.json({ error: "could not fetch list" }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* empty body → validation below rejects */ }

  const name = String(body?.name ?? "").trim().slice(0, 200);
  const email = String(body?.email ?? "").trim().slice(0, 320);
  const company = String(body?.company ?? "").trim().slice(0, 200);
  const systemRaw = String(body?.accounting_system ?? "").trim();
  const accounting_system = SYSTEMS.has(systemRaw) ? systemRaw : systemRaw ? "Other" : null;
  const website = String(body?.website ?? "");          // honeypot
  const loadedAt = Number(body?.loadedAt);

  // Spam heuristics — decoy success so bots don't learn which signal tripped.
  if (website.trim()) return NextResponse.json({ ok: true, seat: SEAT_BASE + 1 });
  if (Number.isFinite(loadedAt) && Date.now() - loadedAt < MIN_SUBMIT_MS) return NextResponse.json({ ok: true, seat: SEAT_BASE + 1 });

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  const domain = emailDomainOf(email);
  if (domain && DISPOSABLE.has(domain)) {
    return NextResponse.json({ error: "Please use a real, permanent email address. Disposable addresses are not accepted." }, { status: 400 });
  }
  if (domain && PERSONAL_WEBMAIL.has(domain)) {
    return NextResponse.json({ error: "Hysaab is for companies. Please sign up with your work email address." }, { status: 400 });
  }

  // 1) Store the lead (anon key honours the insert-only RLS policy; unique
  //    index on lower(email) → repeat signup returns 409 = already listed).
  let already = false;
  try {
    const insert = (row: Record<string, unknown>) =>
      sb("early_access", { method: "POST", headers: { "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify(row) });
    let r = await insert({ name: name || null, email, company, accounting_system });
    if (r.status === 400) {
      // Column not migrated yet (PGRST204): keep the signup, drop the field,
      // and log so the owner runs the ALTER TABLE.
      console.error("[early-access] insert 400, retrying without accounting_system:", (await r.text()).slice(0, 200));
      r = await insert({ name: name || null, email, company });
    }
    if (r.status === 409) already = true;
    else if (!r.ok) {
      console.error("[early-access] insert failed:", r.status, (await r.text()).slice(0, 300));
      return NextResponse.json({ error: "We could not record your entry. Email info@hysaab.ai and a person will add you by hand." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "We could not record your entry. Email info@hysaab.ai and a person will add you by hand." }, { status: 502 });
  }

  // 2) Seat number = base + rows now in the table (the row just written
  //    included), capped at the last founding seat.
  const count = await countSignups();
  const seat = Math.min(SEAT_BASE + (count ?? 1), FOUNDING_SEATS);
  if (already) return NextResponse.json({ ok: true, already: true, seat });

  // 3) Welcome email — the signup is already saved, so a mail failure never
  //    breaks the request; it is logged and reported (emailed:false).
  const mail = welcomeEmail(seat, company);
  const sent = await sendMail({ to: email, cc: SIGNUP_CC, ...mail });
  if (!sent.ok) console.error("[early-access] welcome email failed:", sent.error);

  return NextResponse.json({ ok: true, seat, emailed: sent.ok, emailError: sent.ok ? null : sent.error });
}

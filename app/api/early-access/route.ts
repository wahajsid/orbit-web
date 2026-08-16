/* Early-access signup — Next.js port of the original api/early-access.js
   serverless function. Same behavior: spam heuristics (honeypot + timing,
   both rejected with a decoy success so bots can't learn), business-email
   guard, insert-only Supabase write with 409 dedupe, Resend welcome email.
   Env (Vercel project): SUPABASE_URL, SUPABASE_ANON_KEY, RESEND_API_KEY,
   EMAIL_FROM, EMAIL_REPLY_TO, SIGNUP_CC. */

import { NextRequest, NextResponse } from "next/server";
import { PERSONAL_WEBMAIL, DISPOSABLE, emailDomainOf } from "@/lib/email-domains";
import { WELCOME_HTML, WELCOME_TEXT, WELCOME_SUBJECT } from "@/lib/emails";

export const runtime = "nodejs";

const MIN_SUBMIT_MS = 1500;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* empty body → validation below rejects */ }

  const name = String(body?.name ?? "").trim().slice(0, 200);
  const email = String(body?.email ?? "").trim().slice(0, 320);
  const company = String(body?.company ?? "").trim().slice(0, 200);
  const website = String(body?.website ?? "");          // honeypot
  const loadedAt = Number(body?.loadedAt);

  // Spam heuristics — decoy success so bots don't learn which signal tripped.
  if (website.trim()) return NextResponse.json({ ok: true });
  if (Number.isFinite(loadedAt) && Date.now() - loadedAt < MIN_SUBMIT_MS) return NextResponse.json({ ok: true });

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "valid email required" }, { status: 400 });
  }

  const domain = emailDomainOf(email);
  if (domain && DISPOSABLE.has(domain)) {
    return NextResponse.json({ error: "Please use a real, permanent email address — disposable/temporary addresses aren't accepted." }, { status: 400 });
  }
  if (domain && PERSONAL_WEBMAIL.has(domain)) {
    return NextResponse.json({ error: "Orbit is for companies — please sign up with your work email address." }, { status: 400 });
  }

  // 1) Store the lead (anon key honours the insert-only RLS policy; unique
  //    index on lower(email) → repeat signup returns 409 = already listed).
  try {
    const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/early_access`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_ANON_KEY ?? "",
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY ?? ""}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ name, email, company }),
    });
    if (r.status === 409) return NextResponse.json({ ok: true, already: true });
    if (!r.ok) return NextResponse.json({ error: "could not store signup" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "could not store signup" }, { status: 502 });
  }

  // 2) Welcome email — the signup is already saved, so a mail failure never
  //    breaks the request, but it's logged and reported (emailed:false).
  let emailed = false;
  let emailError: string | null = null;
  if (process.env.RESEND_API_KEY) {
    try {
      const er = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "Orbit <notifications@app.orbitgulf.com>",
          to: email,
          cc: process.env.SIGNUP_CC || "wahajs@simpla.ai",
          reply_to: process.env.EMAIL_REPLY_TO || "info@orbitgulf.com",
          subject: WELCOME_SUBJECT,
          html: WELCOME_HTML,
          text: WELCOME_TEXT,
          headers: { "List-Unsubscribe": "<mailto:info@orbitgulf.com?subject=unsubscribe>" },
        }),
      });
      if (er.ok) emailed = true;
      else {
        emailError = `resend ${er.status}: ${(await er.text()).slice(0, 300)}`;
        console.error("[early-access] welcome email failed:", emailError);
      }
    } catch (e) {
      emailError = `network: ${e instanceof Error ? e.message : e}`;
      console.error("[early-access] welcome email threw:", emailError);
    }
  } else {
    emailError = "RESEND_API_KEY not set";
    console.error("[early-access] " + emailError);
  }

  return NextResponse.json({ ok: true, emailed, emailError });
}

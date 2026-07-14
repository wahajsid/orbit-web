/* Early-access signup — Next.js port of the original api/early-access.js
   serverless function. Same behavior: spam heuristics (honeypot + timing,
   both rejected with a decoy success so bots can't learn), business-email
   guard, insert-only Supabase write with 409 dedupe, Resend welcome email.
   Env (Vercel project): SUPABASE_URL, SUPABASE_ANON_KEY, RESEND_API_KEY,
   EMAIL_FROM, EMAIL_REPLY_TO. */

import { NextRequest, NextResponse } from "next/server";
import { PERSONAL_WEBMAIL, DISPOSABLE, emailDomainOf } from "@/lib/email-domains";

export const runtime = "nodejs";

const MIN_SUBMIT_MS = 1500;

const WELCOME_HTML = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Welcome to Orbit</title></head>
<body style="margin:0;padding:0;background:#f4f6fb;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">You're on the early-access list for Orbit — your books, on autopilot.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:30px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e2e7f2;">
        <tr><td style="background:#16211F;padding:26px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;padding-right:11px;"><div style="width:24px;height:24px;border:2.5px solid #C99A4A;border-radius:50%;"></div></td>
            <td style="vertical-align:middle;"><span style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;color:#F3F1EC;letter-spacing:-0.02em;">Orbit</span><span style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#B8B4A9;padding-left:9px;">Your books, on autopilot</span></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:34px 36px 8px 36px;font-family:Arial,Helvetica,sans-serif;">
          <h1 style="font-size:25px;font-weight:800;color:#1D1D1B;letter-spacing:-0.02em;margin:0 0 14px 0;">Welcome to the movement.</h1>
          <p style="font-size:15px;color:#4A4841;line-height:1.7;margin:0 0 16px 0;">Thank you for requesting early access to Orbit. You've just put your name down for something we care about deeply: making accounting, tax and finance in the Gulf <strong style="color:#1D1D1B;">radically better</strong> — less midnight busywork, more of the judgement and advice that actually move a business.</p>
          <p style="font-size:15px;color:#4A4841;line-height:1.7;margin:0 0 8px 0;">Here's what Orbit does, in a sentence:</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 18px 0;">
            <tr><td style="font-size:14.5px;color:#1D1D1B;line-height:1.7;padding:3px 0;">&#128247;&nbsp;&nbsp;<strong>Snap, forward or just ask.</strong> Receipts on WhatsApp, invoices by email, a thousand PDFs at once.</td></tr>
            <tr><td style="font-size:14.5px;color:#1D1D1B;line-height:1.7;padding:3px 0;">&#129302;&nbsp;&nbsp;<strong>Agents do the thinking.</strong> They code, tax-test, match and post — with a trail you can follow.</td></tr>
            <tr><td style="font-size:14.5px;color:#1D1D1B;line-height:1.7;padding:3px 0;">&#9989;&nbsp;&nbsp;<strong>You supervise what matters.</strong> Orbit proposes; a human gates the decisions that count.</td></tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 20px 0;">
            <tr><td style="background:#F7F5F0;border:1px solid #D8D4CA;border-radius:6px;padding:18px 20px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#A3782C;margin-bottom:6px;">You're early — and that counts</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1D1D1B;line-height:1.6;">The <strong>first 100 sign-ups get Orbit free for a year</strong> (fair-usage policy applies), with founder pricing locked in after that. We open the doors on <strong>20 July 2026</strong>.</div>
            </td></tr>
          </table>
          <p style="font-size:15px;color:#4A4841;line-height:1.7;margin:0 0 22px 0;">We'll be in touch as we bring the founding cohort in, group by group. In the meantime, if you'd like to tell us what you need most, just reply to this email — a real person reads it.</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px 0;"><tr>
            <td style="border-radius:4px;background:#C99A4A;"><a href="https://orbitgulf.com/#product" style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#16211F;text-decoration:none;padding:12px 22px;border-radius:4px;">See how Orbit works &rarr;</a></td>
          </tr></table>
          <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1D1D1B;line-height:1.7;margin:22px 0 4px 0;">Welcome aboard,<br /><span style="font-style:italic;color:#1E5F5A;">— The team behind Orbit</span></p>
        </td></tr>
        <tr><td style="padding:18px 36px 28px 36px;border-top:1px solid #ECEFF6;">
          <p style="font-family:Arial,Helvetica,sans-serif;font-size:11.5px;color:#8A877F;line-height:1.6;margin:14px 0 0 0;">Orbit · The AI finance team for the Gulf · Dubai, UAE<br /><a href="https://orbitgulf.com" style="color:#1E5F5A;text-decoration:none;">orbitgulf.com</a> · <a href="mailto:info@orbitgulf.com" style="color:#1E5F5A;text-decoration:none;">info@orbitgulf.com</a><br />You're receiving this because you requested early access at orbitgulf.com.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

const WELCOME_TEXT = `Welcome to the movement.

Thank you for requesting early access to Orbit. You've put your name down for something we care about deeply: making accounting, tax and finance in the Gulf radically better — less midnight busywork, more of the judgement and advice that move a business.

What Orbit does: snap, forward or just ask (WhatsApp, email, PDFs); agents code, tax-test, match and post with a trail you can follow; you supervise what matters.

You're early — and that counts: the first 100 sign-ups get Orbit free for a year (fair-usage policy applies), founder pricing locked in after. We open the doors on 20 July 2026.

We'll be in touch as we bring the founding cohort in. Reply any time — a real person reads it.

Welcome aboard,
— The team behind Orbit
orbitgulf.com · info@orbitgulf.com`;

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
          reply_to: process.env.EMAIL_REPLY_TO || "info@orbitgulf.com",
          subject: "Welcome to Orbit — you're on the early-access list",
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

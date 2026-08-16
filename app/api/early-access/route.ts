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
<body style="margin:0;padding:0;background:#F3F2F2;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">You just joined the founding cohort — here's what Orbit does and what happens next.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3F2F2;padding:30px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;overflow:hidden;border:2px solid #201E1D;">
        <tr><td style="background:#201E1D;padding:22px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;padding-right:10px;"><div style="width:22px;height:22px;border:2px solid #0E5B3A;border-radius:50%;"></div></td>
            <td style="vertical-align:middle;"><span style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:800;color:#F3F2F2;letter-spacing:0.06em;">ORBIT</span></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:32px 36px 8px 36px;font-family:Arial,Helvetica,sans-serif;">
          <h1 style="font-size:22px;font-weight:800;color:#201E1D;letter-spacing:-0.01em;margin:0 0 18px 0;">Welcome to the founding cohort.</h1>
          <p style="font-size:15px;color:#4a4744;line-height:1.7;margin:0 0 16px 0;">We built Orbit because we got tired of the ritual &mdash; chasing receipts over WhatsApp at midnight, reconciling the same bank statement in the same spreadsheet, filing VAT returns we'd already mentally computed, and watching good accountants burn out on work a machine should do.</p>
          <p style="font-size:15px;color:#4a4744;line-height:1.7;margin:0 0 16px 0;">You just joined a group of people who feel the same way. Welcome.</p>
          <p style="font-size:15px;color:#4a4744;line-height:1.7;margin:0 0 8px 0;"><strong style="color:#201E1D;">What you're getting:</strong> AI agents that read documents, code your ledger, test every invoice against FTA rules, reconcile the bank, run the close &mdash; and leave the real decisions to you. Not a replacement for your software (Xero, Zoho, QuickBooks &mdash; we post into what you already use), but a team that makes the month-end shorter and the numbers cleaner.</p>
          <p style="font-size:15px;color:#4a4744;line-height:1.7;margin:16px 0 8px 0;">We wrote down exactly how every piece works &mdash; no jargon, no marketing, just one accountant explaining the system to another:</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px 0;"><tr>
            <td style="background:#0E5B3A;"><a href="https://www.orbitgulf.com/how-it-works" style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#F3F2F2;text-decoration:none;padding:12px 24px;letter-spacing:0.02em;">Read the full walkthrough &rarr;</a></td>
          </tr></table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 20px 0;">
            <tr><td style="background:#F3F2F2;border:2px solid #c9c5bf;padding:16px 20px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:#0E5B3A;margin-bottom:6px;">What happens next</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#201E1D;line-height:1.6;">We're bringing the founding cohort in group by group. Your login is coming soon &mdash; <strong>twelve months free, founder pricing after</strong>. We'll email you the moment it's ready.</div>
            </td></tr>
          </table>
          <p style="font-size:15px;color:#4a4744;line-height:1.7;margin:0 0 20px 0;">Reply to this email with what matters most to you &mdash; AP automation? VAT compliance? The close? We read every one, and it shapes what we build next.</p>
          <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#201E1D;line-height:1.7;margin:0 0 4px 0;">See you inside,<br /><span style="color:#0E5B3A;">&mdash; Wahaj &amp; the Orbit team</span></p>
        </td></tr>
        <tr><td style="padding:16px 36px 24px 36px;border-top:2px solid #c9c5bf;">
          <p style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8a8580;line-height:1.6;margin:10px 0 0 0;">Orbit &middot; Dubai, UAE<br /><a href="https://www.orbitgulf.com" style="color:#0E5B3A;text-decoration:none;">orbitgulf.com</a> &middot; <a href="mailto:info@orbitgulf.com" style="color:#0E5B3A;text-decoration:none;">info@orbitgulf.com</a><br />You're receiving this because you requested early access at orbitgulf.com.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

const WELCOME_TEXT = `Welcome to the founding cohort.

We built Orbit because we got tired of the ritual — chasing receipts over WhatsApp at midnight, reconciling the same bank statement in the same spreadsheet, filing VAT returns we'd already mentally computed, and watching good accountants burn out on work a machine should do.

You just joined a group of people who feel the same way. Welcome.

What you're getting: AI agents that read documents, code your ledger, test every invoice against FTA rules, reconcile the bank, run the close — and leave the real decisions to you. Not a replacement for your software (Xero, Zoho, QuickBooks — we post into what you already use), but a team that makes the month-end shorter and the numbers cleaner.

We wrote down exactly how every piece works — no jargon, no marketing, just one accountant explaining the system to another:
https://www.orbitgulf.com/how-it-works

What happens next: We're bringing the founding cohort in group by group. Your login is coming soon — twelve months free, founder pricing after. We'll email you the moment it's ready.

Reply to this email with what matters most to you — AP automation? VAT compliance? The close? We read every one, and it shapes what we build next.

See you inside,
— Wahaj & the Orbit team
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
          cc: process.env.SIGNUP_CC || "wahajs@simpla.ai",
          reply_to: process.env.EMAIL_REPLY_TO || "info@orbitgulf.com",
          subject: "Welcome to the founding cohort — your books are about to change",
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

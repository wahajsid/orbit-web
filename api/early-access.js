// Vercel serverless function: early-access signup.
// Inserts the row into Supabase (anon, RLS insert-only) AND sends the
// branded welcome email via Resend — server-side, so no key is ever in the
// page. Env (set in the orbit-web Vercel project):
//   SUPABASE_URL, SUPABASE_ANON_KEY, RESEND_API_KEY, EMAIL_FROM, EMAIL_REPLY_TO

const WELCOME_HTML = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Welcome to Orbit</title></head>
<body style="margin:0;padding:0;background:#f4f6fb;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">You're on the early-access list for Orbit — your books, on autopilot.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:30px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e2e7f2;">
        <tr><td style="background:#060911;background-image:linear-gradient(135deg,#0A0F1C,#060911);padding:26px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;padding-right:11px;"><div style="width:24px;height:24px;border:2.5px solid #6EA8FE;border-radius:50%;"></div></td>
            <td style="vertical-align:middle;"><span style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;color:#EAF0FA;letter-spacing:-0.02em;">Orbit</span><span style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#5D6B85;padding-left:9px;">Your books, on autopilot</span></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:34px 36px 8px 36px;font-family:Arial,Helvetica,sans-serif;">
          <h1 style="font-size:25px;font-weight:800;color:#101626;letter-spacing:-0.02em;margin:0 0 14px 0;">Welcome to the movement.</h1>
          <p style="font-size:15px;color:#5A6478;line-height:1.7;margin:0 0 16px 0;">Thank you for requesting early access to Orbit. You've just put your name down for something we care about deeply: making accounting, tax and finance in the Gulf <strong style="color:#101626;">radically better</strong> — less midnight busywork, more of the judgement and advice that actually move a business.</p>
          <p style="font-size:15px;color:#5A6478;line-height:1.7;margin:0 0 8px 0;">Here's what Orbit does, in a sentence:</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 18px 0;">
            <tr><td style="font-size:14.5px;color:#101626;line-height:1.7;padding:3px 0;">&#128247;&nbsp;&nbsp;<strong>Snap, forward or just ask.</strong> Receipts on WhatsApp, invoices by email, a thousand PDFs at once.</td></tr>
            <tr><td style="font-size:14.5px;color:#101626;line-height:1.7;padding:3px 0;">&#129302;&nbsp;&nbsp;<strong>Agents do the thinking.</strong> They code, tax-test, match and post — with a trail you can follow.</td></tr>
            <tr><td style="font-size:14.5px;color:#101626;line-height:1.7;padding:3px 0;">&#9989;&nbsp;&nbsp;<strong>You supervise what matters.</strong> Orbit proposes; a human gates the decisions that count.</td></tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 20px 0;">
            <tr><td style="background:#eef4ff;border:1px solid #cfe0ff;border-radius:14px;padding:18px 20px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#3B6FE0;margin-bottom:6px;">You're early — and that counts</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#101626;line-height:1.6;">The <strong>first 100 sign-ups get Orbit free for a year</strong> (fair-usage policy applies), with founder pricing locked in after that. We open the doors on <strong>01 July 2026</strong>.</div>
            </td></tr>
          </table>
          <p style="font-size:15px;color:#5A6478;line-height:1.7;margin:0 0 22px 0;">We'll be in touch as we bring the founding cohort in, group by group. In the meantime, if you'd like to tell us what you need most, just reply to this email — a real person reads it.</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px 0;"><tr>
            <td style="border-radius:11px;background-image:linear-gradient(135deg,#6EA8FE,#7DD3FC);"><a href="https://orbitgulf.com/#how" style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#06121f;text-decoration:none;padding:12px 22px;border-radius:11px;">See how Orbit works &rarr;</a></td>
          </tr></table>
          <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#101626;line-height:1.7;margin:22px 0 4px 0;">Welcome aboard,<br /><span style="font-style:italic;color:#3B6FE0;">— The team behind Orbit</span></p>
        </td></tr>
        <tr><td style="padding:18px 36px 28px 36px;border-top:1px solid #eceff6;">
          <p style="font-family:Arial,Helvetica,sans-serif;font-size:11.5px;color:#8b94a8;line-height:1.6;margin:14px 0 0 0;">Orbit · The AI finance team for the Gulf · Dubai, UAE<br /><a href="https://orbitgulf.com" style="color:#3B6FE0;text-decoration:none;">orbitgulf.com</a> · <a href="mailto:info@orbitgulf.com" style="color:#3B6FE0;text-decoration:none;">info@orbitgulf.com</a><br />You're receiving this because you requested early access at orbitgulf.com.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

const WELCOME_TEXT = `Welcome to the movement.

Thank you for requesting early access to Orbit. You've put your name down for something we care about deeply: making accounting, tax and finance in the Gulf radically better — less midnight busywork, more of the judgement and advice that move a business.

What Orbit does: snap, forward or just ask (WhatsApp, email, PDFs); agents code, tax-test, match and post with a trail you can follow; you supervise what matters.

You're early — and that counts: the first 100 sign-ups get Orbit free for a year (fair-usage policy applies), founder pricing locked in after. We open the doors on 01 July 2026.

We'll be in touch as we bring the founding cohort in. Reply any time — a real person reads it.

Welcome aboard,
— The team behind Orbit
orbitgulf.com · info@orbitgulf.com`;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body || "{}"); } catch { body = {}; }
  }
  const name = (body?.name || "").toString().trim().slice(0, 200);
  const email = (body?.email || "").toString().trim().slice(0, 320);
  const company = (body?.company || "").toString().trim().slice(0, 200);

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: "valid email required" });
  }

  // 1) Store the lead (anon key honours the insert-only RLS policy).
  try {
    const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/early_access`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        Prefer: "return-minimal",
      },
      body: JSON.stringify({ name, email, company }),
    });
    if (!r.ok) {
      return res.status(502).json({ error: "could not store signup" });
    }
  } catch {
    return res.status(502).json({ error: "could not store signup" });
  }

  // 2) Send the welcome email (best-effort — never fail the signup on this).
  if (process.env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "Orbit <notifications@app.orbitgulf.com>",
          to: email,
          reply_to: process.env.EMAIL_REPLY_TO || "info@orbitgulf.com",
          subject: "Welcome to Orbit — you're on the early-access list",
          html: WELCOME_HTML,
          text: WELCOME_TEXT,
        }),
      });
    } catch {
      // swallow — the signup is already saved
    }
  }

  return res.status(200).json({ ok: true });
};

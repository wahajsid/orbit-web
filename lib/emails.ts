/* Transactional email templates — modernist green design system.
   Shared by /api/early-access (welcome) and /api/approve (account ready).
   All emails: ink header, paper bg, accent CTA, zero radius, 2px rules. */

const HEADER = `<tr><td style="background:#201E1D;padding:22px 32px;">
  <table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td style="vertical-align:middle;padding-right:10px;"><div style="width:22px;height:22px;border:2px solid #0E5B3A;border-radius:50%;"></div></td>
    <td style="vertical-align:middle;"><span style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:800;color:#F3F2F2;letter-spacing:0.06em;">ORBIT</span></td>
  </tr></table>
</td></tr>`;

const FOOTER = `<tr><td style="padding:16px 36px 24px 36px;border-top:2px solid #c9c5bf;">
  <p style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8a8580;line-height:1.6;margin:10px 0 0 0;">Orbit &middot; Dubai, UAE<br /><a href="https://www.orbitgulf.com" style="color:#0E5B3A;text-decoration:none;">orbitgulf.com</a> &middot; <a href="mailto:info@orbitgulf.com" style="color:#0E5B3A;text-decoration:none;">info@orbitgulf.com</a><br />You're receiving this because you requested early access at orbitgulf.com.</p>
</td></tr>`;

function wrap(preheader: string, body: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="color-scheme" content="light only" /><meta name="supported-color-schemes" content="light only" /><title>Orbit</title></head>
<body style="margin:0;padding:0;background:#F3F2F2;color:#201E1D;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3F2F2;padding:30px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;overflow:hidden;border:2px solid #201E1D;">
        ${HEADER}
        <tr><td style="padding:32px 36px 8px 36px;font-family:Arial,Helvetica,sans-serif;">
          ${body}
        </td></tr>
        ${FOOTER}
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function cta(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px 0;"><tr>
    <td style="background:#0E5B3A;"><a href="${href}" style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#F3F2F2;text-decoration:none;padding:12px 24px;letter-spacing:0.02em;">${label}</a></td>
  </tr></table>`;
}

function p(text: string, mb = 16): string {
  return `<p style="font-size:15px;color:#4a4744;line-height:1.7;margin:0 0 ${mb}px 0;">${text}</p>`;
}

function signoff(name: string): string {
  return `<p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#201E1D;line-height:1.7;margin:0 0 4px 0;">${name}<br /><span style="color:#0E5B3A;">&mdash; The Orbit team</span></p>`;
}

function infobox(label: string, content: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 20px 0;">
    <tr><td style="background:#F3F2F2;border:2px solid #c9c5bf;padding:16px 20px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:#0E5B3A;margin-bottom:6px;">${label}</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#201E1D;line-height:1.6;">${content}</div>
    </td></tr>
  </table>`;
}

// ── Email 1: Welcome (waitlist signup) ───────────────────────────────

export const WELCOME_HTML = wrap(
  "You just joined the founding cohort &mdash; here's what Orbit does and what happens next.",
  `<h1 style="font-size:22px;font-weight:800;color:#201E1D;letter-spacing:-0.01em;margin:0 0 18px 0;">Welcome to the founding cohort.</h1>
  ${p("We built Orbit because we got tired of the ritual &mdash; chasing receipts over WhatsApp at midnight, reconciling the same bank statement in the same spreadsheet, filing VAT returns we'd already mentally computed, and watching good accountants burn out on work a machine should do.")}
  ${p("You just joined a group of people who feel the same way. Welcome.")}
  ${p('<strong style="color:#201E1D;">What you\'re getting:</strong> AI agents that read documents, code your ledger, test every invoice against FTA rules, reconcile the bank, run the close &mdash; and leave the real decisions to you. Not a replacement for your software (Xero, Zoho, QuickBooks &mdash; we post into what you already use), but a team that makes the month-end shorter and the numbers cleaner.', 8)}
  ${p("We wrote down exactly how every piece works &mdash; no jargon, no marketing, just one accountant explaining the system to another:", 8)}
  ${cta("https://www.orbitgulf.com/how-it-works", "Read the full walkthrough &rarr;")}
  ${infobox("What happens next", "We're bringing the founding cohort in group by group. Your login is coming soon &mdash; <strong>twelve months free, founder pricing after</strong>. We'll email you the moment it's ready.")}
  ${p("Reply to this email with what matters most to you &mdash; AP automation? VAT compliance? The close? We read every one, and it shapes what we build next.", 20)}
  ${signoff("See you inside.")}`
);

export const WELCOME_TEXT = `Welcome to the founding cohort.

We built Orbit because we got tired of the ritual — chasing receipts over WhatsApp at midnight, reconciling the same bank statement in the same spreadsheet, filing VAT returns we'd already mentally computed, and watching good accountants burn out on work a machine should do.

You just joined a group of people who feel the same way. Welcome.

What you're getting: AI agents that read documents, code your ledger, test every invoice against FTA rules, reconcile the bank, run the close — and leave the real decisions to you. Not a replacement for your software (Xero, Zoho, QuickBooks — we post into what you already use), but a team that makes the month-end shorter and the numbers cleaner.

We wrote down exactly how every piece works — no jargon, no marketing, just one accountant explaining the system to another:
https://www.orbitgulf.com/how-it-works

What happens next: We're bringing the founding cohort in group by group. Your login is coming soon — twelve months free, founder pricing after. We'll email you the moment it's ready.

Reply to this email with what matters most to you — AP automation? VAT compliance? The close? We read every one, and it shapes what we build next.

See you inside.
— The Orbit team
orbitgulf.com · info@orbitgulf.com`;

export const WELCOME_SUBJECT = "Welcome to the founding cohort — your books are about to change";

// ── Email 2: Account ready (login credentials) ──────────────────────

export const APPROVED_HTML = wrap(
  "Your Orbit account is live — sign in and start sending documents.",
  `<h1 style="font-size:22px;font-weight:800;color:#201E1D;letter-spacing:-0.01em;margin:0 0 18px 0;">Your account is ready.</h1>
  ${p("The wait is over. Your Orbit account is live, and your founding-cohort year starts now &mdash; twelve months, full access, no card on file.")}
  ${infobox("Your login", 'Sign in at <a href="https://app.orbitgulf.com" style="color:#0E5B3A;font-weight:700;text-decoration:none;">app.orbitgulf.com</a> with this email address. You\'ll set your password on first sign-in.')}
  ${p('<strong style="color:#201E1D;">What to do first:</strong> Send a document. WhatsApp it, email it, or upload it &mdash; a supplier invoice, a receipt, a bank statement. The intake agent picks it up in under three minutes, classifies it, extracts the numbers, and codes it from your posting history. You\'ll see it appear on your dashboard with a confidence score and the evidence attached.', 8)}
  ${p("From there, the system learns your patterns. The more documents you send, the better the coding gets. Within a week, most of your invoices will post without you touching them.", 8)}
  ${p("If you haven't already, here's the full walkthrough of every screen &mdash; written by the accountants who built it:", 8)}
  ${cta("https://www.orbitgulf.com/how-it-works", "How Orbit works &rarr;")}
  ${infobox("Quick-start checklist", '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:13px;"><tr><td style="padding:3px 0;color:#201E1D;">1. Sign in at app.orbitgulf.com</td></tr><tr><td style="padding:3px 0;color:#201E1D;">2. Connect your ledger (Xero, Zoho, QuickBooks &mdash; or skip to use Orbit\'s own books)</td></tr><tr><td style="padding:3px 0;color:#201E1D;">3. Send your first document (WhatsApp, email or upload)</td></tr><tr><td style="padding:3px 0;color:#201E1D;">4. Watch the intake agent code it in real time</td></tr></table>')}
  ${cta("https://app.orbitgulf.com", "Sign in to Orbit &rarr;")}
  ${p("We're here. Reply any time &mdash; same inbox, same humans.", 20)}
  ${signoff("Let's go.")}`
);

export const APPROVED_TEXT = `Your account is ready.

The wait is over. Your Orbit account is live, and your founding-cohort year starts now — twelve months, full access, no card on file.

Sign in at app.orbitgulf.com with this email address. You'll set your password on first sign-in.

What to do first: Send a document. WhatsApp it, email it, or upload it — a supplier invoice, a receipt, a bank statement. The intake agent picks it up in under three minutes, classifies it, extracts the numbers, and codes it from your posting history. You'll see it appear on your dashboard with a confidence score and the evidence attached.

From there, the system learns your patterns. The more documents you send, the better the coding gets. Within a week, most of your invoices will post without you touching them.

If you haven't already, here's the full walkthrough of every screen:
https://www.orbitgulf.com/how-it-works

Quick-start checklist:
1. Sign in at app.orbitgulf.com
2. Connect your ledger (Xero, Zoho, QuickBooks — or skip to use Orbit's own books)
3. Send your first document (WhatsApp, email or upload)
4. Watch the intake agent code it in real time

We're here. Reply any time — same inbox, same humans.

Let's go.
— The Orbit team
orbitgulf.com · info@orbitgulf.com`;

export const APPROVED_SUBJECT = "Your Orbit account is live — sign in and start";

/* Transactional + broadcast email templates, Hysaab brand (navy & blush).
   Shared by /api/early-access (welcome), /api/approve (account ready),
   /api/contact (enquiry to the team) and /api/broadcast (launch + updates).
   All emails: navy header with the lockup, cream ground, white card with a
   2px navy frame, navy CTA, zero radius. No em dashes anywhere. */

export const SITE = "https://hysaab.ai";
export const APP = "https://app.hysaab.ai";
export const INFO = "info@hysaab.ai";

/* The header is one retina image (1152x416, shown at 576x208): the brand-guide
   cover set at email width. Source: brand/email-header-source.html, rendered
   with headless Chrome at 2x. The navy cell and styled alt text carry the
   brand when a client blocks images. */
export const EMAIL_HEADER_IMG = `${SITE}/brand/hysaab-email-header-1152x416.png`;
export const EMAIL_HEADER_ALT = "hysaab.ai. Your shared service team of finance agents.";

const HEADER = `<tr><td style="background:#122940;padding:0;line-height:0;font-size:0;">
  <a href="${SITE}" style="text-decoration:none;display:block;"><img src="${EMAIL_HEADER_IMG}" width="576" alt="${EMAIL_HEADER_ALT}" style="display:block;border:0;width:100%;max-width:576px;height:auto;background:#122940;color:#FBF7F0;font-family:Archivo,Arial,Helvetica,sans-serif;font-size:18px;font-weight:500;line-height:1.3;" /></a>
</td></tr>`;

const FOOTER = (reason: string) => `<tr><td style="padding:16px 36px 24px 36px;border-top:2px solid #ddd6cb;">
  <p style="font-family:Archivo,Arial,Helvetica,sans-serif;font-size:11px;color:#6B6560;line-height:1.6;margin:10px 0 0 0;">Hysaab &middot; Dubai, UAE<br /><a href="${SITE}" style="color:#122940;text-decoration:none;">hysaab.ai</a> &middot; <a href="mailto:${INFO}" style="color:#122940;text-decoration:none;">${INFO}</a><br />${reason}</p>
</td></tr>`;

function wrap(preheader: string, body: string, reason = "You are receiving this because you joined the waitlist at hysaab.ai."): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="color-scheme" content="light only" /><meta name="supported-color-schemes" content="light only" /><title>Hysaab</title></head>
<body style="margin:0;padding:0;background:#FBF7F0;color:#201e1d;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FBF7F0;padding:30px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;overflow:hidden;border:2px solid #122940;">
        ${HEADER}
        <tr><td style="padding:32px 36px 8px 36px;font-family:Archivo,Arial,Helvetica,sans-serif;">
          ${body}
        </td></tr>
        ${FOOTER(reason)}
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function cta(href: string, label: string, blush = false): string {
  const bg = blush ? "#E4A1A0" : "#122940";
  const fg = blush ? "#122940" : "#FBF7F0";
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px 0;"><tr>
    <td style="background:${bg};"><a href="${href}" style="display:inline-block;font-family:Archivo,Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:${fg};text-decoration:none;padding:12px 24px;letter-spacing:0.02em;">${label}</a></td>
  </tr></table>`;
}

function h1(text: string): string {
  return `<h1 style="font-family:Archivo,Arial,Helvetica,sans-serif;font-size:24px;font-weight:600;color:#122940;letter-spacing:-0.02em;line-height:1.15;margin:0 0 18px 0;">${text}</h1>`;
}

function kicker(text: string): string {
  return `<p style="font-family:Archivo,Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#9A5150;margin:0 0 12px 0;">${text}</p>`;
}

function p(text: string, mb = 16): string {
  return `<p style="font-family:Archivo,Arial,Helvetica,sans-serif;font-size:15px;color:#4a4746;line-height:1.7;margin:0 0 ${mb}px 0;">${text}</p>`;
}

function signoff(line: string): string {
  return `<p style="font-family:Archivo,Arial,Helvetica,sans-serif;font-size:15px;color:#122940;line-height:1.7;margin:0 0 4px 0;">${line}<br /><span style="color:#122940;">The Hysaab team</span></p>`;
}

function infobox(label: string, content: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 20px 0;">
    <tr><td style="background:#FBF7F0;border:1px solid #ddd6cb;padding:16px 20px;">
      <div style="font-family:Archivo,Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9A5150;margin-bottom:6px;">${label}</div>
      <div style="font-family:Archivo,Arial,Helvetica,sans-serif;font-size:14px;color:#201e1d;line-height:1.6;">${content}</div>
    </td></tr>
  </table>`;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const TEXT_FOOT = `The Hysaab team
hysaab.ai · ${INFO}`;

// ── Email 1: Welcome (waitlist signup) ───────────────────────────────

export function welcomeEmail(seat: number, company: string) {
  const who = company ? ` for ${esc(company)}` : "";
  return {
    subject: `You are number ${seat} on the Hysaab list`,
    html: wrap(
      `Entry ${seat} recorded${who}. Here is what Hysaab does and what happens next.`,
      `${kicker("Founding cohort")}
      ${h1(`You are number ${seat} on the list.`)}
      ${p(`Entry ${seat} is recorded${who}. A real person reads every entry and replies within one working day, and this is the note that goes out first.`)}
      ${p("We built Hysaab because we lived the close: twenty working days of a month, then five nights of catching up on them. Receipts in a drawer, a supplier invoice keyed three times, a bank line nobody could explain, carried forward because the deadline came first.")}
      ${p('<strong style="color:#122940;">What you are getting:</strong> sixteen agents that read every document, code every entry, reconcile every bank line and rebuild your reports overnight, then bring you the two or three calls that are yours to make. They post into what you already use: Zoho Books, Xero, QuickBooks, Odoo, Wafeq and ERPNext.', 8)}
      ${p("We wrote down how every piece works, one accountant explaining the system to another:", 8)}
      ${cta(`${SITE}/how-it-works`, "Read the walkthrough &rarr;")}
      ${infobox("What happens next", "The founding hundred come in group by group before the doors open. Your login arrives by email the moment your seat is ready, with <strong>founder pricing locked in for as long as you stay</strong>.")}
      ${p("Reply to this email with what matters most to you: intake, VAT, the bank, the close. We read every one, and it shapes what we build next.", 20)}
      ${signoff("See you inside.")}`,
    ),
    text: `You are number ${seat} on the list.

Entry ${seat} is recorded${who}. A real person reads every entry and replies within one working day, and this is the note that goes out first.

We built Hysaab because we lived the close: twenty working days of a month, then five nights of catching up on them.

What you are getting: sixteen agents that read every document, code every entry, reconcile every bank line and rebuild your reports overnight, then bring you the two or three calls that are yours to make. They post into what you already use: Zoho Books, Xero, QuickBooks, Odoo, Wafeq and ERPNext.

How every piece works: ${SITE}/how-it-works

What happens next: the founding hundred come in group by group before the doors open. Your login arrives by email the moment your seat is ready, with founder pricing locked in for as long as you stay.

Reply to this email with what matters most to you. We read every one.

See you inside.
${TEXT_FOOT}`,
  };
}

/* Back-compat names used by the early-access route before seats existed. */
export const WELCOME_SUBJECT = "Welcome to the Hysaab founding cohort";
export const WELCOME_HTML = welcomeEmail(0, "").html;
export const WELCOME_TEXT = welcomeEmail(0, "").text;

// ── Email 2: Account ready (login) ───────────────────────────────────

export const APPROVED_SUBJECT = "Your Hysaab workspace is live. Sign in and send a document";

export const APPROVED_HTML = wrap(
  "Your Hysaab workspace is live. Sign in and start sending documents.",
  `${kicker("Founding cohort")}
  ${h1("Your workspace is ready.")}
  ${p("The wait is over. Your Hysaab workspace is live, and your founder pricing is locked from today.")}
  ${infobox("Your login", `Sign in at <a href="${APP}" style="color:#122940;font-weight:700;text-decoration:none;">app.hysaab.ai</a> with this email address. You set your password on first sign-in.`)}
  ${p('<strong style="color:#122940;">What to do first:</strong> send a document. WhatsApp it, email it or upload it: a supplier invoice, a receipt, a bank statement. The intake agent picks it up in minutes, reads it, checks it against the tax-invoice rules and codes it from your own posting history. It appears on your dashboard with a confidence score and the evidence attached.', 8)}
  ${p("From there the agents learn your patterns. Within a week most invoices post without you touching them, and the few that need a human come to you as one plain question.", 8)}
  ${infobox("Quick start", '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:13px;"><tr><td style="padding:3px 0;color:#122940;">1. Sign in at app.hysaab.ai</td></tr><tr><td style="padding:3px 0;color:#122940;">2. Connect your ledger (Zoho Books, Xero, QuickBooks, or keep Hysaab\'s own books)</td></tr><tr><td style="padding:3px 0;color:#122940;">3. Send your first document by WhatsApp, email or upload</td></tr><tr><td style="padding:3px 0;color:#122940;">4. Watch the intake agent read and code it</td></tr></table>')}
  ${cta(APP, "Sign in to Hysaab &rarr;")}
  ${p("We are here. Reply any time: same inbox, same humans.", 20)}
  ${signoff("Let us begin.")}`,
);

export const APPROVED_TEXT = `Your workspace is ready.

The wait is over. Your Hysaab workspace is live, and your founder pricing is locked from today.

Sign in at ${APP} with this email address. You set your password on first sign-in.

What to do first: send a document. WhatsApp it, email it or upload it. The intake agent picks it up in minutes, reads it, checks it against the tax-invoice rules and codes it from your own posting history.

Quick start:
1. Sign in at app.hysaab.ai
2. Connect your ledger (Zoho Books, Xero, QuickBooks, or keep Hysaab's own books)
3. Send your first document by WhatsApp, email or upload
4. Watch the intake agent read and code it

We are here. Reply any time: same inbox, same humans.

Let us begin.
${TEXT_FOOT}`;

// ── Email 3: Launch day (broadcast to the whole list) ────────────────

export const LAUNCH_SUBJECT = "Doors are open. Hysaab is live";

export const LAUNCH_HTML = wrap(
  "Hysaab is live. Create your workspace and bring your ledger with you.",
  `${kicker("Doors are open")}
  ${h1("Hysaab is live.")}
  ${p("Today the doors open. Every company on the founding list can create its workspace now, connect its ledger and send the first document tonight.")}
  ${p("Sixteen agents read every document, code every entry, reconcile every bank line and rebuild your reports overnight. Then they bring you the two or three calls that are yours to make. Nothing crosses a period lock, changes an approval rule or claims tax you have not cleared.", 8)}
  ${cta(`${APP}/signup`, "Create your workspace &rarr;", true)}
  ${infobox("Founder pricing", "Your seat on the founding list carries founder pricing for as long as you stay. Use the same email address you joined with and it is applied automatically.")}
  ${p("If you would rather see it on your own books first, reply to this email and a real person will walk your ledger through it.", 20)}
  ${signoff("Welcome in.")}`,
);

export const LAUNCH_TEXT = `Hysaab is live.

Today the doors open. Every company on the founding list can create its workspace now, connect its ledger and send the first document tonight.

Create your workspace: ${APP}/signup

Founder pricing: your seat on the founding list carries founder pricing for as long as you stay. Use the same email address you joined with and it is applied automatically.

If you would rather see it on your own books first, reply to this email and a real person will walk your ledger through it.

Welcome in.
${TEXT_FOOT}`;

// ── Email 4: New post / update (broadcast, parameterised) ────────────

export function updateEmail(input: { title: string; intro: string; body?: string; href: string; cta?: string; kicker?: string }) {
  const paragraphs = (input.body ?? "").split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
  return {
    subject: input.title,
    html: wrap(
      esc(input.intro),
      `${kicker(esc(input.kicker ?? "New from Hysaab"))}
      ${h1(esc(input.title))}
      ${p(esc(input.intro))}
      ${paragraphs.map((t) => p(esc(t), 12)).join("\n")}
      ${cta(input.href, `${esc(input.cta ?? "Read the post")} &rarr;`)}
      ${signoff("Until next time.")}`,
    ),
    text: `${input.title}

${input.intro}

${paragraphs.join("\n\n")}

${input.cta ?? "Read the post"}: ${input.href}

Until next time.
${TEXT_FOOT}`,
  };
}

// ── Email 5: Enquiry (internal, from the footer contact form) ────────

export function enquiryEmail(input: { name: string; email: string; system: string; notes: string }) {
  const rows = [
    ["Name", input.name],
    ["Email", input.email],
    ["Accounting system", input.system || "not given"],
  ]
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;font-size:13px;color:#6B6560;white-space:nowrap;vertical-align:top;">${k}</td><td style="padding:4px 0;font-size:14px;color:#201e1d;">${esc(v)}</td></tr>`)
    .join("");
  return {
    subject: `Enquiry from ${input.name} (${input.email})`,
    html: wrap(
      `${esc(input.name)} asked a question on hysaab.ai.`,
      `${kicker("hysaab.ai enquiry")}
      ${h1("Someone asked a question.")}
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 16px 0;font-family:Archivo,Arial,Helvetica,sans-serif;">${rows}</table>
      ${infobox("Notes", esc(input.notes).replace(/\n/g, "<br />"))}
      ${p("Reply to this email and it goes straight to them.", 4)}`,
      "Sent by the enquiry form on hysaab.ai.",
    ),
    text: `Enquiry from hysaab.ai

Name: ${input.name}
Email: ${input.email}
Accounting system: ${input.system || "not given"}

Notes:
${input.notes}

Reply to this email and it goes straight to them.`,
  };
}

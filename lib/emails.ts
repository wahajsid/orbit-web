/* Transactional + broadcast email templates, Hysaab brand (Tick & Tie: ink, paper, highlighter, review red).
   Shared by /api/early-access (welcome), /api/approve (account ready),
   /api/contact (enquiry to the team) and /api/broadcast (launch + updates).
   All emails: navy header with the lockup, cream ground, white card with a
   2px navy frame, navy CTA, zero radius. No em dashes anywhere. */

import { DEMO_URL } from "./demo";

export const SITE = "https://hysaab.ai";
export const APP = "https://app.hysaab.ai";
export const INFO = "info@hysaab.ai";

/* The header is one retina image (1152x416, shown at 576x208): the brand-guide
   cover set at email width. Source: brand/email-header-source.html, rendered
   with headless Chrome at 2x. The navy cell and styled alt text carry the
   brand when a client blocks images. */
export const EMAIL_HEADER_IMG = `${SITE}/brand/hysaab-email-header-1152x416.png`;
export const EMAIL_HEADER_ALT = "hysaab.ai. Your shared service team of finance agents.";

const HEADER = `<tr><td style="background:#111418;padding:0;line-height:0;font-size:0;">
  <a href="${SITE}" style="text-decoration:none;display:block;"><img src="${EMAIL_HEADER_IMG}" width="576" alt="${EMAIL_HEADER_ALT}" style="display:block;border:0;width:100%;max-width:576px;height:auto;background:#111418;color:#F4F4F1;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:500;line-height:1.3;" /></a>
</td></tr>`;

const FOOTER = (reason: string, dir = "ltr") => `<tr><td dir="${dir}" style="padding:16px 36px 24px 36px;border-top:2px solid #E3E3DE;text-align:${dir === "rtl" ? "right" : "left"};">
  <p style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#4E545D;line-height:1.6;margin:10px 0 0 0;">Hysaab &middot; Dubai, UAE<br /><a href="${SITE}" style="color:#111418;text-decoration:none;">hysaab.ai</a> &middot; <a href="mailto:${INFO}" style="color:#111418;text-decoration:none;">${INFO}</a><br />${reason}</p>
</td></tr>`;

function wrap(preheader: string, body: string, reason = "You are receiving this because you joined the waitlist at hysaab.ai.", lang: "en" | "ar" = "en"): string {
  const dir = lang === "ar" ? "rtl" : "ltr";
  return `<!doctype html>
<html lang="${lang}" dir="${dir}"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="color-scheme" content="light only" /><meta name="supported-color-schemes" content="light only" /><title>Hysaab</title></head>
<body style="margin:0;padding:0;background:#F4F4F1;color:#111418;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F1;padding:30px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;overflow:hidden;border:2px solid #111418;">
        ${HEADER}
        <tr><td dir="${dir}" style="padding:32px 36px 8px 36px;font-family:Arial,Helvetica,sans-serif;text-align:${lang === "ar" ? "right" : "left"};">
          ${body}
        </td></tr>
        ${FOOTER(reason, dir)}
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function cta(href: string, label: string, blush = false): string {
  const bg = blush ? "#FFE55C" : "#111418";
  const fg = blush ? "#111418" : "#F4F4F1";
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px 0;"><tr>
    <td style="background:${bg};"><a href="${href}" style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:${fg};text-decoration:none;padding:12px 24px;letter-spacing:0.02em;">${label}</a></td>
  </tr></table>`;
}

function h1(text: string): string {
  return `<h1 style="font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:600;color:#111418;letter-spacing:-0.02em;line-height:1.15;margin:0 0 18px 0;">${text}</h1>`;
}

function kicker(text: string): string {
  return `<p style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#B32720;margin:0 0 12px 0;">${text}</p>`;
}

function p(text: string, mb = 16): string {
  return `<p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#4E545D;line-height:1.7;margin:0 0 ${mb}px 0;">${text}</p>`;
}

function signoff(line: string): string {
  return `<p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#111418;line-height:1.7;margin:0 0 4px 0;">${line}<br /><span style="color:#111418;">The Hysaab team</span></p>`;
}

function infobox(label: string, content: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 20px 0;">
    <tr><td style="background:#F4F4F1;border:1px solid #E3E3DE;padding:16px 20px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#B32720;margin-bottom:6px;">${label}</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111418;line-height:1.6;">${content}</div>
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
      ${p('<strong style="color:#111418;">What you are getting:</strong> sixteen agents that read every document, code every entry, reconcile every bank line and rebuild your reports overnight, then bring you the two or three calls that are yours to make. They post into what you already use: Zoho Books, Xero, QuickBooks, Odoo, Wafeq and ERPNext.', 8)}
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
  ${infobox("Your login", `Sign in at <a href="${APP}" style="color:#111418;font-weight:700;text-decoration:none;">app.hysaab.ai</a> with this email address. You set your password on first sign-in.`)}
  ${p('<strong style="color:#111418;">What to do first:</strong> send a document. WhatsApp it, email it or upload it: a supplier invoice, a receipt, a bank statement. The intake agent picks it up in minutes, reads it, checks it against the tax-invoice rules and codes it from your own posting history. It appears on your dashboard with a confidence score and the evidence attached.', 8)}
  ${p("From there the agents learn your patterns. Within a week most invoices post without you touching them, and the few that need a human come to you as one plain question.", 8)}
  ${infobox("Quick start", '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:13px;"><tr><td style="padding:3px 0;color:#111418;">1. Sign in at app.hysaab.ai</td></tr><tr><td style="padding:3px 0;color:#111418;">2. Connect your ledger (Zoho Books, Xero, QuickBooks, or keep Hysaab\'s own books)</td></tr><tr><td style="padding:3px 0;color:#111418;">3. Send your first document by WhatsApp, email or upload</td></tr><tr><td style="padding:3px 0;color:#111418;">4. Watch the intake agent read and code it</td></tr></table>')}
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

export function enquiryEmail(input: { name: string; email: string; role?: string; system: string; notes: string }) {
  const rows = [
    ["Name", input.name],
    ["Email", input.email],
    ["I am a", input.role || "not given"],
    ["Accounting system", input.system || "not given"],
  ]
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;font-size:13px;color:#4E545D;white-space:nowrap;vertical-align:top;">${k}</td><td style="padding:4px 0;font-size:14px;color:#111418;">${esc(v)}</td></tr>`)
    .join("");
  return {
    subject: `Enquiry from ${input.name} (${input.email})`,
    html: wrap(
      `${esc(input.name)} asked a question on hysaab.ai.`,
      `${kicker("hysaab.ai enquiry")}
      ${h1("Someone asked a question.")}
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;">${rows}</table>
      ${infobox("Notes", esc(input.notes).replace(/\n/g, "<br />"))}
      ${p("Reply to this email and it goes straight to them.", 4)}`,
      "Sent by the enquiry form on hysaab.ai.",
    ),
    text: `Enquiry from hysaab.ai

Name: ${input.name}
Email: ${input.email}
I am a: ${input.role || "not given"}
Accounting system: ${input.system || "not given"}

Notes:
${input.notes}

Reply to this email and it goes straight to them.`,
  };
}

// ── Enquiry welcome (the visitor's own copy, 2026-09-27) ─────────────
// Sent by the site only when the app's demo-intake agent could not be
// reached; normally the app sends the welcome, with the connection note
// and the questionnaire. Fixed words only: nothing the visitor typed is
// echoed back except their first name and the system they chose.

export function enquiryWelcomeEmail(input: { name: string; system?: string }) {
  const first = input.name.trim().split(/\s+/)[0] || "";
  const hello = first ? `Thank you, ${esc(first)}. We are glad you are here.` : "Thank you. We are glad you are here.";
  const sys = input.system?.trim();
  return {
    subject: "Thank you for reaching out to Hysaab",
    html: wrap(
      "Your message reached the Hysaab team. A real person will reply within one working day.",
      `${kicker("Welcome to Hysaab")}
      ${h1(hello)}
      ${p("Your message has reached the Hysaab team. A real person will reply within one working day to find a time that suits you.")}
      ${p("Hysaab is a shared service team of finance agents. They do the routine work of the books, your people review and approve, and nothing posts outside the rules you agree.")}
      ${sys ? infobox("Your accounting system", `${esc(sys)}. We will talk through how Hysaab connects to it when we speak.`) : ""}
      ${p("If anything else comes to mind before then, simply reply to this email.")}
      ${signoff("We look forward to working with you.")}`,
      "You are receiving this because you sent an enquiry at hysaab.ai. Nothing has been added to a mailing list.",
    ),
    text: `${first ? `Thank you, ${first}.` : "Thank you."} We are glad you are here.

Your message has reached the Hysaab team. A real person will reply within one working day to find a time that suits you.

Hysaab is a shared service team of finance agents. They do the routine work of the books, your people review and approve, and nothing posts outside the rules you agree.
${sys ? `\nYour accounting system: ${sys}. We will talk through how Hysaab connects to it when we speak.\n` : ""}
If anything else comes to mind before then, simply reply to this email.

We look forward to working with you.
${TEXT_FOOT}`,
  };
}

// ── Access request received (owner decision 2026-09-30) ──────────────
// Hysaab is invite-only. Sent by /api/early-access when a new request is
// stored; the Arabic version when the form was Arabic. No counts, no
// queue position: the reference identifies the request, nothing more.
// Nothing the visitor typed is echoed back except their first name.

const monoRef = (ref: string) => `<span style="font-family:'Courier New',Courier,monospace;font-size:18px;font-weight:700;color:#111418;letter-spacing:0.04em;" dir="ltr">${esc(ref)}</span>`;

/* Section heading and numbered points for the longer welcome. Tables, not
   <ol>, so Outlook keeps the layout; the number column flips for Arabic. */
function h2(text: string): string {
  return `<h2 style="font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:700;color:#111418;letter-spacing:-0.01em;line-height:1.3;margin:26px 0 10px 0;">${text}</h2>`;
}

function points(items: [string, string][], dir: "ltr" | "rtl" = "ltr"): string {
  const pad = dir === "rtl" ? "padding:0 0 0 12px;" : "padding:0 12px 0 0;";
  const rows = items.map(([lead, body], i) => `<tr>
      <td valign="top" style="${pad}width:28px;font-family:'Courier New',Courier,monospace;font-size:13px;font-weight:700;color:#B32720;line-height:1.7;">0${i + 1}</td>
      <td valign="top" style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#4E545D;line-height:1.7;padding-bottom:12px;"><strong style="color:#111418;">${lead}</strong> ${body}</td>
    </tr>`).join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" dir="${dir}" style="margin:4px 0 8px 0;">${rows}</table>`;
}

export function requestReceivedEmail(input: { ref: string | null; name?: string; locale?: "en" | "ar" }) {
  const first = (input.name ?? "").trim().split(/\s+/)[0] || "";
  const ref = input.ref;
  if (input.locale === "ar") {
    /* AR-REVIEW: the whole Arabic "request received" email. */
    // "نقلة نوعية" (a step change), not "ثورة": the literal word for
    // revolution reads as political in the Gulf. AR-REVIEW.
    const hello = "مرحبًا بك في نقلة نوعية في عالم المحاسبة والمالية والاستشارات.";
    const thanks = first ? `شكرًا لك يا ${esc(first)}. وصلنا طلبك وحجزنا مكانك في الدور.` : "شكرًا لك. وصلنا طلبك وحجزنا مكانك في الدور.";
    const why = "تقضي معظم فرق المالية الشهر في التحضير: تصنيف المعاملات، وملاحقة الإيصالات، ومطابقة كشوف البنك، وإعادة بناء الجداول نفسها عند كل إقفال. أما العمل الذي يحتاج إلى حكمتك، أي المشورة التي يدفع عملاؤك أو شركتك مقابلها، فيُضغط في الأيام الأخيرة من الشهر.";
    const items: [string, string][] = [
      ["دفاتر تواكب عملك.", "تصل الإيصالات والفواتير عبر واتساب أو البريد أو الرفع المباشر. يقرؤها الوكلاء ويصنّفونها ويطابقونها مع حركة البنك فور وصولها، لا في نهاية الشهر."],
      ["إقفال بلا ضغط.", "تُعَدّ المطابقات والاستحقاقات والقيود وتُراجَع مسبقًا، فتراجع أنت إقفالًا جاهزًا بدل أن تبنيه من الصفر."],
      ["فحص ضريبي قبل التقديم.", "تُختبر كل فاتورة وفق قواعد الهيئة الاتحادية للضرائب لضريبة القيمة المضافة، وتُتابَع ضريبة الشركات شهرًا بشهر، فتظهر المشكلات وإصلاحها ما زال سهلًا."],
      ["متابعة الإيصالات والتحصيل عنك.", "تُتابَع الإيصالات الناقصة والفواتير المتأخرة بلباقة، وكل ما يحتاج إلى قرار يصل إليك."],
    ];
    const charge = "لا يُرحَّل شيء إلى دفترك قبل موافقتك. بيانات كل شركة في مساحة عمل منفصلة خاصة بها، لا نشاركها مع أحد، ولا تُستخدم أبدًا لتدريب نماذج الذكاء الاصطناعي.";
    const next = "يفتح Hysaab أبوابه بالدعوة، ونقبل الطلبات بحسب ترتيب وصولها. وحين يحين دور طلبك نرسل دعوة إلى هذا العنوان.";
    const meantime = "فحص الدفاتر المجاني متاح للجميع. نظرة للقراءة فقط على دفاترك في Xero أو QuickBooks، ترى فيها ما يجده Hysaab، دون أن يُكتب شيء في دفترك.";
    return {
      subject: ref ? `مرحبًا بك في Hysaab · المرجع ${ref}` : "مرحبًا بك في Hysaab",
      html: wrap(
        ref ? `مرحبًا بك في Hysaab. المرجع ${ref}.` : "مرحبًا بك في Hysaab.",
        `${kicker("بالدعوة")}
        ${h1(hello)}
        ${p(thanks)}
        ${ref ? infobox("مرجعك", monoRef(ref)) : ""}
        ${h2("لماذا بنينا Hysaab")}
        ${p(why)}
        ${h2("ما يفعله Hysaab لك")}
        ${points(items, "rtl")}
        ${h2("القرار يبقى لك")}
        ${p(charge)}
        ${h2("الخطوة التالية")}
        ${p(next)}
        ${p(`<strong style="color:#111418;">وإلى ذلك الحين:</strong> ${meantime}`, 8)}
        ${cta(`${SITE}/check`, "افحص دفاترك مجانًا &larr;")}
        ${p(`تريد أن تبدأ أسرع؟ <a href="${DEMO_URL}" style="color:#111418;font-weight:700;">احجز عرضًا تجريبيًا مدته 20 دقيقة</a> ونمرّ معك على دفاترك.`)}
        ${p("لديك سؤال؟ رُدّ على هذه الرسالة: البريد نفسه، والفريق نفسه.", 20)}
        ${signoff("إلى اللقاء قريبًا.").replace("The Hysaab team", "فريق Hysaab")}`,
        "تصلك هذه الرسالة لأنك طلبت الانضمام إلى Hysaab على hysaab.ai.",
        "ar",
      ),
      text: `${hello}

${first ? `شكرًا لك يا ${first}.` : "شكرًا لك."} وصلنا طلبك وحجزنا مكانك في الدور.
${ref ? `\nمرجعك: ${ref}\n` : ""}
لماذا بنينا Hysaab
${why}

ما يفعله Hysaab لك
${items.map(([a, b], i) => `0${i + 1} ${a} ${b}`).join("\n")}

القرار يبقى لك
${charge}

الخطوة التالية
${next}

وإلى ذلك الحين: ${meantime} ${SITE}/check

تريد أن تبدأ أسرع؟ احجز عرضًا تجريبيًا مدته 20 دقيقة: ${DEMO_URL}

لديك سؤال؟ رُدّ على هذه الرسالة: البريد نفسه، والفريق نفسه.

إلى اللقاء قريبًا.
فريق Hysaab
hysaab.ai · ${INFO}`,
    };
  }
  // The welcome (owner, 2026-09-30): "A revolution in the world of
  // accounting, finance and advisory", then what Hysaab is for and how it
  // helps (owner: "a little more explanation of what we aim to do").
  // Every claim here is one the site already makes (trust, how-it-works).
  const hello = "Welcome to a revolution in accounting, finance and advisory.";
  const thanks = first ? `Thank you, ${esc(first)}. Your request is in and your place in the queue is saved.` : "Thank you. Your request is in and your place in the queue is saved.";
  const why = "Most finance teams spend the month on preparation: coding transactions, chasing receipts, matching bank lines and rebuilding the same schedules for every close. The judgement work, the advice your business or your clients actually value, gets squeezed into the last few days.";
  const items: [string, string][] = [
    ["Books that keep up.", "Receipts and invoices arrive by WhatsApp, email or upload. Agents read them, code them and match them to the bank line as they come in, not at month end."],
    ["A close without the scramble.", "Reconciliations, accruals and journals are prepared and checked in advance, so you review a close that is ready instead of building one from scratch."],
    ["Tax checked before it is filed.", "Every invoice is tested against the FTA's VAT rules and Corporate Tax is tracked month by month, so problems surface while they are still easy to fix."],
    ["Receipts and cash chased for you.", "Missing receipts and overdue invoices are followed up politely, and anything that needs a decision comes to you."],
  ];
  const charge = "Nothing posts to your ledger until you approve it. Each company's data sits in its own separate workspace, is never shared, and is never used to train AI models.";
  const next = "Hysaab is opening by invitation. Requests are admitted in the order they arrive; when yours comes up we'll send an invitation to this address.";
  const meantime = "the free Books Check is open to anyone. It is a read-only look at your own Xero or QuickBooks books: what Hysaab finds, with nothing written to your ledger.";
  return {
    subject: ref ? `Welcome to Hysaab · Ref ${ref}` : "Welcome to Hysaab",
    html: wrap(
      ref ? `Welcome to Hysaab. Your reference is ${ref}.` : "Welcome to Hysaab.",
      `${kicker("By invitation")}
      ${h1(hello)}
      ${p(thanks)}
      ${ref ? infobox("Your reference", monoRef(ref)) : ""}
      ${h2("Why we built Hysaab")}
      ${p(why)}
      ${h2("What Hysaab does about it")}
      ${points(items)}
      ${h2("You stay in charge")}
      ${p(charge)}
      ${h2("What happens next")}
      ${p(next)}
      ${p(`<strong style="color:#111418;">In the meantime:</strong> ${meantime}`, 8)}
      ${cta(`${SITE}/check`, "Check your books free &rarr;")}
      ${p(`Want to move faster? <a href="${DEMO_URL}" style="color:#111418;font-weight:700;">Book a 20-minute demo</a> and we will walk your books through it with you.`)}
      ${p("Questions? Reply to this email: same inbox, same humans.", 20)}
      ${signoff("Speak soon.")}`,
      "You are receiving this because you requested access to Hysaab at hysaab.ai.",
    ),
    text: `${hello}

${first ? `Thank you, ${first}.` : "Thank you."} Your request is in and your place in the queue is saved.
${ref ? `\nYour reference: ${ref}\n` : ""}
WHY WE BUILT HYSAAB
${why}

WHAT HYSAAB DOES ABOUT IT
${items.map(([a, b], i) => `0${i + 1} ${a} ${b}`).join("\n")}

YOU STAY IN CHARGE
${charge}

WHAT HAPPENS NEXT
${next}

In the meantime: ${meantime} ${SITE}/check

Want to move faster? Book a 20-minute demo: ${DEMO_URL}

Questions? Reply to this email: same inbox, same humans.

Speak soon.
${TEXT_FOOT}`,
  };
}

/* Internal: every field of a new access request, to SIGNUP_CC, with the
   requester as reply-to. `stored` says how the row was written, so a
   missing migration is visible in the inbox as well as the logs. */
export function accessRequestNoticeEmail(input: {
  ref: string | null; name: string; email: string; company: string; accounting_system: string | null;
  role: string | null; country: string | null; monthly_volume: string | null; locale: string; source: string;
  stored: "rpc" | "insert" | "insert-legacy" | "insert-minimal"; emailed: boolean;
}) {
  const storedNote = {
    "rpc": "Stored with every field (request_access).",
    "insert": "Stored with every field (plain insert; the reference function is not installed, run supabase/early_access_v2.sql).",
    "insert-legacy": "Stored WITHOUT role, country, volume, locale and source: those columns do not exist yet. Run supabase/early_access_v2.sql. The fields above are the only copy.",
    "insert-minimal": "Stored with name, email and company only: the table has no accounting_system column either. Run supabase/early_access_v2.sql. The fields above are the only copy.",
  }[input.stored];
  const fields: [string, string][] = [
    ["Reference", input.ref ?? "none (see Stored)"],
    ["Name", input.name || "not given"],
    ["Email", input.email],
    ["Company", input.company || "not given"],
    ["Role", input.role ?? "not given"],
    ["Accounting system", input.accounting_system ?? "not given"],
    ["Transactions a month", input.monthly_volume ?? "not given"],
    ["Country", input.country ?? "not given"],
    ["Form language", input.locale === "ar" ? "Arabic" : "English"],
    ["Source", input.source],
    ["Confirmation email", input.emailed ? "sent" : "NOT sent (see the logs)"],
  ];
  const rows = fields
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;font-size:13px;color:#4E545D;white-space:nowrap;vertical-align:top;">${k}</td><td style="padding:4px 0;font-size:14px;color:#111418;">${esc(v)}</td></tr>`)
    .join("");
  const who = input.company || input.email;
  return {
    subject: `Access request${input.ref ? ` ${input.ref}` : ""}: ${who}`,
    html: wrap(
      `${esc(who)} requested access on hysaab.ai.`,
      `${kicker("Access request")}
      ${h1("Someone requested access.")}
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;">${rows}</table>
      ${infobox("Stored", esc(storedNote))}
      ${p("Reply to this email and it goes straight to them.", 4)}`,
      "Sent by the Request access form on hysaab.ai.",
    ),
    text: `Access request from hysaab.ai

${fields.map(([k, v]) => `${k}: ${v}`).join("\n")}

Stored: ${storedNote}

Reply to this email and it goes straight to them.`,
  };
}

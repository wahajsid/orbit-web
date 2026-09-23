"use client";

/* ── Homepage enquiry form ───────────────────────────────────────────
   Name, work email, "I am a…" (website change plan 2026-09-23: Finance
   team, Tax or advisory firm, Audit firm, Other), accounting system,
   optional note. The role travels as its own `role` field and is a row
   in the team's email. Posts to the
   site's existing /api/contact (email to the team inbox, sender as
   reply-to; nothing is stored) with the same honeypot + timing guards
   as the footer form.

   "Explore the workspace" and "Discuss managed support" preselect an
   interest. It travels as its own line ahead of the visitor's note, so
   it never overwrites anything they have typed. Success is shown only
   on a confirmed 200; on failure every field keeps its content. */

import { useEffect, useMemo, useRef, useState } from "react";

export const HOME_SYSTEMS = ["Xero", "Zoho Books", "QuickBooks", "Wafeq", "Odoo", "ERPNext", "Spreadsheets / other"] as const;

/** "I am a…": the value sent is always the English label, so the team's
    email reads the same whichever language the visitor used. */
export const ROLES = ["Finance team", "Tax or advisory firm", "Audit firm", "Other"] as const;
/* AR-REVIEW: the four "I am a…" options. */
const ROLES_AR: Record<(typeof ROLES)[number], string> = {
  "Finance team": "فريق مالي",
  "Tax or advisory firm": "مكتب ضرائب أو استشارات",
  "Audit firm": "مكتب تدقيق",
  "Other": "أخرى",
};

export type Interest = "Own team" | "Managed support";
const INTEREST_EVENT = "hw-interest";
const INTEREST_LABEL: Record<Interest, string> = {
  "Own team": "Hysaab for our existing finance team",
  "Managed support": "Managed accounting support",
};

/** A link to the enquiry section that also preselects the interest. */
export function InterestLink({ interest, children }: { interest: Interest; children: React.ReactNode }) {
  return (
    <a
      href="#conversation"
      className="hw-link hw-link--ruled"
      onClick={() => window.dispatchEvent(new CustomEvent<Interest>(INTEREST_EVENT, { detail: interest }))}
    >
      {children}
    </a>
  );
}

const L = {
  en: { heading: "Meet Hysaab.", demoHeading: "Tell us about you.", asking: "Asking about:", clear: "Clear", clearLabel: "Clear the selected interest", name: "Your name", email: "Work email", role: "I am a…", rolePick: "Select one", system: "Your accounting system", pick: "Select your system", help: "What would you like help with?", optional: "(optional)", ph: "Month-end, supplier invoices, clearer reporting…", send: "Book a walkthrough", demoSend: "Request a demo", sending: "Sending…", note: <>Your details go to the Hysaab team by email so a person can reply. Nothing is added to a mailing list. <a href="/privacy">Privacy notice</a>.</>, failed: "We could not send that. Email info@hysaab.ai instead.", offline: "We could not send that. Check your connection, or email info@hysaab.ai instead.", received: "Received.", thanks: (n: string) => `Thank you, ${n || "and welcome"}. A real person from the Hysaab team will reply within one working day.` },
  /* AR-REVIEW: demoHeading "أخبرنا عنك."، role "أنا…"، rolePick "اختر واحدًا"، demoSend "اطلب عرضًا تجريبيًا". */
  ar: { heading: "تعرّف على Hysaab.", demoHeading: "أخبرنا عنك.", asking: "الاستفسار عن:", clear: "مسح", clearLabel: "مسح الاهتمام المحدد", name: "اسمك", email: "بريد العمل", role: "أنا…", rolePick: "اختر واحدًا", system: "نظامك المحاسبي", pick: "اختر نظامك", help: "بماذا تود أن نساعدك؟", optional: "(اختياري)", ph: "إقفال الشهر، فواتير الموردين، تقارير أوضح…", send: "احجز جولة تعريفية", demoSend: "اطلب عرضًا تجريبيًا", sending: "جارٍ الإرسال…", note: <>تصل بياناتك إلى فريق Hysaab بالبريد ليرد عليك شخص حقيقي. لا يُضاف بريدك إلى أي قائمة بريدية. <a href="/privacy">إشعار الخصوصية</a>.</>, failed: "تعذّر الإرسال. راسلنا على info@hysaab.ai بدلًا من ذلك.", offline: "تعذّر الإرسال. تحقق من اتصالك، أو راسلنا على info@hysaab.ai.", received: "وصلتنا رسالتك.", thanks: (n: string) => `شكرًا${n ? ` يا ${n}` : ""}. سيرد عليك شخص حقيقي من فريق Hysaab خلال يوم عمل واحد.` },
};

/* `demo` (the homepages and contact pages, 2026-09-23) adds the "I am a…"
   field and the demo wording. Without it the form is exactly as before,
   which keeps /check unchanged (owner: leave /check alone). */
export function EnquiryForm({ source = "Homepage", locale = "en", demo = false }: { source?: string; locale?: "en" | "ar"; demo?: boolean }) {
  const t = L[locale];
  const loadedAt = useMemo(() => Date.now(), []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [system, setSystem] = useState("");
  const [role, setRole] = useState("");
  const [help, setHelp] = useState("");
  const [interest, setInterest] = useState<Interest | null>(null);
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const sending = useRef(false);

  useEffect(() => {
    const on = (e: Event) => setInterest((e as CustomEvent<Interest>).detail);
    window.addEventListener(INTEREST_EVENT, on);
    return () => window.removeEventListener(INTEREST_EVENT, on);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending.current) return; // a second click while the first is in flight
    sending.current = true;
    setErr(null);
    setBusy(true);
    const notes = [
      `${source} enquiry: requested a ${demo ? "demo" : "conversation"}.`,
      interest ? `Interested in: ${INTEREST_LABEL[interest]}.` : "",
      help.trim(),
    ].filter(Boolean).join("\n\n");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), role, accounting_system: system, notes, website, loadedAt }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) { setErr(data.error || t.failed); return; }
      setDone(true);
    } catch {
      setErr(t.offline);
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="hw-form hw-form--done" role="status">
        <svg className="m-check" viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="17" /><path pathLength={1} d="M11 18.5l5 5 9-11" /></svg>
        <h3>{t.received}</h3>
        <p>{t.thanks(name.trim().split(/\s+/)[0])}</p>
      </div>
    );
  }

  return (
    <form className="hw-form" onSubmit={submit} aria-labelledby="hw-form-h">
      <div className="hw-form-head">
        <h3 id="hw-form-h">{demo ? t.demoHeading : t.heading}</h3>
      </div>
      <div className="hy-hp" aria-hidden="true">
        <label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
      </div>
      {interest && (
        <p className="hw-form-interest">
          <span>{t.asking} <strong>{INTEREST_LABEL[interest]}</strong></span>
          <button type="button" onClick={() => setInterest(null)} aria-label={t.clearLabel}>{t.clear}</button>
        </p>
      )}
      <label htmlFor="hw-name">{t.name}</label>
      <input id="hw-name" name="name" autoComplete="name" placeholder="Layla Haddad" required maxLength={200} value={name} onChange={(e) => setName(e.target.value)} />
      <label htmlFor="hw-email">{t.email}</label>
      <input id="hw-email" name="email" type="email" autoComplete="email" placeholder="layla@company.ae" required maxLength={320} value={email} onChange={(e) => setEmail(e.target.value)} />
      {demo && <>
        <label htmlFor="hw-role">{t.role}</label>
        <select id="hw-role" name="role" required value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">{t.rolePick}</option>
          {ROLES.map((r) => <option key={r} value={r}>{locale === "ar" ? ROLES_AR[r] : r}</option>)}
        </select>
      </>}
      <label htmlFor="hw-system">{t.system}</label>
      <select id="hw-system" name="system" required={!demo || role === "" || role === "Finance team"} value={system} onChange={(e) => setSystem(e.target.value)}>
        <option value="">{t.pick}</option>
        {HOME_SYSTEMS.map((s) => <option key={s}>{s}</option>)}
      </select>
      <label htmlFor="hw-help">{t.help} <span>{t.optional}</span></label>
      <textarea id="hw-help" name="help" rows={2} placeholder={t.ph} maxLength={3500} value={help} onChange={(e) => setHelp(e.target.value)} />
      <button className="hw-btn hw-btn--navy" type="submit" disabled={busy} aria-disabled={busy}>
        {busy ? t.sending : demo ? t.demoSend : t.send} <span aria-hidden="true">↗</span>
      </button>
      {err && <p className="hw-form-err" role="alert">{err}</p>}
      <p className="hw-form-note">{t.note}</p>
    </form>
  );
}

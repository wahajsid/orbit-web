"use client";

/* ── Request access form (owner decision 2026-09-30) ─────────────────
   Hysaab is invite-only. Name, work email, company, accounting system,
   transactions a month, country and role, each with a real <label>.
   Checked on submit (then live, field by field) with the message under
   the field it belongs to, tied by aria-describedby; focus goes to the
   first field that needs attention. The route re-checks everything and
   carries the honeypot + timing guards, as the older capture forms did.

   Posts to /api/early-access. The confirmation replaces the form in
   place: "Request received · Ref HY-0127", when we will write, and the
   demo link. A repeat email reads "We already have your request" and
   shows nothing else. Values sent are the English labels (lib/access.ts)
   whichever language the visitor used. Styles: app/access.css (ra-*). */

import { useEffect, useMemo, useRef, useState } from "react";
import { isPersonalEmail, isDisposableEmail } from "@/lib/email-domains";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { SYSTEM_OPTS, VOLUME_OPTS, COUNTRY_OPTS, ROLE_OPTS, type Locale } from "@/lib/access";

type Field = "name" | "email" | "company" | "accounting_system" | "monthly_volume" | "country" | "role";
type Values = Record<Field, string>;
const ORDER: Field[] = ["name", "email", "company", "accounting_system", "monthly_volume", "country", "role"];
const EMPTY: Values = { name: "", email: "", company: "", accounting_system: "", monthly_volume: "", country: "", role: "" };

const T = {
  en: {
    wp: "Access request", wpRight: "Reviewed in the order received",
    title: "Request access",
    name: "Name", email: "Work email", company: "Company",
    accounting_system: "Accounting system", monthly_volume: "Transactions a month", country: "Country", role: "Role",
    choose: "Choose one",
    ph: { name: "Layla Haddad", email: "layla@company.ae", company: "Al Hamra Trading LLC" },
    err: {
      name: "Please enter your name.",
      email: "Please enter your work email address.",
      emailBad: "That email address does not look complete.",
      personal: "Hysaab is for companies. Please use your work email rather than a personal Gmail or Outlook address.",
      disposable: "Please use a permanent work email address.",
      company: "Please enter your company’s name.",
      pick: "Please choose one.",
    },
    fix: (n: number) => (n === 1 ? "One field needs attention." : `${n} fields need attention.`),
    submit: "Request access", busy: "Sending your request…",
    note: <>We use these details to review your request and to write to you about it. <a href="/privacy">Privacy notice</a>.</>,
    failed: "We could not send that. Email info@hysaab.ai and a person will add your request by hand.",
    offline: "We could not send that. Check your connection, or email info@hysaab.ai.",
    received: "Request received", ref: "Ref",
    already: "We already have your request.",
    ready: "We’ll email you when your workspace is ready.",
    readyAlready: "We’ll email you at that address when your workspace is ready.",
    faster: "Want to move faster?", demo: "Book a 20-minute demo",
    check: "Meanwhile, check your books free", arrow: "→",
  },
  /* AR-REVIEW: every Arabic string in this form. */
  ar: {
    wp: "طلب انضمام", wpRight: "نراجع الطلبات بحسب ترتيب وصولها",
    title: "اطلب الانضمام",
    name: "الاسم", email: "بريد العمل", company: "الشركة",
    accounting_system: "النظام المحاسبي", monthly_volume: "عدد المعاملات شهريًا", country: "الدولة", role: "دورك",
    choose: "اختر واحدًا",
    ph: { name: "ليلى حداد", email: "layla@company.ae", company: "الحمرا للتجارة ذ.م.م" },
    err: {
      name: "يُرجى إدخال اسمك.",
      email: "يُرجى إدخال بريد عملك.",
      emailBad: "يبدو أن عنوان البريد غير مكتمل.",
      personal: "Hysaab للشركات. يُرجى استخدام بريد العمل بدلًا من بريد شخصي مثل Gmail أو Outlook.",
      disposable: "يُرجى استخدام بريد عمل دائم.",
      company: "يُرجى إدخال اسم شركتك.",
      pick: "يُرجى اختيار واحد.",
    },
    fix: (n: number) => (n === 1 ? "حقل واحد يحتاج إلى مراجعة." : n === 2 ? "حقلان يحتاجان إلى مراجعة." : `${n} حقول تحتاج إلى مراجعة.`),
    submit: "اطلب الانضمام", busy: "جارٍ إرسال طلبك…",
    note: <>نستخدم هذه البيانات لمراجعة طلبك ومراسلتك بشأنه. <a href="/privacy">إشعار الخصوصية</a> (بالإنجليزية).</>,
    failed: "تعذّر الإرسال. راسلنا على info@hysaab.ai وسيضيف أحد أفراد الفريق طلبك يدويًا.",
    offline: "تعذّر الإرسال. تحقق من اتصالك، أو راسلنا على info@hysaab.ai.",
    received: "تم استلام الطلب", ref: "المرجع",
    already: "طلبك لدينا بالفعل.",
    ready: "سنراسلك بالبريد حين تصبح مساحة عملك جاهزة.",
    readyAlready: "سنراسلك على هذا العنوان حين تصبح مساحة عملك جاهزة.",
    faster: "تريد أن تبدأ أسرع؟", demo: "احجز عرضًا تجريبيًا مدته 20 دقيقة",
    check: "وإلى ذلك الحين، افحص دفاترك مجانًا", arrow: "←",
  },
};

const OPTS: Partial<Record<Field, readonly (readonly [string, string])[]>> = {
  accounting_system: SYSTEM_OPTS, monthly_volume: VOLUME_OPTS, country: COUNTRY_OPTS, role: ROLE_OPTS,
};

export function RequestAccessForm({ locale = "en", source = "access-page" }: { locale?: Locale; source?: string }) {
  const t = T[locale];
  const ar = locale === "ar";
  const loadedAt = useMemo(() => Date.now(), []);
  const [v, setV] = useState<Values>(EMPTY);
  const [website, setWebsite] = useState("");            // honeypot
  const [errs, setErrs] = useState<Partial<Record<Field, string>>>({});
  const [tried, setTried] = useState(false);
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState<string | null>(null);
  const [done, setDone] = useState<{ ref: string | null; already: boolean } | null>(null);
  const sending = useRef(false);
  const doneHead = useRef<HTMLHeadingElement | null>(null);
  const refs = useRef<Partial<Record<Field, HTMLInputElement | HTMLSelectElement | null>>>({});

  useEffect(() => { if (done) doneHead.current?.focus(); }, [done]);

  function check(f: Field, val: string): string | undefined {
    const x = val.trim();
    if (f === "name") return x ? undefined : t.err.name;
    if (f === "company") return x ? undefined : t.err.company;
    if (f === "email") {
      if (!x) return t.err.email;
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x)) return t.err.emailBad;
      if (isDisposableEmail(x)) return t.err.disposable;
      if (isPersonalEmail(x)) return t.err.personal;
      return undefined;
    }
    return x ? undefined : t.err.pick;
  }

  function set(f: Field, val: string) {
    setV((o) => ({ ...o, [f]: val }));
    if (tried) setErrs((o) => ({ ...o, [f]: check(f, val) }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending.current) return;
    setTried(true);
    setFail(null);
    const found: Partial<Record<Field, string>> = {};
    for (const f of ORDER) { const m = check(f, v[f]); if (m) found[f] = m; }
    setErrs(found);
    const first = ORDER.find((f) => found[f]);
    if (first) { refs.current[first]?.focus(); return; }

    sending.current = true;
    setBusy(true);
    try {
      const r = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: v.name.trim(), email: v.email.trim(), company: v.company.trim(),
          accounting_system: v.accounting_system, monthly_volume: v.monthly_volume, country: v.country, role: v.role,
          locale, source, website, loadedAt,
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        if (data?.field === "email" && data?.error) { setErrs({ email: data.error }); refs.current.email?.focus(); }
        else setFail(data?.error || t.failed);
        return;
      }
      const ref = typeof data?.ref === "string" && /^HY-\d{4,}$/.test(data.ref) ? data.ref : null;
      setDone({ ref, already: !!data?.already });
    } catch {
      setFail(t.offline);
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }

  const strip = (right: React.ReactNode) => (
    <p className="tt-wp ra-wp">
      <span>{ar ? "مرجع ورقة العمل" : "W/P ref"} <b><bdi>A-1</bdi></b> · {t.wp}</span>
      <span>{right}</span>
    </p>
  );

  if (done) {
    return (
      <div className="ra-card ra-card--done" role="status">
        {strip(<><span className="tt-tm" aria-hidden="true">✓</span> {done.already ? t.already : t.received}</>)}
        <div className="ra-body">
          <h2 className="ra-done-h" tabIndex={-1} ref={doneHead}>
            {done.already ? t.already : done.ref ? <>{t.received}<span className="hw-sr"> · {t.ref} {done.ref}</span></> : t.received}
          </h2>
          {!done.already && done.ref && (
            <p className="ra-ref-line" aria-hidden="true"><span className="ra-ref-k">{t.ref}</span> <bdi className="ra-ref">{done.ref}</bdi></p>
          )}
          <p className="ra-done-p">{done.already ? t.readyAlready : t.ready}</p>
          <p className="ra-done-demo">
            <span>{t.faster}</span>{" "}
            <a className="tt-link" {...DEMO}>{t.demo} <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB[locale]}</span></a>
          </p>
          <p className="ra-done-check">
            <a className="hw-link hw-link--ruled" href="/check">{t.check} <span aria-hidden="true">{t.arrow}</span>{ar && <span className="hw-sr"> (بالإنجليزية)</span>}</a>
          </p>
        </div>
      </div>
    );
  }

  const nErr = ORDER.filter((f) => errs[f]).length;

  const input = (f: "name" | "email" | "company", extra: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className={`ra-field${f === "company" ? " ra-field--wide" : ""}`} data-invalid={errs[f] ? "" : undefined}>
      <label htmlFor={`ra-${f}`}>{t[f]}</label>
      <input
        id={`ra-${f}`} name={f} ref={(el) => { refs.current[f] = el; }}
        value={v[f]} onChange={(e) => set(f, e.target.value)} onBlur={() => tried && setErrs((o) => ({ ...o, [f]: check(f, v[f]) }))}
        aria-invalid={errs[f] ? true : undefined} aria-describedby={errs[f] ? `ra-${f}-err` : undefined}
        required placeholder={t.ph[f]} {...extra}
      />
      {errs[f] && <p className="ra-err" id={`ra-${f}-err`}><span className="tt-tm" aria-hidden="true">?</span> {errs[f]}</p>}
    </div>
  );

  const select = (f: "accounting_system" | "monthly_volume" | "country" | "role") => (
    <div className="ra-field" data-invalid={errs[f] ? "" : undefined}>
      <label htmlFor={`ra-${f}`}>{t[f]}</label>
      <select
        id={`ra-${f}`} name={f} ref={(el) => { refs.current[f] = el; }}
        value={v[f]} onChange={(e) => set(f, e.target.value)}
        aria-invalid={errs[f] ? true : undefined} aria-describedby={errs[f] ? `ra-${f}-err` : undefined} required
      >
        <option value="">{t.choose}</option>
        {OPTS[f]!.map(([en, arLabel]) => <option key={en} value={en}>{ar ? arLabel : en}</option>)}
      </select>
      {errs[f] && <p className="ra-err" id={`ra-${f}-err`}><span className="tt-tm" aria-hidden="true">?</span> {errs[f]}</p>}
    </div>
  );

  return (
    <form className="ra-card" onSubmit={submit} noValidate aria-labelledby="ra-title" id="request">
      {strip(t.wpRight)}
      <div className="ra-body">
        <h2 className="ra-title" id="ra-title">{t.title}</h2>
        <div className="hy-hp" aria-hidden="true">
          <label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
        </div>
        <div className="ra-grid">
          {input("name", { autoComplete: "name", maxLength: 200 })}
          {input("email", { type: "email", autoComplete: "email", inputMode: "email", maxLength: 320, dir: "ltr", spellCheck: false })}
          {input("company", { autoComplete: "organization", maxLength: 200 })}
          {select("accounting_system")}
          {select("monthly_volume")}
          {select("country")}
          {select("role")}
        </div>
        {nErr > 0 && <p className="ra-sum" role="alert">{t.fix(nErr)}</p>}
        <button className="hw-btn hw-btn--navy ra-submit" type="submit" disabled={busy} aria-disabled={busy}>
          {busy ? t.busy : t.submit} <span aria-hidden="true">{t.arrow}</span>
        </button>
        {fail && <p className="ra-fail" role="alert">{fail}</p>}
        <p className="ra-note">{t.note}</p>
      </div>
    </form>
  );
}

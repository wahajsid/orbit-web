"use client";

/* The founding ledger — the waitlist form IS a ledger entry. Seat rows above
   (redacted blocks for taken seats), then "your entry?" expands into three
   mono inputs styled like ledger lines. Shares submit logic (and all spam
   guards) with the hero capture. Post-launch the panel points at the app's
   signup instead. Locale-aware: the /ar pages pass locale="ar". */

import { useEffect, useState } from "react";
import { APP_SIGNUP, FOUNDING_SEATS, LAUNCH_AT, LAUNCH_DATE_SHORT, LAUNCH_DATE_SHORT_AR, isPostLaunch } from "@/lib/launch";
import { useEarlyAccess } from "./useEarlyAccess";

const pad3 = (n: number) => String(n).padStart(3, "0");

const T = {
  en: {
    head: "FOUNDING LEDGER · 12 MO FREE",
    taken: (name: string) => <>· <span className="redact">{name}</span> — taken</>,
    names: ["▓▓▓▓▓▓ LLC", "▓▓▓▓ Trading", "▓▓▓▓▓ & Co"],
    open: "doors are open — sign up",
    reserved: "reserved ✓",
    yourEntry: "your entry?",
    doorsOpen: (d: string) => `doors open ${d}`,
    name: "your name", nameAria: "Your name",
    email: "work email", emailAria: "Work email",
    company: "company", companyAria: "Company",
    busy: "Recording…", claim: "Claim this entry",
    already: "You're already in the ledger — see you at the doors.",
    done: (seatNo: string, company: string) => `Entry ${seatNo} reserved${company ? ` for ${company}` : ""}. Watch your inbox.`,
    note: (seats: number) => `First ${seats} companies get twelve months free — fair-usage policy applies — with founder pricing locked in after. Work email only; a real person reads every entry.`,
    date: LAUNCH_DATE_SHORT,
  },
  ar: {
    head: "سجل التأسيس · 12 شهرًا مجانًا",
    taken: (name: string) => <>· <span className="redact">{name}</span> — محجوز</>,
    names: ["▓▓▓▓▓▓ ذ.م.م", "▓▓▓▓ للتجارة", "▓▓▓▓▓ وشركاه"],
    open: "الأبواب مفتوحة — سجّل الآن",
    reserved: "محجوز ✓",
    yourEntry: "قيدك؟",
    doorsOpen: (d: string) => `الأبواب تُفتح ${d}`,
    name: "اسمك", nameAria: "اسمك",
    email: "بريد العمل", emailAria: "بريد العمل",
    company: "الشركة", companyAria: "الشركة",
    busy: "جارٍ التسجيل…", claim: "احجز هذا القيد",
    already: "أنت في السجل بالفعل — نراك عند الأبواب.",
    done: (seatNo: string, company: string) => `تم حجز القيد ${seatNo}${company ? ` لشركة ${company}` : ""}. راقب بريدك الوارد.`,
    note: (seats: number) => `أول ${seats} شركة تحصل على اثني عشر شهرًا مجانًا — تُطبَّق سياسة الاستخدام العادل — مع تثبيت سعر المؤسسين بعد ذلك. بريد العمل فقط؛ شخص حقيقي يقرأ كل قيد.`,
    date: LAUNCH_DATE_SHORT_AR,
  },
};

export function LedgerForm({ seat, locale = "en" }: { seat: number; locale?: "en" | "ar" }) {
  const t = T[locale];
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState(() => Date.now() >= LAUNCH_AT);
  useEffect(() => { setPost(isPostLaunch()); }, []);
  const { f, setF, busy, done, err, submit } = useEarlyAccess(locale);

  const taken: [number, string][] = [
    [seat - 3, t.names[0]],
    [seat - 2, t.names[1]],
    [seat - 1, t.names[2]],
  ];

  return (
    <div className="ledger-panel" id="ledger">
      <div className="microlabel ledger-head">{t.head}</div>
      <div className="ledger-rows">
        {taken.map(([n, name]) => (
          <div key={n} className="taken">{pad3(n)} {t.taken(name)}</div>
        ))}
        <div>
          {pad3(seat)} ·{" "}
          {post ? (
            <a className="ledger-you" href={APP_SIGNUP} style={{ textDecoration: "none" }}>{t.open}</a>
          ) : done ? (
            <span style={{ color: "var(--petrol)" }}>{t.reserved}</span>
          ) : (
            <button className="ledger-you" onClick={() => setOpen(true)}>{t.yourEntry}</button>
          )}
        </div>
        <div className="taken">{pad3(seat + 1)} · ——————</div>
        <div className="taken">⋮</div>
        <div className="taken">{pad3(FOUNDING_SEATS)} · {t.doorsOpen(t.date)}</div>
      </div>

      {open && !done && !post && (
        <div className="ledger-form">
          <div className="hp-field" aria-hidden="true">
            <input value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <input placeholder={t.name} value={f.name} autoComplete="name"
            onChange={(e) => setF({ ...f, name: e.target.value })} aria-label={t.nameAria} />
          <input placeholder={t.email} value={f.email} type="email" autoComplete="email"
            onChange={(e) => setF({ ...f, email: e.target.value })} aria-label={t.emailAria}
            onKeyDown={(e) => e.key === "Enter" && submit()} />
          <input placeholder={t.company} value={f.company} autoComplete="organization"
            onChange={(e) => setF({ ...f, company: e.target.value })} aria-label={t.companyAria}
            onKeyDown={(e) => e.key === "Enter" && submit()} />
          {err && <div className="ledger-msg bad">{err}</div>}
          <button className="cta" onClick={submit} disabled={busy} style={{ width: "100%", opacity: busy ? 0.6 : 1 }}>
            {busy ? t.busy : t.claim}
          </button>
        </div>
      )}
      {done && (
        <div className="ledger-msg ok" style={{ marginTop: 10 }}>
          {done.already ? t.already : t.done(pad3(seat), f.company)}
        </div>
      )}

      <div className="ledger-note">
        {t.note(FOUNDING_SEATS)}
      </div>
    </div>
  );
}

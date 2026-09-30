"use client";

/* ── Hysaab Practice: what the admin costs you ───────────────────
   A transparent estimate, not a measured result: the product does not
   compute time saved, so this calculator shows its assumptions and lets
   the visitor change every input. Minutes per item are our working
   assumptions for a Gulf tax and advisory team; they are printed in the
   table so nobody has to take a headline number on faith. */

import { useMemo, useState } from "react";

type Locale = "en" | "ar";
type Activity = { key: string; label: string; unit: string; per: "week" | "month"; qty: number; before: number; after: number; how: string };

const DEFAULTS: Activity[] = [
  { key: "email", label: "Sorting, routing and first replies to email", unit: "emails", per: "week", qty: 80, before: 2.5, after: 1, how: "Triage, client match, filing and a draft reply are done before anyone opens it." },
  { key: "meet", label: "Meeting prep, notes and follow-up tasks", unit: "meetings", per: "week", qty: 4, before: 35, after: 10, how: "A prep brief beforehand; notes become decisions and tasks with owners." },
  { key: "time", label: "Writing up timesheets", unit: "days", per: "week", qty: 5, before: 12, after: 2, how: "Drafted from the day's work; you confirm or lower it." },
  { key: "chase", label: "Chasing client documents and deadlines", unit: "requests", per: "week", qty: 6, before: 15, after: 4, how: "Token-link requests, reminders and a live deadline calendar." },
  { key: "file", label: "Filing admin: checklists, letters, variance notes", unit: "filings", per: "month", qty: 5, before: 180, after: 75, how: "Completeness checks, drafted letters and a red-team review before approval." },
];

const WEEKS_PER_MONTH = 4.33;
const fmt = (n: number, d = 0) => n.toLocaleString("en-GB", { maximumFractionDigits: d, minimumFractionDigits: d });

/* AR-REVIEW: the calculator's labels. Same keys and assumptions. */
const AR_ACT: Record<string, Pick<Activity, "label" | "unit" | "how">> = {
  email: { label: "فرز البريد وتوجيهه والردود الأولى عليه", unit: "رسالة", how: "الفرز ومطابقة العميل والأرشفة ومسودة الرد تتم قبل أن يفتحه أحد." },
  meet: { label: "التحضير للاجتماعات وملاحظاتها ومهام المتابعة", unit: "اجتماع", how: "موجز تحضيري مسبق؛ والملاحظات تصبح قرارات ومهام لها مسؤولون." },
  time: { label: "كتابة سجلات الوقت", unit: "يوم", how: "تُصاغ من عمل اليوم؛ وأنت تؤكدها أو تخفضها." },
  chase: { label: "ملاحقة مستندات العملاء ومواعيدهم", unit: "طلب", how: "طلبات بروابط آمنة، وتذكيرات، وتقويم مواعيد حي." },
  file: { label: "إدارة الإقرارات: قوائم التحقق والخطابات وشروح الفروقات", unit: "إقرار", how: "فحوص الاكتمال، وخطابات مُصاغة، ومراجعة نقدية قبل الاعتماد." },
};

const T = {
  en: {
    people: "Fee earners and staff", rate: "Blended cost per hour, AED",
    perItem: (b: string, a: string) => `${b} min → ${a} min per item`,
    qtyLabel: (a: Activity) => `${a.unit} per person per ${a.per}`,
    qtyUnit: (a: Activity) => `${a.unit} / person / ${a.per}`,
    h: "h", est: "Your estimate",
    hours: "hours a month back to the team", aed: "a year in time you no longer spend on admin",
    money: (v: number) => (v >= 1_000_000 ? `AED ${fmt(v / 1_000_000, 2)}m` : `AED ${fmt(v / 1000)}k`),
    fte: "full-time roles of capacity, without hiring", perPerson: "per person, every week, for client work",
    note: "An estimate from your inputs and our working assumptions, shown on the left. Not a measured result. Change any number.",
    cta: "Talk to us about your firm →", href: "/contact",
  },
  ar: {
    people: "المهنيون والموظفون", rate: "متوسط تكلفة الساعة، بالدرهم",
    perItem: (b: string, a: string) => `${b} د ← ${a} د لكل بند`,
    qtyLabel: (a: Activity) => `${a.unit} لكل شخص في ${a.per === "week" ? "الأسبوع" : "الشهر"}`,
    qtyUnit: (a: Activity) => `${a.unit} / شخص / ${a.per === "week" ? "أسبوع" : "شهر"}`,
    h: "س", est: "تقديرك",
    hours: "ساعة شهريًا تعود إلى الفريق", aed: "سنويًا من وقت لم تعد تصرفه على الأعمال الإدارية",
    money: (v: number) => (v >= 1_000_000 ? `${fmt(v / 1_000_000, 2)} مليون درهم` : `${fmt(v / 1000)} ألف درهم`),
    fte: "وظائف بدوام كامل من السعة، دون توظيف", perPerson: "لكل شخص، كل أسبوع، لعمل العملاء",
    note: "تقدير من مدخلاتك وافتراضاتنا المعروضة في الجدول. ليس نتيجة مقيسة. غيّر أي رقم.",
    cta: "تحدث إلينا عن مكتبك ←", href: "/ar/contact",
  },
};

export function SavingsCalc({ locale = "en" }: { locale?: Locale }) {
  const t = T[locale];
  const [people, setPeople] = useState(12);
  const [rate, setRate] = useState(220);
  const [acts, setActs] = useState(() => (locale === "ar" ? DEFAULTS.map((a) => ({ ...a, ...AR_ACT[a.key] })) : DEFAULTS));

  const setQty = (key: string, qty: number) => setActs((a) => a.map((x) => (x.key === key ? { ...x, qty: Math.max(0, qty) } : x)));

  const r = useMemo(() => {
    const perPersonMonthMin = acts.reduce((sum, a) => {
      const perMonth = a.per === "week" ? a.qty * WEEKS_PER_MONTH : a.qty;
      return sum + perMonth * (a.before - a.after);
    }, 0);
    const hoursMonth = (perPersonMonthMin / 60) * people;
    return {
      perPersonWeek: perPersonMonthMin / 60 / WEEKS_PER_MONTH,
      hoursMonth,
      aedYear: hoursMonth * 12 * rate,
      fte: hoursMonth / 160,
      rows: acts.map((a) => {
        const perMonth = a.per === "week" ? a.qty * WEEKS_PER_MONTH : a.qty;
        return { ...a, hoursMonthTeam: (perMonth * (a.before - a.after) / 60) * people };
      }),
    };
  }, [acts, people, rate]);

  return (
    <div className="hy-calc">
      <div className="hy-calc-inputs">
        <div className="hy-calc-top">
          <label className="hy-field">{t.people}
            <input className="hy-input" type="number" min={1} max={500} value={people} onChange={(e) => setPeople(Math.max(1, Number(e.target.value) || 1))} />
          </label>
          <label className="hy-field">{t.rate}
            <input className="hy-input" type="number" min={50} max={2000} step={10} value={rate} onChange={(e) => setRate(Math.max(0, Number(e.target.value) || 0))} />
          </label>
        </div>
        <div className="hy-calc-rows">
          {r.rows.map((a) => (
            <div className="hy-calc-row" key={a.key}>
              <div className="hy-calc-row-main">
                <span className="hy-calc-row-h">{a.label}</span>
                <span className="hy-calc-row-p">{a.how}</span>
                <span className="hy-calc-row-a hy-num">{t.perItem(fmt(a.before, a.before % 1 ? 1 : 0), fmt(a.after, a.after % 1 ? 1 : 0))}</span>
              </div>
              <label className="hy-calc-qty">
                <input className="hy-input" type="number" min={0} value={a.qty} onChange={(e) => setQty(a.key, Number(e.target.value) || 0)} aria-label={t.qtyLabel(a)} />
                <span>{t.qtyUnit(a)}</span>
              </label>
              <span className="hy-calc-row-out hy-num">{fmt(a.hoursMonthTeam)} {t.h}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hy-calc-out" aria-live="polite">
        <span className="hy-kicker hy-kicker--blush">{t.est}</span>
        <div className="hy-calc-big"><span className="hy-num">{fmt(r.hoursMonth)}</span><span>{t.hours}</span></div>
        <div className="hy-calc-big"><span className="hy-num">{t.money(r.aedYear)}</span><span>{t.aed}</span></div>
        <div className="hy-calc-pair">
          <div><strong className="hy-num">{fmt(r.fte, 1)}</strong><span>{t.fte}</span></div>
          <div><strong className="hy-num">{fmt(r.perPersonWeek, 1)} {t.h}</strong><span>{t.perPerson}</span></div>
        </div>
        <p className="hy-calc-note">{t.note}</p>
        <a href={t.href} className="hy-btn hy-btn--blush hy-btn--lg" style={{ alignSelf: "flex-start" }}>{t.cta}</a>
      </div>
    </div>
  );
}

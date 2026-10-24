"use client";

/* ── The close film (homepage hero) ─────────────────────────────────
   Fifteen seconds of a finished month-end close, played in one app
   window: the close calendar ticks T+1 to T+4 to done (a contract
   accrual confirmed by its owner on the way), the 31 workpapers of the
   close binder file one by one, and the month locks. It is drawn in code
   rather than shipped as an MP4, so the text stays sharp at any size and
   the page stays light.
   - It plays only while on screen and the tab is visible.
   - A pause button stops it (WCAG 2.2.2); under reduced motion it shows
     the finished close, still.
   - Screen readers get one sentence of what it shows; the moving parts
     are hidden from them.
   The tasks and workpapers are the product's own (the app's close
   calendar defaults and close-binder registry). Illustrative data. */

import { useEffect, useRef, useState } from "react";
import "./close-film.css";

const LOOP = 15_000;
const TICK = 100;

/* Close calendar rows: [day, task, who or what, done at (ms)] */
type Copy = {
  tasks: [string, string, string, number][]; papers: string[]; sr: string; bar: string; tag: string; cal: string;
  doneOf: (d: number, n: number) => string; inProgress: string; waiting: string; binder: string; filed: string; xlsx: boolean;
  sig: string; lockK: string; lockH: string; lockS: string; lockSign: string; cap: string; play: string; pause: string; srBtn: string;
};
const COPY: Record<"en" | "ar", Copy> = {
  en: {
    tasks: [
      ["T+1", "Match the bank lines", "312 of 312 · counted", 900],
      ["T+1", "Approve the recurring accruals", "approved by Sara", 1500],
      ["T+1", "Post depreciation", "14 assets · counted", 2000],
      ["T+2", "Accrue the fit-out contract", "AED 90,000 · confirmed by Noor", 3000],
      ["T+3", "Review the balance-sheet reconciliations", "7 of 7 signed", 3900],
      ["T+3", "Explain the variances", "2 answered by owners", 4500],
      ["T+4", "Review the draft statements", "signed by Layla, CFO", 5200],
    ],
    papers: [
      "Index and sign-off", "Trial balance and lead schedules", "Cash and bank", "Accounts receivable", "Prepayments",
      "Other receivables and deposits", "Inventory", "Fixed assets", "Leases (IFRS 16)", "Intangibles", "Intercompany",
      "Accounts payable", "Accruals", "Deferred revenue", "Payroll and employee liabilities", "VAT", "Corporate tax and Zakat",
      "Loans and borrowings", "Other payables and provisions", "Equity", "Suspense and clearing", "FX revaluation", "Cut-off",
      "Journal entries register", "Balance sheet flux", "Income statement flux", "Cash flow working", "Financial statements",
      "Open items and exceptions", "Close checklist evidence", "Group consolidation",
    ],
    sr: "Illustration of a finished month-end close in Hysaab: the close calendar ticks from T+1 to T+4 to done, a contract accrual is confirmed by its owner, the 31 workpapers of the close binder are filed, and October is locked on the fourth working day.",
    bar: "Helio Trading LLC · Period close · October 2026", tag: "Illustrative", cal: "Close calendar",
    doneOf: (d, n) => `${d} of ${n} done`, inProgress: "in progress", waiting: "waiting",
    binder: "Close binder · October 2026", filed: "filed", xlsx: true, sig: "prepared · reviewed",
    lockK: "Period locked", lockH: "October closed", lockS: "31 workpapers filed · 0 open items", lockSign: "P · reviewed L.H. 16:40",
    cap: "Illustrative close · sample data", play: "Play", pause: "Pause", srBtn: " the close animation",
  },
  /* AR-REVIEW: the close film */
  ar: {
    tasks: [
      ["T+1", "مطابقة الأسطر البنكية", "312 من 312 · محسوبة", 900],
      ["T+1", "اعتماد الاستحقاقات المتكررة", "اعتمدتها سارة", 1500],
      ["T+1", "ترحيل الاستهلاك", "14 أصلًا · محسوب", 2000],
      ["T+2", "استحقاق عقد التجهيزات", "90,000 درهم · أكّده نور", 3000],
      ["T+3", "مراجعة مطابقات الميزانية العمومية", "7 من 7 موقّعة", 3900],
      ["T+3", "تفسير الفروقات", "أجاب أصحابها عن 2", 4500],
      ["T+4", "مراجعة مسودة القوائم", "وقّعتها ليلى، المديرة المالية", 5200],
    ],
    papers: [
      "الفهرس والتوقيع", "ميزان المراجعة والجداول الرئيسية", "النقد والبنوك", "الذمم المدينة", "المصروفات المدفوعة مقدمًا",
      "ذمم مدينة أخرى وودائع", "المخزون", "الأصول الثابتة", "عقود الإيجار (IFRS 16)", "الأصول غير الملموسة", "المعاملات بين الشركات",
      "الذمم الدائنة", "المستحقات", "الإيرادات المؤجلة", "الرواتب والتزامات الموظفين", "ضريبة القيمة المضافة", "ضريبة الشركات والزكاة",
      "القروض والاقتراض", "ذمم دائنة أخرى ومخصصات", "حقوق الملكية", "الحسابات المعلّقة والوسيطة", "إعادة تقييم العملات", "فصل الفترات",
      "سجل قيود اليومية", "تحليل تغيّرات الميزانية", "تحليل تغيّرات قائمة الدخل", "ورقة عمل التدفقات النقدية", "القوائم المالية",
      "البنود المفتوحة والاستثناءات", "أدلة قائمة الإقفال", "توحيد المجموعة",
    ],
    sr: "رسم توضيحي لإقفال شهري مكتمل في Hysaab: تُنجَز مهام تقويم الإقفال من T+1 إلى T+4، ويؤكد صاحب العقد استحقاقه، وتُحفظ أوراق العمل الـ31 في ملف الإقفال، ويُقفل أكتوبر في يوم العمل الرابع.",
    bar: "Helio Trading LLC · إقفال الفترة · أكتوبر 2026", tag: "توضيحي", cal: "تقويم الإقفال",
    doneOf: (d, n) => `أُنجز ${d} من ${n}`, inProgress: "قيد التنفيذ", waiting: "بانتظار",
    binder: "ملف الإقفال · أكتوبر 2026", filed: "محفوظة", xlsx: false, sig: "أُعدّت · رُوجعت",
    lockK: "الفترة مُقفلة", lockH: "أُقفل أكتوبر", lockS: "31 ورقة عمل محفوظة · 0 بنود مفتوحة", lockSign: "P · راجعتها ل.ح. 16:40",
    cap: "إقفال توضيحي · بيانات تجريبية", play: "تشغيل", pause: "إيقاف مؤقت", srBtn: " لرسم الإقفال المتحرك",
  },
};

const SCENE_B = 6200;   // the binder
const FILE_EVERY = 115; // ms per workpaper
const SCENE_C = 10_400; // locked

export function CloseFilm({ locale = "en" }: { locale?: "en" | "ar" } = {}) {
  const c = COPY[locale];
  const TASKS = c.tasks, PAPERS = c.papers;
  const [t, setT] = useState(LOOP - 1);   // server render and no-JS: the finished close
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(true);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setStill(mq.matches);
    set();
    mq.addEventListener("change", set);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    if (root.current) io.observe(root.current);
    return () => { mq.removeEventListener("change", set); io.disconnect(); };
  }, []);

  useEffect(() => {
    if (still) { setT(LOOP - 1); return; }
    if (paused || !visible) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setT((x) => (x + TICK) % LOOP);
    }, TICK);
    return () => window.clearInterval(id);
  }, [still, paused, visible]);

  const scene = t < SCENE_B ? "cal" : t < SCENE_C ? "binder" : "locked";
  const done = TASKS.filter((x) => t >= x[3]).length;
  const filed = scene === "cal" ? 0 : scene === "locked" ? PAPERS.length : Math.min(PAPERS.length, Math.floor((t - SCENE_B) / FILE_EVERY) + 1);

  // Keep the newest filed workpaper in view inside the binder list.
  useEffect(() => {
    const ol = list.current;
    if (!ol || scene !== "binder") return;
    const li = ol.children[Math.max(0, filed - 1)] as HTMLElement | undefined;
    if (li) ol.scrollTop = Math.max(0, li.offsetTop - ol.clientHeight + li.offsetHeight + 8);
  }, [filed, scene]);
  useEffect(() => { if (scene === "cal" && list.current) list.current.scrollTop = 0; }, [scene]);

  return (
    <figure className="cf" ref={root} data-scene={scene} data-still={still ? "" : undefined}>
      <p className="hw-sr">
        {c.sr}
      </p>
      <div className="cf-win" aria-hidden="true">
        <div className="cf-bar">
          <span className="cf-dots"><i /><i /><i /></span>
          <span>{c.bar}</span>
          <span className="cf-tag">{c.tag}</span>
        </div>

        <div className="cf-stage">
          {/* Scene 1: the close calendar */}
          <section className="cf-scene cf-cal">
            <header className="cf-h">
              <b>{c.cal}</b>
              <span>{c.doneOf(done, TASKS.length)}</span>
            </header>
            <div className="cf-prog"><i style={{ width: `${Math.round((done / TASKS.length) * 100)}%` }} /></div>
            <ul>
              {TASKS.map(([d, task, who, at], i) => {
                const ok = t >= at;
                const now = !ok && (i === 0 || t >= TASKS[i - 1][3]);
                return (
                  <li key={task} className={ok ? "ok" : now ? "now" : ""}>
                    <span className="cf-d"><bdi>{d}</bdi></span>
                    <span className="cf-m">{ok ? "✓" : ""}</span>
                    <span className="cf-t">{task}<small>{ok ? who : now ? c.inProgress : c.waiting}</small></span>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Scene 2 and 3: the binder, then locked */}
          <section className="cf-scene cf-binder">
            <header className="cf-h">
              <b>{c.binder}</b>
              <span><bdi><b className="cf-n">{filed}</b> / {PAPERS.length}</bdi> {c.filed}</span>
            </header>
            <ol ref={list}>
              {PAPERS.map((p, i) => (
                <li key={p} className={i < filed ? "in" : ""}>
                  <span className="cf-no">{String(i).padStart(2, "0")}</span>
                  <span className="cf-p">{p}{c.xlsx ? ".xlsx" : ""}</span>
                  <span className="cf-sig">{c.sig} <b>✓</b></span>
                </li>
              ))}
            </ol>
            <div className="cf-lock">
              <p className="cf-lock-k">{c.lockK}</p>
              <p className="cf-lock-h">{c.lockH}</p>
              <p className="cf-lock-s"><b><bdi>T+4</bdi></b> · {c.lockS}</p>
              <p className="cf-lock-sign">{c.lockSign}</p>
            </div>
          </section>
        </div>
      </div>
      <figcaption className="cf-cap">
        <span>{c.cap}</span>
        {!still && (
          <button type="button" className="cf-pause" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
            {paused ? c.play : c.pause}<span className="hw-sr">{c.srBtn}</span>
          </button>
        )}
      </figcaption>
    </figure>
  );
}

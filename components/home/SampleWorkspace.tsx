"use client";

/* ── Sample workspace: "Prepare October for review" ──────────────────
   One recognisable piece of finance work, start to finish, under the
   homepage hero (owner brief, 2026-10-25). The visitor presses one
   button and watches Hysaab:
     1. find a gap (a recurring supplier bill missing for October),
     2. investigate it (the prior invoice, the contract clause, the
        ledger and the bank),
     3. prepare the response (a draft accrual and its effect),
     4. answer "Why this entry?" (the evidence, the owner's confirmation,
        what it remembered), and
     5. hand it to review (journal and workpaper together, approval still
        required).
   It is a SAMPLE: Helio Trading LLC is the app's fictional sample company,
   nothing is sent anywhere, and the page says so. The figures tie: the
   contract fee is AED 2,800 a month from 1 July; July to September are
   billed (8,400); October's service is owed and unbilled, so 11,200 −
   8,400 = 2,800. The flow mirrors the product's contract accruals and
   close binder (workpaper 12, Accruals).
   English and Arabic copy (the Arabic for the native reviewer).
   Accessibility: every step is reachable by button; changes are announced
   in a polite live region; reduced motion drops the auto-advance pauses. */

import { useEffect, useRef, useState } from "react";
import "./sample-workspace.css";

type Copy = {
  steps: string[]; say: string[]; bar: string; tag: string; railAria: string; paneAria: string;
  startK: string; startBig: string; startP: string; go: string; arrow: string;
  gapTag: string; gapK: string; gapH: string; gapP: string;
  invK: string; ev: [string, string, string][]; evZero: string;
  draftTag: string; draftK: string; acct: string; dr: string; cr: string; je: [string, string, string][]; draftP: string; whyBtn: string;
  verified: string; whyK: string; why: [string, string][]; toReview: string;
  apprTag: string; apprWho: string; wpFile: string; wpLine: string; wpEv: string;
  approve: string; ask: string; approved: string; asked: string; next: string; cap: string; replay: string;
};

const COPY: Record<"en" | "ar", Copy> = {
  en: {
    steps: ["Find the gap", "Investigate", "Prepare the entry", "Why this entry?", "Ready for review"],
    say: [
      "Step 1 of 5. Hysaab found a gap: no October bill from Hygeia Cleaning, which has billed every month since July.",
      "Step 2 of 5. It investigated: the September invoice, the contract clause, the ledger and the bank payment.",
      "Step 3 of 5. It prepared a draft accrual of AED 2,800 that reverses on 1 November.",
      "Step 4 of 5. Why this entry: the contract, the bills to date, the owner’s confirmation and what Hysaab remembered.",
      "Step 5 of 5. The journal and its workpaper are ready for review. Approval is still required.",
    ],
    bar: "Helio Trading LLC · Period close · October 2026", tag: "Sample workspace", railAria: "What Hysaab does", paneAria: "Sample workspace, October review",
    startK: "October 2026 · close day T+1", startBig: "One month of books, one button.",
    startP: "Watch Hysaab find what is missing, work out why, and prepare the entry with its evidence. You make the call.",
    go: "Prepare October for review", arrow: "→",
    gapTag: "Unresolved", gapK: "Recurring bill missing", gapH: "Hygeia Cleaning Services: no October bill.",
    gapP: "Billed every month since July, AED 2,800 each. Nothing received for October, and the service ran all month.",
    invK: "Investigated · 4 sources",
    ev: [
      ["Last invoice", "INV-HC-0917", "30 Sep · AED 2,800.00 + VAT · for September"],
      ["Contract, clause 4.1", "“AED 2,800 per month”", "exclusive of VAT, twelve months from 1 July 2026"],
      ["Ledger · 6110 Cleaning", "2,800 · 2,800 · 2,800 ·", "Jul · Aug · Sep · Oct"],
      ["Bank", "AED 2,940.00 paid 5 Oct", "September’s invoice, VAT included"],
    ],
    evZero: "0",
    draftTag: "Draft · not posted", draftK: "Proposed journal ACR-1031 · 31 Oct 2026", acct: "Account", dr: "Debit", cr: "Credit",
    je: [["6110 Cleaning and maintenance", "2,800.00", ""], ["2100 Accrued liabilities", "", "2,800.00"]],
    draftP: "Reverses on 1 November, so the November bill is not counted twice. October’s costs rise by AED 2,800 to what was actually used.",
    whyBtn: "Why this entry?",
    verified: "Verified", whyK: "Why this entry",
    why: [
      ["The contract.", "Clause 4.1 fixes AED 2,800 a month. Service to 31 October is AED 11,200."],
      ["The bills.", "July to September are billed: AED 8,400. 11,200 − 8,400 = 2,800 owed and unbilled."],
      ["The owner.", "Sara (Facilities) confirmed on 26 Oct: “Service delivered, invoice delayed.”"],
      ["What Hysaab remembered.", "Hygeia bills in arrears, three months out of three. In August you told Hysaab to accrue it rather than wait."],
    ],
    toReview: "Send to review",
    apprTag: "Approval required", apprWho: "Layla, CFO", wpFile: "Close binder · 12 Accruals.xlsx", wpLine: "ACR-1031 · Hygeia Cleaning · AED 2,800.00",
    wpEv: "Evidence: contract cl. 4.1 · INV-HC-0917 · owner confirmation · ledger to 31 Oct",
    approve: "Approve", ask: "Ask a question",
    approved: "Approved. In your workspace this posts to your ledger now and reverses on 1 November. Here, nothing is posted: this is a sample.",
    asked: "Your question goes to whoever prepared it, and the entry waits. Here, nothing is sent: this is a sample.",
    next: "Next step", cap: "Sample workspace · fictional company and figures · nothing is sent", replay: "Replay",
  },
  /* AR-REVIEW: the sample workspace */
  ar: {
    steps: ["اكتشاف الفجوة", "التحقق", "إعداد القيد", "لماذا هذا القيد؟", "جاهز للمراجعة"],
    say: [
      "الخطوة 1 من 5. وجد Hysaab فجوة: لا فاتورة لشهر أكتوبر من Hygeia Cleaning، التي تصدر فاتورة كل شهر منذ يوليو.",
      "الخطوة 2 من 5. تحقق منها: فاتورة سبتمبر، وبند العقد، ودفتر الأستاذ، والدفعة البنكية.",
      "الخطوة 3 من 5. أعدّ مسودة استحقاق بقيمة 2,800 درهم تُعكس في 1 نوفمبر.",
      "الخطوة 4 من 5. لماذا هذا القيد: العقد، والفواتير حتى الآن، وتأكيد صاحب العقد، وما تذكّره Hysaab.",
      "الخطوة 5 من 5. القيد وورقة عمله جاهزان للمراجعة. ولا يزال الاعتماد مطلوبًا.",
    ],
    bar: "Helio Trading LLC · إقفال الفترة · أكتوبر 2026", tag: "مساحة عمل تجريبية", railAria: "ما يفعله Hysaab", paneAria: "مساحة عمل تجريبية، مراجعة أكتوبر",
    startK: "أكتوبر 2026 · يوم الإقفال T+1", startBig: "شهر من الدفاتر، وزر واحد.",
    startP: "شاهد Hysaab يجد ما ينقص، ويعرف السبب، ويُعدّ القيد مع دليله. والقرار لك.",
    go: "جهّز أكتوبر للمراجعة", arrow: "←",
    gapTag: "غير محسوم", gapK: "فاتورة متكررة ناقصة", gapH: "Hygeia Cleaning Services: لا فاتورة لشهر أكتوبر.",
    gapP: "فاتورة كل شهر منذ يوليو، 2,800 درهم لكل منها. لم يصل شيء عن أكتوبر، والخدمة استمرت طوال الشهر.",
    invK: "تم التحقق · 4 مصادر",
    ev: [
      ["آخر فاتورة", "INV-HC-0917", "30 سبتمبر · 2,800.00 درهم + الضريبة · عن سبتمبر"],
      ["العقد، البند 4.1", "«2,800 درهم شهريًا»", "دون ضريبة القيمة المضافة، اثنا عشر شهرًا من 1 يوليو 2026"],
      ["دفتر الأستاذ · 6110 التنظيف", "2,800 · 2,800 · 2,800 ·", "يوليو · أغسطس · سبتمبر · أكتوبر"],
      ["البنك", "2,940.00 درهم دُفعت في 5 أكتوبر", "فاتورة سبتمبر، شاملة الضريبة"],
    ],
    evZero: "0",
    draftTag: "مسودة · غير مُرحّلة", draftK: "القيد المقترح ACR-1031 · 31 أكتوبر 2026", acct: "الحساب", dr: "مدين", cr: "دائن",
    je: [["6110 التنظيف والصيانة", "2,800.00", ""], ["2100 المصروفات المستحقة", "", "2,800.00"]],
    draftP: "يُعكس في 1 نوفمبر، فلا تُحتسب فاتورة نوفمبر مرتين. وترتفع تكاليف أكتوبر بمقدار 2,800 درهم إلى ما استُهلك فعلًا.",
    whyBtn: "لماذا هذا القيد؟",
    verified: "تم التحقق", whyK: "لماذا هذا القيد",
    why: [
      ["العقد.", "البند 4.1 يحدد 2,800 درهم شهريًا. الخدمة حتى 31 أكتوبر قيمتها 11,200 درهم."],
      ["الفواتير.", "صدرت فواتير يوليو إلى سبتمبر: 8,400 درهم. 11,200 − 8,400 = 2,800 مستحقة ولم تُفوتر."],
      ["صاحب العقد.", "أكدت سارة (المرافق) في 26 أكتوبر: «الخدمة قُدّمت، والفاتورة متأخرة»."],
      ["ما تذكّره Hysaab.", "تصدر Hygeia فواتيرها متأخرة، ثلاثة أشهر من ثلاثة. وفي أغسطس طلبت من Hysaab أن يستحقها بدل الانتظار."],
    ],
    toReview: "أرسله للمراجعة",
    apprTag: "مطلوب الاعتماد", apprWho: "ليلى، المديرة المالية", wpFile: "ملف الإقفال · 12 المستحقات", wpLine: "ACR-1031 · Hygeia Cleaning · 2,800.00 درهم",
    wpEv: "الدليل: العقد البند 4.1 · INV-HC-0917 · تأكيد صاحب العقد · دفتر الأستاذ حتى 31 أكتوبر",
    approve: "اعتمد", ask: "اطرح سؤالًا",
    approved: "اعتُمد. في مساحة عملك يُرحّل الآن إلى نظامك المحاسبي ويُعكس في 1 نوفمبر. هنا لا يُرحّل شيء: هذه عينة.",
    asked: "يذهب سؤالك إلى من أعدّ القيد، وينتظر القيد. هنا لا يُرسل شيء: هذه عينة.",
    next: "الخطوة التالية", cap: "مساحة عمل تجريبية · شركة وأرقام خيالية · لا يُرسل شيء", replay: "أعد التشغيل",
  },
};

export function SampleWorkspace({ locale = "en" }: { locale?: "en" | "ar" } = {}) {
  const c = COPY[locale];
  const [step, setStep] = useState(-1);      // -1: not started
  const [why, setWhy] = useState(false);
  const [call, setCall] = useState<string | null>(null);
  const [calm, setCalm] = useState(false);
  const timer = useRef<number | null>(null);
  const live = useRef<HTMLParagraphElement>(null);
  const pane = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setCalm(mq.matches);
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, []);

  // Steps 1 to 3 run on their own (the agent working); step 4 waits for the
  // visitor's "Why this entry?" click, which is the point of the demo.
  useEffect(() => {
    if (step < 0 || step >= 2 || calm) return;
    timer.current = window.setTimeout(() => setStep((s) => s + 1), 2200);
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [step, calm]);

  useEffect(() => { if (step >= 0 && live.current) live.current.textContent = c.say[step]; }, [step, c]);

  // Keep the newest card in view inside the workspace (never scrolls the page).
  useEffect(() => {
    const el = pane.current;
    if (!el || step < 0) return;
    const cards = el.querySelectorAll<HTMLElement>(".sw-card");
    const last = cards[cards.length - 1];
    if (last) el.scrollTo({ top: Math.max(0, last.offsetTop - 12), behavior: calm ? "auto" : "smooth" });
  }, [step, why, call, calm]);

  const start = () => { setWhy(false); setCall(null); setStep(0); };
  const openWhy = () => { setWhy(true); setStep(3); };
  const toReview = () => setStep(4);
  const state = (i: number) => (i < step || (i === 3 && why && step >= 3) || (i === 4 && call) ? "done" : i === step ? "now" : "todo");

  return (
    <div className="sw" id="sample">
      <div className="sw-win">
        <div className="sw-bar">
          <span className="sw-dots" aria-hidden="true"><i /><i /><i /></span>
          <span>{c.bar}</span>
          <span className="sw-tag">{c.tag}</span>
        </div>
        <div className="sw-body">
          <ol className="sw-rail" aria-label={c.railAria}>
            {c.steps.map((s, i) => (
              <li key={s} className={state(i)} aria-current={i === step ? "step" : undefined}>
                <span className="sw-n">{state(i) === "done" ? "✓" : i + 1}</span>{s}
              </li>
            ))}
          </ol>

          <div className="sw-main" ref={pane} tabIndex={0} role="region" aria-label={c.paneAria}>
            {step < 0 && (
              <div className="sw-start">
                <p className="sw-k">{c.startK}</p>
                <p className="sw-big">{c.startBig}</p>
                <p className="sw-p">{c.startP}</p>
                <button type="button" className="sw-go" onClick={start}>{c.go} <span aria-hidden="true">{c.arrow}</span></button>
              </div>
            )}

            {step >= 0 && (
              <div className="sw-feed">
                {/* 1. The gap */}
                <article className="sw-card sw-in">
                  <p className="sw-k"><span className="sw-amber">{c.gapTag}</span> {c.gapK}</p>
                  <h3>{c.gapH}</h3>
                  <p className="sw-p">{c.gapP}</p>
                </article>

                {/* 2. Investigate */}
                {step >= 1 && (
                  <article className="sw-card sw-in">
                    <p className="sw-k">{c.invK}</p>
                    <div className="sw-ev">
                      {c.ev.map(([k, b, sm], i) => (
                        <div key={k}><span>{k}</span><b>{b}{i === 2 && <> <em>{c.evZero}</em></>}</b><small>{sm}</small></div>
                      ))}
                    </div>
                  </article>
                )}

                {/* 3. Prepare */}
                {step >= 2 && (
                  <article className="sw-card sw-in">
                    <p className="sw-k"><span className="sw-amber">{c.draftTag}</span> {c.draftK}</p>
                    <table className="sw-je">
                      <thead><tr><th>{c.acct}</th><th>{c.dr}</th><th>{c.cr}</th></tr></thead>
                      <tbody>{c.je.map(([a, d, cr]) => <tr key={a}><td>{a}</td><td>{d}</td><td>{cr}</td></tr>)}</tbody>
                    </table>
                    <p className="sw-p">{c.draftP}</p>
                    {step === 2 && (
                      <button type="button" className="sw-why" onClick={openWhy}>{c.whyBtn} <span aria-hidden="true">↓</span></button>
                    )}
                  </article>
                )}

                {/* 4. Why */}
                {why && (
                  <article className="sw-card sw-in sw-whycard">
                    <p className="sw-k"><span className="sw-green">{c.verified}</span> {c.whyK}</p>
                    <ul className="sw-list">{c.why.map(([b, t]) => <li key={b}><b>{b}</b> {t}</li>)}</ul>
                    {step === 3 && <button type="button" className="sw-go sw-go--sm" onClick={toReview}>{c.toReview} <span aria-hidden="true">{c.arrow}</span></button>}
                  </article>
                )}

                {/* 5. Review */}
                {step >= 4 && (
                  <article className="sw-card sw-in sw-review">
                    <p className="sw-k"><span className="sw-amber">{c.apprTag}</span> {c.apprWho}</p>
                    <div className="sw-wp">
                      <span>{c.wpFile}</span>
                      <b>{c.wpLine}</b>
                      <small>{c.wpEv}</small>
                    </div>
                    {!call ? (
                      <div className="sw-acts">
                        <button type="button" className="sw-go sw-go--sm" onClick={() => setCall(c.approved)}>{c.approve}</button>
                        <button type="button" className="sw-line" onClick={() => setCall(c.asked)}>{c.ask}</button>
                      </div>
                    ) : (
                      <p className="sw-done" role="status"><span aria-hidden="true">✓</span> {call}</p>
                    )}
                  </article>
                )}

                {step >= 0 && step < 2 && calm && (
                  <button type="button" className="sw-line" onClick={() => setStep((s) => s + 1)}>{c.next}</button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="sw-cap">
        <span>{c.cap}</span>
        {step >= 0 && <button type="button" className="sw-line sw-line--sm" onClick={start}>{c.replay}</button>}
      </p>
      <p className="hw-sr" aria-live="polite" ref={live} />
    </div>
  );
}

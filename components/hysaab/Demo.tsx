"use client";

/* ── The story + interactive product demo ──────────────────────────
   Five beats on the left drive a sticky product window on the right.
   State machine per the design handoff (README "Demo state machine"):
   beat 1..5, playing, tab, chq (null|'petty'|'ask'), acc[3], locked.
   Autoplay advances every 5.2s while playing; any click takes control.
   Nothing persists; the demo resets on reload.
   Website change plan 2026-09-23: the scenario is a group. Al Noor
   Group runs four entities across Dubai and Riyadh; Layla is Group
   CFO; Rashid runs a site in the Dubai entity; Omar keeps petty cash
   (renamed from Noor so the person and the group do not share a name). */

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "../Wordmark";

type Tab = "docs" | "bank" | "decisions" | "close" | "report";
type Chq = null | "petty" | "ask";
type Locale = "en" | "ar";

const TAB_FOR: Tab[] = ["docs", "docs", "decisions", "close", "report"];
const AUTOPLAY_MS = 5200;

/* ── Strings ───────────────────────────────────────────────────────
   English is the source of truth; the Arabic table must match its shape.
   Codes (INV-4471, J-2291, D-124, TRN, SI-1187, SUB-0917), digits and the
   supplier name inside the invoice image stay Latin in both languages. */
const EN = {
  beats: [
    { t: "21:00", h: "An invoice lands on WhatsApp.", p: <>Rashid, a site manager in the Dubai entity, photographs a supplier invoice from his car. That is the whole job on his side. No app to open, no fields to fill.</> },
    { t: "21:02", h: "Read, checked, coded, posted.", p: <>Two minutes later the entry is in Zoho Books at 96% confidence, tax-tested, with the photo attached. Nobody was asked anything.</> },
    { t: "06:06", h: "One line needs a human.", p: <>Overnight, 312 of 314 bank lines matched themselves. A cheque for AED 250 has no document. Layla gets one plain question, not a spreadsheet. <strong>Resolve it in the window →</strong></> },
    { t: "Day 2", h: "Three approvals between Layla and a lock.", p: <>The close ran all month. What is left is a checklist with three accruals on it. <strong>Approve them and lock the period.</strong></> },
    { t: "Day 2", h: "The report says what moved, and why.", p: <>Gross margin down 2.1 points, explained in a sentence and traced to a document. Rashid reads his entity’s numbers on his phone. Layla sends the group pack to the board.</> },
  ],
  pauseReplay: "Pause replay",
  playReplay: "Play replay",
  modeReplaying: "Replaying the night. Click anything to take control.",
  modeControls: "You have the controls. Click a beat or a tab.",
  beatOf: (n: number) => `Beat ${n} of 5`,
  org: "Al Noor Group · Dubai entity",
  user: "Layla H.",
  productAreas: "Product areas",
  tabDocs: "Documents",
  tabBank: "Bank",
  tabDecisions: (n: number) => `Decisions · ${n}`,
  tabClose: (pct: number) => `Close · ${pct}%`,
  tabReports: "Reports",
  // Documents pane
  docTitle: "INV-4471 · Gulf Technical Supplies",
  docPosted: "Posted 21:02 · J-2291 · no question for you",
  docArrived: "Arrived 21:00 via WhatsApp · reading",
  docSup: "GULF TECHNICAL SUPPLIES LLC",
  docKind: "TAX INVOICE",
  docMeta: "TRN 100234567800003 · Al Quoz 3, Dubai",
  docLine1: "Server rack rails ×4",
  docLine2: "Cable management kit",
  docLine3: "Delivery",
  docLine4: "VAT 5%",
  docTotal: "Total AED",
  docSrc: "Photo from Rashid · 21:00",
  steps: [
    ["Read.", "Supplier, TRN, date, lines and totals extracted. Arithmetic re-checked."],
    ["Checked.", "Tax-invoice criteria met. Not a duplicate of INV-4468."],
    ["Coded.", "IT equipment · Dubai office, 96%, from 31 similar entries."],
    ["Posted.", "Journal J-2291 to Zoho Books at 21:02, evidence attached."],
  ] as [string, string][],
  entry: "Entry",
  entryIt: "IT equipment",
  entryVat: "Input VAT recoverable",
  entryAp: "Accounts payable",
  // Bank pane
  bankTitle: "Emirates NBD ···4402",
  bankAsking: "312 of 314 matched · 1 asking you",
  bankReconciled: "314 of 314 matched · reconciled",
  statement: "Statement",
  ledger: "Ledger",
  unexplained: "Unexplained",
  d12: "12 Sep",
  d11: "11 Sep",
  d10: "10 Sep",
  d09: "09 Sep",
  ln1Desc: "TRF GULF TECHNICAL SUP",
  ln1Ref: "INV-4471 · J-2291",
  ln2Desc: "POS ADNOC 8821",
  ln2Ref: "Receipt · fuel card",
  ln3Desc: "INWARD RTGS ELC GROUP",
  ln3Ref: "SI-1187 part payment",
  ln4Desc: "CHQ 100421 · 250.00",
  ln4NoDoc: "No document found",
  ln4Petty: "Petty cash · Layla H.",
  ln4Slip: "Slip requested from Omar",
  ln5Desc: "BANK CHARGES",
  ln5Ref: "Rule · bank charges",
  stMatched: "Matched",
  stAsking: "Asking you",
  stResolved: "Resolved",
  stPosted: "Posted",
  bankFootOpen: "One line needs you. Open Decisions to resolve it.",
  bankFootDone: "Every line explained. Nothing carried forward.",
  // Decisions pane
  decTitle: "Waiting on you",
  decStatus: (n: number) => `${n} open · assigned to Layla`,
  d124h: "Cheque 100421 cleared with no document",
  d124p: "AED 250.00 left the account on 10 Sep. No invoice, receipt or approval matches it. Nearest pattern: petty-cash top-ups by Omar on the 10th of each month (AED 250, 4 of the last 6 months).",
  postPetty: "Post as petty cash",
  askNoor: "Ask Omar for the slip",
  resolvedPetty: "posted as petty cash",
  resolvedSlip: "slip requested from Omar",
  d124Resolved: (how: string) => `D-124 resolved · ${how}`,
  d124ResolvedP: "Reason recorded by Layla H. at 06:11. The bank now reconciles to the dirham.",
  d118h: "Coding below confidence threshold · 74%",
  d118p: "Gray Mackenzie, AED 14,720. Proposed Office consumables; history suggests Staff welfare.",
  d117h: "Tax invoice criteria not met",
  d117p: "Almara Catering INV-8512: supplier TRN missing. AED 1,036 input VAT held until corrected.",
  // Close pane
  closeTitle: "September 2026 · day 2 of close",
  lockedDays: "Locked · 2 days",
  readyToLock: "Ready to lock",
  approvalsOf: (n: number) => `${n} of 3 approvals`,
  progress: "Progress",
  chkDocs: "Documents in · 214 filed, 4 duplicates removed",
  chkBank: "Bank reconciliation · 4 accounts",
  chkRecurring: "Recurring journals and schedules released",
  accruals: [
    "Accrual · Etisalat fibre, May and June · AED 4,300",
    "Accrual · Marina fit-out subcontractor · AED 61,000",
    "Accrual · September audit fee · AED 12,000",
  ],
  approve: "Approve",
  periodLock: "Period lock · yours to press",
  lockSeptember: "Lock September",
  closeFootLocked: "September is locked. No agent can post into it; corrections go to October, on the record.",
  closeFootReady: "All approvals in. Lock the period and the pack rebuilds.",
  closeFootApprove: "Approve the accruals to clear the checklist.",
  // Reports pane
  reportTitle: "Management pack · September 2026",
  reportRebuilt: "Rebuilt from the locked ledger · 09:40",
  reportDraft: "Draft · rebuilds when September locks",
  revenue: "Revenue",
  revenueS: "+6.2% vs Aug",
  grossMargin: "Gross margin",
  grossMarginS: "down 2.1 pts",
  cash: "Cash",
  cashS: "3 accounts, reconciled",
  whyH: "Why gross margin moved",
  whyP: "AED 61,000 of subcontractor cost on the Marina fit-out was billed in September while the client invoice falls in October. With the accrued-revenue entry Layla approved at close, margin on the job is unchanged; the timing shows here and reverses next month.",
  chip1: "Trace: J-2314 accrual",
  chip2: "Trace: SUB-0917 invoice",
  chip3: "Open job ledger",
  forRashid: <><strong>For Rashid, Dubai entity:</strong> money in 1.84m, money out 1.52m, owed to the entity 1.96m. Two customers are late; reminders are out.</>,
  forBoard: <><strong>For the board:</strong> pack exported to PDF, every figure linked to its source. Sent by Layla at 09:40.</>,
};

type Strings = typeof EN;

const AR: Strings = {
  beats: [
    { t: "21:00", h: "فاتورة تصل على واتساب.", p: <>يصوّر راشد، مدير موقع في كيان دبي، فاتورة مورّد من سيارته. هذا كل ما عليه فعله. لا تطبيق يفتحه ولا حقول يملؤها.</> },
    { t: "21:02", h: "قُرئت، وفُحصت، ورُمّزت، ورُحِّلت.", p: <>بعد دقيقتين يكون القيد في Zoho Books بثقة 96%، مختبَرًا ضريبيًا، والصورة مرفقة به. لم يُسأل أحد عن شيء.</> },
    { t: "06:06", h: "سطر واحد يحتاج إلى إنسان.", p: <>خلال الليل، تطابق 312 من 314 سطرًا بنكيًا من تلقاء نفسها. شيك بقيمة 250 درهمًا لا مستند له. تصل ليلى سؤالًا واحدًا واضحًا، لا جدول بيانات. <strong>حلّ الأمر في النافذة ←</strong></> },
    { t: "اليوم 2", h: "ثلاث موافقات تفصل ليلى عن القفل.", p: <>كان الإقفال يعمل طوال الشهر. ما تبقى قائمة تحقق عليها ثلاثة استحقاقات. <strong>اعتمدها وأقفل الفترة.</strong></> },
    { t: "اليوم 2", h: "التقرير يقول ما الذي تغيّر، ولماذا.", p: <>هامش الربح الإجمالي تراجع 2.1 نقطة، مشروحًا في جملة ومتتبَّعًا إلى مستند. يقرأ راشد أرقام كيانه على هاتفه. وترسل ليلى حزمة المجموعة إلى مجلس الإدارة.</> },
  ],
  pauseReplay: "إيقاف الإعادة مؤقتًا",
  playReplay: "تشغيل الإعادة",
  modeReplaying: "إعادة تشغيل الليلة. انقر أي شيء لتتولى التحكم.",
  modeControls: "التحكم بيدك. انقر مشهدًا أو تبويبًا.",
  beatOf: (n: number) => `المشهد ${n} من 5`,
  /* AR-REVIEW: the group scenario lines in this table (org, beats 1 and 5, عمر, forRashid). */
  org: "مجموعة النور · كيان دبي",
  user: "ليلى ح.",
  productAreas: "أقسام المنتج",
  tabDocs: "المستندات",
  tabBank: "البنك",
  tabDecisions: (n: number) => `القرارات · ${n}`,
  tabClose: (pct: number) => `الإقفال · ${pct}%`,
  tabReports: "التقارير",
  // Documents pane
  docTitle: "INV-4471 · جلف تكنيكال سبلايز",
  docPosted: "رُحِّلت 21:02 · J-2291 · لا سؤال لك",
  docArrived: "وصلت 21:00 عبر واتساب · قيد القراءة",
  docSup: "GULF TECHNICAL SUPPLIES LLC",
  docKind: "فاتورة ضريبية",
  docMeta: "TRN 100234567800003 · القوز 3، دبي",
  docLine1: "سكك رفوف خوادم ×4",
  docLine2: "طقم تنظيم الكابلات",
  docLine3: "التوصيل",
  docLine4: "ضريبة القيمة المضافة 5%",
  docTotal: "الإجمالي بالدرهم",
  docSrc: "صورة من راشد · 21:00",
  steps: [
    ["قُرئت.", "استُخرج المورّد والرقم الضريبي والتاريخ والبنود والإجماليات. وأُعيد التحقق من الحساب."],
    ["فُحصت.", "معايير الفاتورة الضريبية مستوفاة. ليست نسخة مكررة من INV-4468."],
    ["رُمّزت.", "معدات تقنية المعلومات · مكتب دبي، 96%، من 31 قيدًا مماثلًا."],
    ["رُحِّلت.", "القيد J-2291 إلى Zoho Books في 21:02، مع إرفاق الدليل."],
  ],
  entry: "القيد",
  entryIt: "معدات تقنية المعلومات",
  entryVat: "ضريبة مدخلات قابلة للاسترداد",
  entryAp: "ذمم دائنة",
  // Bank pane
  bankTitle: "بنك الإمارات دبي الوطني ···4402",
  bankAsking: "تطابق 312 من 314 · 1 بانتظارك",
  bankReconciled: "تطابق 314 من 314 · مُسوّى",
  statement: "كشف الحساب",
  ledger: "دفتر الأستاذ",
  unexplained: "غير مفسَّر",
  d12: "12 سبتمبر",
  d11: "11 سبتمبر",
  d10: "10 سبتمبر",
  d09: "09 سبتمبر",
  ln1Desc: "تحويل · GULF TECHNICAL SUP",
  ln1Ref: "INV-4471 · J-2291",
  ln2Desc: "نقطة بيع · ADNOC 8821",
  ln2Ref: "إيصال · بطاقة وقود",
  ln3Desc: "وارد RTGS · ELC GROUP",
  ln3Ref: "دفعة جزئية SI-1187",
  ln4Desc: "شيك 100421 · 250.00",
  ln4NoDoc: "لا مستند",
  ln4Petty: "نثرية · ليلى ح.",
  ln4Slip: "طُلب الإيصال من عمر",
  ln5Desc: "رسوم بنكية",
  ln5Ref: "قاعدة · رسوم بنكية",
  stMatched: "مطابَق",
  stAsking: "بانتظارك",
  stResolved: "محلول",
  stPosted: "مرحَّل",
  bankFootOpen: "سطر واحد يحتاجك. افتح القرارات لحلّه.",
  bankFootDone: "كل سطر مفسَّر. لا شيء مرحَّل إلى الأمام.",
  // Decisions pane
  decTitle: "بانتظارك",
  decStatus: (n: number) => `${n} مفتوحة · مسندة إلى ليلى`,
  d124h: "شيك 100421 صُرف دون مستند",
  d124p: "خرج 250.00 درهم من الحساب في 10 سبتمبر. لا فاتورة ولا إيصال ولا موافقة تطابقه. أقرب نمط: تعبئة النثرية من عمر في العاشر من كل شهر (250 درهمًا، 4 من آخر 6 أشهر).",
  postPetty: "ترحيل كنثرية",
  askNoor: "اطلب الإيصال من عمر",
  resolvedPetty: "رُحِّل كنثرية",
  resolvedSlip: "طُلب الإيصال من عمر",
  d124Resolved: (how: string) => `D-124 محلول · ${how}`,
  d124ResolvedP: "سُجّل السبب بواسطة ليلى ح. في 06:11. البنك الآن مُسوّى حتى الدرهم.",
  d118h: "ترميز دون عتبة الثقة · 74%",
  d118p: "Gray Mackenzie، 14,720 درهمًا. المقترح مستلزمات مكتبية؛ والتاريخ يرجّح رفاه الموظفين.",
  d117h: "معايير الفاتورة الضريبية غير مستوفاة",
  d117p: "Almara Catering INV-8512: الرقم الضريبي للمورّد مفقود. ضريبة مدخلات بقيمة 1,036 درهمًا محجوزة حتى التصحيح.",
  // Close pane
  closeTitle: "سبتمبر 2026 · اليوم 2 من الإقفال",
  lockedDays: "مُقفل · يومان",
  readyToLock: "جاهز للإقفال",
  approvalsOf: (n: number) => `${n} من 3 موافقات`,
  progress: "التقدم",
  chkDocs: "المستندات واردة · 214 مؤرشفة، 4 مكررات حُذفت",
  chkBank: "التسوية البنكية · 4 حسابات",
  chkRecurring: "القيود الدورية والجداول صادرة",
  accruals: [
    "استحقاق · ألياف اتصالات، مايو ويونيو · 4,300 درهم",
    "استحقاق · مقاول الباطن لتجهيز المارينا · 61,000 درهم",
    "استحقاق · أتعاب تدقيق سبتمبر · 12,000 درهم",
  ],
  approve: "اعتماد",
  periodLock: "قفل الفترة · الزر بيدك",
  lockSeptember: "إقفال سبتمبر",
  closeFootLocked: "سبتمبر مُقفل. لا يمكن لأي وكيل الترحيل فيه؛ التصحيحات تذهب إلى أكتوبر، مسجَّلة.",
  closeFootReady: "اكتملت الموافقات. أقفل الفترة ويُعاد بناء الحزمة.",
  closeFootApprove: "اعتمد الاستحقاقات لإنهاء قائمة التحقق.",
  // Reports pane
  reportTitle: "حزمة الإدارة · سبتمبر 2026",
  reportRebuilt: "أُعيد بناؤها من الدفتر المُقفل · 09:40",
  reportDraft: "مسودة · يُعاد بناؤها عند إقفال سبتمبر",
  revenue: "الإيرادات",
  revenueS: "+6.2% مقابل أغسطس",
  grossMargin: "هامش الربح الإجمالي",
  grossMarginS: "تراجع 2.1 نقطة",
  cash: "النقد",
  cashS: "3 حسابات، مُسوّاة",
  whyH: "لماذا تحرك هامش الربح الإجمالي",
  whyP: "61,000 درهم من تكلفة مقاول الباطن في تجهيز المارينا فُوترت في سبتمبر بينما تقع فاتورة العميل في أكتوبر. مع قيد الإيراد المستحق الذي اعتمدته ليلى عند الإقفال، هامش المشروع لم يتغير؛ فرق التوقيت يظهر هنا وينعكس الشهر المقبل.",
  chip1: "تتبّع: استحقاق J-2314",
  chip2: "تتبّع: فاتورة SUB-0917",
  chip3: "فتح دفتر المشروع",
  forRashid: <><strong>لراشد، كيان دبي:</strong> المقبوضات 1.84m، المدفوعات 1.52m، المستحق للكيان 1.96m. عميلان متأخران؛ وأُرسلت التذكيرات.</>,
  forBoard: <><strong>لمجلس الإدارة:</strong> الحزمة مصدَّرة إلى PDF، وكل رقم مربوط بمصدره. أرسلتها ليلى في 09:40.</>,
};

const S: Record<Locale, Strings> = { en: EN, ar: AR };

export function Demo({ locale = "en" }: { locale?: Locale }) {
  const s = S[locale];
  const [beat, setBeat] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [tab, setTab] = useState<Tab>("docs");
  const [chq, setChq] = useState<Chq>(null);
  const [acc, setAcc] = useState<[boolean, boolean, boolean]>([false, false, false]);
  const [locked, setLocked] = useState(false);
  const playingRef = useRef(playing);
  playingRef.current = playing;

  // Visitors who ask for reduced motion get the demo paused, controls in hand.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      if (!playingRef.current) return;
      setBeat((b) => {
        const next = b >= 5 ? 1 : b + 1;
        setTab(TAB_FOR[next - 1]);
        return next;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [playing]);

  const goBeat = (n: number) => { setBeat(n); setTab(TAB_FOR[n - 1]); setPlaying(false); };
  const pickTab = (t: Tab) => { setTab(t); setPlaying(false); };

  const chqOpen = chq == null;
  const approved = acc.filter(Boolean).length;
  const closePct = 68 + (chqOpen ? 0 : 4) + approved * 6 + (locked ? 10 : 0);
  const canLock = approved === 3 && !locked;
  const openCount = (chqOpen ? 1 : 0) + 2;
  const posted = beat >= 2 || tab !== "docs" || !playing;

  const lockPeriod = () => { setLocked(true); setTab("report"); setBeat(5); setPlaying(false); };

  return (
    <div className="hy-demo" id="demo">
      {/* ── beats ── */}
      <div className="hy-beats">
        <div className="hy-beats-ctl">
          <button type="button" className="hy-btn hy-btn--navy" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}>
            {playing ? s.pauseReplay : s.playReplay}
          </button>
          <span className="hy-beats-mode">{playing ? s.modeReplaying : s.modeControls}</span>
          <span className="hy-beats-n hy-num">{s.beatOf(beat)}</span>
        </div>
        {s.beats.map((b, i) => {
          const n = i + 1;
          return (
            <button type="button" key={n} className="hy-beat" onClick={() => goBeat(n)} aria-current={beat === n ? "step" : undefined}>
              <span className="hy-beat-time">
                <span className="hy-beat-t">{b.t}</span>
                <span className="hy-beat-bar" />
              </span>
              <span className="hy-beat-body">
                <span className="hy-beat-h">{b.h}</span>
                <span className="hy-beat-p">{b.p}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* ── product window ── */}
      <div className="hy-win" aria-live="polite">
        <div className="hy-win-bar">
          <Wordmark size={15} ground="navy" suffix={false} />
          <span className="hy-win-org">{s.org}</span>
          <span className="hy-win-user"><span className="hy-win-user-n">{s.user}</span><span className="hy-win-avatar" aria-hidden="true">LH</span></span>
        </div>
        <div className="hy-tabs" role="tablist" aria-label={s.productAreas}>
          {([
            ["docs", s.tabDocs],
            ["bank", s.tabBank],
            ["decisions", s.tabDecisions(openCount)],
            ["close", s.tabClose(closePct)],
            ["report", s.tabReports],
          ] as [Tab, string][]).map(([t, label]) => (
            <button key={t} type="button" role="tab" className="hy-tab hy-num" aria-selected={tab === t} onClick={() => pickTab(t)}>{label}</button>
          ))}
        </div>

        <div className="hy-pane" role="tabpanel">
          {tab === "docs" && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.docTitle}</span><span className="hy-pane-status">{posted ? s.docPosted : s.docArrived}</span></div>
              <div className="hy-doc-grid">
                <div className="hy-doc">
                  <div className="hy-doc-head"><span className="hy-doc-sup">{s.docSup}</span><span className="hy-doc-kind">{s.docKind}</span></div>
                  <div className="hy-doc-meta">{s.docMeta}</div>
                  <div className="hy-doc-rule" />
                  <div className="hy-doc-lines">
                    <div className="hy-doc-line"><span>{s.docLine1}</span><span>3,200.00</span></div>
                    <div className="hy-doc-line"><span>{s.docLine2}</span><span>640.00</span></div>
                    <div className="hy-doc-line"><span>{s.docLine3}</span><span>150.00</span></div>
                    <div className="hy-doc-line hy-doc-line--muted"><span>{s.docLine4}</span><span>199.50</span></div>
                  </div>
                  <div className="hy-doc-total"><span>{s.docTotal}</span><span>4,189.50</span></div>
                  <span className="hy-doc-src">{s.docSrc}</span>
                </div>
                <div className="hy-steps">
                  {s.steps.map(([h, p], i) => (
                    <div className="hy-step" key={h}>
                      <span className="hy-step-n" data-pending={!posted && i > 0}>{i + 1}</span>
                      <span className="hy-step-p"><strong>{h}</strong> {p}</span>
                    </div>
                  ))}
                  <div className="hy-entry">
                    <span className="hy-entry-l">{s.entry}</span>
                    <div className="hy-doc-line"><span>{s.entryIt}</span><span>3,990.00</span></div>
                    <div className="hy-doc-line"><span>{s.entryVat}</span><span>199.50</span></div>
                    <div className="hy-doc-line"><span>{s.entryAp}</span><span>(4,189.50)</span></div>
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === "bank" && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.bankTitle}</span><span className="hy-pane-status">{chqOpen ? s.bankAsking : s.bankReconciled}</span></div>
              <div className="hy-tiles">
                <div className="hy-tile"><div className="hy-tile-l">{s.statement}</div><div className="hy-tile-n">2,884,112.40</div></div>
                <div className="hy-tile"><div className="hy-tile-l">{s.ledger}</div><div className="hy-tile-n">{chqOpen ? "2,883,862.40" : "2,884,112.40"}</div></div>
                <div className="hy-tile"><div className="hy-tile-l">{s.unexplained}</div><div className={`hy-tile-n${chqOpen ? " hy-tile-n--warn" : ""}`}>{chqOpen ? "250.00" : "0.00"}</div></div>
              </div>
              <div className="hy-lines">
                <div className="hy-line"><span className="hy-line-d">{s.d12}</span><span className="hy-line-desc">{s.ln1Desc}</span><span className="hy-line-ref">{s.ln1Ref}</span><span className="hy-line-st">{s.stMatched}</span></div>
                <div className="hy-line"><span className="hy-line-d">{s.d12}</span><span className="hy-line-desc">{s.ln2Desc}</span><span className="hy-line-ref">{s.ln2Ref}</span><span className="hy-line-st">{s.stMatched}</span></div>
                <div className="hy-line"><span className="hy-line-d">{s.d11}</span><span className="hy-line-desc">{s.ln3Desc}</span><span className="hy-line-ref">{s.ln3Ref}</span><span className="hy-line-st">{s.stMatched}</span></div>
                <div className={`hy-line${chqOpen ? " hy-line--ask" : ""}`}><span className="hy-line-d">{s.d10}</span><span className="hy-line-desc">{s.ln4Desc}</span><span className="hy-line-ref">{chqOpen ? s.ln4NoDoc : chq === "petty" ? s.ln4Petty : s.ln4Slip}</span><span className="hy-line-st">{chqOpen ? s.stAsking : s.stResolved}</span></div>
                <div className="hy-line"><span className="hy-line-d">{s.d09}</span><span className="hy-line-desc">{s.ln5Desc}</span><span className="hy-line-ref">{s.ln5Ref}</span><span className="hy-line-st">{s.stPosted}</span></div>
              </div>
              <span className="hy-pane-foot">{chqOpen ? s.bankFootOpen : s.bankFootDone}</span>
            </>
          )}

          {tab === "decisions" && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.decTitle}</span><span className="hy-pane-status">{s.decStatus(openCount)}</span></div>
              {chqOpen ? (
                <div className="hy-dec hy-dec--open">
                  <div className="hy-dec-row">
                    <span className="hy-dec-id">D-124</span>
                    <div className="hy-dec-body">
                      <span className="hy-dec-h">{s.d124h}</span>
                      <span className="hy-dec-p">{s.d124p}</span>
                    </div>
                  </div>
                  <div className="hy-dec-actions">
                    <button type="button" className="hy-btn hy-btn--navy" onClick={() => setChq("petty")}>{s.postPetty}</button>
                    <button type="button" className="hy-btn hy-btn--outline" onClick={() => setChq("ask")}>{s.askNoor}</button>
                  </div>
                </div>
              ) : (
                <div className="hy-dec" style={{ padding: 14 }}>
                  <span className="hy-tick" aria-hidden="true">✓</span>
                  <div className="hy-dec-body">
                    <span className="hy-dec-h" style={{ fontSize: 13 }}>{s.d124Resolved(chq === "petty" ? s.resolvedPetty : s.resolvedSlip)}</span>
                    <span className="hy-dec-p hy-dec-p--sm">{s.d124ResolvedP}</span>
                  </div>
                </div>
              )}
              <div className="hy-dec"><span className="hy-dec-id">D-118</span><div className="hy-dec-body"><span className="hy-dec-h hy-dec-h--sm">{s.d118h}</span><span className="hy-dec-p hy-dec-p--sm">{s.d118p}</span></div></div>
              <div className="hy-dec"><span className="hy-dec-id">D-117</span><div className="hy-dec-body"><span className="hy-dec-h hy-dec-h--sm">{s.d117h}</span><span className="hy-dec-p hy-dec-p--sm">{s.d117p}</span></div></div>
            </>
          )}

          {tab === "close" && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.closeTitle}</span><span className={`hy-lock-l${locked ? " hy-lock-l--done" : ""}`}>{locked ? s.lockedDays : canLock ? s.readyToLock : s.approvalsOf(approved)}</span></div>
              <div className="hy-progress"><span className="hy-progress-l">{s.progress}</span><span className="hy-progress-track"><span className="hy-progress-fill" style={{ width: `${closePct}%` }} /></span><span className="hy-progress-n">{closePct}%</span></div>
              <div className="hy-check">
                <div className="hy-check-row"><span className="hy-check-box" aria-hidden="true">✓</span><span className="hy-check-l">{s.chkDocs}</span></div>
                <div className="hy-check-row"><span className="hy-check-box" data-state={chqOpen ? "open" : undefined} aria-hidden="true">{chqOpen ? "" : "✓"}</span><span className="hy-check-l">{s.chkBank}</span></div>
                <div className="hy-check-row"><span className="hy-check-box" aria-hidden="true">✓</span><span className="hy-check-l">{s.chkRecurring}</span></div>
                {s.accruals.map((label, i) => (
                  <div className="hy-check-row" key={label}>
                    <span className="hy-check-box" data-state={acc[i] ? undefined : "open"} aria-hidden="true">{acc[i] ? "✓" : ""}</span>
                    <span className="hy-check-l">{label}</span>
                    {!acc[i] && (
                      <button type="button" className="hy-btn hy-btn--navy" onClick={() => setAcc((a) => { const n = [...a] as [boolean, boolean, boolean]; n[i] = true; return n; })}>{s.approve}</button>
                    )}
                  </div>
                ))}
                <div className="hy-check-row">
                  <span className="hy-check-box" data-state={locked ? undefined : "idle"} aria-hidden="true">{locked ? "✓" : ""}</span>
                  <span className="hy-check-l">{s.periodLock}</span>
                  {canLock && <button type="button" className="hy-btn hy-btn--blush" onClick={lockPeriod}>{s.lockSeptember}</button>}
                </div>
              </div>
              <span className="hy-pane-foot">{locked ? s.closeFootLocked : canLock ? s.closeFootReady : s.closeFootApprove}</span>
            </>
          )}

          {tab === "report" && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.reportTitle}</span><span className="hy-pane-status">{locked ? s.reportRebuilt : s.reportDraft}</span></div>
              <div className="hy-tiles">
                <div className="hy-tile"><div className="hy-tile-l">{s.revenue}</div><div className="hy-tile-n">1.84m</div><div className="hy-tile-s">{s.revenueS}</div></div>
                <div className="hy-tile"><div className="hy-tile-l">{s.grossMargin}</div><div className="hy-tile-n">31.4%</div><div className="hy-tile-s hy-tile-s--warn">{s.grossMarginS}</div></div>
                <div className="hy-tile"><div className="hy-tile-l">{s.cash}</div><div className="hy-tile-n">4.21m</div><div className="hy-tile-s">{s.cashS}</div></div>
              </div>
              <div className="hy-why">
                <span className="hy-why-h">{s.whyH}</span>
                <span className="hy-why-p">{s.whyP}</span>
                <div className="hy-chips"><span className="hy-chip">{s.chip1}</span><span className="hy-chip">{s.chip2}</span><span className="hy-chip">{s.chip3}</span></div>
              </div>
              <div className="hy-for">
                <div className="hy-for-card hy-for-card--navy">{s.forRashid}</div>
                <div className="hy-for-card hy-for-card--blush">{s.forBoard}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

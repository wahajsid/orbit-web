"use client";

/* ── Hysaab Finance invoice checks: one invoice, seven stages ──────────────────────
   The left column lists the pipeline the real module runs (inbound →
   extract → reconcile → match + rules → second read → verdict → chase
   and report); the product window on the right shows INV-2107 at that
   stage. Autoplays every 4.8s; any click takes control. Illustrative
   data, same visual language as the homepage demo (hy-win, hy-beat).
   English is the source of truth; the Arabic table (/ar/invoice) must
   match its shape. Supplier names, IDs, TRNs, email addresses and every
   figure stay Latin in both; sums are kept left to right. */

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "../Wordmark";

type Locale = "en" | "ar";
type Tone = "ok" | "bad" | "warn" | "na";
type R = React.ReactNode;

/** A sum, kept left to right inside Arabic text. */
const Sum = ({ children }: { children: R }) => <bdi dir="ltr">{children}</bdi>;

const EN = {
  steps: [
    { t: "09:12", h: "It arrives.", p: "The supplier emails the invoice to the client's own intake address, or your team drops a folder. Old tracking sheets import too, so the register starts complete." },
    { t: "09:12", h: "Every field is read.", p: "A vision model reads supplier, TRNs, dates, lines and tax, and scores its confidence per field. It reads the numbers. It never adds them up." },
    { t: "09:12", h: "The arithmetic is redone in code.", p: "Every line, the VAT at the stated rate and the total are recomputed independently, within your rounding tolerance. A beautiful invoice that does not add up is still caught." },
    { t: "09:13", h: "Matched, then tested against the law.", p: "The recipient is matched to your entity by TRN, which sets the rule profile: UAE Articles 59 and 60, or KSA ZATCA. Blocked input tax, reverse charge, duplicates and the claim window are separate checks." },
    { t: "09:13", h: "A second opinion on anything risky.", p: "A high-risk or low-confidence invoice is read again by an independent model, and a verifier agent confirms or questions each finding. Nothing is changed automatically: disagreements go to a person." },
    { t: "09:31", h: "A verdict with the reason named.", p: "The invoice gets a risk band, the VAT is marked claim or hold, and it lands in the register under its filing period. Noor reviews it in one screen and moves on." },
    { t: "Day 2", h: "The supplier is chased. The client is told.", p: "A correction request citing the exact article goes to the supplier when a person presses send. The corrected invoice supersedes the old one on arrival, and the monthly client report tells the story." },
  ],
  pause: "Pause", play: "Play",
  modePlaying: "Following INV-2107 through the checks.",
  modeControls: "You have the controls. Click any stage.",
  stageOf: (n: number, of: number) => `Stage ${n} of ${of}`,
  org: "invoice · Al Hamra Trading LLC", user: "Noor K.",
  track: ["Intake", "Read", "Maths", "Rules", "2nd read", "Verdict", "Chase"],
  // 0 · intake
  inTitle: "Intake · alhamra@ap.hysaab.ai", inStatus: "3 arrived this morning",
  inPages: "INV-2107.pdf · 2 pages", reading: "Reading", lowRisk: "Low risk",
  inNote: "Each client gets its own intake address. Forward it, or ask suppliers to send invoices straight there. A folder upload and a history import run the same pipeline.",
  // 1 · read
  rdTitle: "INV-2107 · what was read", rdStatus: "confidence per field",
  docKind: "TAX INVOICE", docPlace: "Al Barsha 1, Dubai · ", docTrn: "TRN",
  docL1: "Coffee machines ×2", docL2: "Client dinner, Marina", docVat: "VAT 5%", docTotal: "Total AED", docSrc: "Emailed in · 14 Sep 2026",
  fields: [
    ["Supplier", "Al Madar Hospitality"],
    ["Supplier TRN", "not found on page 1 or 2", "bad"],
    ["Recipient TRN", "100456789000003 · 99%"],
    ["Invoice no.", "INV-2107 · 99%"],
    ["Date", "14 Sep 2026 · 98%"],
    ["Net / VAT", "12,000.00 / 600.00 · 97%"],
  ] as [string, string, ("bad" | undefined)?][],
  // 2 · maths
  mtTitle: "Reconciliation · done in code", mtStatus: "tolerance AED 0.05",
  maths: [
    <>Lines 8,400.00 + 3,600.00 = <strong>12,000.00</strong> net</>,
    <>5% of 12,000.00 = <strong>600.00</strong> VAT, as stated</>,
    <>12,000.00 + 600.00 = <strong>12,600.00</strong> total, as stated</>,
    <>Invoice date is not in the future · no IBAN checksum failure</>,
  ] as R[],
  mtNote: "The model reads. It never calculates. If a total is off by more than your tolerance, the finding names the exact line.",
  // 3 · rules
  ruTitle: "Rules · UAE profile", ruStatus: "recipient matched by TRN → Al Hamra Trading LLC",
  rules: [
    ["ok", <>The words &ldquo;Tax Invoice&rdquo; are displayed</>, "Art. 59(1)(a)"],
    ["bad", <>Supplier TRN missing: not a valid tax invoice</>, "Art. 59(1)(b)"],
    ["ok", <>Recipient name, address and TRN shown</>, "Art. 59(1)(c)"],
    ["ok", <>Sequential number, date, VAT per line in AED</>, "Art. 59(1)(d)–(j)"],
    ["warn", <>&ldquo;Client dinner&rdquo; is potentially blocked input tax</>, "Art. 53"],
    ["na", <>Reverse charge: local supplier, not applicable</>, "RCM"],
    ["ok", <>First sighting of Al Madar · INV-2107, no duplicate</>, "Register"],
    ["ok", <>Inside the claim window: this period or the next</>, "Q3 2026"],
  ] as [Tone, R, string][],
  // 4 · second read
  s2Title: "Second opinion · independent model", s2Status: "triggered by a High band",
  tiles: [["Supplier TRN", "agree", "both reads: absent"], ["Net / VAT", "agree", "12,000.00 / 600.00"], ["Total", "agree", "12,600.00"]],
  verifier: "Verifier",
  verH: "Confirmed: Art. 59(1)(b) supplier TRN missing",
  verP: "Checked the letterhead, the footer and page 2. No 15-digit TRN appears anywhere. Supplier memory has no prior TRN for this vendor.",
  s2Note: "Values are never auto-corrected. When two reads disagree, the fields in dispute are named and a person decides. Every manual correction is journaled.",
  // 5 · verdict
  vdTitle: "Verdict · INV-2107", vdStatus: "reviewed by Noor K. at 09:31", band: "High risk",
  vdH: "Hold AED 600.00 input VAT until a corrected invoice arrives",
  vdP: "Of that, AED 180.00 on the client dinner stays flagged as potentially blocked even after correction. Filed under Q3 2026, Jul to Sep.",
  q: "Q3", vat: (v: string) => `${v} VAT`,
  st: { claim: "Claim", hold: "Hold", chasing: "Chasing" },
  // 6 · chase
  chTitle: "Chase · Al Madar Hospitality", chStatus: "sent by Noor K. · human-triggered",
  chH: "Correction request, drafted",
  chP: "Invoice INV-2107 dated 14 Sep 2026 does not show your Tax Registration Number, required under Article 59(1)(b) of the UAE VAT Executive Regulation. Please re-issue it with your TRN to alhamra@ap.hysaab.ai.",
  chase: ["Sent 14 Sep · corrected invoice received 16 Sep", "Old copy superseded · chase closed automatically", "AED 420.00 now claimable in Q3 · AED 180.00 held as blocked"],
  forClient: <><strong>Client report, September:</strong> 214 invoices, 93.8% compliant by count and 96.1% by VAT value. Nine suppliers chased, seven corrected.</>,
  forSend: <><strong>Before it sends:</strong> a reviewer agent checks every client email, then it waits for a two-step human sign-off.</>,
};

type Strings = typeof EN;

/* AR-REVIEW: every string in the Arabic walkthrough. */
const AR: Strings = {
  steps: [
    { t: "09:12", h: "تصل.", p: "يرسل المورّد الفاتورة بالبريد إلى عنوان الاستلام الخاص بالعميل، أو يُسقط فريقك مجلدًا. وتُستورد جداول المتابعة القديمة أيضًا، فيبدأ السجل مكتملًا." },
    { t: "09:12", h: "كل حقل يُقرأ.", p: "يقرأ نموذج رؤية المورّد وأرقام التسجيل الضريبي والتواريخ والأسطر والضريبة، ويقيّم ثقته في كل حقل. يقرأ الأرقام، ولا يجمعها أبدًا." },
    { t: "09:12", h: "الحساب يُعاد بالشيفرة.", p: "كل سطر، والضريبة بالنسبة المذكورة، والإجمالي، يُعاد احتسابها بشكل مستقل ضمن هامش التقريب الذي تحدده. والفاتورة الأنيقة التي لا يستقيم حسابها تُكشف أيضًا." },
    { t: "09:13", h: "مطابَقة، ثم مختبرة وفق القانون.", p: "يُطابَق المستلم مع كيانك برقم التسجيل الضريبي، فيتحدد ملف القواعد: المادتان 59 و60 في الإمارات، أو قواعد زاتكا في السعودية. وضريبة المدخلات المحظورة، والاحتساب العكسي، والتكرار، ومهلة المطالبة فحوص مستقلة." },
    { t: "09:13", h: "رأي ثانٍ في كل ما ينطوي على خطر.", p: "الفاتورة عالية المخاطر أو منخفضة الثقة يقرؤها نموذج مستقل مرة أخرى، ويؤكد وكيل تحقق كل ملاحظة أو يشكك فيها. لا يتغير شيء تلقائيًا: الخلافات تذهب إلى شخص." },
    { t: "09:31", h: "حكم مع السبب مُسمّى.", p: "تحصل الفاتورة على فئة مخاطر، وتُعلَّم الضريبة للمطالبة أو الإيقاف، وتستقر في السجل تحت فترة إقرارها. تراجعها نور في شاشة واحدة وتمضي." },
    { t: "اليوم 2", h: "يُلاحَق المورّد. ويُبلَّغ العميل.", p: "طلب تصحيح يستشهد بالمادة الدقيقة يذهب إلى المورّد حين يضغط شخص زر الإرسال. والفاتورة المصحّحة تحل محل القديمة عند وصولها، ويروي تقرير العميل الشهري القصة." },
  ],
  pause: "إيقاف مؤقت", play: "تشغيل",
  modePlaying: "نتابع INV-2107 عبر الفحوص.",
  modeControls: "التحكم بيدك. انقر أي مرحلة.",
  stageOf: (n: number, of: number) => `المرحلة ${n} من ${of}`,
  org: "الفواتير · Al Hamra Trading LLC", user: "نور ك.",
  track: ["الاستلام", "القراءة", "الحساب", "القواعد", "قراءة ثانية", "الحكم", "الملاحقة"],
  inTitle: "الاستلام · alhamra@ap.hysaab.ai", inStatus: "3 وصلت هذا الصباح",
  inPages: "INV-2107.pdf · صفحتان", reading: "قيد القراءة", lowRisk: "مخاطر منخفضة",
  inNote: "لكل عميل عنوان استلام خاص به. أعد توجيه الفواتير إليه، أو اطلب من الموردين إرسالها إليه مباشرة. ويمر رفع مجلد واستيراد السجل السابق عبر المسار نفسه.",
  rdTitle: "INV-2107 · ما قُرئ", rdStatus: "الثقة لكل حقل",
  docKind: "فاتورة ضريبية", docPlace: "البرشاء 1، دبي · ", docTrn: "رقم التسجيل الضريبي",
  docL1: "آلات قهوة ×2", docL2: "عشاء عميل، المارينا", docVat: "ضريبة القيمة المضافة 5%", docTotal: "الإجمالي بالدرهم", docSrc: "وصلت بالبريد · 14 سبتمبر 2026",
  fields: [
    ["المورّد", "Al Madar Hospitality"],
    ["رقمه الضريبي", "غير موجود في الصفحة 1 أو 2", "bad"],
    ["رقم المستلم الضريبي", "100456789000003 · 99%"],
    ["رقم الفاتورة", "INV-2107 · 99%"],
    ["التاريخ", "14 سبتمبر 2026 · 98%"],
    ["الصافي / الضريبة", "12,000.00 / 600.00 · 97%"],
  ],
  mtTitle: "المطابقة · بالشيفرة", mtStatus: "هامش التقريب 0.05 درهم",
  maths: [
    <>الصافي: <Sum>8,400.00 + 3,600.00 = <strong>12,000.00</strong></Sum></>,
    <>الضريبة كما هي مذكورة: <Sum>5% × 12,000.00 = <strong>600.00</strong></Sum></>,
    <>الإجمالي كما هو مذكور: <Sum>12,000.00 + 600.00 = <strong>12,600.00</strong></Sum></>,
    <>تاريخ الفاتورة ليس في المستقبل · لا خطأ في رقم التحقق للآيبان</>,
  ],
  mtNote: "النموذج يقرأ. ولا يحسب أبدًا. إذا اختلف إجمالي بأكثر من هامش التقريب الذي تحدده، تسمّي الملاحظة السطر بعينه.",
  ruTitle: "القواعد · ملف الإمارات", ruStatus: "طُوبق المستلم برقم التسجيل الضريبي ← Al Hamra Trading LLC",
  rules: [
    ["ok", <>عبارة «فاتورة ضريبية» ظاهرة</>, "المادة 59(1)(أ)"],
    ["bad", <>رقم التسجيل الضريبي للمورّد مفقود: ليست فاتورة ضريبية صحيحة</>, "المادة 59(1)(ب)"],
    ["ok", <>اسم المستلم وعنوانه ورقمه الضريبي ظاهرة</>, "المادة 59(1)(ج)"],
    ["ok", <>رقم تسلسلي وتاريخ وضريبة لكل سطر بالدرهم</>, "المادة 59(1)(د)–(ي)"],
    ["warn", <>«عشاء عميل» ضريبة مدخلات قد تكون محظورة</>, "المادة 53"],
    ["na", <>الاحتساب العكسي: مورّد محلي، لا ينطبق</>, "احتساب عكسي"],
    ["ok", <>أول ظهور لـ Al Madar · INV-2107، لا تكرار</>, "السجل"],
    ["ok", <>ضمن مهلة المطالبة: هذه الفترة أو التالية</>, "الربع 3 2026"],
  ],
  s2Title: "رأي ثانٍ · نموذج مستقل", s2Status: "أطلقته فئة مخاطر عالية",
  tiles: [["رقم المورّد الضريبي", "متفق", "القراءتان: غير موجود"], ["الصافي / الضريبة", "متفق", "12,000.00 / 600.00"], ["الإجمالي", "متفق", "12,600.00"]],
  verifier: "المتحقق",
  verH: "مؤكَّد: المادة 59(1)(ب)، رقم التسجيل الضريبي للمورّد مفقود",
  verP: "فحص الترويسة والتذييل والصفحة 2. لا يظهر رقم تسجيل ضريبي من 15 خانة في أي مكان. وذاكرة الموردين لا تحوي رقمًا سابقًا لهذا المورّد.",
  s2Note: "القيم لا تُصحَّح تلقائيًا أبدًا. حين تختلف قراءتان، تُسمّى الحقول المختلف عليها ويقرر شخص. وكل تصحيح يدوي يُسجَّل.",
  vdTitle: "الحكم · INV-2107", vdStatus: "راجعته نور ك. في 09:31", band: "مخاطر عالية",
  vdH: "أوقف 600.00 درهم من ضريبة المدخلات حتى تصل فاتورة مصحّحة",
  vdP: "ومن ذلك، يبقى 180.00 درهمًا على عشاء العميل مُعلَّمًا كضريبة قد تكون محظورة حتى بعد التصحيح. مُدرجة تحت الربع الثالث 2026، من يوليو إلى سبتمبر.",
  q: "الربع 3", vat: (v: string) => `ضريبة ${v}`,
  st: { claim: "مطالبة", hold: "إيقاف", chasing: "ملاحقة" },
  chTitle: "الملاحقة · Al Madar Hospitality", chStatus: "أرسلتها نور ك. · بإجراء بشري",
  chH: "طلب تصحيح، مُصاغ",
  chP: "الفاتورة INV-2107 المؤرخة 14 سبتمبر 2026 لا تُظهر رقم تسجيلكم الضريبي، المطلوب بموجب المادة 59(1)(ب) من اللائحة التنفيذية لضريبة القيمة المضافة في الإمارات. يُرجى إعادة إصدارها متضمنة رقم تسجيلكم الضريبي إلى alhamra@ap.hysaab.ai.",
  chase: ["أُرسل في 14 سبتمبر · وصلت الفاتورة المصحّحة في 16 سبتمبر", "استُبدلت النسخة القديمة · أُغلقت الملاحقة تلقائيًا", "420.00 درهمًا قابلة للمطالبة الآن في الربع 3 · 180.00 درهمًا موقوفة كضريبة محظورة"],
  forClient: <><strong>تقرير العميل، سبتمبر:</strong> 214 فاتورة، 93.8% ممتثلة عددًا و96.1% بقيمة الضريبة. لوحق تسعة موردين، وصحّح سبعة.</>,
  forSend: <><strong>قبل الإرسال:</strong> يفحص وكيل مراجعة كل بريد إلى العميل، ثم ينتظر اعتمادًا بشريًا على خطوتين.</>,
};

const S: Record<Locale, Strings> = { en: EN, ar: AR };

const ADVANCE_MS = 4800;

function Row({ k, v, tone }: { k: string; v: React.ReactNode; tone?: "ok" | "bad" | "warn" | "muted" }) {
  return (
    <div className={`hy-iv-row${tone ? ` hy-iv-row--${tone}` : ""}`}>
      <span className="hy-iv-row-k">{k}</span>
      <span className="hy-iv-row-v">{v}</span>
    </div>
  );
}

function Mark({ tone }: { tone: Tone }) {
  const c = { ok: "✓", bad: "✕", warn: "!", na: "–" }[tone];
  return <span className={`hy-iv-mark hy-iv-mark--${tone}`} aria-hidden="true">{c}</span>;
}

export function InvoiceFlow({ locale = "en" }: { locale?: Locale }) {
  const s = S[locale];
  const STEPS = s.steps;
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const playRef = useRef(playing);
  playRef.current = playing;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => { if (playRef.current) setStep((n) => (n + 1) % STEPS.length); }, ADVANCE_MS);
    return () => clearInterval(id);
  }, [playing, STEPS.length]);

  const go = (n: number) => { setStep(n); setPlaying(false); };

  return (
    <div className="hy-demo" id="flow">
      <div className="hy-beats">
        <div className="hy-beats-ctl">
          <button type="button" className="hy-btn hy-btn--navy" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}>
            {playing ? s.pause : s.play}
          </button>
          <span className="hy-beats-mode">{playing ? s.modePlaying : s.modeControls}</span>
          <span className="hy-beats-n hy-num">{s.stageOf(step + 1, STEPS.length)}</span>
        </div>
        {STEPS.map((st, i) => (
          <button type="button" key={st.h} className="hy-beat" onClick={() => go(i)} aria-current={step === i ? "step" : undefined}>
            <span className="hy-beat-time"><span className="hy-beat-t">{st.t}</span><span className="hy-beat-bar" /></span>
            <span className="hy-beat-body"><span className="hy-beat-h">{st.h}</span><span className="hy-beat-p">{st.p}</span></span>
          </button>
        ))}
      </div>

      <div className="hy-win" aria-live="polite">
        <div className="hy-win-bar">
          <Wordmark size={15} ground="navy" suffix={false} />
          <span className="hy-win-org">{s.org}</span>
          <span className="hy-win-user"><span className="hy-win-user-n">{s.user}</span><span className="hy-win-avatar" aria-hidden="true">NK</span></span>
        </div>
        <div className="hy-iv-track" aria-hidden="true">
          {s.track.map((l, i) => (
            <span key={l} className={`hy-iv-track-s${i < step ? " is-done" : ""}${i === step ? " is-on" : ""}`}>{l}</span>
          ))}
        </div>

        <div className="hy-pane">
          {step === 0 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.inTitle}</span><span className="hy-pane-status">{s.inStatus}</span></div>
              <div className="hy-lines">
                <div className="hy-line hy-line--ask"><span className="hy-line-d">09:12</span><span className="hy-line-desc">Al Madar Hospitality Supplies</span><span className="hy-line-ref">{s.inPages}</span><span className="hy-line-st">{s.reading}</span></div>
                <div className="hy-line"><span className="hy-line-d">08:47</span><span className="hy-line-desc">Etisalat Business</span><span className="hy-line-ref">SEP-4471.pdf</span><span className="hy-line-st">{s.lowRisk}</span></div>
                <div className="hy-line"><span className="hy-line-d">08:02</span><span className="hy-line-desc">Gulf Technical Supplies</span><span className="hy-line-ref">INV-4471.pdf</span><span className="hy-line-st">{s.lowRisk}</span></div>
              </div>
              <div className="hy-iv-note">{s.inNote}</div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.rdTitle}</span><span className="hy-pane-status">{s.rdStatus}</span></div>
              <div className="hy-iv-grid">
                <div className="hy-doc">
                  <div className="hy-doc-head"><span className="hy-doc-sup">AL MADAR HOSPITALITY SUPPLIES LLC</span><span className="hy-doc-kind">{s.docKind}</span></div>
                  <div className="hy-doc-meta">{s.docPlace}<span className="hy-iv-gap">{s.docTrn}</span></div>
                  <div className="hy-doc-rule" />
                  <div className="hy-doc-lines">
                    <div className="hy-doc-line"><span>{s.docL1}</span><span>8,400.00</span></div>
                    <div className="hy-doc-line"><span>{s.docL2}</span><span>3,600.00</span></div>
                    <div className="hy-doc-line hy-doc-line--muted"><span>{s.docVat}</span><span>600.00</span></div>
                  </div>
                  <div className="hy-doc-total"><span>{s.docTotal}</span><span>12,600.00</span></div>
                  <span className="hy-doc-src">{s.docSrc}</span>
                </div>
                <div className="hy-iv-fields">
                  {s.fields.map(([k, v, tone]) => <Row key={k} k={k} v={v} tone={tone} />)}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.mtTitle}</span><span className="hy-pane-status">{s.mtStatus}</span></div>
              <div className="hy-check">
                {s.maths.map((m, i) => <div key={i} className="hy-check-row"><Mark tone="ok" /><span className="hy-check-l">{m}</span></div>)}
              </div>
              <div className="hy-iv-note">{s.mtNote}</div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.ruTitle}</span><span className="hy-pane-status">{s.ruStatus}</span></div>
              <div className="hy-check">
                {s.rules.map(([tone, l, ref], i) => (
                  <div key={i} className={`hy-check-row${tone === "bad" ? " hy-iv-bad" : tone === "warn" ? " hy-iv-warn" : ""}`}><Mark tone={tone} /><span className="hy-check-l">{l}</span><span className="hy-iv-ref">{ref}</span></div>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.s2Title}</span><span className="hy-pane-status">{s.s2Status}</span></div>
              <div className="hy-tiles">
                {s.tiles.map(([l, n, sub]) => <div key={l} className="hy-tile"><div className="hy-tile-l">{l}</div><div className="hy-tile-n">{n}</div><div className="hy-tile-s">{sub}</div></div>)}
              </div>
              <div className="hy-dec hy-dec--open">
                <div className="hy-dec-row">
                  <span className="hy-dec-id">{s.verifier}</span>
                  <div className="hy-dec-body">
                    <span className="hy-dec-h">{s.verH}</span>
                    <span className="hy-dec-p">{s.verP}</span>
                  </div>
                </div>
              </div>
              <div className="hy-iv-note">{s.s2Note}</div>
            </>
          )}

          {step === 5 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.vdTitle}</span><span className="hy-pane-status">{s.vdStatus}</span></div>
              <div className="hy-iv-verdict">
                <span className="hy-iv-band">{s.band}</span>
                <div className="hy-iv-verdict-body">
                  <span className="hy-dec-h">{s.vdH}</span>
                  <span className="hy-dec-p">{s.vdP}</span>
                </div>
              </div>
              <div className="hy-lines">
                <div className="hy-line"><span className="hy-line-d">{s.q}</span><span className="hy-line-desc">Gulf Technical Supplies</span><span className="hy-line-ref">{s.vat("199.50")}</span><span className="hy-line-st">{s.st.claim}</span></div>
                <div className="hy-line hy-line--ask"><span className="hy-line-d">{s.q}</span><span className="hy-line-desc">Al Madar Hospitality</span><span className="hy-line-ref">{s.vat("600.00")}</span><span className="hy-line-st">{s.st.hold}</span></div>
                <div className="hy-line"><span className="hy-line-d">{s.q}</span><span className="hy-line-desc">Etisalat Business</span><span className="hy-line-ref">{s.vat("412.20")}</span><span className="hy-line-st">{s.st.claim}</span></div>
                <div className="hy-line"><span className="hy-line-d">{s.q}</span><span className="hy-line-desc">Almara Catering</span><span className="hy-line-ref">{s.vat("1,036.00")}</span><span className="hy-line-st">{s.st.chasing}</span></div>
              </div>
            </>
          )}

          {step === 6 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">{s.chTitle}</span><span className="hy-pane-status">{s.chStatus}</span></div>
              <div className="hy-why">
                <span className="hy-why-h">{s.chH}</span>
                <span className="hy-why-p">{s.chP}</span>
              </div>
              <div className="hy-check">
                {s.chase.map((c) => <div key={c} className="hy-check-row"><Mark tone="ok" /><span className="hy-check-l">{c}</span></div>)}
              </div>
              <div className="hy-for">
                <div className="hy-for-card hy-for-card--navy">{s.forClient}</div>
                <div className="hy-for-card hy-for-card--blush">{s.forSend}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

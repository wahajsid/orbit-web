"use client";

/* Motion moment 2 — the ink terminal now cycles THREE real scenarios: an
   invoice's journey, the close closing itself, and collections chasing cash.
   The left title/sub switch with the scenario; feed lines type on one-by-one,
   hold, then the next case begins. Starts when scrolled into view (once).
   Reduced-motion: the first scenario renders fully, no cycling. */

import { useEffect, useRef, useState } from "react";

interface Scenario {
  key: string;
  title: [string, string];      // two authored lines
  sub: string;
  header: string;
  lines: [string, string, string, boolean][];   // [time, agent, rest, brass?]
}

const SCENARIOS_EN: Scenario[] = [
  {
    key: "invoice",
    title: ["One invoice,", "start to finish."],
    sub: "A photo lands on WhatsApp. Agents read it, tax-test it against FTA rules, match it to the PO and the bank line, and post it. You approve only what matters.",
    header: "HYSAAB / ACTIVITY",
    lines: [
      ["08:14", "INTAKE", "invoice.pdf via WhatsApp", false],
      ["08:14", "READER", "12 lines · supplier matched", false],
      ["08:15", "TAX", "5% input VAT ✓ FTA rules", false],
      ["08:15", "MATCH", "PO-0092 ⟷ bank line", false],
      ["08:16", "POSTED", "→ Zoho Books ◉", true],
    ],
  },
  {
    key: "close",
    title: ["The close,", "closing itself."],
    sub: "Overnight, the period assembles its own evidence: accruals proposed, bank reconciled, variances flagged. By morning, only the judgement calls are left for you.",
    header: "HYSAAB / MONTH-END",
    lines: [
      ["21:02", "ACCRUE", "2 recurring accruals proposed", false],
      ["21:04", "RECON", "bank ⟷ ledger · 41 lines matched", false],
      ["21:07", "VARIANCE", "utilities +8.2%, flagged", false],
      ["21:09", "CHECKS", "sheet balances ✓ VAT↔CT aligned", false],
      ["21:10", "READY", "close 92% · 2 approvals await you", true],
    ],
  },
  {
    key: "collections",
    title: ["Cash, chased", "politely."],
    sub: "Overdue invoices get a reminder in your tone: drafted, gated by your approval, sent, and matched to the bank when the money lands. Relationships intact.",
    header: "HYSAAB / COLLECTIONS",
    lines: [
      ["09:00", "SCAN", "3 invoices overdue · AED 347k", false],
      ["09:01", "DRAFT", "reminder in your tone → Corniche LLC", false],
      ["09:01", "GATE", "queued for your approval", false],
      ["10:12", "SENT", "reminder + statement attached", false],
      ["D+3", "PAID", "AED 120,000 → matched to bank ◉", true],
    ],
  },
];

/* AR-REVIEW: the three scenarios in Arabic (the feed reads right to
   left; times, IDs and amounts stay Latin). */
const SCENARIOS_AR: Scenario[] = [
  {
    key: "invoice",
    title: ["فاتورة واحدة،", "من البداية إلى النهاية."],
    sub: "تصل صورة عبر واتساب. يقرؤها الوكلاء، ويختبرونها وفق قواعد الهيئة الاتحادية للضرائب، ويطابقونها مع أمر الشراء وسطر البنك، ثم يرحّلونها. وأنت تعتمد ما يهم فقط.",
    header: "HYSAAB / النشاط",
    lines: [
      ["08:14", "الاستلام", "invoice.pdf عبر واتساب", false],
      ["08:14", "القارئ", "12 سطرًا · طوبق المورّد", false],
      ["08:15", "الضريبة", "ضريبة مدخلات 5% ✓ قواعد الهيئة", false],
      ["08:15", "المطابقة", "PO-0092 ⟷ سطر البنك", false],
      ["08:16", "رُحّل", "← Zoho Books ◉", true],
    ],
  },
  {
    key: "close",
    title: ["الإقفال،", "يُقفل نفسه."],
    sub: "خلال الليل، تجمع الفترة أدلتها بنفسها: استحقاقات مقترحة، وبنك مطابَق، وفروقات مُعلَّمة. وفي الصباح، لا يبقى لك إلا قرارات الحكم المهني.",
    header: "HYSAAB / نهاية الشهر",
    lines: [
      ["21:02", "الاستحقاق", "اقتراح استحقاقين دوريين", false],
      ["21:04", "المطابقة", "البنك ⟷ الدفتر · 41 سطرًا مطابَقًا", false],
      ["21:07", "الفروقات", "المرافق +8.2%، مُعلَّمة", false],
      ["21:09", "الفحوص", "الميزان متوازن ✓ القيمة المضافة ⟷ ضريبة الشركات", false],
      ["21:10", "جاهز", "الإقفال 92% · موافقتان بانتظارك", true],
    ],
  },
  {
    key: "collections",
    title: ["النقد يُلاحَق", "بلباقة."],
    sub: "الفواتير المتأخرة تتلقى تذكيرًا بنبرتك: يُصاغ، ويخضع لموافقتك، ويُرسل، ثم يُطابَق مع البنك حين يصل المال. والعلاقات سليمة.",
    header: "HYSAAB / التحصيل",
    lines: [
      ["09:00", "الفحص", "3 فواتير متأخرة · 347k درهم", false],
      ["09:01", "الصياغة", "تذكير بنبرتك ← Corniche LLC", false],
      ["09:01", "البوابة", "بانتظار موافقتك", false],
      ["10:12", "أُرسل", "تذكير + كشف حساب مرفق", false],
      ["+3 أيام", "دُفع", "120,000 درهم ← طوبق مع البنك ◉", true],
    ],
  },
];

const LINE_MS = 700;      // per typed line
const HOLD_MS = 4200;     // fully-typed dwell before the next scenario

export function Terminal({ locale = "en" }: { locale?: "en" | "ar" }) {
  const SCENARIOS = locale === "ar" ? SCENARIOS_AR : SCENARIOS_EN;
  const ref = useRef<HTMLDivElement>(null);
  const [scenario, setScenario] = useState(0);
  const [shown, setShown] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setShown(SCENARIOS[0].lines.length);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    const playScenario = (idx: number) => {
      setScenario(idx);
      setShown(0);
      const n = SCENARIOS[idx].lines.length;
      for (let i = 1; i <= n; i++) {
        timers.push(setTimeout(() => setShown(i), i * LINE_MS));
      }
      timers.push(setTimeout(() => playScenario((idx + 1) % SCENARIOS.length), n * LINE_MS + HOLD_MS));
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          playScenario(0);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  const s = SCENARIOS[scenario];

  return (
    <div className="term-grid" ref={ref}>
      <div className="term-sticky">
        <h2 className="section-head" key={s.key} style={{ minHeight: "2.1em" }}>
          {s.title[0]}<br />{s.title[1]}
        </h2>
        <p className="section-sub">{s.sub}</p>
        {!reduced && (
          <div className="term-dots" aria-hidden="true">
            {SCENARIOS.map((x, i) => (
              <span key={x.key} className={`term-dot${i === scenario ? " on" : ""}`} />
            ))}
          </div>
        )}
      </div>
      <div className="term-panel">
        <div className="term-header">
          <span>{s.header}</span>
          <span className="term-live">{locale === "ar" ? "· مباشر" : "· LIVE"}</span>
        </div>
        <div className="term-feed" style={{ minHeight: "11.5em" }}>
          {s.lines.map(([time, agent, rest, brass], i) => (
            <div key={s.key + agent + time} className={`feedline${i < shown ? " on" : ""}`}>
              <span className="t"><bdi>{time}</bdi></span>{" "}
              <span className={brass ? "posted" : "agent"}>{agent}</span>{" "}
              {rest}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

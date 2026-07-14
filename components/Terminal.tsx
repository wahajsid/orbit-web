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

const SCENARIOS: Scenario[] = [
  {
    key: "invoice",
    title: ["One invoice,", "start to finish."],
    sub: "A photo lands on WhatsApp. Agents read it, tax-test it against FTA rules, match it to the PO and the bank line, and post it — you approve only what matters.",
    header: "ORBIT / ACTIVITY",
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
    sub: "Overnight, the period assembles its own evidence: accruals proposed, bank reconciled, variances flagged — by morning only the judgement calls are left for you.",
    header: "ORBIT / MONTH-END",
    lines: [
      ["21:02", "ACCRUE", "2 recurring accruals proposed", false],
      ["21:04", "RECON", "bank ⟷ ledger · 41 lines matched", false],
      ["21:07", "VARIANCE", "utilities +8.2% — flagged", false],
      ["21:09", "CHECKS", "sheet balances ✓ VAT↔CT aligned", false],
      ["21:10", "READY", "close 92% — 2 approvals await you", true],
    ],
  },
  {
    key: "collections",
    title: ["Cash, chased", "politely."],
    sub: "Overdue invoices get a reminder in your tone — drafted, gated by your approval, sent, and matched to the bank when the money lands. Relationships intact.",
    header: "ORBIT / COLLECTIONS",
    lines: [
      ["09:00", "SCAN", "3 invoices overdue · AED 347k", false],
      ["09:01", "DRAFT", "reminder in your tone → Corniche LLC", false],
      ["09:01", "GATE", "queued for your approval", false],
      ["10:12", "SENT", "reminder + statement attached", false],
      ["D+3", "PAID", "AED 120,000 → matched to bank ◉", true],
    ],
  },
];

const LINE_MS = 700;      // per typed line
const HOLD_MS = 4200;     // fully-typed dwell before the next scenario

export function Terminal() {
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
          <span className="term-live">— LIVE</span>
        </div>
        <div className="term-feed" style={{ minHeight: "11.5em" }}>
          {s.lines.map(([time, agent, rest, brass], i) => (
            <div key={s.key + agent + time} className={`feedline${i < shown ? " on" : ""}`}>
              <span className="t">{time}</span>{" "}
              <span className={brass ? "posted" : "agent"}>{agent}</span>{" "}
              {rest}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

/* Orbit Invoice — the live validation terminal. Same motion as the hire one:
   three scenarios (read the pile, test against the law, protect the claim)
   cycling, feed lines typing on one-by-one. Starts on scroll-in; reduced-motion
   shows the first scenario fully. Reuses the .term-* styles from wire.css. */

import { useEffect, useRef, useState } from "react";

interface Scenario {
  key: string;
  title: [string, string];
  sub: string;
  header: string;
  lines: [string, string, string, boolean][];
}

const SCENARIOS: Scenario[] = [
  {
    key: "read",
    title: ["A folder of invoices,", "read before your coffee."],
    sub: "Drop a month of supplier invoices — or email them in. Orbit reads every line, then re-checks the arithmetic itself, in code. Nothing is taken on trust, including its own reading.",
    header: "ORBIT INVOICE / INTAKE",
    lines: [
      ["09:02", "INTAKE", "214 invoices · drop + inbox", false],
      ["09:04", "READ", "supplier · TRN · lines · VAT", false],
      ["09:06", "RECONCILE", "arithmetic re-checked in code", false],
      ["09:08", "DEDUPE", "3 duplicates · 1 re-issue caught", false],
      ["09:09", "READY", "214 read · 100% tested ◉", true],
    ],
  },
  {
    key: "test",
    title: ["Tested against the law,", "invoice by invoice."],
    sub: "Every invoice is tested against the rules the FTA and ZATCA actually enforce — the required words, the TRN, the VAT shown properly, the dates. A failed field is named, not waved through.",
    header: "ORBIT INVOICE / RULES",
    lines: [
      ["09:11", "UAE", "Art. 59 tax-invoice fields", false],
      ["09:11", "KSA", "ZATCA e-invoice checks", false],
      ["09:12", "FLAG", "INV-2107 · supplier TRN missing", false],
      ["09:12", "FLAG", "INV-2119 · VAT ≠ 5% of taxable", false],
      ["09:13", "VERDICT", "205 met · 9 flagged, each named ◉", true],
    ],
  },
  {
    key: "claim",
    title: ["The claim, protected", "before the return is filed."],
    sub: "Recoverability is risk-ranked per invoice — claim, correct first, or don't claim. The register tracks every filing period and what was claimed in it, and exports to Excel your auditor will accept.",
    header: "ORBIT INVOICE / CLAIM",
    lines: [
      ["09:15", "RISK", "input VAT ranked per invoice", false],
      ["09:15", "HOLD", "AED 3,180 held pending correction", false],
      ["09:16", "REGISTER", "period 2026-Q3 · claims tracked", false],
      ["09:16", "EXPORT", "Excel register → tax file", false],
      ["09:17", "SAFE", "nothing claimed that can't be defended ◉", true],
    ],
  },
];

const LINE_MS = 700;
const HOLD_MS = 4200;

export function InvoiceTerminal() {
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
    const play = (idx: number) => {
      setScenario(idx);
      setShown(0);
      const n = SCENARIOS[idx].lines.length;
      for (let i = 1; i <= n; i++) timers.push(setTimeout(() => setShown(i), i * LINE_MS));
      timers.push(setTimeout(() => play((idx + 1) % SCENARIOS.length), n * LINE_MS + HOLD_MS));
    };
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { io.disconnect(); play(0); } },
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

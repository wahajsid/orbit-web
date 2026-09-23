/* ── Sample Books Check report (the /check hero) ─────────────────────
   A designed mock of the real report (docs/books-check/SPEC.md §5: the
   business in a minute, money kept apart, what needs attention first,
   status chips, the P&L reconciliation gate). It assembles itself on
   first paint in pure CSS (app/check.css): tiles roll their figures,
   the ledger is scanned and two lines are flagged, the findings snap
   into rank and the RECONCILED stamp lands. Invented figures, labelled
   as such. Without JS or with reduced motion it is simply the finished
   report. "Replay" restarts it (MotionEnhancer, data-replay). */

import type { CSSProperties } from "react";
import { DigitRoll } from "@/components/motion/Kinetic";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const LEDGER: { d: string; who: string; ref: string; amt: string; flag?: string }[] = [
  { d: "03 Mar", who: "Gulf Office Supplies", ref: "INV-2231", amt: "12,600.00" },
  { d: "05 Mar", who: "Gulf Office Supplies", ref: "INV-2231", amt: "12,600.00", flag: "Possible duplicate" },
  { d: "11 Mar", who: "Transfer", ref: "No description", amt: "8,450.00", flag: "Needs support" },
  { d: "14 Mar", who: "Al Noor Trading", ref: "SI-1043", amt: "46,200.00" },
];

const FINDINGS: { chip: string; tone: "blush" | "sage" | "line"; t: string; amt: string }[] = [
  { chip: "Act now", tone: "blush", t: "Receivables over 60 days", amt: "184,200" },
  { chip: "Verify first", tone: "line", t: "Possible duplicate bill", amt: "12,600" },
  { chip: "Address next", tone: "sage", t: "Payment with no description", amt: "8,450" },
];

export function SampleReport() {
  return (
    <div className="ck-stage">
      <figure
        className="ck-report"
        id="ck-report"
        role="img"
        aria-label="Sample Books Check report with invented figures: revenue AED 4.82 million, net margin 11.4 percent, AED 184 thousand to chase. Two ledger lines flagged. Three findings ranked: act now, receivables over 60 days; verify first, a possible duplicate bill; address next, a payment with no description. Stamped P&L reconciled."
      >
        <div className="ck-r-top">
          <span className="ck-r-brand">Books Check</span>
          <span className="ck-r-tag">Sample report</span>
        </div>

        <div className="ck-r-head">
          <div>
            <p className="ck-r-co">Sample Trading LLC</p>
            <p className="ck-r-meta">Xero · 24 months · AED</p>
          </div>
          <p className="ck-r-status" aria-hidden="true">
            <span className="ck-r-status-a"><i /> Reading ledger</span>
            <span className="ck-r-status-b"><i /> Report ready</span>
          </p>
        </div>

        <div className="ck-r-tiles">
          <div className="ck-r-tile" style={{ "--t": 0 } as Vars}>
            <span>Revenue</span>
            <strong><small>AED</small> <DigitRoll value="4.82" delay={650} />m</strong>
          </div>
          <div className="ck-r-tile" style={{ "--t": 1 } as Vars}>
            <span>Net margin</span>
            <strong><DigitRoll value="11.4" delay={780} />%</strong>
          </div>
          <div className="ck-r-tile ck-r-tile--hot" style={{ "--t": 2 } as Vars}>
            <span>To chase</span>
            <strong><small>AED</small> <DigitRoll value="184" delay={910} />k</strong>
          </div>
        </div>

        <div className="ck-r-ledger">
          <p className="ck-r-label">Ledger scan</p>
          <div className="ck-r-rows">
            <span className="ck-r-scan" />
            {LEDGER.map((r, i) => (
              <div className={`ck-r-row${r.flag ? " is-flag" : ""}`} key={i} style={{ "--r": i } as Vars}>
                <span>{r.d}</span>
                <span>{r.who}</span>
                <span>{r.ref}</span>
                <span>{r.amt}</span>
                {r.flag && <em className="ck-r-flag">{r.flag}</em>}
              </div>
            ))}
          </div>
        </div>

        <div className="ck-r-findings">
          <p className="ck-r-label">What needs attention first</p>
          <ol>
            {FINDINGS.map((f, i) => (
              <li key={f.t} style={{ "--f": i } as Vars}>
                <span className="ck-r-rank">{i + 1}</span>
                <span className={`ck-chip ck-chip--${f.tone}`}>{f.chip}</span>
                <span className="ck-r-ft">{f.t}</span>
                <span className="ck-r-amt">{f.amt}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="ck-r-stamp">
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg>
          <span>P&amp;L reconciled</span>
        </div>

        <p className="ck-r-foot">Sample report · invented figures</p>
      </figure>
      <button type="button" className="ck-replay" data-replay="ck-report">
        <span aria-hidden="true">↻</span> Replay
      </button>
    </div>
  );
}

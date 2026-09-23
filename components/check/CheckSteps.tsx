/* ── How a check runs: a sticky step reveal (/check) ─────────────────
   After Amicro's StickyReveal (MIT): the steps scroll on one side while
   a sticky navy panel shows the step crossing the middle of the screen.
   The progress ticks recreate the idea of Bencho's progress blocks.
   Pure markup; MotionEnhancer sets data-active and .is-active/.is-past.
   Without JS or with reduced motion the panel shows the finished state
   and every step is fully visible. Facts: docs/books-check/SPEC.md. */

import type { CSSProperties } from "react";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const STEPS: [string, string, string][] = [
  ["01", "Read", "Your ledger, read-only. Nothing is written back."],
  ["02", "Reconcile", "Revenue and expenses rebuilt, then matched to your own P&L."],
  ["03", "Test", "Duplicates, suspense, overdue money, missed months, VAT and tax signals."],
  ["04", "Rank", "What to act on now, with the entries behind it."],
];

export function CheckSteps() {
  return (
    <div className="ck-steps" data-steps="" data-active="3">
      <ol className="ck-steps-list">
        {STEPS.map(([n, h, p]) => (
          <li key={n} data-step="">
            <span className="ck-steps-n" aria-hidden="true">{n}</span>
            <h3>{h}</h3>
            <p>{p}</p>
          </li>
        ))}
      </ol>

      <div className="ck-panel" aria-hidden="true">
        <div className="ck-panel-bar">
          {STEPS.map(([n, h]) => <span key={n}>{h}</span>)}
        </div>

        <div className="ck-scene ck-scene--0">
          {[62, 88, 46, 74, 55, 92, 38, 70].map((w, i) => (
            <span className="ck-line" key={i} style={{ "--w": `${w}%`, "--i": i } as Vars} />
          ))}
          <p className="ck-scene-cap">Read-only access</p>
        </div>

        <div className="ck-scene ck-scene--1">
          <div className="ck-bar" style={{ "--i": 0 } as Vars}><span>Rebuilt from every line</span><i /></div>
          <div className="ck-bar" style={{ "--i": 1 } as Vars}><span>Your ledger&rsquo;s P&amp;L</span><i /></div>
          <p className="ck-matched"><svg viewBox="0 0 20 20"><path d="M4 10.5l4 4 8-9" /></svg> Matched</p>
        </div>

        <div className="ck-scene ck-scene--2">
          <div className="ck-grid">
            {Array.from({ length: 24 }, (_, i) => (
              <span key={i} className={i === 9 || i === 17 ? "is-flag" : ""} style={{ "--i": i } as Vars} />
            ))}
          </div>
          <p className="ck-scene-cap">2 flagged · 22 clear</p>
        </div>

        <div className="ck-scene ck-scene--3">
          {[["Act now", "blush"], ["Verify first", "line"], ["Address next", "sage"]].map(([c, tone], i) => (
            <div className="ck-rankrow" key={c} style={{ "--i": i } as Vars}>
              <b>{i + 1}</b><span className={`ck-chip ck-chip--${tone}`}>{c}</span><i />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

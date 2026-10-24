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
   Accessibility: every step is reachable by button; changes are announced
   in a polite live region; reduced motion drops the auto-advance pauses. */

import { useEffect, useRef, useState } from "react";
import "./sample-workspace.css";

const STEPS = ["Find the gap", "Investigate", "Prepare the entry", "Why this entry?", "Ready for review"] as const;
const SAY = [
  "Step 1 of 5. Hysaab found a gap: no October bill from Hygeia Cleaning, which has billed every month since July.",
  "Step 2 of 5. It investigated: the September invoice, the contract clause, the ledger and the bank payment.",
  "Step 3 of 5. It prepared a draft accrual of AED 2,800 that reverses on 1 November.",
  "Step 4 of 5. Why this entry: the contract, the bills to date, the owner's confirmation and what Hysaab remembered.",
  "Step 5 of 5. The journal and its workpaper are ready for review. Approval is still required.",
];

export function SampleWorkspace() {
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

  useEffect(() => { if (step >= 0 && live.current) live.current.textContent = SAY[step]; }, [step]);

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
          <span>Helio Trading LLC · Period close · October 2026</span>
          <span className="sw-tag">Sample workspace</span>
        </div>
        <div className="sw-body">
          <ol className="sw-rail" aria-label="What Hysaab does">
            {STEPS.map((s, i) => (
              <li key={s} className={state(i)} aria-current={i === step ? "step" : undefined}>
                <span className="sw-n">{state(i) === "done" ? "✓" : i + 1}</span>{s}
              </li>
            ))}
          </ol>

          <div className="sw-main" ref={pane} tabIndex={0} role="region" aria-label="Sample workspace, October review">
            {step < 0 && (
              <div className="sw-start">
                <p className="sw-k">October 2026 · close day T+1</p>
                <p className="sw-big">One month of books, one button.</p>
                <p className="sw-p">Watch Hysaab find what is missing, work out why, and prepare the entry with its evidence. You make the call.</p>
                <button type="button" className="sw-go" onClick={start}>Prepare October for review <span aria-hidden="true">→</span></button>
              </div>
            )}

            {step >= 0 && (
              <div className="sw-feed">
                {/* 1. The gap */}
                <article className="sw-card sw-in">
                  <p className="sw-k"><span className="sw-amber">Unresolved</span> Recurring bill missing</p>
                  <h3>Hygeia Cleaning Services: no October bill.</h3>
                  <p className="sw-p">Billed every month since July, AED 2,800 each. Nothing received for October, and the service ran all month.</p>
                </article>

                {/* 2. Investigate */}
                {step >= 1 && (
                  <article className="sw-card sw-in">
                    <p className="sw-k">Investigated · 4 sources</p>
                    <div className="sw-ev">
                      <div><span>Last invoice</span><b>INV-HC-0917</b><small>30 Sep · AED 2,800.00 + VAT · for September</small></div>
                      <div><span>Contract, clause 4.1</span><b>“AED 2,800 per month”</b><small>exclusive of VAT, twelve months from 1 July 2026</small></div>
                      <div><span>Ledger · 6110 Cleaning</span><b>2,800 · 2,800 · 2,800 · <em>0</em></b><small>Jul · Aug · Sep · Oct</small></div>
                      <div><span>Bank</span><b>AED 2,940.00 paid 5 Oct</b><small>September’s invoice, VAT included</small></div>
                    </div>
                  </article>
                )}

                {/* 3. Prepare */}
                {step >= 2 && (
                  <article className="sw-card sw-in">
                    <p className="sw-k"><span className="sw-amber">Draft · not posted</span> Proposed journal ACR-1031 · 31 Oct 2026</p>
                    <table className="sw-je">
                      <thead><tr><th>Account</th><th>Debit</th><th>Credit</th></tr></thead>
                      <tbody>
                        <tr><td>6110 Cleaning and maintenance</td><td>2,800.00</td><td /></tr>
                        <tr><td>2100 Accrued liabilities</td><td /><td>2,800.00</td></tr>
                      </tbody>
                    </table>
                    <p className="sw-p">Reverses on 1 November, so the November bill is not counted twice. October’s costs rise by AED 2,800 to what was actually used.</p>
                    {step === 2 && (
                      <button type="button" className="sw-why" onClick={openWhy}>Why this entry? <span aria-hidden="true">↓</span></button>
                    )}
                  </article>
                )}

                {/* 4. Why */}
                {why && (
                  <article className="sw-card sw-in sw-whycard">
                    <p className="sw-k"><span className="sw-green">Verified</span> Why this entry</p>
                    <ul className="sw-list">
                      <li><b>The contract.</b> Clause 4.1 fixes AED 2,800 a month. Service to 31 October is AED 11,200.</li>
                      <li><b>The bills.</b> July to September are billed: AED 8,400. 11,200 − 8,400 = <b>2,800</b> owed and unbilled.</li>
                      <li><b>The owner.</b> Sara (Facilities) confirmed on 26 Oct: “Service delivered, invoice delayed.”</li>
                      <li><b>What Hysaab remembered.</b> Hygeia bills in arrears, three months out of three. In August you told Hysaab to accrue it rather than wait.</li>
                    </ul>
                    {step === 3 && <button type="button" className="sw-go sw-go--sm" onClick={toReview}>Send to review <span aria-hidden="true">→</span></button>}
                  </article>
                )}

                {/* 5. Review */}
                {step >= 4 && (
                  <article className="sw-card sw-in sw-review">
                    <p className="sw-k"><span className="sw-amber">Approval required</span> Layla, CFO</p>
                    <div className="sw-wp">
                      <span>Close binder · 12 Accruals.xlsx</span>
                      <b>ACR-1031 · Hygeia Cleaning · AED 2,800.00</b>
                      <small>Evidence: contract cl. 4.1 · INV-HC-0917 · owner confirmation · ledger to 31 Oct</small>
                    </div>
                    {!call ? (
                      <div className="sw-acts">
                        <button type="button" className="sw-go sw-go--sm" onClick={() => setCall("Approved. In your workspace this posts to your ledger now and reverses on 1 November. Here, nothing is posted: this is a sample.")}>Approve</button>
                        <button type="button" className="sw-line" onClick={() => setCall("Your question goes to whoever prepared it, and the entry waits. Here, nothing is sent: this is a sample.")}>Ask a question</button>
                      </div>
                    ) : (
                      <p className="sw-done" role="status"><span aria-hidden="true">✓</span> {call}</p>
                    )}
                  </article>
                )}

                {step >= 0 && step < 2 && calm && (
                  <button type="button" className="sw-line" onClick={() => setStep((s) => s + 1)}>Next step</button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="sw-cap">
        <span>Sample workspace · fictional company and figures · nothing is sent</span>
        {step >= 0 && <button type="button" className="sw-line sw-line--sm" onClick={start}>Replay</button>}
      </p>
      <p className="hw-sr" aria-live="polite" ref={live} />
    </div>
  );
}

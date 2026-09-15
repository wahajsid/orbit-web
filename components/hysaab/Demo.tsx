"use client";

/* ── The story + interactive product demo ──────────────────────────
   Five beats on the left drive a sticky product window on the right.
   State machine per the design handoff (README "Demo state machine"):
   beat 1..5, playing, tab, chq (null|'petty'|'ask'), acc[3], locked.
   Autoplay advances every 5.2s while playing; any click takes control.
   Nothing persists; the demo resets on reload. */

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "../Wordmark";

type Tab = "docs" | "bank" | "decisions" | "close" | "report";
type Chq = null | "petty" | "ask";

const TAB_FOR: Tab[] = ["docs", "docs", "decisions", "close", "report"];
const AUTOPLAY_MS = 5200;

const BEATS = [
  { t: "21:00", h: "An invoice lands on WhatsApp.", p: <>Rashid photographs a supplier invoice from his car. That is the whole job on his side. No app to open, no fields to fill.</> },
  { t: "21:02", h: "Read, checked, coded, posted.", p: <>Two minutes later the entry is in Zoho Books at 96% confidence, tax-tested, with the photo attached. Nobody was asked anything.</> },
  { t: "06:06", h: "One line needs a human.", p: <>Overnight, 312 of 314 bank lines matched themselves. A cheque for AED 250 has no document. Layla gets one plain question, not a spreadsheet. <strong>Resolve it in the window →</strong></> },
  { t: "Day 2", h: "Three approvals between Layla and a lock.", p: <>The close ran all month. What is left is a checklist with three accruals on it. <strong>Approve them and lock the period.</strong></> },
  { t: "Day 2", h: "The report says what moved, and why.", p: <>Gross margin down 2.1 points, explained in a sentence and traced to a document. Rashid reads it on his phone. Layla sends it to the board.</> },
];

export function Demo() {
  const [beat, setBeat] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [tab, setTab] = useState<Tab>("docs");
  const [chq, setChq] = useState<Chq>(null);
  const [acc, setAcc] = useState<[boolean, boolean, boolean]>([false, false, false]);
  const [locked, setLocked] = useState(false);
  const playingRef = useRef(playing);
  playingRef.current = playing;

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
            {playing ? "Pause replay" : "Play replay"}
          </button>
          <span className="hy-beats-mode">{playing ? "Replaying the night. Click anything to take control." : "You have the controls. Click a beat or a tab."}</span>
          <span className="hy-beats-n hy-num">Beat {beat} of 5</span>
        </div>
        {BEATS.map((b, i) => {
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
          <span className="hy-win-org">Al Hamra Trading LLC</span>
          <span className="hy-win-user"><span className="hy-win-user-n">Layla H.</span><span className="hy-win-avatar" aria-hidden="true">LH</span></span>
        </div>
        <div className="hy-tabs" role="tablist" aria-label="Product areas">
          {([
            ["docs", "Documents"],
            ["bank", "Bank"],
            ["decisions", `Decisions · ${openCount}`],
            ["close", `Close · ${closePct}%`],
            ["report", "Reports"],
          ] as [Tab, string][]).map(([t, label]) => (
            <button key={t} type="button" role="tab" className="hy-tab hy-num" aria-selected={tab === t} onClick={() => pickTab(t)}>{label}</button>
          ))}
        </div>

        <div className="hy-pane" role="tabpanel">
          {tab === "docs" && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">INV-4471 · Gulf Technical Supplies</span><span className="hy-pane-status">{posted ? "Posted 21:02 · J-2291 · no question for you" : "Arrived 21:00 via WhatsApp · reading"}</span></div>
              <div className="hy-doc-grid">
                <div className="hy-doc">
                  <div className="hy-doc-head"><span className="hy-doc-sup">GULF TECHNICAL SUPPLIES LLC</span><span className="hy-doc-kind">TAX INVOICE</span></div>
                  <div className="hy-doc-meta">TRN 100234567800003 · Al Quoz 3, Dubai</div>
                  <div className="hy-doc-rule" />
                  <div className="hy-doc-lines">
                    <div className="hy-doc-line"><span>Server rack rails ×4</span><span>3,200.00</span></div>
                    <div className="hy-doc-line"><span>Cable management kit</span><span>640.00</span></div>
                    <div className="hy-doc-line"><span>Delivery</span><span>150.00</span></div>
                    <div className="hy-doc-line hy-doc-line--muted"><span>VAT 5%</span><span>199.50</span></div>
                  </div>
                  <div className="hy-doc-total"><span>Total AED</span><span>4,189.50</span></div>
                  <span className="hy-doc-src">Photo from Rashid · 21:00</span>
                </div>
                <div className="hy-steps">
                  {[
                    ["Read.", "Supplier, TRN, date, lines and totals extracted. Arithmetic re-checked."],
                    ["Checked.", "Tax-invoice criteria met. Not a duplicate of INV-4468."],
                    ["Coded.", "IT equipment · Dubai office, 96%, from 31 similar entries."],
                    ["Posted.", "Journal J-2291 to Zoho Books at 21:02, evidence attached."],
                  ].map(([h, p], i) => (
                    <div className="hy-step" key={h}>
                      <span className="hy-step-n" data-pending={!posted && i > 0}>{i + 1}</span>
                      <span className="hy-step-p"><strong>{h}</strong> {p}</span>
                    </div>
                  ))}
                  <div className="hy-entry">
                    <span className="hy-entry-l">Entry</span>
                    <div className="hy-doc-line"><span>IT equipment</span><span>3,990.00</span></div>
                    <div className="hy-doc-line"><span>Input VAT recoverable</span><span>199.50</span></div>
                    <div className="hy-doc-line"><span>Accounts payable</span><span>(4,189.50)</span></div>
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === "bank" && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">Emirates NBD ···4402</span><span className="hy-pane-status">{chqOpen ? "312 of 314 matched · 1 asking you" : "314 of 314 matched · reconciled"}</span></div>
              <div className="hy-tiles">
                <div className="hy-tile"><div className="hy-tile-l">Statement</div><div className="hy-tile-n">2,884,112.40</div></div>
                <div className="hy-tile"><div className="hy-tile-l">Ledger</div><div className="hy-tile-n">{chqOpen ? "2,883,862.40" : "2,884,112.40"}</div></div>
                <div className="hy-tile"><div className="hy-tile-l">Unexplained</div><div className={`hy-tile-n${chqOpen ? " hy-tile-n--warn" : ""}`}>{chqOpen ? "250.00" : "0.00"}</div></div>
              </div>
              <div className="hy-lines">
                <div className="hy-line"><span className="hy-line-d">12 Sep</span><span className="hy-line-desc">TRF GULF TECHNICAL SUP</span><span className="hy-line-ref">INV-4471 · J-2291</span><span className="hy-line-st">Matched</span></div>
                <div className="hy-line"><span className="hy-line-d">12 Sep</span><span className="hy-line-desc">POS ADNOC 8821</span><span className="hy-line-ref">Receipt · fuel card</span><span className="hy-line-st">Matched</span></div>
                <div className="hy-line"><span className="hy-line-d">11 Sep</span><span className="hy-line-desc">INWARD RTGS ELC GROUP</span><span className="hy-line-ref">SI-1187 part payment</span><span className="hy-line-st">Matched</span></div>
                <div className={`hy-line${chqOpen ? " hy-line--ask" : ""}`}><span className="hy-line-d">10 Sep</span><span className="hy-line-desc">CHQ 100421 · 250.00</span><span className="hy-line-ref">{chqOpen ? "No document found" : chq === "petty" ? "Petty cash · Layla H." : "Slip requested from Noor"}</span><span className="hy-line-st">{chqOpen ? "Asking you" : "Resolved"}</span></div>
                <div className="hy-line"><span className="hy-line-d">09 Sep</span><span className="hy-line-desc">BANK CHARGES</span><span className="hy-line-ref">Rule · bank charges</span><span className="hy-line-st">Posted</span></div>
              </div>
              <span className="hy-pane-foot">{chqOpen ? "One line needs you. Open Decisions to resolve it." : "Every line explained. Nothing carried forward."}</span>
            </>
          )}

          {tab === "decisions" && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">Waiting on you</span><span className="hy-pane-status">{openCount} open · assigned to Layla</span></div>
              {chqOpen ? (
                <div className="hy-dec hy-dec--open">
                  <div className="hy-dec-row">
                    <span className="hy-dec-id">D-124</span>
                    <div className="hy-dec-body">
                      <span className="hy-dec-h">Cheque 100421 cleared with no document</span>
                      <span className="hy-dec-p">AED 250.00 left the account on 10 Sep. No invoice, receipt or approval matches it. Nearest pattern: petty-cash top-ups by Noor on the 10th of each month (AED 250, 4 of the last 6 months).</span>
                    </div>
                  </div>
                  <div className="hy-dec-actions">
                    <button type="button" className="hy-btn hy-btn--navy" onClick={() => setChq("petty")}>Post as petty cash</button>
                    <button type="button" className="hy-btn hy-btn--outline" onClick={() => setChq("ask")}>Ask Noor for the slip</button>
                  </div>
                </div>
              ) : (
                <div className="hy-dec" style={{ padding: 14 }}>
                  <span className="hy-tick" aria-hidden="true">✓</span>
                  <div className="hy-dec-body">
                    <span className="hy-dec-h" style={{ fontSize: 13 }}>D-124 resolved · {chq === "petty" ? "posted as petty cash" : "slip requested from Noor"}</span>
                    <span className="hy-dec-p hy-dec-p--sm">Reason recorded by Layla H. at 06:11. The bank now reconciles to the dirham.</span>
                  </div>
                </div>
              )}
              <div className="hy-dec"><span className="hy-dec-id">D-118</span><div className="hy-dec-body"><span className="hy-dec-h hy-dec-h--sm">Coding below confidence threshold · 74%</span><span className="hy-dec-p hy-dec-p--sm">Gray Mackenzie, AED 14,720. Proposed Office consumables; history suggests Staff welfare.</span></div></div>
              <div className="hy-dec"><span className="hy-dec-id">D-117</span><div className="hy-dec-body"><span className="hy-dec-h hy-dec-h--sm">Tax invoice criteria not met</span><span className="hy-dec-p hy-dec-p--sm">Almara Catering INV-8512: supplier TRN missing. AED 1,036 input VAT held until corrected.</span></div></div>
            </>
          )}

          {tab === "close" && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">September 2026 · day 2 of close</span><span className={`hy-lock-l${locked ? " hy-lock-l--done" : ""}`}>{locked ? "Locked · 2 days" : canLock ? "Ready to lock" : `${approved} of 3 approvals`}</span></div>
              <div className="hy-progress"><span className="hy-progress-l">Progress</span><span className="hy-progress-track"><span className="hy-progress-fill" style={{ width: `${closePct}%` }} /></span><span className="hy-progress-n">{closePct}%</span></div>
              <div className="hy-check">
                <div className="hy-check-row"><span className="hy-check-box" aria-hidden="true">✓</span><span className="hy-check-l">Documents in · 214 filed, 4 duplicates removed</span></div>
                <div className="hy-check-row"><span className="hy-check-box" data-state={chqOpen ? "open" : undefined} aria-hidden="true">{chqOpen ? "" : "✓"}</span><span className="hy-check-l">Bank reconciliation · 4 accounts</span></div>
                <div className="hy-check-row"><span className="hy-check-box" aria-hidden="true">✓</span><span className="hy-check-l">Recurring journals and schedules released</span></div>
                {[
                  "Accrual · Etisalat fibre, May and June · AED 4,300",
                  "Accrual · Marina fit-out subcontractor · AED 61,000",
                  "Accrual · September audit fee · AED 12,000",
                ].map((label, i) => (
                  <div className="hy-check-row" key={label}>
                    <span className="hy-check-box" data-state={acc[i] ? undefined : "open"} aria-hidden="true">{acc[i] ? "✓" : ""}</span>
                    <span className="hy-check-l">{label}</span>
                    {!acc[i] && (
                      <button type="button" className="hy-btn hy-btn--navy" onClick={() => setAcc((a) => { const n = [...a] as [boolean, boolean, boolean]; n[i] = true; return n; })}>Approve</button>
                    )}
                  </div>
                ))}
                <div className="hy-check-row">
                  <span className="hy-check-box" data-state={locked ? undefined : "idle"} aria-hidden="true">{locked ? "✓" : ""}</span>
                  <span className="hy-check-l">Period lock · yours to press</span>
                  {canLock && <button type="button" className="hy-btn hy-btn--blush" onClick={lockPeriod}>Lock September</button>}
                </div>
              </div>
              <span className="hy-pane-foot">{locked ? "September is locked. No agent can post into it; corrections go to October, on the record." : canLock ? "All approvals in. Lock the period and the pack rebuilds." : "Approve the accruals to clear the checklist."}</span>
            </>
          )}

          {tab === "report" && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">Management pack · September 2026</span><span className="hy-pane-status">{locked ? "Rebuilt from the locked ledger · 09:40" : "Draft · rebuilds when September locks"}</span></div>
              <div className="hy-tiles">
                <div className="hy-tile"><div className="hy-tile-l">Revenue</div><div className="hy-tile-n">1.84m</div><div className="hy-tile-s">+6.2% vs Aug</div></div>
                <div className="hy-tile"><div className="hy-tile-l">Gross margin</div><div className="hy-tile-n">31.4%</div><div className="hy-tile-s hy-tile-s--warn">down 2.1 pts</div></div>
                <div className="hy-tile"><div className="hy-tile-l">Cash</div><div className="hy-tile-n">4.21m</div><div className="hy-tile-s">3 accounts, reconciled</div></div>
              </div>
              <div className="hy-why">
                <span className="hy-why-h">Why gross margin moved</span>
                <span className="hy-why-p">AED 61,000 of subcontractor cost on the Marina fit-out was billed in September while the client invoice falls in October. With the accrued-revenue entry Layla approved at close, margin on the job is unchanged; the timing shows here and reverses next month.</span>
                <div className="hy-chips"><span className="hy-chip">Trace: J-2314 accrual</span><span className="hy-chip">Trace: SUB-0917 invoice</span><span className="hy-chip">Open job ledger</span></div>
              </div>
              <div className="hy-for">
                <div className="hy-for-card hy-for-card--navy"><strong>For Rashid:</strong> money in 1.84m, money out 1.52m, owed to you 1.96m. Two customers are late; reminders are out.</div>
                <div className="hy-for-card hy-for-card--blush"><strong>For the board:</strong> pack exported to PDF, every figure linked to its source. Sent by Layla at 09:40.</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

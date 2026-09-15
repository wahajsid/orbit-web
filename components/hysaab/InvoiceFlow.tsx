"use client";

/* ── hysaab invoice: one invoice, seven stages ──────────────────────
   The left column lists the pipeline the real module runs (inbound →
   extract → reconcile → match + rules → second read → verdict → chase
   and report); the product window on the right shows INV-2107 at that
   stage. Autoplays every 4.8s; any click takes control. Illustrative
   data, same visual language as the homepage demo (hy-win, hy-beat). */

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "../Wordmark";

const STEPS = [
  { t: "09:12", h: "It arrives.", p: "The supplier emails the invoice to the client's own intake address, or your team drops a folder. Old tracking sheets import too, so the register starts complete." },
  { t: "09:12", h: "Every field is read.", p: "A vision model reads supplier, TRNs, dates, lines and tax, and scores its confidence per field. It reads the numbers. It never adds them up." },
  { t: "09:12", h: "The arithmetic is redone in code.", p: "Every line, the VAT at the stated rate and the total are recomputed independently, within your rounding tolerance. A beautiful invoice that does not add up is still caught." },
  { t: "09:13", h: "Matched, then tested against the law.", p: "The recipient is matched to your entity by TRN, which sets the rule profile: UAE Articles 59 and 60, or KSA ZATCA. Blocked input tax, reverse charge, duplicates and the claim window are separate checks." },
  { t: "09:13", h: "A second opinion on anything risky.", p: "A high-risk or low-confidence invoice is read again by an independent model, and a verifier agent confirms or questions each finding. Nothing is changed automatically: disagreements go to a person." },
  { t: "09:31", h: "A verdict with the reason named.", p: "The invoice gets a risk band, the VAT is marked claim or hold, and it lands in the register under its filing period. Noor reviews it in one screen and moves on." },
  { t: "Day 2", h: "The supplier is chased. The client is told.", p: "A correction request citing the exact article goes to the supplier when a person presses send. The corrected invoice supersedes the old one on arrival, and the monthly client report tells the story." },
];

const ADVANCE_MS = 4800;

function Row({ k, v, tone }: { k: string; v: React.ReactNode; tone?: "ok" | "bad" | "warn" | "muted" }) {
  return (
    <div className={`hy-iv-row${tone ? ` hy-iv-row--${tone}` : ""}`}>
      <span className="hy-iv-row-k">{k}</span>
      <span className="hy-iv-row-v">{v}</span>
    </div>
  );
}

function Mark({ tone }: { tone: "ok" | "bad" | "warn" | "na" }) {
  const c = { ok: "✓", bad: "✕", warn: "!", na: "–" }[tone];
  return <span className={`hy-iv-mark hy-iv-mark--${tone}`} aria-hidden="true">{c}</span>;
}

export function InvoiceFlow() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const playRef = useRef(playing);
  playRef.current = playing;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => { if (playRef.current) setStep((s) => (s + 1) % STEPS.length); }, ADVANCE_MS);
    return () => clearInterval(id);
  }, [playing]);

  const go = (n: number) => { setStep(n); setPlaying(false); };

  return (
    <div className="hy-demo" id="flow">
      <div className="hy-beats">
        <div className="hy-beats-ctl">
          <button type="button" className="hy-btn hy-btn--navy" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}>
            {playing ? "Pause" : "Play"}
          </button>
          <span className="hy-beats-mode">{playing ? "Following INV-2107 through the checks." : "You have the controls. Click any stage."}</span>
          <span className="hy-beats-n hy-num">Stage {step + 1} of {STEPS.length}</span>
        </div>
        {STEPS.map((s, i) => (
          <button type="button" key={s.h} className="hy-beat" onClick={() => go(i)} aria-current={step === i ? "step" : undefined}>
            <span className="hy-beat-time"><span className="hy-beat-t">{s.t}</span><span className="hy-beat-bar" /></span>
            <span className="hy-beat-body"><span className="hy-beat-h">{s.h}</span><span className="hy-beat-p">{s.p}</span></span>
          </button>
        ))}
      </div>

      <div className="hy-win" aria-live="polite">
        <div className="hy-win-bar">
          <Wordmark size={15} ground="navy" suffix={false} />
          <span className="hy-win-org">invoice · Al Hamra Trading LLC</span>
          <span className="hy-win-user"><span className="hy-win-user-n">Noor K.</span><span className="hy-win-avatar" aria-hidden="true">NK</span></span>
        </div>
        <div className="hy-iv-track" aria-hidden="true">
          {["Intake", "Read", "Maths", "Rules", "2nd read", "Verdict", "Chase"].map((l, i) => (
            <span key={l} className={`hy-iv-track-s${i < step ? " is-done" : ""}${i === step ? " is-on" : ""}`}>{l}</span>
          ))}
        </div>

        <div className="hy-pane">
          {step === 0 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">Intake · alhamra@ap.hysaab.ai</span><span className="hy-pane-status">3 arrived this morning</span></div>
              <div className="hy-lines">
                <div className="hy-line hy-line--ask"><span className="hy-line-d">09:12</span><span className="hy-line-desc">Al Madar Hospitality Supplies</span><span className="hy-line-ref">INV-2107.pdf · 2 pages</span><span className="hy-line-st">Reading</span></div>
                <div className="hy-line"><span className="hy-line-d">08:47</span><span className="hy-line-desc">Etisalat Business</span><span className="hy-line-ref">SEP-4471.pdf</span><span className="hy-line-st">Low risk</span></div>
                <div className="hy-line"><span className="hy-line-d">08:02</span><span className="hy-line-desc">Gulf Technical Supplies</span><span className="hy-line-ref">INV-4471.pdf</span><span className="hy-line-st">Low risk</span></div>
              </div>
              <div className="hy-iv-note">Each client gets its own intake address. Forward it, or ask suppliers to send invoices straight there. A folder upload and a history import run the same pipeline.</div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">INV-2107 · what was read</span><span className="hy-pane-status">confidence per field</span></div>
              <div className="hy-iv-grid">
                <div className="hy-doc">
                  <div className="hy-doc-head"><span className="hy-doc-sup">AL MADAR HOSPITALITY SUPPLIES LLC</span><span className="hy-doc-kind">TAX INVOICE</span></div>
                  <div className="hy-doc-meta">Al Barsha 1, Dubai · <span className="hy-iv-gap">TRN</span></div>
                  <div className="hy-doc-rule" />
                  <div className="hy-doc-lines">
                    <div className="hy-doc-line"><span>Coffee machines ×2</span><span>8,400.00</span></div>
                    <div className="hy-doc-line"><span>Client dinner, Marina</span><span>3,600.00</span></div>
                    <div className="hy-doc-line hy-doc-line--muted"><span>VAT 5%</span><span>600.00</span></div>
                  </div>
                  <div className="hy-doc-total"><span>Total AED</span><span>12,600.00</span></div>
                  <span className="hy-doc-src">Emailed in · 14 Sep 2026</span>
                </div>
                <div className="hy-iv-fields">
                  <Row k="Supplier" v="Al Madar Hospitality" />
                  <Row k="Supplier TRN" v="not found on page 1 or 2" tone="bad" />
                  <Row k="Recipient TRN" v="100456789000003 · 99%" />
                  <Row k="Invoice no." v="INV-2107 · 99%" />
                  <Row k="Date" v="14 Sep 2026 · 98%" />
                  <Row k="Net / VAT" v="12,000.00 / 600.00 · 97%" />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">Reconciliation · done in code</span><span className="hy-pane-status">tolerance AED 0.05</span></div>
              <div className="hy-check">
                <div className="hy-check-row"><Mark tone="ok" /><span className="hy-check-l">Lines 8,400.00 + 3,600.00 = <strong>12,000.00</strong> net</span></div>
                <div className="hy-check-row"><Mark tone="ok" /><span className="hy-check-l">5% of 12,000.00 = <strong>600.00</strong> VAT, as stated</span></div>
                <div className="hy-check-row"><Mark tone="ok" /><span className="hy-check-l">12,000.00 + 600.00 = <strong>12,600.00</strong> total, as stated</span></div>
                <div className="hy-check-row"><Mark tone="ok" /><span className="hy-check-l">Invoice date is not in the future · no IBAN checksum failure</span></div>
              </div>
              <div className="hy-iv-note">The model reads. It never calculates. If a total is off by more than your tolerance, the finding names the exact line.</div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">Rules · UAE profile</span><span className="hy-pane-status">recipient matched by TRN → Al Hamra Trading LLC</span></div>
              <div className="hy-check">
                <div className="hy-check-row"><Mark tone="ok" /><span className="hy-check-l">The words &ldquo;Tax Invoice&rdquo; are displayed</span><span className="hy-iv-ref">Art. 59(1)(a)</span></div>
                <div className="hy-check-row hy-iv-bad"><Mark tone="bad" /><span className="hy-check-l">Supplier TRN missing: not a valid tax invoice</span><span className="hy-iv-ref">Art. 59(1)(b)</span></div>
                <div className="hy-check-row"><Mark tone="ok" /><span className="hy-check-l">Recipient name, address and TRN shown</span><span className="hy-iv-ref">Art. 59(1)(c)</span></div>
                <div className="hy-check-row"><Mark tone="ok" /><span className="hy-check-l">Sequential number, date, VAT per line in AED</span><span className="hy-iv-ref">Art. 59(1)(d)–(j)</span></div>
                <div className="hy-check-row hy-iv-warn"><Mark tone="warn" /><span className="hy-check-l">&ldquo;Client dinner&rdquo; is potentially blocked input tax</span><span className="hy-iv-ref">Art. 53</span></div>
                <div className="hy-check-row"><Mark tone="na" /><span className="hy-check-l">Reverse charge: local supplier, not applicable</span><span className="hy-iv-ref">RCM</span></div>
                <div className="hy-check-row"><Mark tone="ok" /><span className="hy-check-l">First sighting of Al Madar · INV-2107, no duplicate</span><span className="hy-iv-ref">Register</span></div>
                <div className="hy-check-row"><Mark tone="ok" /><span className="hy-check-l">Inside the claim window: this period or the next</span><span className="hy-iv-ref">Q3 2026</span></div>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">Second opinion · independent model</span><span className="hy-pane-status">triggered by a High band</span></div>
              <div className="hy-tiles">
                <div className="hy-tile"><div className="hy-tile-l">Supplier TRN</div><div className="hy-tile-n">agree</div><div className="hy-tile-s">both reads: absent</div></div>
                <div className="hy-tile"><div className="hy-tile-l">Net / VAT</div><div className="hy-tile-n">agree</div><div className="hy-tile-s">12,000.00 / 600.00</div></div>
                <div className="hy-tile"><div className="hy-tile-l">Total</div><div className="hy-tile-n">agree</div><div className="hy-tile-s">12,600.00</div></div>
              </div>
              <div className="hy-dec hy-dec--open">
                <div className="hy-dec-row">
                  <span className="hy-dec-id">Verifier</span>
                  <div className="hy-dec-body">
                    <span className="hy-dec-h">Confirmed: Art. 59(1)(b) supplier TRN missing</span>
                    <span className="hy-dec-p">Checked the letterhead, the footer and page 2. No 15-digit TRN appears anywhere. Supplier memory has no prior TRN for this vendor.</span>
                  </div>
                </div>
              </div>
              <div className="hy-iv-note">Values are never auto-corrected. When two reads disagree, the fields in dispute are named and a person decides. Every manual correction is journaled.</div>
            </>
          )}

          {step === 5 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">Verdict · INV-2107</span><span className="hy-pane-status">reviewed by Noor K. at 09:31</span></div>
              <div className="hy-iv-verdict">
                <span className="hy-iv-band">High risk</span>
                <div className="hy-iv-verdict-body">
                  <span className="hy-dec-h">Hold AED 600.00 input VAT until a corrected invoice arrives</span>
                  <span className="hy-dec-p">Of that, AED 180.00 on the client dinner stays flagged as potentially blocked even after correction. Filed under Q3 2026, Jul to Sep.</span>
                </div>
              </div>
              <div className="hy-lines">
                <div className="hy-line"><span className="hy-line-d">Q3</span><span className="hy-line-desc">Gulf Technical Supplies</span><span className="hy-line-ref">199.50 VAT</span><span className="hy-line-st">Claim</span></div>
                <div className="hy-line hy-line--ask"><span className="hy-line-d">Q3</span><span className="hy-line-desc">Al Madar Hospitality</span><span className="hy-line-ref">600.00 VAT</span><span className="hy-line-st">Hold</span></div>
                <div className="hy-line"><span className="hy-line-d">Q3</span><span className="hy-line-desc">Etisalat Business</span><span className="hy-line-ref">412.20 VAT</span><span className="hy-line-st">Claim</span></div>
                <div className="hy-line"><span className="hy-line-d">Q3</span><span className="hy-line-desc">Almara Catering</span><span className="hy-line-ref">1,036.00 VAT</span><span className="hy-line-st">Chasing</span></div>
              </div>
            </>
          )}

          {step === 6 && (
            <>
              <div className="hy-pane-head"><span className="hy-pane-title">Chase · Al Madar Hospitality</span><span className="hy-pane-status">sent by Noor K. · human-triggered</span></div>
              <div className="hy-why">
                <span className="hy-why-h">Correction request, drafted</span>
                <span className="hy-why-p">Invoice INV-2107 dated 14 Sep 2026 does not show your Tax Registration Number, required under Article 59(1)(b) of the UAE VAT Executive Regulation. Please re-issue it with your TRN to alhamra@ap.hysaab.ai.</span>
              </div>
              <div className="hy-check">
                <div className="hy-check-row"><Mark tone="ok" /><span className="hy-check-l">Sent 14 Sep · corrected invoice received 16 Sep</span></div>
                <div className="hy-check-row"><Mark tone="ok" /><span className="hy-check-l">Old copy superseded · chase closed automatically</span></div>
                <div className="hy-check-row"><Mark tone="ok" /><span className="hy-check-l">AED 420.00 now claimable in Q3 · AED 180.00 held as blocked</span></div>
              </div>
              <div className="hy-for">
                <div className="hy-for-card hy-for-card--navy"><strong>Client report, September:</strong> 214 invoices, 93.8% compliant by count and 96.1% by VAT value. Nine suppliers chased, seven corrected.</div>
                <div className="hy-for-card hy-for-card--blush"><strong>Before it sends:</strong> a reviewer agent checks every client email, then it waits for a two-step human sign-off.</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

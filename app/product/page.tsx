import "../advert.css";
import { MgNav, MgFooter } from "@/components/MgChrome";

export const metadata = {
  title: "Orbit — One system, six modules, every dirham accounted for.",
  description:
    "Payables, receivables, the ledger, the close, documents and tax — each run by agents, each answerable to you.",
};

/* ── /product — 1:1 port of orbit-product.dc.html ────────────────────
   Six module sections alternating copy and UI vignette in a 2-col ruled
   grid. Copy always precedes its vignette in the DOM so a phone stacks
   text-first; desktop alternation is done in CSS (mg-prod-row-flip). */

export default function Page() {
  return (
    <>
      <MgNav active="product" />

      <main>
        {/* ── Page header ─────────────────────────────────────────── */}
        <section className="mg-prod-hero">
          <div className="mg-kicker">THE PRODUCT</div>
          <h1 className="mg-prod-h">One system, six modules, every dirham accounted for.</h1>
          <p className="mg-prod-lede">Payables, receivables, the ledger, the close, documents and tax — each run by agents, each answerable to you.</p>
        </section>

        {/* ── 01 · PAYABLES — copy left, intake vignette right ────── */}
        <section className="mg-prod-row">
          <div className="mg-prod-copy">
            <div className="mg-kicker">01 · Payables</div>
            <h2 className="mg-prod-mh">Invoices arrive. Bills get paid. Nothing slips.</h2>
            <p className="mg-prod-mp">WhatsApp, email or Telegram a document and the intake line takes over: classified, extracted, coded from your history, tax-tested and checked for duplicates — usually before you&rsquo;ve put your phone down. Only the uncertain ones ask for you.</p>
            <div className="mg-prod-metrics">
              <span><b>≤ 3 min</b> intake to coded</span>
              <span><b>100%</b> duplicate-guarded</span>
            </div>
          </div>
          <div className="mg-prod-vig">
            <div className="mg-vig-card">
              <div className="mg-vig-head">Intake — this morning</div>
              <div className="mg-vig-body">
                <div className="mg-vig-row"><span className="mg-vig-tag mg-vig-tag-ok">CODED</span><span>Gray Mackenzie — AED 14,720 → Office consumables</span><span className="mg-vig-meta">WhatsApp · 07:41</span></div>
                <div className="mg-vig-row"><span className="mg-vig-tag mg-vig-tag-bad">HELD</span><span>Almarai INV-5512 — TRN missing, VAT blocked</span><span className="mg-vig-meta">Email · 08:02</span></div>
                <div className="mg-vig-row"><span className="mg-vig-tag mg-vig-tag-ok">CODED</span><span>Knight Frank — rent, month 3 of 12 schedule</span><span className="mg-vig-meta">Email · 08:15</span></div>
                <div className="mg-vig-row"><span className="mg-vig-tag mg-vig-tag-mute">DUPE</span><span className="mg-vig-strike">Etisalat 4402 — already filed 04 Jun</span><span className="mg-vig-meta">WhatsApp · 08:31</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 · RECEIVABLES — vignette left, copy right ────────── */}
        <section className="mg-prod-row mg-prod-row-flip">
          <div className="mg-prod-copy">
            <div className="mg-kicker">02 · Receivables</div>
            <h2 className="mg-prod-mh">Polite, persistent, and never forgets to chase.</h2>
            <p className="mg-prod-mp">Collection agents draft and dispatch reminders on a cadence you approve once. Incoming payments are matched to the bank automatically; write-off exposure is measured against your policy, not a guess.</p>
          </div>
          <div className="mg-prod-vig">
            <div className="mg-vig-card">
              <div className="mg-vig-head">Receivables — cadence</div>
              <div className="mg-vig-body">
                <div className="mg-vig-row"><span className="mg-vig-tag mg-vig-tag-ok mg-vig-tag-w">SENT</span><span>Reminder 2 of 3 — Helio Retail, AED 42,300 overdue 12 days</span></div>
                <div className="mg-vig-row"><span className="mg-vig-tag mg-vig-tag-ok mg-vig-tag-w">PAID</span><span>Nimbus FZ LLC settled — matched to bank line, to the fils</span></div>
                <div className="mg-vig-row"><span className="mg-vig-tag mg-vig-tag-bad mg-vig-tag-w">ASK</span><span>Write-off exposure vs policy on Delta Trading — your call</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 03 · LEDGER — copy left, journal vignette right ─────── */}
        <section className="mg-prod-row">
          <div className="mg-prod-copy">
            <div className="mg-kicker">03 · Ledger</div>
            <h2 className="mg-prod-mh">Every journal explains itself.</h2>
            <p className="mg-prod-mp">Each entry carries its agent&rsquo;s commentary and the full evidence bundle — the source document, the OCR corroboration, the confidence score. Open any number and see exactly why it&rsquo;s there.</p>
          </div>
          <div className="mg-prod-vig">
            <div className="mg-vig-card">
              <div className="mg-vig-head"><span>JE-2040 — Prepayment release</span><span className="mg-vig-head-right">CONF 99</span></div>
              <div className="mg-vig-body">
                <div className="mg-vig-je"><span className="mg-vig-je-side">DR</span><span>Rent — office</span><span className="mg-vig-je-amt">36,750</span></div>
                <div className="mg-vig-je"><span className="mg-vig-je-side">CR</span><span>Prepayments</span><span className="mg-vig-je-amt">36,750</span></div>
                <div className="mg-vig-note"><b>Agent commentary</b> — Knight Frank annual rent, month 3 of 12. Schedule on file; amount corroborated by OCR against the lease.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 04 · THE CLOSE — vignette left, copy right ──────────── */}
        <section className="mg-prod-row mg-prod-row-flip">
          <div className="mg-prod-copy">
            <div className="mg-kicker">04 · The close</div>
            <h2 className="mg-prod-mh">Month-end runs itself down to a short list.</h2>
            <p className="mg-prod-mp">The cockpit shows what&rsquo;s done, what&rsquo;s posting and what needs a human. When every gate is green, you close and lock — and the lock is enforced everywhere, agents included.</p>
            <div className="mg-prod-metrics">
              <span><b>3 days</b> typical close</span>
              <span><b>2</b> decisions this month</span>
            </div>
          </div>
          <div className="mg-prod-vig">
            <div className="mg-vig-card">
              <div className="mg-vig-head"><span>Close checklist — June</span><span className="mg-vig-head-right">68%</span></div>
              <div className="mg-vig-body">
                <div className="mg-vig-check"><span className="mg-vig-check-mark" style={{ color: "var(--accent)" }}>✓</span><span>Bank reconciliation — all accounts matched</span></div>
                <div className="mg-vig-check"><span className="mg-vig-check-mark" style={{ color: "var(--accent)" }}>✓</span><span>Depreciation posted — all classes</span></div>
                <div className="mg-vig-check"><span className="mg-vig-check-mark" style={{ color: "var(--bad)" }}>●</span><span>Accruals — 2 proposals awaiting your yes</span></div>
                <div className="mg-vig-check"><span className="mg-vig-check-mark" style={{ color: "var(--text-muted)" }}>○</span><span>Zoho Books: lock period 01–30 Jun — after Orbit close gate</span></div>
                <button type="button" className="mg-vig-lock">Close the period and lock</button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 05 + 06 — text-only pair split by a hairline ────────── */}
        <section className="mg-prod-duo">
          <div>
            <div className="mg-kicker">05 · Documents</div>
            <h2 className="mg-prod-dh">A vault, not a shoebox.</h2>
            <p className="mg-prod-dp">Every document sha-deduped, org-scoped and linked to its journal. Search by supplier, amount or period — the evidence is one click from the number.</p>
          </div>
          <div>
            <div className="mg-kicker">06 · Tax &amp; compliance</div>
            <h2 className="mg-prod-dh">FTA-grade, before you file.</h2>
            <p className="mg-prod-dp">Article 59 tested on every invoice, input VAT held until documents qualify, e-invoicing ready ahead of the mandate. Your VAT return assembles itself as the month runs.</p>
          </div>
        </section>

        {/* ── Green CTA band ──────────────────────────────────────── */}
        <section className="mg-prod-cta">
          <h2 className="mg-prod-cta-h">See it run on your own books.</h2>
          <div className="mg-poster-cta">
            <a href="/#join" className="mg-cta mg-cta-on-green">Book a demo →</a>
            <a href="/" className="mg-ghost mg-ghost-on-green">Back to home</a>
          </div>
        </section>
      </main>

      <MgFooter />
    </>
  );
}

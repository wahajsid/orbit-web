/* ── /invoice ────────────────────────────────────────────────────────
   Rebuilt 2026-09 in the V4 design (PageShell + hw-* kit). Preserves
   the InvoiceFlow interactive walkthrough and all compliance claims
   from the V2 page. Register kept as a table; findings as cards.
   Previous version at backups/ if needed.
   2026-09-23: invoice checks are part of Hysaab Finance ("hysaab
   invoice" is retired as a name); the CTA books a demo. */

import { PageShell, PageHero } from "@/components/home/PageShell";
import { InvoiceFlow } from "@/components/hysaab/InvoiceFlow";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";

export const metadata = {
  title: "Supplier Invoice VAT Checks for UAE & KSA | Hysaab Finance",
  description:
    "Hysaab Finance reads every supplier invoice, checks it against the UAE and KSA tax-invoice rules, catches duplicates and tells you what is safe to claim.",
  alternates: langAlternates("/invoice"),
};

const FINDINGS: { ref: string; sev: "Hold" | "Review" | "Flag"; h: string; p: string }[] = [
  { ref: "UAE Art. 59 · KSA ZATCA", sev: "Hold", h: "Not a valid tax invoice", p: "Missing words, a missing or malformed TRN, no AED tax amount, no exchange rate on a foreign-currency invoice. The failing field is named with its article." },
  { ref: "Reconciliation", sev: "Hold", h: "Numbers that do not add up", p: "Lines, VAT at the stated rate and the total are recomputed in code. A wrong rate or a total that is off by more than your tolerance is caught on the line it happens." },
  { ref: "Register", sev: "Hold", h: "Duplicates and re-issues", p: "Every invoice is keyed by supplier and number, with a fingerprint of its amounts and date. An exact re-send is blocked; a corrected re-issue supersedes the old copy." },
  { ref: "UAE Art. 53 · KSA Art. 50", sev: "Flag", h: "Blocked input tax", p: "Entertainment, hospitality, personal-use vehicles and employee benefits are flagged as potentially blocked, even on a perfect invoice. A flag, never a silent block." },
  { ref: "Reverse charge", sev: "Review", h: "Imports categorised, not failed", p: "A foreign supplier or a reverse-charge statement moves the invoice to RCM. The findings are kept, but it leaves the chase queue instead of looking like a failure." },
  { ref: "Claim window", sev: "Flag", h: "Late claims", p: "In the UAE, input VAT is claimed in the invoice's period or the next. Older invoices are flagged so the receipt-date evidence is kept. In KSA age is shown for information." },
  { ref: "Recipient", sev: "Review", h: "Not addressed to your entity", p: "The recipient is matched to your group by TRN, then by name and aliases. An invoice addressed to someone else is stopped, and its own compliance is still graded." },
  { ref: "Supplier memory", sev: "Review", h: "A TRN that changed", p: "Each supplier's established TRN is learned from past invoices. A new invoice showing a different one is put in front of a person, because that is usually a misread." },
  { ref: "Cabinet Decision 149", sev: "Flag", h: "The October 2026 recovery rules", p: "Cash-settled supplies above the Ministerial threshold, employee accommodation without a MoHRE mandate, and separately priced bundles are being added as checks ahead of 1 October 2026." },
];

const REGISTER: { sup: string; no: string; date: string; vat: string; band: string; status: "Claim" | "Hold" | "Chasing" | "RCM" | "Blocked" }[] = [
  { sup: "Gulf Technical Supplies", no: "INV-4471", date: "12 Sep", vat: "199.50", band: "Low", status: "Claim" },
  { sup: "Al Madar Hospitality", no: "INV-2107", date: "14 Sep", vat: "600.00", band: "High", status: "Hold" },
  { sup: "Almara Catering", no: "INV-8512", date: "09 Sep", vat: "1,036.00", band: "High", status: "Chasing" },
  { sup: "Amazon Web Services EMEA", no: "EUINAE-2231", date: "01 Sep", vat: "2,184.00", band: "Low", status: "RCM" },
  { sup: "Knight Frank", no: "KF-0917", date: "01 Sep", vat: "3,750.00", band: "Low", status: "Claim" },
  { sup: "Marina Yacht Club", no: "MYC-3310", date: "05 Sep", vat: "420.00", band: "Medium", status: "Blocked" },
];

export default function InvoicePage() {
  return (
    <PageShell band={{ kicker: "Hysaab Finance · Invoice checks", title: "Put your supplier invoices to the test.", body: "The invoice checks run today inside working tax teams in the UAE and KSA. Tell us your invoice volume and jurisdiction and a real person will set you up within one working day." }}>
      <PageHero
        eyebrow="Hysaab Finance · Invoice checks"
        title={<>Every supplier invoice, tested before you claim the VAT.</>}
        lede="Every field read, every sum redone, every rule tested. A person decides what gets claimed."
      >
        <a className="hw-btn hw-btn--peach" {...DEMO}>Book a demo <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB.en}</span></a>
        <a className="hw-link hw-link--light" href="#flow">Follow an invoice</a>
      </PageHero>

      {/* ── The flow ── */}
      <section id="flow">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">One invoice, start to finish</p>
              <h2>Follow INV-2107 from the inbox to a claim you can defend.</h2>
            </div>
            <p>Illustrative invoice. Al Madar forgot its TRN and billed a client dinner on the same page. Both get caught, for different reasons.</p>
          </div>
          <InvoiceFlow />
        </div>
      </section>

      {/* ── What it catches ── */}
      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">What it catches</p>
              <h2>Nine ways a VAT claim fails an audit.<br /><span>Each one tested.</span></h2>
            </div>
            <p>Every finding carries a severity and a legal reference, so the audit trail explains itself. Hold means the VAT waits for a fix. Review puts it in front of a person. Flag records the risk without stopping the claim.</p>
          </div>
          <div className="hw-cards">
            {FINDINGS.map((f) => (
              <article key={f.h}>
                <p className="hw-eyebrow">{f.ref} · {f.sev}</p>
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </article>
            ))}
          </div>
          <div className="hw-note">
            <span className="hw-mono">Configuration</span>
            <p>Set a materiality threshold and immaterial VAT drops out of the queue. Whitelist trusted suppliers. Choose monthly or quarterly periods with FTA-staggered quarters, per entity. Import old trackers and they are rechecked on day one.</p>
          </div>
        </div>
      </section>

      {/* ── Register + report ── */}
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">The register and the report</p>
              <h2>The file your auditor asks for, and the page your client reads.</h2>
            </div>
            <p>Every invoice, verdict and claim sits in one register by filing period. The monthly report is built from the same numbers, so the two never disagree.</p>
          </div>
          <div className="hw-table-wrap">
            <table className="hw-table">
              <thead><tr><th>Supplier</th><th>Invoice</th><th>Date</th><th style={{ textAlign: "end" }}>VAT AED</th><th>Band</th><th>Status</th></tr></thead>
              <tbody>
                {REGISTER.map((r) => (
                  <tr key={r.no}>
                    <td>{r.sup}</td>
                    <td>{r.no}</td>
                    <td>{r.date}</td>
                    <td style={{ textAlign: "end", fontVariantNumeric: "tabular-nums" }}>{r.vat}</td>
                    <td>{r.band}</td>
                    <td>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="hw-note">
            <span className="hw-mono">Export</span>
            <p>The register exports to Excel in four sheets with low-confidence cells highlighted. The client compliance report is built from the same numbers.</p>
          </div>
        </div>
      </section>

      {/* ── Humans in the loop ── */}
      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Where the people stay</p>
              <h2>The AI reads.<br /><span>Your team decides.</span></h2>
            </div>
          </div>
          <div className="hw-rows">
            <article><span className="hw-mono">01</span><h3>Disagreements go to a person</h3><p>When two models read a field differently, both values are shown and a reviewer chooses. Every correction is journaled with who made it and why.</p></article>
            <article><span className="hw-mono">02</span><h3>A questioned finding keeps its band</h3><p>The verifier agent can confirm or question a finding, but it cannot delete one. Its note goes to the reviewer with the evidence.</p></article>
            <article><span className="hw-mono">03</span><h3>Suppliers are chased when you say so</h3><p>Correction requests are drafted with the exact defects and articles, editable, and sent only when someone presses send.</p></article>
            <article><span className="hw-mono">04</span><h3>Client email has two gates</h3><p>A reviewer agent inspects every prepared client email first, then a two-step human sign-off releases it.</p></article>
          </div>
        </div>
      </section>

      {/* ── Why ── */}
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div>
              <p className="hw-eyebrow">Why we built it</p>
              <h2>We built it for our own tax team first.</h2>
            </div>
            <div className="hw-prose">
              <p>A Gulf tax practice runs on supplier invoices: hundreds a month, each one a small bet that the paper holds up. Checking them properly meant late nights with a calculator. Not checking them meant carrying the risk quietly into the next audit.</p>
              <p>So we built the checker our own team runs every day. It reads every invoice, redoes every sum, tests every rule the law enforces and puts its working on the table, so the judgement and the client relationship stay with the people.</p>
            </div>
          </div>
          <div className="hw-note">
            <span className="hw-mono">Our promise</span>
            <p>We will never call a claim safe that the paper cannot defend, and we will always tell you why.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

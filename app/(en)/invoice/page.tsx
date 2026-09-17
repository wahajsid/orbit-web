import { MgNav, MgFooter } from "@/components/MgChrome";
import { CtaBand } from "@/components/hysaab/CtaBand";
import { InvoiceFlow } from "@/components/hysaab/InvoiceFlow";
import { Wordmark } from "@/components/Wordmark";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "Supplier Invoice VAT Checker for UAE & KSA | hysaab invoice",
  description:
    "hysaab invoice reads every supplier invoice, redoes the arithmetic in code, tests it against UAE Articles 59 and 60 or KSA ZATCA rules, gets a second opinion on anything risky, chases suppliers for corrections and reports to your client. A person decides every claim.",
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
    <div className="hy-page">
      <MgNav />
      <main>
        {/* ── Hero ── */}
        <section className="hy-hero" id="top">
          <div className="hy-wrap hy-hero-grid">
            <div className="hy-hero-copy">
              <span className="hy-kicker hy-kicker--blush">hysaab invoice · tax compliance for supplier invoices</span>
              <h1 className="hy-hero-h1">Every supplier invoice, tested before you claim the VAT.</h1>
              <p className="hy-hero-p">Invoices arrive by email or a folder. hysaab invoice reads every field, redoes the arithmetic in code, tests the invoice against the UAE or KSA rules, gets a second opinion on anything risky, and chases the supplier for the fix. A person makes every call on what gets claimed.</p>
              <div className="hy-hero-cta">
                <a href="/contact" className="hy-btn hy-btn--blush hy-btn--lg">Request access →</a>
                <a href="#flow" className="hy-btn hy-btn--outline-cream hy-btn--lg">Follow an invoice</a>
              </div>
              <div className="hy-stats">
                <div className="hy-stat"><span className="hy-stat-n hy-num">2 reads</span><span className="hy-stat-l">on every risky invoice, by independent models</span></div>
                <div className="hy-stat"><span className="hy-stat-n hy-num">0</span><span className="hy-stat-l">numbers added up by the AI; the maths is code</span></div>
                <div className="hy-stat"><span className="hy-stat-n hy-num">UAE · KSA</span><span className="hy-stat-l">rule profiles, set by the entity it is addressed to</span></div>
              </div>
            </div>
            <div className="hy-hero-win">
              <div className="hy-win">
                <div className="hy-win-bar">
                  <Wordmark size={15} ground="navy" suffix={false} />
                  <span className="hy-win-org">invoice · dashboard</span>
                  <span className="hy-win-user"><span className="hy-win-user-n">Q3 2026</span></span>
                </div>
                <div className="hy-pane" style={{ minHeight: 0 }}>
                  <div className="hy-pane-head"><span className="hy-pane-title">Al Hamra Trading LLC · Jul to Sep</span><span className="hy-pane-status">illustrative</span></div>
                  <div className="hy-tiles">
                    <div className="hy-tile"><div className="hy-tile-l">Invoices</div><div className="hy-tile-n">214</div><div className="hy-tile-s">read and tested</div></div>
                    <div className="hy-tile"><div className="hy-tile-l">Compliant</div><div className="hy-tile-n">93.8%</div><div className="hy-tile-s">96.1% by VAT value</div></div>
                    <div className="hy-tile"><div className="hy-tile-l">VAT held</div><div className="hy-tile-n hy-tile-n--warn">6,410</div><div className="hy-tile-s hy-tile-s--warn">9 suppliers chased</div></div>
                  </div>
                  <div className="hy-check">
                    <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--bad" aria-hidden="true">✕</span><span className="hy-check-l">Supplier TRN missing · Al Madar · INV-2107</span><span className="hy-iv-ref">600.00</span></div>
                    <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--bad" aria-hidden="true">✕</span><span className="hy-check-l">Supplier TRN missing · Almara Catering · INV-8512</span><span className="hy-iv-ref">1,036.00</span></div>
                    <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--warn" aria-hidden="true">!</span><span className="hy-check-l">Potentially blocked · Marina Yacht Club</span><span className="hy-iv-ref">420.00</span></div>
                    <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--ok" aria-hidden="true">✓</span><span className="hy-check-l">Duplicate blocked · Etisalat SEP-4471 sent twice</span><span className="hy-iv-ref">412.20</span></div>
                  </div>
                  <div className="hy-pane-foot">Claimed AED 184,220 · held AED 6,410 · 1 corrected re-issue this week</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── The flow ── */}
        <section className="hy-story hy-section hy-rule-b" id="how">
          <div className="hy-wrap">
            <div className="hy-story-head">
              <div className="hy-story-title">
                <span className="hy-kicker">One invoice, start to finish</span>
                <h2 className="hy-h2 hy-h2--wide">Follow INV-2107 from the inbox to a claim you can defend.</h2>
              </div>
              <span className="hy-story-note">Illustrative invoice. Al Madar forgot its TRN and billed a client dinner on the same page. Both get caught, for different reasons.</span>
            </div>
            <InvoiceFlow />
          </div>
        </section>

        {/* ── What it catches ── */}
        <section className="hy-agents hy-section" id="catches">
          <div className="hy-wrap">
            <div className="hy-agents-head">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span className="hy-kicker hy-kicker--navy">What it catches</span>
                <h2 className="hy-h2">Nine ways a VAT claim fails an audit. Each one tested.</h2>
              </div>
              <p className="hy-agents-p">Every finding carries a severity and a legal reference, so the audit trail explains itself. Hold means the VAT waits for a fix. Review puts it in front of a person. Flag records the risk without stopping the claim.</p>
            </div>
            <div className="hy-agents-grid hy-grid-3">
              {FINDINGS.map((f) => (
                <div className="hy-find" key={f.h}>
                  <div className="hy-find-top"><span className="hy-find-ref">{f.ref}</span><span className={`hy-find-sev${f.sev === "Hold" ? " hy-find-sev--hold" : ""}`}>{f.sev}</span></div>
                  <span className="hy-agent-h">{f.h}</span>
                  <span className="hy-agent-p">{f.p}</span>
                </div>
              ))}
            </div>
            <div className="hy-contract">
              <div className="hy-contract-cell"><span className="hy-contract-h">Materiality</span><span className="hy-contract-p">Set a threshold and immaterial VAT drops out of the queue. The true band is kept.</span></div>
              <div className="hy-contract-cell"><span className="hy-contract-h">Whitelist</span><span className="hy-contract-p">Trusted suppliers stay visible but stop being chased. Lossless and reversible.</span></div>
              <div className="hy-contract-cell"><span className="hy-contract-h">Your periods</span><span className="hy-contract-p">Monthly or quarterly, with FTA-staggered quarters, per entity.</span></div>
              <div className="hy-contract-cell"><span className="hy-contract-h">History</span><span className="hy-contract-p">Old trackers in any layout import and are rechecked, so gaps show up on day one.</span></div>
            </div>
          </div>
        </section>

        {/* ── Register + report ── */}
        <section className="hy-voices hy-section hy-rule-b" id="register">
          <div className="hy-wrap">
            <div className="hy-voices-head">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span className="hy-kicker">The register and the report</span>
                <h2 className="hy-h2">The file your auditor asks for, and the page your client reads.</h2>
              </div>
              <span className="hy-note" style={{ maxWidth: 360 }}>Every invoice, verdict and claim sits in one register by filing period. The monthly report is built from the same numbers, so the two never disagree.</span>
            </div>
            <div className="hy-cohort-grid" style={{ marginTop: 32, alignItems: "stretch" }}>
              <div className="hy-reg">
                <div className="hy-reg-head"><span className="hy-pane-title">Register · Q3 2026</span><span className="hy-pane-status">export to Excel · four sheets, low-confidence cells highlighted</span></div>
                <div className="hy-reg-scroll">
                  <table>
                    <thead><tr><th>Supplier</th><th>Invoice</th><th className="num">VAT AED</th><th>Band</th><th>Status</th></tr></thead>
                    <tbody>
                      {REGISTER.map((r) => (
                        <tr key={r.no} className={r.status === "Hold" || r.status === "Chasing" ? "is-hold" : undefined}>
                          <td>{r.sup}<br /><span style={{ color: "var(--hy-muted)", fontSize: 11 }}>{r.date}</span></td>
                          <td>{r.no}</td>
                          <td className="num">{r.vat}</td>
                          <td>{r.band}</td>
                          <td><span className={`hy-pill${r.status === "Hold" || r.status === "Chasing" || r.status === "Blocked" ? " hy-pill--hold" : r.status === "RCM" ? " hy-pill--rcm" : ""}`}>{r.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="hy-report">
                <span className="hy-kicker hy-kicker--blush">Client compliance report · September 2026</span>
                <div className="hy-report-band">
                  <div><div className="l">Invoices</div><div className="n">214</div></div>
                  <div><div className="l">Compliant</div><div className="n">93.8%</div><div className="d">up 4.2 pts</div></div>
                  <div><div className="l">Claimed</div><div className="n">184k</div></div>
                  <div><div className="l">Deferred</div><div className="n">6.4k</div></div>
                  <div><div className="l">Outstanding</div><div className="n">2</div></div>
                </div>
                <div className="hy-funnel">
                  <div><strong>9</strong>correction requests sent</div>
                  <div><strong>7</strong>corrected invoices received</div>
                  <div><strong>2</strong>still awaited</div>
                </div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--hy-on-navy)" }}>The commentary is written by a reporting agent that may narrate the numbers but never invent one. Each client gets a private link to its own report only, and nothing is sent until a reviewer agent has checked it and a person has signed it off in two steps.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Humans in the loop ── */}
        <section className="hy-whysec" id="control">
          <div className="hy-wrap">
            <span className="hy-kicker hy-kicker--blush">Where the people stay</span>
            <h2 className="hy-h2 hy-h2--why" style={{ marginTop: 18, maxWidth: "22ch" }}>The AI reads. Your team decides.</h2>
            <div className="hy-guard">
              <div><span className="k">Never auto-corrected</span><h3>Disagreements go to a person</h3><p>When two models read a field differently, both values are shown and a reviewer chooses. Every correction is journaled with who made it and why.</p></div>
              <div><span className="k">Never removed</span><h3>A questioned finding keeps its band</h3><p>The verifier agent can confirm or question a finding, but it cannot delete one. Its note goes to the reviewer with the evidence.</p></div>
              <div><span className="k">Never on a timer</span><h3>Suppliers are chased when you say so</h3><p>Correction requests are drafted with the exact defects and articles, editable, and sent only when someone presses send.</p></div>
              <div><span className="k">Never unchecked</span><h3>Client email has two gates</h3><p>A reviewer agent inspects every prepared client email first, then a two-step human sign-off releases it.</p></div>
            </div>
          </div>
        </section>

        {/* ── Why ── */}
        <section className="hy-family hy-section hy-rule-b">
          <div className="hy-wrap hy-why-grid">
            <div className="hy-why-copy">
              <span className="hy-kicker">Why we built it</span>
              <h2 className="hy-h2">We built it for our own tax team first.</h2>
              <p style={{ color: "var(--hy-body)" }}>A Gulf tax practice runs on supplier invoices: hundreds a month, each one a small bet that the paper holds up. Checking them properly meant late nights with a calculator. Not checking them meant carrying the risk quietly into the next audit.</p>
              <p style={{ color: "var(--hy-body)" }}>So we built the checker our own team runs every day. It reads every invoice, redoes every sum, tests every rule the law enforces and puts its working on the table, so the judgement and the client relationship stay with the people.</p>
            </div>
            <div className="hy-beliefs">
              <div className="hy-belief"><span className="hy-belief-l">Works with</span><span className="hy-belief-p">Invoices from any supplier, by email, upload or history import. No change to how your suppliers bill you.</span></div>
              <div className="hy-belief"><span className="hy-belief-p">Runs on its own, or alongside Hysaab for the full books.</span></div>
              <div className="hy-belief hy-belief--promise"><span className="hy-belief-l">Our promise</span><span className="hy-belief-p">We will never call a claim safe that the paper cannot defend, and we will always tell you why.</span></div>
            </div>
          </div>
        </section>

        <CtaBand kicker="hysaab invoice" title="Put your supplier invoices to the test." body="hysaab invoice runs today inside working tax teams in the UAE and KSA. Tell us your invoice volume and jurisdiction and a real person will set you up within one working day." />
      </main>
      <MgFooter />
    </div>
  );
}

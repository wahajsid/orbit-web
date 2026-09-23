/* ── /compliance ─────────────────────────────────────────────────────
   Rebuilt 2026-09 in the homepage design (PageShell + the hw-* kit in
   app/hysaab-home.css). The claims here mirror the FAQ, the homepage
   and /how-it-works: if a claim is not made there, it is not made here.
   Legal references (article, decision number, dates, thresholds) are
   carried over unchanged from the previous page. Absolute wording was
   softened to what the workspace does: it tests, holds, flags and
   records. Hysaab does not file returns or give tax advice. */

import type { Metadata } from "next";
import { PageShell, PageHero, Shot } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "UAE VAT, Corporate Tax & ZATCA Compliance Software | Hysaab",
  description:
    "How Hysaab tests UAE VAT and corporate tax rules and ZATCA e-invoicing on every document, keeps periods locked, and leaves the return to you.",
  alternates: langAlternates("/compliance"),
};

type Cell = { k: string; h: string; p: React.ReactNode; link?: { href: string; label: string } };

/* Tax rules, tested as documents arrive. */
const TAX: Cell[] = [
  {
    k: "UAE VAT · Article 59",
    h: "Every inbound invoice, tax-tested.",
    p: "Before input VAT is claimed, each invoice is tested against the FTA’s tax-invoice criteria: TRN present, rates, arithmetic, rounding. An invoice that fails is held with the reason stated, not silently claimed.",
    link: { href: "/guides/uae-tax-invoice-checklist", label: "The tax-invoice checklist" },
  },
  {
    k: "Input VAT · Cabinet Decision 149 of 2026",
    h: "The October 2026 recovery rules, tested on arrival.",
    p: (
      <>
        From 1 October 2026 Hysaab records the settlement method on every purchase and holds input VAT on cash-settled supplies above the Ministerial threshold. It tags employee-benefit and accommodation costs until the legal-obligation or FTA-condition basis is recorded, flags separately priced bundles that carry different rates, and tests assets at AED 5 million and above for the Capital Asset Scheme. Partially exempt books get the 2028 turnover-based apportionment modelled alongside today’s method. In detail:{" "}
        <a href="/guides/uae-vat-cash-payments-petty-cash-2026">cash payments</a>,{" "}
        <a href="/guides/uae-vat-staff-accommodation-recovery-2026">staff accommodation</a>,{" "}
        <a href="/guides/uae-vat-composite-bundled-supplies-2026">bundled supplies</a>.
      </>
    ),
    link: { href: "/guides/uae-vat-cabinet-decision-149-2026-input-tax", label: "Guide to Cabinet Decision 149 of 2026" },
  },
  {
    k: "Corporate tax",
    h: "Accrued monthly, reconciled against VAT.",
    p: "UAE Corporate Tax (9%) accrues monthly instead of surfacing at year-end. VAT and corporate tax turnover are reconciled to each other each month, and the difference is explained.",
    link: { href: "/tools/uae-corporate-tax-calculator", label: "Corporate tax calculator" },
  },
  {
    k: "KSA · ZATCA",
    h: "15% VAT and e-invoice clearance, tracked.",
    p: "For Saudi entities, the 15% VAT rules apply and ZATCA e-invoice clearance status is tracked invoice by invoice, so each claim can be traced to the cleared document behind it.",
    link: { href: "/guides/zatca-e-invoicing-phase-2", label: "ZATCA e-invoicing, Phase 2" },
  },
  {
    k: "E-invoicing",
    h: "Structured invoices, read today.",
    p: "Hysaab reads and validates structured invoices today, ahead of the UAE e-invoicing mandate.",
  },
  {
    k: "Filing calendar",
    h: "Deadlines tracked for each regime.",
    p: "Filing deadlines are tracked for each regime on the tax screen. You review the return and file it; Hysaab does not submit returns for you.",
    link: { href: "/guides/uae-tax-deadlines", label: "UAE tax deadlines" },
  },
];

/* Controls that hold whichever regime you report under. */
const CONTROLS: Cell[] = [
  {
    k: "Period locks",
    h: "A locked period stays locked.",
    p: "When you close a period it locks, and the lock applies to everyone, Hysaab included. Nothing is deleted: voids are mirrored reversals, so the trail stays whole.",
  },
  {
    k: "Audit trail",
    h: "Every action logged, with evidence.",
    p: "Every action, by a person or by Hysaab, is logged with its source evidence and the commentary behind it. When your auditor or the FTA asks, the trail is already attached to the entry.",
  },
  {
    k: "Human approval",
    h: "Nothing posts silently past your thresholds.",
    p: "Hysaab proposes and a person approves. Anything above your journal-value threshold, any low-confidence coding and any suspected duplicate waits in the decision queue for a person.",
  },
  {
    k: "Data security",
    h: "Isolated tenant, encrypted credentials.",
    p: "Your books live in an isolated tenant with row-level security. Ledger credentials are stored server-side, encrypted, and are not sent to a browser. Sign-in supports mandatory two-factor authentication, and your ledger connection can be revoked at any time, from Hysaab or from the ledger’s side.",
  },
];

export default function CompliancePage() {
  return (
    <PageShell band={{ title: "Bring the rule that worries you.", body: "Tell us which regime you report under and where the tax work takes longest. We will walk it through the workspace with you, then confirm the scope and fees before any commitment." }}>
      <PageHero
        eyebrow="Compliance"
        title={<>UAE VAT, corporate tax and ZATCA.<br /><span>Tested before it posts.</span></>}
        lede="Every document tested against the UAE and Saudi tax rules before it posts. Every journal carries its evidence."
      >
        <a className="hw-btn hw-btn--peach" href="/contact">Let’s talk <span aria-hidden="true">↗</span></a>
        <a className="hw-link hw-link--light" href="/faq">Straight answers in the FAQ</a>
      </PageHero>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">The rules, document by document</p>
              <h2>Tested on arrival.<br /><span>Held when it fails.</span></h2>
            </div>
            <p>Each check runs as a document comes in. A failure is held with its reason and brought to a person; it is not claimed quietly and corrected later.</p>
          </div>
          <div className="hw-cards">
            {TAX.map((c) => (
              <article key={c.k}>
                <p className="hw-eyebrow">{c.k}</p>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
                {c.link && <a className="hw-link" href={c.link.href}>{c.link.label} <span aria-hidden="true">→</span></a>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hw-block--sage">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">On the tax screen</p>
              <h2>Two regimes.<br /><span>One reconciled position.</span></h2>
            </div>
            <p>The screen below is a capture of the Hysaab workspace running its sample dataset. Select it to see it in full.</p>
          </div>
          <div className="hw-feature">
            <div className="hw-feature-copy">
              <p className="hw-eyebrow">Tax</p>
              <h3>Checked before you file.</h3>
              <p>Invoices are tested against the UAE tax-invoice criteria as they arrive, and input VAT is held until a document qualifies. VAT and corporate tax turnover are reconciled to each other each month, with the difference explained, and filing deadlines are tracked.</p>
              <ul className="hw-ticks">
                <li>VAT to corporate tax reconciliation, with the difference explained</li>
                <li>Filing deadlines tracked for each regime</li>
                <li>You review and file; Hysaab does not submit returns for you</li>
              </ul>
            </div>
            <Shot
              file="p-tax.png"
              title="Tax"
              alt="Hysaab tax screen: tiles for the VAT return, corporate tax, the VAT to corporate tax reconciliation and e-invoices, the reconciliation with its explained difference, and a table of filing deadlines."
              caption="Tax, sample data: the VAT to corporate tax reconciliation and the filing calendar."
              priority
            />
          </div>
        </div>
      </section>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Controls behind every rule</p>
              <h2>Locked and logged.<br /><span>Approved by a person.</span></h2>
            </div>
            <p>The tax tests sit on four controls that hold whichever regime you report under.</p>
          </div>
          <div className="hw-rows">
            {CONTROLS.map((c, i) => (
              <article key={c.k}>
                <span className="hw-mono">0{i + 1}</span>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">What Hysaab does not do</p>
              <h2>The return is yours.<br /><span>So is the judgement.</span></h2>
            </div>
            <p>Hysaab prepares and checks the books that a return is drawn from. The filing, the tax position and the signature stay with a person.</p>
          </div>
          <div className="hw-rows">
            <article><span className="hw-mono">01</span><h3>It does not file returns.</h3><p>Hysaab prepares the figures, reconciles them and tracks the deadlines. A person reviews the return and files it with the authority.</p></article>
            <article><span className="hw-mono">02</span><h3>It does not give tax advice.</h3><p>Hysaab tests documents against the rules described on this page and shows the result with its reason. It does not issue or sign tax opinions. A position that needs judgement goes to you or your adviser.</p></article>
            <article><span className="hw-mono">03</span><h3>It does not decide for you.</h3><p>A failed test is held and flagged, not resolved on your behalf. An override needs a written reason, and the reason is recorded with the entry.</p></article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

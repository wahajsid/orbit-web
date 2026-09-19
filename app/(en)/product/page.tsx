/* ── /product ────────────────────────────────────────────────────────
   Rebuilt 2026-09 in the homepage design (PageShell + the hw-* kit in
   app/hysaab-home.css). Six modules, each paired with a genuine capture
   of the workspace running its sample dataset. Voice follows the
   homepage: prepared work, human decisions, evidence you can inspect.
   The old per-module statistics were removed: they could not be traced
   to a measurement. */

import { PageShell, PageHero, Shot } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "Hysaab Product: Payables, Ledger, Close, Documents & Tax",
  description:
    "Six AI agents, one workspace: payables, receivables, ledger, close, documents and tax. Each agent handles its domain and leaves the decisions with you.",
  alternates: langAlternates("/product"),
};

const MODULES = [
  {
    n: "01", name: "Payables",
    h: "Bills arrive coded, checked and ready for you.",
    p: "Send a document by WhatsApp, email or upload. It is read, coded from your own history and tested against the tax-invoice rules before any VAT is claimed. Duplicates are held, not booked twice, and anything uncertain comes to you with the reason.",
    ticks: ["Coding proposed with its confidence and the history behind it", "Input VAT held until the invoice qualifies", "Payment runs are prepared for you, never executed for you"],
    file: "p-payables.png", title: "Payables",
    alt: "Hysaab payables screen: report downloads, a payment-run panel, the open payables table with coding, tax-invoice result and VAT recovery for each bill, and totals owed by supplier.",
    caption: "Payables, sample data: every open bill with its coding, tax-invoice result and recovery position.",
  },
  {
    n: "02", name: "Receivables",
    h: "Polite, persistent, and on a cadence you approve.",
    p: "Reminders are drafted inside a collections cadence you set once, and nothing sends until you approve it. Ageing, promises to pay and provision exposure sit on one screen, measured against your own policy.",
    ticks: ["Ageing and the next step for every open invoice", "Provisioning follows the ladder you set", "Customer statements are reconciled against your books"],
    file: "p-receivables.png", title: "Receivables",
    alt: "Hysaab receivables screen: tiles for open, due, past-due and at-risk receivables, an ageing chart, write-off risk and provisioning, and a table of invoices with ageing, status and next step.",
    caption: "Receivables, sample data: ageing, provisioning and the next collection step for each invoice.",
  },
  {
    n: "03", name: "Ledger",
    h: "Every journal explains itself.",
    p: "Each entry keeps who posted it, who confirmed it, the commentary and the documents behind it. Open any number and see why it is there. Mistakes are reversed in the open; nothing is deleted.",
    ticks: ["Commentary and evidence attached to the entry", "Reversals are mirrored entries with their own reason", "Posts to the accounting system you already use"],
    file: "04-app-journal-why.png", title: "Ledger",
    alt: "Hysaab journal activity: posted journals with who posted or confirmed each, and one entry expanded to show its commentary, tie-out and attached documents.",
    caption: "Journal activity, sample data: one entry opened to its commentary, tie-out and documents.",
  },
  {
    n: "04", name: "The close",
    h: "Month-end, run down to a short list.",
    p: "The close cockpit shows what Hysaab has done, what is still open and what needs a person. Accruals are proposed with their basis for you to approve. When the gates are clear you lock the period, and the lock applies to everyone, Hysaab included.",
    ticks: ["Accruals proposed with their basis, approved by you", "A checklist for Hysaab’s side and for your ledger’s side", "The period lock is yours to press"],
    file: "p-close.png", title: "Close cockpit",
    alt: "Hysaab close cockpit: proposed recurring accruals with basis and amount, a checklist of what Hysaab runs, a checklist for the ledger’s side, and the button to close and lock the period.",
    caption: "The close cockpit, sample data: proposed accruals, both checklists and the gated lock.",
  },
  {
    n: "05", name: "Documents",
    h: "A record of everything that arrived.",
    p: "Every document is filed with the channel it came by and what became of it: coded, matched, reconciled, or held with the reason. The evidence stays one click from the number it supports.",
    ticks: ["Invoices, receipts, statements, purchase orders and approvals", "Duplicates recognised across channels", "Quotations and supporting papers attach to their transaction"],
    file: "01-app-intake.png", title: "Documents",
    alt: "Hysaab intake ledger: documents received by WhatsApp, email and bank feed, each with a category and an outcome. One email address is redacted.",
    caption: "The intake ledger, sample data: each document with its category, channel and outcome.",
  },
  {
    n: "06", name: "Tax",
    h: "Checked before you file.",
    p: "Invoices are tested against the UAE tax-invoice criteria as they arrive, and input VAT is held until a document qualifies. VAT and corporate tax turnover are reconciled to each other each month, with the difference explained, and filing deadlines are tracked.",
    ticks: ["VAT to corporate tax reconciliation, with the difference explained", "Filing deadlines tracked for each regime", "You review and file; Hysaab does not submit returns for you"],
    file: "p-tax.png", title: "Tax",
    alt: "Hysaab tax screen: tiles for the VAT return, corporate tax, the VAT to corporate tax reconciliation and e-invoices, the reconciliation with its explained difference, and a table of filing deadlines.",
    caption: "Tax, sample data: the VAT to corporate tax reconciliation and the filing calendar.",
  },
];

export default function Page() {
  return (
    <PageShell band={{ title: "See it on your own books.", body: "Bring one process that takes too long. We will walk it through the workspace with you, then confirm the scope and fees before any commitment." }}>
      <PageHero
        eyebrow="The product"
        title={<>One workspace.<br /><span>Every figure accounted for.</span></>}
        lede="Six agents — payables, receivables, ledger, close, documents and tax — each handling its domain, showing its evidence and leaving the decisions with you."
      >
        <a className="hw-btn hw-btn--peach" href="/contact">Let’s talk <span aria-hidden="true">↗</span></a>
        <a className="hw-link hw-link--light" href="/how-it-works"><span className="hw-play" aria-hidden="true">▷</span> See how it works</a>
      </PageHero>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Six parts, one set of books</p>
              <h2>Prepared for you.<br /><span>Decided by you.</span></h2>
            </div>
            <p>Each screen below is a capture of the Hysaab workspace running its sample dataset. Select any of them to see it in full.</p>
          </div>

          {MODULES.map((m, i) => (
            <div className={`hw-feature${i % 2 ? " hw-feature--flip" : ""}`} key={m.n}>
              <div className="hw-feature-copy">
                <p className="hw-eyebrow">{m.n} / {m.name}</p>
                <h3>{m.h}</h3>
                <p>{m.p}</p>
                <ul className="hw-ticks">{m.ticks.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
              <Shot file={m.file} title={m.title} alt={m.alt} caption={m.caption} priority={i === 0} />
            </div>
          ))}
        </div>
      </section>

      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Across every part</p>
              <h2>Your judgement.<br /><span>Your boundaries.</span></h2>
            </div>
            <p>The same three rules hold on every screen, whichever part of the books you are in.</p>
          </div>
          <div className="hw-rows">
            <article><span className="hw-mono">01</span><h3>Every answer, traceable.</h3><p>Inspect the entries and documents behind any figure. An explanation you can verify is worth more than one you are asked to trust.</p></article>
            <article><span className="hw-mono">02</span><h3>Know where to stop.</h3><p>Approval gates, period locks and control accounts stay in place. A questionable instruction is challenged with the reason, and some are refused outright.</p></article>
            <article><span className="hw-mono">03</span><h3>Leave a clear record.</h3><p>The recommendation, the decision taken and the reasoning behind it are stored with the books, not in a separate thread.</p></article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

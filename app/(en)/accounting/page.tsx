/* ── /accounting: Hysaab Finance ─────────────────────────────────────
   Website change plan 2026-09-23: /product is merged into this page
   (and /product redirects here, 301, in next.config.mjs). The page
   follows a six-question template, one section per question a finance
   team asks: what does it do, who is it for (multi-entity close and
   group reporting), how are invoices checked, how does it work, what
   stays with you, what does it cost.
   The six modules and their genuine workspace captures come from the
   old /product page; the interactive Terminal and the Arabic capture
   from the old /accounting page.
   2026-09-24 (owner): approval, not read-only, is the promise. Section 04
   adds what the agents send (AgentsAct), and the trust ladder
   (TrustLadder: reads, drafts, posts) sits before section 05. */

import Image from "next/image";
import { PageShell, PageHero, Shot } from "@/components/home/PageShell";
import { Terminal } from "@/components/Terminal";
import { TrustLadder } from "@/components/home/TrustLadder";
import { AgentsAct } from "@/components/home/AgentsAct";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";

export const revalidate = 60;

export const metadata = {
  title: "Hysaab Finance: AI Agents for Accounting in the UAE and KSA",
  description:
    "AI agents for accounting and reporting: payables, receivables, the ledger, the close, documents and tax, prepared by agents and approved by your finance team.",
  alternates: langAlternates("/accounting"),
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

export default function AccountingPage() {
  return (
    <PageShell band={{ title: "See it on your own books.", body: "Bring one process that takes too long. We will walk it through the workspace with you, then confirm the scope and fees before any commitment." }}>
      <PageHero
        eyebrow="Hysaab Finance · for finance teams"
        title={<>Hysaab Finance.<br /><span>AI agents for accounting and reporting.</span></>}
        lede="Agents prepare the payables, the reconciliations, the close and the reporting pack inside the ledger you already use. Your team reviews and approves."
      >
        <a className="hw-btn hw-btn--peach" {...DEMO}>Book a demo <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB.en}</span></a>
        <a className="hw-link hw-link--light" href="/check">Check your books free <span aria-hidden="true">→</span></a>
      </PageHero>

      {/* ── 1. What does it do? ── */}
      <section id="modules">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">01 · What does it do?</p>
              <h2>Six parts, one set of books.<br /><span>Prepared for you. Decided by you.</span></h2>
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

      {/* ── 2. Who is it for? Multi-entity close and group reporting ── */}
      <section id="groups" className="hw-block--family">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">02 · Who is it for?</p>
              <h2>Finance teams with more than one set of books.</h2>
            </div>
            <p>From a single company to a group of entities across the UAE and Saudi Arabia, run by your own team or with Oblique’s accountants alongside.</p>
          </div>
          <div className="hw-cards hw-cards--2">
            <article>
              <p className="hw-eyebrow">Multi-entity close</p>
              <h3>Every entity closes on its own checklist.</h3>
              <p>Switch between entities in one workspace. Each keeps its own books, its own close checklist and its own period lock, and the same approval rules hold in every one of them.</p>
            </article>
            <article>
              <p className="hw-eyebrow">Group reporting</p>
              <h3>One pack for the group, traced to each entity.</h3>
              <p>Consolidate the entities and rebuild the management pack from locked ledgers. Each movement is explained in a sentence and traced back to its entry and its document.</p>
            </article>
          </div>
          <div className="hw-feature">
            <div className="hw-feature-copy">
              <p className="hw-eyebrow">One workspace, any shape</p>
              <h3>One business or five. One currency or five. One language or two.</h3>
              <p>Switch entities, consolidate, and turn the whole workspace to Arabic, right to left, down to the numerals.</p>
            </div>
            <div className="hw-shot">
              <Image src="/shots/adv-arabic.png" width={1600} height={1360} sizes="(max-width: 760px) 100vw, 55vw" alt="The Hysaab workspace in Arabic, right to left, sample data." style={{ width: "100%", height: "auto", border: "1px solid var(--hw-hairline)" }} />
              <p className="hw-shot-cap">The same workspace in Arabic, right to left. Sample data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. How are supplier invoices checked? ── */}
      <section id="invoice-checks">
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div>
              <p className="hw-eyebrow">03 · How are supplier invoices checked?</p>
              <h2>Invoice checks, before you claim the VAT.</h2>
            </div>
            <div className="hw-prose">
              <p>Every supplier invoice is read, its sums are redone in code and it is tested against the UAE and Saudi tax-invoice rules. A missing TRN, a wrong rate, a duplicate or a supplier whose TRN has changed is held with the reason and the article it fails.</p>
              <p>Invoice checks are part of Hysaab Finance. <a href="/invoice">Follow one invoice from the inbox to a claim you can defend</a>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. How does it work? ── */}
      <section id="live" className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">04 · How does it work?</p>
              <h2>Documents in. Work prepared.<br /><span>Decisions with you.</span></h2>
            </div>
            <p>Seventy seconds of the agents at work, below. The <a href="/how-it-works">full walkthrough</a> goes from a document arriving to a locked period.</p>
          </div>
          <Terminal />
          <AgentsAct />
        </div>
      </section>

      <TrustLadder />

      {/* ── 5. What stays with you? ── */}
      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">05 · What stays with you?</p>
              <h2>Your judgement.<br /><span>Your boundaries.</span></h2>
            </div>
            <p>The same three rules hold on every screen. Our <a href="/trust">commitments on data and control</a> set out the rest.</p>
          </div>
          <div className="hw-rows">
            <article><span className="hw-mono">01</span><h3>Every answer, traceable.</h3><p>Inspect the entries and documents behind any figure. An explanation you can verify is worth more than one you are asked to trust.</p></article>
            <article><span className="hw-mono">02</span><h3>Know where to stop.</h3><p>Approval gates, period locks and control accounts stay in place. A questionable instruction is challenged with the reason, and some are refused outright.</p></article>
            <article><span className="hw-mono">03</span><h3>Leave a clear record.</h3><p>The recommendation, the decision taken and the reasoning behind it are stored with the books, not in a separate thread.</p></article>
          </div>
        </div>
      </section>

      {/* ── 6. What does it cost? ── */}
      <section id="cost">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">06 · What does it cost?</p>
              <h2>Sized by the work,<br /><span>not the seats.</span></h2>
            </div>
            <p>No charge per user. We confirm the scope and the fee in writing before you start.</p>
          </div>
          <div className="hw-cards hw-cards--2">
            <article>
              <p className="hw-eyebrow">Self-serve · your team runs it</p>
              <h3>From USD 199 a month</h3>
              <p>The agents prepare the work; your team reviews, approves and closes. One connected accounting system, unlimited people.</p>
              <a className="hw-link" href="/pricing">See pricing <span aria-hidden="true">→</span></a>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">Managed · we run it with you</p>
              <h3>Scoped to your books</h3>
              <p>Oblique’s accountants run the queue and prepare the close with you, using Hysaab every day. For mid-sized and larger companies.</p>
              <a className="hw-link hw-link--peach" {...DEMO}>Book a demo <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB.en}</span></a>
            </article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

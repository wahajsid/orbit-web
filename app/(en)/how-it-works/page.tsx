/* ── /how-it-works ───────────────────────────────────────────────────
   Rebuilt 2026-09 in the homepage design (PageShell + the hw-* kit in
   app/hysaab-home.css). The old fifteen-part guide is kept in substance:
   how a document travels from arrival to a posted, evidenced entry, what
   a person approves, how the month closes, and what setup comes first.
   Illustrative figures, speed claims and the founding-cohort copy were
   removed; the shell's closing band is the only call to action. */

import type { ReactNode } from "react";
import { PageShell, PageHero, Shot } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "How Hysaab Works: From a Document to a Posted, Evidenced Entry",
  description:
    "A plain-language walkthrough of how Hysaab works: a document arrives, is read, coded from your history and tax-tested, the uncertain items come to you, the entry posts with its evidence, and you lock the period.",
  alternates: langAlternates("/how-it-works"),
};

const ARTICLE_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Hysaab works: from a document to a locked period",
  description:
    "A plain-language walkthrough of how Hysaab works: a document arrives, is read, coded from your history and tax-tested, the uncertain items come to you, the entry posts with its evidence, and you lock the period.",
  dateModified: "2026-09-17",
  author: { "@type": "Organization", name: "Hysaab", url: "https://hysaab.ai" },
  publisher: { "@type": "Organization", name: "Hysaab", url: "https://hysaab.ai" },
  mainEntityOfPage: "https://hysaab.ai/how-it-works",
};

const WALK: { n: string; h: string; p: ReactNode[] }[] = [
  {
    n: "01", h: "You send a document.",
    p: ["A supplier invoice, a receipt, a credit note, a bank statement, a contract or a goods-received note. Send it by WhatsApp, forward it by email or upload it. Your suppliers do not follow your filing system, and they do not need to."],
  },
  {
    n: "02", h: "It is read and filed.",
    p: [
      "The document is classified and its header fields are read: supplier, number, date, amounts, tax registration number. It is stored once and linked to whatever it goes on to touch: the bill, the journal, the bank match.",
      "If the same invoice arrives twice, by a second channel or a second sender, the copy is recognised and held. It does not reach the ledger, and it does not reach a payment run.",
    ],
  },
  {
    n: "03", h: "It is coded from your history.",
    p: ["Hysaab looks at how you have posted this supplier before and proposes the same account, with its confidence and the history behind the proposal shown beside it. A bill that crosses the capitalisation floor you set is proposed as an asset, not an expense."],
  },
  {
    n: "04", h: "It is tested before any VAT is claimed.",
    p: ["Each invoice is tested against the UAE tax-invoice criteria: the supplier’s TRN, the words “Tax Invoice”, the date, the description, the amounts. If a criterion fails, the input VAT is held. You see which rule failed, the amount held and the usual remedy, which is a corrected copy from the supplier."],
  },
  {
    n: "05", h: "What is uncertain comes to you.",
    p: ["A coding below the confidence gate, an invoice that fails the tax test, a variance with no clear explanation, a write-off. Each arrives as a decision with the reason, the evidence and enough detail to act on. The aim is a short list."],
  },
  {
    n: "06", h: "The entry is posted with its evidence.",
    p: [
      "Work that clears your approval rules is posted to the accounting system you already use. Every journal keeps who posted it, who confirmed it, the commentary explaining why it exists and the documents behind it.",
      "A reclassification records who gave the instruction and who confirmed it. A mistake is reversed with a mirrored entry and its own reason. Nothing is deleted.",
    ],
  },
  {
    n: "07", h: "The bank is matched to the books.",
    p: ["Statements arrive by feed or upload. The arithmetic and the opening balance are checked first, then each line is matched: supplier payments to bills, customer receipts to invoices. What cannot be matched is listed with its detail and carried onto the close checklist. You get the count, not a green tick that hides the gaps."],
  },
  {
    n: "08", h: "The month is prepared for close.",
    p: [
      "The close cockpit shows what Hysaab has done, what is still open and what needs a person. When an expected supplier bill has not arrived, an accrual is proposed with its basis for you to approve. Depreciation, prepayment releases and the end-of-service provision are prepared as typed journals.",
      "Movements against last month are reviewed by account. Those within your threshold are marked in line; the rest are explained where the books support an explanation, or brought to you as a question.",
    ],
  },
  {
    n: "09", h: "You lock the period.",
    p: ["When the gates are clear, you close and lock. The button is yours to press. The lock then applies to everyone, Hysaab included, so a reported quarter stays as you reported it."],
  },
];

const SCREENS = [
  {
    eyebrow: "Steps 03 and 04 / On screen",
    h: "Prepared before you open it.",
    p: "Open payables arrive with the proposed account and its confidence, the tax-invoice result and the VAT recovery position. A duplicate is held, not booked twice.",
    ticks: ["Coding shown with its confidence and the history behind it", "Input VAT marked recoverable, held or conditional", "Payment runs are prepared for you, never executed for you"],
    file: "02-app-coded-checked.png", title: "Open payables",
    alt: "Hysaab open payables table: supplier invoices, each with a proposed coding and confidence percentage, a tax-invoice result of criteria met, not met or conditional, and VAT marked recoverable, blocked or conditional. One bill is flagged blocked as a duplicate.",
    caption: "Open payables, sample data: coding with its confidence, the tax-invoice result, the VAT position and a duplicate bill held.",
  },
  {
    eyebrow: "Step 05 / On screen",
    h: "The calls that are yours, with the reasoning.",
    p: "When a coding falls below the confidence gate, a tax invoice fails the rules or a supplier’s price rises with no contract change on file, Hysaab stops and brings it to you. It tells you what your policy says and asks you to make the call.",
    ticks: ["Each decision names the concern and the evidence", "A recommended route, not a silent correction", "Your answer is recorded with the entry it affects"],
    file: "03-app-second-opinion.png", title: "Decisions required",
    alt: "Hysaab decisions queue with four items: missing periods for a recurring supplier, a coding below the confidence threshold where history suggests a different account, a tax invoice that omits the supplier TRN so input VAT is blocked, and a detected price increase. Each shows a confidence score and buttons to open the queue or the detail.",
    caption: "Decisions required, sample data: a coding questioned, input VAT held until an invoice is corrected, and a price rise with no contract change on file.",
  },
  {
    eyebrow: "Steps 08 and 09 / On screen",
    h: "Month-end, run down to a short list.",
    p: "Proposed accruals sit beside their basis. One checklist covers Hysaab’s side of the close and another covers your ledger’s side. The lock is gated, and it waits for you.",
    ticks: ["Accruals proposed with their basis, approved by you", "A checklist for each side of the close", "The period lock is pressed by a person"],
    file: "p-close.png", title: "Close cockpit",
    alt: "Hysaab close cockpit: proposed recurring accruals with basis and amount, a checklist of what Hysaab runs, a checklist for the ledger’s side, and the button to close and lock the period.",
    caption: "The close cockpit, sample data: proposed accruals, both checklists and the gated lock.",
  },
];

const TOOLS: { href: string; name: string; note: string }[] = [
  { href: "/tools/ifrs16-lease-calculator", name: "IFRS 16 lease liability and ROU asset", note: "day-one measurement and the full amortisation schedule" },
  { href: "/tools/ias19-actuarial-eosb-calculator", name: "IAS 19 actuarial EOSB", note: "a projected unit credit estimate with discount rate, escalation and attrition" },
  { href: "/tools/ias36-impairment-calculator", name: "IAS 36 impairment (DCF)", note: "five-year value in use with WACC and terminal value" },
  { href: "/tools/ias12-deferred-tax-calculator", name: "IAS 12 deferred tax schedule", note: "temporary differences, DTL and DTA, at any rate" },
  { href: "/tools/ifrs9-eir-calculator", name: "IFRS 9 effective interest rate", note: "an EIR solver with the amortised-cost schedule" },
  { href: "/tools/ecl-provision-calculator", name: "IFRS 9 ECL provision matrix", note: "expected credit loss with a forward-looking adjustment" },
  { href: "/tools/eosb-gratuity-calculator", name: "UAE gratuity (EOSB)", note: "the 21 and 30-day rule, with the working" },
  { href: "/tools/uae-vat-calculator", name: "VAT calculator", note: "UAE 5% and KSA 15%, add or extract" },
  { href: "/tools/uae-corporate-tax-calculator", name: "UAE Corporate Tax estimator", note: "0% and 9%, with Small Business Relief" },
];

export default function HowItWorksPage() {
  return (
    <PageShell band={{ title: "Walk one document through with us.", body: "Bring a process that takes too long. We will follow it through the workspace with you, then confirm the scope and fees before any commitment." }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_LD) }}
      />

      <PageHero
        eyebrow="How it works"
        title={<>How Hysaab works.<br /><span>From a document to a locked period.</span></>}
        lede="Hysaab sits between your business and your ledger. Documents come in, the work is prepared with its evidence, and the decisions that need a person come to you. This page follows that path in the order you would use it."
      >
        <a className="hw-btn hw-btn--peach" href="/contact">Let’s talk <span aria-hidden="true">↗</span></a>
        <a className="hw-link hw-link--light" href="/product"><span className="hw-play" aria-hidden="true">▷</span> See the product screens</a>
      </PageHero>

      {/* ── The walk: arrival to locked period ── */}
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">One document, start to finish</p>
              <h2>You send it in.<br /><span>The books show why.</span></h2>
            </div>
            <p>Nine steps, from a photo of an invoice to a period nobody can post into. Setup comes before all of this; it is described further down.</p>
          </div>
          <div className="hw-rows">
            {WALK.map((s) => (
              <article key={s.n}>
                <span className="hw-mono">{s.n}</span>
                <h3>{s.h}</h3>
                <div>{s.p.map((t, i) => <p key={i}>{t}</p>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── The same walk, on screen ── */}
      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">In the workspace</p>
              <h2>The same walk,<br /><span>on screen.</span></h2>
            </div>
            <p>Each screen below is a capture of the Hysaab workspace running its sample dataset. Select any of them to see it in full.</p>
          </div>
          {SCREENS.map((m, i) => (
            <div className={`hw-feature${i % 2 ? " hw-feature--flip" : ""}`} key={m.file}>
              <div className="hw-feature-copy">
                <p className="hw-eyebrow">{m.eyebrow}</p>
                <h3>{m.h}</h3>
                <p>{m.p}</p>
                <ul className="hw-ticks">{m.ticks.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
              <Shot file={m.file} title={m.title} alt={m.alt} caption={m.caption} />
            </div>
          ))}
        </div>
      </section>

      {/* ── The rest of the books ── */}
      <section className="hw-block--sage">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Around the document</p>
              <h2>The rest of the books<br /><span>run the same way.</span></h2>
            </div>
            <p>Prepared from your own policies, shown with the evidence, and decided by you.</p>
          </div>
          <div className="hw-cards">
            <article>
              <p className="hw-eyebrow">Receivables</p>
              <h3>Collections on a cadence you approve.</h3>
              <p>Reminders are drafted inside a cadence you set once, and they send only once you have approved it. Promises to pay are logged and receipts are matched to their invoices. Write-off exposure is measured against your own provision ladder; when it crosses a threshold, the choice to write down, escalate or wait comes to you.</p>
            </article>
            <article>
              <p className="hw-eyebrow">Tax</p>
              <h3>Checked before you file.</h3>
              <p>The VAT position builds through the month from invoices that have already been tested, so the return is a review, not a build. VAT and corporate tax turnover are reconciled to each other, with the difference explained. KSA entities take the 15% rate from their country setting. You review and file; Hysaab does not submit returns.</p>
            </article>
            <article>
              <p className="hw-eyebrow">Fixed assets</p>
              <h3>A register that ties to the ledger.</h3>
              <p>Each capitalised item keeps its cost, useful life, method and net book value, with where it is and who holds it. Depreciation is prepared monthly across your asset classes, and prepayments release on the schedule you set up once.</p>
            </article>
            <article>
              <p className="hw-eyebrow">End of service</p>
              <h3>The gratuity provision, month by month.</h3>
              <p>The end-of-service provision follows the UAE 21 and 30-day rule and picks up the change in rate when an employee passes five years of service. For a fuller IAS 19 valuation, use the <a href="/tools/ias19-actuarial-eosb-calculator">free actuarial EOSB calculator</a>.</p>
            </article>
            <article>
              <p className="hw-eyebrow">Findings</p>
              <h3>The things you did not know to look for.</h3>
              <p>Hysaab watches the pattern of your spend and raises what deserves a look: a supplier’s rate that has risen with no contract change on file, a credit note never offset, VAT held because one field is missing. Each finding comes with the documents that support it.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">Your accounting system</p>
              <h3>Your ledger stays.</h3>
              <p>Hysaab is not a replacement for your accounting software. It prepares the work and posts approved journals to Xero, Zoho Books, QuickBooks, Odoo, Wafeq or ERPNext, which remains the system of record.</p>
              <a className="hw-link hw-link--peach" href="/integrations">See the integrations <span aria-hidden="true">↗</span></a>
            </article>
          </div>
        </div>
      </section>

      {/* ── Where it stops ── */}
      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Where it stops</p>
              <h2>Prepared by Hysaab.<br /><span>Decided by a person.</span></h2>
            </div>
            <p>Hysaab does not pretend to make your judgement calls. These limits hold on every screen, whatever the instruction.</p>
          </div>
          <div className="hw-rows">
            <article><span className="hw-mono">01</span><h3>It does not guess.</h3><p>An item below the confidence gate is not posted on a hunch. It is brought to a person with the reason it was stopped.</p></article>
            <article><span className="hw-mono">02</span><h3>It questions an instruction that looks wrong.</h3><p>A questionable reclassification, manual journal or payment instruction is challenged with the concern, and some are refused outright. An override needs a written reason, and the reason is recorded with the entry.</p></article>
            <article><span className="hw-mono">03</span><h3>It does not move money.</h3><p>Payment runs are prepared for you, never executed for you. Collections reminders send only on a cadence you have approved.</p></article>
            <article><span className="hw-mono">04</span><h3>It does not erase.</h3><p>A reversal is a mirrored entry with its own reason. The original stays in the record, with its commentary and documents.</p></article>
            <article><span className="hw-mono">05</span><h3>It does not close your books or file your returns.</h3><p>Accruals are proposed and approved by a person. The period lock is pressed by a person. Returns are yours to review and file.</p></article>
          </div>
          <p style={{ marginTop: 36 }}>
            <a className="hw-link hw-link--peach" href="/compliance">Read how compliance is handled <span aria-hidden="true">↗</span></a>
          </p>
        </div>
      </section>

      {/* ── Getting started: setup first ── */}
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Getting started</p>
              <h2>Setup comes first.<br /><span>Then you just send things in.</span></h2>
            </div>
            <p>The everyday is a message and a short list of decisions. It works because the books are connected and the rules are agreed before the first document arrives.</p>
          </div>
          <div className="hw-rows">
            <article>
              <span className="hw-mono">01</span>
              <h3>A first conversation.</h3>
              <p>We look at your current workflow and the process that takes the most attention. Your accounting system, entities, scope and fees are confirmed upfront. A clear fit comes before any commitment.</p>
            </article>
            <article>
              <span className="hw-mono">02</span>
              <h3>Connect the books.</h3>
              <div>
                <p>We help connect Hysaab to the accounting system you already use: Xero, Zoho Books, QuickBooks, Odoo, Wafeq or ERPNext. Your chart of accounts is mapped across, and your posting history gives the coding its context.</p>
                <p>No accounting system yet? Tell us. Hysaab can keep the books until you are ready to choose one. The detail for each system is on the <a href="/integrations">integrations page</a>.</p>
              </div>
            </article>
            <article>
              <span className="hw-mono">03</span>
              <h3>Agree the approval rules.</h3>
              <p>Who approves what, and up to what amount. The confidence gate below which a coding comes to a person. The collections cadence, the provision ladder, the capitalisation floor and the variance threshold. These are your policies; Hysaab works inside them.</p>
            </article>
            <article>
              <span className="hw-mono">04</span>
              <h3>Then the everyday.</h3>
              <p>Send documents by WhatsApp, email or upload, and answer the decisions that come back. The <a href="/product">workspace</a> is there when you want to look closer.</p>
            </article>
          </div>
          <div className="hw-note">
            <span className="hw-mono">Who it is for</span>
            <p>UAE and KSA businesses with real books to keep: trading companies, professional services firms, logistics operators, property managers and distributors. Anyone running a month-end close, accounting for VAT, paying suppliers and chasing customers. A sole trader with a handful of invoices a month probably does not need it.</p>
          </div>
        </div>
      </section>

      {/* ── Free calculators ── */}
      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div className="hw-heading" style={{ display: "block", marginBottom: 0 }}>
              <p className="hw-eyebrow">Free calculators</p>
              <h2>The working,<br /><span>shown.</span></h2>
              <p style={{ marginTop: 22 }}>The calculators we kept reaching for, free and with no login. Each one runs in your browser and shows its formula, so you can check the logic and not only the answer.</p>
              <a className="hw-link hw-link--ruled" href="/tools" style={{ marginTop: 18 }}>All calculators <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hw-prose">
              <ul className="hw-ticks" style={{ marginTop: 0 }}>
                {TOOLS.map((t) => (
                  <li key={t.href}><span><a href={t.href}>{t.name}</a>: {t.note}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Onward ── */}
      <section className="hw-block--family">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Read on</p>
              <h2>Look closer<br /><span>at any part.</span></h2>
            </div>
            <p>The screens, the connections, the controls and the cost, each on its own page.</p>
          </div>
          <div className="hw-cards hw-cards--4">
            <article>
              <p className="hw-eyebrow">The product</p>
              <h3>Six parts of one workspace.</h3>
              <p>Payables, receivables, the ledger, the close, documents and tax, each with a capture of the screen.</p>
              <a className="hw-link" href="/product">See the product <span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">Integrations</p>
              <h3>The accounting system you already use.</h3>
              <p>How Hysaab connects to each ledger, and the channels documents arrive by.</p>
              <a className="hw-link" href="/integrations">See the integrations <span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">Compliance</p>
              <h3>Controls, tax rules and the record.</h3>
              <p>How the tax-invoice tests, approval gates and the evidence trail are handled.</p>
              <a className="hw-link" href="/compliance">Read about compliance <span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">Pricing</p>
              <h3>Three plans, not priced by seats.</h3>
              <p>Starter is AED 149/month, Growth is AED 499/month and Scale is AED 1,499/month. Every plan gives your whole team access.</p>
              <a className="hw-link" href="/pricing">Full pricing details <span aria-hidden="true">↗</span></a>
            </article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

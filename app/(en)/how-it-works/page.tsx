import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";

import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "How it works — Orbit",
  description:
    "A plain-English walkthrough of what Orbit does, screen by screen — written by the accountants who built it, for the accountants who'll use it.",
  alternates: langAlternates("/how-it-works"),
};

const ARTICLE_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Orbit works — a plain-language guide",
  description:
    "A plain-English walkthrough of what Orbit does, screen by screen — written by the accountants who built it.",
  dateModified: "2026-08-16",
  author: { "@type": "Organization", name: "Orbit", url: "https://www.orbitgulf.com" },
  publisher: { "@type": "Organization", name: "Orbit", url: "https://www.orbitgulf.com" },
  mainEntityOfPage: "https://www.orbitgulf.com/how-it-works",
};

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_LD) }}
      />
      <MgNav />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">HOW IT WORKS</div>
          <h1 className="mg-page-h">
            The whole system, explained by the people who close books for a living.
          </h1>
          <p className="mg-page-lede">
            We&rsquo;re accountants. We built Orbit because we were tired of doing the same
            month-end ritual by hand — chasing documents, vouching invoices, running the same
            accrual spreadsheet, filing the same VAT. This page walks you through what the
            system actually does, in the order you&rsquo;d actually use it.
          </p>
        </section>

        <section className="mg-page-body mg-guide-body">
          {/* ── The big picture ──────────────────────────────────── */}
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">The short version</h2>
            <p className="mg-guide-p">
              Orbit is a team of AI agents that sits between your business and your ledger. Documents
              come in (WhatsApp, email, Telegram, a bank feed — however your suppliers and staff
              actually send them). The agents read each document, classify it, extract the numbers,
              code it from your posting history, test it against the FTA&rsquo;s tax-invoice rules,
              check for duplicates, and propose a journal entry — with a confidence score and the
              evidence attached. You approve the ones that need you. Everything else posts
              automatically, and every entry carries an audit trail back to the source document.
            </p>
            <p className="mg-guide-p">
              At month-end, the system runs the close checklist: accruals for missing invoices,
              depreciation, schedule releases, bank reconciliation, variance analysis. It surfaces
              the decisions that need a human — and only those. When you&rsquo;re satisfied, you
              close and lock the period, and the lock is enforced everywhere.
            </p>
            <p className="mg-guide-p">
              Orbit posts into the ledger you already use — Xero, Zoho Books, QuickBooks, Odoo,
              Wafeq or ERPNext — or keeps clean books itself when there isn&rsquo;t one.
            </p>
          </div>

          {/* ── Documents & intake ───────────────────────────────── */}
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">1. Documents come in</h2>
            <p className="mg-guide-p">
              Your suppliers don&rsquo;t care about your filing system. They send a PDF on WhatsApp
              at 11pm, a scanned invoice by email, a photo of a receipt via Telegram. Orbit watches
              all of these channels. When a document arrives, the intake agent classifies it
              (supplier invoice, receipt, credit note, bank statement, contract, GRN), extracts the
              header fields by OCR, and sha-deduplicates it against everything already in the vault.
            </p>
            <p className="mg-guide-p">
              Every document is stored once, org-scoped, and linked to whatever it touches — the AP
              invoice, the journal, the bank match. One click from any number and you&rsquo;re
              looking at the original PDF. That&rsquo;s how an audit trail is supposed to work.
            </p>
          </div>

          {/* ── Payables ─────────────────────────────────────────── */}
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">2. Payables — the AP ledger</h2>
            <p className="mg-guide-p">
              Once a supplier invoice is classified and extracted, the coding engine looks at your
              posting history: &ldquo;the last 52 Aramex invoices went to Freight &amp; Shipping with
              a 98% share.&rdquo; It proposes the same code, shows you the memory, and attaches a
              confidence score. High-confidence invoices post. Low-confidence ones queue for you.
            </p>
            <p className="mg-guide-p">
              Simultaneously, the tax agent runs the FTA&rsquo;s Article 59 checklist on every
              invoice: is the supplier TRN present and valid? Is &ldquo;Tax Invoice&rdquo; printed on
              the face? Is the date, description, and amount stated? If any criterion fails, the
              input VAT is held — you can see exactly which rule failed, the amount blocked, and a
              suggested correction (usually: ask the supplier for a corrected copy). No VAT is
              claimed on a document that doesn&rsquo;t qualify. Period.
            </p>
            <p className="mg-guide-p">
              Duplicate detection runs in parallel. If a supplier sends the same invoice twice —
              same number, different channel — the second copy is blocked before it reaches the
              ledger. You see the duplicate flagged, not a double payment in your bank run.
            </p>
          </div>

          {/* ── Receivables ──────────────────────────────────────── */}
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">3. Receivables — the AR ledger</h2>
            <p className="mg-guide-p">
              The collection agent works a cadence you set once: reminder at 7 days overdue, second
              notice at 21, final warning at 45, escalation at 60. Each message is drafted, shown to
              you for approval (the first time — after that, it runs the pattern), and dispatched by
              email. Promises to pay are logged. Payments that land in the bank are matched to the
              invoice automatically.
            </p>
            <p className="mg-guide-p">
              Write-off exposure is measured against your provision policy — the ladder you configure
              (e.g. 10% at 61 days, 40% at 91, 100% at 181). When exposure crosses a threshold, a
              decision surfaces on your dashboard: write down, escalate, or wait. The system doesn&rsquo;t
              decide for you. It tells you what the policy says and asks you to call it.
            </p>
          </div>

          {/* ── The ledger ───────────────────────────────────────── */}
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">4. The general ledger</h2>
            <p className="mg-guide-p">
              Every journal entry carries three things a manual journal doesn&rsquo;t: the agent&rsquo;s
              commentary explaining <em>why</em> the entry exists, the evidence bundle (source
              document, OCR match, PO or GRN reference), and a confidence score. Open any line in
              the GL and you can trace it back to its origin in under a second.
            </p>
            <p className="mg-guide-p">
              Journals are typed: standard, accrual, reclass, schedule release, depreciation,
              provision. The accrual engine watches your supplier billing patterns (cadence models)
              and proposes a journal when an expected invoice is late — &ldquo;du Telecom: July bill
              is 5 days late, seasonal average is AED 6,800, proposed accrual JE-3002.&rdquo; The
              accrual auto-reverses when the real invoice arrives. No stale accruals sitting in your
              books.
            </p>
            <p className="mg-guide-p">
              Reclassifications are logged with the instruction source: &ldquo;Copilot, confirmed by
              Fatima.&rdquo; Depreciation is straight-line across your asset classes, posted monthly.
              Schedule releases (prepayments, amortisation) tick down automatically per the schedule
              you set up once. Everything posts. Everything explains itself.
            </p>
          </div>

          {/* ── Bank recon ───────────────────────────────────────── */}
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">5. Bank reconciliation</h2>
            <p className="mg-guide-p">
              Bank statements arrive by feed or upload. The system checks arithmetic (does the
              opening + transactions = closing?), continuity (does the opening match last
              month&rsquo;s close?), and then matches each line: supplier payments to AP invoices,
              customer receipts to AR invoices, salary WPS batches to payroll runs. What it
              can&rsquo;t match, it queues — and those unmatched lines surface on the close
              checklist.
            </p>
            <p className="mg-guide-p">
              Five unmatched lines in a month of fourteen is normal. A hundred unmatched lines is a
              sign something is wrong upstream. The system gives you the count and the details, not a
              green tick that hides the gaps.
            </p>
          </div>

          {/* ── Fixed assets ─────────────────────────────────────── */}
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">6. Fixed assets</h2>
            <p className="mg-guide-p">
              The asset register holds every capitalised item: cost, NBV, useful life, depreciation
              method, location, custody status. When an AP invoice crosses the capitalisation
              threshold (you set the floor — e.g. AED 5,000), the system proposes capitalisation
              instead of expensing it. Depreciation posts monthly, automatically, across all classes.
            </p>
            <p className="mg-guide-p">
              Custody acknowledgements track who has what — a MacBook in Priya&rsquo;s name, a
              delivery van photographed at the Al Quoz warehouse. For audit, the register tells you
              not just what you own but where it is and who last confirmed it.
            </p>
          </div>

          {/* ── Month-end close ──────────────────────────────────── */}
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">7. The month-end close</h2>
            <p className="mg-guide-p">
              This is where it all comes together. The close cockpit shows a live checklist:
              documents processed, AP cutoff complete, bank reconciled, accruals proposed,
              depreciation posted, EOSB provision posted, VAT return drafted, variances reviewed.
              Each line is green (done), amber (in progress), or red (blocked on you).
            </p>
            <p className="mg-guide-p">
              Variance analysis runs automatically: this month vs. last month, by account. Below
              your threshold (say, 8% or AED 3,000), it&rsquo;s marked &ldquo;in line&rdquo; and
              you move on. Above the threshold, the system either self-explains it (&ldquo;summer
              cooling load, consistent with prior-year July&rdquo;) or surfaces it for you
              (&ldquo;professional fees jumped from AED 18K to AED 60K — one-off or recurring?&rdquo;).
            </p>
            <p className="mg-guide-p">
              When every gate is green, you close. The lock is enforced: no agent, no user, no
              API call can post into a locked period. Your Q1 doesn&rsquo;t change after you&rsquo;ve
              reported it.
            </p>
          </div>

          {/* ── Tax ──────────────────────────────────────────────── */}
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">8. Tax — VAT and Corporate Tax</h2>
            <p className="mg-guide-p">
              UAE VAT at 5% is tested on every invoice before input VAT is claimed. The VAT return
              assembles itself as the month runs — standard-rated sales, zero-rated, exempt,
              out-of-scope, output VAT, input VAT, net payable. By the time you open the return,
              it&rsquo;s a review, not a build.
            </p>
            <p className="mg-guide-p">
              Corporate tax at 9% (above AED 375,000 taxable income) is accrued monthly and
              reconciled against the VAT — the two returns shouldn&rsquo;t tell different stories
              about your revenue, and the system checks that they don&rsquo;t.
            </p>
            <p className="mg-guide-p">
              For KSA businesses: ZATCA e-invoice clearance is tracked per invoice, and the 15% VAT
              rate is applied from the entity&rsquo;s country setting. Same engine, different rules.
            </p>
          </div>

          {/* ── Payroll & EOSB ───────────────────────────────────── */}
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">9. Payroll and end-of-service</h2>
            <p className="mg-guide-p">
              The employee register tracks basic salary, allowances, join date and service years.
              Payroll runs generate a WPS SIF file for the bank. The EOSB provision is calculated
              monthly under the UAE labour law 21/30-day rule — 21 days per year for the first five
              years, 30 days per year after that — and posted as a provision movement journal. When
              an employee passes the five-year mark, the system catches the rate change and adjusts
              the monthly charge.
            </p>
            <p className="mg-guide-p">
              If you need a more rigorous IAS 19 valuation — discount rates, salary escalation,
              attrition modelling — we built a{" "}
              <a className="textlink" href="/tools/ias19-actuarial-eosb-calculator">
                free actuarial EOSB calculator
              </a>{" "}
              you can run in your browser right now, no sign-up.
            </p>
          </div>

          {/* ── Decisions ────────────────────────────────────────── */}
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">10. Decisions — the things only you can call</h2>
            <p className="mg-guide-p">
              Orbit doesn&rsquo;t pretend it can make your judgement calls. When something needs a
              human — a write-off, a reclass instruction, a variance that can&rsquo;t be
              auto-explained, a supplier invoice with a missing TRN — it surfaces a decision card
              on your overview. Each card has a severity (critical, review, info), the agent that
              raised it, the confidence score, and enough detail to act without digging.
            </p>
            <p className="mg-guide-p">
              The goal is a short list. If you have forty open decisions, something is broken
              upstream. If you have two, the system is working.
            </p>
          </div>

          {/* ── Money finder ─────────────────────────────────────── */}
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">11. Money Finder — the things you didn&rsquo;t know to look for</h2>
            <p className="mg-guide-p">
              The anomaly engine watches your spend patterns and surfaces findings: a supplier whose
              unit rate crept 14% over three months with no contract amendment, a credit note that
              was never offset, a VAT recovery that&rsquo;s blocked because a single field is missing
              from the invoice. Each finding carries a potential amount and the evidence trail.
            </p>
            <p className="mg-guide-p">
              These aren&rsquo;t alerts for the sake of alerting. If the system says
              &ldquo;potential saving AED 55,200,&rdquo; it can show you the three invoices that prove
              it.
            </p>
          </div>

          {/* ── Integrations ─────────────────────────────────────── */}
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">12. Your existing ledger stays</h2>
            <p className="mg-guide-p">
              Orbit is not a replacement for your accounting software. It sits on top.
              Journals sync to Xero, Zoho Books, QuickBooks, Odoo, Wafeq or ERPNext via two-way
              connectors — Orbit proposes and posts, your ledger is the system of record. Period
              locks in Orbit trigger period locks in the ledger. Chart of accounts maps across. If
              you don&rsquo;t have a ledger yet, Orbit keeps the books itself until you&rsquo;re
              ready to pick one.
            </p>
          </div>

          {/* ── Tools ────────────────────────────────────────────── */}
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">13. Free calculators — the working shown</h2>
            <p className="mg-guide-p">
              We built the calculators we kept reaching for ourselves and put them on the site, free,
              no login. They run in your browser — nothing is uploaded, nothing is stored. Each one
              shows the formula so you can check the logic, not just the answer.
            </p>
            <ul className="mg-guide-list">
              <li>
                <a className="textlink" href="/tools/ifrs16-lease-calculator">IFRS 16 lease liability &amp; ROU asset</a>{" "}
                — day-1 measurement plus the full amortisation schedule
              </li>
              <li>
                <a className="textlink" href="/tools/ias19-actuarial-eosb-calculator">IAS 19 actuarial EOSB</a>{" "}
                — projected unit credit estimate with discount rate, escalation, and attrition
              </li>
              <li>
                <a className="textlink" href="/tools/ias36-impairment-calculator">IAS 36 impairment (DCF)</a>{" "}
                — five-year value-in-use with WACC and terminal value
              </li>
              <li>
                <a className="textlink" href="/tools/ias12-deferred-tax-calculator">IAS 12 deferred tax schedule</a>{" "}
                — temporary differences, DTL/DTA, at any rate
              </li>
              <li>
                <a className="textlink" href="/tools/ifrs9-eir-calculator">IFRS 9 effective interest rate</a>{" "}
                — EIR solver with full amortised-cost schedule
              </li>
              <li>
                <a className="textlink" href="/tools/ecl-provision-calculator">IFRS 9 ECL provision matrix</a>{" "}
                — expected credit loss with forward-looking adjustment
              </li>
              <li>
                <a className="textlink" href="/tools/eosb-gratuity-calculator">UAE gratuity (EOSB)</a>{" "}
                — 21/30-day rule with the working
              </li>
              <li>
                <a className="textlink" href="/tools/uae-vat-calculator">VAT calculator</a>{" "}
                — UAE 5% and KSA 15%, add or extract
              </li>
              <li>
                <a className="textlink" href="/tools/uae-corporate-tax-calculator">UAE Corporate Tax estimator</a>{" "}
                — 0%/9% with Small Business Relief
              </li>
            </ul>
          </div>

          {/* ── Pricing ──────────────────────────────────────────── */}
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">14. What it costs</h2>
            <p className="mg-guide-p">
              Three plans, sized by usage, not seats — every plan gives your whole team access:
            </p>
            <ul className="mg-guide-list">
              <li><b>Starter</b> — AED 149/month. For businesses just getting their books in order.</li>
              <li><b>Growth</b> — AED 499/month. Full module set, bank feeds, payroll, tax.</li>
              <li><b>Scale</b> — AED 1,499/month. Multi-entity, advanced integrations, priority support.</li>
            </ul>
            <p className="mg-guide-p">
              The first 100 companies get a full year free — the founding cohort. No credit card, no
              catch. We want businesses who&rsquo;ll tell us what&rsquo;s broken so we can fix it
              before we charge anyone.{" "}
              <a className="textlink" href="/pricing">Full pricing details →</a>
            </p>
          </div>

          {/* ── Who it's for ─────────────────────────────────────── */}
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">15. Who this is for</h2>
            <p className="mg-guide-p">
              Orbit is built for UAE and KSA businesses that have real books to keep: trading
              companies, professional services firms, logistics operators, property managers,
              distributors — anyone running a month-end close, filing VAT, paying suppliers, chasing
              customers, and wishing the process were shorter.
            </p>
            <p className="mg-guide-p">
              If you&rsquo;re a sole trader with five invoices a month, you probably don&rsquo;t need
              this. If you&rsquo;re a finance team of three managing sixty suppliers and a quarterly
              VAT return on a spreadsheet, this is exactly what we built.
            </p>
          </div>

          {/* ── CTA ──────────────────────────────────────────────── */}
          <div className="mg-guide-cta">
            <a href="/#join" className="mg-cta">Book a demo →</a>
            <a href="/product" className="mg-ghost">See the product screens</a>
          </div>
        </section>
      </main>
      <MgFooter />
    </>
  );
}

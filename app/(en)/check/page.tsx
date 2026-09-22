/* ── /check ──────────────────────────────────────────────────────────
   The Books Check landing page (2026-09-23): the free front door to
   Hysaab. "Connect your ledger. In five minutes we tell you what is
   wrong with your books and how to fix it." The product ships in the
   app as /check; until the connect flow is live the button on this page
   books the first check through the enquiry form, and the copy says so.
   The sample report below is illustrative and labelled as such; nothing
   on this page is presented as a real customer's books. */

import { PageShell, PageHero } from "@/components/home/PageShell";
import { EnquiryForm } from "@/components/home/EnquiryForm";

export const metadata = {
  title: "Books Check by Hysaab: connect your ledger, hear what is wrong",
  description:
    "Connect QuickBooks, Xero, Zoho Books or Wafeq. In five minutes Hysaab tells you what is wrong with your books and how to fix it, with VAT and corporate tax checks for the UAE and Saudi Arabia. First check free.",
  alternates: { canonical: "./" },
};

const LEDGERS = ["QuickBooks", "Xero", "Zoho Books", "Wafeq"] as const;

const FINDS: { k: string; h: string; p: string }[] = [
  { k: "Balances", h: "Books that do not add up", p: "A trial balance out of balance, journals that do not balance, a ledger that does not roll forward to its own trial balance, opening balances that disagree with last year's close." },
  { k: "Parking", h: "Money left in the wrong place", p: "Suspense, clearing and ask-my-accountant balances that never cleared; undeposited funds and unapplied payments older than a month; bank accounts nobody has reconciled in sixty days." },
  { k: "Duplicates", h: "The same thing booked twice", p: "Two payments to the same supplier for the same amount a few days apart; a bill and a card charge for one purchase; post-and-reverse pairs that inflate a month." },
  { k: "Coding", h: "Lines in the wrong account", p: "Marketing booked as utilities, a laptop booked as stationery, a director's payment booked as a supplier, an expense sitting in a liability. Each one named, with where it should be." },
  { k: "Personal", h: "Owner spending in the company's books", p: "Restaurants at the weekend, school fees, personal travel and fashion booked as business, before an auditor or the tax authority finds them." },
  { k: "Tax", h: "VAT and corporate tax that will not survive a return", p: "Lines with no tax code, 5 % applied to zero-rated or exempt supplies, output VAT that does not match the return period, a corporate tax threshold crossed with no tax account. UAE and KSA rules, not a US template." },
  { k: "Timing", h: "Entries in the wrong period", p: "Journals dated inside a closed month but posted after it, entries after the lock date, round-number manual journals on weekends and public holidays." },
  { k: "Evidence", h: "Postings no one could explain", p: "Blank narratives, revenue booked by hand, reversals with no reason, and the entries an ISA 240 journal test would pull for vouching." },
];

const SAMPLE: { money: string; what: string; where: string; fix: string }[] = [
  { money: "AED 48,300", what: "Suspense account has carried a balance since March.", where: "Account 9999, 11 lines", fix: "Reclassify the six supplier payments to the bills they settled; the rest are two bank fees and a refund." },
  { money: "AED 12,600", what: "VAT charged at 5 % on an export sale that is zero-rated.", where: "Invoice INV-2314", fix: "Issue a credit note and reissue at 0 % with the export evidence attached." },
  { money: "AED 9,800", what: "The same Etisalat bill paid twice, four days apart.", where: "Payments 1042 and 1051", fix: "Ask for the refund or apply the second payment to the next bill; reverse one expense line." },
  { money: "AED 7,450", what: "A MacBook booked as office supplies.", where: "Bill 2088", fix: "Capitalise it: move to computer equipment and start depreciation from the purchase month." },
];

const STEPS: [string, string, string][] = [
  ["01", "Connect", "Sign in with your email, then connect QuickBooks or Xero in two clicks. Zoho Books and Wafeq connect with an API key. Read-only. We never write to your ledger."],
  ["02", "We read the year", "Every posted line for the last financial year and the year to date, the trial balance and the chart of accounts. Nothing is sampled."],
  ["03", "Three passes", "First the arithmetic that must hold. Then every line judged against where it was booked, with a confidence score, so nothing doubtful is shown. Then the plain-English report."],
  ["04", "The report", "The ten things to fix, ranked by the money at stake, each with what, why, where in your ledger, and the fix in one sentence. Emailed to you, kept in your account."],
  ["05", "The fix", "Fix them yourself with the report open, book fifteen minutes with an Oblique Consult accountant, or move the books to Hysaab and we keep them right."],
];

export default function CheckPage() {
  return (
    <PageShell band={{ kicker: "Books Check", title: "Your first check is on us.", body: "Sign in with your email, connect Xero or QuickBooks read-only, and the first report is yours in about a minute. No card, no commitment, and nothing is written to your books." }}>
      <PageHero
        eyebrow="Books Check · the free front door to Hysaab"
        title={<>Connect QuickBooks.<br /><span>We tell you what is wrong and how to fix it.</span></>}
        lede="Five minutes, read-only, under a dollar. Hysaab reads every line of the year, runs the checks an auditor would run, and hands you the ten things to fix ranked by the money at stake. Xero, Zoho Books and Wafeq too. Built for the UAE and Saudi Arabia, so the VAT and corporate tax checks are the real ones."
      >
        <a className="hw-btn hw-btn--peach" href="https://app.hysaab.ai/check">Start your free check <span aria-hidden="true">→</span></a>
        <a className="hw-link hw-link--light" href="#sample">See what a report says</a>
      </PageHero>

      {/* ── The promise ── */}
      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">The promise</p>
              <h2>Books look fine until someone reads every line.<br /><span>So we read every line.</span></h2>
            </div>
            <p>A year of books is a few thousand lines. Nobody reads them all, so the errors sit there until the auditor, the tax authority or the buyer does. A Books Check reads all of them, for less than the cost of the coffee you would have bought your bookkeeper.</p>
          </div>
          <div className="hw-cards hw-cards--2">
            {[
              ["A bookkeeper samples", "Every line is read"],
              ["Found at the audit", "Found this afternoon"],
              ["A vague feeling the books are off", "Ten findings, ranked by dirhams"],
              ["A US template", "UAE VAT, UAE CT, KSA VAT"],
              ["A quote for a review", "Free, then AED 5 a check"],
              ["Write access to your ledger", "Read-only, always"],
            ].map(([old, now]) => (
              <article key={old}>
                <p className="hw-eyebrow" style={{ textDecoration: "line-through" }}>{old}</p>
                <h3>{now}</h3>
              </article>
            ))}
          </div>
          <p className="hw-eyebrow" style={{ marginTop: 28 }}>Works with</p>
          <ul className="hw-ticks" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
            {LEDGERS.map((l) => <li key={l}><strong>{l}</strong></li>)}
          </ul>
        </div>
      </section>

      {/* ── What it finds ── */}
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">What it finds</p>
              <h2>Eight kinds of wrong, and the fix for each.</h2>
            </div>
            <p>The arithmetic checks are the same engines that run inside <a href="/audit">hysaab audit</a>. The judgement calls, whether a line sits in the right account, whether a payment is personal, whether two lines are one purchase, are made with a confidence score, and anything below the bar is never shown. A report you cannot trust on the first finding is worth nothing.</p>
          </div>
          <div className="hw-rows">
            {FINDS.map((f) => (
              <article key={f.k}>
                <span className="hw-mono">{f.k}</span>
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── The sample report ── */}
      <section className="hw-block--rule" id="sample">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">What a report says</p>
              <h2>Ranked by the money at stake.<br /><span>Each with the fix in one sentence.</span></h2>
            </div>
            <p>An illustration, not a customer&apos;s books: four findings of the kind a Books Check produces, written the way the report writes them. Every real finding carries the ledger reference, so you can open the line in your own system.</p>
          </div>
          <div className="hw-rows">
            {SAMPLE.map((s) => (
              <article key={s.where}>
                <span className="hw-mono">{s.money}</span>
                <h3>{s.what}</h3>
                <p><strong>Where.</strong> {s.where}. <strong>Fix.</strong> {s.fix}</p>
              </article>
            ))}
          </div>
          <div className="hw-note">
            <span className="hw-mono">Illustrative</span>
            <p>Amounts and references above are made up to show the shape of a finding. Your report is built from your own ledger and nothing else.</p>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">How it works</p>
              <h2>Five steps. You touch two of them.</h2>
            </div>
            <p>Connecting is the only thing you do before the report; deciding what to do about it is the only thing you do after.</p>
          </div>
          <div className="hw-rows">
            {STEPS.map(([n, h, p]) => (
              <article key={n}>
                <span className="hw-mono">Step {n}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Price and the rules ── */}
      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Price, and what we will not do</p>
              <h2>Free the first time. AED 5 a check after.<br /><span>Read-only, always.</span></h2>
            </div>
          </div>
          <div className="hw-cards">
            <article className="is-navy">
              <p className="hw-eyebrow">The first check</p>
              <h3>Free</h3>
              <p>The whole year, the whole report, no card. If the books are clean, the report says so, and that is worth knowing too.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">Every check after</p>
              <h3>AED 5</h3>
              <p>Run it before the VAT return, before the auditor, before the investor call. Pay per check; no subscription needed.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">The watch</p>
              <h3>AED 59 a month</h3>
              <p>A check every week, and an email only when something new appears. Silence means the books are still right.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">Read-only</p>
              <h3>Nothing is written to your ledger</h3>
              <p>The connection asks for read access only. Every fix in the report is yours to make, or ours to make with you, never the software&apos;s to make alone.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">Your data</p>
              <h3>Deleted after thirty days</h3>
              <p>The lines we read are kept for thirty days so you can open the report, then deleted unless you keep an account. The report itself stays yours.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">Honesty</p>
              <h3>Confidence on every finding</h3>
              <p>A judgement call the software is not sure about is not shown as a finding. You see fewer items and can act on all of them.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── Where it leads ── */}
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">After the report</p>
              <h2>Three ways to make it right.</h2>
            </div>
          </div>
          <div className="hw-cards">
            <article>
              <p className="hw-eyebrow">Yourself</p>
              <h3>Fix it with the report open</h3>
              <p>Each finding names the line and the fix. Most take a minute in your own ledger. Run the check again and watch the list shrink.</p>
            </article>
            <article>
              <p className="hw-eyebrow">With a person</p>
              <h3>Fifteen minutes with an accountant</h3>
              <p>Every report ends with a booking link to Oblique Consult, the firm behind Hysaab. Bring the report; leave with the fixes made.</p>
              <a className="hw-link" href="/contact">Book a walkthrough <span aria-hidden="true">→</span></a>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">With Hysaab</p>
              <h3>Keep them right from now on</h3>
              <p>Move the books to Hysaab and the checks run on every line as it is posted, with a person approving the calls that matter.</p>
              <a className="hw-link" href="/accounting">See the accounting product <span aria-hidden="true">→</span></a>
            </article>
          </div>
        </div>
      </section>

      {/* ── The form ── */}
      <section className="hw-block--rule" id="conversation">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Prefer a person?</p>
              <h2>Tell us your ledger. We run the first check with you.</h2>
            </div>
            <p>Zoho Books or Wafeq, a ledger that is not on the list, or a report you would rather read with an accountant on the call: leave your work email and which system you use, and we reply within one working day.</p>
          </div>
          <EnquiryForm source="Books Check" />
        </div>
      </section>
    </PageShell>
  );
}

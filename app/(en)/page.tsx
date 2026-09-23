/* ── hysaab.ai homepage — V4 editorial ──────────────────────────────
   Cream-dominant editorial layout with Instrument Serif headings,
   navy activity feed, animated peach scroller, and the completed-
   close sage block. Copy is the approved V4 wording. Styles live
   in app/hysaab-home.css (hw-*). The walkthrough captures are
   genuine workspace screens: see lib/home-moments.ts.
   Previous homepage kept at backups/home-v2-2026-09.page.tsx.bak. */

import { Wordmark } from "@/components/Wordmark";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Capture } from "@/components/home/Capture";
import { EnquiryForm, InterestLink } from "@/components/home/EnquiryForm";
import { loadMoments, loadHeroCapture } from "@/lib/home-moments";
import { langAlternates } from "@/lib/site-meta";
import { Demo } from "@/components/hysaab/Demo";
import { SiteFooter } from "@/components/home/SiteFooter";
import { TEAM } from "@/lib/team";
import { ActivityFeed } from "@/components/home/ActivityFeed";
import { PeachScroller } from "@/components/home/PeachScroller";
import { KineticLines, Mark, SwapLabel } from "@/components/motion/Kinetic";

/* ── Activity feed rows ── */
const FEED: { t: string; who: string; msg: string; ask?: boolean }[] = [
  { t: "21:00", who: "Intake agent", msg: "received a WhatsApp photo from Rashid. Gulf Technical Supplies, INV-4471." },
  { t: "21:01", who: "Tax agent", msg: "tax-invoice criteria met · TRN valid · VAT 199.50 recoverable." },
  { t: "21:02", who: "Coding agent", msg: "IT equipment · Dubai office, 96% from 31 similar entries. Posted J-2291 to Zoho Books." },
  { t: "21:40", who: "Duplicate watch", msg: "INV-4471 arrived again by email. Merged, not posted twice." },
  { t: "23:15", who: "Collections agent", msg: "reminder 2 of 3 sent to ELC Group. SI-1187, 12 days overdue." },
  { t: "06:05", who: "Bank-match agent", msg: "312 of 314 lines matched to source overnight." },
  { t: "06:06", who: "Decision for Layla", msg: "cheque 100421 · AED 250 cleared with no document. Asking you.", ask: true },
  { t: "06:30", who: "Close agent", msg: "Knight Frank rent released · month 3 of 12. Checklist 68%." },
  { t: "06:45", who: "Reporting agent", msg: "September pack rebuilt. Gross margin down 2.1 pts, explanation attached." },
];

/* ── Statement scroller phrases ── */
const STATEMENTS = [
  "Your accounting system holds the records",
  "Hysaab makes sense of them",
  "Documents arrive · agents follow",
  "You stay in control",
  "Evidence first · judgement always",
  "Built in Dubai for the Gulf",
];

export const metadata = {
  title: "AI Accounting Software for UAE & Saudi Businesses | Hysaab",
  description:
    "A team of AI agents for Gulf businesses: accounting, tax, collections and reporting agents that plug into your books, run the busywork and leave the decisions with you.",
  alternates: langAlternates("/"),
};

export default function Page() {
  const moments = loadMoments();
  const hero = loadHeroCapture();
  const pendingCount = moments.filter((m) => !m.ready).length;

  return (
    <div className="hw-page" id="top">
      <a href="#main" className="hw-skip">Skip to the content</a>
      <HomeHeader />

      <main id="main">
        {/* ── Hero ── */}
        <section className="hw-hero">
          <div className="hw-wrap hw-hero-grid">
            <div className="hw-hero-copy m-enter">
              <p className="hw-eyebrow"><span className="hw-dot" aria-hidden="true" /> AI accounting for the UAE and Saudi Arabia</p>
              <h1><KineticLines delay={120} lines={[<>Your books,</>, <>handled while</>, <>you <Mark at={900}><em>sleep</em></Mark>.</>]} /></h1>
              <p className="hw-hero-desc">AI agents for accounting, tax, collections and reporting. They do the busywork. You make the calls.</p>
              <div className="hw-actions">
                <a className="hw-btn hw-btn--blush m-cta m-magnetic" href="#conversation"><SwapLabel text="Book a walkthrough" /> <span aria-hidden="true">↗</span></a>
                <a className="hw-link hw-link--ruled" href="/check">Check your books free <span aria-hidden="true">→</span></a>
              </div>
              <p className="hw-origin"><span aria-hidden="true">✳</span> Built in Dubai. Fluent in your working day.</p>
            </div>
            <ActivityFeed rows={FEED} />
          </div>
        </section>

        {/* ── Statement scroller (animated peach strip) ── */}
        <PeachScroller phrases={STATEMENTS} />

        {/* ── Books Check: try it on your books (sage) ── */}
        <section className="hw-trycheck" aria-labelledby="hw-trycheck-h">
          <div className="hw-wrap hw-trycheck-grid">
            <div data-reveal="">
              <p className="hw-eyebrow">Books Check · Free</p>
              <h2 id="hw-trycheck-h">Try it on your <em>books</em>.</h2>
            </div>
            <div className="hw-trycheck-side" data-reveal="stagger-lg">
              <p>Connect Xero or QuickBooks. See what Hysaab finds in about a minute. Read‑only.</p>
              <a className="hw-btn hw-btn--navy m-cta m-cta--sage m-magnetic" href="/check"><SwapLabel text="Check my books" /> <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="hw-work" id="how-it-works">
          <div className="hw-wrap hw-section">
            <div className="hw-work-grid">
              <div className="hw-heading" data-reveal="">
                <p className="hw-eyebrow">How it works</p>
                <h2>Just chat.<br />The agents get<br />to work.</h2>
                <p>Send a receipt, an invoice or a question. Each agent picks up its part and brings back only what needs you.</p>
              </div>
              <div className="hw-workflow" data-reveal="stagger-lg">
                <article>
                  <span className="hw-workflow-num" aria-hidden="true">01</span>
                  <h3>You send a message.</h3>
                  <p>A receipt, an invoice, or a question about your numbers. No report builder to learn.</p>
                </article>
                <article>
                  <span className="hw-workflow-num" aria-hidden="true">02</span>
                  <h3>Agents prepare the work.</h3>
                  <p>Tax checks, coding, bank matching and collections. Exceptions come back explained.</p>
                </article>
                <article>
                  <span className="hw-workflow-num" aria-hidden="true">03</span>
                  <h3>You make the decisions.</h3>
                  <p>Answer a question or review an approval. Your limits still apply, and the reasoning stays with the books.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* ── Five ways Hysaab helps ── */}
        <section id="experience" className="hw-experience">
          <div className="hw-wrap hw-section">
            <div className="hw-heading" data-reveal="">
              <div>
                <p className="hw-eyebrow">Five ways Hysaab helps</p>
                <h2>From &ldquo;where's that<br />receipt?&rdquo; to &ldquo;here's<br />your report.&rdquo;</h2>
              </div>
              <p>One invoice, from a 9pm photo to a locked period. Click any moment to take the controls.</p>
            </div>
            <Demo />
            <p className="hw-disclosure">Illustrative scenario. Rashid runs a trading company; Layla is his CFO; Noor keeps the books. The numbers are examples, not results.</p>

            <div className="hw-shots">
              <h3 data-reveal="">Inside the real workspace.</h3>
              <div className="hw-shots-grid" data-reveal="stagger-lg" data-parallax="">
                {moments.map((m) => (
                  <article key={m.key}>
                    <Capture moment={m} focus />
                    <h4><span className="hw-mono">{m.num}</span> {m.tabTitle}</h4>
                    <p>{m.ready ? (m.notice ? <><strong>What to notice.</strong> {m.notice}</> : m.caption) : m.pending}</p>
                  </article>
                ))}
                <aside className="hw-shots-note">
                  <span className="hw-mono">About these screens</span>
                  <p>{pendingCount > 0 ? `${pendingCount} of ${moments.length} captures are still pending and labelled as such. The rest are captures` : "Captures"} of the Hysaab workspace running its sample dataset. Each thumbnail is the part of the screen the claim is about; select one to see the whole screen.</p>
                  <a className="hw-link hw-link--ruled" href="#conversation">Walk through it with us <span aria-hidden="true">↗</span></a>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* ── Completed close (inset sage block) ── */}
        <section className="hw-zero-section" aria-labelledby="hw-zero-h">
          <div className="hw-wrap">
            <div className="hw-zero-layout" data-reveal="stagger-lg">
              <div>
                <div className="hw-zero" aria-hidden="true" data-count="" data-count-from="43">0</div>
                <p className="hw-zero-label">ALL SQUARE.</p>
              </div>
              <div>
                <p className="hw-eyebrow">September close / loose ends</p>
                <h2 id="hw-zero-h">A rare occasion<br />when zero is the<br />number you want.</h2>
                <p>The receipts are in. The bank matches. Every item on September's close checklist is complete.</p>
                <div className="hw-zero-detail">
                  <a className="hw-btn" href="#conversation">Show me the proof <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </div>
            <div className="hw-zero-meta">
              <span><span data-count="">43</span> / 43 checks complete</span>
              <span>Illustrative completed close · Sample data</span>
            </div>
          </div>
        </section>

        {/* ── Your control (navy) ── */}
        <section className="hw-control" id="control">
          <div className="hw-wrap hw-control-grid">
            <div data-reveal="">
              <p className="hw-eyebrow">Your control</p>
              <h2>A good colleague<br />doesn't just<br />say yes.</h2>
              <p>When an instruction looks wrong, Hysaab explains why. You get the concern, the recommendation and the evidence to make the call.</p>
              <a className="hw-textlink" href="#conversation">See how the controls work <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hw-principles" data-reveal="stagger-lg">
              <article>
                <div><h3>Every answer has a trail.</h3><p>Open the entries and documents behind it. The working is there to inspect.</p></div>
              </article>
              <article>
                <div><h3>Your boundaries stay put.</h3><p>Approval limits, period locks and non-negotiable controls remain in place.</p></div>
              </article>
              <article>
                <div><h3>The why stays with the what.</h3><p>A permitted override needs a reason. The recommendation and your decision stay on the record.</p></div>
              </article>
            </div>
          </div>
        </section>

        {/* ── Ways to work (cream) ── */}
        <section id="ways" className="hw-ways">
          <div className="hw-wrap hw-section">
            <div className="hw-heading" data-reveal="">
              <div>
                <p className="hw-eyebrow">Ways to work</p>
                <h2>Your people. Or ours,<br />alongside.</h2>
              </div>
              <p>Begin with the work that needs attention. We'll agree the scope before we start.</p>
            </div>
            <div className="hw-ways-grid" data-reveal="stagger-lg">
              <article>
                <p className="hw-eyebrow">For your finance team</p>
                <h3>Give your people a head start.</h3>
                <p>Hysaab prepares the work. Your team investigates exceptions, reviews the numbers and keeps the decisions in-house.</p>
                <InterestLink interest="Own team">Discuss your team's workflow <span aria-hidden="true">↗</span></InterestLink>
              </article>
              <article>
                <p className="hw-eyebrow">For more hands-on support</p>
                <h3>Put a name to your accountant.</h3>
                <p>Work with qualified accountants who manage the workflows and prepare each close with you. A named person to speak to.</p>
                <InterestLink interest="Managed support">Discuss managed support <span aria-hidden="true">↗</span></InterestLink>
              </article>
            </div>
          </div>
        </section>

        {/* ── The people (sage) ── */}
        <section id="team" className="hw-team">
          <div className="hw-wrap hw-section">
            <div className="hw-heading" data-reveal="">
              <div>
                <p className="hw-eyebrow">The people behind the work</p>
                <h2>Accountants and engineers.<br />At the same table.</h2>
              </div>
              <p>Built and run by Oblique Consult and Simpla. Finance experience and product engineering, working together in Dubai.</p>
            </div>
            <div className="hw-team-grid" data-reveal="stagger">
              {TEAM.map((p) => (
                <article key={p.name}>
                  <h3>{p.name}</h3>
                  <p className="hw-team-role">{p.role} · {p.org}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── The Hysaab family ── */}
        <section id="products" className="hw-products">
          <span id="family" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap hw-section">
            <div className="hw-heading" data-reveal="">
              <div>
                <p className="hw-eyebrow">The Hysaab family</p>
                <h2>Better together.<br /><span>Useful on their own.</span></h2>
              </div>
              <p>Accounting, invoice checks, firm operations, audit and finance talent. Complementary products from the same team, each with a clear job to do.</p>
            </div>
            <div className="hw-family" data-reveal="stagger">
              <article className="hw-family-primary m-sweep">
                <p className="hw-eyebrow">Accounting &amp; reporting · Early access</p>
                <h3><Wordmark size={50} ground="light" /></h3>
                <p>A team of AI agents for your day-to-day accounting and reporting, with human judgement where it matters.</p>
                <a className="hw-link hw-link--peach" href="#experience">Explore Hysaab <span aria-hidden="true">↗</span></a>
              </article>
              <article className="m-sweep">
                <p className="hw-eyebrow">Invoice processing · Available</p>
                <h3>hysaab invoice</h3>
                <p>Read and check supplier invoices, with duplicate detection and reasons for items held for review.</p>
                <a className="hw-link" href="/invoice">Explore Invoice <span aria-hidden="true">↗</span></a>
              </article>
              <article className="m-sweep">
                <p className="hw-eyebrow">Firm operations · Coming soon</p>
                <h3>hysaab services OS</h3>
                <p>Client engagements, deadlines and oversight for professional services firms, together in one place.</p>
                <a className="hw-link" href="/firms">Explore Services OS <span aria-hidden="true">↗</span></a>
              </article>
              <article className="m-sweep">
                <p className="hw-eyebrow">Audit · Coming soon</p>
                <h3>hysaab audit</h3>
                <p>Audit preparation and evidence inside Services OS. Licensed professionals retain the conclusions and opinion.</p>
                <a className="hw-link" href="/audit">Explore Audit <span aria-hidden="true">↗</span></a>
              </article>
              <article className="m-sweep">
                <p className="hw-eyebrow">Finance talent · Available</p>
                <h3>Ibtidah</h3>
                <p>Find finance people through work-based assessment, with experienced professionals making the shortlist.</p>
                <a className="hw-link" href="https://ibtidah.ae" target="_blank" rel="noopener">Meet Ibtidah <span aria-hidden="true">↗</span><span className="hw-sr"> (opens in a new tab)</span></a>
              </article>
            </div>
          </div>
        </section>

        {/* ── Enquiry ── */}
        <section className="hw-conversation" id="conversation">
          <span id="contact" className="hw-anchor" aria-hidden="true" />
          <span id="cohort" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap hw-conversation-grid" data-reveal="stagger-lg">
            <div>
              <p className="hw-eyebrow">A conversation, not a sales deck</p>
              <h2>Let's start<br />with your books.</h2>
              <p>Tell us what takes too long.<br />We will show you where Hysaab fits.</p>
              <div className="hw-agenda">
                <span className="hw-mono">Your first conversation</span>
                <ol>
                  <li><span className="hw-mono">01</span> Your current workflow</li>
                  <li><span className="hw-mono">02</span> A focused product walkthrough</li>
                  <li><span className="hw-mono">03</span> Fit, scope and next steps</li>
                </ol>
              </div>
            </div>
            <EnquiryForm />
          </div>
        </section>
      </main>

      <SiteFooter home />
    </div>
  );
}

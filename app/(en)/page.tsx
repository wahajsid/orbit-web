/* ── hysaab.ai homepage — V5 (website change plan, 2026-09-23) ───────
   One promise and two doors: the hero asks who the visitor is (a
   finance team, or a firm) and names the products inside each door.
   Thirteen sections, in the plan's order: hero, proof strip, the three
   products, how it works, one night on a group's books, five ways,
   close verification, your control, for firms, ways to work, the
   origin story, Books Check, and the demo form.
   Design and motion are the V4 system (app/hysaab-home.css hw-*,
   app/motion.css, components/motion/*). The walkthrough captures are
   genuine workspace screens: see lib/home-moments.ts.
   Previous homepage kept in git history (main before site-v5). */

import { PeachScroller } from "@/components/home/PeachScroller";
import Image from "next/image";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Capture } from "@/components/home/Capture";
import { Shot } from "@/components/home/PageShell";
import { EnquiryForm, InterestLink } from "@/components/home/EnquiryForm";
import { loadMoments } from "@/lib/home-moments";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { Demo } from "@/components/hysaab/Demo";
import { SiteFooter } from "@/components/home/SiteFooter";
import { TEAM } from "@/lib/team";
import { ActivityFeed } from "@/components/home/ActivityFeed";
import { KineticLines, Mark, SwapLabel } from "@/components/motion/Kinetic";

/* ── One night on a group's books (illustrative) ── */
const FEED: { t: string; who: string; msg: string; ask?: boolean }[] = [
  { t: "21:00", who: "Intake agent", msg: "received a WhatsApp photo from Rashid, Dubai entity. Gulf Technical Supplies, INV-4471." },
  { t: "21:01", who: "Tax agent", msg: "tax-invoice criteria met · TRN valid · VAT 199.50 recoverable." },
  { t: "21:02", who: "Coding agent", msg: "IT equipment · Dubai office, 96% from 31 similar entries. Posted J-2291 to Zoho Books." },
  { t: "21:40", who: "Duplicate watch", msg: "INV-4471 arrived again by email. Merged, not posted twice." },
  { t: "23:15", who: "Collections agent", msg: "reminder 2 of 3 sent to ELC Group. SI-1187, 12 days overdue." },
  { t: "06:05", who: "Bank-match agent", msg: "312 of 314 lines matched to source overnight." },
  { t: "06:06", who: "Decision for Layla", msg: "cheque 100421 · AED 250 cleared with no document. Asking you.", ask: true },
  { t: "06:30", who: "Close agent", msg: "Knight Frank rent released · month 3 of 12. Checklist 68%." },
  { t: "06:45", who: "Reporting agent", msg: "September pack rebuilt. Gross margin down 2.1 pts, explanation attached." },
];

/* ── Proof strip: provable facts only (owner, 2026-09-23) ── */
const STATEMENTS = [
  "Moved AED 14,200 of laptops from Marketing to Capital assets",
  "Human managed",
  "Queried journal JE-0098: no supporting document attached",
  "Matched 212 bank lines to invoices overnight",
  "AI fast-tracks decision making",
  "Held a bill charging 5% VAT on a zero-rated export",
  "Flagged the same supplier bill entered twice in March",
  "Your accounting system holds the records",
  "Chased three invoices past 60 days, statements attached",
  "Recoded the electricity bill from Office supplies to Utilities",
  "Asked for the tenancy contract behind a rent accrual",
  "Agents prepare · people decide",
  "Payroll missed in January, doubled in February: flagged",
  "Reversed a December accrual that was never unwound",
  "Ran a client VAT return through every check before partner review",
  "Evidence first · judgement always",
  "Drafted the CT add-backs from the firm’s own precedents",
  "Scored every journal in the population for the audit file",
  "Designed the sample and listed the items to vouch",
  "Human managed",
  "Tied the trial balance to the draft financial statements",
  "Found a related-party balance with no agreement on file",
  "Built in Dubai for the Gulf",
];

const PRODUCTS: { status: string; name: string; desc: string; line: string; href: string; cta: string }[] = [
  {
    status: "For finance teams · Early access", name: "Hysaab Finance", desc: "AI agents for accounting and reporting.",
    line: "Payables, reconciliations, the close and the reporting pack, prepared inside the ledger you already use. Your team reviews and approves.",
    href: "/accounting", cta: "Explore Hysaab Finance",
  },
  {
    status: "For tax and advisory firms · Coming soon", name: "Hysaab Practice", desc: "AI agents for tax and advisory firms.",
    line: "Hundreds of VAT and CT checks on every return, treatments drawn from your own precedents, and the firm’s admin running itself around the work.",
    href: "/firms", cta: "Explore Hysaab Practice",
  },
  {
    status: "For licensed audit firms · Coming soon", name: "Hysaab Audit", desc: "The ISA file, run by engines, concluded by your partners.",
    line: "Every journal scored, samples designed and evaluated, schedules tied out. A licensed partner concludes and signs; Hysaab never does.",
    href: "/audit", cta: "Explore Hysaab Audit",
  },
];

export const metadata = {
  title: "AI Agents for Finance Teams and Firms in UAE & KSA | Hysaab",
  description:
    "AI agents do the finance work and your people review and approve. Hysaab Finance for finance teams; Hysaab Practice and Hysaab Audit for firms.",
  alternates: langAlternates("/"),
};

const newTab = <span className="hw-sr">{DEMO_NEW_TAB.en}</span>;

export default function Page() {
  const moments = loadMoments();
  const pendingCount = moments.filter((m) => !m.ready).length;

  return (
    <div className="hw-page" id="top">
      <a href="#main" className="hw-skip">Skip to the content</a>
      <span data-motion-page="full" hidden />
      <HomeHeader />

      <main id="main">
        {/* ── 1. Hero: one promise, two doors ── */}
        <section className="hw-hero hw-hero--doors">
          <div className="hw-wrap hw-hero-v5">
            <div className="hw-hero-copy m-enter">
              <p className="hw-eyebrow"><span className="hw-dot" aria-hidden="true" /> AI agents for finance teams and the firms that serve them</p>
              <h1><KineticLines delay={120} lines={[<>AI agents do the finance work.</>, <>Your people <Mark at={1000}>review and approve</Mark>.</>]} /></h1>
              <p className="hw-hero-desc">Built by accountants who ran the work first. For the UAE and Saudi Arabia.</p>
            </div>

            <div className="hw-doors m-enter-block">
              <article className="hw-door hw-door--navy" aria-labelledby="door-finance">
                <p className="hw-eyebrow">I run a finance team</p>
                <h2 id="door-finance">Hysaab Finance</h2>
                <p>Agents handle payables, reconciliations, the close and reporting inside the ledger you already use.</p>
                <div className="hw-door-actions">
                  <a {...DEMO} className="hw-btn hw-btn--blush m-cta m-cta--on-navy m-magnetic"><SwapLabel text="Book a demo" /> <span aria-hidden="true">↗</span>{newTab}</a>
                  <a className="hw-link hw-link--ruled" href="/check">Check your books free <span aria-hidden="true">→</span></a>
                </div>
              </article>
              <article className="hw-door hw-door--blush" aria-labelledby="door-firm">
                <p className="hw-eyebrow">I run a firm</p>
                <h2 id="door-firm">Hysaab Practice and Hysaab Audit</h2>
                <p>Agents run tax checks, client engagements and the ISA audit file. Your partners make the calls.</p>
                <div className="hw-door-actions">
                  <a {...DEMO} className="hw-btn hw-btn--navy m-cta m-cta--on-blush m-magnetic"><SwapLabel text="Book a demo" /> <span aria-hidden="true">↗</span>{newTab}</a>
                  <a className="hw-link hw-link--ruled" href="/firms">See how firms use it <span aria-hidden="true">→</span></a>
                </div>
              </article>
            </div>
            <p className="hw-origin hw-hero-trust"><span aria-hidden="true">✳</span> Evidence on every number. Approval on every decision that matters. Built in Dubai.</p>
          </div>
        </section>

        {/* ── 2. Proof strip ── */}
        <PeachScroller phrases={STATEMENTS} />

        {/* ── 3. The three products ── */}
        <section id="products" className="hw-products hw-products--v5">
          <span id="family" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap hw-section">
            <div className="hw-heading" data-reveal="">
              <div>
                <p className="hw-eyebrow">The products</p>
                <h2>Three products.<br /><span>One way of working.</span></h2>
              </div>
              <p>Each works on its own. All three keep the same rule: agents prepare the work, and a person makes the call.</p>
            </div>
            <div className="hw-pcards" data-reveal="stagger-lg">
              {PRODUCTS.map((p) => (
                <article key={p.name} className="m-sweep">
                  <p className="hw-eyebrow">{p.status}</p>
                  <h3>{p.name}</h3>
                  <p className="hw-pcard-desc">{p.desc}</p>
                  <p>{p.line}</p>
                  <a className="hw-link hw-link--ruled" href={p.href}>{p.cta} <span aria-hidden="true">→</span></a>
                </article>
              ))}
            </div>
            <p className="hw-pcards-more" data-reveal="">Hiring into finance? <a className="hw-link hw-link--ruled" href="/hire">Meet Ibtidah <span aria-hidden="true">→</span></a></p>
          </div>
        </section>

        {/* ── 4. How it works ── */}
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
                  <h3>Documents and data arrive.</h3>
                  <p>Invoices, receipts, bank lines and questions, by WhatsApp, email or upload. No report builder to learn.</p>
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

        {/* ── 5. Hysaab Finance: one night on a group's books ── */}
        <section className="hw-night" aria-labelledby="hw-night-h">
          <div className="hw-wrap hw-section hw-night-grid">
            <div className="hw-heading" data-reveal="">
              <p className="hw-eyebrow">Hysaab Finance</p>
              <h2 id="hw-night-h">One night on<br />a group’s books.</h2>
              <p>What the agents did between nine in the evening and a quarter to seven, and the one question they left for Layla. Illustrative data.</p>
            </div>
            <ActivityFeed rows={FEED} title={null} />
          </div>
        </section>

        {/* ── 6. Five ways Hysaab helps ── */}
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
            <p className="hw-disclosure">Illustrative scenario. Al Noor Group runs four entities across Dubai and Riyadh. Layla is Group CFO. Her team of twelve closes the books every month. The scenario and the numbers are examples, not results.</p>

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
                  <a className="hw-link hw-link--ruled" {...DEMO}>Walk through it with us <span aria-hidden="true">↗</span>{newTab}</a>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. Close verification (inset sage block) ── */}
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
                  <a className="hw-btn" href="#experience">Show me the proof <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </div>
            <div className="hw-zero-meta">
              <span><span data-count="">43</span> / 43 checks complete</span>
              <span>Illustrative completed close · Sample data</span>
            </div>
          </div>
        </section>

        {/* ── 8. Your control (navy) ── */}
        <section className="hw-control" id="control">
          <div className="hw-wrap hw-control-grid">
            <div data-reveal="">
              <p className="hw-eyebrow">Your control</p>
              <h2>A good colleague<br />doesn't just<br />say yes.</h2>
              <p>When an instruction looks wrong, Hysaab explains why. You get the concern, the recommendation and the evidence to make the call.</p>
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
              <p className="hw-control-more"><a className="hw-textlink" href="/trust">Read our commitments on data and control <span aria-hidden="true">→</span></a></p>
            </div>
          </div>
        </section>

        {/* ── 9. For firms ── */}
        <section id="firms" className="hw-firms">
          <div className="hw-wrap hw-section">
            <div className="hw-heading" data-reveal="">
              <div>
                <p className="hw-eyebrow">For firms</p>
                <h2>Your firm sells judgement.<br /><span>The agents carry the file.</span></h2>
              </div>
              <p>For tax and advisory firms, and for licensed audit firms. Take either product on its own, or both together.</p>
            </div>
            <div className="hw-firms-grid" data-reveal="stagger-lg">
              <article>
                <p className="hw-eyebrow">For tax and advisory firms</p>
                <h3>Hysaab Practice</h3>
                <Shot file="p-practice.png" title="Hysaab Practice firm overview" alt="Hysaab Practice firm overview: fees, filings delivered, open work and risk at a glance, the Friday close checklist, and overdue and due-soon work." caption="Hysaab Practice firm overview, sample data." />
                <ul className="hw-ticks">
                  <li>Hundreds of VAT and CT checks on every return</li>
                  <li>Treatments proposed from your firm’s own precedents</li>
                  <li>A red-team review before a partner approves</li>
                </ul>
                <a className="hw-link hw-link--ruled" href="/firms">See Hysaab Practice <span aria-hidden="true">→</span></a>
              </article>
              <article>
                <p className="hw-eyebrow">For licensed audit firms</p>
                <h3>Hysaab Audit</h3>
                <div className="hw-shot">
                  <div className="hw-capture">
                    <Image src="/shots/audit-jet.png" width={2540} height={2360} sizes="(max-width: 760px) 100vw, 45vw" alt="Hysaab Audit journal-entry testing: every journal scored against thirty criteria, stratified above performance materiality, with the criteria hits for each entry." style={{ width: "100%", height: "auto", display: "block" }} />
                  </div>
                  <p className="hw-shot-cap">Journal-entry testing on a seeded engagement, sample data.</p>
                </div>
                <ul className="hw-ticks">
                  <li>Every journal scored, not a sample picked by eye</li>
                  <li>Samples designed, selected and evaluated in code</li>
                  <li>A licensed partner concludes and signs. Hysaab never does.</li>
                </ul>
                <a className="hw-link hw-link--ruled" href="/audit">See Hysaab Audit <span aria-hidden="true">→</span></a>
              </article>
            </div>
            <p className="hw-firms-trust" data-reveal="">Your clients stay yours. <a className="hw-link hw-link--ruled" href="/trust">Read our commitments to firms <span aria-hidden="true">→</span></a></p>
          </div>
        </section>

        {/* ── 10. Ways to work (cream) ── */}
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
                <h3>We run it with you.</h3>
                <p>Oblique’s accountants run the queue and prepare the close with you, using Hysaab every day. For mid-sized and larger companies.</p>
                <InterestLink interest="Managed support">Discuss managed support <span aria-hidden="true">↗</span></InterestLink>
              </article>
            </div>
          </div>
        </section>

        {/* ── 11. Origin story (replaces the Team section) ── */}
        <section id="team" className="hw-team hw-origin-story">
          <span id="origin" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap hw-section">
            <div className="hw-heading" data-reveal="">
              <div>
                <p className="hw-eyebrow">Where Hysaab comes from</p>
                <h2>We ran the work<br />before we built the product.</h2>
              </div>
              <p>Hysaab grew out of the tax and accounting work Oblique Consult does for Gulf businesses, and is engineered with Simpla. We built the agents for the work we used to do by hand.</p>
            </div>
            <div className="hw-team-orgs">
              <a href="https://obliqueconsult.com" target="_blank" rel="noopener">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/partners/oblique-consult.svg" alt="Oblique Consult" width={1011} height={386} loading="lazy" />
                <span><strong>Oblique Consult</strong>Tax, accounting and advisory. Dubai. Its accountants run the managed service.<span className="hw-sr"> (opens in a new tab)</span></span>
              </a>
              <a href="https://www.simpla.ai" target="_blank" rel="noopener">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/partners/simpla.png" alt="Simpla" width={1024} height={304} loading="lazy" />
                <span><strong>Simpla</strong>Tax and accounting AI. Dubai. The engineers behind Hysaab.<span className="hw-sr"> (opens in a new tab)</span></span>
              </a>
            </div>
            <div className="hw-team-grid hw-team-grid--founders" data-reveal="stagger">
              {TEAM.map((p) => (
                <article key={p.name}>
                  <span className="hw-team-initials" aria-hidden="true">{p.initials}</span>
                  <h3>{p.name}</h3>
                  <p className="hw-team-role">{p.role} · {p.org}</p>
                  {p.bio && <p>{p.bio}</p>}
                </article>
              ))}
            </div>
            <p className="hw-origin-more" data-reveal=""><a className="hw-link hw-link--ruled" href="/about">Read the full story <span aria-hidden="true">→</span></a></p>
          </div>
        </section>

        {/* ── 12. Books Check: the low-commitment option (sage) ── */}
        <section className="hw-trycheck" aria-labelledby="hw-trycheck-h">
          <div className="hw-wrap hw-trycheck-grid">
            <div data-reveal="">
              <p className="hw-eyebrow">Not ready for a demo?</p>
              <h2 id="hw-trycheck-h">Check your <em>books</em> free.</h2>
            </div>
            <div className="hw-trycheck-side" data-reveal="stagger-lg">
              <p>Connect Xero or QuickBooks. See what Hysaab finds in about a minute. Read‑only.</p>
              <a className="hw-btn hw-btn--navy m-cta m-cta--sage m-magnetic" href="/check"><SwapLabel text="Check my books" /> <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        {/* ── 13. Book a demo (enquiry form) ── */}
        <section className="hw-conversation" id="conversation">
          <span id="contact" className="hw-anchor" aria-hidden="true" />
          <span id="cohort" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap hw-conversation-grid" data-reveal="stagger-lg">
            <div>
              <p className="hw-eyebrow">A conversation, not a sales deck</p>
              <h2>Book a demo.</h2>
              <p>Tell us who you are and what takes too long.<br />We will show you where Hysaab fits.</p>
              <p className="hw-demo-direct">Prefer to pick a time yourself? <a className="hw-link hw-link--ruled" {...DEMO}>Choose a slot in our calendar <span aria-hidden="true">↗</span>{newTab}</a></p>
              <div className="hw-agenda">
                <span className="hw-mono">Your first conversation</span>
                <ol>
                  <li><span className="hw-mono">01</span> Your current workflow</li>
                  <li><span className="hw-mono">02</span> A focused product walkthrough</li>
                  <li><span className="hw-mono">03</span> Fit, scope and next steps</li>
                </ol>
              </div>
            </div>
            <EnquiryForm demo />
          </div>
        </section>
      </main>

      <SiteFooter home />
    </div>
  );
}

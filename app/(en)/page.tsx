/* ── hysaab.ai homepage — Tick & Tie (brand/tick-and-tie/BRAND.md) ───
   The page is an audited working paper: each section opens with a W/P
   reference (H-1 … H-13, in page order), the key claim is on the
   highlighter, figures carry red review marks from one legend (✓ T B P),
   and the header counts September's open review points down from 43 to 0
   at ALL SQUARE (sections carry data-open). All copy is the V5 homepage's
   (website change plan, 2026-09-23); only the presentation changed.
   Styles: app/tick-tie.css (tt-*) over the shared hw-* kit.
   Previous homepage kept in git history. */

import { HomeHeader } from "@/components/home/HomeHeader";
import { Capture } from "@/components/home/Capture";
import { Shot } from "@/components/home/PageShell";
import { EnquiryForm, InterestLink } from "@/components/home/EnquiryForm";
import { loadMoments } from "@/lib/home-moments";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { ACCESS_HREF, KEY_LINE } from "@/lib/access";
import { Demo } from "@/components/hysaab/Demo";
import { SiteFooter } from "@/components/home/SiteFooter";
import { TEAM } from "@/lib/team";
import { KineticLines, Mark, SwapLabel } from "@/components/motion/Kinetic";
import { Wp, Tm } from "@/components/home/tt/Wp";
import { TickLegend } from "@/components/home/tt/TickLegend";
import { TickStrip } from "@/components/home/tt/TickStrip";
import { AuditTrail, type TrailRow } from "@/components/home/tt/AuditTrail";
import { ReviewNote } from "@/components/home/tt/ReviewNote";

/* ── One night on a group's books (illustrative) ── */
const TRAIL: TrailRow[] = [
  { t: "21:00", who: "Intake agent", mark: "T", msg: "Received a WhatsApp photo from Rashid, Dubai entity. Gulf Technical Supplies, INV-4471." },
  { t: "21:01", who: "Tax agent", mark: "✓", msg: "Tax-invoice criteria met · TRN valid · VAT 199.50 recoverable." },
  { t: "21:02", who: "Coding agent", mark: "T", msg: "IT equipment · Dubai office, 96% from 31 similar entries. Posted J-2291 to Zoho Books." },
  { t: "21:40", who: "Duplicate watch", mark: "T", msg: "INV-4471 arrived again by email. Merged, not posted twice." },
  { t: "23:15", who: "Collections agent", mark: "✓", msg: "Reminder 2 of 3 sent to ELC Group. SI-1187, 12 days overdue." },
  { t: "06:05", who: "Bank-match agent", mark: "B", msg: "312 of 314 lines matched to source overnight." },
  { t: "06:06", who: "Decision for Layla", msg: "Cheque 100421 · AED 250 cleared with no document. Asking you.", ask: true },
  { t: "06:30", who: "Close agent", mark: "✓", msg: "Knight Frank rent released · month 3 of 12. Checklist 68%." },
  { t: "06:45", who: "Reporting agent", mark: "T", msg: "September pack rebuilt. Gross margin down 2.1 pts, explanation attached." },
];

/* ── Proof strip: provable facts only (owner, 2026-09-23) ── */
const STATEMENTS = [
  "Moved AED 14,200 of laptops from Marketing to Capital assets",
  "*Human managed",
  "Queried journal JE-0098: no supporting document attached",
  "Matched 212 bank lines to invoices overnight",
  "*AI fast-tracks decision making",
  "Held a bill charging 5% VAT on a zero-rated export",
  "Flagged the same supplier bill entered twice in March",
  "*Your accounting system holds the records",
  "Chased three invoices past 60 days, statements attached",
  "Recoded the electricity bill from Office supplies to Utilities",
  "Asked for the tenancy contract behind a rent accrual",
  "*Agents prepare · people decide",
  "Payroll missed in January, doubled in February: flagged",
  "Reversed a December accrual that was never unwound",
  "Ran a client VAT return through every check before partner review",
  "*Evidence first · judgement always",
  "Drafted the CT add-backs from the firm’s own precedents",
  "Scored every journal in the population for the audit file",
  "Designed the sample and listed the items to vouch",
  "*Human managed",
  "Tied the trial balance to the draft financial statements",
  "Found a related-party balance with no agreement on file",
  "*Built in Dubai for the Gulf",
];

const PRODUCTS: { who: string; status: string; name: string; desc: string; line: string; href: string; cta: string }[] = [
  {
    who: "For finance teams", status: "Early access", name: "Hysaab Finance", desc: "AI agents for accounting and reporting.",
    line: "Payables, reconciliations, the close and the reporting pack, prepared inside the ledger you already use. Your team reviews and approves.",
    href: "/accounting", cta: "Explore Hysaab Finance",
  },
  {
    who: "For tax and advisory firms", status: "Coming soon", name: "Hysaab Practice", desc: "AI agents for tax and advisory firms.",
    line: "Hundreds of VAT and CT checks on every return, treatments drawn from your own precedents, and the firm’s admin running itself around the work.",
    href: "/firms", cta: "Explore Hysaab Practice",
  },
  {
    who: "For licensed audit firms", status: "Coming soon", name: "Hysaab Audit", desc: "The ISA file, run by engines, concluded by your partners.",
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

/* Marks for the five workspace captures, in capture order. */
const CAPTURE_MARKS = ["T", "✓", "?", "P", "B"];

/* A hand-drawn review circle, drawn on when it scrolls into view. */
function Circle({ className }: { className?: string }) {
  return (
    <svg className={`tt-circle${className ? ` ${className}` : ""}`} viewBox="0 0 200 200" aria-hidden="true" preserveAspectRatio="none">
      <path d="M110 18 C 50 10, 12 60, 22 118 C 30 168, 90 190, 140 172 C 186 154, 194 92, 170 52 C 152 22, 112 6, 76 22" />
    </svg>
  );
}

export default function Page() {
  const moments = loadMoments();
  const pendingCount = moments.filter((m) => !m.ready).length;

  return (
    <div className="hw-page tt-page" id="top">
      <a href="#main" className="hw-skip">Skip to the content</a>
      <span data-motion-page="full" hidden />
      <HomeHeader />

      <main id="main">
        {/* ── H-1 Hero: one promise, two doors, the legend ── */}
        <section className="tt-sec tt-grid tt-hero" data-open="43">
          <div className="hw-wrap">
            <Wp r="H-1" right={<>Prepared by <b>agents</b> · Reviewed by <b>you</b></>}>AI agents for finance teams and the firms that serve them</Wp>
            <div className="tt-hero-g">
              <div className="m-enter">
                <h1><KineticLines delay={120} lines={[<>AI agents do the finance work.</>, <>Your people <Mark at={1000}>review and approve</Mark>.</>]} /></h1>
                <p className="tt-note" aria-hidden="true">↑ agents prepare · people decide</p>
                <p className="tt-hero-sub">Built by accountants who ran the work first. For the UAE and Saudi Arabia.</p>
              </div>
              <TickLegend />
            </div>
            <div className="tt-doors m-enter-block">
              <article aria-labelledby="door-finance">
                <p className="tt-who">I run a finance team</p>
                <h2 id="door-finance">Hysaab Finance</h2>
                <p>Agents handle payables, reconciliations, the close and reporting inside the ledger you already use.</p>
                <div className="tt-acts">
                  <a href={ACCESS_HREF.en} className="hw-btn hw-btn--navy m-cta m-magnetic"><SwapLabel text="Request access" /> <span aria-hidden="true">→</span></a>
                  <a className="tt-link" {...DEMO}>Book a demo <span aria-hidden="true">↗</span>{newTab}</a>
                </div>
              </article>
              <article aria-labelledby="door-firm">
                <p className="tt-who">I run a firm</p>
                <h2 id="door-firm">Hysaab Practice and Hysaab Audit</h2>
                <p>Agents run tax checks, client engagements and the ISA audit file. Your partners make the calls.</p>
                <div className="tt-acts">
                  <a href={ACCESS_HREF.en} className="hw-btn hw-btn--navy m-cta m-magnetic"><SwapLabel text="Request access" /> <span aria-hidden="true">→</span></a>
                  <a className="tt-link" {...DEMO}>Book a demo <span aria-hidden="true">↗</span>{newTab}</a>
                </div>
              </article>
            </div>
            <p className="tt-invite m-enter-block">{KEY_LINE.en} <a className="hw-link hw-link--ruled" href="/check">Meanwhile, check your books free <span aria-hidden="true">→</span></a></p>
          </div>
        </section>

        {/* ── Proof strip ── */}
        <TickStrip phrases={STATEMENTS} />

        {/* ── H-2 The three products ── */}
        <section id="products" className="tt-sec tt-grid" data-open="40">
          <span id="family" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap">
            <Wp r="H-2" right="Agents prepare · people decide">The products</Wp>
            <h2 className="tt-h2" data-reveal="">Three products. <span className="tt-hl" data-play="">One way of working.</span></h2>
            <p className="tt-lead">Each works on its own. All three keep the same rule: agents prepare the work, and a person makes the call.</p>
            <div className="tt-prods" data-reveal="stagger-lg">
              {PRODUCTS.map((p) => (
                <article key={p.name}>
                  <p className="tt-prod-st"><span>{p.who}</span><b>{p.status}</b></p>
                  <h3>{p.name}</h3>
                  <p className="tt-prod-tag">{p.desc}</p>
                  <p>{p.line}</p>
                  <a className="tt-link" href={p.href}>{p.cta} <span aria-hidden="true">→</span></a>
                </article>
              ))}
            </div>
            <p className="tt-more">Hiring into finance? <a className="tt-link" href="/hire">Meet Ibtidah <span aria-hidden="true">→</span></a></p>
          </div>
        </section>

        {/* ── H-3 How it works ── */}
        <section className="tt-sec" id="how-it-works" data-open="36">
          <div className="hw-wrap">
            <Wp r="H-3" right="Illustrative exchange">How it works</Wp>
            <div className="tt-how">
              <div>
                <h2 className="tt-h2" data-reveal="">Just chat. <span className="tt-hl" data-play="">The agents get to work.</span></h2>
                <p className="tt-lead">It reads your books, writes the entries and chases what’s missing. You approve. Send a receipt, an invoice or a question, and each agent picks up its part.</p>
                <ol className="tt-steps" data-reveal="stagger-lg">
                  <li><span className="tt-step-n">01</span><div><h3>Documents and data arrive.</h3><p>Invoices, receipts, bank lines and questions, by WhatsApp, email or upload. No report builder to learn.</p></div></li>
                  <li><span className="tt-step-n">02</span><div><h3>Agents prepare the work.</h3><p>Coding, tax checks and bank matching. Journals drafted, overdue invoices and missing receipts chased. Exceptions come back explained.</p></div></li>
                  <li><span className="tt-step-n">03</span><div><h3>You make the decisions.</h3><p>Answer a question or review an approval. Your limits still apply, and the reasoning stays with the books.</p></div></li>
                </ol>
              </div>
              <div className="tt-chat" aria-label="Example WhatsApp exchange, illustrative" data-reveal="">
                <div className="tt-chat-h"><span>WhatsApp · Hysaab</span><span>21:00</span></div>
                <div className="tt-chat-b">
                  <div className="tt-bub tt-bub--me"><img className="tt-photo" src="/home/inv-4471-photo.jpg" width={880} height={660} alt="Photo of Gulf Technical Supplies tax invoice INV-4471, 12 Sep 2026: AED 3,990.00 plus VAT 199.50, total AED 4,189.50. Sample document." loading="lazy" />Gulf Technical invoice for the Dubai office<span className="tt-meta">Rashid · 21:00</span></div>
                  <div className="tt-bub tt-bub--hy">Got it. Reading now.
                    <span className="tt-bub-r"><Tm m="✓" />Tax invoice · TRN valid</span>
                    <span className="tt-bub-r"><Tm m="T" />IT equipment · Dubai office · 96%</span>
                    <span className="tt-bub-r"><Tm m="✓" />Posted J-2291 to Zoho Books</span>
                    <span className="tt-meta">Hysaab · 21:02</span></div>
                  <div className="tt-bub tt-bub--me">Thanks. Anything you need from me?<span className="tt-meta">Rashid · 21:03</span></div>
                  <div className="tt-bub tt-bub--hy">Nothing. The photo is attached to the entry.<span className="tt-meta">Hysaab · 21:03</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── H-4 Hysaab Finance: one night on a group's books ── */}
        <section className="tt-sec tt-grid" aria-labelledby="tt-night-h" data-open="28">
          <div className="hw-wrap">
            <Wp r="H-4" right="Illustrative data">Hysaab Finance · Audit trail, one night</Wp>
            <h2 className="tt-h2" id="tt-night-h" data-reveal="">One night on <span className="tt-hl" data-play="">a group’s books.</span></h2>
            <p className="tt-lead">What the agents did between nine in the evening and a quarter to seven, and the one question they left for Layla. Illustrative data.</p>
            <AuditTrail rows={TRAIL} />
            <p className="tt-trail-foot"><span>Live from the agents · 9 entries · 8 marked by agents, 1 left for a person</span></p>
          </div>
        </section>

        {/* ── H-5 Five ways Hysaab helps ── */}
        <section id="experience" className="tt-sec hw-experience tt-experience" data-open="12">
          <div className="hw-wrap">
            <Wp r="H-5" right="Illustrative scenario · Sample data">Five ways Hysaab helps</Wp>
            <h2 className="tt-h2" data-reveal="">From &ldquo;where's that receipt?&rdquo; to <span className="tt-hl" data-play="">&ldquo;here's your report.&rdquo;</span></h2>
            <p className="tt-lead">One invoice, from a 9pm photo to a locked period. Click any moment to take the controls.</p>
            <Demo marks />
            <p className="hw-disclosure">Illustrative scenario. Al Noor Group runs four entities across Dubai and Riyadh. Layla is Group CFO. Her team of twelve closes the books every month. The scenario and the numbers are examples, not results.</p>
          </div>
        </section>

        {/* ── H-6 Inside the real workspace ── */}
        <section className="tt-sec tt-grid" id="workspace" data-open="6">
          <div className="hw-wrap">
            <Wp r="H-6" right="Captures · sample dataset">Inside the real workspace</Wp>
            <h2 className="tt-h2" data-reveal="">Inside the <span className="tt-hl" data-play="">real</span> workspace.</h2>
            <div className="tt-caps" data-reveal="stagger-lg">
              {moments.map((m, i) => (
                <article key={m.key}>
                  <Capture moment={m} focus />
                  <p className="tt-cap-n"><span>{m.num}</span><Tm m={CAPTURE_MARKS[i] ?? "✓"} /></p>
                  <h3>{m.tabTitle}</h3>
                  <p>{m.ready ? (m.notice ? <><strong>What to notice.</strong> {m.notice}</> : m.caption) : m.pending}</p>
                </article>
              ))}
            </div>
            <div className="tt-about">
              <p><strong>About these screens.</strong> {pendingCount > 0 ? `${pendingCount} of ${moments.length} captures are still pending and labelled as such. The rest are captures` : "Captures"} of the Hysaab workspace running its sample dataset. Each thumbnail is the part of the screen the claim is about; select one to see the whole screen.</p>
              <a className="hw-btn hw-btn--navy" {...DEMO}>Walk through it with us <span aria-hidden="true">↗</span>{newTab}</a>
            </div>
          </div>
        </section>

        {/* ── H-7 Close verification: ALL SQUARE ── */}
        <section className="tt-sec" aria-labelledby="tt-zero-h" data-open="0">
          <div className="hw-wrap">
            <Wp r="H-7" right="Illustrative completed close · Sample data">September close / loose ends</Wp>
            <div className="tt-square">
              <div className="tt-zero-wrap" data-play="">
                <span className="tt-zero" aria-hidden="true" data-count="" data-count-from="43">0</span>
                <Circle />
              </div>
              <div>
                <p className="tt-lab">September close / loose ends</p>
                <h2 id="tt-zero-h">A rare occasion when zero is the number you want.</h2>
                <p className="tt-square-p">The receipts are in. The bank matches. Every item on September's close checklist is complete.</p>
                <p className="tt-verdict">ALL SQUARE.</p>
                <div className="tt-square-foot">
                  <div>
                    <p className="tt-ticks" aria-hidden="true">{"✓".repeat(43)}</p>
                    <p className="tt-count"><span data-count="">43</span> / 43 checks complete</p>
                  </div>
                  <a className="hw-btn hw-btn--blush" href="#experience">Show me the proof <span aria-hidden="true">↗</span></a>
                </div>
                <p className="tt-signoff" aria-hidden="true">P · reviewed L.H. 09:40</p>
                <p className="tt-small">Illustrative completed close · Sample data</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── H-8 Your control ── */}
        <section className="tt-sec tt-grid" id="control" data-open="0">
          <div className="hw-wrap">
            <Wp r="H-8" right="Review notes stay on the record">Your control</Wp>
            <div className="tt-ctl">
              <div data-reveal="">
                <h2 className="tt-h2">A good colleague doesn't just <span className="tt-hl" data-play="">say yes.</span></h2>
                <p className="tt-lead">When an instruction looks wrong, Hysaab explains why. You get the concern, the recommendation and the evidence to make the call.</p>
              </div>
              <ReviewNote />
            </div>
            <div className="tt-pts" data-reveal="stagger-lg">
              <article><h3><Tm m="T" />Every answer has a trail.</h3><p>Open the entries and documents behind it. The working is there to inspect.</p></article>
              <article><h3><Tm m="✓" />Your boundaries stay put.</h3><p>Approval limits, period locks and non-negotiable controls remain in place.</p></article>
              <article><h3><Tm m="P" />The why stays with the what.</h3><p>A permitted override needs a reason. The recommendation and your decision stay on the record.</p></article>
            </div>
            <p className="tt-more"><a className="tt-link" href="/trust">Read our commitments on data and control <span aria-hidden="true">→</span></a></p>
          </div>
        </section>

        {/* ── H-9 For firms ── */}
        <section id="firms" className="tt-sec" data-open="0">
          <div className="hw-wrap">
            <Wp r="H-9" right="Tax, advisory and licensed audit">For firms</Wp>
            <h2 className="tt-h2" data-reveal="">Your firm sells judgement. <span className="tt-hl" data-play="">The agents carry the file.</span></h2>
            <p className="tt-lead">For tax and advisory firms, and for licensed audit firms. Take either product on its own, or both together.</p>
            <div className="tt-firms" data-reveal="stagger-lg">
              <article>
                <p className="tt-who">For tax and advisory firms</p>
                <h3>Hysaab Practice</h3>
                <Shot file="p-practice.png" title="Hysaab Practice firm overview" alt="Hysaab Practice firm overview: fees, filings delivered, open work and risk at a glance, the Friday close checklist, and overdue and due-soon work." caption="Hysaab Practice firm overview, sample data." />
                <ul className="tt-list">
                  <li><Tm m="✓" />Hundreds of VAT and CT checks on every return</li>
                  <li><Tm m="T" />Treatments proposed from your firm’s own precedents</li>
                  <li><Tm m="P" />A red-team review before a partner approves</li>
                </ul>
                <a className="tt-link" href="/firms">See Hysaab Practice <span aria-hidden="true">→</span></a>
              </article>
              <article>
                <p className="tt-who">For licensed audit firms</p>
                <h3>Hysaab Audit</h3>
                <Shot file="p-audit-jet.png" title="Hysaab Audit journal-entry testing" alt="Hysaab Audit journal-entry testing: every journal scored against thirty criteria, stratified above performance materiality, with the criteria hits for each entry." caption="Journal-entry testing on a seeded engagement, sample data." />
                <ul className="tt-list">
                  <li><Tm m="✓" />Every journal scored, not a sample picked by eye</li>
                  <li><Tm m="✓" />Samples designed, selected and evaluated in code</li>
                  <li><Tm m="P" />A licensed partner concludes and signs. Hysaab never does.</li>
                </ul>
                <a className="tt-link" href="/audit">See Hysaab Audit <span aria-hidden="true">→</span></a>
              </article>
            </div>
            <p className="tt-clients"><span>Your clients stay yours.</span> <a className="tt-link" href="/trust">Read our commitments to firms <span aria-hidden="true">→</span></a></p>
          </div>
        </section>

        {/* ── H-10 Ways to work ── */}
        <section id="ways" className="tt-sec tt-grid" data-open="0">
          <div className="hw-wrap">
            <Wp r="H-10" right="Scope agreed before we start">Ways to work</Wp>
            <h2 className="tt-h2" data-reveal="">Your people. <span className="tt-hl" data-play="">Or ours, alongside.</span></h2>
            <p className="tt-lead">Begin with the work that needs attention. We'll agree the scope before we start.</p>
            <div className="tt-ways" data-reveal="stagger-lg">
              <article>
                <p className="tt-who">For your finance team</p>
                <h3>Give your people a head start.</h3>
                <p>Hysaab prepares the work. Your team investigates exceptions, reviews the numbers and keeps the decisions in-house.</p>
                <InterestLink interest="Own team">Discuss your team's workflow <span aria-hidden="true">↗</span></InterestLink>
              </article>
              <p className="tt-or" aria-hidden="true">or</p>
              <article>
                <p className="tt-who">For more hands-on support</p>
                <h3>We run it with you.</h3>
                <p>Oblique’s accountants run the queue and prepare the close with you, using Hysaab every day. For mid-sized and larger companies.</p>
                <InterestLink interest="Managed support">Discuss managed support <span aria-hidden="true">↗</span></InterestLink>
              </article>
            </div>
          </div>
        </section>

        {/* ── H-11 Where Hysaab comes from ── */}
        <section id="team" className="tt-sec" data-open="0">
          <span id="origin" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap">
            <Wp r="H-11" right="Prepared by the people who did the work">Where Hysaab comes from</Wp>
            <div className="tt-origin">
              <div data-reveal="">
                <h2 className="tt-h2">We ran the work <span className="tt-hl" data-play="">before we built the product.</span></h2>
                <p className="tt-lead">Hysaab grew out of the tax and accounting work Oblique Consult does for Gulf businesses, and is engineered with Simpla. We built the agents for the work we used to do by hand.</p>
              </div>
              <div>
                <div className="tt-orgs">
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
                <div className="tt-people" data-reveal="stagger">
                  {TEAM.map((p) => (
                    <article key={p.name}>
                      <span className="tt-init" aria-hidden="true">{p.initials}<Circle /></span>
                      <div>
                        <h3>{p.name}</h3>
                        <p className="tt-role">{p.role} · {p.org}</p>
                        {p.bio && <p>{p.bio}</p>}
                      </div>
                    </article>
                  ))}
                </div>
                <p className="tt-more"><a className="tt-link" href="/about">Read the full story <span aria-hidden="true">→</span></a></p>
              </div>
            </div>
          </div>
        </section>

        {/* ── H-12 Books Check ── */}
        <section className="tt-sec tt-books" aria-labelledby="tt-books-h" data-open="0">
          <div className="hw-wrap">
            <Wp r="H-12" right="Read-only">Not ready for a demo?</Wp>
            <div className="tt-books-g">
              <div data-reveal="">
                <h2 id="tt-books-h">Check your books <span className="tt-circ" data-play="">free.<Circle /></span></h2>
                <p className="tt-books-p">Connect Xero or QuickBooks. See what Hysaab finds in about a minute. Read‑only.</p>
                <a className="hw-btn hw-btn--navy m-cta m-magnetic" href="/check"><SwapLabel text="Check my books" /> <span aria-hidden="true">→</span></a>
              </div>
              <div className="tt-tape" aria-label="Example Books Check findings, sample data">
                <p className="tt-tape-hd">BOOKS CHECK · SAMPLE<br />Read-only · 00:58</p>
                <p><span>Same supplier bill twice</span><span>March</span><Tm m="T" /></p>
                <p><span>5% VAT on zero-rated export</span><span>held</span><Tm m="✓" /></p>
                <p><span>Payroll missed, then doubled</span><span>Jan–Feb</span><Tm m="B" /></p>
                <p><span>Accrual never unwound</span><span>Dec</span><Tm m="T" /></p>
                <p><span>Journal with no support</span><span>JE-0098</span><Tm m="?" /></p>
                <p className="tt-tape-ft">Findings drawn from the agents’ examples on this page. Sample data.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── H-13 Book a demo (enquiry form) ── */}
        <section className="tt-sec tt-grid hw-conversation tt-conversation" id="conversation" data-open="0">
          <span id="contact" className="hw-anchor" aria-hidden="true" />
          <span id="cohort" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap">
            <Wp r="H-13" right="A person replies">A conversation, not a sales deck</Wp>
            <div className="hw-conversation-grid" data-reveal="stagger-lg">
              <div>
                <h2 className="tt-h2">Book a <span className="tt-hl" data-play="">demo.</span></h2>
                <p className="tt-lead">Tell us who you are and what takes too long.<br />We will show you where Hysaab fits.</p>
                <p className="hw-demo-direct">Prefer to pick a time yourself? <a className="tt-link" {...DEMO}>Choose a slot in our calendar <span aria-hidden="true">↗</span>{newTab}</a></p>
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
          </div>
        </section>
      </main>

      <SiteFooter home />
    </div>
  );
}

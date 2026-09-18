/* ── hysaab.ai homepage ──────────────────────────────────────────────
   The navy, peach and sage design from the approved build pack
   (CLAUDE-BUILD-PACK.md). Copy is the approved wording. Styles live in
   app/hysaab-home.css (hw-*). The walkthrough and hero captures are
   genuine workspace screens (sample dataset): see lib/home-moments.ts.
   The previous homepage is kept at backups/home-v2-2026-09.page.tsx.bak. */

import { Wordmark } from "@/components/Wordmark";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Capture } from "@/components/home/Capture";
import { EnquiryForm, InterestLink } from "@/components/home/EnquiryForm";
import { loadMoments, loadHeroCapture } from "@/lib/home-moments";
import { langAlternates } from "@/lib/site-meta";
import { Demo } from "@/components/hysaab/Demo";
import { SiteFooter } from "@/components/home/SiteFooter";
import { LaunchNotice } from "@/components/home/LaunchNotice";
import { TEAM } from "@/lib/team";

/* ── Live ticker rows: kept from the previous homepage, unchanged ── */
const TICKER: { t: string; who: string; msg: string; ask?: boolean }[] = [
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

export const metadata = {
  title: "AI Accounting Software for UAE & Saudi Businesses | Hysaab",
  description:
    "An accounting and reporting team for Gulf businesses: invoices coded and tax-tested, the close prepared, decisions kept with you. Built in Dubai.",
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
            <div className="hw-hero-copy">
              <p className="hw-eyebrow hw-eyebrow--dot"><span className="hw-dot" aria-hidden="true" /> Quiet diligence, every morning</p>
              <h1>Your books<br />in order.<br /><span>Your mind on<br />what’s next.</span></h1>
              <p className="hw-intro">The books, prepared.<br />The decisions, yours.</p>
              <p className="hw-hero-desc">Meet Hysaab. An accounting and reporting team for Gulf businesses — built on evidence, professional judgement and the human oversight your books deserve. Send a document or ask a question on WhatsApp. Hysaab takes it from there.</p>
              <div className="hw-actions">
                <a className="hw-btn hw-btn--peach" href="#conversation">Book a walkthrough <span aria-hidden="true">↗</span></a>
                <a className="hw-link hw-link--light" href="#experience"><span className="hw-play" aria-hidden="true">▷</span> See how it works</a>
              </div>
              <LaunchNotice />
              <p className="hw-origin"><span aria-hidden="true">✳</span> Built in Dubai. Fluent in your working day.</p>
            </div>
            <div className="hw-proof">
              <p className="hw-eyebrow">Your finance team. One conversation away.</p>
              <h2>It starts with<br />a WhatsApp.</h2>
              <p className="hw-proof-p">Send the invoice. Ask the question.<br />Keep moving.</p>
              <Capture moment={hero} priority />
              {hero.ready && <p className="hw-proof-note">{hero.caption}</p>}
            </div>
          </div>
        </section>

        {/* ── On this page (secondary navigation; the header is global) ── */}
        <nav className="hw-subnav" aria-label="On this page">
          <div className="hw-wrap hw-subnav-in">
            <a href="#experience"><span className="hw-mono">01</span>The experience</a>
            <a href="#control"><span className="hw-mono">02</span>Your control</a>
            <a href="#ways"><span className="hw-mono">03</span>Ways to work</a>
            <a href="#team"><span className="hw-mono">04</span>The team</a>
            <a href="#products"><span className="hw-mono">05</span>Our products</a>
          </div>
        </nav>

        {/* ── Statement strip ── */}
        <div className="hw-band">
          <div className="hw-wrap hw-band-in">
            <p>Your accounting system holds the records.<br /><strong>Hysaab makes sense of them.</strong></p>
            <p className="hw-band-note">Documents arrive.<br />Answers follow.<br /><span>You stay in control.</span></p>
            <span className="hw-band-symbol" aria-hidden="true">↗</span>
          </div>
        </div>

        {/* ── Live from the agents (unnumbered) ── */}
        <section className="hw-live" id="live">
          <div className="hw-wrap hw-live-grid">
            <div className="hw-live-copy">
              <p className="hw-eyebrow">While you were away</p>
              <h2>One night<br />on a set of books.</h2>
              <p>Every document read, every line matched, every reminder sent. And the one call that is yours, waiting for you in the morning.</p>
              <p className="hw-live-note">An illustrative night. Names and figures are examples, not results.</p>
            </div>
            <div className="hy-ticker hw-live-ticker" aria-label="Live from the agents">
              <div className="hy-ticker-head">
                <span className="hy-ticker-dot" aria-hidden="true" />
                <span className="hy-ticker-kicker">Live from the agents</span>
                <span className="hy-ticker-when">Tonight · Dubai</span>
              </div>
              <div className="hy-ticker-body">
                <div className="hy-ticker-scroll">
                  {[false, true].map((dup) => (
                    <ul className="hy-ticker-list" key={String(dup)} aria-hidden={dup || undefined}>
                      {TICKER.map((r) => (
                        <li className={`hy-ticker-row${r.ask ? " hy-ticker-row--ask" : ""}`} key={r.t + r.who}>
                          <span className="hy-ticker-t">{r.t}</span>
                          <span className="hy-ticker-msg"><strong>{r.who}</strong> {r.msg}</span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
                <div className="hy-ticker-fade" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* ── 01 How it works ── */}
        <section className="hw-work" id="how-it-works">
          <div className="hw-wrap hw-section">
            <div className="hw-heading">
              <div>
                <p className="hw-eyebrow">How it works</p>
                <h2>Just chat.<br />Hysaab gets to work.</h2>
              </div>
              <p>We help connect your books and agree the approval rules. Then your everyday starting point is WhatsApp. The workspace is there when you want to look closer.</p>
            </div>
            <div className="hw-workflow">
              <article>
                <div className="hw-workflow-top"><span className="hw-icon" aria-hidden="true">↳</span><span className="hw-mono">01</span></div>
                <h3>You send a message.</h3>
                <p>A receipt, an invoice, or a question about your numbers. No report builder to learn.</p>
                <span className="hw-workflow-foot">WhatsApp → Hysaab</span>
              </article>
              <article>
                <div className="hw-workflow-top"><span className="hw-icon" aria-hidden="true">≋</span><span className="hw-mono">02</span></div>
                <h3>Hysaab prepares the work.</h3>
                <p>Documents are checked, entries prepared and exceptions brought back with a clear explanation.</p>
                <span className="hw-workflow-foot">Preparation → Review</span>
              </article>
              <article>
                <div className="hw-workflow-top"><span className="hw-icon" aria-hidden="true">↗</span><span className="hw-mono">03</span></div>
                <h3>You make the decisions.</h3>
                <p>Answer a question or review an approval. Your limits still apply, and the reasoning stays with the books.</p>
                <span className="hw-workflow-foot">Your call → A clear record</span>
              </article>
            </div>
          </div>
        </section>

        {/* ── 02 Five moments: the interactive demo, as on the previous homepage ── */}
        <section id="experience" className="hw-experience">
          <div className="hw-wrap hw-section">
            <div className="hw-heading">
              <div>
                <p className="hw-eyebrow">Five moments in your working day</p>
                <h2>One conversation.<br /><span>From receipt to report.</span></h2>
              </div>
              <p>Follow one invoice through five moments, from a photo at 9pm to a locked period. It replays on its own; click any moment or tab to take the controls.</p>
            </div>
            <Demo />
            <p className="hw-disclosure">Illustrative scenario. Rashid runs a trading company; Layla is his CFO; Noor keeps the books. The numbers are examples, not results.</p>

            <div className="hw-shots">
              <h3>Inside the real workspace.</h3>
              <div className="hw-shots-grid">
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

        {/* ── 03 Your control ── */}
        <section className="hw-control" id="control">
          <div className="hw-wrap hw-section hw-control-grid">
            <div>
              <p className="hw-eyebrow">Your control</p>
              <h2>Your judgement.<br />Your boundaries.<br /><span>Always.</span></h2>
              <p>Good tools make finance easier to oversee.<br />Not harder to explain.</p>
              <a className="hw-link hw-link--peach" href="#conversation">Talk through your controls <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hw-principles">
              <article>
                <span className="hw-mono">01</span>
                <div><h3>Every answer, traceable.</h3><p>Inspect the entries and documents behind every answer. An explanation you can verify is worth more than one you are asked to trust.</p></div>
              </article>
              <article>
                <span className="hw-mono">02</span>
                <div><h3>Know where to stop.</h3><p>Approval gates, period locks and non-negotiable controls remain in place. Convenience is never a reason to bypass a safeguard.</p></div>
              </article>
              <article>
                <span className="hw-mono">03</span>
                <div><h3>Leave a clear record.</h3><p>The recommendation, the decision taken and the reasoning behind it — all visible, all stored. Context belongs with the books, not in a separate thread.</p></div>
              </article>
            </div>
          </div>
        </section>

        {/* ── 04 Ways to work ── */}
        <section id="ways" className="hw-ways">
          <div className="hw-wrap hw-section">
            <div className="hw-heading">
              <div>
                <p className="hw-eyebrow">Ways to work</p>
                <h2>Your team, extended.</h2>
              </div>
              <p>Keep the work in-house, or bring our people in. Begin with the process that needs the most attention.</p>
            </div>
            <div className="hw-ways-grid">
              <article>
                <p className="hw-eyebrow">For your existing finance team</p>
                <h3>Run it with your people.</h3>
                <p>Your finance team uses Hysaab to prepare the books, investigate exceptions and stay close to the numbers.</p>
                <ul>
                  <li>Your people review and approve</li>
                  <li>Start with a defined accounting workflow</li>
                  <li>Keep judgement inside your team</li>
                </ul>
                <InterestLink interest="Own team">Discuss your team’s workflow <span aria-hidden="true">↗</span></InterestLink>
              </article>
              <article>
                <p className="hw-eyebrow">For businesses that want more support</p>
                <h3>Bring our people in.</h3>
                <p>Work alongside qualified accountants who manage the workflows, review exceptions and prepare each close with you.</p>
                <ul>
                  <li>A named human point of contact</li>
                  <li>Agree the scope and responsibilities together</li>
                  <li>You retain the decisions that are yours</li>
                </ul>
                <InterestLink interest="Managed support">Discuss managed support <span aria-hidden="true">↗</span></InterestLink>
              </article>
            </div>
            <div className="hw-fit">
              <span className="hw-mono">Before we start</span>
              <p>We confirm your accounting system, entities, scope and fees upfront. A clear fit comes before any commitment.</p>
            </div>
          </div>
        </section>

        {/* ── The people (unnumbered) ── */}
        <section id="team" className="hw-team">
          <div className="hw-wrap hw-section">
            <div className="hw-heading">
              <div>
                <p className="hw-eyebrow">The team</p>
                <h2>The people behind Hysaab.<br /><span>Named, not anonymous.</span></h2>
              </div>
              <p>Hysaab is built and run by Oblique Consult and Simpla. These are the people managing it. Behind them are the accountants and engineers of both firms, who do the day-to-day work on your books.</p>
            </div>
            <div className="hw-team-grid">
              {TEAM.map((p) => (
                <article key={p.name}>
                  <span className="hw-team-initials" aria-hidden="true">{p.initials}</span>
                  <h3>{p.name}</h3>
                  <p className="hw-team-role">{p.role} · {p.org}</p>
                  {p.bio && <p>{p.bio}</p>}
                  <a href={p.href} target="_blank" rel="noopener">{p.linkLabel} <span aria-hidden="true">↗</span></a>
                </article>
              ))}
            </div>
            <div className="hw-note">
              <span className="hw-mono">How the work is done</span>
              <p>Hysaab prepares entries, accruals and reports. Under the managed service, accountants from the Oblique Consult team review exceptions, correct where necessary and prepare the close with you, with a named accountant as your point of contact; you keep the approvals that are yours. Roles and prior experience above are as published by <a href="https://obliqueconsult.com/about-us" target="_blank" rel="noopener">Oblique Consult</a> and on the individuals’ public profiles.</p>
            </div>
          </div>
        </section>

        {/* ── 05 The Hysaab family ── */}
        <section id="products" className="hw-products">
          <span id="family" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap hw-section">
            <div className="hw-heading">
              <div>
                <p className="hw-eyebrow">The Hysaab family</p>
                <h2>Better together.<br /><span>Useful on their own.</span></h2>
              </div>
              <p>Accounting, invoice checks, firm operations, audit and finance talent. Complementary products from the same team, each with a clear job to do.</p>
            </div>
            <div className="hw-family">
              <article className="hw-family-primary">
                <p className="hw-eyebrow">Accounting &amp; reporting · Early access</p>
                <h3><Wordmark size={50} ground="navy" /></h3>
                <p>Your day-to-day accounting and reporting, with human judgement where it matters.</p>
                <a className="hw-link hw-link--peach" href="#experience">Explore Hysaab <span aria-hidden="true">↗</span></a>
              </article>
              <article>
                <p className="hw-eyebrow">Invoice processing · Available</p>
                <h3>hysaab invoice</h3>
                <p>Read and check supplier invoices, with duplicate detection and reasons for items held for review.</p>
                <a className="hw-link" href="/invoice">Explore Invoice <span aria-hidden="true">↗</span></a>
              </article>
              <article>
                <p className="hw-eyebrow">Firm operations · Coming soon</p>
                <h3>hysaab services OS</h3>
                <p>Client engagements, deadlines and oversight for professional services firms, together in one place.</p>
                <a className="hw-link" href="/firms">Explore Services OS <span aria-hidden="true">↗</span></a>
              </article>
              <article>
                <p className="hw-eyebrow">Audit · Coming soon</p>
                <h3>hysaab audit</h3>
                <p>Audit preparation and evidence inside Services OS. Licensed professionals retain the conclusions and opinion.</p>
                <a className="hw-link" href="/audit">Explore Audit <span aria-hidden="true">↗</span></a>
              </article>
              <article>
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
          {/* Inner pages still link to /#contact and /#cohort. */}
          <span id="contact" className="hw-anchor" aria-hidden="true" />
          <span id="cohort" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap hw-conversation-grid">
            <div>
              <p className="hw-eyebrow">A conversation, not a sales deck</p>
              <h2>Let’s start<br />with your books.</h2>
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

import { MgNav, MgFooter } from "@/components/MgChrome";
import { Wordmark } from "@/components/Wordmark";
import { Demo } from "@/components/hysaab/Demo";
import { CohortForm } from "@/components/hysaab/CohortForm";
import { StickyBar } from "@/components/hysaab/StickyBar";
import { getSeatsTaken, FOUNDING_SEATS, LAUNCH_DATE_SHORT } from "@/lib/launch";
import { langAlternates } from "@/lib/site-meta";
import { GUIDES } from "@/lib/guides";
import { TOOLS } from "@/lib/tools";

export const revalidate = 60;

export const metadata = {
  title: "AI Accounting Software for UAE & Saudi Businesses | Hysaab",
  description:
    "AI accounting software for UAE and Saudi businesses. Sixteen AI agents read, code, reconcile and report against FTA and ZATCA rules, and bring you the decisions that are yours. Built in Dubai.",
  alternates: langAlternates("/"),
};

/* ── Live ticker rows (hero, right column) ───────────────────────── */
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

const AGENTS: { h: string; p: React.ReactNode; tone?: "cream" | "navy" }[] = [
  { h: "Document intake", p: "Reads invoices, receipts and statements from any channel, organises them and identifies duplicates." },
  { h: "Coding", p: "Proposes accounts and classifications from your own history. Asks when it is less than sure." },
  { h: "Reconciliation", p: "Matches bank and ledger lines to their documents and surfaces the differences that remain." },
  { h: "Collections", p: "Prepares and sends reminders inside a cadence you approve once, and stops when a customer replies." },
  { h: "Close preparation", p: "Accruals, recurring entries, schedules and the list of what is still outstanding." },
  { h: "Reporting", p: "Produces supported reports and explains what moved, with every figure traceable to its source." },
  { h: "Tax checks", p: <>Tests every invoice against the tax-invoice rules and the October 2026 recovery changes, and holds input VAT that would not survive an audit. <a href="/guides/uae-vat-cabinet-decision-149-2026-input-tax">What changed →</a></> },
  { h: "Ask anything", p: "Answers plain questions about your own numbers, and shows the entries behind the answer." },
  { h: "Where it stops", p: "No agent crosses a period lock, changes an approval rule or claims tax you have not cleared.", tone: "cream" },
  { h: "Duplicate watch", p: "Catches the same bill twice: the supplier copy, the forwarded PDF and the WhatsApp photo." },
  { h: "Variance watch", p: "Notices price creep and unit-cost drift before a renewal date passes." },
  { h: "Sixteen in the roster", p: <>Depreciation, schedules, payment runs and more. <a href="/product">Meet the full team →</a></>, tone: "navy" },
];

const VOICES = [
  { who: "The CFO", q: "“I moved the shared-service queue to agents. My team moved to the decisions.”", p: "Layla runs finance for a 40-person contractor. Intake, coding, matching and reminders now run without her. Her people review the exceptions, own the approvals and spend month-end on the numbers, not the entries.", wants: "Wants: accuracy, throughput, segregation of duties, a transition plan she can defend.", link: ["#ways", "See the managed service →"] },
  { who: "The owner", q: "“I send a photo. In the morning I know where the money is.”", p: "Rashid runs a trading company and has never opened an accounting system. He WhatsApps receipts, glances at money in, money out and what is owed, and reads one plain report a month.", wants: "Wants: clean books, a simple report, no chasing, no spreadsheets.", link: ["#ways", "See the self-serve workflows →"] },
  { who: "The accountant", q: "“I stopped keying and started checking. The work got better, and so did I.”", p: "Noor kept the books by hand for six years. Now she reviews what the agents propose, corrects the few that miss, and the corrections teach the coding agent for next time. Her month-end finishes on day two.", wants: "Wants: a clear queue, evidence on every line, credit for judgement.", link: ["#agents", "What changes day to day →"] },
];

export default async function Page() {
  const taken = await getSeatsTaken();
  const next = taken + 1;
  const redact = (w: number) => <span className="hy-redact" style={{ width: `${w}em` }} aria-label="name withheld" />;

  return (
    <div className="hy-page">
      <MgNav home />

      <main>
        {/* ── 2. Split hero ── */}
        <section id="top" className="hy-hero">
          <div className="hy-wrap hy-hero-grid">
            <div className="hy-hero-copy">
              <span className="hy-kicker hy-kicker--blush">AI accounting &amp; reporting · UAE &amp; GCC</span>
              <h1 className="hy-hero-h1">Close the month in days. Take your evenings back.</h1>
              <p className="hy-hero-p">Your accounting and reporting team, always on. Sixteen agents read every document, code every entry, reconcile every bank line and rebuild your reports overnight. Then they bring you the two or three calls that are yours to make.</p>
              <div className="hy-hero-cta">
                <a href="#cohort" className="hy-btn hy-btn--blush hy-btn--lg">Join the waitlist →</a>
                <a href="#demo" className="hy-btn hy-btn--outline-cream hy-btn--lg">Try the product</a>
              </div>
              <div className="hy-stats">
                <div className="hy-stat"><span className="hy-stat-n hy-num">16</span><span className="hy-stat-l">agents on your books</span></div>
                <div className="hy-stat"><span className="hy-stat-n hy-num">2 days</span><span className="hy-stat-l">typical close in the cohort</span></div>
                <div className="hy-stat"><span className="hy-stat-n hy-num">40k+</span><span className="hy-stat-l">documents a month, read and filed</span></div>
              </div>
            </div>

            <div className="hy-ticker" aria-label="Live from the agents">
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

        {/* ── 3. Story + interactive demo ── */}
        <section id="story" className="hy-story hy-section hy-rule-b">
          <div className="hy-wrap">
            <div className="hy-story-head">
              <div className="hy-story-title">
                <span className="hy-kicker">One invoice, one night, one close</span>
                <h2 className="hy-h2 hy-h2--wide">Follow a single invoice from a 9pm photo to a locked period.</h2>
              </div>
              <span className="hy-story-note">Illustrative scenario. Rashid runs a trading company; Layla is his CFO; Noor keeps the books. The numbers are examples, not results.</span>
            </div>
            <Demo />
          </div>
        </section>

        {/* ── 4. Agents ── */}
        <section id="agents" className="hy-agents hy-section">
          <div className="hy-wrap">
            <div className="hy-agents-head">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span className="hy-kicker hy-kicker--navy">Meet your agents</span>
                <h2 className="hy-h2">Sixteen specialists. No new headcount.</h2>
              </div>
              <p className="hy-agents-p">One agent, one workflow, one set of limits you set. Each explains itself, shows its evidence, and hands you the call the moment judgement is needed. No black box, no surprises in the ledger.</p>
            </div>
            <div className="hy-agents-grid">
              {AGENTS.map((a) => (
                <div className={`hy-agent${a.tone ? ` hy-agent--${a.tone}` : ""}`} key={a.h}>
                  <span className="hy-agent-h">{a.h}</span>
                  <span className="hy-agent-p">{a.p}</span>
                </div>
              ))}
            </div>
            <div className="hy-contract">
              {[
                ["What work it handles", "One named workflow per agent. Never “everything”."],
                ["What it produces", "An entry, a match, a reminder or a report, with commentary."],
                ["When it asks for help", "Below your confidence threshold, or outside its approval limit."],
                ["How you check it", "Every action logged, every figure traceable to its document."],
              ].map(([h, p]) => (
                <div className="hy-contract-cell" key={h}><span className="hy-contract-h">{h}</span><span className="hy-contract-p">{p}</span></div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Voices ── */}
        <section id="voices" className="hy-voices hy-section hy-rule-b">
          <div className="hy-wrap">
            <div className="hy-voices-head">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span className="hy-kicker">Who it&apos;s for</span>
                <h2 className="hy-h2">Three people, one set of books.</h2>
              </div>
              <span className="hy-note">Illustrative voices from the scenario above.</span>
            </div>
            <div className="hy-voices-grid">
              {VOICES.map((v) => (
                <div className="hy-voice" key={v.who}>
                  <span className="hy-voice-who">{v.who}</span>
                  <span className="hy-voice-q">{v.q}</span>
                  <span className="hy-voice-p">{v.p}</span>
                  <span className="hy-voice-wants">{v.wants}</span>
                  <a href={v.link[0]} className="hy-ulink">{v.link[1]}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5b. Two ways to run Hysaab ── */}
        <section id="ways" className="hy-ways hy-section hy-rule-b">
          <div className="hy-wrap">
            <div className="hy-ways-head">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span className="hy-kicker">Two ways to run Hysaab</span>
                <h2 className="hy-h2">Run it yourself, or have it run with you.</h2>
              </div>
              <p className="hy-ways-p">The same agents, the same ledger, two levels of involvement. Priced by the complexity of your books, not by seats. A person is in the loop either way: yours, ours, or both.</p>
            </div>
            <div className="hy-ways-grid">
              <div className="hy-way">
                <div className="hy-way-top">
                  <span className="hy-way-for">For owners and small businesses</span>
                  <span className="hy-way-chip">Use it on your own</span>
                </div>
                <span className="hy-way-h">Self-serve</span>
                <span className="hy-way-tag">Automated workflows for your business.</span>
                <p className="hy-way-p">Connect your ledger, send your documents, and the essential workflows run on their own: intake, coding, bank matching, reminders and one plain report a month. You approve the few calls that need you. Nobody else touches your books.</p>
                <ul className="hy-way-list">
                  <li><strong>Included</strong><span>The core workflows, one entity, standard reports, the decision queue.</span></li>
                  <li><strong>Your part</strong><span>Send documents. Answer the two or three questions a week the agents cannot settle alone.</span></li>
                  <li><strong>Limits</strong><span>Essential workflows only. When the books outgrow it, move up without moving out.</span></li>
                </ul>
                <a href="#cohort" className="hy-btn hy-btn--navy hy-btn--lg hy-way-cta">Join the waitlist →</a>
              </div>
              <div className="hy-way hy-way--navy">
                <div className="hy-way-top">
                  <span className="hy-way-for">For CFOs and finance teams</span>
                  <span className="hy-way-chip hy-way-chip--blush">We run it with you</span>
                </div>
                <span className="hy-way-h">Managed service</span>
                <span className="hy-way-tag">Your accounting and reporting, managed.</span>
                <p className="hy-way-p">Everything in Self-serve, with our accountants running the agents on your books. We review the exceptions, correct where necessary, prepare the close and report to you and your board. Every judgement call passes a person before it reaches the ledger.</p>
                <ul className="hy-way-list">
                  <li><strong>Included</strong><span>Every workflow, multi-entity, custom reports, a named accountant, the close run for you.</span></li>
                  <li><strong>Humans in the loop</strong><span>We manage, report and correct. You keep the approvals that are yours: limits, locks, sign-off.</span></li>
                  <li><strong>Built together</strong><span>What we learn on your books becomes product. You see the improvement first, and it is yours to keep.</span></li>
                </ul>
                <a href="#contact" className="hy-btn hy-btn--blush hy-btn--lg hy-way-cta">Book a demo →</a>
              </div>
            </div>
            <div className="hy-ways-foot">
              <span><strong>Start small, grow into managed.</strong> Same workspace, same history. Nothing is re-keyed when you move.</span>
              <span><strong>Complexity, not seats.</strong> Pricing follows the number of entities, banks and documents, never the number of people who log in.</span>
            </div>
          </div>
        </section>

        {/* ── 6. Why we built Hysaab ── */}
        <section id="why" className="hy-whysec">
          <div className="hy-wrap hy-why-grid">
            <div className="hy-why-copy">
              <span className="hy-kicker hy-kicker--blush">Why we built Hysaab</span>
              <h2 className="hy-h2 hy-h2--why">We lived the close. Then we decided nobody should have to.</h2>
              <p>We spent years inside finance functions in Dubai: in shared-service centres, in the finance teams of contractors and traders, in the back offices of firms that closed the books for others. The pattern was the same everywhere. Twenty working days of a month, then five nights of catching up on them.</p>
              <p>Receipts in a drawer. A supplier&apos;s invoice keyed three times by three people. A bank line nobody could explain, carried forward because the deadline came first. A VAT return filed with a knot in the stomach. Good accountants doing work that did not need an accountant, and no time left for the work that did.</p>
              <p>Software did not fix it. Every system we used still waited for a person to type. So we built the person&apos;s shift instead: agents that read, code, match and prepare all month, and stop for a human exactly where a human should be. The name is the Arabic <span className="hy-ar" lang="ar">حساب</span>, account and reckoning. It is a Gulf company, built for how business is actually done here.</p>
            </div>
            <div className="hy-beliefs">
              <div className="hy-belief"><span className="hy-belief-l">What we believe</span><span className="hy-belief-p">Accuracy is a design choice. Every number should be able to show its source.</span></div>
              <div className="hy-belief"><span className="hy-belief-p">Control stays with people. Agents work inside limits; they do not set them.</span></div>
              <div className="hy-belief"><span className="hy-belief-p">Speed is continuous. The close is a review, not an event.</span></div>
              <div className="hy-belief hy-belief--promise"><span className="hy-belief-l">Our promise</span><span className="hy-belief-p">Clear, dependable, human accounting. We will only claim what we can show you in your own ledger.</span></div>
            </div>
          </div>
        </section>

        {/* ── 7. Product family ── */}
        <section id="family" className="hy-family hy-section hy-rule-b">
          <div className="hy-wrap" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <span className="hy-kicker">Our products</span>
            <h2 className="hy-h2">Four products. Each stands on its own.</h2>
            <p className="hy-family-p">Hysaab is the accounting and reporting product. hysaab invoice reads and checks invoices on its own, hysaab services OS runs a professional services firm and carries hysaab audit, the ISA audit file, and Ibtidah finds the finance people. All four are built in Dubai by the same team, with a person in the loop on every judgement call.</p>
            <div className="hy-family-grid">
              <div className="hy-product hy-product--navy">
                <span className="hy-product-l">AI accounting &amp; reporting</span>
                <span className="hy-product-title"><Wordmark size={27} ground="navy" suffix={false} /></span>
                <span className="hy-product-p">Sixteen agents read every document, code every entry, reconcile every bank line and rebuild your reports overnight, then bring you the two or three calls that are yours. The close takes days, not weeks, and every figure can show its source. <strong>Early access</strong>.</span>
                <a href="#cohort" className="hy-ulink hy-ulink--cream">Join the waitlist →</a>
              </div>
              <div className="hy-product">
                <span className="hy-product-l">Invoice processing &amp; checks</span>
                <span className="hy-product-title"><a href="/invoice" className="hy-product-h">hysaab invoice</a></span>
                <span className="hy-product-p">Send a supplier invoice by WhatsApp, email or upload. It comes back read, coded and tested against the tax-invoice rules and the October 2026 recovery changes, with duplicates caught, the input VAT you can safely claim, and a stated reason for anything held. <strong>Available</strong>.</span>
                <a href="/invoice" className="hy-ulink">See hysaab invoice →</a>
              </div>
              <div className="hy-product">
                <span className="hy-product-l">Professional services platform</span>
                <span className="hy-product-title"><a href="/firms" className="hy-product-h">hysaab services OS</a></span>
                <span className="hy-product-p">The operating system for a professional services firm: client work, engagements, deadlines and oversight in one place, supercharged by AI so partners and staff spend their hours on judgement and clients, not on admin. Its audit module, <a href="/audit">hysaab audit</a>, runs a full ISA audit file. <strong>Coming soon</strong>.</span>
                <a href="/firms" className="hy-ulink">See hysaab services OS →</a>
              </div>
              <div className="hy-product">
                <span className="hy-product-l">Hiring platform</span>
                <span className="hy-product-title"><a href="/hire" className="hy-product-h">Ibtidah</a></span>
                <span className="hy-product-p">Finance recruitment that tests the work, not the CV. AI reads and questions every candidate; finance professionals decide who reaches the shortlist. Three to five people you can trust, instead of thirty interviews. <strong>Available</strong>.</span>
                <a href="https://ibtidah.ae" target="_blank" rel="noopener" className="hy-ulink">ibtidah.ae →</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7b. Guides and calculators ── */}
        <section id="resources" className="hy-resources hy-section hy-rule-b">
          <div className="hy-wrap">
            <div className="hy-voices-head">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span className="hy-kicker">Guides and calculators</span>
                <h2 className="hy-h2">The reference shelf, written by the people who built the agents.</h2>
              </div>
              <span className="hy-note" style={{ maxWidth: 360 }}>Plain-language guides to UAE and KSA tax and accounting, and calculators that show their working. Free, no sign-up.</span>
            </div>
            <div className="hy-res-grid">
              <div className="hy-res-col">
                <div className="hy-res-col-h"><span className="hy-res-col-t">Guides</span><span className="hy-res-count hy-num">{GUIDES.length} articles</span></div>
                <ul className="hy-res-list">
                  {GUIDES.slice(0, 6).map((g) => (
                    <li key={g.slug}><a href={`/guides/${g.slug}`}><span>{g.title}</span><span aria-hidden="true">→</span></a></li>
                  ))}
                </ul>
                <a href="/guides" className="hy-ulink">All guides →</a>
              </div>
              <div className="hy-res-col">
                <div className="hy-res-col-h"><span className="hy-res-col-t">Calculators</span><span className="hy-res-count hy-num">{TOOLS.length} tools</span></div>
                <ul className="hy-res-list">
                  {TOOLS.slice(0, 6).map((t) => (
                    <li key={t.slug}><a href={`/tools/${t.slug}`}><span>{t.title}</span><span aria-hidden="true">→</span></a></li>
                  ))}
                </ul>
                <a href="/tools" className="hy-ulink">All calculators →</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. Founding cohort ── */}
        <section id="cohort" className="hy-cohort hy-section">
          <div className="hy-wrap hy-cohort-grid">
            <div className="hy-cohort-copy">
              <span className="hy-kicker">Founding cohort</span>
              <h2 className="hy-h2">The first hundred set the pace.</h2>
              <p className="hy-cohort-p">One hundred companies join before the doors open on {LAUNCH_DATE_SHORT}, with founder pricing locked in for as long as you stay. Work email only. A real person reads every entry and replies.</p>
              <CohortForm seatsTaken={taken} />
              <span className="hy-note">Or <a href="#contact" style={{ borderBottom: "1px solid var(--hy-blush)" }}>book a demo</a> and we will walk your own ledger through it.</span>
            </div>
            <div className="hy-ledger" id="ledger">
              <span className="hy-label">Founding ledger · {taken} of {FOUNDING_SEATS} seats taken</span>
              <div className="hy-ledger-rows">
                <div className="hy-ledger-row"><span className="hy-ledger-n">{taken - 2}</span><span>{redact(6.5)} LLC · taken</span></div>
                <div className="hy-ledger-row"><span className="hy-ledger-n">{taken - 1}</span><span>{redact(5)} Contracting · taken</span></div>
                <div className="hy-ledger-row"><span className="hy-ledger-n">{taken}</span><span>{redact(4)} Group Advisory · taken</span></div>
                <div className="hy-ledger-row"><span className="hy-ledger-n">{next}</span><a href="#cohort" className="hy-ledger-you">your entry?</a></div>
                <div className="hy-ledger-row hy-ledger-row--faint"><span className="hy-ledger-n">{next + 1}</span><span>·</span></div>
                <div className="hy-ledger-row hy-ledger-row--faint"><span className="hy-ledger-n">⋮</span><span /></div>
                <div className="hy-ledger-row hy-ledger-row--faint"><span className="hy-ledger-n">{FOUNDING_SEATS}</span><span>doors open {LAUNCH_DATE_SHORT}</span></div>
              </div>
              <span className="hy-ledger-note">Founder pricing locked for the first hundred. Seats confirmed in the order accepted. Entries after the hundredth carry to the next cohort at standard pricing. Fair-usage policy applies.</span>
            </div>
          </div>
        </section>
      </main>

      <MgFooter />
      <StickyBar seatsTaken={taken} />
    </div>
  );
}

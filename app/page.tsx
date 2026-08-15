import "./advert.css";
import { LedgerForm } from "@/components/LedgerForm";
import { SmoothScroll } from "@/components/SmoothScroll";
import { NpEnhance } from "@/components/NpEnhance";
import { AgentFeed } from "@/components/AgentFeed";
import { Countdown } from "@/components/Countdown";
import { Mark, MgNav, MgFooter } from "@/components/MgChrome";
import { getNextSeat, FOUNDING_SEATS } from "@/lib/launch";

export const revalidate = 60;

export const metadata = {
  title: "Orbit — AI agents run your finance. You approve the calls.",
  description:
    "Sixteen agents read your invoices, code your ledger, watch your VAT and drive the close — and stop to ask you when it matters. Built in the Gulf, by accountants who lived every late night of it.",
};

/* ── The four steps ("How Orbit works") ─────────────────────────────
   Kept in data rather than inline so the mobile stack and the desktop
   4-col ruled grid read the same rows. */
const STEPS: { n: string; h: string; p: string }[] = [
  { n: "01", h: "Send anything, anyhow", p: "WhatsApp a photo, forward an email, drop a PDF. Orbit files it, de-duplicates it and starts reading." },
  { n: "02", h: "Agents read and code",   p: "Extraction, account coding from your own history, VAT checks and duplicate detection — in minutes, not month-end." },
  { n: "03", h: "You make the few calls", p: "Anything below your confidence threshold comes to you as a plain-language decision with the evidence attached." },
  { n: "04", h: "The period locks itself", p: "Accruals, depreciation and schedules post on time. When the checklist is green, you close and lock — done in days." },
];

/* ── The agent roster ────────────────────────────────────────────────
   Seven cells + one green cell that leads to the product page. */
const AGENTS: { h: string; p: string; green?: boolean }[] = [
  { h: "Coding agent", p: "Codes every line from your own posting history. Asks when it's less than sure." },
  { h: "Tax agent", p: "Tests every invoice against UAE Article 59 before VAT is claimed." },
  { h: "Accrual engine", p: "Learns each supplier's billing rhythm; proposes accruals when bills go missing." },
  { h: "Anomaly agent", p: "Watches unit prices and cadence; flags creep before renewal dates." },
  { h: "Bank-match agent", p: "Scores and matches every bank line to its document, to the decimal." },
  { h: "Schedules agent", p: "Releases prepayments and recurring journals on schedule, with commentary." },
  { h: "Collections agent", p: "Drafts and sends reminders on a cadence you approve once." },
  { h: "…and nine more", p: "Duplicates, depreciation, variances, intake, dispatch.", green: true },
];

const COMPLIANCE: { h: string; p: string }[] = [
  { h: "Article 59 tax-invoice test", p: "on every inbound invoice — TRN, rates, rounding." },
  { h: "E-invoicing ready", p: "ahead of the UAE mandate." },
  { h: "Period locks", p: "that agents cannot cross — locked means locked." },
  { h: "Full audit trail", p: "every action, human or agent, logged with evidence." },
];

export default async function Page() {
  const seat = await getNextSeat();

  return (
    <>
      <SmoothScroll />

      {/* ══════════════════════════════════════════════════════════════
          STICKY RULED NAV — shared modernist chrome (MgChrome). The
          Product link now goes to the real /product page.
          ══════════════════════════════════════════════════════════════ */}
      <MgNav />

      <main>
        {/* ══════════════════════════════════════════════════════════════
            SPLIT HERO — headline + stats on paper (left); a paper mock of
            the close cockpit with the 8px 8px 0 green offset shadow on an
            80px-column paper-raised ground (right). Ruled everywhere.
            On a phone the mock stacks below and the stats reflow.
            ══════════════════════════════════════════════════════════════ */}
        <section className="mg-hero">
          <div className="mg-hero-copy">
            <div className="mg-kicker">FINANCE OS · UAE &amp; GCC</div>
            <h1 className="mg-hero-h">AI agents run your finance. You approve the calls.</h1>
            <p className="mg-hero-p">Sixteen agents read your invoices, code your ledger, watch your VAT and drive the close — and stop to ask you when it matters. Plain answers, full evidence, every time.</p>
            <div className="mg-hero-cta">
              <a href="#join" className="mg-cta">Book a demo →</a>
              <a href="#how" className="mg-ghost">See how it works</a>
            </div>
            <div className="mg-stats">
              <div><div className="mg-stat-n">16</div><div className="mg-stat-l">agents on your books</div></div>
              <div><div className="mg-stat-n">93%</div><div className="mg-stat-l">journals posted untouched</div></div>
              <div><div className="mg-stat-n">3 days</div><div className="mg-stat-l">to a locked period</div></div>
            </div>
          </div>
          <div className="mg-hero-mock-slot">
            <div className="mg-mock">
              <div className="mg-mock-head">
                <Mark size={16} framed={false} strokeWidth={3} ringOnly />
                <span className="mg-mock-title">Close cockpit — June 2026</span>
                <span className="mg-mock-pct">68% COMPLETE</span>
              </div>
              <div className="mg-mock-body">
                <div className="mg-mock-bar"><div /></div>
                <div className="mg-mock-meta">
                  <span>Accruals · 2 awaiting you</span>
                  <span>VAT AED 118k due 28 Jul</span>
                </div>
                <div className="mg-mock-row">
                  <span className="mg-mock-tag mg-mock-tag-crit">CRITICAL</span>
                  <div><b>Two periods missing — Etisalat fibre.</b> Two seasonal accruals proposed, AED 2,150 each. <span className="mg-mock-cta">Confirm →</span></div>
                </div>
                <div className="mg-mock-row">
                  <span className="mg-mock-tag mg-mock-tag-crit">CRITICAL</span>
                  <div><b>Tax invoice missing TRN — Almarai.</b> AED 1,036 input VAT blocked until corrected. <span className="mg-mock-cta">Review →</span></div>
                </div>
                <div className="mg-mock-row mg-mock-row-done">
                  <span className="mg-mock-tag mg-mock-tag-done">DONE</span>
                  <div>Depreciation posted — all classes, AED 21,408 · Fixed assets agent</div>
                </div>
                <button type="button" className="mg-mock-lock">Close the period and lock</button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            LIVE FROM THE AGENTS — infinite marquee (kept in a client
            component so the animation and reduced-motion rule fire).
            ══════════════════════════════════════════════════════════════ */}
        <AgentFeed />

        {/* ══════════════════════════════════════════════════════════════
            HOW ORBIT WORKS — 4-step ruled grid, top-lined 2px ink.
            ══════════════════════════════════════════════════════════════ */}
        <section id="how" className="mg-section">
          <div className="mg-kicker">HOW ORBIT WORKS</div>
          <h2 className="mg-h2">From a photo of an invoice to a locked period.</h2>
          <div className="mg-steps">
            {STEPS.map((s) => (
              <div key={s.n} className="mg-step">
                <div className="mg-step-n">{s.n}</div>
                <div className="mg-step-h">{s.h}</div>
                <div className="mg-step-p">{s.p}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            THE ROSTER — 4×2 grid, one green cell in the corner.
            ══════════════════════════════════════════════════════════════ */}
        <section id="agents" className="mg-section">
          <div className="mg-roster-head">
            <div>
              <div className="mg-kicker">THE ROSTER</div>
              <h2 className="mg-h2">Sixteen specialists. Zero headcount.</h2>
            </div>
            <p className="mg-roster-lede">Each agent does one job, explains itself, and hands anything uncertain to you. A sample of the team:</p>
          </div>
          <div className="mg-roster">
            {AGENTS.map((a) => (
              <div key={a.h} className={a.green ? "mg-agent mg-agent-green" : "mg-agent"}>
                <div className="mg-agent-h">{a.h}</div>
                <div className="mg-agent-p">
                  {a.p}{a.green && <> <a href="/accounting" className="mg-agent-cta">Meet the full team →</a></>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            COMPLIANCE BAND — full-width ink, two columns. On a phone
            each item stacks and the copy shrinks — nothing narrower.
            ══════════════════════════════════════════════════════════════ */}
        <section id="compliance" className="mg-compliance">
          <div className="mg-compliance-copy">
            <div className="mg-kicker mg-kicker-on-ink">BUILT FOR THE FTA</div>
            <h2 className="mg-h2 mg-h2-on-ink">Compliance isn&rsquo;t a feature. It&rsquo;s the default.</h2>
            <p className="mg-compliance-p">Every document is tested against UAE VAT rules before a dirham moves. Every journal carries its agent&rsquo;s commentary and the source evidence. When the auditor asks, you hand over the trail — not a shoebox.</p>
          </div>
          <ul className="mg-compliance-list">
            {COMPLIANCE.map((c) => (
              <li key={c.h}><span className="mg-check">✓</span><div><b>{c.h}</b> {c.p}</div></li>
            ))}
          </ul>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            THE POSTER CTA — full-green wall, paper text, one primary
            (paper) + one ghost (paper-outlined). On a phone the display
            drops from 52 to 34 and the buttons stack.
            ══════════════════════════════════════════════════════════════ */}
        <section className="mg-poster">
          <h2 className="mg-poster-h">The close ends in days. Your evenings come back.</h2>
          <div className="mg-poster-cta">
            <a href="#join" className="mg-cta mg-cta-on-green">Book a demo →</a>
            <a href="/product" className="mg-ghost mg-ghost-on-green">Explore the product</a>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            THE FOUR PRODUCTS — moved to the page bottom so the homepage
            tells one product's story start to finish; the family is the
            coda, reachable from the header's "More products".
            ══════════════════════════════════════════════════════════════ */}
        <section id="products" className="mg-section">
          <div className="mg-kicker">THE ORBIT FAMILY</div>
          <h2 className="mg-h2">Four worlds. One universe.</h2>
          <div className="mg-worlds">
            <a href="/accounting" className="mg-world">
              <div className="mg-kicker mg-kicker-tight">ACCOUNTING</div>
              <div className="mg-world-h">Orbit</div>
              <p>Aisha forwards a supplier invoice from WhatsApp at 9pm. By sunrise it&rsquo;s coded from her own history, tested against the FTA&rsquo;s rules, matched to the bank line, and posted to Zoho — she never touched it.</p>
              <p className="mg-world-met">Month-end in 2 days, not 9 · 100% of lines VAT-tested · ~AED 4,200 of hidden VAT found a month.</p>
              <span className="mg-world-go">See Orbit →</span>
            </a>
            <a href="/hire" className="mg-world">
              <div className="mg-kicker mg-kicker-tight">HIRE</div>
              <div className="mg-world-h">Orbit Hire</div>
              <p>52 CVs land Tuesday morning. By lunch Orbit has read every one, scored them on your rubric, sealed the names and photos, and put three people on your desk to meet — Layla, Omar and Priya.</p>
              <p className="mg-world-met">50 CVs read in minutes, not a week · every candidate a real first interview · scoring you can defend.</p>
              <span className="mg-world-go">See Orbit Hire →</span>
            </a>
            <a href="/invoice" className="mg-world">
              <div className="mg-kicker mg-kicker-tight">INVOICE · TAX COMPLIANCE</div>
              <div className="mg-world-h">Orbit Invoice</div>
              <p>A folder of 214 supplier invoices lands at 9am. By 9:20 every one is read, its arithmetic re-checked in code, tested against the FTA&rsquo;s and ZATCA&rsquo;s rules, and risk-ranked — the nine that would fail an audit are flagged before the return is filed.</p>
              <p className="mg-world-met">Every invoice tax-tested · UAE &amp; KSA rules · risky VAT held before it&rsquo;s claimed.</p>
              <span className="mg-world-go">See Orbit Invoice →</span>
            </a>
            <a href="/firms" className="mg-world">
              <div className="mg-kicker mg-kicker-tight">FOR FIRMS · COMING SOON</div>
              <div className="mg-world-h">Orbit for Firms</div>
              <p>Every client, engagement and filing in one place. Rashid logs an hour to the ELC Group VAT engagement in a tap; the disbursement lands on the right client; realization per engagement, without a spreadsheet.</p>
              <p className="mg-world-met">Timesheets, project &amp; expense tracking, and the whole practice — organized.</p>
              <span className="mg-world-go">See Orbit for Firms →</span>
            </a>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            JOIN — the founding-cohort capture. Kept because it drives
            every conversion on the site today.
            ══════════════════════════════════════════════════════════════ */}
        <section id="join" className="mg-section">
          <div className="mg-kicker">JOIN THE FOUNDING COHORT</div>
          <h2 className="mg-h2">Come build the universe with us.</h2>
          <p className="mg-lede">
            This is bigger than software — it&rsquo;s a bet on what people do with their time when the busywork is gone. The first {FOUNDING_SEATS} companies get twelve months free, with founder pricing locked in after. Work email only — a real person reads every entry.
          </p>
          <div className="mg-join">
            <LedgerForm seat={seat} />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            THE CLOCK — the very last thing on the page: a ruled band
            counting down to 14 October (LAUNCH_AT drives it, so the
            timer and the copy can never disagree).
            ══════════════════════════════════════════════════════════════ */}
        <Countdown />
      </main>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER — flush strip: mark + wordmark, url, location, ©
          ══════════════════════════════════════════════════════════════ */}
      <MgFooter />

      <NpEnhance />
    </>
  );
}

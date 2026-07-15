import "./advert.css";
import { LedgerForm } from "@/components/LedgerForm";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteFooter } from "@/components/SiteChrome";
import { RotatingHeadline } from "@/components/RotatingHeadline";
import { NpEnhance } from "@/components/NpEnhance";
import { ProductNav } from "@/components/ProductNav";
import { getNextSeat, FOUNDING_SEATS } from "@/lib/launch";

export const revalidate = 60;

export const metadata = {
  title: "Orbit — the finance universe, in continuous motion",
  description:
    "We're taking the busywork out of finance, accounting and tax — the agents do the doing, the judgment stays yours. Three products, one mission. Built in the Gulf, by accountants who lived it.",
};

const ANTHEM: [string, string][] = [
  ["You spent a decade on judgment —", "not on chasing receipts at midnight."],
  ["The close should close itself.", "The thinking should stay yours."],
  ["You got into this to make sense —", "let's give you the time to."],
];

const WORLDS: { wk: React.ReactNode; h: string; ex: React.ReactNode; met: string; href: string; go: string }[] = [
  {
    wk: "ACCOUNTING", h: "Orbit",
    ex: <>Aisha forwards a supplier invoice from WhatsApp at 9pm. By sunrise it&rsquo;s coded from her own history, tested against the FTA&rsquo;s rules, matched to the bank line, and posted to Zoho — she never touched it.</>,
    met: "Month-end in 2 days, not 9 · 100% of lines VAT-tested · ~AED 4,200 of hidden VAT found a month.",
    href: "/accounting", go: "See Orbit →",
  },
  {
    wk: "HIRE", h: "Orbit Hire",
    ex: <>52 CVs land Tuesday morning. By lunch Orbit has read every one, scored them on your rubric, sealed the names and photos, and put three people on your desk to meet — Layla, Omar and Priya.</>,
    met: "50 CVs read in minutes, not a week · every candidate a real first interview · scoring you can defend.",
    href: "/hire", go: "See Orbit Hire →",
  },
  {
    wk: <>FOR FIRMS · <span className="soon">COMING SOON</span></>, h: "Orbit for Firms",
    ex: <>Every client, engagement and filing in one place. Rashid logs an hour to the ELC Group VAT engagement in a tap; the disbursement lands on the right client; realization per engagement, without a spreadsheet.</>,
    met: "Timesheets, project & expense tracking, and the whole practice — organized.",
    href: "/firms", go: "See Orbit for Firms →",
  },
];

export default async function Page() {
  const seat = await getNextSeat();
  return (
    <>
      <SmoothScroll />

      {/* ── HERO — the anthem ─────────────────────────────────────── */}
      <header className="hero-band on-ink np-hero" id="top">
        <div className="wrap">
          <ProductNav cta={{ label: "JOIN US", href: "#join" }} />
          <div style={{ paddingTop: 40 }}>
            <div className="microlabel hero-kicker">THE FINANCE UNIVERSE, IN CONTINUOUS MOTION</div>
            <RotatingHeadline items={ANTHEM} />
            <p className="hero-sub" style={{ maxWidth: 600 }}>
              We&rsquo;re taking the busywork out of finance, accounting and tax — the agents do the
              doing, the judgment stays yours. Built in the Gulf, by accountants who lived every
              late night of it.
            </p>
            <a className="np-scrollcue" href="#truth" aria-label="Read our story">
              <span className="tri">▶</span>
              <span className="lab">Why we built Orbit</span>
              <span className="chev" aria-hidden="true">↓</span>
            </a>
            <div className="hero-actions">
              <a className="cta" href="#join">Join the founding cohort</a>
              <a className="np-backlink" href="#worlds">or meet the three products →</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ── THE TRUTH ─────────────────────────────────────────────── */}
        <section className="np-act np-after-hero" id="truth" style={{ paddingTop: 110 }}>
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">THE TRUTH</div>
            <h2 className="np-head np-rise d1">We got into this to make sense of things. <span className="np-accent">Then the job changed.</span></h2>
            <p className="np-say np-rise d1">
              Every one of us became the person a business trusts with its numbers. Somewhere along
              the way the receipts, the reconciliations, the filing that&rsquo;s always due — they filled
              the days, then the nights, then the years. The judgment we trained a decade for got
              crowded out by work anyone could do. We built Orbit because that felt like a quiet
              waste, and we couldn&rsquo;t unsee it.
            </p>
          </div>
        </section>

        {/* ── THE MISSION ───────────────────────────────────────────── */}
        <section className="np-act np-band-ink">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">THE MISSION</div>
            <h2 className="np-head np-rise d1">Give the profession its time — <span className="np-accent">and its judgment — back.</span></h2>
            <p className="np-say np-rise d1">
              Take the busywork off the desk of every accountant, tax adviser and finance team — the
              coding, the matching, the chasing, the close — and automate it, end to end. The agents
              do the doing. The hours go where they belong: the advice, the calls, the strategy only
              a person can make.
            </p>
          </div>
        </section>

        {/* ── THE VISION ────────────────────────────────────────────── */}
        <section className="np-act">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">THE VISION</div>
            <h2 className="np-head np-rise d1">Finance isn&rsquo;t one job. <span className="np-accent">It&rsquo;s a universe of them.</span></h2>
            <p className="np-say np-rise d1">
              The books. The people you hire. The practice you run. We&rsquo;re bringing every corner of it
              into orbit — the doing handled by agents, the evidence shown, the last word always left
              to you. One family, one standard: the software does the work and shows its working; the
              judgment, and the relationship, stay yours.
            </p>
          </div>
        </section>

        {/* ── WHY WE'RE CALLED ORBIT — the name story ───────────────── */}
        <section className="np-act np-band-ink">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">WHY WE&rsquo;RE CALLED ORBIT</div>
            <h2 className="np-head np-rise d1">You stop chasing the work. <span className="np-accent">It orbits you.</span></h2>
            <p className="np-say np-rise d1">
              We called it Orbit because that&rsquo;s what good finance feels like when it finally works:
              everything you carry — the books, the people you hire, the practice you run — held in
              steady, continuous motion around you, without you having to push it.
            </p>
            <p className="np-say np-rise d1">
              Think about what an orbit actually is. Nothing falls; nothing flies off. It just keeps
              moving — reliably, quietly, held by a force you can&rsquo;t see. That&rsquo;s the job we handed
              the agents: keep the whole thing turning in the background — the coding, the reconciling,
              the chasing, the filing — automated, evidenced, never silent past the calls that need you.
            </p>
            <p className="np-say np-rise d1">
              You get to stand where you always belonged — <strong>at the centre, deciding.</strong>
            </p>
          </div>
        </section>

        {/* ── THE COMPOUNDING ───────────────────────────────────────── */}
        <section className="np-act">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">THE COMPOUNDING</div>
            <h2 className="np-head np-rise d1" style={{ maxWidth: "22ch" }}>Time, handed back, <span className="np-accent">compounds.</span></h2>
            <p className="np-say np-rise d1">
              An hour you get back isn&rsquo;t just an hour. Give it to a good accountant and it compounds —
              into advice that changes a client&rsquo;s year, a firm that grows without burning its people
              out, a life with evenings in it again. The ones who let go of the busywork won&rsquo;t work
              less. They&rsquo;ll pull ahead — because they finally get to think.
            </p>
          </div>
        </section>

        {/* ── FROM THE FOUNDER (SRW) ────────────────────────────────── */}
        <section className="why-band on-ink" style={{ marginTop: 0 }}>
          <div className="wrap">
            <div className="microlabel hero-kicker np-rise">FROM THE FOUNDER</div>
            <h2 className="why-head np-rise d1">I&rsquo;ve done<br />the midnights.</h2>
            <div className="why-cols np-rise d1">
              <p>
                I&rsquo;ve filed at 11:58. I&rsquo;ve watched brilliant people spend their best years on work a
                machine could do. So I built the colleague I always wished I had — one who does the
                grunt work, shows me exactly how, and hands the judgment back to me.
              </p>
              <p>
                That&rsquo;s all Orbit is. If you chose this work to <strong>think</strong>, and found
                yourself buried instead, we built this for you — and we&rsquo;re only getting started.
              </p>
            </div>
            <div className="why-sig np-rise">&mdash; SRW</div>
          </div>
        </section>

        {/* ── THE THREE WORLDS ──────────────────────────────────────── */}
        <section className="np-act" id="worlds">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">THE ORBIT FAMILY</div>
            <h2 className="np-head np-rise d1">Three worlds. <span className="np-accent">One universe.</span></h2>
            <p className="np-say np-rise d1">
              Three products, built to one standard — the busywork automated, the evidence shown, the
              judgment yours.
            </p>
            <div className="np-worlds np-rise d1">
              {WORLDS.map((w) => (
                <div key={w.h} className="np-world">
                  <div className="wk">{w.wk}</div>
                  <h3>{w.h}</h3>
                  <p className="ex">{w.ex}</p>
                  <p className="met">{w.met}</p>
                  <a className="go" href={w.href}>{w.go}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── JOIN ──────────────────────────────────────────────────── */}
        <section className="section wrap" id="join">
          <h2 className="section-head">Come build the universe with us.</h2>
          <p className="section-sub">
            This is bigger than software — it&rsquo;s a bet on what people do with their time when the
            busywork is gone. The first {FOUNDING_SEATS} companies get twelve months free, with founder
            pricing locked in after. Work email only — a real person reads every entry.
          </p>
          <div className="price-grid">
            <div>
              <div className="np-chips" style={{ marginTop: 28 }}>
                <span className="np-chip"><span className="k">Books</span><span className="p">the finance OS, live today</span></span>
                <span className="np-chip"><span className="k">Hiring</span><span className="b">Orbit Hire, live today</span></span>
                <span className="np-chip"><span className="k">Practice</span><span className="b">Orbit for Firms, coming soon</span></span>
              </div>
            </div>
            <LedgerForm seat={seat} />
          </div>
        </section>
      </main>

      <SiteFooter />
      <NpEnhance />
    </>
  );
}

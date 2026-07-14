import "../advert.css";
import { OrbitLogo } from "@/components/OrbitLogo";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteFooter } from "@/components/SiteChrome";
import { RotatingHeadline } from "@/components/RotatingHeadline";
import { NpEnhance } from "@/components/NpEnhance";

export const metadata = {
  title: "Orbit for Firms — the OS for professional-services firms",
  description:
    "Coming soon. The operating system for tax and accounting firms — clients, engagements, working papers, filings, tasks and your team, run as one, with AI woven through.",
};

const HEADLINES: [string, string][] = [
  ["You didn't build a practice", "to chase engagement letters."],
  ["You didn't train for years", "to live in shared drives."],
  ["You didn't start a firm", "to miss a filing deadline."],
];

const FEATURES: { k: string; h: string; p: string }[] = [
  { k: "Clients", h: "Clients, groups & memos", p: "Every client, group and contact in one place — with searchable memos tagged VAT, CT or general, so the context never leaves with the person who had it." },
  { k: "Engagements", h: "Engagements & the IRL", p: "VAT Monthly, CT Annual, advisory — each engagement carries its own working papers and its information-request list, from proposal to engagement letter to active." },
  { k: "Filings", h: "Filings, never missed", p: "Every deadline tracked and escalated as it approaches. The watchdog that means a filing date is never a surprise again." },
  { k: "Documents", h: "Working papers & IRL", p: "Onboarding, working papers and information-request folders — foldered, versioned and linked to the filing they support." },
  { k: "Team", h: "The whole firm, in one place", p: "Client channels, the tax team, management — the conversation lives next to the work, not in a dozen other apps." },
  { k: "Copilot", h: "Ask about any client", p: "AI woven through: client summaries on demand, OCR on what you upload, and the challenges that need a partner's eye surfaced early." },
];

export default function FirmsPage() {
  return (
    <div className="prod-firms">
      <SmoothScroll />

      {/* ── HERO (ink · plum) ─────────────────────────────────────── */}
      <header className="hero-band on-ink np-hero" id="top">
        <div className="wrap">
          <nav className="nav" aria-label="Main">
            <OrbitLogo />
            <div className="nav-links">
              <a href="/" className="nav-hide-m">ORBIT</a>
              <a href="/hire" className="nav-hide-m">ORBIT HIRE</a>
              <a href="/contact" className="nav-hide-m">CONTACT</a>
              <a href="#access" className="nav-cta">EARLY ACCESS</a>
            </div>
          </nav>

          <div style={{ paddingTop: 40 }}>
            <div className="np-soon"><span className="dot" /> Orbit for Firms · Coming soon</div>
            <RotatingHeadline items={HEADLINES} />
            <p className="hero-sub" style={{ maxWidth: 600 }}>
              Orbit for Firms is the operating system for tax and accounting practices — clients,
              engagements, working papers, filings, tasks and your team, run as one, with AI woven
              through. Built by a Gulf firm that lived the chaos.
            </p>
            <a className="np-scrollcue" href="#what" aria-label="See what it does">
              <span className="tri">▶</span>
              <span className="lab">What Orbit for Firms does</span>
              <span className="chev" aria-hidden="true">↓</span>
            </a>
            <div className="hero-actions">
              <a className="cta" href="#access">Get early access</a>
              <span className="mono hero-seat">Opening to a small first cohort</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ── THE PROBLEM ───────────────────────────────────────────── */}
        <section className="np-act np-band-ink" style={{ paddingTop: 100 }} id="what">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">THE PRACTICE</div>
            <h2 className="np-head np-rise d1">A firm runs on judgement. <span className="np-accent">It drowns in admin.</span></h2>
            <p className="np-say np-rise d1">
              Clients scattered across email and folders. Engagement letters chased by hand.
              Working papers on a shared drive nobody trusts. A filing calendar in three places.
              The advice your clients pay for is the last thing anyone has time for. Orbit for
              Firms puts the whole practice in one place — so the busywork stops eating the work.
            </p>
          </div>
        </section>

        {/* ── WHAT IT DOES (feature grid) ───────────────────────────── */}
        <section className="np-act">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">ONE PLACE FOR THE PRACTICE</div>
            <h2 className="np-head np-rise d1">Every client, every engagement, <span className="np-accent">every filing.</span></h2>
            <div className="np-features np-rise d1">
              {FEATURES.map((f) => (
                <div key={f.k} className="np-feat">
                  <div className="k">{f.k}</div>
                  <h3>{f.h}</h3>
                  <p>{f.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE STRUCTURE (hierarchy, in place of a screenshot) ───── */}
        <section className="np-act np-band-ink">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">THE STRUCTURE</div>
            <h2 className="np-head np-rise d1">From the group down to <span className="np-accent">the filing.</span></h2>
            <p className="np-say np-rise d1">
              Everything hangs off a clean hierarchy — so nothing is ever orphaned, and the whole
              history of a client is one click from the work in front of you.
            </p>
            <div className="np-tree np-rise d1">
              <div className="row"><span className="tag">Group</span><span className="name">ELC Group</span><span className="meta">· 4 entities</span></div>
              <div className="row l1"><span className="tag">Client</span><span className="name">Richemont Middle East FZE</span><span className="meta">· Active · VAT + CT</span></div>
              <div className="row l2"><span className="tag">Engagement</span><span className="name">VAT — Monthly</span><span className="meta">· working papers · IRL · 12 filings</span></div>
              <div className="row l2"><span className="tag">Engagement</span><span className="name">Corporate Tax — FY2025</span><span className="meta">· proposal → engagement letter</span></div>
              <div className="row l1"><span className="tag">Client</span><span className="name">Corniche Capital Ltd</span><span className="meta">· Discovery → Proposal</span></div>
              <div className="row l2"><span className="tag">Filing</span><span className="name">VAT Q2 2026 · due 28 Jul</span><span className="meta">· T-14 · working papers linked</span></div>
            </div>
          </div>
        </section>

        {/* ── VISION / THREE PRODUCTS ───────────────────────────────── */}
        <section className="why-band on-ink" style={{ marginTop: 0 }}>
          <div className="wrap">
            <div className="microlabel hero-kicker np-rise">THE BIGGER PICTURE</div>
            <h2 className="why-head np-rise d1">Three products.<br />One mission.</h2>
            <div className="why-cols np-rise d1">
              <p>
                We&rsquo;re changing how tax, accounting and the services around them get done in the
                Gulf — built by accountants who lived every late night of it, not by engineers
                guessing. Orbit runs the books. Orbit&nbsp;Hire runs the hiring. Orbit&nbsp;for&nbsp;Firms
                runs the practice itself.
              </p>
              <p>
                One family, one design, one standard: the software does the busywork and shows its
                evidence — the judgement, and the client relationship, stay yours. Orbit for Firms
                is the newest of the three, and it&rsquo;s opening soon.
              </p>
            </div>
            <div className="hero-actions np-rise" style={{ marginTop: 26 }}>
              <a className="textlink" href="/" style={{ fontSize: 13.5 }}>Orbit — the finance OS →</a>
              <a className="textlink" href="/hire" style={{ fontSize: 13.5 }}>Orbit Hire — the hiring OS →</a>
            </div>
          </div>
        </section>

        {/* ── EARLY ACCESS ──────────────────────────────────────────── */}
        <section className="section wrap" id="access">
          <div className="np-soon" style={{ color: "var(--brass-deep)", borderColor: "var(--hairline)" }}><span className="dot" style={{ background: "var(--brass)", boxShadow: "none" }} /> Coming soon</div>
          <h2 className="section-head">Be first in the door.</h2>
          <p className="section-sub">
            Orbit for Firms opens to a small first cohort of Gulf practices. Tell us about your firm
            and we&rsquo;ll bring you in early — with founder terms.
          </p>
          <div className="hero-actions" style={{ marginTop: 26 }}>
            <a className="cta" href="/contact">Request early access</a>
            <a className="textlink" href="/" style={{ fontSize: 13.5 }}>Looking for the finance OS? Orbit is here →</a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <NpEnhance />
    </div>
  );
}

import Image from "next/image";
import "./advert.css";
import { OrbitLogo } from "@/components/OrbitLogo";
import { Terminal } from "@/components/Terminal";
import { LedgerForm } from "@/components/LedgerForm";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteFooter } from "@/components/SiteChrome";
import { RotatingHeadline } from "@/components/RotatingHeadline";
import { NpEnhance } from "@/components/NpEnhance";
import { getNextSeat, FOUNDING_SEATS } from "@/lib/launch";

export const revalidate = 60;

export const metadata = {
  title: "Orbit — your books, already done",
  description:
    "The finance operating system for the Gulf. AP, receivables, the ledger, tax and the month-end close — run by a team of agents, watched over by you.",
};

const pad3 = (n: number) => String(n).padStart(3, "0");

type Chip = { k: string; v: string; tone?: "p" | "b" };
function Act({
  ink, kicker, head, say, chips, shot, cap,
}: {
  ink?: boolean; kicker: string; head: React.ReactNode; say: React.ReactNode;
  chips?: Chip[]; shot: { src: string; w: number; h: number; alt: string }; cap: string;
}) {
  return (
    <section className={`np-act${ink ? " np-band-ink" : ""}`}>
      <div className="wrap">
        <div className="microlabel np-kicker np-rise">{kicker}</div>
        <h2 className="np-head np-rise d1">{head}</h2>
        <p className="np-say np-rise d1">{say}</p>
        {chips && (
          <div className="np-chips np-rise d2">
            {chips.map((c) => (
              <span key={c.k} className="np-chip">
                <span className="k">{c.k}</span>
                <span className={c.tone === "p" ? "p" : c.tone === "b" ? "b" : undefined}>{c.v}</span>
              </span>
            ))}
          </div>
        )}
        <div className="np-shot np-rise d1">
          <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} sizes="(max-width: 1120px) 100vw, 1064px" />
        </div>
        <div className="np-cap np-rise">{cap}</div>
      </div>
    </section>
  );
}

export default async function Page() {
  const seat = await getNextSeat();
  return (
    <>
      <SmoothScroll />

      {/* ── HERO (ink) — rotating headline + the product, bleeding in ── */}
      <header className="hero-band on-ink np-hero" id="top">
        <div className="wrap">
          <nav className="nav" aria-label="Main">
            <OrbitLogo />
            <div className="nav-links">
              <a href="/hire" className="nav-hide-m">ORBIT HIRE</a>
              <a href="/faq" className="nav-hide-m">FAQ</a>
              <a href="/contact" className="nav-hide-m">CONTACT</a>
              <a href="#ledger" className="nav-cta">CLAIM A SEAT</a>
            </div>
          </nav>

          <div style={{ paddingTop: 40 }}>
            <div className="microlabel hero-kicker">AN AI FINANCE TEAM FOR THE UAE &amp; KSA</div>
            <RotatingHeadline />
            <p className="hero-sub" style={{ maxWidth: 560 }}>
              Orbit runs the busywork — AP, receivables, the ledger, tax and the month-end
              close — and leaves the judgement to you.
            </p>
            <a className="np-scrollcue" href="#live" aria-label="Scroll to watch">
              <span className="tri">▶</span>
              <span className="lab">Seventy seconds of what it looks like</span>
              <span className="chev" aria-hidden="true">↓</span>
            </a>
            <div className="hero-actions">
              <a className="cta" href="#ledger">Claim a founding seat</a>
              <span className="mono hero-seat">SEAT {pad3(seat)}/{FOUNDING_SEATS} REMAINS</span>
            </div>
          </div>

          <div className="np-hero-shot">
            <Image src="/shots/adv-overview.jpg" alt="The Orbit workspace — cash, decisions, the close and tax at a glance" width={1600} height={1834} sizes="(max-width: 1120px) 100vw, 1064px" priority />
          </div>
        </div>
      </header>

      <main>
        {/* ── LIVE: the invoice → close → collections terminal ────── */}
        <section className="section wrap np-after-hero" id="live">
          <Terminal />
        </section>

        {/* ── ACT · Money out ─────────────────────────────────────── */}
        <Act
          ink
          kicker="MONEY OUT"
          head={<>Every invoice hides two questions: <span className="np-accent">is it coded right, and is the tax deductible?</span></>}
          say={<>Orbit codes it on arrival from your own ledger&rsquo;s memory, then tax-tests it against UAE law. This one <strong>fails Article 59</strong> — the supplier TRN is missing — so the input VAT is held, not claimed. And a duplicate is stopped before it ever posts.</>}
          chips={[
            { k: "Tax test", v: "input VAT AED 1,036 held", tone: "b" },
            { k: "Duplicate", v: "stopped before posting", tone: "b" },
            { k: "Coding memory", v: "2,418 txns", tone: "p" },
          ]}
          shot={{ src: "/shots/adv-payables.jpg", w: 1600, h: 1741, alt: "Orbit Payables — the tax test embedded in the invoice row" }}
          cap="Payables — the tax layer embedded in every row, with its evidence attached."
        />

        {/* ── ACT · The regional layer ────────────────────────────── */}
        <Act
          kicker="THE REGIONAL LAYER"
          head={<>Your global tools don&rsquo;t know what the FTA or ZATCA want. <span className="np-accent">This one was built here.</span></>}
          say={<>VAT and Corporate Tax reconciled every month, each deadline tracked by a watchdog, e-invoices cleared and stored with proof. The AED 200,000 gap? Explained, and cited to the journal.</>}
          chips={[
            { k: "VAT ↔ CT", v: "Δ +200k · explained", tone: "p" },
            { k: "Filing", v: "Q2 due 28 Jul · T-14", tone: "b" },
            { k: "ZATCA", v: "142 cleared · 0 rejected", tone: "p" },
          ]}
          shot={{ src: "/shots/adv-tax.jpg", w: 1600, h: 1119, alt: "Orbit GCC tax intelligence — VAT–CT reconciliation and filing watchdog" }}
          cap="Tax — the reconciliation, the deadlines and the clearance, in one place."
        />

        {/* ── ACT · The permanent record ──────────────────────────── */}
        <Act
          ink
          kicker="THE PERMANENT RECORD"
          head={<>Nothing is ever deleted. <span className="np-accent">Mistakes are reversed in the open.</span></>}
          say={<>Every journal carries who made it, why, and the document behind it — each posted by a named agent with a confidence score. A close you could hand to an auditor without flinching.</>}
          shot={{ src: "/shots/adv-ledger.jpg", w: 1600, h: 1207, alt: "Orbit general ledger — journal activity with agent commentary and evidence" }}
          cap="Ledger — every entry explained, its evidence one click away."
        />

        {/* ── ACT · Money in ──────────────────────────────────────── */}
        <Act
          kicker="MONEY IN"
          head={<>Who owes you — and what to do about it, <span className="np-accent">already chased.</span></>}
          say={<>Collection reminders write themselves on a cadence you approve once; nothing sends without you. Write-off exposure is provisioned against your policy, automatically.</>}
          chips={[
            { k: "DSO", v: "41 days · improving", tone: "p" },
            { k: "Past due", v: "AED 346,700", tone: "b" },
            { k: "Provisioned", v: "policy-driven" },
          ]}
          shot={{ src: "/shots/adv-receivables.jpg", w: 1600, h: 1342, alt: "Orbit Receivables — collections queue, DSO and the ageing posture" }}
          cap="Receivables — the collections runbook, drafted, chased and reconciled."
        />

        {/* ── ACT · The close (the 78% moment) ────────────────────── */}
        <section className="np-act np-band-ink" id="close">
          <div className="wrap">
            <div className="microlabel np-kicker np-rise">THE CLOSE</div>
            <h2 className="np-head np-rise d1">Month-end used to be a few weeks.</h2>
            <div className="np-big np-rise d1">
              <span data-np-count="78">0%</span>
              <span className="sub">done before you woke up.</span>
            </div>
            <p className="np-say np-rise d2">
              Accruals proposed, variances flagged, bank reconciled, VAT drafted — Orbit&rsquo;s side is
              done before you open it. What&rsquo;s left is your call. Then you seal the month in one
              tap, and it can never quietly change again.
            </p>
            <div className="np-shot np-rise d1">
              <Image src="/shots/adv-close.jpg" alt="Orbit close cockpit — 78% complete, engine-proposed accruals" width={1600} height={1446} sizes="(max-width: 1120px) 100vw, 1064px" />
            </div>
            <div className="np-cap np-rise">Close cockpit — &ldquo;Orbit runs this&rdquo; on the left, your ledger&rsquo;s tasks on the right.</div>
          </div>
        </section>

        {/* ── ACT · One OS ────────────────────────────────────────── */}
        <Act
          kicker="ONE OS, ANY SHAPE"
          head={<>One business or five. One currency or five. <span className="np-accent">One language or two.</span></>}
          say={<>Switch entities, consolidate, and flip the whole workspace into Arabic — right-to-left, down to the numerals. The product bends. You don&rsquo;t.</>}
          shot={{ src: "/shots/adv-arabic.jpg", w: 1600, h: 1796, alt: "Orbit in Arabic — the full workspace, right to left" }}
          cap="نفس النظام — the same Orbit, in Arabic, right-to-left."
        />

        {/* ── WHY WE BUILT THIS (ink band) ────────────────────────── */}
        <section className="why-band on-ink" id="why" style={{ marginTop: 0 }}>
          <div className="wrap">
            <div className="microlabel hero-kicker np-rise">WHY WE BUILT THIS</div>
            <h2 className="why-head np-rise d1">We lived the month-end<br />we&rsquo;re deleting.</h2>
            <div className="why-cols np-rise d1">
              <p>
                Every close, the same ritual: receipts chased over WhatsApp, invoices vouched at
                midnight, a VAT deadline breathing down the quarter — and the numbers that actually
                matter, untouched. We watched brilliant finance teams spend their nights on
                administrative work and overlook the real value sitting in front of them: what the
                data was saying.
              </p>
              <p>
                Orbit is one of the very few products in this space <strong>built by accountants who
                have lived and slept through these processes</strong> — not by engineers guessing at
                them. So we built the colleague we always wanted: one who does the busywork, shows
                its evidence, and leaves the judgement to you.
              </p>
            </div>
            <div className="why-sig np-rise">&mdash; SIDDIQUI · FOUNDER, ORBIT</div>
          </div>
        </section>

        {/* ── FOUNDING LEDGER (the waitlist) ──────────────────────── */}
        <section className="section wrap" id="ledger">
          <h2 className="section-head">Claim a founding seat.</h2>
          <p className="section-sub">
            The first {FOUNDING_SEATS} companies get twelve months free, with founder pricing locked in
            after. Work email only — a real person reads every entry.
          </p>
          <div className="price-grid">
            <div>
              <div className="np-chips" style={{ marginTop: 28 }}>
                <span className="np-chip"><span className="k">Setup</span><span className="p">minutes, not a project</span></span>
                <span className="np-chip"><span className="k">Books</span><span className="b">Zoho · Xero · QuickBooks · Odoo · Wafeq · ERPNext</span></span>
                <span className="np-chip"><span className="k">Intake</span><span className="b">WhatsApp · Telegram · Email</span></span>
              </div>
            </div>
            <LedgerForm seat={seat} />
          </div>
        </section>

        {/* ── SISTER PRODUCT — ORBIT HIRE ─────────────────────────── */}
        <section className="np-sister">
          <div className="wrap">
            <div>
              <div className="microlabel kicker">THE SISTER PRODUCT</div>
              <p className="lead">Hiring is busywork too. Meet Orbit&nbsp;Hire.</p>
              <p className="sub2">Reads every application, interviews every candidate by voice, and hands you a ranked shortlist — fair by design.</p>
            </div>
            <a className="cta" href="/hire">See Orbit Hire →</a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <NpEnhance />
    </>
  );
}

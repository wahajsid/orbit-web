/* ── /pricing ────────────────────────────────────────────────────────
   Website change plan 2026-09-23: three cards. Self-serve "From USD 199
   a month"; the managed service "Scoped to your books" (no published
   price); and a card for firms (Hysaab Practice and Hysaab Audit: a
   setup fee plus a monthly subscription). Every card books a demo on
   the team's Calendly. The scoping rows are unchanged: the figures that
   exist are stated, and what is scoped per customer is named as such
   rather than invented. */

import { DigitRoll } from "@/components/motion/Kinetic";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";

export const metadata = {
  title: "Hysaab Pricing: Self-serve from USD 199, Managed and Firms",
  description:
    "Self-serve from USD 199 a month. A managed service scoped to your books. Hysaab Practice and Hysaab Audit for firms: a setup fee plus a monthly subscription.",
  alternates: langAlternates("/pricing"),
};

type Tier = { name: string; mode: string; price?: string; priceText?: string; who: string; feats: React.ReactNode[]; hero?: boolean };

const TIERS: Tier[] = [
  {
    name: "Self-serve",
    mode: "Your team runs it",
    price: "199",
    who: "For a business whose own people keep the books. The agents prepare the work; your team reviews, approves and closes.",
    feats: [
      "Documents in by WhatsApp, email or upload, read and coded from your own history",
      "Every invoice tested against the tax-invoice rules before VAT is claimed",
      "The decisions queue, the month-end close cockpit and the reporting pack",
      "Ask the team in plain words, with the records behind each answer",
      "One connected accounting system, unlimited people",
    ],
  },
  {
    name: "Managed service",
    mode: "We run it with you",
    priceText: "Scoped to your books",
    hero: true,
    who: "For mid-sized and larger companies and groups. Oblique’s accountants run the queue and prepare the close with you, using Hysaab every day.",
    feats: [
      "Everything in Self-serve",
      "A named accountant reviewing exceptions and correcting where necessary",
      "The close prepared and run with you, reporting to you and your board",
      "Multiple entities and heavier document volume, scoped upfront",
      "A monthly review of what changed and why",
    ],
  },
  {
    name: "Hysaab Practice and Hysaab Audit",
    mode: "For firms",
    priceText: "Setup fee plus a monthly subscription",
    who: "For tax and advisory firms and licensed audit firms. Take either product on its own, or both together.",
    feats: [
      "Hysaab Practice: the tax workbench, client engagements and the firm’s admin",
      "Hysaab Audit: the ISA file, from acceptance to archive",
      "Setup scoped to your firm, then one monthly subscription",
      <>Your clients stay yours: <a href="/trust">read our commitments</a></>,
    ],
  },
];

const SCOPED = [
  ["Document volume", "How many invoices, receipts and statements arrive in a typical month. The self-serve fee covers a small business’s volume; heavier volume is scoped into the managed fee."],
  ["Entities", "Self-serve covers one company on one connected accounting system. Groups and multiple entities are managed-service work and are priced per scope."],
  ["Onboarding", "Connecting the books and agreeing the approval rules happens before the first month. It is included; the time it takes depends on the state of the books, and we tell you upfront."],
  ["Support", "Every customer can write to a person. The managed service adds a named accountant and a monthly review; self-serve support is by email in working hours."],
  ["Overages", "If your volume grows past what the fee was sized for, we tell you before anything changes. There are no silent overage charges."],
  ["VAT on the fee", "Quotes state the fee and whether VAT applies to it, so the number you approve is the number you pay."],
];

const newTab = <span className="hw-sr">{DEMO_NEW_TAB.en}</span>;

export default function PricingPage() {
  return (
    <PageShell band={{ title: "Not sure which way fits?", body: "Tell us about your books or your firm: the systems, the entities and the work that takes too long. We will confirm the scope and the fee in writing before any commitment." }}>
      <PageHero
        eyebrow="Pricing"
        title={<>Sized by the work,<br /><span>not the seats.</span></>}
        lede="Self-serve, managed, or for firms. The fee follows the work, never the number of logins."
      >
        <a className="hw-btn hw-btn--peach" {...DEMO}>Book a demo <span aria-hidden="true">↗</span>{newTab}</a>
        <a className="hw-link hw-link--light" href="/how-it-works"><span className="hw-play" aria-hidden="true">▷</span> See how it works</a>
      </PageHero>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Three ways in</p>
              <h2>One monthly fee.<br /><span>No charge per user.</span></h2>
            </div>
            <p>Prices are in US dollars. The fee follows the work on your books, not the number of people who log in.</p>
          </div>

          <div className="hw-plans" data-play="">
            {TIERS.map((t) => (
              <article key={t.name} className={t.hero ? "is-featured" : undefined}>
                <p className="hw-eyebrow">{t.mode}</p>
                <h3>{t.name}</h3>
                {t.price
                  ? <p className="hw-plan-price"><small>From</small> USD <DigitRoll value={t.price} delay={200} /><small>a month</small></p>
                  : <p className="hw-plan-price hw-plan-price--text">{t.priceText}</p>}
                <p>{t.who}</p>
                <ul className="hw-ticks">
                  {t.feats.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <a className={`hw-btn ${t.hero ? "hw-btn--peach" : "hw-btn--navy"}`} {...DEMO}>
                  Book a demo <span aria-hidden="true">↗</span>{newTab}
                </a>
              </article>
            ))}
          </div>

          <div className="hw-note">
            <span className="hw-mono">Before we start</span>
            <p>We confirm your accounting system, entities, scope and fees in writing upfront. A clear fit comes before any commitment.</p>
          </div>
        </div>
      </section>

      <section className="hw-block--sage">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">What the fee covers</p>
              <h2>What you pay for.<br /><span>And what is scoped with you.</span></h2>
            </div>
            <p>For finance teams, the plans differ in who runs the work and how much of it there is. The controls are the same on both.</p>
          </div>
          <div className="hw-rows">
            {SCOPED.map(([h, p], i) => (
              <article key={h}>
                <span className="hw-mono">{String(i + 1).padStart(2, "0")}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
          <div className="hw-note">
            <span className="hw-mono">Your ledger</span>
            <p>Both plans work with one connected accounting system. See the <a href="/integrations">systems Hysaab connects to</a>, <a href="/accounting">what the workspace covers</a>, and the <a href="/faq">questions people ask first</a>.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

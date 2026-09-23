/* ── /pricing ────────────────────────────────────────────────────────
   Two ways to run Hysaab (owner 2026-09-18): self-serve at USD 199 a
   month, and the managed service from USD 899 a month. Built on the
   homepage kit. The review of 2026-09-18 asked for practical allowance
   detail; the figures that exist are stated, and what is scoped per
   customer is named as such rather than invented. */

import { DigitRoll } from "@/components/motion/Kinetic";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "Hysaab Pricing: USD 199 Self-serve, from USD 899 Managed",
  description:
    "Self-serve at USD 199 a month, or a managed accounting service from USD 899 a month with a named accountant. Fees follow your books, not seats.",
  alternates: langAlternates("/pricing"),
};

const TIERS: { name: string; mode: string; price: string; from?: boolean; who: string; feats: string[]; hero?: boolean }[] = [
  {
    name: "Self-serve",
    mode: "Your team runs it",
    price: "USD 199",
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
    mode: "Our accountants run it with you",
    price: "USD 899",
    from: true,
    hero: true,
    who: "For CFOs, groups and busy books. The agents run alongside a named Hysaab accountant who works the queue with you and prepares each close.",
    feats: [
      "Everything in Self-serve",
      "A named accountant reviewing exceptions and correcting where necessary",
      "The close prepared and run with you, reporting to you and your board",
      "Multiple entities and heavier document volume, scoped upfront",
      "A monthly review of what changed and why",
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

export default function PricingPage() {
  return (
    <PageShell band={{ title: "Not sure which way fits?", body: "Tell us about your books: the accounting system, the entities and the process that takes too long. We will confirm the scope and the fee in writing before any commitment." }}>
      <PageHero
        eyebrow="Pricing"
        title={<>Sized by the work,<br /><span>not the seats.</span></>}
        lede="Self-serve or managed. The fee follows your books, never the number of logins."
      >
        <a className="hw-btn hw-btn--peach" href="/contact">Book a walkthrough <span aria-hidden="true">↗</span></a>
        <a className="hw-link hw-link--light" href="/how-it-works"><span className="hw-play" aria-hidden="true">▷</span> See how it works</a>
      </PageHero>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Two plans</p>
              <h2>One monthly fee.<br /><span>No charge per user.</span></h2>
            </div>
            <p>Prices are in US dollars, per month. The fee follows the work on your books, not the number of people who log in.</p>
          </div>

          <div className="hw-plans hw-plans--2" data-play="">
            {TIERS.map((t) => (
              <article key={t.name} className={t.hero ? "is-featured" : undefined}>
                <p className="hw-eyebrow">{t.mode}</p>
                <h3>{t.name}</h3>
                <p className="hw-plan-price">
                  {t.from && <small>from</small>} {t.price.split(" ")[0]} <DigitRoll value={t.price.split(" ")[1]} delay={200} /><small>/month</small>
                </p>
                <p>{t.who}</p>
                <ul className="hw-ticks">
                  {t.feats.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <a className={`hw-btn ${t.hero ? "hw-btn--peach" : "hw-btn--navy"}`} href="/contact">
                  {t.hero ? "Discuss managed support" : "Book a walkthrough"} <span aria-hidden="true">↗</span>
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
            <p>The plans differ in who runs the work and how much of it there is. The controls are the same on both.</p>
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
            <p>Both plans work with one connected accounting system. See the <a href="/integrations">systems Hysaab connects to</a>, <a href="/product">what the workspace covers</a>, and the <a href="/faq">questions people ask first</a>.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

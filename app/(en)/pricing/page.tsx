/* ── /pricing ────────────────────────────────────────────────────────
   Rebuilt 2026-09 in the homepage design (PageShell + the hw-* kit in
   app/hysaab-home.css). Plan names, prices and inclusions are unchanged:
   they are mirrored in lib/site-meta.ts and app/llms.txt/route.ts. The
   founding-cohort block, founder pricing and the waitlist links were
   removed (owner decision 2026-09-17); every plan leads to /contact. */

import type { Metadata } from "next";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "Accounting Software Pricing, from AED 149/month | Hysaab",
  description:
    "Two ways to run Hysaab: self-serve automated workflows for small businesses (Starter AED 149/mo, Growth AED 499/mo) and a managed accounting and reporting service for CFOs (Scale, from AED 1,499/mo). Priced by the complexity of your books, not by seats.",
  alternates: langAlternates("/pricing"),
};

const TIERS: { name: string; mode: string; price: string; from?: boolean; who: string; feats: string[]; hero?: boolean }[] = [
  {
    name: "Starter",
    mode: "Self-serve",
    price: "AED 149",
    who: "Self-serve. For a small business getting its books off WhatsApp and spreadsheets.",
    feats: [
      "The full agent team on your books",
      "Documents in by email and Telegram",
      "Decisions queue, month-end close and the board pack",
      "One connected ledger — or Hysaab keeps the books",
      "Usage sized for a small business",
    ],
  },
  {
    name: "Growth",
    mode: "Self-serve",
    price: "AED 499",
    who: "Self-serve. For a business that wants the team on speed dial.",
    hero: true,
    feats: [
      "Everything in Starter",
      "Task the team over WhatsApp",
      "Collections reminders auto-send within your policy",
      "More monthly team capacity",
    ],
  },
  {
    name: "Scale",
    mode: "Managed service",
    price: "AED 1,499",
    from: true,
    who: "Managed service. For CFOs, groups and busy books: our accountants run the agents with you.",
    feats: [
      "Everything in Growth",
      "A named Hysaab accountant reviewing exceptions and correcting where necessary",
      "The close prepared and run for you, reporting to you and your board",
      "Multiple entities and heavy document volume",
      "Improvements found on your books ship to you first",
    ],
  },
];

export default function PricingPage() {
  return (
    <PageShell band={{ title: "Not sure which plan fits?", body: "Tell us about your books: the accounting system, the entities and the process that takes too long. We will confirm the scope and the fee before any commitment." }}>
      <PageHero
        eyebrow="Pricing"
        title={<>Sized by the work,<br /><span>not the seats.</span></>}
        lede="Two ways to run Hysaab. Starter and Growth are self-serve: you operate the workflows, and Hysaab brings you the few questions it cannot settle. Scale is the managed service: our accountants run the work with you, and a person stays on every judgement call. Pricing follows the complexity of your books, never how many people log in."
      >
        <a className="hw-btn hw-btn--peach" href="/contact">Let’s talk <span aria-hidden="true">↗</span></a>
        <a className="hw-link hw-link--light" href="/how-it-works"><span className="hw-play" aria-hidden="true">▷</span> See how it works</a>
      </PageHero>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Three plans</p>
              <h2>One monthly fee.<br /><span>No charge per user.</span></h2>
            </div>
            <p>Prices are in UAE dirhams, per month. The fee follows the work on your books, not the number of people who log in.</p>
          </div>

          <div className="hw-plans">
            {TIERS.map((t) => (
              <article key={t.name} className={t.hero ? "is-featured" : undefined}>
                <p className="hw-eyebrow">{t.mode}</p>
                <h3>{t.name}</h3>
                <p className="hw-plan-price">
                  {t.from && <small>from</small>} {t.price}<small>/month</small>
                </p>
                <p>{t.who}</p>
                <ul className="hw-ticks">
                  {t.feats.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <a className={`hw-btn ${t.hero ? "hw-btn--peach" : "hw-btn--navy"}`} href="/contact">
                  Let’s talk <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>

          <div className="hw-note">
            <span className="hw-mono">Before we start</span>
            <p>We confirm your accounting system, entities, scope and fees upfront. A clear fit comes before any commitment.</p>
          </div>
        </div>
      </section>

      <section className="hw-block--sage">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">How the pricing works</p>
              <h2>What you pay for.<br /><span>And what you do not.</span></h2>
            </div>
            <p>The plans differ in who runs the work and how much of it there is. The controls are the same on all three.</p>
          </div>
          <div className="hw-rows">
            <article>
              <span className="hw-mono">01</span>
              <h3>Complexity, not seats.</h3>
              <p>The fee follows the volume of documents, the number of entities and how involved the close is. It never depends on how many people log in.</p>
            </article>
            <article>
              <span className="hw-mono">02</span>
              <h3>Self-serve: Starter and Growth.</h3>
              <p>You run the workflows yourself. Documents are read, coded from your own history and tax-tested; anything uncertain waits in the decisions queue with the reason. Growth adds WhatsApp tasking, collections reminders that send within the policy you approve, and more monthly capacity.</p>
            </article>
            <article>
              <span className="hw-mono">03</span>
              <h3>Managed: Scale.</h3>
              <p>A named Hysaab accountant reviews exceptions, corrects where necessary and prepares the close with you, across multiple entities and heavier document volume. You keep the decisions that are yours. Scale starts from AED 1,499 a month and is confirmed once we have seen the scope.</p>
            </article>
            <article>
              <span className="hw-mono">04</span>
              <h3>Fair usage.</h3>
              <p>Each plan is sized for an amount of work: Starter for a small business, Growth with more monthly capacity, Scale for groups and busy books. A fair-usage policy applies, and we tell you where your books sit before you start.</p>
            </article>
            <article>
              <span className="hw-mono">05</span>
              <h3>Your ledger, or ours.</h3>
              <p>Every plan works with one connected ledger, or Hysaab keeps the books for you. See the <a href="/integrations">accounting systems Hysaab connects to</a>, <a href="/product">what the workspace covers</a>, and the <a href="/faq">questions people ask first</a>.</p>
            </article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

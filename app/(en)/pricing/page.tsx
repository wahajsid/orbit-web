import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { CtaBand } from "@/components/hysaab/CtaBand";
import { FOUNDING_SEATS } from "@/lib/launch";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "Pricing — Hysaab",
  description:
    "Two ways to run Hysaab: self-serve automated workflows for small businesses (Starter AED 149/mo, Growth AED 499/mo) and a managed accounting and reporting service for CFOs (Scale, from AED 1,499/mo). Priced by the complexity of your books, not by seats. Founder pricing locked for the first 100 companies.",
  alternates: langAlternates("/pricing"),
};

const TIERS: { name: string; price: string; who: string; feats: string[]; hero?: boolean }[] = [
  {
    name: "Starter",
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
    price: "AED 1,499",
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
    <>
      <MgNav />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">PRICING</div>
          <h1 className="mg-page-h">Sized by the work, not the seats.</h1>
          <p className="mg-page-lede">
            Two ways to run Hysaab. Starter and Growth are self-serve: automated workflows you operate
            on your own, with the agents asking you the few questions they cannot settle. Scale is the
            managed service: our accountants run the agents with you, review, correct and report, and a
            person stays in the loop on every judgement call. Pricing follows the complexity of your
            books, never how many people log in.
          </p>
        </section>

        <section className="mg-page-body">
          <div className="mg-price-grid">
            {TIERS.map((t) => (
              <div key={t.name} className={t.hero ? "mg-price-card mg-price-hero" : "mg-price-card"}>
                <div className="mg-kicker">{t.name}</div>
                <div className="mg-price-n">{t.price}<span className="mg-price-per">/month</span></div>
                <p className="mg-price-who">{t.who}</p>
                <ul className="mg-price-feats">
                  {t.feats.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <a href="/#cohort" className="mg-cta">Book a demo →</a>
              </div>
            ))}
          </div>

          <div className="mg-price-founding">
            <div className="mg-kicker">THE FOUNDING COHORT</div>
            <h2 className="mg-prod-dh">The first {FOUNDING_SEATS} companies set the price.</h2>
            <p className="mg-prod-dp" style={{ maxWidth: "58ch" }}>
              Founder pricing locked in for as long as you stay (fair-usage policy applies), and a
              direct line to the team building it. Work email only. A real person reads every entry.
            </p>
            <div style={{ marginTop: 20 }}>
              <a href="/#cohort" className="mg-cta">Claim a founding seat →</a>
            </div>
          </div>
        </section>
      </main>
      <CtaBand />
      <MgFooter />
    </>
  );
}

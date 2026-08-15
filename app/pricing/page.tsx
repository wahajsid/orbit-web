import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { FOUNDING_SEATS } from "@/lib/launch";

export const metadata: Metadata = {
  title: "Pricing — Orbit",
  description:
    "Three tiers — Starter AED 149/mo, Growth AED 499/mo, Scale AED 1,499/mo — sized by how much of the AI team you use, not by user seats. The first 100 companies get twelve months free.",
};

const TIERS: { name: string; price: string; who: string; feats: string[]; hero?: boolean }[] = [
  {
    name: "Starter",
    price: "AED 149",
    who: "For a small business getting its books off WhatsApp and spreadsheets.",
    feats: [
      "The full agent team on your books",
      "Documents in by email and Telegram",
      "Decisions queue, month-end close and the board pack",
      "One connected ledger — or Orbit keeps the books",
      "Usage sized for a small business",
    ],
  },
  {
    name: "Growth",
    price: "AED 499",
    who: "For a business that wants the team on speed dial.",
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
    who: "For groups and busy books.",
    feats: [
      "Everything in Growth",
      "The highest usage allowances",
      "Room for multiple entities and heavy document volume",
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
            Every tier gets the whole agent team — pricing scales with how much of it you use, never
            with how many people log in. No per-user maths, no feature ransom.
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
                <a href="/#join" className="mg-cta">Book a demo →</a>
              </div>
            ))}
          </div>

          <div className="mg-price-founding">
            <div className="mg-kicker">THE FOUNDING COHORT</div>
            <h2 className="mg-prod-dh">The first {FOUNDING_SEATS} companies pay nothing for a year.</h2>
            <p className="mg-prod-dp" style={{ maxWidth: "58ch" }}>
              Twelve months free (fair-usage policy applies), founder pricing locked in afterwards,
              and a direct line to the team building it. Work email only — a real person reads every
              entry.
            </p>
            <div style={{ marginTop: 20 }}>
              <a href="/#join" className="mg-cta">Claim a founding seat →</a>
            </div>
          </div>
        </section>
      </main>
      <MgFooter />
    </>
  );
}

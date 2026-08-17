import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";

import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "Contact — Orbit",
  description: "Support, bespoke solutions and partnerships — a real person reads every message.",
  alternates: langAlternates("/contact"),
};

const CARDS: { kicker: string; title: string; detail: string; cta: string; mailto: string }[] = [
  {
    kicker: "SUPPORT",
    title: "Something needs a human",
    detail: "Product questions, account help, or a document Orbit read wrong — write to us and a real person (in your timezone) picks it up. Founding-cohort members get priority.",
    cta: "Email support →",
    mailto: "mailto:info@orbitgulf.com?subject=Support",
  },
  {
    kicker: "BESPOKE",
    title: "Your finance stack, your rules",
    detail: "Multi-entity groups, unusual workflows, a connector we don't have yet, or migration from a legacy system — tell us what your month-end actually looks like and we'll scope it with you.",
    cta: "Discuss a bespoke build →",
    mailto: "mailto:info@orbitgulf.com?subject=Bespoke%20solution",
  },
  {
    kicker: "PARTNERSHIPS",
    title: "Accountants, advisors, platforms",
    detail: "Run a practice and want Orbit under your clients' books? Build a product that should talk to ours? We're building the Gulf's finance rails with partners, not around them.",
    cta: "Start a partnership →",
    mailto: "mailto:info@orbitgulf.com?subject=Partnership",
  },
];

export default function ContactPage() {
  return (
    <>
      <MgNav />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">CONTACT</div>
          <h1 className="mg-page-h">A real person reads every message.</h1>
          <p className="mg-page-lede">
            No ticket deflection, no chatbot maze. Pick the lane that fits and write like you&rsquo;d
            write to a colleague — because that&rsquo;s who answers.
          </p>
        </section>
        <section className="mg-page-body">
          <div className="mg-contact-grid">
            {CARDS.map((c) => (
              <div key={c.kicker} className="mg-contact-card">
                <div className="mg-kicker">{c.kicker}</div>
                <div className="mg-contact-title">{c.title}</div>
                <p className="mg-contact-p">{c.detail}</p>
                <a className="mg-cta" href={c.mailto}>{c.cta}</a>
              </div>
            ))}
          </div>
          <p className="mg-page-lede" style={{ marginTop: 36 }}>
            Direct line: <a className="textlink" href="mailto:info@orbitgulf.com">info@orbitgulf.com</a> · Dubai &amp; Riyadh
          </p>
        </section>
      </main>
      <MgFooter />
    </>
  );
}

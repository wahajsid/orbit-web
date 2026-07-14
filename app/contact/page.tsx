import type { Metadata } from "next";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Contact — Orbit",
  description: "Support, bespoke solutions and partnerships — a real person reads every message.",
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
      <SiteNav sub />
      <main className="wrap subpage">
        <div className="microlabel kicker">CONTACT</div>
        <h1 className="subpage-head">A real person reads<br />every message.</h1>
        <p className="subpage-sub">
          No ticket deflection, no chatbot maze. Pick the lane that fits and write like you&rsquo;d
          write to a colleague — because that&rsquo;s who answers.
        </p>
        <div className="contact-grid">
          {CARDS.map((c) => (
            <div key={c.kicker} className="contact-card">
              <div className="microlabel kicker">{c.kicker}</div>
              <div className="contact-title">{c.title}</div>
              <p className="contact-detail">{c.detail}</p>
              <a className="cta" href={c.mailto} style={{ textAlign: "center" }}>{c.cta}</a>
            </div>
          ))}
        </div>
        <p className="subpage-sub" style={{ marginTop: 36 }}>
          Direct line: <a className="textlink" href="mailto:info@orbitgulf.com">info@orbitgulf.com</a> · Dubai &amp; Riyadh
        </p>
      </main>
      <SiteFooter />
    </>
  );
}

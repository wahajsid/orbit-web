/* ── /contact ────────────────────────────────────────────────────────
   Rebuilt 2026-09 in the homepage design (PageShell + the hw-* kit in
   app/hysaab-home.css). The enquiry is the homepage's own: the same
   left column and the same EnquiryForm, which posts to /api/contact.
   The three email routes the page has always listed sit below it. The
   closing "Let's talk" band is switched off: this page is the enquiry. */

import { PageShell, PageHero } from "@/components/home/PageShell";
import { EnquiryForm } from "@/components/home/EnquiryForm";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "Contact Hysaab: Talk to the Team",
  description:
    "Request a conversation about your books, or write to us about support, a bespoke scope or a partnership. A real person reads every message.",
  alternates: langAlternates("/contact"),
};

const ROUTES: { eyebrow: string; title: string; detail: string; cta: string; mailto: string }[] = [
  {
    eyebrow: "Support",
    title: "Something needs a person.",
    detail: "Product questions, account help, or a document Hysaab read wrong. Write to us and a real person picks it up.",
    cta: "Email support",
    mailto: "mailto:info@hysaab.ai?subject=Support",
  },
  {
    eyebrow: "Bespoke",
    title: "Your finance stack, your rules.",
    detail: "Multi-entity groups, unusual workflows, a connector we do not have yet, or a move from a legacy system. Tell us what your month-end actually looks like and we will scope it with you.",
    cta: "Discuss a bespoke scope",
    mailto: "mailto:info@hysaab.ai?subject=Bespoke%20solution",
  },
  {
    eyebrow: "Partnerships",
    title: "Accountants, advisors, platforms.",
    detail: "You run a practice and want Hysaab under your clients’ books, or you build a product that should talk to ours. We would rather work with partners than around them.",
    cta: "Start a partnership",
    mailto: "mailto:info@hysaab.ai?subject=Partnership",
  },
];

export default function ContactPage() {
  return (
    <PageShell band={false}>
      <PageHero
        eyebrow="Contact"
        title={<>A real person reads<br /><span>every message.</span></>}
        lede="Write as you would to a colleague, because that is who answers."
      />

      <section className="hw-conversation" id="conversation">
        <div className="hw-wrap hw-conversation-grid">
          <div>
            <p className="hw-eyebrow">A conversation, not a sales deck</p>
            <h2>Let’s start<br />with your books.</h2>
            <p>Tell us what takes too long.<br />We will show you where Hysaab fits.</p>
            <div className="hw-agenda">
              <span className="hw-mono">Your first conversation</span>
              <ol>
                <li><span className="hw-mono">01</span> Your current workflow</li>
                <li><span className="hw-mono">02</span> A focused product walkthrough</li>
                <li><span className="hw-mono">03</span> Fit, scope and next steps</li>
              </ol>
            </div>
          </div>
          <EnquiryForm source="Contact page" demo />
        </div>
      </section>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Other ways to reach us</p>
              <h2>Pick the lane<br /><span>that fits.</span></h2>
            </div>
            <p>Prefer email? Each route below opens a message to the same inbox, read by a person. The subject line helps it reach the right one.</p>
          </div>
          <div className="hw-cards">
            {ROUTES.map((r) => (
              <article key={r.eyebrow}>
                <p className="hw-eyebrow">{r.eyebrow}</p>
                <h3>{r.title}</h3>
                <p>{r.detail}</p>
                <a className="hw-link" href={r.mailto}>{r.cta} <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
          <div className="hw-note">
            <span className="hw-mono">Direct line</span>
            <p>
              <a href="mailto:info@hysaab.ai" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>info@hysaab.ai</a>. We are in Dubai, working across the UAE and Saudi Arabia, in English and Arabic.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

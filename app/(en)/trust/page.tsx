/* ── /trust ──────────────────────────────────────────────────────────
   New 2026-09-23 (website change plan). Two parts: the commercial
   boundaries firms ask about (DRAFT: owner review, see lib/trust.ts)
   and the data controls, worded as commitments, never as audited
   certifications. Built from the PageShell + hw-* kit.
   2026-09-24: the trust ladder (reads, drafts, posts) sits between the
   two parts; /check and /how-it-works link to #ladder. */

import { PageShell, PageHero } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { FIRM_QUESTIONS, DATA_CONTROLS } from "@/lib/trust";
import { TrustLadder } from "@/components/home/TrustLadder";

export const metadata = {
  title: "Trust: Hysaab’s Commitments to Firms and Finance Teams",
  description:
    "Where Hysaab draws its commercial boundaries with firms, and how it handles your data: separate tenants, logged agent actions and no training on your data.",
  alternates: langAlternates("/trust"),
};

export default function TrustPage() {
  return (
    <PageShell band={{ title: "Ask us the hard questions.", body: "Bring your partners, your IT lead or your compliance officer. We will walk through each commitment on this page and show you where it lives in the product." }}>
      <PageHero
        eyebrow="Trust"
        title={<>Our commitments to firms<br /><span>and finance teams.</span></>}
        lede="What we will and will not do with your clients, and how we look after your data. Written as commitments you can hold us to."
      >
        <a className="hw-btn hw-btn--peach" {...DEMO}>Book a demo <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB.en}</span></a>
        <a className="hw-link hw-link--light" href="#controls">How we look after your data</a>
      </PageHero>

      <section id="boundaries">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Part one · Commercial boundaries</p>
              <h2>Your clients stay yours.<br /><span>Five questions firms ask.</span></h2>
            </div>
            <p>Firms thinking about Hysaab Practice or Hysaab Audit ask us these first. Here are our answers.</p>
          </div>
          <div className="hw-faq">
            {FIRM_QUESTIONS.en.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <div className="hw-faq-a"><p>{f.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <TrustLadder />

      <section id="controls" className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Part two · Data controls</p>
              <h2>How we look after your data.<br /><span>For firms and finance teams alike.</span></h2>
            </div>
            <p>The same five commitments hold in Hysaab Finance, Hysaab Practice and Hysaab Audit.</p>
          </div>
          <div className="hw-rows">
            {DATA_CONTROLS.en.map((c, i) => (
              <article key={c.h}>
                <span className="hw-mono">{String(i + 1).padStart(2, "0")}</span>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </article>
            ))}
          </div>
          <div className="hw-note" style={{ borderColor: "#536477" }}>
            <span className="hw-mono">What these are</span>
            <p>These are commitments we make to every customer. They are not a third-party certification. Ask us for the detail behind any of them.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Read further</p>
              <h2>The rest of the rules.</h2>
            </div>
            <p>How the tax checks, approvals and period locks work, and what this website does with your details.</p>
          </div>
          <div className="hw-cards">
            <article>
              <p className="hw-eyebrow">Tax and controls</p>
              <h3>Compliance</h3>
              <p>UAE VAT, corporate tax and ZATCA rules tested before anything posts, with approvals and period locks.</p>
              <a className="hw-link" href="/compliance">Read the compliance page <span aria-hidden="true">→</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">Straight answers</p>
              <h3>FAQ</h3>
              <p>What Hysaab does on its own, what it never does, and what it costs.</p>
              <a className="hw-link" href="/faq">Read the FAQ <span aria-hidden="true">→</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">This website</p>
              <h3>Privacy notice</h3>
              <p>What this site collects when you write to us or book a demo, and what it does not.</p>
              <a className="hw-link" href="/privacy">Read the privacy notice <span aria-hidden="true">→</span></a>
            </article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

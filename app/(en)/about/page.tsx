/* ── /about ──────────────────────────────────────────────────────────
   Rebuilt 2026-09 in the homepage design (PageShell + the hw-* kit in
   app/hysaab-home.css). Website change plan 2026-09-23: "We ran the
   work before we built the product." The origin story in full; Hysaab
   is a separate company; Oblique's accountants deliver the managed
   service; Simpla engineers the product (owner: Simpla stays). The
   founders are the two named in lib/team.ts. Principles are limited to
   behaviour the workspace has. */

import { PageShell, PageHero } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { TEAM } from "@/lib/team";

export const metadata = {
  title: "About Hysaab: We Ran the Work Before We Built It",
  description:
    "Hysaab is a separate company, built in Dubai by the team behind Oblique Consult and engineered with Simpla. Oblique’s accountants run the managed service.",
  alternates: langAlternates("/about"),
};

const PRINCIPLES = [
  {
    n: "01",
    h: "Every number traces to a document.",
    p: "Evidence is not optional. Each journal keeps its commentary and the documents behind it, so any figure can be opened and checked.",
  },
  {
    n: "02",
    h: "Nothing is deleted.",
    p: "Mistakes are reversed in the open, as mirrored entries with their own reason. The record of what happened stays complete.",
  },
  {
    n: "03",
    h: "Hysaab prepares. People approve.",
    p: "The work is prepared and brought to you with its reasoning. Accruals, payment runs and the period lock wait for a person, and an override needs a written reason that is kept with the books.",
  },
  {
    n: "04",
    h: "Compliance is the default.",
    p: "Invoices are tested against the tax-invoice rules as they arrive, and input VAT is held until a document qualifies. You review and file; Hysaab does not submit returns for you.",
  },
  {
    n: "05",
    h: "Honest about what it did.",
    p: "Software should say plainly what it did and what it cannot do. Uncertain items come to you with the reason, a questionable instruction is challenged, and some are refused.",
  },
];

export default function AboutPage() {
  return (
    <PageShell band={{ title: "Tell us what takes too long.", body: "Bring one process from your own month-end, or one return from your firm. We will show you where Hysaab fits, then confirm the scope and fees before any commitment." }}>
      <PageHero
        eyebrow="Why we built it"
        title={<>We ran the work<br /><span>before we built the product.</span></>}
        lede="Hysaab was built in Dubai by accountants who ran the month-end, the VAT filings and the FTA queries themselves, for their own clients, long before any of it was software."
      >
        <a className="hw-btn hw-btn--peach" {...DEMO}>Book a demo <span aria-hidden="true">↗</span><span className="hw-sr">{DEMO_NEW_TAB.en}</span></a>
        <a className="hw-link hw-link--light" href="/accounting"><span className="hw-play" aria-hidden="true">▷</span> See Hysaab Finance</a>
      </PageHero>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div className="hw-heading" style={{ display: "block", marginBottom: 0 }}>
              <div>
                <p className="hw-eyebrow">Where Hysaab comes from</p>
                <h2>The same ritual,<br /><span>every close.</span></h2>
              </div>
            </div>
            <div className="hw-prose">
              <p>
                Receipts chased over WhatsApp. Invoices vouched at midnight. A VAT deadline closing in
                on the quarter. And the numbers that actually matter, untouched.
              </p>
              <p>
                Oblique Consult does tax and accounting work for Gulf businesses. We
                watched capable finance teams, our own included, spend their nights on administrative
                work and miss what the data was saying.
              </p>
              <p>
                So we wrote down how we actually work: the checks we run on every invoice, the way we
                close a month, the questions a reviewer asks before signing. Then we built agents to
                do that work, show their evidence and leave the judgement to a person. First for our
                own tax team, then for the businesses around us, now for finance teams and firms across
                the Gulf.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="hw-block--family">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">How we are organised</p>
              <h2>A separate company.<br /><span>The same people.</span></h2>
            </div>
            <p>Who builds Hysaab, who sells it, and who does the work when you ask us to run it with you.</p>
          </div>
          <div className="hw-rows">
            <article><span className="hw-mono">01</span><h3>Hysaab is its own company.</h3><p>Hysaab is a separate company from Oblique Consult. It builds and sells the software: Hysaab Finance for finance teams, and Hysaab Practice and Hysaab Audit for firms.</p></article>
            <article><span className="hw-mono">02</span><h3>Oblique’s accountants run the managed service.</h3><p>When a company chooses the managed service, Oblique Consult’s accountants run the queue and prepare the close with its team, using Hysaab every day.</p></article>
            <article><span className="hw-mono">03</span><h3>Simpla engineers the product.</h3><p>The engineering is by Simpla, a Dubai team building tax and accounting AI, working at the same table as the accountants.</p></article>
            <article><span className="hw-mono">04</span><h3>Your workspace stays yours.</h3><p>Oblique Consult sees a customer’s workspace only when that customer has chosen the managed service or given written permission. <a href="/trust">Read our commitments</a>.</p></article>
          </div>
        </div>
      </section>

      <section className="hw-team">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">The founders</p>
              <h2>Accountants and engineers.<br /><span>At the same table.</span></h2>
            </div>
            <p>Finance experience and product engineering, working together in Dubai.</p>
          </div>
          <div className="hw-team-orgs">
            <a href="https://obliqueconsult.com" target="_blank" rel="noopener">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/partners/oblique-consult.svg" alt="Oblique Consult" width={1011} height={386} loading="lazy" />
              <span><strong>Oblique Consult</strong>Tax, accounting and advisory. Dubai. Its accountants run the managed service.<span className="hw-sr"> (opens in a new tab)</span></span>
            </a>
            <a href="https://www.simpla.ai" target="_blank" rel="noopener">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/partners/simpla.png" alt="Simpla" width={1024} height={304} loading="lazy" />
              <span><strong>Simpla</strong>Tax and accounting AI. Dubai. The engineers behind Hysaab.<span className="hw-sr"> (opens in a new tab)</span></span>
            </a>
          </div>
          <div className="hw-team-grid hw-team-grid--founders">
            {TEAM.map((p) => (
              <article key={p.name}>
                <span className="hw-team-initials" aria-hidden="true">{p.initials}</span>
                <h3>{p.name}</h3>
                <p className="hw-team-role">{p.role} · {p.org}</p>
                {p.bio && <p>{p.bio}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hw-block--sage">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">What we believe</p>
              <h2>Five rules.<br /><span>Held on every screen.</span></h2>
            </div>
            <p>These are the standards we worked to as accountants. Hysaab is built to keep them.</p>
          </div>
          <div className="hw-rows">
            {PRINCIPLES.map((r) => (
              <article key={r.n}>
                <span className="hw-mono">{r.n}</span>
                <h3>{r.h}</h3>
                <p>{r.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">The products</p>
              <h2>One way of working.<br /><span>Three products and a sister.</span></h2>
            </div>
            <p>Changing how tax, accounting and audit get done in the Gulf. Each product has a clear job to do.</p>
          </div>
          <div className="hw-cards hw-cards--4">
            <article className="is-navy">
              <p className="hw-eyebrow">For finance teams</p>
              <h3>Hysaab Finance</h3>
              <p>AI agents for accounting and reporting, with your team approving the calls that matter.</p>
              <a className="hw-link hw-link--peach" href="/accounting">Explore Hysaab Finance <span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">For tax and advisory firms</p>
              <h3>Hysaab Practice</h3>
              <p>AI agents for the tax work, with the firm’s admin running itself around it.</p>
              <a className="hw-link" href="/firms">Explore Hysaab Practice <span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">For licensed audit firms</p>
              <h3>Hysaab Audit</h3>
              <p>The ISA file, run by engines and concluded by your partners.</p>
              <a className="hw-link" href="/audit">Explore Hysaab Audit <span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">Finance hiring</p>
              <h3>Ibtidah</h3>
              <p>Find finance people through work-based assessment, with experienced professionals making the shortlist.</p>
              <a className="hw-link" href="/hire">Meet Ibtidah <span aria-hidden="true">↗</span></a>
            </article>
          </div>
        </div>
      </section>

      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div className="hw-heading" style={{ display: "block", marginBottom: 0 }}>
              <div>
                <p className="hw-eyebrow">Where to find us</p>
                <h2>Built in Dubai.</h2>
              </div>
            </div>
            <div className="hw-prose">
              <p>
                Hysaab is built by the team behind{" "}
                <a href="https://obliqueconsult.com" target="_blank" rel="noopener">Oblique Consult</a>.
              </p>
              <p>
                We are in Dubai, UAE, working across the Emirates and Saudi Arabia, in English and
                Arabic. Write to us at <a href="mailto:info@hysaab.ai">info@hysaab.ai</a>. A real
                person reads every message.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

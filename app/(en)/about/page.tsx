/* ── /about ──────────────────────────────────────────────────────────
   Rebuilt 2026-09 in the homepage design (PageShell + the hw-* kit in
   app/hysaab-home.css). The story is the one the page has always told:
   built in Dubai by accountants, first for their own tax team, then for
   the businesses around them. Principles are limited to behaviour the
   workspace has. Ownership is stated plainly: a product of Oblique
   Consult. */

import { PageShell, PageHero } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "About Hysaab: Why We Built It",
  description:
    "Hysaab is built in Dubai by accountants who worked through the month-end themselves. A product of Oblique Consult, engineered with Simpla.",
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
    <PageShell band={{ title: "Tell us what takes too long.", body: "Bring one process from your own month-end. We will show you where Hysaab fits, then confirm the scope and fees before any commitment." }}>
      <PageHero
        eyebrow="Why we built it"
        title={<>We have lived<br /><span>this month-end.</span></>}
        lede="Hysaab is built in Dubai by accountants who have worked through these processes themselves: the month-end, the VAT filings, the FTA queries. It was not designed by guessing at them."
      >
        <a className="hw-btn hw-btn--peach" href="/contact">Let’s talk <span aria-hidden="true">↗</span></a>
        <a className="hw-link hw-link--light" href="/product"><span className="hw-play" aria-hidden="true">▷</span> See the product</a>
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
                We watched capable finance teams spend their nights on administrative work and miss
                the real value sitting in front of them: what the data was saying.
              </p>
              <p>
                So we built the colleague we always wanted. One who prepares the work, shows the
                evidence and leaves the judgement to you. First for our own tax team, then for the
                businesses around us, now for the Gulf.
              </p>
            </div>
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
              <p className="hw-eyebrow">The family</p>
              <h2>One mission.<br /><span>Complementary products.</span></h2>
            </div>
            <p>Changing how tax, accounting and the services around them get done in the Gulf. Each product has a clear job to do.</p>
          </div>
          <div className="hw-cards hw-cards--4">
            <article className="is-navy">
              <p className="hw-eyebrow">Accounting &amp; reporting</p>
              <h3>Hysaab</h3>
              <p>Your day-to-day accounting and reporting, with human judgement where it matters.</p>
              <a className="hw-link hw-link--peach" href="/product">Explore the product <span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">Invoice processing</p>
              <h3>hysaab invoice</h3>
              <p>Tests supplier invoices against the FTA’s and ZATCA’s rules, with reasons for anything held for review.</p>
              <a className="hw-link" href="/invoice">Explore Invoice <span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">Firm operations</p>
              <h3>hysaab services OS</h3>
              <p>Client engagements, deadlines and oversight for professional services firms, together in one place.</p>
              <a className="hw-link" href="/firms">Explore Services OS <span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <p className="hw-eyebrow">Finance talent</p>
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
                <p className="hw-eyebrow">Who is behind it</p>
                <h2>Built in Dubai.</h2>
              </div>
            </div>
            <div className="hw-prose">
              <p>
                Hysaab is a product of{" "}
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

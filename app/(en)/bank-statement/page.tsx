/* ── /bank-statement: the free statement check and its insights ──────
   Landing page for the free tool at app.hysaab.ai/tools/bank-statement
   (orbit-app HANDOFF §122 and §140). The visitor uploads a PDF or CSV
   statement; Hysaab ties it out and, on request, sorts up to 100
   transactions (Claude reads, Jev checks) into a report. The page's story
   is the owner's (2026-10-25): any AI can read a statement; Hysaab is
   connected to the whole of a company's finance and remembers it. The
   sample report figures are the tool's own sample (fictional company).
   Styles: app/tick-tie.css (tt-*). */

import type { Metadata } from "next";
import { HomeHeader } from "@/components/home/HomeHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { Wp, Tm } from "@/components/home/tt/Wp";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";

const TOOL = "https://app.hysaab.ai/tools/bank-statement";

export const metadata: Metadata = {
  title: "Free Bank Statement Insights for UAE & KSA Businesses | Hysaab",
  description:
    "Upload a UAE or Saudi bank statement (PDF or CSV). Hysaab ties it out and sorts up to 100 transactions: where the money went, who pays you, what repeats, and what to look at. Free, no sign-up, nothing kept.",
  // English only for now: no Arabic twin, so no hreflang pair (a pair pointing at a 404 is worse than none).
  alternates: { canonical: "./" },
};

const SAMPLE_BARS: [string, number, string][] = [
  ["Salaries and WPS", 61_200, "36.8%"], ["Rent", 45_000, "27.1%"], ["VAT, corporate tax and Zakat", 18_450, "11.1%"],
  ["Suppliers", 17_199, "10.4%"], ["Owner drawings", 15_000, "9.0%"],
];

export default function Page() {
  const newTab = <span className="hw-sr">{DEMO_NEW_TAB.en}</span>;
  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2 });
  return (
    <div className="hw-page tt-page" id="top">
      <a href="#main" className="hw-skip">Skip to the content</a>
      <HomeHeader />
      <main id="main">
        {/* ── B-1 The offer ── */}
        <section className="tt-sec tt-grid tt-hero tt-hero3">
          <div className="hw-wrap">
            <Wp r="B-1" right="Free · no sign-up · nothing kept">Bank statement insights</Wp>
            <div className="tt-hero2-g tt-hero3-g">
              <div>
                <h1>Upload a bank statement. <span className="tt-hl">See what it says about your business.</span></h1>
                <p className="tt-hero-sub">A PDF or CSV from any UAE or Saudi bank. Hysaab checks every line adds up, then sorts up to 100 transactions: where the money went, who pays you, what repeats, and what to look at.</p>
                <div className="tt-acts tt-hero2-acts">
                  <a className="hw-btn hw-btn--navy m-cta" href={TOOL}>Check a statement free <span aria-hidden="true">→</span></a>
                  <a className="tt-link" {...DEMO}>Book a live demo <span aria-hidden="true">↗</span>{newTab}</a>
                </div>
              </div>
              <figure className="tt-bsr" aria-label="Sample report, fictional company">
                <p className="tt-bsr-h"><span>Statement insights · sample</span><span>22 transactions · Jul to Sep</span></p>
                <div className="tt-bsr-tiles">
                  <div><span>Money in</span><b>AED 162,500.00</b></div>
                  <div><span>Money out</span><b>AED 166,094.50</b></div>
                </div>
                <ul className="tt-bsr-bars">
                  {SAMPLE_BARS.map(([l, v, s]) => (
                    <li key={l}><span>{l}<small>{s} of money out</small></span><i style={{ width: `${(v / 61_200) * 100}%` }} /><b>{fmt(v)}</b></li>
                  ))}
                </ul>
                <p className="tt-bsr-flag"><Tm m="?" /> Possible double payment: Gulf Technical Supplies, AED 4,189.50 on 12 and 13 Sep.</p>
                <figcaption>Sample report · fictional company and figures</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ── B-2 What you get ── */}
        <section className="tt-sec" aria-labelledby="bs-get-h">
          <div className="hw-wrap">
            <Wp r="B-2" right="In about a minute">What you get</Wp>
            <h2 className="tt-h2" id="bs-get-h" data-reveal="">A statement you can <span className="tt-hl" data-play="">trust, and read.</span></h2>
            <div className="tt-outs" data-reveal="stagger-lg">
              <article><h3><Tm m="✓" />It adds up</h3><p>Opening balance plus every line equals the closing balance, to the fil. Gaps, misread lines and date errors are flagged.</p></article>
              <article><h3><Tm m="T" />Where the money went</h3><p>Every transaction sorted into plain categories, with the counterparty named: salaries, rent, suppliers, VAT, bank charges and more.</p></article>
              <article><h3><Tm m="B" />Who pays and who is paid</h3><p>Your biggest customers and suppliers, and the payments that come round every month.</p></article>
              <article><h3><Tm m="?" />What to look at</h3><p>Possible double payments, cash without receipts, money paid to owners, and large one-offs, each with what to do.</p></article>
            </div>
            <p className="tt-more">Plus a checked Excel by email, and a report you can save as PDF.</p>
          </div>
        </section>

        {/* ── B-3 The story ── */}
        <section className="tt-sec tt-memory" aria-labelledby="bs-story-h">
          <div className="hw-wrap">
            <Wp r="B-3" right="Why this is only the start">The memory</Wp>
            <h2 className="tt-h2" id="bs-story-h" data-reveal="">Any AI can read a bank statement. <span className="tt-hl" data-play="">That was never the hard part.</span></h2>
            <p className="tt-lead">Paste a statement into a chat window and it will sort it once, then forget it. The hard part of finance is knowing your company: which supplier always bills late, which customer pays in two parts, which costs you accrue at month end, and what your team decided last time. Hysaab is connected to all of it: your books, your bills and invoices, your bank, your people and every decision you make. It keeps what it learns, so next month starts where this one left off.</p>
            <ol className="tt-lur" data-reveal="stagger-lg">
              <li><span className="tt-lur-k">Learn</span><h3>From your own history.</h3><p>How you code each supplier and which payments come round every month, read from your ledger.</p></li>
              <li><span className="tt-lur-k">Unlearn</span><h3>When you correct it.</h3><p>Your correction outweighs the old pattern, which fades. It is never surer than its evidence.</p></li>
              <li><span className="tt-lur-k">Relearn</span><h3>On your say-so.</h3><p>A new rule is made only when you confirm it. Every close adds what your team confirmed and signed.</p></li>
            </ol>
            <p className="tt-more tt-more--dark"><a className="tt-link" href="/#sample">See Hysaab work on a month of books <span aria-hidden="true">→</span></a></p>
          </div>
        </section>

        {/* ── B-4 What happens to your file ── */}
        <section className="tt-sec tt-grid" aria-labelledby="bs-priv-h">
          <div className="hw-wrap">
            <Wp r="B-4" right="Read in memory, never stored">What happens to your statement</Wp>
            <h2 className="tt-h2" id="bs-priv-h" data-reveal="">Read, checked, <span className="tt-hl" data-play="">and forgotten.</span></h2>
            <ul className="tt-list tt-priv">
              <li><Tm m="✓" />Your file is read in memory on Hysaab&apos;s server and never saved to disk or storage.</li>
              <li><Tm m="✓" />A PDF, or a CSV our rules can&apos;t place, is read by Anthropic&apos;s Claude API, which doesn&apos;t train on it and deletes it within 30 days. A CSV our rules can read goes to no AI model.</li>
              <li><Tm m="✓" />Insights only when you press for them: up to 100 line descriptions go to Claude to sort, and the least certain to TypeSafe AI&apos;s Jev to check. The answer comes back to your browser; Hysaab keeps no copy.</li>
              <li><Tm m="✓" />No account needed. If you ask for the Excel by email, we keep your name, email and the bank&apos;s name, never the statement.</li>
            </ul>
            <div className="tt-acts" style={{ marginTop: 32 }}>
              <a className="hw-btn hw-btn--navy m-cta" href={TOOL}>Check a statement free <span aria-hidden="true">→</span></a>
              <a className="tt-link" href="/check">Or check your whole books, read-only <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";

import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "About — Orbit",
  description:
    "Orbit is built in the Gulf by accountants who lived the month-end they're deleting — one design standard, four products, human judgement kept where it belongs.",
  alternates: langAlternates("/about"),
};

export default function AboutPage() {
  return (
    <>
      <MgNav />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">ABOUT</div>
          <h1 className="mg-page-h">We lived the month-end we&rsquo;re deleting.</h1>
          <p className="mg-page-lede">
            Orbit is built in Dubai by accountants who have lived and slept through these processes —
            month-end, VAT filings, FTA queries — not by engineers guessing at them.
          </p>
        </section>

        <section className="mg-page-body mg-guide-body">
          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">Where Orbit comes from</h2>
            <p className="mg-guide-p">
              Every close, the same ritual: receipts chased over WhatsApp, invoices vouched at
              midnight, a VAT deadline breathing down the quarter — and the numbers that actually
              matter, untouched. We watched brilliant finance teams spend their nights on
              administrative work and overlook the real value sitting in front of them: what the data
              was saying.
            </p>
            <p className="mg-guide-p">
              So we built the colleague we always wanted: one who does the busywork, shows its
              evidence, and leaves the judgement to you. First for our own tax team, then for the
              businesses around us, now for the Gulf.
            </p>
          </div>

          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">What we believe</h2>
            <ul className="mg-guide-list">
              <li>Every number traces to a document — evidence is not optional</li>
              <li>Nothing is deleted; mistakes are reversed in the open</li>
              <li>Agents propose, deterministic engines post, humans approve the calls that matter</li>
              <li>Compliance isn&rsquo;t a feature — it&rsquo;s the default, tested before a dirham moves</li>
              <li>Software should say honestly what it did, and refuse honestly what it can&rsquo;t</li>
            </ul>
          </div>

          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">The family</h2>
            <p className="mg-guide-p">
              One mission — changing how tax, accounting and the services around them get done in the
              Gulf — carried by four products: <a className="textlink" href="/product">Orbit</a> runs
              the books, <a className="textlink" href="/hire">Orbit Hire</a> runs the hiring,{" "}
              <a className="textlink" href="/invoice">Orbit Invoice</a> tests every supplier invoice
              against the FTA&rsquo;s and ZATCA&rsquo;s rules, and{" "}
              <a className="textlink" href="/firms">Orbit for Firms</a> runs the practice itself.
            </p>
          </div>

          <div className="mg-guide-sec">
            <h2 className="mg-guide-h">Where we are</h2>
            <p className="mg-guide-p">
              Dubai, UAE — working across the Emirates and Saudi Arabia, in English and Arabic. Write
              to us at <a className="textlink" href="mailto:info@orbitgulf.com">info@orbitgulf.com</a>;
              a real person reads every message.
            </p>
          </div>

          <div className="mg-guide-cta">
            <a href="/product" className="mg-cta">See the product →</a>
            <a href="/contact" className="mg-ghost">Talk to us</a>
          </div>
        </section>
      </main>
      <MgFooter />
    </>
  );
}

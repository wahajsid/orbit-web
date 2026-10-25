/* ── Homepage v2 sections: how it works, the outcomes bento, the FAQ ───
   Copy follows the site's own claims (homepage, /accounting, /trust,
   /integrations); figures are sample data and labelled so. Styles: lp.css. */

import { Story } from "./Story";
import { Tm } from "@/components/home/tt/Wp";

export function HowItWorks() {
  return (
    <div className="lp-steps">
      <article className="lp-step" data-reveal="">
        <Story kind="consent" label="Xero's consent screen with read-only access switched on">
          <div className="lp-sheet lp-consent">
            <span className="lp-k">Xero · consent</span>
            <b>Connect Hysaab to Helio Trading LLC</b>
            <div className="lp-toggle"><span>Read-only access</span><span className="lp-sw" /></div>
            <div className="lp-toggle"><span>Post approved journals</span><span className="lp-k">Later, if you allow it</span></div>
            <span><span className="lp-chip lp-chip--hl">Connected · nothing changed</span></span>
          </div>
        </Story>
        <p className="lp-step-n">Step 01</p>
        <h3>Connect your books, read-only.</h3>
        <p>Xero, Zoho Books, QuickBooks, Odoo, Wafeq or ERPNext, through their own consent screens. Nothing in your ledger changes.</p>
      </article>
      <article className="lp-step" data-reveal="">
        <Story kind="ticks" label="Prepared items being ticked off one by one">
          <div className="lp-sheet">
            <div className="lp-row"><span>Bank lines matched</span><span className="m">312 / 312</span><span className="tk">B</span></div>
            <div className="lp-row"><span>Bills coded, with confidence</span><span className="m">48</span><span className="tk">✓</span></div>
            <div className="lp-row"><span>Accruals drafted, with basis</span><span className="m">3</span><span className="tk">T</span></div>
            <div className="lp-row"><span>Variances explained</span><span className="m">2</span><span className="tk">✓</span></div>
            <div className="lp-row"><span>Workpapers prepared</span><span className="m">31</span><span className="tk">✓</span></div>
          </div>
        </Story>
        <p className="lp-step-n">Step 02</p>
        <h3>Hysaab prepares the work.</h3>
        <p>Matching, coding, accruals and the close binder, each with the evidence behind it, ready before your team arrives.</p>
      </article>
      <article className="lp-step" data-reveal="">
        <Story kind="decide" label="An accrual waiting for approval, then approved">
          <div className="lp-sheet lp-decide">
            <span className="lp-k">Needs you · approval</span>
            <p style={{ marginTop: 8 }}><b>ACR-1031 · Hygeia Cleaning</b><br />AED 2,800.00 · evidence attached</p>
            <div className="acts"><span className="lp-btn-s lp-btn-s--go">Approve</span><span className="lp-btn-s">Ask a question</span></div>
            <p className="done">P · approved by Layla, 16:40</p>
          </div>
        </Story>
        <p className="lp-step-n">Step 03</p>
        <h3>You review and decide.</h3>
        <p>Approve, ask, or push back. Nothing posts until your approval rules say so, and the reason stays on the record.</p>
      </article>
    </div>
  );
}

export function Bento() {
  return (
    <div className="lp-bento">
      <article className="lp-card" data-reveal="">
        <Story kind="ticks" label="Bank lines being matched to their documents">
          <div className="lp-sheet">
            <div className="lp-row"><span>TRF FALCON FREIGHT</span><span className="m">−1,240.00</span><span className="tk">B</span></div>
            <div className="lp-row"><span>DD DESERT UTILITIES</span><span className="m">−4,108.75</span><span className="tk">B</span></div>
            <div className="lp-row"><span>INWARD TT ORYX RETAIL</span><span className="m">+18,400.00</span><span className="tk">B</span></div>
            <div className="lp-row"><span>POS AL NOOR STATIONERY</span><span className="m">−312.00</span><span className="tk">B</span></div>
          </div>
        </Story>
        <div className="lp-card-t">
          <h3><Tm m="B" />Understand your cash</h3>
          <p>Every bank line matched to the invoice, bill or payment behind it, and the balance agreed to the bank.</p>
          <p className="ex">212 lines matched overnight; two left for you, each with the reason. Sample data.</p>
        </div>
      </article>
      <article className="lp-card" data-reveal="">
        <Story kind="dup" label="The same supplier bill entered twice, the second one held">
          <div className="lp-dup">
            <div className="lp-sheet"><span className="lp-k">Bill · 4 Mar</span><b>GP-0412 · Gulf Packaging</b><span>Packaging, March</span><em>8,915.55</em></div>
            <div className="lp-sheet"><span className="lp-k">Bill · 6 Mar</span><b>GP-0412 · Gulf Packaging</b><span>Packaging, March</span><em>8,915.55</em></div>
            <span className="lp-stamp">Held · duplicate</span>
          </div>
        </Story>
        <div className="lp-card-t">
          <h3><Tm m="T" />Catch discrepancies</h3>
          <p>Duplicates, miscoded spend and missing bills found before they reach the accounts.</p>
          <p className="ex">The same supplier bill entered twice in March: held, not paid twice. Sample data.</p>
        </div>
      </article>
      <article className="lp-card" data-reveal="">
        <Story kind="cal" label="The close calendar filling to done, then October locked">
          <div className="lp-sheet">
            <div className="lp-row"><span>Close calendar · October</span><span className="m">T+1 to T+4</span><span /></div>
            <div className="lp-bar"><i /></div>
            <div className="lp-row"><span>Reconciliations signed</span><span className="m">7 / 7</span><span className="tk">P</span></div>
            <span className="lp-locked">October closed.</span>
          </div>
        </Story>
        <div className="lp-card-t">
          <h3><Tm m="✓" />Prepare the close</h3>
          <p>A dated close calendar with owners, reconciliations signed by a second person, and the binder filed.</p>
          <p className="ex">October’s 31 workpapers filed on the fourth working day. Sample data.</p>
        </div>
      </article>
      <article className="lp-card" data-reveal="">
        <Story kind="vat" label="A bill charging VAT on a zero-rated export, held with the rule cited">
          <div className="lp-sheet lp-inv">
            <div className="lp-row"><span>Export freight · INV-2290</span><span className="m">12,000.00</span><span /></div>
            <div className="lp-row"><span>VAT charged</span><span className="m"><span className="v">5% · 600.00<i className="lp-strike" /></span><span className="lp-fix">0%</span></span><span className="lp-q">?</span></div>
            <div className="lp-row"><span>Rule</span><span className="m">zero-rated export</span><span /></div>
            <div className="lp-row"><span>Status</span><span className="m"><span className="lp-chip lp-chip--hl">Held for you</span></span><span /></div>
          </div>
        </Story>
        <div className="lp-card-t">
          <h3><Tm m="?" />Answer tax questions</h3>
          <p>UAE and Saudi VAT and corporate tax checked as the work is done, not at filing time.</p>
          <p className="ex">A bill charging 5% VAT on a zero-rated export: held with the rule cited. Sample data.</p>
        </div>
      </article>
    </div>
  );
}

export const FAQ: [string, string][] = [
  ["Do we have to change our accounting system?", "No. Hysaab works inside Xero, Zoho Books, QuickBooks, Odoo, Wafeq and ERPNext, and your ledger stays the record. Using something else? We scope a connection with you in writing first."],
  ["Does anything post without our approval?", "No. Every change arrives as a proposal with its evidence, and nothing posts until your approval rules say so. Approval limits, period locks and control accounts stay in force."],
  ["What does it do each month?", "It matches the bank, codes bills with their confidence and history, holds input VAT until the invoice qualifies, drafts accruals with their basis, explains variances, and prepares the 31 workpapers of the close binder for your review."],
  ["Is it built for the UAE and Saudi Arabia?", "Yes. UAE and Saudi VAT, corporate tax and Zakat, AED and SAR, more than one entity in one workspace, and the whole workspace in Arabic, right to left."],
  ["How is it different from asking a chatbot?", "A chat window starts from nothing every time. Hysaab is connected to your books, your documents, your team and every decision you have made, and it keeps what it learns. It only makes a standing rule when you confirm it."],
  ["What happens to our data?", "Each company sits in its own tenant, every agent action is logged, and we do not train models on your data. These are commitments, not a third party certification; the detail is on our trust page."],
  ["How much does it cost?", "Self-serve starts from USD 199 a month, with no charge per user. For managed support or a custom setup, we confirm the scope and the fee in writing before you start."],
  ["How do we start?", "Request access, or book a demo. In the demo we connect read-only, so nothing in your books changes. You can also run a free check on your books or a bank statement first."],
];

export function Faq() {
  return (
    <div className="lp-faq">
      {FAQ.map(([q, a]) => (
        <details key={q}>
          <summary>{q}<i aria-hidden="true" /></summary>
          <p>{q === "What happens to our data?" ? <>{a.replace(" the detail is on our trust page.", " ")}<a href="/trust">the detail is on our trust page</a>.</> : a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqSchema() {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
}

/* ── hysaab.ai homepage — Tick & Tie (brand/tick-and-tie/BRAND.md) ───
   Finance-first homepage (2026-10-25, owner brief). One idea: Hysaab takes
   on the finance work inside the accounting system you already use. The
   visitor should leave thinking "I can give this a job, inspect its work,
   and make the decisions that matter." So:
     H-1 the promise beside the close film (kept, owner 2026-10-25), and
         under it a sample workspace where one
         piece of work runs from a gap to a reviewable entry ("Why this
         entry?" is the key click);
     H-2 everyday outcomes, each with a concrete example;
     H-3 the finished close: the 31-workpaper binder (kept);
     H-4 the memory story: any AI can read a statement, Hysaab remembers
         your company (learn, unlearn, relearn);
     H-5 your existing system, available vs planned;
     H-6 your control;
     H-7 firms, ways to work and who is behind it (moved down);
     H-8 the invitation: see Hysaab work on your books.
   Held back on purpose: "24/7" (until the agents provably run on their
   own) and a customer-proof section (until a named, measured close exists).
   Every figure is the product's own or labelled sample; nothing here is a
   customer result. Styles: app/tick-tie.css (tt-*), the workspace in
   components/home/sample-workspace.css, the film in close-film.css. */

import { HomeHeader } from "@/components/home/HomeHeader";
import { EnquiryForm, InterestLink } from "@/components/home/EnquiryForm";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { ACCESS_HREF, KEY_LINE } from "@/lib/access";
import { SiteFooter } from "@/components/home/SiteFooter";
import { TEAM } from "@/lib/team";
import { SwapLabel } from "@/components/motion/Kinetic";
import { Wp, Tm } from "@/components/home/tt/Wp";
import { ReviewNote } from "@/components/home/tt/ReviewNote";
import { CloseFilm } from "@/components/home/CloseFilm";
import { SampleWorkspace } from "@/components/home/SampleWorkspace";

/* The close binder, as the app files it (orbit-app lib/close-binder/registry.ts). */
const BINDER = [
  "Index and sign-off", "Trial balance and lead schedules", "Cash and bank", "Accounts receivable", "Prepayments",
  "Other receivables and deposits", "Inventory", "Fixed assets", "Leases (IFRS 16)", "Intangibles", "Intercompany",
  "Accounts payable", "Accruals", "Deferred revenue and contract liabilities", "Payroll and employee liabilities", "VAT",
  "Corporate tax and Zakat", "Loans and borrowings", "Other payables and provisions", "Equity", "Suspense and clearing",
  "FX revaluation", "Cut-off", "Journal entries register", "Balance sheet flux", "Income statement flux", "Cash flow working",
  "Financial statements", "Open items and exceptions", "Close checklist evidence", "Group consolidation",
];

/* Everyday outcomes, each with one concrete example (sample data). */
const OUTCOMES: { m: string; h: string; p: string; ex: string }[] = [
  { m: "B", h: "Understand your cash", p: "Every bank line matched to the invoice, bill or payment behind it, and the balance agreed to the bank.", ex: "212 lines matched overnight; two left for you, each with the reason." },
  { m: "T", h: "Catch discrepancies", p: "Duplicates, miscoded spend and missing bills found before they reach the accounts.", ex: "The same supplier bill entered twice in March: held, not paid twice." },
  { m: "✓", h: "Prepare the close", p: "A dated close calendar with owners, reconciliations signed by a second person, and the binder filed.", ex: "October’s 31 workpapers filed on the fourth working day." },
  { m: "?", h: "Answer tax questions", p: "UAE and Saudi VAT and corporate tax checked as the work is done, not at filing time.", ex: "A bill charging 5% VAT on a zero-rated export: held with the rule cited." },
];

/* What Hysaab works with today, and what is planned. The capabilities are
   the /integrations page's, system by system; nothing is widened here. */
const SYSTEMS: { name: string; how: string; does: string }[] = [
  { name: "Xero", how: "Xero’s own consent screen", does: "Reads the ledger, or works read-only beside it; posts approved journals when you allow it" },
  { name: "Zoho Books", how: "Zoho’s own consent screen", does: "Maps your chart of accounts; posts approved journals" },
  { name: "QuickBooks", how: "Intuit’s own consent screen", does: "Posts approved journals once the accounts are mapped" },
  { name: "Odoo", how: "API key, guided", does: "Self-hosted or Odoo.sh; history import; posts approved journals" },
  { name: "Wafeq", how: "API key, guided", does: "AED and SAR native; posts approved journals" },
  { name: "ERPNext", how: "API key pair, guided", does: "History import; posts approved journals" },
];
const PLANNED = ["NetSuite", "Microsoft Dynamics 365"];

const FIRMS: { who: string; status: string; name: string; line: string; href: string }[] = [
  { who: "For tax and advisory firms", status: "Coming soon", name: "Hysaab Practice", line: "Hundreds of VAT and CT checks on every return, with treatments drawn from your own precedents.", href: "/firms" },
  { who: "For licensed audit firms", status: "Coming soon", name: "Hysaab Audit", line: "Every journal scored and samples designed in code. A licensed partner concludes and signs.", href: "/audit" },
];

export const metadata = {
  title: "AI Agents for Finance Teams and Firms in UAE & KSA | Hysaab",
  description:
    "Your finance team, without changing your accounting system. Hysaab connects to Xero, Zoho Books or QuickBooks, investigates discrepancies and prepares the work for your review, from reconciliations to the month-end close. UAE and KSA.",
  alternates: langAlternates("/"),
};

const newTab = <span className="hw-sr">{DEMO_NEW_TAB.en}</span>;

export default function Page() {
  return (
    <div className="hw-page tt-page" id="top">
      <a href="#main" className="hw-skip">Skip to the content</a>
      <span data-motion-page="full" hidden />
      <HomeHeader />

      <main id="main">
        {/* ── H-1 The promise, and the work itself ── */}
        <section className="tt-sec tt-grid tt-hero tt-hero3">
          <div className="hw-wrap">
            <Wp r="H-1" right={<>Prepared by <b>Hysaab</b> · Decided by <b>you</b></>}>AI for accounting, close and finance</Wp>
            <div className="tt-hero2-g tt-hero3-g">
              <div className="tt-hero2-copy">
                <h1>Your finance team. <span className="tt-hl">Without changing your accounting system.</span></h1>
                <p className="tt-hero-sub">Hysaab connects to your books, investigates discrepancies and prepares the work for your review, from reconciliations to the month-end close. You see what’s done, what’s missing, and what needs your decision.</p>
                <div className="tt-acts tt-hero2-acts">
                  <a className="hw-btn hw-btn--navy m-cta" href="#sample">See Hysaab work <span aria-hidden="true">↓</span></a>
                  <a className="tt-link" {...DEMO}>Book a live demo <span aria-hidden="true">↗</span>{newTab}</a>
                </div>
              </div>
              <CloseFilm />
            </div>
            <SampleWorkspace />
          </div>
        </section>

        {/* ── H-2 Everyday outcomes ── */}
        <section className="tt-sec" id="outcomes" aria-labelledby="tt-out-h">
          <div className="hw-wrap">
            <Wp r="H-2" right="Examples · sample data">What it does every day</Wp>
            <h2 className="tt-h2" id="tt-out-h" data-reveal="">The work your team does now, <span className="tt-hl" data-play="">prepared before they get to it.</span></h2>
            <div className="tt-outs" data-reveal="stagger-lg">
              {OUTCOMES.map((o) => (
                <article key={o.h}>
                  <h3><Tm m={o.m} />{o.h}</h3>
                  <p>{o.p}</p>
                  <p className="tt-ex">{o.ex}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── H-3 The finished close: the film and the binder ── */}
        <section className="tt-sec tt-grid" id="binder" aria-labelledby="tt-binder-h">
          <div className="hw-wrap">
            <Wp r="H-3" right="The product's own numbers">What you get at the end of every close</Wp>
            <div>
              <div>
                <h2 className="tt-h2" id="tt-binder-h" data-reveal="">A closed month, <span className="tt-hl" data-play="">and the binder to prove it.</span></h2>
                <div className="tt-facts" data-reveal="stagger-lg">
                  <article><b>31</b><p>Excel workpapers in every close binder, each with who prepared it, who reviewed it, and DRAFT or FINAL.</p></article>
                  <article><b>T+1–T+5</b><p>Every close task dated by working day, with an owner. At-risk tasks show before the deadline.</p></article>
                  <article><b>0</b><p>Accruals booked before a person confirms them. Reconciliations need a second signature.</p></article>
                  <article><b>Days</b><p>Days to close, measured every month, so each close can be compared with the last.</p></article>
                </div>
              </div>
            </div>
            <div className="tt-binder" aria-label="The workpapers in a Hysaab close binder">
              <p className="tt-binder-h"><span>Close binder · one folder per month</span><span>{BINDER.length} workpapers</span></p>
              <ol>
                {BINDER.map((w, i) => <li key={w}><span>{String(i).padStart(2, "0")}</span>{w}</li>)}
              </ol>
            </div>
          </div>
        </section>

        {/* ── H-4 The memory story ── */}
        <section className="tt-sec tt-memory" id="memory" aria-labelledby="tt-mem-h">
          <div className="hw-wrap">
            <Wp r="H-4" right="Why it gets better every month">The memory</Wp>
            <h2 className="tt-h2" id="tt-mem-h" data-reveal="">Any AI can read a bank statement. <span className="tt-hl" data-play="">Hysaab remembers your company.</span></h2>
            <p className="tt-lead">A chat window starts from nothing every time. Hysaab is connected to your books, your documents, your team and every decision you have made, and it keeps what it learns. It is the part of finance that never forgets how your company works.</p>
            <ol className="tt-lur" data-reveal="stagger-lg">
              <li>
                <span className="tt-lur-k">Learn</span>
                <h3>From your own books.</h3>
                <p>It reads your ledger history to learn how your company codes each supplier and which bills recur every month.</p>
                <p className="tt-ex">“Hygeia bills in arrears. Accrue it at month end.”</p>
              </li>
              <li>
                <span className="tt-lur-k">Unlearn</span>
                <h3>When you correct it.</h3>
                <p>Correct a coding and your correction outweighs the old pattern, which fades. Its confidence is never higher than the evidence behind it.</p>
                <p className="tt-ex">“Not Office supplies. Staff welfare, from now on.”</p>
              </li>
              <li>
                <span className="tt-lur-k">Relearn</span>
                <h3>Every month, on your say-so.</h3>
                <p>A new rule is made only when you confirm it, and every close adds what owners confirmed and reviewers signed.</p>
                <p className="tt-ex">“Yes, make that a standing rule.”</p>
              </li>
            </ol>
          </div>
        </section>

        {/* ── H-5 Your existing system ── */}
        <section className="tt-sec tt-grid" id="systems" aria-labelledby="tt-sys-h">
          <div className="hw-wrap">
            <Wp r="H-5" right="Your ledger stays the record">Your accounting system</Wp>
            <h2 className="tt-h2" id="tt-sys-h" data-reveal="">Keep the system <span className="tt-hl" data-play="">you trust.</span></h2>
            <p className="tt-lead">Hysaab works with your accounting system, not instead of it. Nothing posts until your approval rules say so.</p>
            <div className="tt-sys">
              <table>
                <thead><tr><th scope="col">System</th><th scope="col">How it connects</th><th scope="col">What Hysaab does there</th><th scope="col">Status</th></tr></thead>
                <tbody>
                  {SYSTEMS.map((s) => (
                    <tr key={s.name}><th scope="row">{s.name}</th><td>{s.how}</td><td>{s.does}</td><td><span className="tt-st tt-st--ok">Available</span></td></tr>
                  ))}
                  {PLANNED.map((n) => (
                    <tr key={n}><th scope="row">{n}</th><td>—</td><td>On the roadmap</td><td><span className="tt-st">Planned</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="tt-more"><a className="tt-link" href="/integrations">How each connection works <span aria-hidden="true">→</span></a>Using something else? We scope a connection with you in writing first.</p>
          </div>
        </section>

        {/* ── H-6 Your control ── */}
        <section className="tt-sec" id="control" aria-labelledby="tt-ctl-h">
          <div className="hw-wrap">
            <Wp r="H-6" right="Review notes stay on the record">Your control</Wp>
            <div className="tt-ctl">
              <div data-reveal="">
                <h2 className="tt-h2" id="tt-ctl-h">A good colleague doesn&apos;t just <span className="tt-hl" data-play="">say yes.</span></h2>
                <p className="tt-lead">Every change arrives as a proposal with its evidence. When an instruction looks wrong, Hysaab explains why, and the decision and its reason stay on the record.</p>
              </div>
              <ReviewNote />
            </div>
            <div className="tt-pts" data-reveal="stagger-lg">
              <article><h3><Tm m="T" />Every answer has a trail.</h3><p>Open the entries and documents behind it. The working is there to inspect.</p></article>
              <article><h3><Tm m="✓" />Your limits stay put.</h3><p>Approval limits, period locks and the controls you set remain in force.</p></article>
              <article><h3><Tm m="P" />The why stays with the what.</h3><p>A permitted override needs a reason. The proposal, your decision and the history are kept together.</p></article>
            </div>
            <p className="tt-more"><a className="tt-link" href="/trust">Read our commitments on data and control <span aria-hidden="true">→</span></a></p>
          </div>
        </section>

        {/* ── H-7 Firms, ways to work, who is behind it ── */}
        <section id="ways" className="tt-sec tt-grid" aria-labelledby="tt-ways-h">
          <span id="products" className="hw-anchor" aria-hidden="true" />
          <span id="family" className="hw-anchor" aria-hidden="true" />
          <span id="firms" className="hw-anchor" aria-hidden="true" />
          <span id="team" className="hw-anchor" aria-hidden="true" />
          <span id="origin" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap">
            <Wp r="H-7" right="Scope agreed before we start">Ways to work</Wp>
            <h2 className="tt-h2" id="tt-ways-h" data-reveal="">Your people. <span className="tt-hl" data-play="">Or ours, alongside.</span></h2>
            <div className="tt-ways" data-reveal="stagger-lg">
              <article>
                <p className="tt-who">For your finance team</p>
                <h3>Your team runs the close.</h3>
                <p>Hysaab prepares the work. Your people review the exceptions, sign the workpapers and keep the decisions in-house.</p>
                <InterestLink interest="Own team">Discuss your team&apos;s close <span aria-hidden="true">↗</span></InterestLink>
              </article>
              <p className="tt-or" aria-hidden="true">or</p>
              <article>
                <p className="tt-who">For more hands-on support</p>
                <h3>We run it with you.</h3>
                <p>Oblique&apos;s accountants run the queue and prepare the close with you, using Hysaab every day. For mid-sized and larger companies.</p>
                <InterestLink interest="Managed support">Discuss managed support <span aria-hidden="true">↗</span></InterestLink>
              </article>
            </div>
            <div className="tt-firmrow">
              <p className="tt-who">Running a firm?</p>
              {FIRMS.map((f) => (
                <a key={f.name} href={f.href}>
                  <span className="tt-prod-st"><span>{f.who}</span><b>{f.status}</b></span>
                  <strong>{f.name}</strong>
                  <span>{f.line}</span>
                </a>
              ))}
              <a href="/hire"><span className="tt-prod-st"><span>Hiring into finance</span><b>Ibtidah</b></span><strong>Meet Ibtidah</strong><span>Screening and interviews for finance roles.</span></a>
            </div>
            <div className="tt-origin2">
              <p><Tm m="P" /> Built by accountants who ran the work first. Hysaab grew out of the tax and accounting work Oblique Consult does for Gulf businesses, and is engineered with Simpla.</p>
              <div className="tt-orgs">
                <a href="https://obliqueconsult.com" target="_blank" rel="noopener">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/partners/oblique-consult.svg" alt="Oblique Consult" width={1011} height={386} loading="lazy" />
                  <span><strong>{TEAM[0]?.name}</strong>{TEAM[0]?.role}, {TEAM[0]?.org}<span className="hw-sr"> (opens in a new tab)</span></span>
                </a>
                <a href="https://www.simpla.ai" target="_blank" rel="noopener">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/partners/simpla.png" alt="Simpla" width={1024} height={304} loading="lazy" />
                  <span><strong>{TEAM[1]?.name}</strong>{TEAM[1]?.role}, {TEAM[1]?.org}<span className="hw-sr"> (opens in a new tab)</span></span>
                </a>
              </div>
              <p className="tt-more"><a className="tt-link" href="/about">Read the full story <span aria-hidden="true">→</span></a></p>
            </div>
          </div>
        </section>

        {/* ── H-8 The invitation ── */}
        <section className="tt-sec tt-grid hw-conversation tt-conversation" id="conversation">
          <span id="contact" className="hw-anchor" aria-hidden="true" />
          <span id="cohort" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap">
            <Wp r="H-8" right="A person replies">See it on your books</Wp>
            <div className="hw-conversation-grid" data-reveal="stagger-lg">
              <div>
                <h2 className="tt-h2">See Hysaab work <span className="tt-hl" data-play="">on your books.</span></h2>
                <p className="tt-lead">Tell us your accounting system and what takes too long. In the demo we connect read-only, so nothing in your books changes.</p>
                <div className="hw-agenda">
                  <span className="hw-mono">What happens in the demo</span>
                  <ol>
                    <li><span className="hw-mono">01</span> We connect to your books read-only</li>
                    <li><span className="hw-mono">02</span> Hysaab checks a recent month and shows what it finds</li>
                    <li><span className="hw-mono">03</span> We walk through a close, its binder, and what you would approve</li>
                  </ol>
                </div>
                <p className="hw-demo-direct">Prefer to pick a time yourself? <a className="tt-link" {...DEMO}>Choose a slot in our calendar <span aria-hidden="true">↗</span>{newTab}</a></p>
                <p className="tt-invite">{KEY_LINE.en} <a className="hw-link hw-link--ruled" href={ACCESS_HREF.en}>Request access <span aria-hidden="true">→</span></a> <a className="hw-link hw-link--ruled" href="/check">Or check your books free <span aria-hidden="true">→</span></a></p>
              </div>
              <EnquiryForm demo />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter home />
    </div>
  );
}

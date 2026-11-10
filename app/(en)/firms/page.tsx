/* ── /firms: Hysaab Practice ─────────────────────────────────────────
   Rebuilt 2026-10-25 in the homepage's Tick & Tie language (W/P strips,
   the highlighter, a work film in the hero, the demo form at the end).
   Everything on the September page is kept: the tax work first (hundreds
   of VAT and CT checks, treatments from the firm's own precedents, a
   red-team review), the ServicesDay walkthrough, the nine areas, the
   SavingsCalc calculator, Hysaab Audit, the rules for the AI, the five
   questions firms ask (lib/trust.ts) and why we built it. The film is an
   illustrative return; its check count is the product's 144 UAE VAT
   checks. */

import { SiteHeader } from "@/components/home/HomeHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { EnquiryForm } from "@/components/home/EnquiryForm";
import { Wp, Tm } from "@/components/home/tt/Wp";
import { WorkFilm } from "@/components/home/WorkFilm";
import { ServicesDay } from "@/components/hysaab/ServicesDay";
import { SavingsCalc } from "@/components/hysaab/SavingsCalc";
import { langAlternates } from "@/lib/site-meta";
import { DEMO, DEMO_NEW_TAB } from "@/lib/demo";
import { FIRM_QUESTIONS } from "@/lib/trust";

export const metadata = {
  title: "Hysaab Practice: AI Agents for Tax and Advisory Firms",
  description:
    "Hysaab Practice runs the tax work for tax and advisory firms: hundreds of VAT and CT checks, treatments from your precedents and a review before filing.",
  alternates: langAlternates("/firms"),
};

/* Nine areas, three items each (the tax work first). */
const AREAS: { k: string; h: string; items: React.ReactNode[] }[] = [
  { k: "Filings", h: "A workbench for every return", items: [
    <><strong>Hundreds of VAT and CT checks</strong> across completeness, treatment and examination.</>,
    <><strong>Tax treatments proposed</strong> from the firm&apos;s own precedents first.</>,
    <><strong>Red-team review</strong> before approval; filed versions are permanent.</>,
  ] },
  { k: "Knowledge", h: "The firm's memory", items: [
    <><strong>Ask</strong> answers from your library and positions, with sources.</>,
    <><strong>Firm positions</strong> drafted, published and retired with approval.</>,
    <><strong>Academy</strong> quizzes and deterministic VAT, CT, penalty and WHT calculators.</>,
  ] },
  { k: "Clients", h: "Every client, in one file", items: [
    <><strong>Onboarding and KYC</strong> with trade licences and VAT certificates read into the profile.</>,
    <><strong>Data room and client portal</strong> with secure, expiring upload links.</>,
    <><strong>Health score</strong> from filing quality, responsiveness, engagement and risk.</>,
  ] },
  { k: "Daily", h: "My Day, inbox and tasks", items: [
    <><strong>My Day</strong> lists only what needs you: overdue tasks, approvals and deadlines.</>,
    <><strong>AI inbox</strong> matches every email to a client, files attachments and drafts the reply.</>,
    <><strong>Tax-authority notices</strong> from the FTA, ZATCA or MoF are forced to an urgent task.</>,
  ] },
  { k: "Meetings", h: "Before, during and after", items: [
    <><strong>Prep brief</strong>: one page on the client, open work and recent correspondence.</>,
    <><strong>Notes to actions</strong>: decisions and action items with owners and dates.</>,
    <><strong>Proposed tasks</strong> land in the queue; nothing is created until you confirm.</>,
  ] },
  { k: "Growth", h: "Pipeline to signed letter", items: [
    <><strong>Pipeline</strong> from lead to won, with cross-sell gaps across your client base.</>,
    <><strong>Proposals and engagement letters</strong> drafted from the scope you choose.</>,
    <><strong>Built-in e-signature</strong> sealed with a SHA-256 audit certificate.</>,
  ] },
  { k: "Time and billing", h: "Hours that become invoices", items: [
    <><strong>AI-drafted timesheets</strong> from the day&apos;s work; it may lower an estimate, never raise it.</>,
    <><strong>WIP, invoices and retainers</strong> with maker-checker approval.</>,
    <><strong>Expenses</strong> with receipts read automatically.</>,
  ] },
  { k: "Firm", h: "Run the practice on numbers", items: [
    <><strong>Realisation, effective rate and utilisation</strong> per person and per client.</>,
    <><strong>Capacity</strong> eight weeks ahead: who is idle, who is running hot.</>,
    <><strong>Firm brief</strong> and weekly digest for the partners.</>,
  ] },
  { k: "People", h: "HR without the spreadsheet", items: [
    <><strong>Leave, letters and documents</strong> in self-service.</>,
    <><strong>Appraisals</strong> where only a person can give a rating.</>,
    <><strong>Payroll</strong> with approval, visible to owners only.</>,
  ] },
];

const RULES: [string, string, string][] = [
  ["Proposals, not actions", "Every AI suggestion is a card", "Tasks, timesheet lines, obligations and tax treatments arrive as proposals. Nothing is created until someone accepts it."],
  ["People send", "No email leaves on its own", "Replies are drafted, never sent automatically. Auto-send to a client is off by default and, when enabled, waits in a 24-hour hold."],
  ["Money is deterministic", "Code does the arithmetic", "Fees, WIP, realisation and every tax figure are computed in code. The AI writes words around numbers, never the numbers."],
  ["Accountable by design", "A ledger of AI decisions", "Every AI decision is logged with whether a person agreed, and governance reports show clients and regulators how AI is used."],
  ["Judgement stays human", "Some things AI cannot touch", "Appraisal ratings are human only. Automation rules ship switched off. Returns, invoices and payroll need a maker and a checker."],
  ["Built to be trusted", "Security from the first table", "Row-level security on every table, access by engagement team, mandatory two-factor sign-in, expiring links, malware-scanned uploads and daily backups."],
];

const newTab = <span className="hw-sr">{DEMO_NEW_TAB.en}</span>;

export default function PracticePage() {
  return (
    <div className="hw-page tt-page" id="top">
      <a href="#main" className="hw-skip">Skip to the content</a>
      <span data-motion-page="full" hidden />
      <SiteHeader />
      <main id="main">
        {/* ── P-1 The promise and a return being checked ── */}
        <section className="tt-sec tt-grid tt-hero tt-hero3">
          <div className="hw-wrap">
            <Wp r="P-1" right={<>Prepared by <b>agents</b> · Decided by <b>your partners</b></>}>Hysaab Practice · for tax and advisory firms</Wp>
            <div className="tt-hero2-g tt-hero3-g">
              <div className="tt-hero2-copy">
                <h1>Every return checked <span className="tt-hl">before a partner signs it.</span></h1>
                <p className="tt-hero-sub">Agents run the tax work: hundreds of VAT and CT checks, treatments drawn from your own precedents and a red-team review before anything is filed. Your partners make the calls, and the firm runs itself around the work.</p>
                <div className="tt-acts tt-hero2-acts">
                  <a className="hw-btn hw-btn--navy m-cta" {...DEMO}>Book a demo <span aria-hidden="true">↗</span>{newTab}</a>
                  <a className="tt-link" href="#day">Watch a day in the firm <span aria-hidden="true">↓</span></a>
                </div>
              </div>
              <WorkFilm
                bar="Your firm · Q3 VAT return · Al Noor Trading" tag="Illustrative" title="Q3 VAT return"
                sr="Illustration of a VAT return in Hysaab Practice: the client's listings are read, 144 VAT checks run, a treatment is proposed from the firm's own precedent, a red-team review challenges the return and the narrative is drafted, leaving it ready for the partner's approval."
                cap="Illustrative client and figures · the checks are the product's own"
                rows={[
                  { label: "Data", task: "Sales and purchase listings read", done: "1,284 lines · tied to the ledger" },
                  { label: "Checks", task: "144 UAE VAT checks run", done: "141 pass · 3 findings, each with its rule" },
                  { label: "Treat", task: "Treatment proposed from precedent", done: "Firm position FP-12 · input VAT blocked on entertainment" },
                  { label: "Red team", task: "The return challenged", done: "2 challenges answered by the preparer" },
                  { label: "Draft", task: "Narrative and transmittal letter", done: "Drafted for the reviewer" },
                ]}
                final={{ k: "Ready for approval", h: "Return checked", s: "Findings resolved · the filed version will be permanent", sign: "Partner approval required" }}
              />
            </div>
          </div>
        </section>

        {/* ── P-2 The tax work first ── */}
        <section className="tt-sec" id="tax-work" aria-labelledby="pr-tax-h">
          <div className="hw-wrap">
            <Wp r="P-2" right="The work clients pay you for">The tax work first</Wp>
            <h2 className="tt-h2" id="pr-tax-h" data-reveal="">Your people spend their hours <span className="tt-hl" data-play="">on the calls.</span></h2>
            <p className="tt-lead">The work clients pay your firm for is judgement on their tax. Hysaab Practice prepares and tests that work first.</p>
            <ol className="tt-steps tt-steps3" data-reveal="stagger-lg">
              <li><span className="tt-step-n">01</span><div><h3>Hundreds of VAT and CT checks.</h3><p>Every return runs through hundreds of checks across completeness, treatment and examination before anyone is asked to review it. Each finding names the rule and the figure it concerns.</p></div></li>
              <li><span className="tt-step-n">02</span><div><h3>Treatments from your own precedents.</h3><p>Tax treatments are proposed from the firm’s own precedents first, with the source shown, so the answer is the one your firm would give.</p></div></li>
              <li><span className="tt-step-n">03</span><div><h3>A red-team review before approval.</h3><p>A red-team review challenges the return before a partner approves it. Filed versions are permanent: corrections supersede, never overwrite.</p></div></li>
            </ol>
          </div>
        </section>

        {/* ── P-3 A day in the firm ── */}
        <section className="tt-sec tt-grid" id="day" aria-labelledby="pr-day-h">
          <div className="hw-wrap">
            <Wp r="P-3" right="Illustrative firm and clients">A day in the firm</Wp>
            <h2 className="tt-h2" id="pr-day-h" data-reveal="">One Tuesday. <span className="tt-hl" data-play="">Six moments the admin used to eat.</span></h2>
            <p className="tt-lead">Press the buttons in the window: nothing the AI proposes counts until a person confirms it.</p>
            <div className="tt-embed"><ServicesDay /></div>
          </div>
        </section>

        {/* ── P-4 The firm runs itself around it ── */}
        <section className="tt-sec" aria-labelledby="pr-areas-h">
          <div className="hw-wrap">
            <Wp r="P-4" right="One record underneath">And the firm runs itself around it</Wp>
            <h2 className="tt-h2" id="pr-areas-h" data-reveal="">Nine areas of the firm. <span className="tt-hl" data-play="">One system underneath.</span></h2>
            <p className="tt-lead">Clients, filings, time, billing and people share one record, so a signed engagement letter creates the obligations, the obligations create the work, and the work becomes the timesheet and the invoice.</p>
            <div className="tt-areas" data-reveal="stagger-lg">
              {AREAS.map((a) => (
                <article key={a.k}>
                  <p className="tt-who">{a.k}</p>
                  <h3>{a.h}</h3>
                  <ul>{a.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
                </article>
              ))}
            </div>
            <p className="tt-promise"><Tm m="T" /> What it replaces: the practice management tool, the shared inbox, the deadline spreadsheets, the document portal, the CRM, the e-signature app, the timesheet app and the HR file.</p>
          </div>
        </section>

        {/* ── P-5 Time and cost ── */}
        <section className="tt-sec tt-grid" aria-labelledby="pr-calc-h">
          <div className="hw-wrap">
            <Wp r="P-5" right="Every assumption on the page">Time and cost</Wp>
            <h2 className="tt-h2" id="pr-calc-h" data-reveal="">What the admin <span className="tt-hl" data-play="">is costing your firm.</span></h2>
            <p className="tt-lead">Put in your team and your hourly cost. Every assumption is on the page, so the number is yours to argue with.</p>
            <div className="tt-embed"><SavingsCalc /></div>
          </div>
        </section>

        {/* ── P-6 The rules for the AI ── */}
        <section className="tt-sec tt-memory" aria-labelledby="pr-rules-h">
          <div className="hw-wrap">
            <Wp r="P-6" right="How the AI is allowed to work">The rules</Wp>
            <h2 className="tt-h2" id="pr-rules-h" data-reveal="">The model proposes. Code computes. <span className="tt-hl" data-play="">A named person confirms.</span></h2>
            <div className="tt-rules" data-reveal="stagger-lg">
              {RULES.map(([k, h, p]) => <article key={k}><p className="tt-who">{k}</p><h3>{h}</h3><p>{p}</p></article>)}
            </div>
          </div>
        </section>

        {/* ── P-7 Hysaab Audit, and the five questions ── */}
        <section className="tt-sec" id="questions" aria-labelledby="pr-q-h">
          <div className="hw-wrap">
            <Wp r="P-7" right="Straight answers">Five questions firms ask</Wp>
            <h2 className="tt-h2" id="pr-q-h" data-reveal="">Your clients stay yours. <span className="tt-hl" data-play="">Here is where we draw the line.</span></h2>
            <div className="hw-faq tt-faq">
              {FIRM_QUESTIONS.en.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <div className="hw-faq-a"><p>{f.a}</p></div>
                </details>
              ))}
            </div>
            <div className="tt-firmrow tt-firmrow--2">
              <a href="/audit"><span className="tt-prod-st"><span>If you sign audit opinions</span><b>Hysaab Audit</b></span><strong>The file runs here too</strong><span>Every journal scored against thirty ISA 240 criteria, samples designed and evaluated, workpapers written as the work concludes. Hysaab never signs an opinion.</span></a>
              <a href="/trust"><span className="tt-prod-st"><span>Read further</span><b>Trust</b></span><strong>Our commitments to firms</strong><span>How we look after your data, and the commercial boundaries we keep.</span></a>
            </div>
          </div>
        </section>

        {/* ── P-8 Why, and the invitation ── */}
        <section className="tt-sec tt-grid hw-conversation tt-conversation" id="conversation">
          <span id="contact" className="hw-anchor" aria-hidden="true" />
          <div className="hw-wrap">
            <Wp r="P-8" right="A person replies">Built inside a working Gulf tax firm</Wp>
            <div className="hw-conversation-grid" data-reveal="stagger-lg">
              <div>
                <h2 className="tt-h2">Give your people <span className="tt-hl" data-play="">their judgement back.</span></h2>
                <p className="tt-lead">Hysaab Practice started as the system our own advisory practice runs on. Every screen exists because a partner, a manager or a junior needed it on a real deadline, for real clients with the FTA on the other end. We are opening it to a small group of firms in the UAE and KSA first.</p>
                <p className="tt-promise"><Tm m="P" /> We will show you what works today, label what does not, and never let the AI make a call that belongs to your people.</p>
                <p className="hw-demo-direct">Prefer to pick a time yourself? <a className="tt-link" {...DEMO}>Choose a slot in our calendar <span aria-hidden="true">↗</span>{newTab}</a></p>
              </div>
              <EnquiryForm source="Practice page" demo />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

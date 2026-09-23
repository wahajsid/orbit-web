/* ── /firms: Hysaab Practice ─────────────────────────────────────────
   Rebuilt 2026-09 in the V4 design (PageShell + hw-* kit). Preserves
   the ServicesDay interactive walkthrough and SavingsCalc calculator.
   Website change plan 2026-09-23: the product is Hysaab Practice. The
   page leads with the tax work (hundreds of VAT and CT checks, treatments
   from the firm's own precedents, red-team review); the admin moves
   lower as "and the firm runs itself around it"; the areas list is cut
   from 31 items to 9 areas of 3; the five questions firms ask are
   answered (DRAFT: owner review, lib/trust.ts) with a link to /trust;
   every CTA books a demo. */

import { PageShell, PageHero } from "@/components/home/PageShell";
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

const newTab = <span className="hw-sr">{DEMO_NEW_TAB.en}</span>;

export default function PracticePage() {
  return (
    <PageShell band={{ kicker: "Book a demo", title: "Give your people their judgement back.", body: "Hysaab Practice opens to a small group of tax and advisory firms first. Book a demo and a real person will walk you through it on your own kind of return." }}>
      <PageHero
        eyebrow="For tax and advisory firms"
        title={<>Hysaab Practice.<br /><span>AI agents for tax and advisory firms.</span></>}
        lede={<>Agents run the tax work: hundreds of VAT and CT checks, treatments drawn from your own precedents and a red-team review before anything is filed. Your partners make the calls. <a href="/audit" style={{ color: "var(--hw-blush)" }}>Hysaab Audit</a> runs the ISA file alongside it.</>}
      >
        <a className="hw-btn hw-btn--peach" {...DEMO}>Book a demo <span aria-hidden="true">↗</span>{newTab}</a>
        <a className="hw-link hw-link--light" href="#day">Watch a day in the firm</a>
      </PageHero>

      {/* ── The tax work, first ── */}
      <section id="tax-work">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">The tax work first</p>
              <h2>Every return checked<br /><span>before a partner signs it.</span></h2>
            </div>
            <p>The work clients pay your firm for is judgement on their tax. Hysaab Practice prepares and tests that work, so your people spend their hours on the calls.</p>
          </div>
          <div className="hw-rows">
            <article><span className="hw-mono">01</span><h3>Hundreds of VAT and CT checks.</h3><p>Every return runs through hundreds of checks across completeness, treatment and examination before anyone is asked to review it. Each finding names the rule and the figure it concerns.</p></article>
            <article><span className="hw-mono">02</span><h3>Treatments from your own precedents.</h3><p>Tax treatments are proposed from the firm’s own precedents first, with the source shown, so the answer is the one your firm would give.</p></article>
            <article><span className="hw-mono">03</span><h3>A red-team review before approval.</h3><p>A red-team review challenges the return before a partner approves it, and variance narratives and transmittal letters are drafted for the reviewer. Filed versions are permanent: corrections supersede, never overwrite.</p></article>
          </div>
        </div>
      </section>

      {/* ── A day in the firm ── */}
      <section id="day" className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">A day in the firm</p>
              <h2>One Tuesday. Six moments the admin used to eat.</h2>
            </div>
            <p>Illustrative firm and clients. Press the buttons in the window: nothing the AI proposes counts until a person confirms it.</p>
          </div>
          <ServicesDay />
        </div>
      </section>

      {/* ── And the firm runs itself around it ── */}
      <section className="hw-block--family">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">And the firm runs itself around it</p>
              <h2>Nine areas of the firm.<br /><span>One system underneath.</span></h2>
            </div>
            <p>Clients, filings, time, billing and people share one record, so a signed engagement letter creates the obligations, the obligations create the work, and the work becomes the timesheet and the invoice.</p>
          </div>
          <div className="hw-cards">
            {AREAS.map((m) => (
              <article key={m.k}>
                <p className="hw-eyebrow">{m.k}</p>
                <h3>{m.h}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>{m.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
              </article>
            ))}
          </div>
          <div className="hw-note">
            <span className="hw-mono">What it replaces</span>
            <p>The practice management tool, the shared inbox, the deadline spreadsheets, the document portal, the CRM, the e-signature app, the timesheet app and the HR file.</p>
          </div>
        </div>
      </section>

      {/* ── Savings ── */}
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Time and cost</p>
              <h2>What the admin is costing your firm.</h2>
            </div>
            <p>Put in your team and your hourly cost. Every assumption is on the page, so the number is yours to argue with.</p>
          </div>
          <SavingsCalc />
        </div>
      </section>

      {/* ── Hysaab Audit ── */}
      <section className="hw-block--sage">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Hysaab Audit</p>
              <h2>If you sign audit opinions,<br /><span>the file runs here too.</span></h2>
            </div>
            <p>Hysaab Audit is built on the same clients, the same file room and the same rule: the engines compute, a licensed human concludes. Buy it on its own or with Hysaab Practice.</p>
          </div>
          <div className="hw-cards">
            <article>
              <p className="hw-eyebrow">Testing</p>
              <h3>Every journal, not twenty-five</h3>
              <p>Journal-entry testing scores the whole population against thirty ISA 240 criteria. Monetary-unit sampling designed, selected on a seed and evaluated to an upper misstatement limit. Fourteen tie-out engines set their own tick marks.</p>
            </article>
            <article>
              <p className="hw-eyebrow">The file</p>
              <h3>Written as the work concludes</h3>
              <p>Workpapers with purpose, source, procedure, results and a conclusion, cross-referenced. Preparer, reviewer and partner sign in order; a partner signature locks the version. Phase gates refuse to open while conditions are unmet.</p>
            </article>
            <article>
              <p className="hw-eyebrow">Independence</p>
              <h3>A firewall, not a policy</h3>
              <p>Audit records belong to the firm; the client grants read access for a fixed, revocable window. Testing runs on a hashed snapshot, never the live ledger. Hysaab never signs an opinion.</p>
            </article>
          </div>
          <div className="hw-note" style={{ borderColor: "#3e6356" }}>
            <span className="hw-mono">Explore further</span>
            <p><a href="/audit">See Hysaab Audit, screen by screen <span aria-hidden="true">→</span></a></p>
          </div>
        </div>
      </section>

      {/* ── Humans in the loop ── */}
      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">How the AI is allowed to work</p>
              <h2>The model proposes. Code computes.<br /><span>A named person confirms.</span></h2>
            </div>
          </div>
          <div className="hw-cards">
            <article className="is-navy">
              <p className="hw-eyebrow">Proposals, not actions</p>
              <h3>Every AI suggestion is a card</h3>
              <p>Tasks, timesheet lines, obligations and tax treatments arrive as proposals. Nothing is created until someone accepts it.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">People send</p>
              <h3>No email leaves on its own</h3>
              <p>Replies are drafted, never sent automatically. Auto-send to a client is off by default and, when enabled, waits in a 24-hour hold.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">Money is deterministic</p>
              <h3>Code does the arithmetic</h3>
              <p>Fees, WIP, realisation and every tax figure are computed in code. The AI writes words around numbers, never the numbers.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">Accountable by design</p>
              <h3>A ledger of AI decisions</h3>
              <p>Every AI decision is logged with whether a person agreed, and governance reports show clients and regulators how AI is used.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">Judgement stays human</p>
              <h3>Some things AI cannot touch</h3>
              <p>Appraisal ratings are human only. Automation rules ship switched off. Returns, invoices and payroll need a maker and a checker.</p>
            </article>
            <article className="is-navy">
              <p className="hw-eyebrow">Built to be trusted</p>
              <h3>Security from the first table</h3>
              <p>Row-level security on every table, access by engagement team, mandatory two-factor sign-in, expiring links, malware-scanned uploads and daily backups.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── Five questions firms ask (DRAFT: owner review, lib/trust.ts) ── */}
      <section id="questions">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Five questions firms ask</p>
              <h2>Your clients stay yours.<br /><span>Here is where we draw the line.</span></h2>
            </div>
            <p>Straight answers on the commercial boundaries. The full set of commitments, including how we look after your data, is on our <a href="/trust">trust page</a>.</p>
          </div>
          <div className="hw-faq">
            {FIRM_QUESTIONS.en.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <div className="hw-faq-a"><p>{f.a}</p></div>
              </details>
            ))}
          </div>
          <div className="hw-note">
            <span className="hw-mono">Read further</span>
            <p><a href="/trust">Our commitments to firms and finance teams</a></p>
          </div>
        </div>
      </section>

      {/* ── Why ── */}
      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div>
              <p className="hw-eyebrow">Why we built it</p>
              <h2>Built inside a working Gulf tax firm.</h2>
            </div>
            <div className="hw-prose">
              <p>Hysaab Practice started as the system our own advisory practice runs on. Every screen exists because a partner, a manager or a junior needed it on a real deadline, for real clients with the FTA on the other end.</p>
              <p>We are opening it to a small group of founding firms in the UAE and KSA. Founding firms shape what comes next and keep founder pricing for as long as they stay.</p>
            </div>
          </div>
          <div className="hw-note">
            <span className="hw-mono">Our promise</span>
            <p>We will show you what works today, label what does not, and never let the AI make a call that belongs to your people.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

/* ── /firms ──────────────────────────────────────────────────────────
   Rebuilt 2026-09 in the V4 design (PageShell + hw-* kit). Preserves
   the ServicesDay interactive walkthrough and SavingsCalc calculator.
   Content and claims carried over unchanged. */

import { PageShell, PageHero } from "@/components/home/PageShell";
import { ServicesDay } from "@/components/hysaab/ServicesDay";
import { SavingsCalc } from "@/components/hysaab/SavingsCalc";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "hysaab services OS: Engagements, Deadlines & Oversight for Firms",
  description:
    "The operating system for a professional services firm: client engagements, deadlines and oversight in one place, so partners spend their hours on judgement.",
  alternates: langAlternates("/firms"),
};

const MODULES: { k: string; h: string; items: React.ReactNode[] }[] = [
  { k: "Daily", h: "My Day, inbox and tasks", items: [
    <><strong>My Day</strong> lists only what needs you: overdue tasks, approvals, unsent drafts and deadlines.</>,
    <><strong>AI inbox</strong> matches every email to a client, files attachments, sets urgency and drafts the reply.</>,
    <><strong>Tax-authority notices</strong> from the FTA, ZATCA or MoF are forced to an urgent task.</>,
    <><strong>Team chat</strong> with an assistant that answers from a client&apos;s own documents.</>,
  ] },
  { k: "Clients", h: "Every client, in one file", items: [
    <><strong>Onboarding and KYC</strong> with trade licences and VAT certificates read into the profile.</>,
    <><strong>Data room and client portal</strong> with secure, expiring upload links.</>,
    <><strong>Health score</strong> from filing quality, responsiveness, engagement and risk.</>,
    <><strong>Relationship sweep</strong> surfaces dormant clients and drafts the check-in.</>,
  ] },
  { k: "Meetings", h: "Before, during and after", items: [
    <><strong>Prep brief</strong>: one page on the client, open work and recent correspondence.</>,
    <><strong>Notes to actions</strong>: attendees, decisions and action items with owners and dates.</>,
    <><strong>Proposed tasks</strong> land in the queue; nothing is created until you confirm.</>,
  ] },
  { k: "Filings", h: "A workbench for every return", items: [
    <><strong>250+ VAT and CT checks</strong> across completeness, treatment and examination.</>,
    <><strong>Tax treatments proposed</strong> from the firm&apos;s own precedents first.</>,
    <><strong>Red-team review</strong> before approval, variance narratives and transmittal letters.</>,
    <><strong>Filed versions are permanent</strong>: corrections supersede, never overwrite.</>,
  ] },
  { k: "Growth", h: "Pipeline to signed letter", items: [
    <><strong>Pipeline</strong> from lead to won, with cross-sell gaps across your client base.</>,
    <><strong>Proposals and engagement letters</strong> drafted from the scope you choose.</>,
    <><strong>Built-in e-signature</strong> sealed with a SHA-256 audit certificate.</>,
    <><strong>Regulatory radar</strong> drafts impact letters when the law moves.</>,
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
  { k: "Knowledge", h: "The firm's memory", items: [
    <><strong>Ask</strong> answers from your library and positions, with sources.</>,
    <><strong>Firm positions</strong> drafted, published and retired with approval.</>,
    <><strong>Academy</strong> quizzes and deterministic VAT, CT, penalty and WHT calculators.</>,
  ] },
  { k: "People", h: "HR without the spreadsheet", items: [
    <><strong>Leave, letters and documents</strong> in self-service.</>,
    <><strong>Appraisals</strong> where only a person can give a rating.</>,
    <><strong>Payroll</strong> with approval, visible to owners only.</>,
  ] },
];

export default function ServicesOsPage() {
  return (
    <PageShell band={{ kicker: "Founding firms", title: "Give your people their judgement back.", body: "hysaab services OS opens to a small group of tax and advisory firms first. Tell us about your firm and a real person will walk you through it within one working day." }}>
      <PageHero
        eyebrow="hysaab services OS · for tax and advisory firms"
        title={<>Your firm sells judgement.<br />Let the admin run itself.</>}
        lede={<>One operating system for a professional services firm, supercharged by AI. Agents sort the inbox, turn meetings into tasks, check every return, draft the letters and write the timesheet. Your people spend their day on clients and the calls only they can make. If you hold an audit licence, <a href="/audit" style={{ color: "var(--hw-blush)" }}>hysaab audit</a> runs the ISA file inside the same system.</>}
      >
        <a className="hw-btn hw-btn--peach" href="/contact">Join the founding firms <span aria-hidden="true">↗</span></a>
        <a className="hw-link hw-link--light" href="#day">Watch a day in the firm</a>
      </PageHero>

      {/* ── What it replaces ── */}
      <section className="hw-block--rule">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">The practice today</p>
              <h2>A firm runs on judgement.<br /><span>It drowns in the tools around it.</span></h2>
            </div>
            <p>Client context lives in someone&apos;s inbox. Deadlines live in a spreadsheet. Time is logged on Friday from memory. The advice clients pay for gets whatever hours are left.</p>
          </div>
          <div className="hw-rows">
            {[
              ["Practice management tool", "Tasks and filings"],
              ["Shared inbox", "AI-triaged inbox"],
              ["Deadline spreadsheets", "Live obligations"],
              ["Document portal", "Data room and portal"],
              ["CRM", "Pipeline and proposals"],
              ["E-signature app", "Built-in signing"],
              ["Timesheet app", "Drafted timesheets"],
              ["HR file", "People and payroll"],
            ].map(([old, now], i) => (
              <article key={old}>
                <span className="hw-mono" style={{ textDecoration: "line-through", color: "var(--hw-supporting)" }}>{old}</span>
                <h3>{now}</h3>
                <p />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── A day in the firm ── */}
      <section id="day">
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

      {/* ── Savings ── */}
      <section className="hw-block--rule">
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

      {/* ── Modules ── */}
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Everything in the OS</p>
              <h2>Nine areas of the firm.<br /><span>One system underneath.</span></h2>
            </div>
            <p>Clients, filings, time, billing and people share one record, so a signed engagement letter creates the obligations, the obligations create the work, and the work becomes the timesheet and the invoice.</p>
          </div>
          <div className="hw-cards">
            {MODULES.map((m) => (
              <article key={m.k}>
                <p className="hw-eyebrow">{m.k}</p>
                <h3>{m.h}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>{m.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── The audit module ── */}
      <section className="hw-block--sage">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">The audit module</p>
              <h2>If you sign audit opinions,<br /><span>the file runs here too.</span></h2>
            </div>
            <p>hysaab audit is built on the same clients, the same file room and the same rule: the engines compute, a licensed human concludes. It is sold on its own or with the rest of the OS.</p>
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
            <p><a href="/audit">See hysaab audit, screen by screen <span aria-hidden="true">→</span></a></p>
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

      {/* ── Why ── */}
      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-split">
            <div>
              <p className="hw-eyebrow">Why we built it</p>
              <h2>Built inside a working Gulf tax firm.</h2>
            </div>
            <div className="hw-prose">
              <p>hysaab services OS started as the system our own advisory practice runs on. Every screen exists because a partner, a manager or a junior needed it on a real deadline, for real clients with the FTA on the other end.</p>
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

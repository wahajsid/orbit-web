import { MgNav, MgFooter } from "@/components/MgChrome";
import { CtaBand } from "@/components/hysaab/CtaBand";
import { ServicesDay } from "@/components/hysaab/ServicesDay";
import { SavingsCalc } from "@/components/hysaab/SavingsCalc";
import { Wordmark } from "@/components/Wordmark";
import { langAlternates } from "@/lib/site-meta";

export const metadata = {
  title: "hysaab services OS, the operating system for tax and advisory firms",
  description:
    "One system for a professional services firm: an AI-triaged inbox, meeting notes that become tasks, a filing workbench with red-team review, proposals and e-signature, AI-drafted timesheets, billing, capacity and people, and hysaab audit for firms that sign ISA opinions. The AI proposes, code computes, a named person confirms.",
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
    <div className="hy-page">
      <MgNav />
      <main>
        {/* ── Hero ── */}
        <section className="hy-hero" id="top">
          <div className="hy-wrap hy-hero-grid">
            <div className="hy-hero-copy">
              <span className="hy-soon-chip"><i aria-hidden="true" /> Coming soon · founding firms</span>
              <span className="hy-kicker hy-kicker--blush">hysaab services OS · for tax and advisory firms</span>
              <h1 className="hy-hero-h1">Your firm sells judgement. Let the admin run itself.</h1>
              <p className="hy-hero-p">One operating system for a professional services firm, supercharged by AI. Agents sort the inbox, turn meetings into tasks, check every return, draft the letters and write the timesheet. Your people spend their day on clients and the calls only they can make. If you hold an audit licence, <a href="/audit" style={{ color: "var(--hy-blush)", borderBottom: "2px solid var(--hy-blush)" }}>hysaab audit</a> runs the ISA file inside the same system.</p>
              <div className="hy-hero-cta">
                <a href="/contact" className="hy-btn hy-btn--blush hy-btn--lg">Join the founding firms →</a>
                <a href="#day" className="hy-btn hy-btn--outline-cream hy-btn--lg">Watch a day in the firm</a>
              </div>
              <div className="hy-stats">
                <div className="hy-stat"><span className="hy-stat-n hy-num">45+</span><span className="hy-stat-l">AI skills that propose and never decide</span></div>
                <div className="hy-stat"><span className="hy-stat-n hy-num">250+</span><span className="hy-stat-l">VAT and CT checks on every filing</span></div>
                <div className="hy-stat"><span className="hy-stat-n hy-num">8 → 1</span><span className="hy-stat-l">tools replaced by one system</span></div>
              </div>
            </div>
            <div className="hy-hero-win">
              <div className="hy-win">
                <div className="hy-win-bar">
                  <Wordmark size={15} ground="navy" suffix={false} />
                  <span className="hy-win-org">services OS · firm brief</span>
                  <span className="hy-win-user"><span className="hy-win-user-n">This week</span></span>
                </div>
                <div className="hy-pane" style={{ minHeight: 0 }}>
                  <div className="hy-pane-head"><span className="hy-pane-title">Sahara Tax Advisory · 12 people</span><span className="hy-pane-status">illustrative</span></div>
                  <div className="hy-tiles">
                    <div className="hy-tile"><div className="hy-tile-l">Emails triaged</div><div className="hy-tile-n">412</div><div className="hy-tile-s">into 57 tasks</div></div>
                    <div className="hy-tile"><div className="hy-tile-l">Realisation</div><div className="hy-tile-n">88%</div><div className="hy-tile-s">up from 79%</div></div>
                    <div className="hy-tile"><div className="hy-tile-l">Filed on time</div><div className="hy-tile-n">31 / 31</div><div className="hy-tile-s">zero late</div></div>
                  </div>
                  <div className="hy-check">
                    <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--bad" aria-hidden="true">!</span><span className="hy-check-l"><strong>2 FTA notices</strong> raised to urgent tasks within minutes</span></div>
                    <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--ok" aria-hidden="true">✓</span><span className="hy-check-l"><strong>14 meetings</strong> became 38 tasks with owners and dates</span></div>
                    <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--ok" aria-hidden="true">✓</span><span className="hy-check-l"><strong>3 engagement letters</strong> signed inside the OS</span></div>
                    <div className="hy-check-row"><span className="hy-iv-mark hy-iv-mark--warn" aria-hidden="true">!</span><span className="hy-check-l"><strong>Omar at 118%</strong> capacity next week · rebalance proposed</span></div>
                  </div>
                  <div className="hy-pane-foot">All 412 emails matched to a client or ignored · 0 sent without a person</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── What it replaces ── */}
        <section className="hy-story hy-section hy-rule-b" id="replaces">
          <div className="hy-wrap">
            <div className="hy-story-head">
              <div className="hy-story-title">
                <span className="hy-kicker">The practice today</span>
                <h2 className="hy-h2 hy-h2--wide">A firm runs on judgement. It drowns in the tools around it.</h2>
              </div>
              <span className="hy-story-note">Client context lives in someone&apos;s inbox. Deadlines live in a spreadsheet. Time is logged on Friday from memory. The advice clients pay for gets whatever hours are left.</span>
            </div>
            <div className="hy-replace">
              {[
                ["Practice management tool", "Tasks and filings"],
                ["Shared inbox", "AI-triaged inbox"],
                ["Deadline spreadsheets", "Live obligations"],
                ["Document portal", "Data room and portal"],
                ["CRM", "Pipeline and proposals"],
                ["E-signature app", "Built-in signing"],
                ["Timesheet app", "Drafted timesheets"],
                ["HR file", "People and payroll"],
              ].map(([old, now]) => (
                <div key={old}><s>{old}</s><span>→ {now}</span></div>
              ))}
            </div>
          </div>
        </section>

        {/* ── A day in the firm ── */}
        <section className="hy-voices hy-section hy-rule-b" id="a-day">
          <div className="hy-wrap">
            <div className="hy-story-head">
              <div className="hy-story-title">
                <span className="hy-kicker">A day in the firm</span>
                <h2 className="hy-h2 hy-h2--wide">One Tuesday. Six moments the admin used to eat.</h2>
              </div>
              <span className="hy-story-note">Illustrative firm and clients. Press the buttons in the window: nothing the AI proposes counts until a person confirms it.</span>
            </div>
            <ServicesDay />
          </div>
        </section>

        {/* ── Savings ── */}
        <section className="hy-cohort hy-section hy-rule-b" id="savings">
          <div className="hy-wrap">
            <div className="hy-voices-head">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span className="hy-kicker">Time and cost</span>
                <h2 className="hy-h2">What the admin is costing your firm.</h2>
              </div>
              <span className="hy-note" style={{ maxWidth: 380 }}>Put in your team and your hourly cost. Every assumption is on the page, so the number is yours to argue with.</span>
            </div>
            <SavingsCalc />
          </div>
        </section>

        {/* ── Modules ── */}
        <section className="hy-agents hy-section" id="features">
          <div className="hy-wrap">
            <div className="hy-agents-head">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span className="hy-kicker hy-kicker--navy">Everything in the OS</span>
                <h2 className="hy-h2">Nine areas of the firm. One system underneath.</h2>
              </div>
              <p className="hy-agents-p">Clients, filings, time, billing and people share one record, so a signed engagement letter creates the obligations, the obligations create the work, and the work becomes the timesheet and the invoice.</p>
            </div>
            <div className="hy-agents-grid hy-grid-3">
              {MODULES.map((m) => (
                <div className="hy-mod" key={m.k}>
                  <span className="hy-mod-k">{m.k}</span>
                  <span className="hy-agent-h">{m.h}</span>
                  <ul>{m.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The audit module ── */}
        <section className="hy-voices hy-section hy-rule-b" id="audit">
          <div className="hy-wrap">
            <div className="hy-voices-head">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span className="hy-kicker">The audit module</span>
                <h2 className="hy-h2">If you sign audit opinions, the file runs here too.</h2>
              </div>
              <span className="hy-note" style={{ maxWidth: 400 }}>hysaab audit is built on the same clients, the same file room and the same rule: the engines compute, a licensed human concludes. It is sold on its own or with the rest of the OS.</span>
            </div>
            <div className="hy-agents-grid hy-grid-3" style={{ marginTop: 32 }}>
              <div className="hy-mod">
                <span className="hy-mod-k">Testing</span>
                <span className="hy-agent-h">Every journal, not twenty-five</span>
                <ul>
                  <li><strong>Journal-entry testing</strong> scores the whole population against thirty ISA 240 criteria and strata it.</li>
                  <li><strong>Monetary-unit sampling</strong> designed, selected on a seed and evaluated to an upper misstatement limit.</li>
                  <li><strong>Fourteen tie-out engines</strong> set their own tick marks, from ageing to the lease schedule.</li>
                </ul>
              </div>
              <div className="hy-mod">
                <span className="hy-mod-k">The file</span>
                <span className="hy-agent-h">Written as the work concludes</span>
                <ul>
                  <li><strong>Workpapers</strong> with purpose, source, procedure, results and a conclusion, cross-referenced.</li>
                  <li><strong>Preparer, reviewer and partner</strong> sign in order; a partner signature locks the version.</li>
                  <li><strong>Phase gates</strong> refuse to open while the conditions behind them are unmet.</li>
                </ul>
              </div>
              <div className="hy-mod">
                <span className="hy-mod-k">Independence</span>
                <span className="hy-agent-h">A firewall, not a policy</span>
                <ul>
                  <li><strong>Audit records belong to the firm</strong>; the client grants read access for a fixed, revocable window.</li>
                  <li><strong>Testing runs on a hashed snapshot</strong>, never the live ledger, and nothing in the module can write to one.</li>
                  <li><strong>Hysaab never signs</strong> an opinion. The partner walks the decision tree and records it.</li>
                </ul>
              </div>
            </div>
            <div style={{ marginTop: 28 }}>
              <a href="/audit" className="hy-btn hy-btn--navy hy-btn--lg">See hysaab audit, screen by screen →</a>
            </div>
          </div>
        </section>

        {/* ── Humans in the loop ── */}
        <section className="hy-whysec" id="control">
          <div className="hy-wrap">
            <span className="hy-kicker hy-kicker--blush">How the AI is allowed to work</span>
            <h2 className="hy-h2 hy-h2--why" style={{ marginTop: 18, maxWidth: "24ch" }}>The model proposes. Code computes. A named person confirms.</h2>
            <div className="hy-guard hy-grid-3">
              <div><span className="k">Proposals, not actions</span><h3>Every AI suggestion is a card</h3><p>Tasks, timesheet lines, obligations and tax treatments arrive as proposals. Nothing is created until someone accepts it.</p></div>
              <div><span className="k">People send</span><h3>No email leaves on its own</h3><p>Replies are drafted, never sent automatically. Auto-send to a client is off by default and, when enabled, waits in a 24-hour hold.</p></div>
              <div><span className="k">Money is deterministic</span><h3>Code does the arithmetic</h3><p>Fees, WIP, realisation and every tax figure are computed in code. The AI writes words around numbers, never the numbers.</p></div>
              <div><span className="k">Accountable by design</span><h3>A ledger of AI decisions</h3><p>Every AI decision is logged with whether a person agreed, and governance reports show clients and regulators how AI is used.</p></div>
              <div><span className="k">Judgement stays human</span><h3>Some things AI cannot touch</h3><p>Appraisal ratings are human only. Automation rules ship switched off. Returns, invoices and payroll need a maker and a checker.</p></div>
              <div><span className="k">Built to be trusted</span><h3>Security from the first table</h3><p>Row-level security on every table, access by engagement team, mandatory two-factor sign-in, expiring links, malware-scanned uploads and daily backups.</p></div>
            </div>
          </div>
        </section>

        {/* ── Built by / coming ── */}
        <section className="hy-family hy-section hy-rule-b">
          <div className="hy-wrap hy-why-grid">
            <div className="hy-why-copy">
              <span className="hy-kicker">Why we built it</span>
              <h2 className="hy-h2">Built inside a working Gulf tax firm.</h2>
              <p style={{ color: "var(--hy-body)" }}>hysaab services OS started as the system our own advisory practice runs on. Every screen exists because a partner, a manager or a junior needed it on a real deadline, for real clients with the FTA on the other end.</p>
              <p style={{ color: "var(--hy-body)" }}>We are opening it to a small group of founding firms in the UAE and KSA. Founding firms shape what comes next and keep founder pricing for as long as they stay.</p>
            </div>
            <div className="hy-beliefs">
              <div className="hy-belief"><span className="hy-belief-l">On the roadmap</span><span className="hy-belief-p">Calendar and meeting-recorder connections, so notes arrive without pasting.</span></div>
              <div className="hy-belief"><span className="hy-belief-p">Gmail and Outlook sync, sending replies from the inbox, and WhatsApp for client documents.</span></div>
              <div className="hy-belief hy-belief--promise"><span className="hy-belief-l">Our promise</span><span className="hy-belief-p">We will show you what works today, label what does not, and never let the AI make a call that belongs to your people.</span></div>
            </div>
          </div>
        </section>

        <CtaBand kicker="Founding firms" title="Give your people their judgement back." body="hysaab services OS opens to a small group of tax and advisory firms first. Tell us about your firm and a real person will walk you through it within one working day." />
      </main>
      <MgFooter />
    </div>
  );
}

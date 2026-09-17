/* ── /integrations ───────────────────────────────────────────────────
   Rebuilt 2026-09 in the homepage design (PageShell + the hw-* kit in
   app/hysaab-home.css). The six accounting systems, the way each one
   connects and what each one exchanges are carried over from the
   previous page, system by system: nothing was added and no capability
   was widened. The previous page gave no live / in progress / planned
   status for any system, so none is shown here. */

import type { Metadata } from "next";
import { PageShell, PageHero, Shot } from "@/components/home/PageShell";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "Integrations: Zoho Books, Xero, QuickBooks, Odoo, Wafeq and ERPNext | Hysaab",
  description:
    "How Hysaab connects to Zoho Books, Xero, QuickBooks, Odoo, Wafeq and ERPNext, and takes documents from WhatsApp, Telegram and email. Your ledger stays the system of record.",
  alternates: langAlternates("/integrations"),
};

const LEDGERS: { name: string; how: string; detail: string; extras: string[] }[] = [
  {
    name: "Zoho Books", how: "OAuth consent",
    detail: "Authorise once on Zoho’s own consent screen, with no keys to copy. Hysaab discovers your organisation, maps your chart of accounts and posts approved journals back.",
    extras: ["Two-way journal sync", "Chart-of-accounts mapping with review", "Data-centre aware: works with each Zoho region"],
  },
  {
    name: "Xero", how: "OAuth consent",
    detail: "The standard Xero consent flow. Hysaab reads the ledger for reconciliation and can import your history so reports have context from the start.",
    extras: ["Two-way journal sync", "Legacy-history import, clearly marked and not re-exported", "Attachment sync for evidence"],
  },
  {
    name: "QuickBooks", how: "OAuth · Intuit flow",
    detail: "Connect through Intuit’s official authorisation. Hysaab posts approved journals into your QuickBooks company and keeps the account mapping under your review.",
    extras: ["Two-way journal sync", "Realm-aware connection", "Mapped-account gate: journals wait until the accounts are mapped"],
  },
  {
    name: "Odoo", how: "API key · guided",
    detail: "A step-by-step panel shows where to create the API key inside your own Odoo instance. Hysaab authenticates with the key before storing anything, so a mistyped key does not become a connection.",
    extras: ["Works with self-hosted Odoo and Odoo.sh", "Legacy-history import", "Attachment sync"],
  },
  {
    name: "Wafeq", how: "API key · guided",
    detail: "A ledger built for the Gulf. Generate a key in Wafeq and paste it once. Hysaab verifies it, then posts approved journals.",
    extras: ["Journal posting", "AED and SAR native", "Revoke at any time from Wafeq’s side"],
  },
  {
    name: "ERPNext", how: "API key and secret · guided",
    detail: "Point Hysaab at your ERPNext instance with an API key pair. The connection is tested before it is saved, and your general ledger history can come in as clearly marked legacy data.",
    extras: ["Two-way journal sync", "Legacy-history import", "Suits self-hosted instances"],
  },
];

export default function IntegrationsPage() {
  return (
    <PageShell band={{ title: "Tell us what you run today.", body: "Bring the accounting system you use and one process that takes too long. We will walk it through the workspace with you, then confirm the scope and fees before any commitment." }}>
      <PageHero
        eyebrow="Integrations"
        title={<>Your ledger<br /><span>stays the ledger.</span></>}
        lede="Hysaab does not replace your accounting system. It does the work inside it. Connect one ledger, one at a time so there is a single source of truth, or connect nothing and let Hysaab keep the books itself."
      >
        <a className="hw-btn hw-btn--peach" href="/contact">Let’s talk <span aria-hidden="true">↗</span></a>
        <a className="hw-link hw-link--light" href="/how-it-works"><span className="hw-play" aria-hidden="true">▷</span> See how it works</a>
      </PageHero>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Accounting systems</p>
              <h2>Six ledgers.<br /><span>One connected at a time.</span></h2>
            </div>
            <p>Each card says how the connection is made and what passes across it. What is listed for one system is not implied for the others.</p>
          </div>
          <div className="hw-cards">
            {LEDGERS.map((l) => (
              <article key={l.name}>
                <p className="hw-eyebrow">{l.how}</p>
                <h3>{l.name}</h3>
                <p>{l.detail}</p>
                <ul className="hw-ticks">{l.extras.map((x) => <li key={x}>{x}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hw-block--sage">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">How a connection works</p>
              <h2>Connect once.<br /><span>Approve what posts.</span></h2>
            </div>
            <p>The connection gives Hysaab a place to post prepared work. What gets posted is still decided by your approval rules.</p>
          </div>
          <div className="hw-rows">
            <article><span className="hw-mono">01</span><h3>Connect once.</h3><p>Authorise on your ledger’s own consent screen, or create an API key with the guided steps. The connection is verified before anything is stored.</p></article>
            <article><span className="hw-mono">02</span><h3>Agree the approval rules.</h3><p>You set the thresholds. Anything above your journal-value threshold, any low-confidence coding and any suspected duplicate waits for a person. Account mapping stays under your review.</p></article>
            <article><span className="hw-mono">03</span><h3>Hysaab posts into your ledger.</h3><p>Approved journals are posted to the accounting system you already use, with their commentary and evidence kept in Hysaab. Your ledger stays the system of record.</p></article>
          </div>
        </div>
      </section>

      <section>
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Documents in</p>
              <h2>No ledger needed<br /><span>to start.</span></h2>
            </div>
            <p>The screen below is a capture of the Hysaab workspace running its sample dataset. Select it to see it in full.</p>
          </div>
          <div className="hw-feature">
            <div className="hw-feature-copy">
              <p className="hw-eyebrow">WhatsApp, Telegram and email</p>
              <h3>A verified channel is all Hysaab needs.</h3>
              <p>Send a photo by WhatsApp, forward an email or drop a PDF on Telegram. Every document is read, coded, tax-tested and filed with its evidence, whether or not a ledger is connected.</p>
              <ul className="hw-ticks">
                <li>Each document filed with the channel it came by</li>
                <li>Duplicates are held, not booked twice</li>
                <li>Anything uncertain comes to a person with the reason</li>
              </ul>
            </div>
            <Shot
              file="01-app-intake.png"
              title="Documents"
              alt="Hysaab intake ledger: documents received by WhatsApp, email and bank feed, each with a category and an outcome. One email address is redacted."
              caption="The intake ledger, sample data: each document with its category, channel and outcome."
            />
          </div>
          <div className="hw-note">
            <span className="hw-mono">Missing your system?</span>
            <p>
              If your accounting system is not among the six above,{" "}
              <a href="mailto:info@hysaab.ai?subject=Integration%20request" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>request an integration</a>{" "}
              and tell us what you run. We do not promise a date until the work is scoped.
            </p>
          </div>
        </div>
      </section>

      <section className="hw-block--dark">
        <div className="hw-wrap hw-section">
          <div className="hw-heading">
            <div>
              <p className="hw-eyebrow">Boundaries of a connection</p>
              <h2>Your system.<br /><span>Your switch.</span></h2>
            </div>
            <p>A connection is something you grant and can take back. It does not move your books out of the system you chose.</p>
          </div>
          <div className="hw-rows">
            <article><span className="hw-mono">01</span><h3>One ledger at a time.</h3><p>Hysaab connects to a single accounting system for each set of books, so there is one source of truth and not two that drift apart.</p></article>
            <article><span className="hw-mono">02</span><h3>Credentials stay server-side.</h3><p>Ledger credentials are stored server-side, encrypted, and are not sent to a browser.</p></article>
            <article><span className="hw-mono">03</span><h3>Revoke when you choose.</h3><p>Your ledger connection can be revoked at any time, from Hysaab or from the ledger’s side.</p></article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

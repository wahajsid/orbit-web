import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";

export const metadata: Metadata = {
  title: "Integrations — Orbit",
  description: "How Orbit connects to Zoho Books, Xero, QuickBooks, Odoo, Wafeq and ERPNext — and takes documents from WhatsApp, Telegram and email.",
};

const LEDGERS: { name: string; how: string; detail: string; extras: string[] }[] = [
  {
    name: "Zoho Books", how: "OAUTH · TWO CLICKS",
    detail: "Authorize once on Zoho's own consent screen — no keys to copy. Orbit discovers your organisation, maps your chart of accounts, and posts approved journals back.",
    extras: ["Two-way journal sync", "Chart-of-accounts mapping with review", "Data-centre aware (works on any Zoho region)"],
  },
  {
    name: "Xero", how: "OAUTH · TWO CLICKS",
    detail: "Standard Xero consent flow. Orbit reads the ledger for reconciliation and can import your history so reports have context from day one.",
    extras: ["Two-way journal sync", "Legacy-history import (clearly marked, never re-exported)", "Attachment sync for evidence"],
  },
  {
    name: "QuickBooks", how: "OAUTH · INTUIT FLOW",
    detail: "Connect through Intuit's official authorization. Orbit posts approved journals into your QuickBooks company and keeps the account mapping under your review.",
    extras: ["Two-way journal sync", "Realm-aware connection", "Mapped-account gate — nothing posts half-mapped"],
  },
  {
    name: "Odoo", how: "API KEY · GUIDED",
    detail: "A step-by-step panel shows exactly where to create the API key inside your own Odoo instance. Orbit authenticates before storing anything — a typo'd key never becomes a connection.",
    extras: ["Works with self-hosted and Odoo.sh", "Legacy-history import", "Attachment sync"],
  },
  {
    name: "Wafeq", how: "API KEY · GUIDED",
    detail: "Gulf-native ledger, first-class support. Generate a key in Wafeq, paste it once — Orbit verifies it live, then posts approved journals.",
    extras: ["Journal posting", "AED/SAR native", "Revoke any time from Wafeq's side"],
  },
  {
    name: "ERPNext", how: "API KEY + SECRET · GUIDED",
    detail: "Point Orbit at your ERPNext instance with an API key pair. Connection is tested before it's saved, and your GL history can ride in as clearly-marked legacy data.",
    extras: ["Two-way journal sync", "Legacy-history import", "Self-hosted friendly"],
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <MgNav />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">INTEGRATIONS</div>
          <h1 className="mg-page-h">Your ledger stays the ledger.</h1>
          <p className="mg-page-lede">
            Orbit doesn&rsquo;t replace your accounting system — it does the work inside it. Connect one
            ledger (one at a time, so there&rsquo;s a single source of truth), or connect nothing and let
            Orbit keep the books itself.
          </p>
        </section>
        <section className="mg-page-body">
          <div className="mg-int-grid">
            {LEDGERS.map((l) => (
              <div key={l.name} className="mg-int-cell">
                <div className="mg-kicker">{l.how}</div>
                <h2 className="mg-int-name">{l.name}</h2>
                <p className="mg-int-p">{l.detail}</p>
                <div className="mg-int-chips">
                  {l.extras.map((x) => <span key={x} className="mg-chip">{x}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 56 }}>
            <div className="mg-kicker">DOCUMENTS IN</div>
            <h2 className="mg-h2" style={{ fontSize: 30 }}>No ledger needed to start.</h2>
            <p className="mg-page-lede" style={{ marginTop: 0 }}>
              WhatsApp a photo, forward an email, drop a PDF on Telegram — a verified channel is all
              Orbit needs. Every document is read, coded, tax-tested and filed with its evidence,
              whether or not a ledger is connected.
            </p>
            <p className="mg-page-lede" style={{ marginTop: 12 }}>
              Missing your system?{" "}
              <a className="textlink" href="mailto:info@orbitgulf.com?subject=Integration%20request">Request an integration →</a>
            </p>
          </div>
        </section>
      </main>
      <MgFooter />
    </>
  );
}

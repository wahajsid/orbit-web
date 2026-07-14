import type { Metadata } from "next";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "FAQ — Orbit",
  description: "Straight answers about Orbit — the AI finance team for UAE & KSA businesses.",
};

const FAQS: [string, string][] = [
  [
    "What exactly is Orbit?",
    "An AI finance team for UAE and KSA businesses. Documents arrive by WhatsApp, Telegram or email; specialist agents read them, code them from your own history, test them against FTA and ZATCA tax rules, match them to POs and bank lines, and post them to your ledger. You approve the decisions that matter — nothing posts silently past the thresholds you set.",
  ],
  [
    "Do I have to replace my current accounting system?",
    "No. Orbit posts straight into Zoho Books, Xero, QuickBooks, Odoo, Wafeq or ERPNext — your ledger stays the system of record your accountant and auditor already know. One connected ledger at a time keeps a single source of truth.",
  ],
  [
    "What if I don't use any accounting system?",
    "Even simpler: forward documents by email or WhatsApp and Orbit keeps clean books for you — chart of accounts, journals, evidence trail included from day one.",
  ],
  [
    "Does the AI post things without asking me?",
    "Only below the limits you set. Anything above your journal-value threshold, any low-confidence coding, any duplicate suspicion — waits in a decision queue for a human. Every posting carries its evidence, so you can always see why.",
  ],
  [
    "How does Orbit handle VAT and Corporate Tax?",
    "UAE VAT (5%) is tested line-by-line against FTA tax-invoice criteria before input VAT is claimed; 9% Corporate Tax accrues monthly; VAT and CT are reconciled against each other so the two returns never tell different stories. For KSA, 15% VAT rules and ZATCA e-invoice clearance status are tracked. When the FTA asks questions, the audit-response assembler packages the evidence in one click.",
  ],
  [
    "Is my financial data safe?",
    "Your books live in an isolated tenant with row-level security; ledger credentials are stored server-side, encrypted, and never reach a browser. Sign-in supports mandatory two-factor authentication. Orbit never shares your data, and your ledger connection can be revoked by you at any time — from Orbit or from the ledger's side.",
  ],
  [
    "What does the founding cohort actually get?",
    "The first 100 companies get Orbit free for twelve months (fair-usage policy applies), with founder pricing locked in afterwards. Doors open 20 July 2026; founding entries are reviewed by a real person and invites go out by email.",
  ],
  [
    "What does it cost after that?",
    "Three tiers — Starter AED 149/mo, Growth AED 499/mo, Scale AED 1,499/mo — sized by how much of the AI team you use, not by user seats.",
  ],
  [
    "Why should I trust a product this young with my books?",
    "Because it was built by accountants who have lived and slept through these processes — month-end, VAT filings, FTA queries — not by engineers guessing at them. Every automated action leaves an audit trail, and the human approval gate is a design principle, not a feature toggle.",
  ],
  [
    "Is there an Arabic version?",
    "Arabic support is on the near-term roadmap and lands with founding-cohort feedback. The team behind Orbit works in both languages — نتحدث العربية — and support in Arabic is available today at info@orbitgulf.com.",
  ],
];

export default function FaqPage() {
  return (
    <>
      <SiteNav sub />
      <main className="wrap subpage">
        <div className="microlabel kicker">FAQ</div>
        <h1 className="subpage-head">Straight answers.</h1>
        <p className="subpage-sub">
          The questions founders and finance leads actually ask us. Anything missing —
          <a href="mailto:info@orbitgulf.com" className="textlink" style={{ marginLeft: 6 }}>ask a real person</a>.
        </p>
        <div className="faq-list">
          {FAQS.map(([q, a]) => (
            <div key={q} className="faq-item">
              <h2 className="faq-q">{q}</h2>
              <p className="faq-a">{a}</p>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

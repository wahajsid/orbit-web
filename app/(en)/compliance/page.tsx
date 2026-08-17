import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "Compliance — Orbit",
  description:
    "How Orbit keeps UAE VAT, Corporate Tax and KSA ZATCA rules enforced by default — every document tax-tested before posting, period locks agents cannot cross, a full audit trail, and human approval past your thresholds.",
  alternates: langAlternates("/compliance"),
};

/* The compliance promises, cell by cell. Every claim here mirrors the
   FAQ, the home band and /how-it-works exactly — one public source of
   truth; if a claim isn't made there, it isn't made here. */
const CELLS: { k: string; h: string; p: string }[] = [
  {
    k: "UAE VAT · ARTICLE 59",
    h: "Every inbound invoice, tax-tested",
    p: "Before input VAT is claimed, each invoice is tested against the FTA's tax-invoice criteria — TRN present, rates, arithmetic, rounding. An invoice that fails is held with the reason stated, not silently claimed.",
  },
  {
    k: "CORPORATE TAX",
    h: "Accrued monthly, reconciled against VAT",
    p: "UAE Corporate Tax (9%) accrues monthly instead of surfacing as a year-end surprise — and VAT and CT are reconciled against each other, so the two returns never tell different stories.",
  },
  {
    k: "KSA · ZATCA",
    h: "15% VAT and e-invoice clearance tracked",
    p: "For Saudi entities, the 15% VAT rules apply and ZATCA e-invoice clearance status is tracked invoice by invoice — the claim is only as good as the cleared document behind it.",
  },
  {
    k: "E-INVOICING",
    h: "Ready ahead of the UAE mandate",
    p: "Orbit reads and validates structured invoices today, ahead of the UAE e-invoicing mandate — the switch is a date on a calendar, not a migration.",
  },
  {
    k: "PERIOD LOCKS",
    h: "Locked means locked",
    p: "When you close a period it locks, and agents cannot cross the lock. Nothing is ever deleted — voids are mirrored reversals, so the trail stays whole.",
  },
  {
    k: "AUDIT TRAIL",
    h: "Every action logged, with evidence",
    p: "Every action, human or agent, is logged with its source evidence and the agent's commentary. When the auditor or the FTA asks, you hand over the packaged trail — not a shoebox.",
  },
  {
    k: "HUMAN APPROVAL",
    h: "Nothing posts silently past your thresholds",
    p: "Agents propose, deterministic engines post, humans approve. Anything above your journal-value threshold, any low-confidence coding, any duplicate suspicion — waits in the decision queue for a person.",
  },
  {
    k: "DATA SECURITY",
    h: "Isolated tenant, encrypted credentials",
    p: "Your books live in an isolated tenant with row-level security. Ledger credentials are stored server-side, encrypted, and never reach a browser. Sign-in supports mandatory two-factor authentication, and your ledger connection can be revoked at any time — from Orbit or from the ledger's side.",
  },
];

export default function CompliancePage() {
  return (
    <>
      <MgNav />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">COMPLIANCE</div>
          <h1 className="mg-page-h">Compliance isn&rsquo;t a feature. It&rsquo;s the default.</h1>
          <p className="mg-page-lede">
            Every document is tested against the tax rules before a dirham moves. Every journal
            carries its evidence. Every period lock is final. This page is the plain-language map
            of how Orbit keeps your books defensible — in the UAE and in Saudi Arabia.
          </p>
        </section>
        <section className="mg-page-body">
          <div className="mg-int-grid">
            {CELLS.map((c) => (
              <div key={c.k} className="mg-int-cell">
                <div className="mg-kicker">{c.k}</div>
                <div className="mg-int-name">{c.h}</div>
                <p className="mg-int-p">{c.p}</p>
              </div>
            ))}
          </div>
          <div className="mg-guide-cta">
            <a href="/#join" className="mg-cta">Book a demo →</a>
            <a href="/faq" className="mg-ghost">Straight answers in the FAQ</a>
          </div>
        </section>
      </main>
      <MgFooter />
    </>
  );
}

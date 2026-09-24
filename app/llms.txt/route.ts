import { GUIDES } from "@/lib/guides";
import { TOOLS } from "@/lib/tools";

/* llms.txt for AI answer engines. The header is hand-written; the guide
   and tool lists come from the registries so a new page is never missing
   (the hand-maintained public/llms.txt drifted behind the guides). */

export const dynamic = "force-static";

const BASE = "https://hysaab.ai";

const HEADER = `# Hysaab

> Hysaab builds AI agents for finance teams and the firms that serve them in the UAE and Saudi Arabia. The agents do the finance work; people review and approve. Three products: Hysaab Finance for finance teams, and Hysaab Practice and Hysaab Audit for tax, advisory and audit firms. Evidence on every number, and a person's approval on every decision that matters.

Key facts:
- Products: Hysaab Finance (AI agents for accounting and reporting: payables, receivables, the ledger, invoice checks, the month-end close and the reporting pack, inside the ledger a business already uses); Hysaab Practice (AI agents for tax and advisory firms: hundreds of VAT and CT checks per return, treatments proposed from the firm's own precedents, a red-team review before approval, and the firm's admin around it); Hysaab Audit (an ISA audit file for licensed audit firms: engines test a hashed snapshot and a licensed partner concludes; Hysaab never signs an opinion). The sister product Ibtidah is finance hiring through work-based assessment (https://ibtidah.ae).
- Two ways to work with Hysaab Finance: self-serve, from USD 199 a month (your team reviews and approves; the agents prepare the work), or the managed service, priced by scope, in which Oblique Consult's accountants run the queue and prepare the close with you, using Hysaab every day. Firms pay a setup fee plus a monthly subscription for Hysaab Practice and Hysaab Audit. Fees are confirmed in writing before you start; there is no charge per user.
- Made for the Gulf: UAE VAT (5%) tested line by line against FTA tax-invoice criteria (Article 59) before input VAT is claimed; 9% UAE Corporate Tax reconciled against VAT; KSA 15% VAT and ZATCA e-invoicing rules.
- Every number traces to a document; nothing is deleted (voids are mirrored reversals); agents propose, deterministic engines post, people approve; the period lock is pressed by a person. Hysaab does not file returns.
- Ledgers: system-agnostic. Ready-made connections for Xero, QuickBooks, Wafeq, Odoo, Zoho Books and ERPNext, and a custom connection for any other accounting software. Books Check (the free read-only check) reads Xero and QuickBooks today.
- Approval is the promise, not approval forever: nothing posts outside the rules the customer approves. Each ledger connection climbs a trust ladder the customer controls: it starts read-only and earns write access. Observe (reads): Hysaab reads and compares and writes nothing; the free Books Check reads only (with the customer's separate consent it can also create unposted drafts of its fixes in Xero). Propose (drafts, the trial): fixes are prepared as drafts, in Hysaab or as unposted drafts in the ledger, and each waits for a person's approval. Execute (posts, after the trial): routine journals post on their own inside the rules agreed, each one recorded; anything unusual or below the confidence gate still goes to a person.
- The agents communicate as well as write: they chase overdue customer invoices on the collections cadence the customer sets (with a statement of account from the second reminder; reminders wait for approval unless auto-send for routine ones is switched on, and escalations always go to a person), ask for the receipt behind a bank payment with no document, answer the team's questions and tasks on WhatsApp or by email, and draft journals (accruals, reclassifications, corrections) for approval. In short: it reads the books, writes the entries and chases what is missing; the customer approves.
- Company: Hysaab is a separate company, built in Dubai by the team behind Oblique Consult (https://obliqueconsult.com, a Dubai tax and accounting advisory); the engineering is by Simpla. Founders: Wahaj Siddiqui and Saad Zafar. Contact info@hysaab.ai; the app runs at app.hysaab.ai.
- Languages: English and Arabic. Marketing pages have Arabic (RTL) twins under ${BASE}/ar (for example /ar, /ar/accounting, /ar/pricing, /ar/trust).

## Pages
- [Home](${BASE}/): what Hysaab is, for finance teams and for firms
- [Hysaab Finance](${BASE}/accounting): AI agents for accounting and reporting; the six parts of the workspace, multi-entity close and group reporting
- [Invoice checks](${BASE}/invoice): how Hysaab Finance tests every supplier invoice against the UAE and KSA tax-invoice rules
- [Hysaab Practice](${BASE}/firms): AI agents for tax and advisory firms, and the five questions firms ask
- [Hysaab Audit](${BASE}/audit): an AI-native ISA audit file for licensed Gulf audit firms; a licensed human concludes
- [Pricing](${BASE}/pricing): self-serve from USD 199 a month, managed priced by scope, and firms
- [Trust](${BASE}/trust): commercial boundaries with firms, the trust ladder of connection modes (reads, drafts, posts), and the data controls (separate tenants, logged agent actions, no training on customer data, encrypted credentials, staff access only with written permission)
- [Compliance](${BASE}/compliance): how UAE VAT (Article 59), Corporate Tax, KSA ZATCA rules, period locks, audit trails and approval gates are enforced by default
- [How it works](${BASE}/how-it-works): plain-English walkthrough from a document arriving to a locked period
- [Integrations](${BASE}/integrations): how the ledger connections work
- [Books Check](${BASE}/check): a free, read-only check of Xero or QuickBooks books
- [Guides](${BASE}/guides): practical UAE and KSA tax and close guides
- [Tools](${BASE}/tools): free UAE and KSA tax and IFRS calculators
- [FAQ](${BASE}/faq): straight answers on data safety, autonomy limits, pricing
- [About](${BASE}/about): who builds Hysaab and why
- [Ibtidah](${BASE}/hire): the sister hiring product
- [Contact](${BASE}/contact): how to reach the team
- [الموقع بالعربية](${BASE}/ar): the marketing site in Arabic, right to left
`;

export function GET() {
  const guides = [...GUIDES]
    .sort((a, b) => b.updated.localeCompare(a.updated))
    .map((g) => `- [${g.title}](${BASE}/guides/${g.slug}): ${g.description} (updated ${g.updated})`);
  const tools = TOOLS.map((t) => `- [${t.title}](${BASE}/tools/${t.slug}): ${t.description}`);
  const body = `${HEADER}\n## Guides\n${guides.join("\n")}\n\n## Tools\n${tools.join("\n")}\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

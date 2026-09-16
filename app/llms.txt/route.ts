import { GUIDES } from "@/lib/guides";
import { TOOLS } from "@/lib/tools";

/* llms.txt for AI answer engines. The header is hand-written; the guide
   and tool lists come from the registries so a new page is never missing
   (the hand-maintained public/llms.txt drifted behind the guides). */

export const dynamic = "force-static";

const BASE = "https://hysaab.ai";

const HEADER = `# Hysaab

> Hysaab is an AI finance team for UAE and KSA businesses. Documents arrive by WhatsApp, Telegram or email; specialist agents read them, code them from the business's own posting history, test them against FTA and ZATCA tax rules, match them to purchase orders and bank lines, and post them to the ledger — with human approval on every decision that matters. Hysaab sits on top of the ledger a business already uses (Zoho Books, Xero, QuickBooks, Odoo, Wafeq, ERPNext) rather than replacing it, or keeps clean books itself when there is no ledger.

Key facts:
- Made for the Gulf: UAE VAT (5%) tested line-by-line against FTA tax-invoice criteria (Article 59) before input VAT is claimed; 9% UAE Corporate Tax accrued monthly and reconciled against VAT; KSA 15% VAT and ZATCA e-invoice clearance tracked.
- Every number traces to a document; nothing is deleted (voids are mirrored reversals); agents propose, deterministic engines post, humans approve past confidence thresholds.
- Month-end close runs as a checklist: accruals proposed, variances flagged, bank reconciled, VAT drafted — then the period locks and agents cannot cross the lock.
- Two ways to run it: self-serve automated workflows for small businesses (Starter AED 149/month, Growth AED 499/month) and a managed accounting and reporting service for CFOs (Scale, from AED 1,499/month). Priced by the complexity of the books, not by seats. Founder pricing locked for the first 100 companies.
- Products: Hysaab (accounting and reporting), hysaab invoice (tax compliance and e-invoice validation), hysaab services OS (for accounting and advisory firms) with hysaab audit as its ISA audit module, and the sister hiring product Ibtidah.
- Company: built in Dubai, UAE by accountants; contact info@hysaab.ai; the app runs at app.hysaab.ai.
- Languages: the site is bilingual — every marketing page has an Arabic (RTL) twin under ${BASE}/ar (e.g. /ar, /ar/product, /ar/pricing); the product workspace itself also runs in Arabic, right-to-left.

## Pages
- [Home](${BASE}/): what Hysaab is, the agent roster, compliance posture
- [Product](${BASE}/product): the six modules — payables, receivables, ledger, close, documents, tax
- [Accounting](${BASE}/accounting): books kept and closed for you, self-serve or as a managed service
- [Pricing](${BASE}/pricing): the three tiers and the founding-cohort offer
- [Integrations](${BASE}/integrations): how the six ledger connections work
- [Compliance](${BASE}/compliance): how UAE VAT (Article 59), Corporate Tax, KSA ZATCA rules, period locks, audit trails and approval gates are enforced by default
- [How it works](${BASE}/how-it-works): plain-English product walkthrough — documents, payables, receivables, ledger, bank recon, fixed assets, close, tax, payroll, decisions, money finder, integrations, tools, pricing, who it's for
- [Guides](${BASE}/guides): practical UAE and KSA tax and close guides
- [Tools](${BASE}/tools): free UAE and KSA tax and IFRS calculators
- [FAQ](${BASE}/faq): straight answers on data safety, autonomy limits, pricing
- [About](${BASE}/about): who builds Hysaab and what it believes
- [Ibtidah](${BASE}/hire): the sister hiring product
- [hysaab invoice](${BASE}/invoice): tax compliance and e-invoice validation
- [hysaab services OS](${BASE}/firms): Hysaab as leverage for accounting and advisory firms — multi-client workspaces (coming soon)
- [hysaab audit](${BASE}/audit): an AI-native ISA audit of IFRS statements for licensed Gulf audit firms; engines test a hashed snapshot (journal-entry testing on the whole population, monetary-unit sampling, tie-outs, confirmations, the misstatement register) and a licensed human concludes; Hysaab never signs an opinion (coming soon)
- [Contact](${BASE}/contact): how to reach the team
- [الموقع بالعربية](${BASE}/ar): the full marketing site in Arabic, right-to-left
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

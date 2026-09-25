/* Accounting systems offered by the enquiry forms (demo-intake, 2026-09-26).
   Safe for client components: no env, no network. */

/** The systems the demo forms offer. "Other" opens a free-text box. The
    value sent is always this English label, whichever language the page. */
export const DEMO_SYSTEMS = [
  "Xero", "QuickBooks Online", "Zoho Books", "Wafeq", "Odoo", "ERPNext",
  "Oracle NetSuite", "Microsoft Dynamics 365 Business Central", "Microsoft Dynamics 365 Finance & Operations",
  "SAP Business One", "SAP S/4HANA", "Sage Intacct", "Sage 50", "TallyPrime", "Workday Financials",
  "Oracle Fusion", "Foodics", "Spreadsheets", "Other",
] as const;

/** "Other (Priority ERP)" for the team's email; the label alone otherwise. */
export function systemLabel(system: string, other: string): string {
  const o = other.trim();
  return system === "Other" && o ? `Other (${o})` : system;
}

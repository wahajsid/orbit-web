import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { SupplierCheckCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "Supplier verification checker (FTA Decision 13) — Hysaab",
  description:
    "Free checker for FTA Decision No. 13 of 2026: the supplier and supply checks to run before deducting UAE input VAT, and when the AED 10,000 exception applies.",
  alternates: langAlternates("/tools/uae-supplier-verification-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-supplier-verification-checker"
      kicker="VAT · INPUT TAX"
      lede="From 1 October 2026, input VAT rests on checks as well as invoices. Enter the supply and the supplier's 12-month totals to see which checks apply."
    >
      <SupplierCheckCalculator />
    </ToolPage>
  );
}

import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { VatCtReconCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "VAT to Corporate Tax revenue reconciliation — Hysaab",
  description:
    "Free UAE reconciliation calculator: bridge revenue in the accounts to VAT returns Box 1, 4 and 5, with advances, unbilled revenue and asset sales, and see the gap.",
  alternates: langAlternates("/tools/uae-vat-ct-reconciliation-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-vat-ct-reconciliation-calculator"
      kicker="VAT · CORPORATE TAX"
      lede="Start from revenue in the accounts, add and subtract the usual reconciling items, and compare with what your VAT returns declared for the same months."
    >
      <VatCtReconCalculator />
    </ToolPage>
  );
}

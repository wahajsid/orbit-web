import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { TopUpTaxCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "UAE 15% top-up tax (DMTT) estimator — Hysaab",
  description:
    "Free estimator for the UAE Domestic Minimum Top-up Tax: effective tax rate, substance-based carve-outs and the top-up to 15% for groups with EUR 750m+ revenue.",
  alternates: { canonical: "./" },
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-top-up-tax-estimator"
      kicker="CORPORATE TAX · PILLAR TWO"
      lede="Groups with EUR 750m or more of revenue pay up to 15% in the UAE from 2025. Enter the UAE totals to see the effective rate, the carve-outs and the top-up."
    >
      <TopUpTaxCalculator />
    </ToolPage>
  );
}

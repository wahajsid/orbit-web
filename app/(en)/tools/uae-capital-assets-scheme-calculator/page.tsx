import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { CapitalAssetCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "VAT capital assets scheme calculator (Article 58) — Hysaab",
  description:
    "Free UAE VAT capital assets scheme calculator: the yearly R − Z adjustment for buildings and assets of AED 5m or more, and the remaining-years adjustment on sale.",
  alternates: { canonical: "./" },
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-capital-assets-scheme-calculator"
      kicker="VAT · CAPITAL ASSETS"
      lede="Input VAT on a building or large asset stays open for 10 or 5 years. Enter the Year 1 VAT and each year's recovery rate to see every adjustment."
    >
      <CapitalAssetCalculator />
    </ToolPage>
  );
}

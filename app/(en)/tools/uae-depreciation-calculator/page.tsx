import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { DepreciationCalculator } from "@/components/tools/DepreciationCalculator";

export const metadata: Metadata = {
  title: "UAE depreciation calculator (with KSA tax rates) — Hysaab",
  description:
    "Free UAE depreciation calculator: annual rate, first-year pro-rata and a full schedule, straight-line or reducing balance, plus KSA tax pool rates.",
  alternates: { canonical: "./" },
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-depreciation-calculator"
      kicker="IAS 16 · KSA Article 17"
      lede="The UAE sets no tax depreciation rates: Corporate Tax follows the depreciation in your IFRS accounts, so the rate comes from the useful life you set. Pick an asset class or enter your own life, and this calculator gives the annual rate and a year-by-year schedule, with a KSA mode that applies the statutory group rates on a declining-balance pool."
    >
      <DepreciationCalculator />
    </ToolPage>
  );
}

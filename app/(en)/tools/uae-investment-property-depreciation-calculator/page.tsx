import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { IpDepreciationCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "Investment property 4% tax depreciation calculator — Hysaab",
  description:
    "Free calculator for Ministerial Decision 173 of 2025: Opening Value, the 4% yearly deduction on fair-valued investment property, tax saved and the add-back on sale.",
  alternates: langAlternates("/tools/uae-investment-property-depreciation-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-investment-property-depreciation-calculator"
      kicker="CORPORATE TAX · PROPERTY"
      lede="Buildings held at fair value now earn a 4% tax deduction a year. Enter the building cost and dates to get the Opening Value, the full schedule and the add-back if you sell."
    >
      <IpDepreciationCalculator />
    </ToolPage>
  );
}

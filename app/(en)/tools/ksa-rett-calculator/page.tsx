import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { RettCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "Saudi RETT calculator (5% Real Estate Transaction Tax) — Hysaab",
  description:
    "Free KSA Real Estate Transaction Tax calculator: 5% of the agreed price or fair market value, the first-home relief on the first SAR 1 million, and the 2%-a-month late-payment fine capped at 50%.",
  alternates: { canonical: "./" },
};

export default function Page() {
  return (
    <ToolPage
      slug="ksa-rett-calculator"
      kicker="RETT · KSA"
      lede="Every transfer of Saudi real estate pays 5%, on the agreed price but never on less than market value. Enter the deal and see the tax, what the state bears on a first home, and what paying late would cost."
    >
      <RettCalculator />
    </ToolPage>
  );
}

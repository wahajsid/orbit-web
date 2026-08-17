import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { CtCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "UAE Corporate Tax estimator — Orbit",
  description:
    "Free UAE Corporate Tax calculator: 0% on the first AED 375,000 of taxable income, 9% above it, with the Small Business Relief election handled.",
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-corporate-tax-calculator"
      kicker="Corporate Tax"
      lede="Taxable income in, tax and effective rate out — the 375k threshold and the Small Business Relief election both handled."
    >
      <CtCalculator />
    </ToolPage>
  );
}

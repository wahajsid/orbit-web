import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { DeferredTaxCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "IAS 12 deferred tax schedule — Orbit",
  description:
    "Free IAS 12 deferred tax calculator: enter carrying amounts and tax bases for each balance-sheet item — get the temporary differences, DTL, DTA and net position at any tax rate.",
};

export default function Page() {
  return (
    <ToolPage
      slug="ias12-deferred-tax-calculator"
      kicker="IAS 12"
      lede="UAE Corporate Tax is new, and for most businesses this is the first time deferred tax matters. Add your balance-sheet items, set their carrying amounts and tax bases, and watch the temporary differences produce DTLs and DTAs — the schedule your auditor will ask for."
    >
      <DeferredTaxCalculator />
    </ToolPage>
  );
}

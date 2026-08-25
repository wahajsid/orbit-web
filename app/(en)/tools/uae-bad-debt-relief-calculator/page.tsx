import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { BadDebtCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "VAT bad-debt relief calculator (Article 64) — Orbit",
  description:
    "Free UAE VAT bad-debt relief calculator: test the four Article 64 conditions and compute the exact 5/105 output-tax adjustment on written-off receivables.",
  alternates: langAlternates("/tools/uae-bad-debt-relief-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-bad-debt-relief-calculator"
      kicker="VAT · UAE"
      lede="VAT you paid on invoices that were never paid to you can come back — once four conditions all hold and six months have passed. Tick what's true and see the adjustment."
    >
      <BadDebtCalculator />
    </ToolPage>
  );
}

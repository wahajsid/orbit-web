import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { VatRegistrationCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "UAE VAT registration checker — Orbit",
  description:
    "Free UAE VAT registration threshold checker: the AED 375,000 mandatory and AED 187,500 voluntary tests on a rolling 12 months plus the next-30-days rule.",
  alternates: langAlternates("/tools/uae-vat-registration-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-vat-registration-checker"
      kicker="VAT · UAE"
      lede="The test is rolling — any 12 consecutive months, plus what you expect in the next 30 days. Miss the crossing and late registration costs AED 10,000. Check where you stand."
    >
      <VatRegistrationCalculator />
    </ToolPage>
  );
}

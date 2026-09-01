import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { ReverseChargeCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "Reverse charge VAT calculator (UAE) — Orbit",
  description:
    "Free UAE reverse charge calculator: output VAT on imported services and goods, input recovery at your entitlement, and the net cash effect — with why both return boxes matter.",
  alternates: langAlternates("/tools/uae-reverse-charge-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-reverse-charge-calculator"
      kicker="VAT · REVERSE CHARGE"
      lede="Buying from abroad makes you your own supplier: you account the output VAT and recover the input in the same return. Usually cash-neutral — never entry-neutral."
    >
      <ReverseChargeCalculator />
    </ToolPage>
  );
}

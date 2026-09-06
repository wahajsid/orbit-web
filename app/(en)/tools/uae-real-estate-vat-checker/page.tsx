import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { RealEstateVatCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "UAE real estate VAT checker — Orbit",
  description:
    "Free UAE property VAT tool: zero-rated first supplies, exempt residential, standard commercial, bare land and serviced apartments — treatment, VAT and input-recovery per deal.",
  alternates: langAlternates("/tools/uae-real-estate-vat-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-real-estate-vat-checker"
      kicker="VAT · REAL ESTATE"
      lede="Zero-rated and exempt look identical to the tenant and opposite to you — one keeps input recovery alive, the other kills it. Pick the supply and see all three answers."
    >
      <RealEstateVatCalculator />
    </ToolPage>
  );
}

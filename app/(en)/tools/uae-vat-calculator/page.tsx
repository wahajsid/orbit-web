import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { VatCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "VAT calculator — UAE 5% & KSA 15% — Orbit",
  description:
    "Free VAT calculator for the Gulf: add VAT to a net amount or extract it from a gross one, at the UAE 5% or KSA 15% rate.",
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-vat-calculator"
      kicker="VAT"
      lede="Net to gross or gross to net, at either Gulf rate. The extraction direction is the one people get wrong — dividing by 1.05, never multiplying by 0.95."
    >
      <VatCalculator />
    </ToolPage>
  );
}

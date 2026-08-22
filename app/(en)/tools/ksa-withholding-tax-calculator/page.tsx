import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { WhtCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "KSA withholding tax (WHT) calculator — Orbit",
  description:
    "Free Saudi withholding tax calculator: domestic rates by payment category — management fees 20%, royalties 15%, most others 5% — with net-of-tax gross-up handled.",
};

export default function Page() {
  return (
    <ToolPage
      slug="ksa-withholding-tax-calculator"
      kicker="WHT · KSA"
      lede="Paying a non-resident from Saudi Arabia means withholding at the domestic rate for that payment type — and if the contract is net-of-tax, the gross-up makes the tax your cost. Both computed here."
    >
      <WhtCalculator />
    </ToolPage>
  );
}

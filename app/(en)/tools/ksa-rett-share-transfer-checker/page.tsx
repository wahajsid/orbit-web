import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { RettShareCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "RETT share-transfer checker: Saudi real estate company test — Hysaab",
  description:
    "Free checker for Saudi RETT on share deals: the 50% real estate company test, the 30%-in-three-years threshold, and the tax base (higher of market value × stake and the allocated price).",
  alternates: { canonical: "./" },
};

export default function Page() {
  return (
    <ToolPage
      slug="ksa-rett-share-transfer-checker"
      kicker="RETT · KSA"
      lede="Selling shares can be a property sale. If real estate held for sale or lease is half the company's assets at market value, and 30% or more changes hands within three years, 5% RETT is due. Run both tests and the base."
    >
      <RettShareCalculator />
    </ToolPage>
  );
}

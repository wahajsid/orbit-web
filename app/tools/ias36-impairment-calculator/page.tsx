import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { ImpairmentCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "IAS 36 impairment test — value-in-use DCF — Orbit",
  description:
    "Free IAS 36 impairment calculator: enter five years of projected cash flows, WACC and terminal growth — see the value in use, headroom or impairment loss for your CGU.",
};

export default function Page() {
  return (
    <ToolPage
      slug="ias36-impairment-calculator"
      kicker="IAS 36"
      lede="The year-end impairment test that every audited entity runs: project five years of free cash flows, discount at WACC, add a terminal value — and compare the result to what the CGU is carrying on the books. Green means headroom; red means write it down."
    >
      <ImpairmentCalculator />
    </ToolPage>
  );
}

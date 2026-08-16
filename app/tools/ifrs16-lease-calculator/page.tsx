import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { LeaseCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "IFRS 16 lease liability & ROU asset calculator — Orbit",
  description:
    "Free IFRS 16 calculator: enter your lease payments, term and discount rate — get the day-1 lease liability, right-of-use asset, and the full amortisation schedule with interest and depreciation.",
};

export default function Page() {
  return (
    <ToolPage
      slug="ifrs16-lease-calculator"
      kicker="IFRS 16"
      lede="Enter the lease payment, term and incremental borrowing rate. The calculator gives you the day-1 liability and ROU asset, then lays out the full schedule — interest unwinding on the liability, straight-line depreciation on the asset — period by period."
    >
      <LeaseCalculator />
    </ToolPage>
  );
}

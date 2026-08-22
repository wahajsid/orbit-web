import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { LoyaltyCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "Loyalty points deferred revenue calculator (IFRS 15) — Orbit",
  description:
    "Free IFRS 15 loyalty programme calculator: allocate the sale price between goods and points using breakage-weighted standalone value, and track the contract liability as redemptions come in.",
  alternates: langAlternates("/tools/loyalty-points-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="loyalty-points-calculator"
      kicker="REVENUE · IFRS 15"
      lede="Points earned in a sale are a material right — part of today's price belongs to them. Split the sale, defer the points' share, and release it as customers actually redeem."
    >
      <LoyaltyCalculator />
    </ToolPage>
  );
}

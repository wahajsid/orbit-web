import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { SbrCheckerCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "Small Business Relief eligibility checker — Orbit",
  description:
    "Free UAE Corporate Tax Small Business Relief checker: the AED 3m revenue test, prior-period condition, QFZP and MNE exclusions — and the 9% an election would save.",
  alternates: langAlternates("/tools/small-business-relief-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="small-business-relief-checker"
      kicker="CORPORATE TAX · UAE"
      lede="Four conditions decide the election: this period's revenue, every previous period's revenue, free zone status and group size. Answer them and get a straight yes or no — with the tax at stake."
    >
      <SbrCheckerCalculator />
    </ToolPage>
  );
}

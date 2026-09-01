import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { ParticipationCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "Participation exemption checker (UAE CT) — Orbit",
  description:
    "Free UAE participation exemption checker: the 5% / AED 4m ownership test, the 12-month holding period, and the subject-to-tax condition — exempt or taxable, with the tax at stake.",
  alternates: langAlternates("/tools/uae-participation-exemption-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-participation-exemption-checker"
      kicker="CORPORATE TAX · HOLDINGS"
      lede="Three tests decide whether a dividend or exit gain flows up untaxed: ownership, twelve months, and a real tax rate underneath. Answer them and see the position."
    >
      <ParticipationCalculator />
    </ToolPage>
  );
}

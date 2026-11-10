import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { EinvoiceDeadlineCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "UAE e-invoicing deadline checker — Hysaab",
  description:
    "Free UAE e-invoicing deadline checker: when to appoint an Accredited Service Provider, when e-invoicing becomes mandatory for you, and the penalties for missing it.",
  alternates: langAlternates("/tools/uae-e-invoicing-deadline-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-e-invoicing-deadline-checker"
      kicker="VAT · E-INVOICING"
      lede="Pick your phase to see your provider deadline and go-live date, how many days are left, and what changes for tax groups."
    >
      <EinvoiceDeadlineCalculator />
    </ToolPage>
  );
}

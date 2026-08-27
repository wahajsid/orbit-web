import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { DesignatedZoneCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "Designated zone VAT checker — Orbit",
  description:
    "Free UAE designated zone VAT decision tool: goods vs services, movement vs consumption — outside the scope, standard-rated, or import VAT, per transaction.",
  alternates: langAlternates("/tools/uae-designated-zone-vat-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-designated-zone-vat-checker"
      kicker="VAT · DESIGNATED ZONES"
      lede="The licence address doesn't decide the treatment — the supply type and the physical movement do. Answer two questions and get the answer per transaction."
    >
      <DesignatedZoneCalculator />
    </ToolPage>
  );
}

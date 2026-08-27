import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { EcomVatCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "E-commerce VAT checker (UAE) — Orbit",
  description:
    "Free UAE e-commerce VAT tool: domestic 5%, zero-rated exports with the evidence rule enforced, and use-and-enjoyment for electronic services — per order.",
  alternates: langAlternates("/tools/uae-ecommerce-vat-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-ecommerce-vat-checker"
      kicker="VAT · E-COMMERCE"
      lede="Online selling doesn't change the 5% — it changes the questions: where the goods go, where the service is used, and whether the evidence file backs the zero rate."
    >
      <EcomVatCalculator />
    </ToolPage>
  );
}

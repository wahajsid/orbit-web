import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { langAlternates } from "@/lib/site-meta";
import { FxVatCalculator } from "@/components/tools/calculators";

export const metadata: Metadata = {
  title: "Foreign-currency invoice VAT converter (AED) — Hysaab",
  description:
    "Convert a foreign-currency invoice to the AED net, VAT and gross a UAE tax invoice must show, at the Central Bank rate, with the exchange difference on payment.",
  alternates: langAlternates("/tools/uae-vat-currency-converter"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-vat-currency-converter"
      kicker="VAT · CURRENCY"
      lede="VAT is fixed in dirhams at the Central Bank rate on the date of supply. Enter the invoice and the rate to get the AED figures, and see why a later exchange difference leaves the VAT alone."
    >
      <FxVatCalculator />
    </ToolPage>
  );
}

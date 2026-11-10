import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { FxVatCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "محوّل ضريبة الفواتير بالعملات الأجنبية (درهم) — Hysaab",
  description:
    "حوّل فاتورة بالدولار أو اليورو أو غيرهما إلى المبالغ بالدرهم التي يجب أن تظهرها الفاتورة الضريبية بسعر المصرف المركزي، مع فرق الصرف عند السداد.",
  alternates: langAlternates("/tools/uae-vat-currency-converter"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-vat-currency-converter"
      kicker="ضريبة القيمة المضافة · العملات"
      locale="ar"
      lede="تتحدد الضريبة بالدرهم بسعر المصرف المركزي في تاريخ التوريد. أدخل الفاتورة والسعر لتحصل على المبالغ بالدرهم، ولترى لماذا لا يغيّر فرق الصرف اللاحق الضريبة."
    >
      <FxVatCalculator ar />
    </ToolPage>
  );
}

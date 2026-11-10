import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { InvoiceCheckerCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "فاحص الفاتورة الضريبية الإماراتية (المادة 59) — Hysaab",
  description:
    "هل تكفي فاتورة مبسطة أم يلزم فاتورة كاملة؟ علّم الحقول الظاهرة في الفاتورة لترى هل تدعم استرداد ضريبة المدخلات وأي حقل ينقصها.",
  alternates: langAlternates("/tools/uae-tax-invoice-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-tax-invoice-checker"
      kicker="ضريبة القيمة المضافة · الفواتير"
      locale="ar"
      lede="أخبرنا من أنت وماذا أرسل المورد، فيحدد الفاحص نوع الفاتورة المسموح ويسمّي أي حقل يمنعك من استرداد الضريبة."
    >
      <InvoiceCheckerCalculator ar />
    </ToolPage>
  );
}

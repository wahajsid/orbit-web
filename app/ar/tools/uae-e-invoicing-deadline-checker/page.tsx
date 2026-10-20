import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { EinvoiceDeadlineCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "فاحص مواعيد الفوترة الإلكترونية في الإمارات — Hysaab",
  description:
    "موعد تعيين مزود الخدمة المعتمد وبدء الفوترة الإلكترونية الإلزامية حسب المرحلة، والأيام المتبقية، واستثناء المجموعات الضريبية، والغرامات.",
  alternates: langAlternates("/tools/uae-e-invoicing-deadline-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-e-invoicing-deadline-checker"
      kicker="ضريبة القيمة المضافة · الفوترة الإلكترونية"
      locale="ar"
      lede="اختر مرحلتك لترى موعد تعيين المزود وموعد البدء، وكم يومًا تبقى، وما الذي يتغير للمجموعات الضريبية."
    >
      <EinvoiceDeadlineCalculator ar />
    </ToolPage>
  );
}

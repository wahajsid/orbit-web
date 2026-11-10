import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { VatCtReconCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "تسوية ضريبة القيمة المضافة مع إيرادات ضريبة الشركات — Hysaab",
  description:
    "اربط الإيرادات في القوائم المالية بالخانات 1 و4 و5 في إقرارات ضريبة القيمة المضافة: الدفعات المقدمة، والإيرادات غير المفوترة، وبيع الأصول، والفرق غير المفسَّر.",
  alternates: langAlternates("/tools/uae-vat-ct-reconciliation-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-vat-ct-reconciliation-calculator"
      kicker="ضريبة القيمة المضافة · ضريبة الشركات"
      locale="ar"
      lede="ابدأ من الإيرادات في الحسابات، وأضف واطرح بنود التسوية المعتادة، ثم قارن بما صرّحت به إقرارات ضريبة القيمة المضافة للأشهر نفسها."
    >
      <VatCtReconCalculator ar />
    </ToolPage>
  );
}

import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { RettCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة ضريبة التصرفات العقارية في السعودية (5%) — Hysaab",
  description:
    "حاسبة مجانية لضريبة التصرفات العقارية: 5% من السعر المتفق عليه أو القيمة السوقية أيهما أعلى، ودعم المسكن الأول على أول مليون ريال، وغرامة التأخر 2% شهريًا بحد أقصى 50%.",
  alternates: langAlternates("/tools/ksa-rett-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="ksa-rett-calculator"
      kicker="ضريبة التصرفات العقارية · السعودية"
      locale="ar"
      lede="كل تصرف في عقار سعودي يدفع 5%، على السعر المتفق عليه لكن لا على أقل من القيمة السوقية. أدخل الصفقة وشاهد الضريبة، وما تتحمله الدولة في المسكن الأول، وكلفة التأخر في السداد."
    >
      <RettCalculator ar />
    </ToolPage>
  );
}

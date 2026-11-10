import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { IpDepreciationCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة استهلاك العقار الاستثماري الضريبي 4% — Hysaab",
  description:
    "القرار الوزاري 173 لسنة 2025: القيمة الافتتاحية، والخصم السنوي 4% على العقار الاستثماري بالقيمة العادلة، والوفر الضريبي، والإضافة عند البيع.",
  alternates: langAlternates("/tools/uae-investment-property-depreciation-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-investment-property-depreciation-calculator"
      kicker="ضريبة الشركات · العقار"
      locale="ar"
      lede="المباني المحتفظ بها بالقيمة العادلة تحصل الآن على خصم ضريبي 4% سنويًا. أدخل تكلفة المبنى والتواريخ لترى القيمة الافتتاحية والجدول الكامل والإضافة عند البيع."
    >
      <IpDepreciationCalculator ar />
    </ToolPage>
  );
}

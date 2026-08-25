import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { CtPenaltyCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة غرامات ضريبة الشركات الإماراتية — Orbit",
  description:
    "حاسبة مجانية لغرامات ضريبة الشركات في الإمارات: 10,000 درهم للتسجيل المتأخر، وغرامات تقديم شهرية من 500 إلى 1,000 درهم، و14% سنويًا على الضريبة غير المدفوعة.",
  alternates: langAlternates("/tools/uae-corporate-tax-penalty-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-corporate-tax-penalty-calculator"
      kicker="ضريبة الشركات · الإمارات"
      locale="ar"
      lede="ثلاثة عدّادات تعمل معًا: غرامة تسجيل ثابتة، وغرامة تقديم تدق شهريًا حتى بلا ضريبة مستحقة، و14% سنويًا على ما يبقى دون سداد. أدخل الأشهر واقرأ الفاتورة."
    >
      <CtPenaltyCalculator ar />
    </ToolPage>
  );
}

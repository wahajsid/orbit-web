import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { PartialExemptionCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "حاسبة الإعفاء الجزئي — Orbit",
  description:
    "حاسبة مجانية للإعفاء الجزئي في الإمارات: انسب مدخلات الضريبة للأوعية الثلاثة، واحسب نسبة الاسترداد بالطريقة القياسية، وشاهد الضريبة الضائعة فعلًا.",
  alternates: langAlternates("/tools/uae-partial-exemption-calculator"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-partial-exemption-calculator"
      kicker="ضريبة القيمة المضافة · الإعفاء الجزئي"
      locale="ar"
      lede="أجرِ أي توريدات معفاة وتتوقف مدخلاتك عن كونها مستردة كلها. ثلاثة أوعية ونسبة واحدة وتسوية سنوية — محسوبة هنا."
    >
      <PartialExemptionCalculator ar />
    </ToolPage>
  );
}

import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { ParticipationCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "فاحص إعفاء المساهمة (ضريبة الشركات) — Orbit",
  description:
    "فاحص مجاني لإعفاء المساهمة في الإمارات: اختبار الملكية 5% أو 4 ملايين درهم، ومدة الاثني عشر شهرًا، وشرط الخضوع للضريبة — معفى أم خاضع، مع الضريبة على المحك.",
  alternates: langAlternates("/tools/uae-participation-exemption-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-participation-exemption-checker"
      kicker="ضريبة الشركات · الشركات القابضة"
      locale="ar"
      lede="ثلاثة اختبارات تحسم صعود التوزيع أو ربح التخارج بلا ضريبة: الملكية، واثنا عشر شهرًا، ونسبة ضريبية حقيقية في الأسفل. أجب عنها وشاهد الموقف."
    >
      <ParticipationCalculator ar />
    </ToolPage>
  );
}

import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { RettShareCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "فحص ضريبة التصرفات العقارية على نقل الحصص: اختبار الشركة العقارية — Hysaab",
  description:
    "أداة مجانية لضريبة التصرفات العقارية على صفقات الحصص: اختبار الشركة العقارية (50%)، وحد الـ 30% خلال ثلاث سنوات، ووعاء الضريبة (الأعلى بين القيمة السوقية × الحصة والثمن المخصص).",
  alternates: langAlternates("/tools/ksa-rett-share-transfer-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="ksa-rett-share-transfer-checker"
      kicker="ضريبة التصرفات العقارية · السعودية"
      locale="ar"
      lede="بيع الحصص قد يكون بيعًا للعقار. إذا بلغت العقارات المحتفظ بها للبيع أو التأجير نصف أصول الشركة بالقيمة السوقية، ونُقل 30% أو أكثر خلال ثلاث سنوات، استُحقت ضريبة 5%. أجرِ الاختبارين واحسب الوعاء."
    >
      <RettShareCalculator ar />
    </ToolPage>
  );
}

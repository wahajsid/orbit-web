import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { AuditCheckCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "فاحص وجوب التدقيق في الإمارات — Orbit",
  description:
    "فاحص مجاني لوجوب التدقيق في الإمارات: عتبة الـ 50 مليون درهم في ضريبة الشركات، وشرط الشخص المؤهل، وقواعد قانون الشركات والمناطق الحرة — هل تحتاج قوائم مدققة؟",
  alternates: langAlternates("/tools/uae-audit-requirement-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-audit-requirement-checker"
      kicker="الامتثال · التدقيق"
      locale="ar"
      lede="ثلاثة أنظمة تحسمه — قانون الضريبة وقانون الشركات وجهة ترخيصك. أدخل معطياتك واحصل على الجواب المتراكم."
    >
      <AuditCheckCalculator ar />
    </ToolPage>
  );
}

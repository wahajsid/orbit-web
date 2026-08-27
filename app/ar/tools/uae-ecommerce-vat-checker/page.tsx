import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { EcomVatCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "فاحص ضريبة التجارة الإلكترونية (الإمارات) — Orbit",
  description:
    "أداة مجانية لضريبة التجارة الإلكترونية في الإمارات: 5% محليًا، والنسبة الصفرية للتصدير مع فرض قاعدة الدليل، ومكان الاستخدام للخدمات الإلكترونية — لكل طلب.",
  alternates: langAlternates("/tools/uae-ecommerce-vat-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-ecommerce-vat-checker"
      kicker="ضريبة القيمة المضافة · التجارة الإلكترونية"
      locale="ar"
      lede="البيع الإلكتروني لا يغيّر الـ 5% — بل يغيّر الأسئلة: إلى أين تذهب السلع، وأين تُستخدم الخدمة، وهل ملف الأدلة يسند النسبة الصفرية."
    >
      <EcomVatCalculator ar />
    </ToolPage>
  );
}

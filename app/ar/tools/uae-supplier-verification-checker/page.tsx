import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { SupplierCheckCalculator } from "@/components/tools/calculators";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "فحص التحقق من الموردين (قرار الهيئة 13) — Hysaab",
  description:
    "ما فحوص المورد والتوريد التي يتطلبها قرار الهيئة رقم 13 لسنة 2026 قبل خصم ضريبة المدخلات: استثناء 10,000 درهم، واختبارا 100,000 و375,000 درهم.",
  alternates: langAlternates("/tools/uae-supplier-verification-checker"),
};

export default function Page() {
  return (
    <ToolPage
      slug="uae-supplier-verification-checker"
      kicker="ضريبة القيمة المضافة · ضريبة المدخلات"
      locale="ar"
      lede="منذ 1 أكتوبر 2026 تقوم ضريبة المدخلات على الفحوص لا على الفواتير وحدها. أدخل التوريد وإجماليات المورد خلال 12 شهرًا لترى الفحوص المطلوبة."
    >
      <SupplierCheckCalculator ar />
    </ToolPage>
  );
}

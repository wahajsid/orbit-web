import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { TOOLS } from "@/lib/tools";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "الأدوات — Hysaab",
  description:
    "حاسبات مجانية للضرائب والمحاسبة في الإمارات والسعودية تُريك طريقة الحساب: ضريبة القيمة المضافة، ضريبة الشركات، مكافأة نهاية الخدمة، IFRS 16 وغيرها.",
  alternates: langAlternates("/tools"),
};

export default function ToolsPage() {
  return (
    <>
      <MgNav locale="ar" />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">الأدوات</div>
          <h1 className="mg-page-h">حاسبات تُريك طريقة الحساب.</h1>
          <p className="mg-page-lede">
            مجانية وسريعة وتُحسب بالكامل في متصفحك — الأرقام التي تمدّ إليها فرق المالية
            الخليجية يدها كل أسبوع، مع القاعدة وراء كل رقم مشروحة بوضوح. بعض الحاسبات
            متاح بالعربية والبقية بالإنجليزية حتى تكتمل الترجمة.
          </p>
        </section>
        <section className="mg-page-body">
          {TOOLS.map((t) => (
            <a key={t.slug} href={t.arTitle ? `/ar/tools/${t.slug}` : `/tools/${t.slug}`} className="mg-guide-row">
              <div>
                <div className="mg-guide-title">{t.arTitle ?? t.title}</div>
                <p className="mg-guide-desc">{t.arDescription ?? t.description}</p>
              </div>
              <span className="mg-guide-meta">{t.arTitle ? "مجاني" : "EN · مجاني"}</span>
            </a>
          ))}
        </section>
      </main>
      <MgFooter locale="ar" />
    </>
  );
}

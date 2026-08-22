import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { TOOLS } from "@/lib/tools";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "الأدوات — Orbit",
  description:
    "حاسبات مالية خليجية مجانية: عقود الإيجار IFRS 16، ومكافأة نهاية الخدمة الاكتوارية IAS 19، واختبار الهبوط بالتدفقات المخصومة IAS 36، والضريبة المؤجلة IAS 12، والخسائر الائتمانية المتوقعة ومعدل الفائدة الفعلي IFRS 9، ومكافأة نهاية الخدمة الإماراتية، وضريبة القيمة المضافة وضريبة الشركات. تُحسب في متصفحك، ولا يُرفع أي شيء.",
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

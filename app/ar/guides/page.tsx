import type { Metadata } from "next";
import { MgNav, MgFooter } from "@/components/MgChrome";
import { GUIDES } from "@/lib/guides";
import { getArGuide } from "@/lib/guides-ar";
import { langAlternates } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "الأدلة — Orbit",
  description:
    "أدلة عملية للمالية في الخليج: الفاتورة الضريبية الصحيحة في الإمارات، ومواعيد ضريبة القيمة المضافة وضريبة الشركات، والإقفال الشهري، والعمل مع دفتر الأستاذ الذي لديك بالفعل.",
  alternates: langAlternates("/guides"),
};

export default function GuidesPage() {
  return (
    <>
      <MgNav locale="ar" />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">الأدلة</div>
          <h1 className="mg-page-h">العمل الروتيني، مشروحًا ببساطة.</h1>
          <p className="mg-page-lede">
            إجابات قصيرة وعملية عن الأسئلة التي تتعامل معها فرق المالية في الخليج فعلًا —
            كتبها المحاسبون الذين بنوا Orbit. بعض الأدلة متاح بالعربية والبقية بالإنجليزية
            حتى تكتمل الترجمة. لا بوابات، ولا جدار بريد إلكتروني.
          </p>
        </section>
        <section className="mg-page-body">
          {GUIDES.map((g) => {
            const ar = getArGuide(g.slug);
            return (
              <a key={g.slug} href={ar ? `/ar/guides/${g.slug}` : `/guides/${g.slug}`} className="mg-guide-row">
                <div>
                  <div className="mg-guide-title">{(ar ?? g).title}</div>
                  <p className="mg-guide-desc">{(ar ?? g).description}</p>
                </div>
                <span className="mg-guide-meta">{ar ? "" : "EN · "}‏{g.minutes} دقائق</span>
              </a>
            );
          })}
        </section>
      </main>
      <MgFooter locale="ar" />
    </>
  );
}

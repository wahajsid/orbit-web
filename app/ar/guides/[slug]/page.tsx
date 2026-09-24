import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { AR_GUIDES, getArGuide } from "@/lib/guides-ar";
import { langAlternates } from "@/lib/site-meta";

export function generateStaticParams() {
  return AR_GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getArGuide(params.slug);
  if (!g) return {};
  return {
    title: `${g.title} — Hysaab`,
    description: g.description,
    alternates: langAlternates(`/guides/${g.slug}`),
  };
}

export default function ArGuidePage({ params }: { params: { slug: string } }) {
  const g = getArGuide(params.slug);
  if (!g) notFound();

  const FAQ_LD = g.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: "ar",
        mainEntity: g.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const ARTICLE_LD = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    dateModified: g.updated,
    inLanguage: "ar",
    author: { "@type": "Organization", name: "Hysaab", url: "https://hysaab.ai" },
    publisher: { "@type": "Organization", name: "Hysaab", url: "https://hysaab.ai" },
    mainEntityOfPage: `https://hysaab.ai/ar/guides/${g.slug}`,
  };

  const [y, m, d] = g.updated.split("-");
  const MON_AR = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  const dateStr = `${Number(d)} ${MON_AR[Number(m) - 1]} ${y}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_LD) }} />
      {FAQ_LD && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />}
      <PageShell locale="ar" motion="hero">
        <PageHero
          eyebrow={`الأدلة · ${g.minutes} دقائق · تحديث ${dateStr}`}
          title={<>{g.title}</>}
          lede={g.description}
          locale="ar"
        />
        <section>
          <div className="hw-wrap hw-section">
            <div className="hw-prose">
              {g.sections.map((s) => (
                <div key={s.h}>
                  <h2>{s.h}</h2>
                  {s.ps?.map((p, i) => <p key={i}>{p}</p>)}
                  {s.list && (
                    <ul>
                      {s.list.map((li) => <li key={li}>{li}</li>)}
                    </ul>
                  )}
                </div>
              ))}
              {g.faqs && g.faqs.length > 0 && (
                <div>
                  <h2>أسئلة يطرحها الناس فعلًا</h2>
                  {g.faqs.map((f) => (
                    <div key={f.q}>
                      <p><strong>{f.q}</strong></p>
                      <p>{f.a}</p>
                    </div>
                  ))}
                </div>
              )}
              {g.tax && (
                <div className="hw-note" style={{ marginTop: "40px" }}>
                  <span className="hw-mono">تنويه</span>
                  <p>معلومات عامة لشركات الخليج، وليست استشارة ضريبية. اللوائح تتغير؛ تحقق من النص الرسمي للهيئة الاتحادية للضرائب أو زاتكا أو من مستشارك قبل التصرف.</p>
                </div>
              )}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "32px" }}>
                <a className="hw-btn hw-btn--peach" href="/ar/accounting">شاهد كيف يدير Hysaab ذلك <span aria-hidden="true">←</span></a>
                <a className="hw-link hw-link--ruled" href="/ar/guides">كل الأدلة <span aria-hidden="true">←</span></a>
              </div>
            </div>
          </div>
        </section>
      </PageShell>
    </>
  );
}

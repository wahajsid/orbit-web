import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { AR_GUIDES, getArGuide } from "@/lib/guides-ar";
import { linkParts, stripLinks } from "@/lib/guides";
import { TOOLS, getTool } from "@/lib/tools";
import { langAlternates } from "@/lib/site-meta";

/* Inline [label](/path) links point at the Arabic twin when one exists,
   and at the English page otherwise. */
function arHref(href: string): string {
  const g = /^\/guides\/([^/#?]+)/.exec(href);
  if (g) return getArGuide(g[1]) ? `/ar${href}` : href;
  const t = /^\/tools\/([^/#?]+)/.exec(href);
  if (t) return getTool(t[1])?.arTitle ? `/ar${href}` : href;
  return href;
}

function Rich({ text }: { text: string }) {
  return (
    <>
      {linkParts(text).map((p, i) =>
        typeof p === "string" ? p : <a key={i} href={arHref(p.href)}>{p.label}</a>,
      )}
    </>
  );
}

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
          acceptedAnswer: { "@type": "Answer", text: stripLinks(f.a) },
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

  const tools = TOOLS.filter((t) => t.guide === g.slug && t.arTitle);
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
                  {s.ps?.map((p, i) => <p key={i}><Rich text={p} /></p>)}
                  {s.list && (
                    <ul>
                      {s.list.map((li) => <li key={li}><Rich text={li} /></li>)}
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
                      <p><Rich text={f.a} /></p>
                    </div>
                  ))}
                </div>
              )}
              {tools.length > 0 && (
                <div>
                  <h2>جرّبها بأرقامك</h2>
                  <ul>
                    {tools.map((t) => (
                      <li key={t.slug}><a href={`/ar/tools/${t.slug}`}>{t.arTitle}</a>: {t.arDescription}</li>
                    ))}
                  </ul>
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

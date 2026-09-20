import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell, PageHero } from "@/components/home/PageShell";
import { GUIDES, getGuide, relatedGuides, stripLinks, linkParts } from "@/lib/guides";
import { getArGuide } from "@/lib/guides-ar";
import { TOOLS } from "@/lib/tools";
import { langAlternates } from "@/lib/site-meta";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGuide(params.slug);
  if (!g) return {};
  const hasAr = !!getArGuide(g.slug);
  return {
    title: `${g.title} — Hysaab`,
    description: g.description,
    alternates: hasAr
      ? langAlternates(`/guides/${g.slug}`)
      : { canonical: "./" },
  };
}

function Rich({ text }: { text: string }) {
  return (
    <>
      {linkParts(text).map((p, i) =>
        typeof p === "string" ? p : <a key={i} href={p.href}>{p.label}</a>,
      )}
    </>
  );
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = getGuide(params.slug);
  if (!g) notFound();

  const url = `https://hysaab.ai/guides/${g.slug}`;
  const tools = TOOLS.filter((t) => t.guide === g.slug);
  const related = relatedGuides(g.slug);

  const FAQ_LD = g.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
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
    author: { "@type": "Organization", name: "Hysaab", url: "https://hysaab.ai" },
    publisher: { "@type": "Organization", name: "Hysaab", url: "https://hysaab.ai" },
    mainEntityOfPage: url,
  };

  const BREADCRUMB_LD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hysaab", item: "https://hysaab.ai/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://hysaab.ai/guides" },
      { "@type": "ListItem", position: 3, name: g.title, item: url },
    ],
  };

  const [y, m, d] = g.updated.split("-");
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateStr = `${Number(d)} ${MON[Number(m) - 1]} ${y}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      {FAQ_LD && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />}
      <PageShell>
        <PageHero
          eyebrow={`Guides · ${g.minutes} min · Updated ${dateStr}`}
          title={<>{g.title}</>}
          lede={g.description}
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
                  <h2>Questions people actually ask</h2>
                  {g.faqs.map((f) => (
                    <div key={f.q}>
                      <p><strong>{f.q}</strong></p>
                      <p><Rich text={f.a} /></p>
                    </div>
                  ))}
                </div>
              )}
              {(tools.length > 0 || related.length > 0) && (
                <div>
                  <h2>Keep reading</h2>
                  <ul>
                    {tools.map((t) => (
                      <li key={t.slug}><strong>Tool:</strong> <a href={`/tools/${t.slug}`}>{t.title}</a></li>
                    ))}
                    {related.map((r) => (
                      <li key={r.slug}><strong>Guide:</strong> <a href={`/guides/${r.slug}`}>{r.title}</a></li>
                    ))}
                  </ul>
                </div>
              )}
              {g.tax && (
                <div className="hw-note" style={{ marginTop: "40px" }}>
                  <span className="hw-mono">Disclaimer</span>
                  <p>General information for Gulf businesses, not tax advice. Regulations move — verify against the official FTA/ZATCA text or your advisor before acting.</p>
                </div>
              )}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "32px" }}>
                <a className="hw-btn hw-btn--peach" href={g.cta?.href ?? "/product"}>{g.cta?.label ?? "See how Hysaab runs this"} <span aria-hidden="true">↗</span></a>
                <a className="hw-link hw-link--ruled" href="/guides">All guides <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        </section>
      </PageShell>
    </>
  );
}

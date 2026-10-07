import { PageShell, PageHero } from "@/components/home/PageShell";
import { getGuide } from "@/lib/guides";
import { getArGuide } from "@/lib/guides-ar";
import { getTool } from "@/lib/tools";
import { linkParts, stripLinks } from "@/lib/guides";
import { TOOL_CONTENT } from "@/lib/expansions";
import { AUTHOR_LD } from "@/lib/authors";
import { Byline } from "@/components/Byline";

function Rich({ text }: { text: string }) {
  return <>{linkParts(text).map((p, i) => (typeof p === "string" ? p : <a key={i} href={p.href}>{p.label}</a>))}</>;
}

export function ToolPage({ slug, kicker, lede, locale = "en", children }: {
  slug: string; kicker: string; lede: string; locale?: "en" | "ar"; children: React.ReactNode;
}) {
  const ar = locale === "ar";
  const tool = getTool(slug)!;
  const enGuide = tool.guide ? getGuide(tool.guide) : undefined;
  const arGuide = ar && tool.guide ? getArGuide(tool.guide) : undefined;
  const guide = arGuide ?? enGuide;
  const guideHref = guide ? (arGuide ? `/ar/guides/${guide.slug}` : `/guides/${guide.slug}`) : null;
  const title = ar && tool.arTitle ? tool.arTitle : tool.title;
  const url = `https://hysaab.ai${ar ? "/ar" : ""}/tools/${slug}`;
  /* The explainer under the calculator (method, worked example, FAQs,
     sources) is English-only until the Arabic reviewer signs it off. */
  const content = ar ? undefined : TOOL_CONTENT[slug];
  const updated = content?.updated ?? tool.updated;
  const FAQ_LD = content?.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: stripLinks(f.a) } })),
      }
    : null;
  const APP_LD = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description: ar && tool.arDescription ? tool.arDescription : tool.description,
    url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    inLanguage: ar ? "ar" : "en",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "AED" },
    author: AUTHOR_LD,
    dateModified: updated,
    publisher: { "@type": "Organization", name: "Hysaab", url: "https://hysaab.ai" },
  };
  const BREADCRUMB_LD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hysaab", item: `https://hysaab.ai${ar ? "/ar" : "/"}` },
      { "@type": "ListItem", position: 2, name: ar ? "الأدوات" : "Tools", item: `https://hysaab.ai${ar ? "/ar" : ""}/tools` },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      {FAQ_LD && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />}
      <PageShell locale={locale}>
        <PageHero
          eyebrow={`${ar ? "الأدوات" : "Tools"} · ${kicker}`}
          title={<>{title}</>}
          lede={lede}
          locale={locale}
        />
        <section>
          <div className="hw-wrap hw-section">
            <div className="hw-prose">
              <Byline updated={updated} locale={locale} />
              {children}
              {content && (
                <div className="hw-tool-explainer" style={{ marginTop: "48px" }}>
                  {content.method.map((sec) => (
                    <div key={sec.h}>
                      <h2>{sec.h}</h2>
                      {sec.ps?.map((p, i) => <p key={i}><Rich text={p} /></p>)}
                      {sec.list && <ul>{sec.list.map((li) => <li key={li}><Rich text={li} /></li>)}</ul>}
                    </div>
                  ))}
                  {content.example && (
                    <div>
                      <h2>{content.example.h}</h2>
                      {content.example.ps?.map((p, i) => <p key={i}><Rich text={p} /></p>)}
                      {content.example.list && <ol>{content.example.list.map((li) => <li key={li}><Rich text={li} /></li>)}</ol>}
                    </div>
                  )}
                  {content.faqs && content.faqs.length > 0 && (
                    <div>
                      <h2>Questions people actually ask</h2>
                      {content.faqs.map((f) => (
                        <div key={f.q}>
                          <p><strong>{f.q}</strong></p>
                          <p><Rich text={f.a} /></p>
                        </div>
                      ))}
                    </div>
                  )}
                  {content.sources && content.sources.length > 0 && (
                    <div>
                      <h2>Sources</h2>
                      <ul>{content.sources.map((x) => <li key={x.href}><a href={x.href} target="_blank" rel="noopener">{x.label}</a></li>)}</ul>
                    </div>
                  )}
                </div>
              )}
              <div className="hw-note" style={{ marginTop: "40px" }}>
                <span className="hw-mono">{ar ? "تنويه" : "Disclaimer"}</span>
                <p>
                  {ar
                    ? "أرقام توضيحية تُحسب في متصفحك؛ لا يُرفع أو يُخزَّن أو يُرسل شيء إلى أي مكان. ليست استشارة محاسبية أو ضريبية؛ تحقق من المعالجة مع مستشارك."
                    : "Illustrative figures computed in your browser. Nothing is uploaded, stored or sent anywhere. Not accounting or tax advice; verify treatment with your advisor."}
                </p>
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "32px" }}>
                {guide && guideHref && (
                  <a className="hw-btn hw-btn--peach" href={guideHref}>
                    {ar ? <>اقرأ الدليل <span aria-hidden="true">←</span></> : <>Read the guide <span aria-hidden="true">↗</span></>}
                  </a>
                )}
                <a className="hw-link hw-link--ruled" href={ar ? "/ar/accounting" : "/accounting"}>
                  {ar ? "شاهد Hysaab يديرها فعليًا" : "See Hysaab run it for real"} <span aria-hidden="true">{ar ? "←" : "↗"}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </PageShell>
    </>
  );
}

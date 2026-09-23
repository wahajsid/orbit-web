import { PageShell, PageHero } from "@/components/home/PageShell";
import { getGuide } from "@/lib/guides";
import { getArGuide } from "@/lib/guides-ar";
import { getTool } from "@/lib/tools";

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
              {children}
              <div className="hw-note" style={{ marginTop: "40px" }}>
                <span className="hw-mono">{ar ? "تنويه" : "Disclaimer"}</span>
                <p>
                  {ar
                    ? "أرقام توضيحية تُحسب في متصفحك — لا يُرفع أو يُخزَّن أو يُرسل شيء إلى أي مكان. ليست استشارة محاسبية أو ضريبية؛ تحقق من المعالجة مع مستشارك."
                    : "Illustrative figures computed in your browser — nothing is uploaded, stored or sent anywhere. Not accounting or tax advice; verify treatment with your advisor."}
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

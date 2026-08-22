import { MgNav, MgFooter } from "@/components/MgChrome";
import { getGuide } from "@/lib/guides";
import { getArGuide } from "@/lib/guides-ar";
import { getTool } from "@/lib/tools";

/* Shared scaffold for every calculator page: ruled header, the tool,
   the disclaimer, and a cross-link to the matching guide. locale="ar"
   renders the Arabic chrome and prefers the Arabic guide/registry
   strings when they exist. */
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
  return (
    <>
      <MgNav locale={locale} />
      <main>
        <section className="mg-page-hero">
          <div className="mg-kicker">
            <a href={ar ? "/ar/tools" : "/tools"} style={{ textDecoration: "none" }}>{ar ? "الأدوات" : "TOOLS"}</a> · {kicker}
          </div>
          <h1 className="mg-page-h">{title}</h1>
          <p className="mg-page-lede">{lede}</p>
        </section>
        <section className="mg-page-body mg-guide-body">
          {children}
          <p className="mg-guide-disclaimer">
            {ar
              ? "أرقام توضيحية تُحسب في متصفحك — لا يُرفع أو يُخزَّن أو يُرسل شيء إلى أي مكان. ليست استشارة محاسبية أو ضريبية؛ تحقق من المعالجة مع مستشارك."
              : "Illustrative figures computed in your browser — nothing is uploaded, stored or sent anywhere. Not accounting or tax advice; verify treatment with your advisor."}
          </p>
          <div className="mg-guide-cta">
            {guide && guideHref && (
              <a href={guideHref} className="mg-cta">
                {ar ? <>اقرأ الدليل: {guide.title.split(" — ")[0]} ←</> : <>Read the guide: {guide.title.split(" — ")[0]} →</>}
              </a>
            )}
            <a href={ar ? "/ar/product" : "/product"} className="mg-ghost">{ar ? "شاهد Orbit يديرها فعليًا" : "See Orbit run it for real"}</a>
          </div>
        </section>
      </main>
      <MgFooter locale={locale} />
    </>
  );
}

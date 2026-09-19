/* ── Site footer (navy) ──────────────────────────────────────────────
   One footer for every page, in either language: the wordmark and line,
   the four link columns the site has always carried, the Oblique Consult
   ownership line and the legal row. `.hw-chrome` lets it sit under pages
   built on the older styles. */

import { FOOT, OwnerLine } from "../FooterData";
import { Wordmark } from "../Wordmark";

export function SiteFooter({ home = false, locale = "en" }: { home?: boolean; locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  const t = FOOT[locale];
  const top = home ? "#top" : ar ? "/ar" : "/";
  const s = ar
    ? { brand: home ? "Hysaab، العودة إلى الأعلى" : "Hysaab، الصفحة الرئيسية", line: <>دفاتر سليمة.<br />حوارات أفضل.</>, site: "خريطة الموقع", legal: "© 2026 Hysaab. صُنع في دبي للخليج.", lang: <><a href="/" lang="en">EN</a> / <span lang="ar">العربية</span></>, back: "العودة إلى الأعلى ↑" }
    : { brand: home ? "Hysaab, back to the top" : "Hysaab home", line: <>Good books.<br />Better conversations.</>, site: "Site", legal: "© 2026 Hysaab. Built in Dubai for the Gulf.", lang: <>EN / <a href="/ar" lang="ar" className="hy-ar">العربية</a></>, back: "Back to top ↑" };
  return (
    <footer className="hw-footer hw-chrome">
      <div className="hw-wrap">
        <div className="hw-footer-main">
          <a href={top} aria-label={s.brand}><Wordmark size={49} ground="navy" /></a>
          <p>{s.line}</p>
          <a className="hw-footer-mail" href="mailto:info@hysaab.ai">info@hysaab.ai <span aria-hidden="true">↗</span></a>
        </div>
        <nav className="hw-footer-cols" aria-label={s.site}>
          {t.cols.map(([head, links]) => (
            <div key={head}>
              <span className="hw-mono">{head}</span>
              <ul>
                {links.map(([href, label]) => <li key={href}><a href={href}>{label}</a></li>)}
              </ul>
            </div>
          ))}
        </nav>
        <OwnerLine owner={t.owner} link={t.ownerLink} className="hw-owner" />
        <div className="hw-footer-bottom">
          <span>{s.legal}</span>
          <span>{s.lang}</span>
          <a href="#top">{s.back}</a>
        </div>
      </div>
    </footer>
  );
}

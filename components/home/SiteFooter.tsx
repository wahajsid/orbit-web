/* ── Site footer (navy) ──────────────────────────────────────────────
   One footer for every page, in either language: the wordmark and line,
   the four link columns the site has always carried, the Oblique Consult
   ownership line and the legal row. `.hw-chrome` lets it sit under pages
   built on the older styles. */

import { FOOT, OwnerLine } from "../FooterData";
import { Wordmark } from "../Wordmark";

/** Hysaab's social profiles (owner, 2026-09-23): on every page via this footer. */
export const SOCIALS: { href: string; label: string; path: string }[] = [
  { href: "https://www.linkedin.com/company/hysaab-ai/", label: "LinkedIn", path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1v5.46h-4v-4.84c0-1.16-.02-2.64-1.61-2.64-1.61 0-1.86 1.26-1.86 2.56v4.92h-4v-11Z" },
  { href: "https://x.com/hysaabai", label: "X", path: "M17.75 3h3.07l-6.72 7.68L22 21h-6.19l-4.85-6.34L5.4 21H2.33l7.19-8.21L2 3h6.35l4.38 5.8L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45Z" },
  { href: "https://www.instagram.com/hysaabai/", label: "Instagram", path: "M12 2.8c3 0 3.35.01 4.53.07 3.05.14 4.47 1.58 4.61 4.61.06 1.18.07 1.54.07 4.52s-.01 3.35-.07 4.53c-.14 3.02-1.56 4.47-4.61 4.61-1.18.06-1.53.07-4.53.07s-3.35-.01-4.52-.07c-3.06-.14-4.47-1.59-4.61-4.61C2.81 15.35 2.8 15 2.8 12s.01-3.34.07-4.52c.14-3.03 1.56-4.47 4.61-4.61C8.66 2.81 9 2.8 12 2.8ZM12 7.27a4.73 4.73 0 1 0 0 9.46 4.73 4.73 0 0 0 0-9.46Zm0 7.8a3.07 3.07 0 1 1 0-6.14 3.07 3.07 0 0 1 0 6.14Zm4.92-9.1a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z" },
];

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
          <ul className="hw-social" aria-label={ar ? "Hysaab على الشبكات الاجتماعية" : "Hysaab on social media"}>
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer me" aria-label={`Hysaab on ${s.label}`}>
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d={s.path} fill="currentColor" /></svg>
                </a>
              </li>
            ))}
          </ul>
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

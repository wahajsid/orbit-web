/* ── Site footer (cream) ─────────────────────────────────────────────
   One footer for every English page: the wordmark and line, the four
   link columns the site has always carried, the Oblique Consult
   ownership line and the legal row, then the launch countdown bar.
   `.hw-chrome` lets it sit under pages built on the older styles. */

import { FOOT, OwnerLine } from "../FooterData";
import { Wordmark } from "../Wordmark";
import { LaunchBar } from "./LaunchBar";

export function SiteFooter({ home = false }: { home?: boolean }) {
  const top = home ? "#top" : "/";
  return (
    <>
      <footer className="hw-footer hw-chrome">
        <div className="hw-wrap">
          <div className="hw-footer-main">
            <a href={top} aria-label={home ? "Hysaab, back to the top" : "Hysaab home"}><Wordmark size={49} ground="light" /></a>
            <p>Good books.<br />Better conversations.</p>
            <a className="hw-footer-mail" href="mailto:info@hysaab.ai">info@hysaab.ai <span aria-hidden="true">↗</span></a>
          </div>
          <nav className="hw-footer-cols" aria-label="Site">
            {FOOT.en.cols.map(([head, links]) => (
              <div key={head}>
                <span className="hw-mono">{head}</span>
                <ul>
                  {links.map(([href, label]) => <li key={href}><a href={href}>{label}</a></li>)}
                </ul>
              </div>
            ))}
          </nav>
          <OwnerLine owner={FOOT.en.owner} link={FOOT.en.ownerLink} className="hw-owner" />
          <div className="hw-footer-bottom">
            <span>© 2026 Hysaab. Built in Dubai for the Gulf.</span>
            <span>EN / <a href="/ar" lang="ar" className="hy-ar">العربية</a></span>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>
      {!home && <div className="hw-bar-spacer" aria-hidden="true" />}
      <LaunchBar href={home ? "#conversation" : "/contact"} />
    </>
  );
}

/* Shared nav + footer for every page. On the home page the nav CTA opens the
   hero capture (via NavClaim); on subpages it links back home. */

import { OrbitLogo } from "./OrbitLogo";
import { NavClaim } from "./NavClaim";

export function SiteNav({ sub }: { sub?: boolean }) {
  const nav = (
    <nav className="nav" aria-label="Main">
      <a href="/" style={{ textDecoration: "none" }}><OrbitLogo /></a>
      <div className="nav-links">
        <a href="/#product" className="nav-hide-m">PRODUCT</a>
        <a href="/#pricing" className="nav-hide-m">PRICING</a>
        <a href="/faq" className="nav-hide-m">FAQ</a>
        <a href="/contact" className="nav-hide-m">CONTACT</a>
        {sub ? <a href="/" className="nav-cta">FOUNDING COHORT →</a> : <NavClaim />}
      </div>
    </nav>
  );
  if (!sub) return nav;
  return (
    <header className="on-ink" style={{ background: "var(--ink)", color: "var(--text-on-ink)" }}>
      <div className="wrap">{nav}</div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer on-ink">
      <div className="wrap footer-row">
        <span className="mono">ORBIT · DUBAI &amp; RIYADH</span>
        <div className="footer-links">
          <a href="/faq">FAQ</a>
          <a href="/integrations">INTEGRATIONS</a>
          <a href="/contact">CONTACT</a>
          <a href="mailto:info@orbitgulf.com?subject=Legal">LEGAL</a>
        </div>
      </div>
    </footer>
  );
}

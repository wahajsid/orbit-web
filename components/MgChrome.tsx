/* ── Modernist-green shared chrome ───────────────────────────────────
   The sticky ruled nav, the framed mark and the flush footer — the one
   chrome every page uses. */

export function Mark({ size = 30, framed = true, ringOnly = false, strokeWidth = 2 }: { size?: number; framed?: boolean; ringOnly?: boolean; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true" style={{ flexShrink: 0 }}>
      {framed && !ringOnly && <rect x="1" y="1" width="28" height="28" fill="none" stroke="var(--ink)" strokeWidth="2" />}
      <circle cx="15" cy="15" r="7" fill="none" stroke="var(--accent)" strokeWidth={strokeWidth} />
      <circle cx="24" cy="8" r={ringOnly ? 4 : 3} fill="var(--accent)" />
    </svg>
  );
}

export function MgNav({ active }: { active?: "product" }) {
  return (
    <header className="mg-nav" role="banner">
      <div className="mg-nav-inner">
        <a href="/" className="mg-brand" aria-label="Orbit home">
          <Mark size={30} />
          <span className="mg-wordmark">ORBIT</span>
        </a>
        <nav className="mg-nav-links" aria-label="Primary">
          <a href="/product" className={active === "product" ? "mg-nav-active" : undefined} aria-current={active === "product" ? "page" : undefined}>Product</a>
          <a href="/#agents">Agents</a>
          <a href="/#compliance">Compliance</a>
          <span className="mg-hidden-narrow">Pricing</span>
        </nav>
        <div className="mg-nav-right">
          <span className="mg-lang" aria-label="Language">EN · <span className="mg-lang-alt">ع</span></span>
          <a href="/#join" className="mg-signin">Sign in</a>
          <a href="/#join" className="mg-cta">Book a demo →</a>
        </div>
      </div>
    </header>
  );
}

export function MgFooter() {
  return (
    <footer className="mg-footer">
      <Mark size={18} />
      <span className="mg-wordmark mg-wordmark-sm">ORBIT</span>
      <span className="mg-footer-url">orbitgulf.com</span>
      <span className="mg-footer-loc">Dubai, UAE · EN / <bdi>العربية</bdi> · © 2026 Orbit</span>
    </footer>
  );
}

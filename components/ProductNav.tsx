import { OrbitLogo } from "./OrbitLogo";

/* Shared header for the front door and every product page: the Orbit wordmark
   (→ home), the three products, FAQ and Contact, and a per-page CTA. The active
   product is highlighted in the page's accent. */
export function ProductNav({
  active, cta,
}: {
  active?: "accounting" | "hire" | "firms";
  cta?: { label: string; href: string };
}) {
  const products: [NonNullable<typeof active>, string, string][] = [
    ["accounting", "/accounting", "ACCOUNTING"],
    ["hire", "/hire", "HIRE"],
    ["firms", "/firms", "FOR FIRMS"],
  ];
  return (
    <nav className="nav" aria-label="Main">
      <a href="/" aria-label="Orbit — home" style={{ textDecoration: "none" }}>
        <OrbitLogo />
      </a>
      <div className="nav-links">
        {products.map(([key, href, label]) => (
          <a key={key} href={href} className={`nav-hide-m${active === key ? " nav-cur" : ""}`}>
            {label}
          </a>
        ))}
        <a href="/faq" className="nav-hide-m">FAQ</a>
        <a href="/contact" className="nav-hide-m">CONTACT</a>
        {cta && <a href={cta.href} className="nav-cta">{cta.label}</a>}
      </div>
    </nav>
  );
}

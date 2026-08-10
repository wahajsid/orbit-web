"use client";

import { useState } from "react";
import { OrbitLogo } from "./OrbitLogo";

/* Shared header for the front door and every product page: the Orbit wordmark
   (→ home), the four products, FAQ and Contact, and a per-page CTA. The active
   product is highlighted in the page's accent. Below 880px the links collapse
   into a real menu (they used to simply vanish, leaving mobile visitors only
   the CTA). */
export function ProductNav({
  active, cta,
}: {
  active?: "accounting" | "hire" | "invoice" | "firms";
  cta?: { label: string; href: string };
}) {
  const [open, setOpen] = useState(false);
  const products: [NonNullable<typeof active>, string, string][] = [
    ["accounting", "/accounting", "ACCOUNTING"],
    ["hire", "/hire", "HIRE"],
    ["invoice", "/invoice", "INVOICE"],
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
        <button
          type="button"
          className="nav-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div className="nav-sheet" role="menu">
          {products.map(([key, href, label]) => (
            <a key={key} href={href} role="menuitem" className={active === key ? "nav-cur" : ""}>
              {label}
            </a>
          ))}
          <a href="/faq" role="menuitem">FAQ</a>
          <a href="/contact" role="menuitem">CONTACT</a>
        </div>
      )}
    </nav>
  );
}

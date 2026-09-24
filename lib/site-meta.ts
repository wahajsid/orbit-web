/* ── Structured data (GEO/SEO) ───────────────────────────────────────
   Organization + SoftwareApplication, site-wide. Prices mirror the FAQ
   and /pricing exactly: one public source of truth. Shared by the EN
   and AR root layouts so the entity stays identical across locales.
   Owner 2026-09-23: no parent organisation (Hysaab is a separate
   company), both founders named, and the only published price is the
   self-serve plan, from USD 199 a month. */

export const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hysaab",
  alternateName: "hysaab.ai",
  url: "https://hysaab.ai",
  logo: "https://hysaab.ai/brand/hysaab-avatar-navy-1024.png",
  description:
    "AI agents for finance teams and the firms that serve them in the UAE and Saudi Arabia. Hysaab Finance prepares the books and the close, Hysaab Practice runs the tax work for advisory firms and Hysaab Audit runs the ISA file, with a person approving every decision that matters. Built in Dubai.",
  email: "info@hysaab.ai",
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  areaServed: ["AE", "SA"],
  sameAs: ["https://www.linkedin.com/company/hysaab-ai/", "https://x.com/hysaabai", "https://www.instagram.com/hysaabai/"],
  founder: [
    { "@type": "Person", name: "Wahaj Siddiqui", url: "https://obliqueconsult.com/about-us" },
    { "@type": "Person", name: "Saad Zafar", url: "https://www.linkedin.com/in/saad-zafar-b156894a/" },
  ],
};

export const APP_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hysaab",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://hysaab.ai",
  description:
    "Hysaab Finance: AI agents for accounting and reporting in the UAE and Saudi Arabia. Payables, receivables, the ledger, tax and the month-end close, prepared by agents and approved by your people. Works with Xero, QuickBooks, Wafeq, Odoo, Zoho Books and ERPNext, with a custom connection for any other accounting software.",
  offers: {
    "@type": "Offer",
    name: "Self-serve",
    description: "Hysaab Finance, self-serve: from USD 199 a month.",
    price: "199",
    priceCurrency: "USD",
    priceSpecification: { "@type": "UnitPriceSpecification", minPrice: "199", priceCurrency: "USD", unitText: "MONTH" },
  },
};

/* hreflang alternates for pages that exist in both languages.
   Pass the EN path ("/" for home). Values resolve against metadataBase. */
export function langAlternates(path: string) {
  const en = path;
  const ar = path === "/" ? "/ar" : `/ar${path}`;
  return {
    canonical: "./",
    languages: { en, ar, "x-default": en },
  };
}

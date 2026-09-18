/* ── Structured data (GEO/SEO) ───────────────────────────────────────
   Organization + SoftwareApplication, site-wide. Prices mirror the FAQ
   and /pricing exactly — one public source of truth. Shared by the EN
   and AR root layouts so the entity stays identical across locales. */

export const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hysaab",
  alternateName: "hysaab.ai",
  url: "https://hysaab.ai",
  logo: "https://hysaab.ai/brand/hysaab-avatar-navy-1024.png",
  description:
    "An accounting and reporting team for Gulf businesses, built on evidence, professional judgement and human oversight. Hysaab prepares the books, tests every invoice against the tax rules and runs the month-end close, with a person approving the calls that matter. Built in Dubai.",
  email: "info@hysaab.ai",
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  areaServed: ["AE", "SA"],
  sameAs: ["https://www.linkedin.com/company/orbitgulf"],
  parentOrganization: { "@type": "Organization", name: "Oblique Consult", url: "https://obliqueconsult.com" },
  founder: { "@type": "Person", name: "Wahaj Siddiqui", url: "https://obliqueconsult.com/about-us" },
};

export const APP_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hysaab",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://hysaab.ai",
  description:
    "An accounting and reporting workspace for UAE and Saudi businesses: payables, receivables, the ledger, tax and the month-end close, prepared by Hysaab and approved by you. Posts into Zoho Books, Xero, QuickBooks, Odoo, Wafeq and ERPNext.",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "199",
    highPrice: "899",
    offerCount: "2",
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

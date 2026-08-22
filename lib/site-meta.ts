/* ── Structured data (GEO/SEO) ───────────────────────────────────────
   Organization + SoftwareApplication, site-wide. Prices mirror the FAQ
   and /pricing exactly — one public source of truth. Shared by the EN
   and AR root layouts so the entity stays identical across locales. */

export const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Orbit",
  url: "https://www.orbitgulf.com",
  logo: "https://www.orbitgulf.com/favicon.png",
  description:
    "AI-native accounting and finance for UAE & KSA businesses — agents read documents, code the ledger, test tax and run the month-end close, with human approval on the calls that matter.",
  email: "info@orbitgulf.com",
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  areaServed: ["AE", "SA"],
  sameAs: ["https://www.linkedin.com/company/orbitgulf"],
};

export const APP_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Orbit",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://www.orbitgulf.com",
  description:
    "An AI finance team for UAE & KSA businesses: payables, receivables, the ledger, tax and the month-end close, run by agents and approved by you. Posts into Zoho Books, Xero, QuickBooks, Odoo, Wafeq and ERPNext.",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "AED",
    lowPrice: "149",
    highPrice: "1499",
    offerCount: "3",
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

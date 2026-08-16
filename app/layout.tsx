import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import "./wire.css";

// v2 "Modernist green": Archivo everywhere. Mono is the system stack now
// (see --mono in globals.css) — the site's only mono surface is the
// terminal feed, and it no longer needs a webfont of its own.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  // Production canonical host is www — the apex 308s to it, so every
  // absolute URL the site emits must say www or search engines see a
  // split identity.
  metadataBase: new URL("https://www.orbitgulf.com"),
  alternates: { canonical: "./" },
  title: "Orbit — The close ran while you slept",
  description:
    "An AI finance team for UAE & KSA businesses. Documents in, ledger done, one honest email at sunrise. Posts straight into Zoho Books, Xero, QuickBooks, Odoo, Wafeq and ERPNext.",
  openGraph: {
    title: "Orbit — The close ran while you slept",
    description:
      "An AI finance team for UAE & KSA businesses. Documents in, ledger done, one honest email at sunrise.",
    url: "https://www.orbitgulf.com",
    siteName: "Orbit",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbit — The close ran while you slept",
    description:
      "An AI finance team for UAE & KSA businesses. Documents in, ledger done, one honest email at sunrise.",
    images: ["/og.png"],
  },
  verification: {
    other: { "msvalidate.01": "4BDEB5AE75B04E2C2EA5C6991217BAE4" },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.png" }],
    apple: "/apple-touch-icon.png",
  },
};

/* ── Structured data (GEO/SEO) ───────────────────────────────────────
   Organization + SoftwareApplication, site-wide. Prices mirror the FAQ
   and /pricing exactly — one public source of truth. */
const ORG_LD = {
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
};

const APP_LD = {
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

export const viewport: Viewport = {
  themeColor: "#201E1D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_LD) }} />
      </body>
    </html>
  );
}

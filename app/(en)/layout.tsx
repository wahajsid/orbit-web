import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { ORG_LD, APP_LD } from "@/lib/site-meta";
import "../globals.css";
import "../wire.css";

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
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbit — The close ran while you slept",
    description:
      "An AI finance team for UAE & KSA businesses. Documents in, ledger done, one honest email at sunrise.",
  },
  verification: {
    other: { "msvalidate.01": "4BDEB5AE75B04E2C2EA5C6991217BAE4" },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.png" }],
    apple: "/apple-touch-icon.png",
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

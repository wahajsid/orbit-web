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
  metadataBase: new URL("https://orbitgulf.com"),
  title: "Orbit — The close ran while you slept",
  description:
    "An AI finance team for UAE & KSA businesses. Documents in, ledger done, one honest email at sunrise. Posts straight into Zoho Books, Xero, QuickBooks, Odoo, Wafeq and ERPNext.",
  openGraph: {
    title: "Orbit — The close ran while you slept",
    description:
      "An AI finance team for UAE & KSA businesses. Documents in, ledger done, one honest email at sunrise.",
    url: "https://orbitgulf.com",
    siteName: "Orbit",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
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
      <body>{children}</body>
    </html>
  );
}

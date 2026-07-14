import type { Metadata, Viewport } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "./wire.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex-mono",
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
  themeColor: "#16211F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

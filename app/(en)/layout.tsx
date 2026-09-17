import type { Metadata, Viewport } from "next";
import { Archivo, DM_Mono, Noto_Kufi_Arabic } from "next/font/google";
import { ORG_LD, APP_LD } from "@/lib/site-meta";
import "../globals.css";
import "../wire.css";
import "../home.css";
import "../hysaab-home.css";

// Hysaab: Archivo everywhere (400–700), Noto Kufi Arabic for the Arabic
// glyphs that appear inside English pages (the ع switch, the name's
// origin in "Why we built Hysaab"). Both SIL OFL.
const archivo = Archivo({
  subsets: ["latin"],
  // Variable axis (100–900): the homepage headings sit at 550.
  variable: "--font-archivo",
  display: "swap",
});

// Section numbers and small technical labels on the homepage.
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-noto-kufi",
  display: "swap",
});

const TITLE = "Hysaab | AI Accounting & Reporting for Gulf Businesses";
const DESC =
  "Your accounting and reporting team, always on. Sixteen AI agents read, code, reconcile and report, and bring you the decisions that are yours. Built in Dubai for the UAE and GCC.";

export const metadata: Metadata = {
  // Canonical host is the apex: every absolute URL the site emits says
  // https://hysaab.ai, and www redirects there at the edge.
  metadataBase: new URL("https://hysaab.ai"),
  alternates: { canonical: "./" },
  // Page titles carry their own brand suffix; a "%s | Hysaab" template
  // doubled it ("Pricing — Hysaab | Hysaab").
  title: { default: TITLE, template: "%s" },
  description: DESC,
  applicationName: "Hysaab",
  openGraph: {
    title: TITLE,
    description: DESC,
    url: "https://hysaab.ai",
    siteName: "Hysaab",
    locale: "en_US",
    type: "website",
    images: [{ url: "/brand/hysaab-social-card-1200x630.jpg", width: 1200, height: 630, alt: "hysaab.ai, AI accounting and reporting for Gulf businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/brand/hysaab-social-card-1200x630.jpg"],
  },
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/brand/favicon-180.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#122940",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${dmMono.variable} ${kufi.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_LD) }} />
      </body>
    </html>
  );
}

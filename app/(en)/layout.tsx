import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, JetBrains_Mono, Caveat, Noto_Kufi_Arabic } from "next/font/google";
import { ORG_LD, APP_LD } from "@/lib/site-meta";
import { MotionEnhancer } from "@/components/motion/MotionEnhancer";
import "../globals.css";
import "../wire.css";
import "../home.css";
import "../hysaab-home.css";
import "../motion.css";
import "../tick-tie.css";

// Tick & Tie (brand/tick-and-tie/BRAND.md): Schibsted Grotesk for
// everything people read, JetBrains Mono for figures, IDs and labels,
// Caveat for red review marks only. Noto Kufi Arabic for the Arabic glyphs
// that appear inside English pages (the ع switch). All SIL OFL.
const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-hand",
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
  "An accounting and reporting team for Gulf businesses, built on evidence, professional judgement and human oversight. Hysaab prepares the books and brings you the decisions that are yours. Built in Dubai for the UAE and Saudi Arabia.";

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
  // No fixed openGraph/twitter title or description: each page's own
  // title and description flow into its social card.
  openGraph: {
    url: "https://hysaab.ai",
    siteName: "Hysaab",
    locale: "en_US",
    type: "website",
    images: [{ url: "/brand/hysaab-social-card-1200x630.jpg", width: 1200, height: 630, alt: "hysaab.ai, AI accounting and reporting for Gulf businesses" }],
  },
  twitter: {
    card: "summary_large_image",
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
  themeColor: "#111418",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${hand.variable} ${kufi.variable}`}>
      <body>
        {children}
        <MotionEnhancer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_LD) }} />
      </body>
    </html>
  );
}

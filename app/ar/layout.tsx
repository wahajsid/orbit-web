import type { Metadata, Viewport } from "next";
import { Archivo, Noto_Sans_Arabic, Noto_Kufi_Arabic } from "next/font/google";
import { ORG_LD, APP_LD } from "@/lib/site-meta";
import "../globals.css";
import "../wire.css";
import "../home.css";

// Arabic root layout — its own <html> with lang="ar" dir="rtl".
// Noto Sans Arabic carries the Arabic text; it ships no Latin glyphs in
// the arabic subset, so Latin strings (hysaab, Xero, AED figures) fall
// through to Archivo — the stack order in --sans does the pairing.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-arabic",
  display: "swap",
});

const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-noto-kufi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hysaab.ai"),
  alternates: { canonical: "./" },
  title: "Hysaab | محاسبة وتقارير بالذكاء الاصطناعي لشركات الخليج",
  description:
    "فريق مالي يعمل بالذكاء الاصطناعي لشركات الإمارات والسعودية. المستندات تدخل، والدفاتر تُنجَز، وبريد واحد صادق مع شروق الشمس. يُرحِّل مباشرة إلى Zoho Books وXero وQuickBooks وOdoo وWafeq وERPNext.",
  openGraph: {
    title: "Hysaab | محاسبة وتقارير بالذكاء الاصطناعي لشركات الخليج",
    description:
      "فريق مالي يعمل بالذكاء الاصطناعي لشركات الإمارات والسعودية. المستندات تدخل، والدفاتر تُنجَز، وبريد واحد صادق مع شروق الشمس.",
    url: "https://hysaab.ai/ar",
    siteName: "Hysaab",
    images: [{ url: "/brand/hysaab-social-card-1200x630.jpg", width: 1200, height: 630 }],
    locale: "ar_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hysaab | محاسبة وتقارير بالذكاء الاصطناعي لشركات الخليج",
    description:
      "فريق مالي يعمل بالذكاء الاصطناعي لشركات الإمارات والسعودية. المستندات تدخل، والدفاتر تُنجَز، وبريد واحد صادق مع شروق الشمس.",
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

export default function ArRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${archivo.variable} ${notoArabic.variable} ${kufi.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_LD) }} />
      </body>
    </html>
  );
}

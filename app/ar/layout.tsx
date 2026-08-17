import type { Metadata, Viewport } from "next";
import { Archivo, Noto_Sans_Arabic } from "next/font/google";
import { ORG_LD, APP_LD } from "@/lib/site-meta";
import "../globals.css";
import "../wire.css";

// Arabic root layout — its own <html> with lang="ar" dir="rtl".
// Noto Sans Arabic carries the Arabic text; it ships no Latin glyphs in
// the arabic subset, so Latin strings (ORBIT, Xero, AED figures) fall
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.orbitgulf.com"),
  alternates: { canonical: "./" },
  title: "Orbit — الإقفال اكتمل وأنت نائم",
  description:
    "فريق مالي يعمل بالذكاء الاصطناعي لشركات الإمارات والسعودية. المستندات تدخل، والدفاتر تُنجَز، وبريد واحد صادق مع شروق الشمس. يُرحِّل مباشرة إلى Zoho Books وXero وQuickBooks وOdoo وWafeq وERPNext.",
  openGraph: {
    title: "Orbit — الإقفال اكتمل وأنت نائم",
    description:
      "فريق مالي يعمل بالذكاء الاصطناعي لشركات الإمارات والسعودية. المستندات تدخل، والدفاتر تُنجَز، وبريد واحد صادق مع شروق الشمس.",
    url: "https://www.orbitgulf.com/ar",
    siteName: "Orbit",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "ar_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbit — الإقفال اكتمل وأنت نائم",
    description:
      "فريق مالي يعمل بالذكاء الاصطناعي لشركات الإمارات والسعودية. المستندات تدخل، والدفاتر تُنجَز، وبريد واحد صادق مع شروق الشمس.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.png" }],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#201E1D",
};

export default function ArRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${archivo.variable} ${notoArabic.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_LD) }} />
      </body>
    </html>
  );
}

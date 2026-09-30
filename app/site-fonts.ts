/* Hysaab Grotesk and Hysaab Mono, self-hosted for both root layouts
   (app/(en) and app/ar). Both are OFL faces modified so amounts read
   12,840.00, never 12 , 840 . 00:
   - Hysaab Grotesk = Schibsted Grotesk whose tabular figures (tnum) change
     digits only; upstream, tnum also widened , . : ; # % to a digit's width.
   - Hysaab Mono = JetBrains Mono with a narrow comma and full stop.
   Digits stay tabular, so right-aligned columns still line up. Built by
   brand/tick-and-tie/build/build_fonts.py; licences in app/fonts/OFL-*.txt. */
import localFont from "next/font/local";

export const sans = localFont({
  src: [
    { path: "./fonts/HysaabGrotesk-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/HysaabGrotesk-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/HysaabGrotesk-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/HysaabGrotesk-500-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/HysaabGrotesk-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/HysaabGrotesk-600-italic.woff2", weight: "600", style: "italic" },
    { path: "./fonts/HysaabGrotesk-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/HysaabGrotesk-700-italic.woff2", weight: "700", style: "italic" },
    { path: "./fonts/HysaabGrotesk-800.woff2", weight: "800", style: "normal" },
    { path: "./fonts/HysaabGrotesk-800-italic.woff2", weight: "800", style: "italic" },
    { path: "./fonts/HysaabGrotesk-900.woff2", weight: "900", style: "normal" },
    { path: "./fonts/HysaabGrotesk-900-italic.woff2", weight: "900", style: "italic" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const mono = localFont({
  src: [
    { path: "./fonts/HysaabMono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/HysaabMono-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/HysaabMono-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/HysaabMono-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SF Mono", "Menlo", "Consolas", "monospace"],
});

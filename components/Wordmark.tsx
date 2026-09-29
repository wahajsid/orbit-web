/* ── The hysaab wordmark ─────────────────────────────────────────────
   Tick & Tie (brand/tick-and-tie/BRAND.md). Lowercase hysaab in Schibsted
   Grotesk Black with one custom letter: the y is a tick, two mirrored arms
   meeting on the baseline, the long arm rising level with the h and running
   on below the baseline as a Review Red tail. Rendered from baked outlines
   (lib/brand-paths.ts) so it needs no webfont and is identical everywhere.
   `size` is the em size in px: the wordmark is ~0.92 em tall (ascender to
   tail) and ~3.43 em wide.

   Ground decides the colours: Ink on light and on highlighter, Off-white on
   dark. The tail is Review Red, or Signal Red on dark (text-safe there).
   Never recolour the tail to a state colour; never retype the name.
   The prop name "navy" means the dark ground (now Ink); kept for callers. */

import { LOCKUP, MARK } from "@/lib/brand-paths";

type Ground = "light" | "navy" | "blush" | "dark" | "highlighter";

const INK: Record<Ground, string> = { light: "#111418", navy: "#F4F4F1", dark: "#F4F4F1", blush: "#111418", highlighter: "#111418" };
const TAIL: Record<Ground, string> = { light: "#D1322A", navy: "#F0584B", dark: "#F0584B", blush: "#D1322A", highlighter: "#D1322A" };

export function Wordmark({
  size = 26,
  ground = "light",
  suffix = true,
  as: Tag = "span",
  className,
  ariaLabel,
}: {
  size?: number;
  ground?: Ground;
  suffix?: boolean;
  as?: "span" | "div";
  className?: string;
  ariaLabel?: string;
}) {
  const vb = suffix ? LOCKUP.viewBox : LOCKUP.wordViewBox;
  const w = suffix ? LOCKUP.width : LOCKUP.wordWidth;
  const h = suffix ? LOCKUP.height : LOCKUP.wordHeight;
  const k = size / 1000;
  return (
    <Tag
      className={className}
      role="img"
      aria-label={ariaLabel ?? "hysaab"}
      style={{ display: "inline-flex", alignItems: "center", lineHeight: 1, whiteSpace: "nowrap" }}
    >
      <svg
        viewBox={vb}
        width={Math.round(w * k * 10) / 10}
        height={Math.round(h * k * 10) / 10}
        aria-hidden="true"
        focusable="false"
        style={{ display: "block", overflow: "visible" }}
      >
        <path fill={INK[ground]} d={LOCKUP.ink} />
        <path fill={TAIL[ground]} d={LOCKUP.tail} />
      </svg>
    </Tag>
  );
}

/* The mark alone: the tick-y, centred in a 64-unit box. */
export function Mark({ size = 24, ground = "light" }: { size?: number; ground?: Ground }) {
  return (
    <svg viewBox={MARK.viewBox} width={size} height={size} role="img" aria-label="hysaab" style={{ display: "block", flexShrink: 0 }}>
      <path fill={INK[ground]} d={MARK.ink} />
      <path fill={TAIL[ground]} d={MARK.tail} />
    </svg>
  );
}

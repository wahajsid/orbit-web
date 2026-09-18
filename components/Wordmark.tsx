/* ── The hysaab wordmark ─────────────────────────────────────────────
   Instrument Serif, lowercase, with the y drawn as a pen tick: navy above
   the baseline, a blush tail below it. Rendered from baked outlines
   (lib/brand-paths.ts) so it needs no webfont and is identical everywhere.
   `size` is the wordmark's em size in px, as before; the lockup is
   ~1.10 em tall (ascender to tail) and ~3.0 em wide with the `.ai` suffix.

   Ground decides the colours: navy ink on light and blush, cream ink on
   navy. The tail is blush on light and navy, cream on blush. `.ai` is the
   ink at 55–60 % opacity. Never recolour the tail to a state colour;
   never set the name in another typeface. Source SVGs: public/brand. */

import { LOCKUP, MARK } from "@/lib/brand-paths";

type Ground = "light" | "navy" | "blush";

const INK: Record<Ground, string> = { light: "#122940", navy: "#FBF7F0", blush: "#122940" };
const TAIL: Record<Ground, string> = { light: "#E4A1A0", navy: "#E4A1A0", blush: "#FBF7F0" };
const SUFFIX_OPACITY: Record<Ground, number> = { light: 0.55, navy: 0.6, blush: 0.55 };

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
      aria-label={ariaLabel ?? (suffix ? "hysaab.ai" : "hysaab")}
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
        {suffix && <path fill={INK[ground]} fillOpacity={SUFFIX_OPACITY[ground]} d={LOCKUP.suffix} />}
      </svg>
    </Tag>
  );
}

/* The mark alone: the pen tick in a 64-unit box. */
export function Mark({ size = 24, ground = "light" }: { size?: number; ground?: Ground }) {
  return (
    <svg viewBox={MARK.viewBox} width={size} height={size} role="img" aria-label="hysaab" style={{ display: "block", flexShrink: 0 }}>
      <path fill={INK[ground]} d={MARK.ink} />
      <path fill={TAIL[ground]} d={MARK.tail} />
    </svg>
  );
}

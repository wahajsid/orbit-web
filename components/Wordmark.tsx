/* ── The hysaab wordmark ─────────────────────────────────────────────
   Always lowercase. The pupils in the two `a` counters are part of the
   logo: each `a` is a relative span with an absolutely positioned circle
   at left 0.30em / bottom 0.33em, 0.075em across (0.078–0.085em under
   26px). Below 22px the pupils are dropped. `.ai` sits at 0.30× the
   wordmark size, weight 400, 55% opacity, baseline-aligned.

   Pupil colour follows the ground: #B4706F on light, #E4A1A0 on navy,
   cream on blush. Never use a different typeface; never uppercase. */

type Ground = "light" | "navy" | "blush";

const PUPIL: Record<Ground, string> = { light: "#B4706F", navy: "#E4A1A0", blush: "#FBF7F0" };
const INK: Record<Ground, string> = { light: "#122940", navy: "#FBF7F0", blush: "#122940" };

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
  const pupils = size >= 22;
  const dot = size < 26 ? "0.082em" : "0.075em";
  const A = () => (
    <span style={{ position: "relative" }}>
      a
      {pupils && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "0.30em",
            bottom: "0.33em",
            width: dot,
            height: dot,
            borderRadius: "50%",
            background: PUPIL[ground],
          }}
        />
      )}
    </span>
  );
  return (
    <Tag
      className={className}
      aria-label={ariaLabel ?? (suffix ? "hysaab.ai" : "hysaab")}
      style={{
        display: "inline-flex",
        alignItems: "flex-end",
        fontFamily: "var(--sans)",
        fontSize: size,
        fontWeight: 500,
        letterSpacing: "0.005em",
        lineHeight: 1,
        color: INK[ground],
        whiteSpace: "nowrap",
      }}
    >
      <span aria-hidden="true">
        hys<A />
        <A />b
      </span>
      {suffix && (
        <span aria-hidden="true" style={{ fontSize: "0.3em", fontWeight: 400, opacity: 0.55, paddingBottom: "0.32em" }}>
          .ai
        </span>
      )}
    </Tag>
  );
}

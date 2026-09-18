import { ImageResponse } from "next/og";
import { LOCKUP } from "./brand-paths";

/* ── Branded OpenGraph card ──────────────────────────────────────────
   Cream ground, 3px navy frame, blush kicker, big flush-left navy title,
   wordmark footer drawn from the baked lockup outlines (lib/brand-paths).
   Body text uses ImageResponse's bundled sans; the palette and the
   wordmark do the branding. */

export const OG_SIZE = { width: 1200, height: 630 };

export function brandOg(kicker: string, title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#FBF7F0",
          padding: 48,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            border: "3px solid #122940",
            padding: "56px 64px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#9A5150",
                textTransform: "uppercase",
              }}
            >
              {kicker}
            </div>
            <div
              style={{
                fontSize: title.length > 60 ? 58 : 68,
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                color: "#122940",
                marginTop: 24,
                maxWidth: 980,
              }}
            >
              {title}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg viewBox={LOCKUP.viewBox} width={Math.round(LOCKUP.width * 0.048)} height={Math.round(LOCKUP.height * 0.048)}>
              <path fill="#122940" d={LOCKUP.ink} />
              <path fill="#E4A1A0" d={LOCKUP.tail} />
              <path fill="#122940" fillOpacity={0.55} d={LOCKUP.suffix} />
            </svg>
            <div style={{ fontSize: 22, color: "#6B6560", marginLeft: "auto" }}>AI accounting &amp; reporting · Dubai</div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}

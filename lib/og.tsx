import { ImageResponse } from "next/og";
import { LOCKUP } from "./brand-paths";

/* ── Branded OpenGraph card (Tick & Tie) ─────────────────────────────
   Paper ground, 3px ink frame, Review Red kicker, big flush-left ink
   title, wordmark footer drawn from the baked outlines (lib/brand-paths).
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
          background: "#FFFFFF",
          padding: 48,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            border: "3px solid #111418",
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
                color: "#D1322A",
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
                color: "#111418",
                marginTop: 24,
                maxWidth: 980,
              }}
            >
              {title}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg viewBox={LOCKUP.viewBox} width={Math.round(LOCKUP.width * 0.05)} height={Math.round(LOCKUP.height * 0.05)}>
              <path fill="#111418" d={LOCKUP.ink} />
              <path fill="#D1322A" d={LOCKUP.tail} />
            </svg>
            <div style={{ fontSize: 22, color: "#4E545D", marginLeft: "auto" }}>AI agents for finance · UAE · KSA</div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}

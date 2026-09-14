import { ImageResponse } from "next/og";

/* ── Branded OpenGraph card ──────────────────────────────────────────
   Paper ground, 2px ink frame, green kicker, big flush-left ink title,
   mark + wordmark footer. Uses ImageResponse's bundled sans — close
   enough to Archivo at card sizes; the palette does the branding. */

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
          background: "#FAF6EE",
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
                color: "#122940",
                textTransform: "uppercase",
              }}
            >
              {kicker}
            </div>
            <div
              style={{
                fontSize: title.length > 60 ? 58 : 68,
                fontWeight: 800,
                letterSpacing: "-0.02em",
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
            <svg width="52" height="52" viewBox="0 0 30 30">
              <rect x="1" y="1" width="28" height="28" fill="none" stroke="#122940" strokeWidth="2" />
              <circle cx="15" cy="15" r="7" fill="none" stroke="#122940" strokeWidth="2" />
              <circle cx="24" cy="8" r="3" fill="#E4A1A0" />
            </svg>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.02em", color: "#122940" }}>ORBIT</div>
            <div style={{ fontSize: 24, color: "#46566A", marginLeft: "auto" }}>orbitgulf.com</div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}

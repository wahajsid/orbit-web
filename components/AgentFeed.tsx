"use client";

/* The "LIVE FROM THE AGENTS" ticker from the rebrand reference — an
   infinite marquee that tells the viewer, in one long band, what Orbit is
   already doing to real books. The track is duplicated end-to-end and
   pushed with translateX(-50%), so the wrap is seamless; the tiny green
   square next to the label pulses in time with the reduced-motion rule in
   globals.css (.orbit-feed / .orbit-square-pulse). Keep-with-reference:
   both bands are duplicated inline; `prefers-reduced-motion` parks them
   via the CSS animation shorthand (no JS gate needed). */

const LINES: React.ReactNode[] = [
  <><b>Accrual engine</b> proposed 2 accruals — Etisalat fibre · AED 2,150 each · 97%</>,
  <><b>Tax agent</b> blocked AED 1,036 input VAT — supplier TRN missing · 99%</>,
  <><b>Coding agent</b> coded Gray Mackenzie to Office consumables · 74% — asking you</>,
  <><b>Anomaly agent</b> flagged +8.2% price creep — Etisalat by e& · renewal 01 Sep</>,
  <><b>Schedules agent</b> released Knight Frank rent — AED 36,750 · month 3 of 12</>,
  <><b>Fixed assets agent</b> posted June depreciation — AED 21,408 · all classes</>,
  <><b>Bank match</b> tied AED 24,500 wire — Marina Retail INV-1001 · exact amount</>,
  <><b>Duplicate detector</b> blocked a re-sent bill — Careem CFB-20419 · already booked</>,
];

const Track = () => (
  <div style={{ display: "flex", flexShrink: 0 }}>
    {LINES.map((line, i) => (
      <div key={i}
        style={{ borderRight: "1px solid var(--hairline)", padding: "0 28px", fontSize: 13, whiteSpace: "nowrap", color: "var(--text)" }}>
        {line}
      </div>
    ))}
  </div>
);

export function AgentFeed() {
  return (
    <div className="agent-feed" style={{ borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)", overflow: "hidden", background: "var(--paper)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 28px 0", maxWidth: 1120, margin: "0 auto" }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--accent)" }}>LIVE FROM THE AGENTS</span>
        <span className="orbit-square-pulse" style={{ width: 8, height: 8, background: "var(--accent)" }} />
      </div>
      <div className="orbit-feed" style={{ display: "flex", width: "max-content", padding: "14px 0 18px" }}>
        <Track />
        <Track />
      </div>
    </div>
  );
}

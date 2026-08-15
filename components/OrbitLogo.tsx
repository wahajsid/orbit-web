/* The Orbit mark, v2 "Modernist green": a 2px square framing a green orbit
   ring with its satellite dot, then the ORBIT wordmark in Archivo 800 at
   -0.02em. The brass is gone, and the dot is one of the only circles left
   in a system whose radius is otherwise zero.

   The frame inherits `currentColor`, so the mark reads correctly on paper
   AND on the ink bands without a second variant. */

export function OrbitLogo({ size = 19, framed = true, mark = 30 }: { size?: number; framed?: boolean; mark?: number }) {
  return (
    <span className="logo" aria-label="Orbit" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg width={mark} height={mark} viewBox="0 0 30 30" aria-hidden="true" style={{ flexShrink: 0 }}>
        {framed && <rect x="1" y="1" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" />}
        <circle cx="15" cy="15" r="7" fill="none" stroke="var(--accent)" strokeWidth="2" />
        <circle cx="24" cy="8" r="3" fill="var(--accent)" />
      </svg>
      <span style={{ fontSize: size, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>ORBIT</span>
    </span>
  );
}

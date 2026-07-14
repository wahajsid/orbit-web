/* The ORBIT wordmark — the O carries a thin brass orbit ring (rotated ~-20°)
   with a small satellite dot making one slow ~8s revolution. Reduced-motion:
   the ring stays, the dot parks (handled by the .orbit-anim CSS override). */

export function OrbitLogo({ size = 17 }: { size?: number }) {
  return (
    <span className="logo" style={{ fontSize: size }} aria-label="Orbit">
      <span className="logo-o">
        O
        <span className="logo-ring" aria-hidden="true">
          <span className="logo-track orbit-anim">
            <span className="logo-dot" />
          </span>
        </span>
      </span>
      RBIT
    </span>
  );
}

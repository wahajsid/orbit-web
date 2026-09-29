"use client";

/* ── Proof strip: what the agents did, as a ticked tape ───────────────
   Mottos (phrases that start with "*") run in highlighter yellow; the
   rest carry a tick. Hover or the button pauses it; reduced motion
   starts it paused. */

import { useEffect, useState } from "react";
import { Tm } from "./Wp";

export function TickStrip({ phrases }: { phrases: string[] }) {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  }, []);
  const doubled = [...phrases, ...phrases];
  return (
    <div className="tt-strip" data-paused={paused || undefined} aria-label="What the agents did">
      <div className="tt-strip-track" style={{ animationDuration: `${Math.max(60, phrases.length * 6)}s` }}>
        {doubled.map((p, i) => {
          const motto = p.startsWith("*");
          return (
            <span key={i} className={motto ? "tt-strip-m" : undefined} aria-hidden={i >= phrases.length || undefined}>
              {!motto && <Tm m="✓" />}{motto ? p.slice(1) : p}
            </span>
          );
        })}
      </div>
      <button type="button" className="tt-strip-btn" aria-pressed={paused} onClick={() => setPaused((v) => !v)}>
        {paused ? "▶ Play" : "❚❚ Pause"}
      </button>
    </div>
  );
}

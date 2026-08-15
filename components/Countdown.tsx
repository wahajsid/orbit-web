"use client";

import { useEffect, useState } from "react";
import { LAUNCH_AT, LAUNCH_DATE_SHORT, APP_SIGNUP } from "@/lib/launch";

/* ── Launch countdown ────────────────────────────────────────────────
   Ruled paper band ticking down to the gate in lib/launch.ts (one
   source of truth — the copy and the timer can never disagree). Renders
   em-dashes until mounted so server and client markup always match;
   after the gate passes it flips to the doors-open CTA. */

type Parts = { d: string; h: string; m: string; s: string };
const two = (n: number) => String(n).padStart(2, "0");

function partsAt(now: number): Parts | null {
  const left = LAUNCH_AT - now;
  if (left <= 0) return null;
  const sec = Math.floor(left / 1000);
  return {
    d: String(Math.floor(sec / 86400)),
    h: two(Math.floor((sec % 86400) / 3600)),
    m: two(Math.floor((sec % 3600) / 60)),
    s: two(sec % 60),
  };
}

export function Countdown() {
  const [parts, setParts] = useState<Parts | null | "unmounted">("unmounted");

  useEffect(() => {
    const tick = () => setParts(partsAt(Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (parts === null) {
    return (
      <section className="mg-count" aria-label="Launch">
        <div className="mg-kicker">DOORS ARE OPEN</div>
        <h2 className="mg-h2" style={{ marginBottom: 0 }}>Orbit is live.</h2>
        <div style={{ marginTop: 20 }}>
          <a href={APP_SIGNUP} className="mg-cta">Create your workspace →</a>
        </div>
      </section>
    );
  }

  const p = parts === "unmounted" ? { d: "—", h: "—", m: "—", s: "—" } : parts;
  const units: [string, string][] = [
    [p.d, "days"],
    [p.h, "hours"],
    [p.m, "minutes"],
    [p.s, "seconds"],
  ];

  return (
    <section className="mg-count" aria-label={`Countdown to launch, ${LAUNCH_DATE_SHORT}`}>
      <div className="mg-kicker">DOORS OPEN {LAUNCH_DATE_SHORT.toUpperCase()}</div>
      <div className="mg-count-row" role="timer">
        {units.map(([n, l]) => (
          <div key={l} className="mg-count-cell">
            <div className="mg-count-n">{n}</div>
            <div className="mg-count-l">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

/* ── Sticky countdown bar ──────────────────────────────────────────
   Fixed to the bottom of every page: "DOORS OPEN 28 OCT", a live
   days/hrs/min/sec countdown to LAUNCH_AT, the seat line and the
   waitlist CTA. Renders "--" until mounted so server and client markup
   always match; at zero the copy swaps to "Doors are open" and the CTA
   points at the app's signup. */

import { useEffect, useState } from "react";
import { APP_SIGNUP, FOUNDING_SEATS, LAUNCH_AT, LAUNCH_DATE_BAR, isPostLaunch } from "@/lib/launch";

type Parts = { d: string; h: string; m: string; s: string };
const two = (n: number) => String(n).padStart(2, "0");

function partsAt(now: number): Parts {
  const sec = Math.max(0, Math.floor((LAUNCH_AT - now) / 1000));
  return { d: two(Math.floor(sec / 86400)), h: two(Math.floor((sec % 86400) / 3600)), m: two(Math.floor((sec % 3600) / 60)), s: two(sec % 60) };
}

export function StickyBar({ seatsTaken, href = "#cohort" }: { seatsTaken: number; href?: string }) {
  const [parts, setParts] = useState<Parts | null>(null);
  const [post, setPost] = useState(false);

  useEffect(() => {
    const tick = () => { setParts(partsAt(Date.now())); setPost(isPostLaunch()); };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const p = parts ?? { d: "--", h: "--", m: "--", s: "--" };

  if (post) {
    return (
      <div className="hy-bar" role="region" aria-label="Launch">
        <span className="hy-bar-k">Doors are open</span>
        <span className="hy-bar-seats">Hysaab is live. Founder pricing for the first {FOUNDING_SEATS}.</span>
        <a href={APP_SIGNUP} className="hy-btn hy-btn--blush">Create your workspace →</a>
      </div>
    );
  }

  return (
    <div className="hy-bar" role="region" aria-label={`Countdown to launch, ${LAUNCH_DATE_BAR}`}>
      <span className="hy-bar-k">Doors open {LAUNCH_DATE_BAR}</span>
      <div className="hy-bar-count" role="timer" aria-live="off">
        {([["days", p.d], ["hrs", p.h], ["min", p.m], ["sec", p.s]] as [string, string][]).map(([l, n]) => (
          <span className="hy-bar-unit" key={l}><span className="hy-bar-n">{n}</span><span className="hy-bar-l">{l}</span></span>
        ))}
      </div>
      <span className="hy-bar-seats">{seatsTaken} of {FOUNDING_SEATS} founding seats taken · founder pricing locked</span>
      <a href={href} className="hy-btn hy-btn--blush">Join the waitlist →</a>
    </div>
  );
}

"use client";

/* ── Homepage launch countdown ───────────────────────────────────────
   The sticky bar, reduced to what the homepage needs: a live countdown
   to LAUNCH_AT and the enquiry CTA. No seat count, no waitlist. Same
   hy-bar styles as the original StickyBar. Renders "--" until mounted so
   server and client markup match; at zero it points at the app signup. */

import { useEffect, useState } from "react";
import { APP_SIGNUP, LAUNCH_AT, LAUNCH_DATE_BAR, LAUNCH_DATE_LONG, isPostLaunch } from "@/lib/launch";

type Parts = { d: string; h: string; m: string; s: string };
const two = (n: number) => String(n).padStart(2, "0");

function partsAt(now: number): Parts {
  const sec = Math.max(0, Math.floor((LAUNCH_AT - now) / 1000));
  return { d: two(Math.floor(sec / 86400)), h: two(Math.floor((sec % 86400) / 3600)), m: two(Math.floor((sec % 3600) / 60)), s: two(sec % 60) };
}

export function LaunchBar({ href = "#conversation" }: { href?: string }) {
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
      <div className="hy-bar hw-launchbar" role="region" aria-label="Launch">
        <span className="hy-bar-k">Hysaab is live</span>
        <span className="hy-bar-seats" />
        <a href={APP_SIGNUP} className="hy-btn hy-btn--blush">Create your workspace →</a>
      </div>
    );
  }

  return (
    <div className="hy-bar hw-launchbar" role="region" aria-label={`Countdown to launch, ${LAUNCH_DATE_LONG}`}>
      <span className="hy-bar-k">Launching {LAUNCH_DATE_LONG}</span>
      <span className="hy-bar-k hw-launchbar-short" aria-hidden="true">{LAUNCH_DATE_BAR}</span>
      <div className="hy-bar-count" role="timer" aria-live="off">
        {([["days", p.d], ["hrs", p.h], ["min", p.m], ["sec", p.s]] as [string, string][]).map(([l, n]) => (
          <span className="hy-bar-unit" key={l}><span className="hy-bar-n">{n}</span><span className="hy-bar-l">{l}</span></span>
        ))}
      </div>
      <span className="hy-bar-seats" />
      <a href={href} className="hy-btn hy-btn--blush">Let’s talk →</a>
    </div>
  );
}

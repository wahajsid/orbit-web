"use client";

import { useRef, useState } from "react";

type FeedRow = { t: string; who: string; msg: string; ask?: boolean };

export function ActivityFeed({ rows }: { rows: FeedRow[] }) {
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="hw-feed m-enter-block">
      <div className="hw-feed-head">
        <span className="hw-eyebrow">Live from the agents</span>
        <button
          className="hw-pause-btn"
          onClick={() => {
            setPaused((p) => {
              const next = !p;
              document.querySelector(".hw-page")?.setAttribute("data-paused", String(next));
              return next;
            });
          }}
          aria-label={paused ? "Resume feed" : "Pause feed"}
        >
          {paused ? "▶ Play" : "❚❚ Pause"}
        </button>
      </div>
      <h2>One night<br />on a set<br />of books.</h2>
      <div className="hw-feed-window">
        <div className="hw-feed-track" ref={trackRef}>
          {[false, true].map((dup) => (
            <div key={String(dup)} aria-hidden={dup || undefined}>
              {rows.map((r) => (
                <div className={`hw-feed-row${r.ask ? " hw-feed-row--ask" : ""}`} key={r.t + r.who}>
                  <time>{r.t}</time>
                  <div>
                    <b>{r.who}</b>
                    <span>{r.msg}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

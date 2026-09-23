"use client";

import { useRef, useState } from "react";

type FeedRow = { t: string; who: string; msg: string; ask?: boolean };

/* Arabic strings are the site's existing ones (the old /ar live ticker
   and the demo's replay controls); no new Arabic was written. */
const T = {
  en: { live: "Live from the agents", resume: "Resume feed", pause: "Pause feed", play: "▶ Play", stop: "❚❚ Pause", h: <>One night<br />on a set<br />of books.</> },
  ar: { live: "مباشرة من الوكلاء", resume: "تشغيل الإعادة", pause: "إيقاف الإعادة مؤقتًا", play: "▶", stop: "❚❚", h: <>ليلة واحدة<br />على مجموعة دفاتر.</> },
};

export function ActivityFeed({ rows, locale = "en" }: { rows: FeedRow[]; locale?: "en" | "ar" }) {
  const t = T[locale];
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="hw-feed m-enter-block">
      <div className="hw-feed-head">
        <span className="hw-eyebrow">{t.live}</span>
        <button
          className="hw-pause-btn"
          onClick={() => {
            setPaused((p) => {
              const next = !p;
              document.querySelector(".hw-page")?.setAttribute("data-paused", String(next));
              return next;
            });
          }}
          aria-label={paused ? t.resume : t.pause}
        >
          {paused ? t.play : t.stop}
        </button>
      </div>
      <h2>{t.h}</h2>
      <div className="hw-feed-window">
        <div className="hw-feed-track" ref={trackRef}>
          {[false, true].map((dup) => (
            <div key={String(dup)} aria-hidden={dup || undefined}>
              {rows.map((r) => (
                <div className={`hw-feed-row${r.ask ? " hw-feed-row--ask" : ""}`} key={r.t + r.who}>
                  <time className="hy-num">{r.t}</time>
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

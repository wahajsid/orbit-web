"use client";

/* ── A work film for a product page hero ─────────────────────────────
   The homepage's close film (CloseFilm.tsx), generalised: one app window
   in which a piece of work runs, row by row, to a finished result (a
   stamped card). Used on /audit, /firms and /hire with each product's own
   rows. Same rules as the close film: it plays only on screen and with the
   tab visible, has a pause button, shows the finished state still under
   reduced motion, and gives screen readers one sentence. Figures come from
   each page's own copy; every film is labelled illustrative. Styles reuse
   close-film.css (cf-*). */

import { useEffect, useRef, useState } from "react";
import "./close-film.css";

export interface FilmRow { label: string; task: string; done: string }
export interface FilmProps {
  bar: string; tag: string; title: string; sr: string; cap: string;
  rows: FilmRow[];
  final: { k: string; h: string; s: string; sign: string };
  doneOf?: (d: number, n: number) => string;
}

const STEP = 950;          // ms per row
const TICK = 100;

export function WorkFilm({ bar, tag, title, sr, cap, rows, final, doneOf = (d, n) => `${d} of ${n} done` }: FilmProps) {
  const lockAt = rows.length * STEP + 600;
  const loop = lockAt + 4200;
  const [t, setT] = useState(loop - 1);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(true);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setStill(mq.matches);
    set();
    mq.addEventListener("change", set);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    if (root.current) io.observe(root.current);
    return () => { mq.removeEventListener("change", set); io.disconnect(); };
  }, []);

  useEffect(() => {
    if (still) { setT(loop - 1); return; }
    if (paused || !visible) return;
    const id = window.setInterval(() => { if (!document.hidden) setT((x) => (x + TICK) % loop); }, TICK);
    return () => window.clearInterval(id);
  }, [still, paused, visible, loop]);

  const doneAt = (i: number) => (i + 1) * STEP;
  const done = rows.filter((_, i) => t >= doneAt(i)).length;
  const locked = t >= lockAt;

  return (
    <figure className="cf wf" ref={root} data-scene={locked ? "locked" : "cal"} data-still={still ? "" : undefined}>
      <p className="hw-sr">{sr}</p>
      <div className="cf-win" aria-hidden="true">
        <div className="cf-bar">
          <span className="cf-dots"><i /><i /><i /></span>
          <span>{bar}</span>
          <span className="cf-tag">{tag}</span>
        </div>
        <div className="cf-stage">
          <section className="cf-scene cf-cal wf-scene">
            <header className="cf-h">
              <b>{title}</b>
              <span>{doneOf(done, rows.length)}</span>
            </header>
            <div className="cf-prog"><i style={{ width: `${Math.round((done / rows.length) * 100)}%` }} /></div>
            <ul>
              {rows.map((r, i) => {
                const ok = t >= doneAt(i);
                const now = !ok && (i === 0 || t >= doneAt(i - 1));
                return (
                  <li key={r.task} className={ok ? "ok" : now ? "now" : ""}>
                    <span className="cf-d"><bdi>{r.label}</bdi></span>
                    <span className="cf-m">{ok ? "✓" : ""}</span>
                    <span className="cf-t">{r.task}<small>{ok ? r.done : now ? "…" : ""}</small></span>
                  </li>
                );
              })}
            </ul>
            <div className="cf-lock">
              <p className="cf-lock-k">{final.k}</p>
              <p className="cf-lock-h">{final.h}</p>
              <p className="cf-lock-s">{final.s}</p>
              <p className="cf-lock-sign">{final.sign}</p>
            </div>
          </section>
        </div>
      </div>
      <figcaption className="cf-cap">
        <span>{cap}</span>
        {!still && (
          <button type="button" className="cf-pause" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
            {paused ? "Play" : "Pause"}<span className="hw-sr"> the animation</span>
          </button>
        )}
      </figcaption>
    </figure>
  );
}

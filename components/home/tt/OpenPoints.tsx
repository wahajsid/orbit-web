"use client";

/* ── Open review points (homepage header) ─────────────────────────────
   Sections carry data-open: the number of September-close review points
   still open when the reader reaches them. The counter shows the value
   of the last section above the middle of the screen: 43 at the top,
   0 at ALL SQUARE. */

import { useEffect, useState } from "react";

export function OpenPoints() {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    const marks = Array.from(document.querySelectorAll<HTMLElement>("[data-open]"));
    if (!marks.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.55;
      let cur = marks[0];
      for (const m of marks) if (m.getBoundingClientRect().top < line) cur = m;
      setN(Number(cur.dataset.open));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  if (n == null) return null;
  return (
    <span className="tt-openpts" data-zero={n === 0 || undefined} title="Open review points in September’s close, cleared as you read">
      <span className="tt-openpts-l">Open points</span> <b>{n}</b>
    </span>
  );
}

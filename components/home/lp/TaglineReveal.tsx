"use client";

/* The tagline reveal (landing-page-design B11): the line starts muted and
   each word lights up, in reading order, as it crosses a trigger line a
   little above the middle of the screen. One IntersectionObserver for all
   the words; no scroll listener. Words marked with * get the highlighter. */

import { useEffect, useRef } from "react";

export function TaglineReveal({ text, label }: { text: string; label?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting || e.boundingClientRect.top < 0) e.target.classList.add("on"); else e.target.classList.remove("on"); }),
      { rootMargin: "0px 0px -42% 0px", threshold: 0 },
    );
    el.querySelectorAll(".w").forEach((w) => io.observe(w));
    return () => io.disconnect();
  }, []);
  const words = text.split(" ");
  return (
    <p ref={ref} aria-label={label ?? text.replace(/\*/g, "")}>
      {words.map((w, i) => {
        const hl = w.startsWith("*");
        return <span key={i} aria-hidden="true"><span className={`w${hl ? " hl" : ""}`}>{w.replace(/\*/g, "")}</span>{i < words.length - 1 ? " " : ""}</span>;
      })}
    </p>
  );
}

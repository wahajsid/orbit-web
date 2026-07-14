"use client";

/* Progressive enhancement for the advert pages: reveal-on-scroll for .np-rise,
   a count-up for [data-np-count], and the top progress hairline.

   Driven by a requestAnimationFrame loop that reads getBoundingClientRect each
   frame — NOT scroll events or IntersectionObserver, both of which fire
   unreliably under Lenis smooth scroll. Content is visible by default (no-JS
   safe); the hidden pre-reveal state only applies once <html class="np-js"> is
   set here, and in-view items reveal immediately so nothing flashes. Parks fully
   under prefers-reduced-motion. Renders nothing. */

import { useEffect } from "react";

export function NpEnhance() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rises = Array.from(document.querySelectorAll<HTMLElement>(".np-rise"));
    const counted = new Set<HTMLElement>();
    document.documentElement.classList.add("np-js");

    function countUp(el: HTMLElement) {
      const to = Number(el.dataset.npCount);
      if (reduce || !Number.isFinite(to)) { el.textContent = `${to}%`; return; }
      const dur = 1300;
      let t0: number | null = null;
      const step = (ts: number) => {
        t0 = t0 ?? ts;
        const p = Math.min((ts - t0) / dur, 1);
        el.textContent = `${Math.round((1 - Math.pow(1 - p, 3)) * to)}%`;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    function fireCounter(host: HTMLElement) {
      const counter = host.dataset.npCount ? host : host.querySelector<HTMLElement>("[data-np-count]");
      if (counter && !counted.has(counter)) { counted.add(counter); countUp(counter); }
    }

    if (reduce) {
      rises.forEach((el) => el.classList.add("in"));
      document.querySelectorAll<HTMLElement>("[data-np-count]").forEach((el) => { el.textContent = `${el.dataset.npCount}%`; });
      return;
    }

    const prog = document.createElement("div");
    prog.className = "np-prog";
    document.body.appendChild(prog);

    let allIn = false;
    let frameRan = false;
    let raf = 0;
    const frame = () => {
      frameRan = true;
      if (!allIn) {
        const trigger = window.innerHeight * 0.9;
        let remaining = false;
        for (const el of rises) {
          if (el.classList.contains("in")) continue;
          if (el.getBoundingClientRect().top < trigger) { el.classList.add("in"); fireCounter(el); }
          else remaining = true;
        }
        allIn = !remaining;
      }
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      prog.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Failsafe: rAF is throttled in background/non-painting contexts. setTimeout
    // is not — so if the loop never started, reveal everything so content and
    // the count are never stuck hidden at 0.
    const failsafe = setTimeout(() => {
      if (frameRan) return;
      rises.forEach((el) => el.classList.add("in"));
      // rAF is dead here, so skip the animation and set final values directly.
      document.querySelectorAll<HTMLElement>("[data-np-count]").forEach((el) => { el.textContent = `${el.dataset.npCount}%`; });
    }, 2000);

    return () => { cancelAnimationFrame(raf); clearTimeout(failsafe); prog.remove(); };
  }, []);

  return null;
}

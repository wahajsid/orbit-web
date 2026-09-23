"use client";

/* ── Motion enhancer (brand/MOTION.md) ───────────────────────────────
   Mounted once in each root layout. Renders nothing. After hydration it:
   1. tags ↗ → ← glyphs inside links and buttons so they can slide;
   2. marks elements already on screen as .is-seen (never hidden);
   3. watches the rest ([data-reveal], [data-play], [data-count]) and
      reveals, plays or counts each one once as it scrolls in;
   4. only then adds html.m-ready, which is what allows off-screen
      reveal targets to start hidden.
   Under prefers-reduced-motion, or without IntersectionObserver, it
   stops after step 1 and every element stays in its final state.
   Pages opt their shared kit (hw-heading, hw-cards, hw-form, ...) into
   reveals with <MotionPage />; bespoke markup uses data-reveal itself. */

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ARROWS: Record<string, string> = { "↗": "ne", "→": "e", "←": "w" };
const ARROW_HOSTS = ".hw-btn, .hw-nav-cta, .hw-link, .hw-textlink, .hw-footer-mail, .m-btn";

/* The inner-page kit, revealed on pages that carry <MotionPage />. */
const KIT: readonly [string, string][] = [
  ["main > section:not(.hw-phero) .hw-heading", ""],
  ["main .hw-cards, main .hw-plans", "stagger-lg"],
  ["main .hw-rows, main .hw-index", "stagger"],
  ["main .hw-feature, main .hw-faq, main .hw-table-wrap, main .hw-note, main .hw-prose, main .hw-form", ""],
  ["main > section:not(.hw-phero) .hw-actions", ""],
  [".hw-talk-in", "stagger-lg"],
];

const STAGGER_CAP: Record<string, number> = { stagger: 7, "stagger-lg": 3 };

function countUp(el: HTMLElement, ms: number) {
  if (el.childElementCount > 0) return; // only plain-text numbers
  const text = el.textContent || "";
  const m = text.match(/-?\d[\d,]*(?:\.\d+)?/);
  if (!m || m.index === undefined) return;
  const raw = m[0];
  const to = parseFloat(raw.replace(/,/g, ""));
  const from = parseFloat(el.dataset.countFrom ?? "0");
  if (!isFinite(to) || !isFinite(from) || to === from) return;
  const decimals = (raw.split(".")[1] || "").length;
  const grouped = raw.includes(",");
  const pre = text.slice(0, m.index);
  const post = text.slice(m.index + raw.length);
  const fmt = (v: number) =>
    grouped
      ? v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : v.toFixed(decimals);
  // Hold the final width so neighbours never shift while digits change.
  const w = el.getBoundingClientRect().width;
  if (getComputedStyle(el).display === "inline") el.style.display = "inline-block";
  el.style.minWidth = `${Math.ceil(w)}px`;
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / ms);
    const e = 1 - Math.pow(1 - t, 3);
    el.textContent = t < 1 ? pre + fmt(from + (to - from) * e) + post : text;
    if (t < 1) requestAnimationFrame(step);
  };
  el.textContent = pre + fmt(from) + post;
  requestAnimationFrame(step);
}

export function MotionEnhancer() {
  const path = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    document.querySelectorAll<HTMLElement>(ARROW_HOSTS).forEach((host) => {
      host.querySelectorAll<HTMLElement>(':scope > span[aria-hidden="true"]').forEach((s) => {
        const dir = ARROWS[(s.textContent || "").trim()];
        if (dir) s.classList.add("m-arrow", `m-arrow--${dir}`);
      });
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      root.classList.remove("m-ready");
      return;
    }

    if (document.querySelector("[data-motion-page]")) {
      for (const [sel, mode] of KIT) {
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          if (el.hasAttribute("data-reveal") || el.parentElement?.closest("[data-reveal]")) return;
          el.setAttribute("data-reveal", mode);
        });
      }
    }

    const cs = getComputedStyle(root);
    const countMs = parseFloat(cs.getPropertyValue("--m-dur-count")) || 900;
    const vh = window.innerHeight;
    const onScreen = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < vh && (r.width > 0 || r.height > 0);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          if (el.hasAttribute("data-count") && !el.dataset.counted) {
            el.dataset.counted = "1";
            countUp(el, countMs);
          }
          if (el.hasAttribute("data-reveal") || el.hasAttribute("data-play")) el.classList.add("is-in");
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in):not(.is-seen)").forEach((el) => {
      const mode = el.getAttribute("data-reveal") || "";
      if (mode in STAGGER_CAP) {
        Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--m-i", String(Math.min(i, STAGGER_CAP[mode]))));
      }
      if (onScreen(el)) el.classList.add("is-seen");
      else io.observe(el);
    });

    document.querySelectorAll<HTMLElement>("[data-play]:not(.is-in)").forEach((el) => {
      if (onScreen(el)) el.classList.add("is-in");
      else { el.classList.add("is-late"); io.observe(el); }
    });

    document.querySelectorAll<HTMLElement>("[data-count]:not([data-counted])").forEach((el) => {
      if (onScreen(el)) el.dataset.counted = "1"; // already read: keep the real figure
      else io.observe(el);
    });

    root.classList.add("m-ready");
    return () => io.disconnect();
  }, [path]);

  return null;
}

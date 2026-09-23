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
const ARROW_HOSTS = ".hw-btn, .hw-nav-cta, .hw-link, .hw-textlink, .hw-footer-mail, .m-btn, .m-magnetic";

/* The inner-page kit, revealed on pages that carry <MotionPage />. */
const KIT: readonly [string, string][] = [
  ["main > section:not(.hw-phero) .hw-heading", ""],
  ["main .hw-cards, main .hw-plans", "stagger-lg"],
  ["main .hw-rows, main .hw-index", "stagger"],
  ["main .hw-feature, main .hw-faq, main .hw-table-wrap, main .hw-note, main .hw-prose, main .hw-form", ""],
  ["main > section:not(.hw-phero) .hw-actions", ""],
  [".hw-talk-in", "stagger-lg"],
  ["main .hw-workflow, main .hw-principles, main .hw-ways-grid, main .hw-shots-grid, main .hw-conversation-grid, main .hw-zero-layout", "stagger-lg"],
  ["main .hw-team-grid, main .hw-team-orgs, main .hw-family", "stagger"],
  ["main .hw-live-copy, main .hw-control-grid > div:first-child", ""],
  [".hw-footer-cols", "stagger"],
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

    const marker = document.querySelector<HTMLElement>("[data-motion-page]");
    if (marker && marker.dataset.motionPage !== "hero") {
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
          if (el.hasAttribute("data-reveal") || el.hasAttribute("data-play") || el.hasAttribute("data-kin-on-view")) el.classList.add("is-in");
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

    document.querySelectorAll<HTMLElement>("[data-play]:not(.is-in), [data-kin-on-view]:not(.is-in)").forEach((el) => {
      if (onScreen(el)) el.classList.add("is-in");
      else { el.classList.add("is-late"); io.observe(el); }
    });

    document.querySelectorAll<HTMLElement>("[data-count]:not([data-counted])").forEach((el) => {
      if (onScreen(el)) el.dataset.counted = "1"; // already read: keep the real figure
      else io.observe(el);
    });

    /* Sticky step reveal: the step crossing the middle is active. */
    const stepIo = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const box = (e.target as HTMLElement).closest<HTMLElement>("[data-steps]");
          if (!box) continue;
          const steps = Array.from(box.querySelectorAll<HTMLElement>("[data-step]"));
          const at = steps.indexOf(e.target as HTMLElement);
          steps.forEach((s, i) => { s.classList.toggle("is-active", i === at); s.classList.toggle("is-past", i < at); });
          box.dataset.active = String(at);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    document.querySelectorAll<HTMLElement>("[data-steps]").forEach((box) => {
      box.dataset.active = "0"; // server markup shows the finished step
      box.querySelectorAll("[data-step]").forEach((s, i) => { if (i === 0) s.classList.add("is-active"); stepIo.observe(s); });
    });

    /* Scroll-linked: lit words and parallax, one rAF per scroll. */
    const words = Array.from(document.querySelectorAll<HTMLElement>("[data-scrollwords]"));
    const para = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax] .hw-capture-open"));
    let raf = 0;
    const tick = () => {
      raf = 0;
      const h = window.innerHeight;
      for (const el of words) {
        const r = el.getBoundingClientRect();
        // 0 as the top enters at 88% of the viewport, 1 by the time it reaches 30%.
        const p = Math.min(1, Math.max(0, (h * 0.88 - r.top) / (h * 0.58 + r.height * 0.4)));
        el.style.setProperty("--p", p.toFixed(3));
      }
      for (const el of para) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > h) continue;
        const c = (r.top + r.height / 2 - h / 2) / h; // -0.5 … 0.5 across the viewport
        el.style.setProperty("--py", `${(c * -18).toFixed(1)}px`);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    if (words.length || para.length) {
      tick();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    /* Magnetic buttons (pointer devices): pull toward the cursor inside a
       radius, falling off with distance. */
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const mags = fine ? Array.from(document.querySelectorAll<HTMLElement>(".m-magnetic")) : [];
    let mraf = 0;
    let px = 0;
    let py = 0;
    const pull = () => {
      mraf = 0;
      for (const el of mags) {
        const r = el.getBoundingClientRect();
        const dx = px - (r.left + r.width / 2);
        const dy = py - (r.top + r.height / 2);
        const reach = Math.max(r.width, r.height) * 0.5 + 70;
        const dist = Math.hypot(dx, dy);
        const f = dist < reach ? 1 - dist / reach : 0;
        el.style.setProperty("--mx", `${(dx * 0.22 * f).toFixed(1)}px`);
        el.style.setProperty("--my", `${(dy * 0.32 * f).toFixed(1)}px`);
      }
    };
    const onMove = (e: PointerEvent) => { px = e.clientX; py = e.clientY; if (!mraf) mraf = requestAnimationFrame(pull); };
    if (mags.length) window.addEventListener("pointermove", onMove, { passive: true });

    /* Replay buttons restart a CSS sequence: [data-replay="<id>"]. */
    const onReplay = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>("[data-replay]");
      if (!b) return;
      const t = document.getElementById(b.dataset.replay || "");
      if (!t) return;
      t.classList.add("is-reset");
      void t.offsetWidth;
      t.classList.remove("is-reset");
    };
    document.addEventListener("click", onReplay);

    root.classList.add("m-ready");
    return () => {
      io.disconnect();
      stepIo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("click", onReplay);
      if (raf) cancelAnimationFrame(raf);
      if (mraf) cancelAnimationFrame(mraf);
    };
  }, [path]);

  return null;
}

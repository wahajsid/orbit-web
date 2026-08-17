"use client";

import { useEffect, useState } from "react";
import { LAUNCH_AT, LAUNCH_DATE_SHORT, LAUNCH_DATE_SHORT_AR, APP_SIGNUP } from "@/lib/launch";

/* ── Launch countdown ────────────────────────────────────────────────
   Ruled paper band ticking down to the gate in lib/launch.ts (one
   source of truth — the copy and the timer can never disagree). Renders
   em-dashes until mounted so server and client markup always match;
   after the gate passes it flips to the doors-open CTA. */

type Parts = { d: string; h: string; m: string; s: string };
const two = (n: number) => String(n).padStart(2, "0");

function partsAt(now: number): Parts | null {
  const left = LAUNCH_AT - now;
  if (left <= 0) return null;
  const sec = Math.floor(left / 1000);
  return {
    d: String(Math.floor(sec / 86400)),
    h: two(Math.floor((sec % 86400) / 3600)),
    m: two(Math.floor((sec % 3600) / 60)),
    s: two(sec % 60),
  };
}

const T = {
  en: {
    open: "DOORS ARE OPEN", live: "Orbit is live.", create: "Create your workspace →",
    kicker: (d: string) => `DOORS OPEN ${d.toUpperCase()}`,
    aria: (d: string) => `Countdown to launch, ${d}`,
    launch: "Launch",
    units: ["days", "hours", "minutes", "seconds"],
    date: LAUNCH_DATE_SHORT,
  },
  ar: {
    open: "الأبواب مفتوحة", live: "أوربت متاح الآن.", create: "أنشئ مساحة عملك ←",
    kicker: (d: string) => `الأبواب تُفتح ${d}`,
    aria: (d: string) => `العد التنازلي للإطلاق، ${d}`,
    launch: "الإطلاق",
    units: ["يوم", "ساعة", "دقيقة", "ثانية"],
    date: LAUNCH_DATE_SHORT_AR,
  },
} as const;

export function Countdown({ locale = "en" }: { locale?: "en" | "ar" }) {
  const t = T[locale];
  const [parts, setParts] = useState<Parts | null | "unmounted">("unmounted");

  useEffect(() => {
    const tick = () => setParts(partsAt(Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (parts === null) {
    return (
      <section className="mg-count" aria-label={t.launch}>
        <div className="mg-kicker">{t.open}</div>
        <h2 className="mg-h2" style={{ marginBottom: 0 }}>{t.live}</h2>
        <div style={{ marginTop: 20 }}>
          <a href={APP_SIGNUP} className="mg-cta">{t.create}</a>
        </div>
      </section>
    );
  }

  const p = parts === "unmounted" ? { d: "—", h: "—", m: "—", s: "—" } : parts;
  const units: [string, string][] = [
    [p.d, t.units[0]],
    [p.h, t.units[1]],
    [p.m, t.units[2]],
    [p.s, t.units[3]],
  ];

  return (
    <section className="mg-count" aria-label={t.aria(t.date)}>
      <div className="mg-kicker">{t.kicker(t.date)}</div>
      <div className="mg-count-row" role="timer">
        {units.map(([n, l]) => (
          <div key={l} className="mg-count-cell">
            <div className="mg-count-n">{n}</div>
            <div className="mg-count-l">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

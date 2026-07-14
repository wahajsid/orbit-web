"use client";

/* The /newpage hero headline — three founder truths, cross-fading, using the
   same rotation the home hero uses (5.2s dwell, 0.38s fade). Reduced-motion
   keeps the first line still. */

import { useEffect, useState } from "react";

const HEADLINES: [string, string][] = [
  ["You didn't start a company", "to reconcile spreadsheets."],
  ["You didn't build a business", "to chase receipts on WhatsApp."],
  ["You didn't hire your team", "to be buried in reconciliations and adjusting entries."],
];

export function RotatingHeadline({ items = HEADLINES }: { items?: [string, string][] }) {
  const [i, setI] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => { setI((n) => (n + 1) % items.length); setFading(false); }, 380);
    }, 5200);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <h1 className={`hero-head hero-rotate${fading ? " fading" : ""}`}>
      {items[i][0]}<br />{items[i][1]}
    </h1>
  );
}

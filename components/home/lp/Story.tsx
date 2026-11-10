"use client";

/* A visual that acts out its job (design-to-motion, website context): the
   CSS story in app/lp.css runs only while 30% of the visual is on screen
   and pauses when it leaves. Reduced motion: the CSS shows the final state.
   Screen readers get the visual's one-sentence description. */

import { useEffect, useRef, type ReactNode } from "react";

export function Story({ kind, label, children }: { kind: string; label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("is-live", e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`lp-vis lp-story lp-st-${kind}`} role="img" aria-label={label}>
      <div aria-hidden="true" style={{ height: "100%" }}>{children}</div>
    </div>
  );
}

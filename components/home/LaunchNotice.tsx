"use client";

/* ── Compact launch notice ───────────────────────────────────────────
   Replaces the persistent countdown bar (review 2026-09-18: a ticking
   strip competed with the content and took phone space). One quiet line
   next to the primary call to action: the launch date and the days left,
   which is the part of a countdown that carries information. Renders the
   date alone until mounted so server and client markup match.
   After the launch instant (2026-09-30, invite-only) it points at
   /access, never the app's signup. */

import { useEffect, useState } from "react";
import { LAUNCH_AT, LAUNCH_DATE_LONG, LAUNCH_DATE_LONG_AR, isPostLaunch } from "@/lib/launch";
import { ACCESS_HREF, ACCESS_LABEL } from "@/lib/access";

export function LaunchNotice({ locale = "en", tone = "dark" }: { locale?: "en" | "ar"; tone?: "dark" | "light" }) {
  const [days, setDays] = useState<number | null>(null);
  const [post, setPost] = useState(false);
  useEffect(() => {
    setDays(Math.max(0, Math.ceil((LAUNCH_AT - Date.now()) / 86400000)));
    setPost(isPostLaunch());
  }, []);
  const ar = locale === "ar";
  if (post) {
    return (
      <p className={`hw-launch hw-launch--${tone}`}>
        <span className="hw-dot" aria-hidden="true" />
        {/* AR-REVIEW: "يفتح Hysaab أبوابه بالدعوة." */}
        {ar ? <>يفتح Hysaab أبوابه بالدعوة. <a href={ACCESS_HREF.ar}>{ACCESS_LABEL.ar} ←</a></> : <>Hysaab is opening by invitation. <a href={ACCESS_HREF.en}>{ACCESS_LABEL.en} →</a></>}
      </p>
    );
  }
  const left = days === null ? "" : ar ? ` · بعد ${days} يومًا` : ` · ${days} days to go`;
  return (
    <p className={`hw-launch hw-launch--${tone}`}>
      <span className="hw-dot" aria-hidden="true" />
      {ar ? `الإطلاق في ${LAUNCH_DATE_LONG_AR}` : `Launching ${LAUNCH_DATE_LONG}`}
      <span className="hy-num">{left}</span>
    </p>
  );
}

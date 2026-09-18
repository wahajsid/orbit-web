"use client";

/* ── Compact launch notice ───────────────────────────────────────────
   Replaces the persistent countdown bar (review 2026-09-18: a ticking
   strip competed with the content and took phone space). One quiet line
   next to the primary call to action: the launch date and the days left,
   which is the part of a countdown that carries information. Renders the
   date alone until mounted so server and client markup match. */

import { useEffect, useState } from "react";
import { APP_SIGNUP, LAUNCH_AT, LAUNCH_DATE_LONG, LAUNCH_DATE_LONG_AR, isPostLaunch } from "@/lib/launch";

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
        {ar ? <>Hysaab متاح الآن. <a href={APP_SIGNUP}>أنشئ مساحة عملك ←</a></> : <>Hysaab is live. <a href={APP_SIGNUP}>Create your workspace →</a></>}
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

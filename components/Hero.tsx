"use client";

/* Hero — motion moment 1 (the Morning Brief slides into the band on load,
   the kicker date ticks to today) plus the ONE-CLICK capture: "Claim a
   founding seat" unfolds name/email/company right here, no navigation. The
   nav's FOUNDING COHORT link fires the same expansion via a window event.
   Post-launch (or ?preview=post) the CTA goes straight to the app signup. */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { APP_SIGNUP, FOUNDING_SEATS, LAUNCH_AT, isPostLaunch } from "@/lib/launch";
import { useEarlyAccess } from "./useEarlyAccess";

const pad3 = (n: number) => String(n).padStart(3, "0");

export const CLAIM_EVENT = "orbit:claim";

/* Three past-tense product truths, cross-fading. Reduced-motion: the first
   stays put. */
const HEADLINES: [string, string][] = [
  ["The close ran", "while you slept."],
  ["The books wrote", "themselves."],
  ["The VAT was in,", "two weeks early."],
];

export function Hero({ seat }: { seat: number }) {
  const [post, setPost] = useState(() => Date.now() >= LAUNCH_AT);
  const [dateLabel, setDateLabel] = useState("");
  const [open, setOpen] = useState(false);
  const [headline, setHeadline] = useState(0);
  const [fading, setFading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const { f, setF, busy, done, err, submit } = useEarlyAccess();

  useEffect(() => {
    setPost(isPostLaunch());
    const gulf = new Date(Date.now() + 4 * 3600_000);
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    setDateLabel(`${gulf.getUTCDate()} ${months[gulf.getUTCMonth()]} · `);
    // The nav CTA opens the same capture form.
    const onClaim = () => { setOpen(true); window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(() => emailRef.current?.focus(), 450); };
    window.addEventListener(CLAIM_EVENT, onClaim);
    // Headline rotation.
    let rotate: ReturnType<typeof setInterval> | undefined;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rotate = setInterval(() => {
        setFading(true);
        setTimeout(() => { setHeadline((h) => (h + 1) % HEADLINES.length); setFading(false); }, 380);
      }, 5200);
    }
    return () => { window.removeEventListener(CLAIM_EVENT, onClaim); if (rotate) clearInterval(rotate); };
  }, []);

  function claim() {
    setOpen(true);
    setTimeout(() => emailRef.current?.focus(), 60);
  }

  return (
    <div className="hero-grid">
      <div>
        <div className="microlabel hero-kicker">{dateLabel}06:04 GST · CLOSE COMPLETE</div>
        <h1 className={`hero-head hero-rotate${fading ? " fading" : ""}`}>
          {HEADLINES[headline][0]}<br />{HEADLINES[headline][1]}
        </h1>
        <p className="hero-sub">
          An AI finance team for UAE &amp; KSA businesses. Documents in, ledger done,
          one honest email at sunrise.
        </p>

        {post ? (
          <div className="hero-actions">
            <a className="cta" href={APP_SIGNUP}>Open your account</a>
            <span className="mono hero-seat">THE DOORS ARE OPEN</span>
          </div>
        ) : done ? (
          <div className="hero-claimed mono">
            SEAT {pad3(seat)} · {done.already ? "YOU'RE ALREADY IN THE LEDGER" : `RESERVED${f.company ? ` FOR ${f.company.toUpperCase()}` : ""} ✓ — WATCH YOUR INBOX`}
          </div>
        ) : !open ? (
          <div className="hero-actions">
            <button className="cta" onClick={claim}>Claim a founding seat</button>
            <span className="mono hero-seat">SEAT {pad3(seat)}/{FOUNDING_SEATS} REMAINS</span>
          </div>
        ) : (
          <div className="hero-capture">
            <div className="mono hero-capture-head">FOUNDING LEDGER · ENTRY {pad3(seat)} · 12 MO FREE</div>
            <div className="hero-capture-row">
              <input placeholder="your name" value={f.name} autoComplete="name" aria-label="Your name"
                onChange={(e) => setF({ ...f, name: e.target.value })} />
              <input ref={emailRef} placeholder="work email" type="email" value={f.email} autoComplete="email" aria-label="Work email"
                onChange={(e) => setF({ ...f, email: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && submit()} />
              <input placeholder="company" value={f.company} autoComplete="organization" aria-label="Company"
                onChange={(e) => setF({ ...f, company: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && submit()} />
              <button className="cta" onClick={submit} disabled={busy} style={{ opacity: busy ? 0.6 : 1 }}>
                {busy ? "Recording…" : "Claim it"}
              </button>
            </div>
            <div className="hp-field" aria-hidden="true">
              <input value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            {err && <div className="hero-capture-err">{err}</div>}
            <div className="mono hero-seat" style={{ marginTop: 10 }}>WORK EMAIL ONLY · A REAL PERSON READS EVERY ENTRY</div>
          </div>
        )}
      </div>
      <div className="hero-shot shot arrive">
        <Image src="/shots/morning-brief.png" alt="The Orbit Morning Brief — yesterday's postings and today's one thing, emailed at sunrise" width={660} height={880} priority />
      </div>
    </div>
  );
}

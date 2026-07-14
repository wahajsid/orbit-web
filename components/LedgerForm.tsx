"use client";

/* The founding ledger — the waitlist form IS a ledger entry. Seat rows above
   (redacted blocks for taken seats), then "your entry?" expands into three
   mono inputs styled like ledger lines. Shares submit logic (and all spam
   guards) with the hero capture. Post-launch the panel points at the app's
   signup instead. */

import { useEffect, useState } from "react";
import { APP_SIGNUP, FOUNDING_SEATS, LAUNCH_AT, isPostLaunch } from "@/lib/launch";
import { useEarlyAccess } from "./useEarlyAccess";

const pad3 = (n: number) => String(n).padStart(3, "0");

export function LedgerForm({ seat }: { seat: number }) {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState(() => Date.now() >= LAUNCH_AT);
  useEffect(() => { setPost(isPostLaunch()); }, []);
  const { f, setF, busy, done, err, submit } = useEarlyAccess();

  const taken: [number, string][] = [
    [seat - 3, "▓▓▓▓▓▓ LLC"],
    [seat - 2, "▓▓▓▓ Trading"],
    [seat - 1, "▓▓▓▓▓ & Co"],
  ];

  return (
    <div className="ledger-panel" id="ledger">
      <div className="microlabel ledger-head">FOUNDING LEDGER · 12 MO FREE</div>
      <div className="ledger-rows">
        {taken.map(([n, name]) => (
          <div key={n} className="taken">{pad3(n)} · <span className="redact">{name}</span> — taken</div>
        ))}
        <div>
          {pad3(seat)} ·{" "}
          {post ? (
            <a className="ledger-you" href={APP_SIGNUP} style={{ textDecoration: "none" }}>doors are open — sign up</a>
          ) : done ? (
            <span style={{ color: "var(--petrol)" }}>reserved ✓</span>
          ) : (
            <button className="ledger-you" onClick={() => setOpen(true)}>your entry?</button>
          )}
        </div>
        <div className="taken">{pad3(seat + 1)} · ——————</div>
        <div className="taken">⋮</div>
        <div className="taken">{pad3(FOUNDING_SEATS)} · doors open 20 July</div>
      </div>

      {open && !done && !post && (
        <div className="ledger-form">
          <div className="hp-field" aria-hidden="true">
            <input value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <input placeholder="your name" value={f.name} autoComplete="name"
            onChange={(e) => setF({ ...f, name: e.target.value })} aria-label="Your name" />
          <input placeholder="work email" value={f.email} type="email" autoComplete="email"
            onChange={(e) => setF({ ...f, email: e.target.value })} aria-label="Work email"
            onKeyDown={(e) => e.key === "Enter" && submit()} />
          <input placeholder="company" value={f.company} autoComplete="organization"
            onChange={(e) => setF({ ...f, company: e.target.value })} aria-label="Company"
            onKeyDown={(e) => e.key === "Enter" && submit()} />
          {err && <div className="ledger-msg bad">{err}</div>}
          <button className="cta" onClick={submit} disabled={busy} style={{ width: "100%", opacity: busy ? 0.6 : 1 }}>
            {busy ? "Recording…" : "Claim this entry"}
          </button>
        </div>
      )}
      {done && (
        <div className="ledger-msg ok" style={{ marginTop: 10 }}>
          {done.already ? "You're already in the ledger — see you at the doors." : `Entry ${pad3(seat)} reserved${f.company ? ` for ${f.company}` : ""}. Watch your inbox.`}
        </div>
      )}

      <div className="ledger-note">
        First {FOUNDING_SEATS} companies get twelve months free — fair-usage policy applies — with founder pricing
        locked in after. Work email only; a real person reads every entry.
      </div>
    </div>
  );
}

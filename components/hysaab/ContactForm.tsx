"use client";

/* ── Footer enquiry form ───────────────────────────────────────────
   Name, email, accounting system, notes. Posts to /api/contact, which
   emails the enquiry to the team inbox (CONTACT_TO on Vercel) with the
   sender as reply-to. Same honeypot + timing guards as the waitlist. */

import { useMemo, useState } from "react";
import { ACCOUNTING_SYSTEMS } from "./CohortForm";

export function ContactForm() {
  const loadedAt = useMemo(() => Date.now(), []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [system, setSystem] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), accounting_system: system, notes: notes.trim(), website, loadedAt }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) { setErr(data.error || "Something went wrong. Email us at info@hysaab.ai instead."); return; }
      setDone(true);
    } catch {
      setErr("Something went wrong. Email us at info@hysaab.ai instead.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="hy-form-done" role="status">
        <span className="hy-form-done-h">Received.</span>
        <span className="hy-form-done-p">A real person will reply within one working day.</span>
      </div>
    );
  }

  return (
    <form className="hy-form" onSubmit={submit} aria-label="Get in touch">
      <div className="hy-hp" aria-hidden="true">
        <label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
      </div>
      <label className="hy-field">Name
        <input className="hy-input" type="text" required placeholder="Layla Haddad" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="hy-field">Email
        <input className="hy-input" type="email" required placeholder="you@company.ae" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="hy-field hy-field--full">Accounting system used
        <select className="hy-input" value={system} onChange={(e) => setSystem(e.target.value)}>
          <option value="">Choose one</option>
          {ACCOUNTING_SYSTEMS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label className="hy-field hy-field--full">Notes
        <textarea className="hy-input" required placeholder="What would you like to know?" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={4000} />
      </label>
      <button type="submit" className="hy-btn hy-btn--navy hy-btn--lg" disabled={busy} style={{ opacity: busy ? 0.6 : 1 }}>
        {busy ? "Sending…" : "Send the enquiry →"}
      </button>
      {err && <div className="hy-form-msg" role="alert">{err}</div>}
    </form>
  );
}

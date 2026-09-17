"use client";

/* ── Homepage enquiry form ───────────────────────────────────────────
   Name, work email, accounting system, optional note. Posts to the
   site's existing /api/contact (email to the team inbox, sender as
   reply-to; nothing is stored) with the same honeypot + timing guards
   as the footer form.

   "Explore the workspace" and "Discuss managed support" preselect an
   interest. It travels as its own line ahead of the visitor's note, so
   it never overwrites anything they have typed. Success is shown only
   on a confirmed 200; on failure every field keeps its content. */

import { useEffect, useMemo, useRef, useState } from "react";

export const HOME_SYSTEMS = ["Xero", "Zoho Books", "QuickBooks", "Wafeq", "Odoo", "ERPNext", "Spreadsheets / other"] as const;

export type Interest = "Own team" | "Managed support";
const INTEREST_EVENT = "hw-interest";
const INTEREST_LABEL: Record<Interest, string> = {
  "Own team": "Hysaab for our existing finance team",
  "Managed support": "Managed accounting support",
};

/** A link to the enquiry section that also preselects the interest. */
export function InterestLink({ interest, children }: { interest: Interest; children: React.ReactNode }) {
  return (
    <a
      href="#conversation"
      className="hw-link hw-link--ruled"
      onClick={() => window.dispatchEvent(new CustomEvent<Interest>(INTEREST_EVENT, { detail: interest }))}
    >
      {children}
    </a>
  );
}

export function EnquiryForm({ source = "Homepage" }: { source?: string }) {
  const loadedAt = useMemo(() => Date.now(), []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [system, setSystem] = useState("");
  const [help, setHelp] = useState("");
  const [interest, setInterest] = useState<Interest | null>(null);
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const sending = useRef(false);

  useEffect(() => {
    const on = (e: Event) => setInterest((e as CustomEvent<Interest>).detail);
    window.addEventListener(INTEREST_EVENT, on);
    return () => window.removeEventListener(INTEREST_EVENT, on);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending.current) return; // a second click while the first is in flight
    sending.current = true;
    setErr(null);
    setBusy(true);
    const notes = [
      `${source} enquiry: requested a conversation.`,
      interest ? `Interested in: ${INTEREST_LABEL[interest]}.` : "",
      help.trim(),
    ].filter(Boolean).join("\n\n");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), accounting_system: system, notes, website, loadedAt }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) { setErr(data.error || "We could not send that. Email info@hysaab.ai instead."); return; }
      setDone(true);
    } catch {
      setErr("We could not send that. Check your connection, or email info@hysaab.ai instead.");
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="hw-form hw-form--done" role="status">
        <h3>Received.</h3>
        <p>Thank you, {name.trim().split(/\s+/)[0] || "and welcome"}. A real person from the Hysaab team will reply within one working day.</p>
      </div>
    );
  }

  return (
    <form className="hw-form" onSubmit={submit} aria-labelledby="hw-form-h">
      <div className="hw-form-head">
        <h3 id="hw-form-h">Meet Hysaab.</h3>
      </div>
      <div className="hy-hp" aria-hidden="true">
        <label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
      </div>
      {interest && (
        <p className="hw-form-interest">
          <span>Asking about: <strong>{INTEREST_LABEL[interest]}</strong></span>
          <button type="button" onClick={() => setInterest(null)} aria-label="Clear the selected interest">Clear</button>
        </p>
      )}
      <label htmlFor="hw-name">Your name</label>
      <input id="hw-name" name="name" autoComplete="name" placeholder="Layla Haddad" required maxLength={200} value={name} onChange={(e) => setName(e.target.value)} />
      <label htmlFor="hw-email">Work email</label>
      <input id="hw-email" name="email" type="email" autoComplete="email" placeholder="layla@company.ae" required maxLength={320} value={email} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="hw-system">Your accounting system</label>
      <select id="hw-system" name="system" required value={system} onChange={(e) => setSystem(e.target.value)}>
        <option value="">Select your system</option>
        {HOME_SYSTEMS.map((s) => <option key={s}>{s}</option>)}
      </select>
      <label htmlFor="hw-help">What would you like help with? <span>(optional)</span></label>
      <textarea id="hw-help" name="help" rows={2} placeholder="Month-end, supplier invoices, clearer reporting…" maxLength={3500} value={help} onChange={(e) => setHelp(e.target.value)} />
      <button className="hw-btn hw-btn--navy" type="submit" disabled={busy} aria-disabled={busy}>
        {busy ? "Sending…" : "Request a conversation"} <span aria-hidden="true">↗</span>
      </button>
      {err && <p className="hw-form-err" role="alert">{err}</p>}
      <p className="hw-form-note">Your details go to the Hysaab team by email so a person can reply. Nothing is added to a mailing list.</p>
    </form>
  );
}

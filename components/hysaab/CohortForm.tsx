"use client";

/* ── Founding-cohort waitlist form ─────────────────────────────────
   Work email, company, accounting system. Native validation plus an
   instant free-mail check; the API route re-checks everything (and
   carries the honeypot + timing spam guards). On success the form is
   replaced by "You are number N on the list." */

import { useEffect, useMemo, useState } from "react";
import { isPersonalEmail } from "@/lib/email-domains";
import { APP_SIGNUP, isPostLaunch } from "@/lib/launch";

export const ACCOUNTING_SYSTEMS = ["Zoho Books", "QuickBooks", "Xero", "Tally", "Spreadsheets", "Other"] as const;

export function CohortForm({ seatsTaken }: { seatsTaken: number }) {
  const loadedAt = useMemo(() => Date.now(), []);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [system, setSystem] = useState("");
  const [website, setWebsite] = useState("");      // honeypot
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState<{ seat: number; already?: boolean } | null>(null);
  const [post, setPost] = useState(false);
  useEffect(() => { setPost(isPostLaunch()); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const em = email.trim();
    if (isPersonalEmail(em)) {
      setErr("Hysaab is for companies. Please use your work email rather than a personal Gmail or Outlook address.");
      return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: em, company: company.trim(), accounting_system: system, website, loadedAt }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        setErr(data.error || "Something went wrong. Email us at info@hysaab.ai and a person will add you by hand.");
        return;
      }
      setDone({ seat: Number(data.seat) || seatsTaken + 1, already: !!data.already });
    } catch {
      setErr("Something went wrong. Email us at info@hysaab.ai and a person will add you by hand.");
    } finally {
      setBusy(false);
    }
  }

  if (post) {
    return (
      <div className="hy-form-done">
        <span className="hy-form-done-h">Doors are open.</span>
        <span className="hy-form-done-p">Create your workspace and bring your ledger with you.</span>
        <a href={APP_SIGNUP} className="hy-btn hy-btn--navy hy-btn--lg" style={{ alignSelf: "flex-start" }}>Create your workspace →</a>
      </div>
    );
  }

  if (done) {
    return (
      <div className="hy-form-done" role="status">
        <span className="hy-form-done-h">{done.already ? "You are already on the list." : `You are number ${done.seat} on the list.`}</span>
        <span className="hy-form-done-p">A real person will reply within one working day.</span>
      </div>
    );
  }

  return (
    <form className="hy-form" onSubmit={submit} noValidate={false}>
      <div className="hy-hp" aria-hidden="true">
        <label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
      </div>
      <label className="hy-field">Work email
        <input className="hy-input" type="email" required placeholder="you@company.ae" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="hy-field">Company
        <input className="hy-input" type="text" required placeholder="Al Hamra Trading LLC" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} />
      </label>
      <label className="hy-field">Accounting system
        <select className="hy-input" required value={system} onChange={(e) => setSystem(e.target.value)}>
          <option value="">Choose one</option>
          {ACCOUNTING_SYSTEMS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <button type="submit" className="hy-btn hy-btn--navy hy-btn--lg" disabled={busy} style={{ opacity: busy ? 0.6 : 1 }}>
        {busy ? "Recording your entry…" : "Join the waitlist →"}
      </button>
      {err && <div className="hy-form-msg" role="alert">{err}</div>}
    </form>
  );
}

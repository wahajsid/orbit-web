"use client";

/* Shared submit logic for the two capture forms (hero inline + founding
   ledger). Client-side pre-checks for instant feedback; the API route
   re-checks everything authoritatively. Carries the spam-guard payload. */

import { useMemo, useState } from "react";
import { isPersonalEmail } from "@/lib/email-domains";

export interface CaptureFields { name: string; email: string; company: string; website: string; }

export function useEarlyAccess() {
  const [f, setF] = useState<CaptureFields>({ name: "", email: "", company: "", website: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ already: boolean } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const loadedAt = useMemo(() => Date.now(), []);

  async function submit() {
    if (busy) return;
    setErr(null);
    if (!f.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) { setErr("A valid email is required."); return; }
    if (isPersonalEmail(f.email)) { setErr("Orbit is for companies — please use your work email, not a personal Gmail/Outlook-style account."); return; }
    setBusy(true);
    try {
      const r = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, loadedAt }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.error || "Something went wrong — email us at info@orbitgulf.com.");
      setDone({ already: !!data.already });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong — email us at info@orbitgulf.com.");
    } finally { setBusy(false); }
  }

  return { f, setF, busy, done, err, submit };
}

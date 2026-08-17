"use client";

/* Shared submit logic for the two capture forms (hero inline + founding
   ledger). Client-side pre-checks for instant feedback; the API route
   re-checks everything authoritatively. Carries the spam-guard payload. */

import { useMemo, useState } from "react";
import { isPersonalEmail } from "@/lib/email-domains";

export interface CaptureFields { name: string; email: string; company: string; website: string; }

const MSG = {
  en: {
    invalid: "A valid email is required.",
    personal: "Orbit is for companies — please use your work email, not a personal Gmail/Outlook-style account.",
    generic: "Something went wrong — email us at info@orbitgulf.com.",
  },
  ar: {
    invalid: "يلزم إدخال بريد إلكتروني صحيح.",
    personal: "أوربت للشركات — يُرجى استخدام بريد العمل، وليس بريدًا شخصيًا مثل Gmail أو Outlook.",
    generic: "حدث خطأ ما — راسلنا على info@orbitgulf.com.",
  },
} as const;

export function useEarlyAccess(locale: "en" | "ar" = "en") {
  const m = MSG[locale];
  const [f, setF] = useState<CaptureFields>({ name: "", email: "", company: "", website: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ already: boolean } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const loadedAt = useMemo(() => Date.now(), []);

  async function submit() {
    if (busy) return;
    setErr(null);
    if (!f.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) { setErr(m.invalid); return; }
    if (isPersonalEmail(f.email)) { setErr(m.personal); return; }
    setBusy(true);
    try {
      const r = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, loadedAt }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.error || m.generic);
      setDone({ already: !!data.already });
    } catch (e) {
      setErr(e instanceof Error ? e.message : m.generic);
    } finally { setBusy(false); }
  }

  return { f, setF, busy, done, err, submit };
}

/* The demo-intake hand-off to the app. After /api/contact has emailed the
   team, the same enquiry goes to the app's demo-intake agent
   (app.hysaab.ai/api/public/demo-intake), which works out how to connect
   the prospect's accounting system, briefs the team and sends the prospect
   a copy with a short questionnaire.

   Best effort only: a short timeout, never throws, and the visitor's
   result never depends on it. Needs DEMO_INTAKE_SITE_KEY (the same value
   on the app); without it nothing is sent. HYSAAB_APP_URL overrides the
   app origin. Server only. */

export interface IntakeLead {
  name: string;
  email: string;
  role?: string;
  system?: string;
  systemOther?: string;
  notes?: string;
  source?: string;
  locale?: "en" | "ar";
}

export async function forwardToIntake(lead: IntakeLead, clientIp: string | null): Promise<{ ok: boolean; status?: number; skipped?: string }> {
  const key = process.env.DEMO_INTAKE_SITE_KEY?.trim();
  if (!key) return { ok: false, skipped: "DEMO_INTAKE_SITE_KEY not set" };
  const base = (process.env.HYSAAB_APP_URL?.trim() || "https://app.hysaab.ai").replace(/\/+$/, "");
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 6000);
  try {
    const r = await fetch(`${base}/api/public/demo-intake`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-intake-key": key, ...(clientIp ? { "x-intake-client-ip": clientIp } : {}) },
      body: JSON.stringify(lead),
      signal: ctrl.signal,
      cache: "no-store",
    });
    return { ok: r.ok, status: r.status };
  } catch (e) {
    return { ok: false, skipped: e instanceof Error ? e.message : String(e) };
  } finally {
    clearTimeout(timer);
  }
}

/* Footer enquiry form → email to the team inbox (CONTACT_TO, default
   maham@obliqueconsult.com) with the sender as reply-to, plus a copy to the
   owner. Same honeypot + timing guards as the waitlist; nothing is stored.
   After a successful send the enquiry also goes to the app's demo-intake
   agent (lib/intake.ts), which sends the visitor a warm welcome. That hand-off
   runs AFTER the response (owner, 2026-09-27: the visitor never waits on the
   app); if the app cannot be reached the site sends the welcome itself. */

import { NextRequest, NextResponse } from "next/server";
import { enquiryEmail, enquiryWelcomeEmail } from "@/lib/emails";
import { sendMail, CONTACT_TO, SIGNUP_CC } from "@/lib/mail";
import { forwardToIntake } from "@/lib/intake";
import { systemLabel } from "@/lib/systems";

export const runtime = "nodejs";

const MIN_SUBMIT_MS = 1500;

/** Keep work alive after the response. Vercel hands every request a
    waitUntil (what @vercel/functions wraps); elsewhere the promise simply
    runs on in the long-lived server. */
function waitUntil(p: Promise<unknown>): void {
  const ctx = (globalThis as { [k: symbol]: { get?: () => { waitUntil?: (p: Promise<unknown>) => void } } | undefined })[Symbol.for("@vercel/request-context")]?.get?.();
  if (ctx?.waitUntil) ctx.waitUntil(p);
  else void p;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* validation below rejects */ }

  const name = String(body?.name ?? "").trim().slice(0, 200);
  const email = String(body?.email ?? "").trim().slice(0, 320);
  const system = String(body?.accounting_system ?? "").trim().slice(0, 60);
  const systemOther = String(body?.system_other ?? "").trim().slice(0, 120);
  const source = String(body?.source ?? "").trim().slice(0, 60);
  const locale = body?.locale === "ar" ? "ar" : "en";
  const role = String(body?.role ?? "").trim().slice(0, 60);
  const notes = String(body?.notes ?? "").trim().slice(0, 4000);
  const website = String(body?.website ?? "");
  const loadedAt = Number(body?.loadedAt);

  if (website.trim()) return NextResponse.json({ ok: true });
  if (Number.isFinite(loadedAt) && Date.now() - loadedAt < MIN_SUBMIT_MS) return NextResponse.json({ ok: true });

  if (!name) return NextResponse.json({ error: "Please tell us your name." }, { status: 400 });
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required so we can reply." }, { status: 400 });
  }
  if (!notes) return NextResponse.json({ error: "Please add a note so we know what to answer." }, { status: 400 });

  const mail = enquiryEmail({ name, email, role, system: systemLabel(system, systemOther), notes });
  const sent = await sendMail({ to: CONTACT_TO, cc: SIGNUP_CC, reply_to: email, unsubscribe: false, ...mail });
  if (!sent.ok) {
    console.error("[contact] send failed:", sent.error);
    return NextResponse.json({ error: "We could not send that. Email info@hysaab.ai instead." }, { status: 502 });
  }
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  waitUntil((async () => {
    const intake = await forwardToIntake({ name, email, role, system, systemOther, notes, source, locale }, clientIp);
    if (intake.ok) return; // the app welcomes the visitor (or has judged it spam)
    console.warn("[contact] demo intake not reached:", intake.status ?? intake.skipped);
    if (intake.status === 429) return; // the app is rate-limiting this sender: no extra mail
    const welcome = await sendMail({ to: email, unsubscribe: false, ...enquiryWelcomeEmail({ name, system: systemLabel(system, systemOther) }) });
    if (!welcome.ok) console.error("[contact] welcome send failed:", welcome.error);
  })().catch((e) => console.error("[contact] after-response work failed:", e)));
  return NextResponse.json({ ok: true });
}

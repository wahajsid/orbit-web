/* Footer enquiry form → email to the team inbox (CONTACT_TO, default
   maham@obliqueconsult.com) with the sender as reply-to, plus a copy to the
   owner. Same honeypot + timing guards as the waitlist; nothing is stored. */

import { NextRequest, NextResponse } from "next/server";
import { enquiryEmail } from "@/lib/emails";
import { sendMail, CONTACT_TO, SIGNUP_CC } from "@/lib/mail";

export const runtime = "nodejs";

const MIN_SUBMIT_MS = 1500;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* validation below rejects */ }

  const name = String(body?.name ?? "").trim().slice(0, 200);
  const email = String(body?.email ?? "").trim().slice(0, 320);
  const system = String(body?.accounting_system ?? "").trim().slice(0, 60);
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

  const mail = enquiryEmail({ name, email, system, notes });
  const sent = await sendMail({ to: CONTACT_TO, cc: SIGNUP_CC, reply_to: email, unsubscribe: false, ...mail });
  if (!sent.ok) {
    console.error("[contact] send failed:", sent.error);
    return NextResponse.json({ error: "We could not send that. Email info@hysaab.ai instead." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

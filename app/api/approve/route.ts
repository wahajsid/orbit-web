/* Approve a waitlisted user — sends the "account ready" email with login
   details. Called when the owner clicks approve in the admin panel.
   Protected by a shared secret (APPROVE_SECRET env var).
   Env: RESEND_API_KEY, EMAIL_FROM, EMAIL_REPLY_TO, SIGNUP_CC, APPROVE_SECRET (see lib/mail.ts). */

import { NextRequest, NextResponse } from "next/server";
import { APPROVED_HTML, APPROVED_TEXT, APPROVED_SUBJECT } from "@/lib/emails";
import { sendMail, SIGNUP_CC } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-approve-secret");
  if (!process.env.APPROVE_SECRET || secret !== process.env.APPROVE_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* falls through to validation */ }

  const email = String(body?.email ?? "").trim().slice(0, 320);
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "valid email required" }, { status: 400 });
  }

  const sent = await sendMail({ to: email, cc: SIGNUP_CC, subject: APPROVED_SUBJECT, html: APPROVED_HTML, text: APPROVED_TEXT });
  if (sent.ok) return NextResponse.json({ ok: true, emailed: true });
  console.error("[approve] email failed:", sent.error);
  return NextResponse.json({ error: "email send failed", detail: sent.error }, { status: 502 });
}

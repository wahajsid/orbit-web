/* Approve a waitlisted user — sends the "account ready" email with login
   details. Called when the owner clicks approve in the admin panel.
   Protected by a shared secret (APPROVE_SECRET env var).
   Env: RESEND_API_KEY, EMAIL_FROM, EMAIL_REPLY_TO, SIGNUP_CC, APPROVE_SECRET. */

import { NextRequest, NextResponse } from "next/server";
import { APPROVED_HTML, APPROVED_TEXT, APPROVED_SUBJECT } from "@/lib/emails";

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

  if (!process.env.RESEND_API_KEY) {
    console.error("[approve] RESEND_API_KEY not set");
    return NextResponse.json({ error: "email service not configured" }, { status: 500 });
  }

  try {
    const er = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || "Orbit <notifications@app.orbitgulf.com>",
        to: email,
        cc: process.env.SIGNUP_CC || "wahajs@simpla.ai",
        reply_to: process.env.EMAIL_REPLY_TO || "info@orbitgulf.com",
        subject: APPROVED_SUBJECT,
        html: APPROVED_HTML,
        text: APPROVED_TEXT,
        headers: { "List-Unsubscribe": "<mailto:info@orbitgulf.com?subject=unsubscribe>" },
      }),
    });
    if (er.ok) return NextResponse.json({ ok: true, emailed: true });
    const detail = `resend ${er.status}: ${(await er.text()).slice(0, 300)}`;
    console.error("[approve] email failed:", detail);
    return NextResponse.json({ error: "email send failed", detail }, { status: 502 });
  } catch (e) {
    const detail = `network: ${e instanceof Error ? e.message : e}`;
    console.error("[approve] email threw:", detail);
    return NextResponse.json({ error: "email send failed", detail }, { status: 502 });
  }
}

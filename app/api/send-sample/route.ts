/* Temporary endpoint to send sample emails via Resend.
   Hardcoded recipient — remove after testing. */

import { NextResponse } from "next/server";
import {
  WELCOME_HTML, WELCOME_TEXT, WELCOME_SUBJECT,
  APPROVED_HTML, APPROVED_TEXT, APPROVED_SUBJECT,
} from "@/lib/emails";

export const runtime = "nodejs";

const SAMPLE_TO = "wahajs@simpla.ai";

export async function GET() {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY not set" }, { status: 500 });
  }

  const from = process.env.EMAIL_FROM || "Orbit <notifications@app.orbitgulf.com>";
  const reply_to = process.env.EMAIL_REPLY_TO || "info@orbitgulf.com";
  const unsub = { "List-Unsubscribe": "<mailto:info@orbitgulf.com?subject=unsubscribe>" };

  const emails = [
    { subject: `[SAMPLE] ${WELCOME_SUBJECT}`, html: WELCOME_HTML, text: WELCOME_TEXT },
    { subject: `[SAMPLE] ${APPROVED_SUBJECT}`, html: APPROVED_HTML, text: APPROVED_TEXT },
  ];

  const results = [];
  for (const e of emails) {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: SAMPLE_TO, reply_to, subject: e.subject, html: e.html, text: e.text, headers: unsub }),
    });
    results.push({ subject: e.subject, status: r.status, body: await r.json() });
  }

  return NextResponse.json({ ok: true, results });
}

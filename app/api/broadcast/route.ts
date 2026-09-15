/* Broadcast to the waitlist: the launch email, or an update/new-post email.
   Owner-only (x-approve-secret). Sends one message per row, sequentially,
   so a Resend rate limit or a bad address never takes the batch down.

   POST { kind: "launch" }
   POST { kind: "update", title, intro, body?, href, cta?, kicker? }
   Optional: { dry: true } returns the recipient count without sending;
             { to: ["a@b.com"] } overrides the recipient list (for a test). */

import { NextRequest, NextResponse } from "next/server";
import { LAUNCH_HTML, LAUNCH_TEXT, LAUNCH_SUBJECT, updateEmail } from "@/lib/emails";
import { sendMail } from "@/lib/mail";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-approve-secret");
  if (!process.env.APPROVE_SECRET || secret !== process.env.APPROVE_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { /* falls through */ }

  const kind = String(body?.kind ?? "");
  let mail: { subject: string; html: string; text: string };
  if (kind === "launch") mail = { subject: LAUNCH_SUBJECT, html: LAUNCH_HTML, text: LAUNCH_TEXT };
  else if (kind === "update") {
    const title = String(body?.title ?? "").trim();
    const intro = String(body?.intro ?? "").trim();
    const href = String(body?.href ?? "").trim();
    if (!title || !intro || !/^https?:\/\//.test(href)) {
      return NextResponse.json({ error: "update needs title, intro and an absolute href" }, { status: 400 });
    }
    mail = updateEmail({ title, intro, href, body: body?.body ? String(body.body) : undefined, cta: body?.cta ? String(body.cta) : undefined, kicker: body?.kicker ? String(body.kicker) : undefined });
  } else {
    return NextResponse.json({ error: "kind must be launch or update" }, { status: 400 });
  }

  let recipients: string[];
  if (Array.isArray(body?.to) && body.to.length) {
    recipients = (body.to as unknown[]).map(String);
  } else {
    const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/early_access?select=email&order=created_at.asc`, {
      headers: { apikey: process.env.SUPABASE_ANON_KEY ?? "", Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY ?? ""}` },
      cache: "no-store",
    });
    if (!r.ok) return NextResponse.json({ error: "could not read the list" }, { status: 502 });
    const rows = (await r.json()) as { email: string }[];
    recipients = Array.from(new Set(rows.map((x) => x.email.trim().toLowerCase()).filter(Boolean)));
  }

  if (body?.dry) return NextResponse.json({ ok: true, dry: true, recipients: recipients.length, subject: mail.subject });

  const failed: { email: string; error: string }[] = [];
  let sent = 0;
  for (const to of recipients) {
    const res = await sendMail({ to, ...mail });
    if (res.ok) sent++;
    else failed.push({ email: to, error: res.error });
    await new Promise((r) => setTimeout(r, 120));   // stay under Resend's per-second limit
  }
  return NextResponse.json({ ok: failed.length === 0, sent, failed });
}

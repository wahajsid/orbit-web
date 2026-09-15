/* One Resend sender for every route. Env (Vercel project):
   RESEND_API_KEY, EMAIL_FROM ("Hysaab <hello@hysaab.ai>"),
   EMAIL_REPLY_TO (info@hysaab.ai), SIGNUP_CC (owner copy on signups),
   CONTACT_TO (where footer enquiries land). */

export const FROM = process.env.EMAIL_FROM || "Hysaab <hello@hysaab.ai>";
export const REPLY_TO = process.env.EMAIL_REPLY_TO || "info@hysaab.ai";
export const SIGNUP_CC = process.env.SIGNUP_CC || "wahajs@simpla.ai";
export const CONTACT_TO = process.env.CONTACT_TO || "maham@obliqueconsult.com";

export type Mail = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  cc?: string | string[];
  reply_to?: string;
  unsubscribe?: boolean;
};

export async function sendMail(m: Mail): Promise<{ ok: true } | { ok: false; error: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: "RESEND_API_KEY not set" };
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: m.to,
        cc: m.cc,
        reply_to: m.reply_to ?? REPLY_TO,
        subject: m.subject,
        html: m.html,
        text: m.text,
        headers: m.unsubscribe === false ? undefined : { "List-Unsubscribe": `<mailto:${REPLY_TO}?subject=unsubscribe>` },
      }),
    });
    if (r.ok) return { ok: true };
    return { ok: false, error: `resend ${r.status}: ${(await r.text()).slice(0, 300)}` };
  } catch (e) {
    return { ok: false, error: `network: ${e instanceof Error ? e.message : e}` };
  }
}

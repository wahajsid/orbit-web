/* Business-email-only guard — mirrors lib/email-domain.ts in the Orbit app
   repo (separate repo, no shared import; keep the two lists in sync by hand).
   EXACT domain match only — never substring. Used by both the API route
   (authoritative) and the ledger form (instant feedback). */

export const PERSONAL_WEBMAIL = new Set([
  "gmail.com", "googlemail.com",
  "outlook.com", "hotmail.com", "live.com", "msn.com", "passport.com",
  "yahoo.com", "yahoo.co.uk", "yahoo.co.in", "yahoo.co.jp", "ymail.com", "rocketmail.com",
  "icloud.com", "me.com", "mac.com",
  "aol.com",
  "protonmail.com", "proton.me", "pm.me",
  "gmx.com", "gmx.net",
  "mail.com", "inbox.com",
  "yandex.com", "yandex.ru",
  "zoho.com",
  "qq.com", "163.com", "126.com",
  "rediffmail.com",
  "tutanota.com", "fastmail.com",
  "live.co.uk", "hotmail.co.uk",
]);

export const DISPOSABLE = new Set([
  "mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com", "temp-mail.org",
  "yopmail.com", "throwawaymail.com", "trashmail.com", "getnada.com", "dispostable.com",
  "sharklasers.com", "maildrop.cc", "mintemail.com", "fakeinbox.com", "moakt.com",
]);

export function emailDomainOf(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at < 0 || at === email.length - 1) return null;
  return email.slice(at + 1).trim().toLowerCase().replace(/\.$/, "");
}

export function isPersonalEmail(email: string): boolean {
  const d = emailDomainOf(email);
  return !!d && PERSONAL_WEBMAIL.has(d);
}

export function isDisposableEmail(email: string): boolean {
  const d = emailDomainOf(email);
  return !!d && DISPOSABLE.has(d);
}

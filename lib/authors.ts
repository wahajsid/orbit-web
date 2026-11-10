/* ── Who writes the guides and tools ─────────────────────────────────
   Owner instruction 2026-10-07: every guide and calculator is written by
   Wahaj Siddiqui, Managing Director of Oblique Consult. The bio is the
   published one in lib/team.ts; nothing here should be added without a
   published source. The byline and the Person JSON-LD both read from
   this record, so a change here moves every page at once. */

import { TEAM } from "@/lib/team";

const WAHAJ = TEAM.find((p) => p.name === "Wahaj Siddiqui")!;

export const AUTHOR = {
  name: "Wahaj Siddiqui",
  slug: "wahaj-siddiqui",
  jobTitle: "Managing Director",
  org: "Oblique Consult",
  orgUrl: "https://obliqueconsult.com",
  bio: WAHAJ.bio ?? "",
  sameAs: [WAHAJ.href],
  ar: { jobTitle: "المدير العام", bio: WAHAJ.ar.bio ?? "" },
};

export const AUTHOR_URL = `https://hysaab.ai/authors/${AUTHOR.slug}`;

/* schema.org Person, used as `author` on Article and WebApplication. */
export const AUTHOR_LD = {
  "@type": "Person",
  name: AUTHOR.name,
  jobTitle: AUTHOR.jobTitle,
  url: AUTHOR_URL,
  worksFor: { "@type": "Organization", name: AUTHOR.org, url: AUTHOR.orgUrl },
  sameAs: AUTHOR.sameAs,
};

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${Number(d)} ${MON[Number(m) - 1]} ${y}`;
}

import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { getArGuide } from "@/lib/guides-ar";
import { TOOLS } from "@/lib/tools";

const BASE = "https://hysaab.ai";

/* Every indexable route on the site. Marketing pages are hand-listed —
   the set changes with deliberate launches, not file churn. */
export default function sitemap(): MetadataRoute.Sitemap {
  /* `enOnly` pages have no Arabic twin yet, so they are listed once with
     no hreflang pair; a pair pointing at a 404 is worse than none. */
  const pages: { path: string; priority: number; enOnly?: boolean }[] = [
    { path: "/", priority: 1 },
    { path: "/pricing", priority: 0.9 },
    { path: "/accounting", priority: 0.9 },
    { path: "/invoice", priority: 0.7 },
    { path: "/hire", priority: 0.6, enOnly: true },
    { path: "/audit", priority: 0.7, enOnly: true },
    { path: "/check", priority: 0.9, enOnly: true },
    { path: "/firms", priority: 0.6 },
    { path: "/how-it-works", priority: 0.8 },
    { path: "/integrations", priority: 0.7 },
    { path: "/compliance", priority: 0.7 },
    { path: "/trust", priority: 0.7 },
    { path: "/guides", priority: 0.7 },
    { path: "/tools", priority: 0.7 },
    { path: "/faq", priority: 0.6 },
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
    { path: "/privacy", priority: 0.2, enOnly: true },
    { path: "/terms", priority: 0.2, enOnly: true },
  ];
  const now = new Date();
  /* Each marketing page exists in both languages; hreflang alternates on
     both entries mirror the per-page metadata so crawlers see one pair. */
  const arPath = (p: string) => (p === "/" ? "/ar" : `/ar${p}`);
  const languages = (p: string) => ({
    en: `${BASE}${p}`,
    ar: `${BASE}${arPath(p)}`,
    "x-default": `${BASE}${p}`,
  });
  return [
    ...pages.map((p) => ({
      url: `${BASE}${p.path}`, lastModified: now, priority: p.priority,
      ...(p.enOnly ? {} : { alternates: { languages: languages(p.path) } }),
    })),
    ...pages.filter((p) => !p.enOnly).map((p) => ({
      url: `${BASE}${arPath(p.path)}`, lastModified: now, priority: p.priority - 0.1,
      alternates: { languages: languages(p.path) },
    })),
    /* Guides and tools with an Arabic twin get both URLs + the hreflang
       pair; untranslated ones stay single-entry until their wave lands. */
    ...GUIDES.flatMap((g) => {
      const base = { lastModified: new Date(g.updated), priority: 0.6 };
      if (!getArGuide(g.slug)) return [{ url: `${BASE}/guides/${g.slug}`, ...base }];
      const alt = { languages: languages(`/guides/${g.slug}`) };
      return [
        { url: `${BASE}/guides/${g.slug}`, ...base, alternates: alt },
        { url: `${BASE}/ar/guides/${g.slug}`, ...base, priority: 0.5, alternates: alt },
      ];
    }),
    ...TOOLS.flatMap((t) => {
      const base = { lastModified: now, priority: 0.6 };
      if (!t.arTitle) return [{ url: `${BASE}/tools/${t.slug}`, ...base }];
      const alt = { languages: languages(`/tools/${t.slug}`) };
      return [
        { url: `${BASE}/tools/${t.slug}`, ...base, alternates: alt },
        { url: `${BASE}/ar/tools/${t.slug}`, ...base, priority: 0.5, alternates: alt },
      ];
    }),
  ];
}

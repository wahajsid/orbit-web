import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { TOOLS } from "@/lib/tools";

const BASE = "https://www.orbitgulf.com";

/* Every indexable route on the site. Marketing pages are hand-listed —
   the set changes with deliberate launches, not file churn. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/product", priority: 0.9 },
    { path: "/pricing", priority: 0.9 },
    { path: "/accounting", priority: 0.8 },
    { path: "/hire", priority: 0.7 },
    { path: "/invoice", priority: 0.7 },
    { path: "/firms", priority: 0.6 },
    { path: "/how-it-works", priority: 0.8 },
    { path: "/integrations", priority: 0.7 },
    { path: "/guides", priority: 0.7 },
    { path: "/tools", priority: 0.7 },
    { path: "/faq", priority: 0.6 },
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
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
      alternates: { languages: languages(p.path) },
    })),
    ...pages.map((p) => ({
      url: `${BASE}${arPath(p.path)}`, lastModified: now, priority: p.priority - 0.1,
      alternates: { languages: languages(p.path) },
    })),
    ...GUIDES.map((g) => ({ url: `${BASE}/guides/${g.slug}`, lastModified: new Date(g.updated), priority: 0.6 })),
    ...TOOLS.map((t) => ({ url: `${BASE}/tools/${t.slug}`, lastModified: now, priority: 0.6 })),
  ];
}

import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";

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
    { path: "/integrations", priority: 0.7 },
    { path: "/guides", priority: 0.7 },
    { path: "/faq", priority: 0.6 },
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
  ];
  const now = new Date();
  return [
    ...pages.map((p) => ({ url: `${BASE}${p.path}`, lastModified: now, priority: p.priority })),
    ...GUIDES.map((g) => ({ url: `${BASE}/guides/${g.slug}`, lastModified: new Date(g.updated), priority: 0.6 })),
  ];
}

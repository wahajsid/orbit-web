import type { MetadataRoute } from "next";

/* Everything public is crawlable, and the AI crawlers are ALLOWED by
   name — a deliberate decision: Orbit wants to be read and cited by
   generative engines (see /llms.txt). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: "https://www.orbitgulf.com/sitemap.xml",
  };
}

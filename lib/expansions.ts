/* ── SEO expansions (wave 2026-10) ────────────────────────────────────
   Each file in content/expansions/{guides,tools}/<slug>.json deepens one
   page without touching its title, description or URL (owner rule: no
   churn on those for cosmetic reasons). Guides: a fuller `sections`
   array (the original text kept, more added), `faqs`, `sources`, and a
   new `updated` date. Tools: a method, a worked example, FAQs and
   sources rendered under the calculator. Regenerate this index with
   `node scripts/index-expansions.mjs` after adding a file. */

import type { GuideFaq, GuideSection, GuideSource, Guide } from "@/lib/guides";
import { GUIDE_FILES, TOOL_FILES } from "./expansions.index";

export type ToolContent = {
  updated?: string;
  method: GuideSection[];
  example?: GuideSection;
  faqs?: GuideFaq[];
  sources?: GuideSource[];
};

export const GUIDE_EXPANSIONS: Record<string, Partial<Guide>> = GUIDE_FILES;
export const TOOL_CONTENT: Record<string, ToolContent> = TOOL_FILES;

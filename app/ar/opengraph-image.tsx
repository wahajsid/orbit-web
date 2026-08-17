import { brandOg, OG_SIZE } from "@/lib/og";

// English card by design for now — ImageResponse ships no Arabic glyphs,
// so Arabic titles would render as tofu. Arabic OG art joins the next
// Arabic wave alongside guide/calculator translation.
export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Orbit — الإقفال اكتمل وأنت نائم";

export default function Image() {
  return brandOg("AI finance team — UAE & KSA", "The close ran while you slept.");
}

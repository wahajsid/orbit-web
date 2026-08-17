import { brandOg, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Orbit — the close ran while you slept";

export default function Image() {
  return brandOg("AI finance team — UAE & KSA", "The close ran while you slept.");
}

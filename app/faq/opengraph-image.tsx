import { brandOg, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Orbit FAQ — straight answers";

export default function Image() {
  return brandOg("FAQ", "Straight answers.");
}

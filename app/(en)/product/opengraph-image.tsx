import { brandOg, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Orbit — one system, six modules, every dirham accounted for";

export default function Image() {
  return brandOg("The product", "One system, six modules, every dirham accounted for.");
}

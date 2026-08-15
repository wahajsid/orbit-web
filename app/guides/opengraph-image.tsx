import { brandOg, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Orbit guides — the busywork, explained plainly";

export default function Image() {
  return brandOg("Guides", "The busywork, explained plainly.");
}

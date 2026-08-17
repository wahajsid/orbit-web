import { brandOg, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Orbit pricing — sized by the work, not the seats";

export default function Image() {
  return brandOg("Pricing", "Sized by the work, not the seats.");
}

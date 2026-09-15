import { brandOg, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Hysaab: close the month in days. Take your evenings back.";

export default function Image() {
  return brandOg("AI accounting & reporting · UAE & GCC", "Close the month in days. Take your evenings back.");
}

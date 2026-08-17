import { brandOg, OG_SIZE } from "@/lib/og";
import { getGuide } from "@/lib/guides";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Orbit guide";

export default function Image({ params }: { params: { slug: string } }) {
  const g = getGuide(params.slug);
  return brandOg("Guides", g ? g.title : "The busywork, explained plainly.");
}

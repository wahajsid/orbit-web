import { brandOg, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Orbit integrations — your ledger stays the ledger";

export default function Image() {
  return brandOg("Integrations", "Your ledger stays the ledger.");
}

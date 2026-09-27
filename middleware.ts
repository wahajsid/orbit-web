import { NextResponse } from "next/server";

/* orbitgulf.com was an online shop before it was Orbit, and its product
   and collection URLs are still in search indexes. They have no twin on
   hysaab.ai, so rather than 301 them into a 404 they answer 410 Gone on
   every host, which tells crawlers to drop them. next.config.mjs keeps
   these prefixes out of the old-domain 301 so the 410 is what they see.
   Keep the matcher below in step with the exclusion there. */

export function middleware() {
  return new NextResponse("Gone. This page belonged to the online store formerly at orbitgulf.com and no longer exists.", {
    status: 410,
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}

/* Matchers must be static literals, so the prefixes are spelled out. */
export const config = {
  matcher: [
    "/collections/:path*",
    "/products/:path*",
    "/cart/:path*",
    "/checkouts/:path*",
    "/account/:path*",
    "/policies/:path*",
    "/pages/:path*",
    "/blogs/:path*",
  ],
};

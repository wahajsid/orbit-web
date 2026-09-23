/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The old brand's hosts and www.hysaab.ai all 308 to the apex, path
      // preserved, so every indexed orbitgulf.com URL lands on its twin.
      // One hop, 301: the Vercel domain-level apex→www redirect on orbitgulf.com
      // was removed so Google sees orbitgulf.com → hysaab.ai directly.
      ...["orbitgulf.com", "www.orbitgulf.com", "www.hysaab.ai"].map((host) => ({
        source: "/:path*",
        has: [{ type: "host", value: host }],
        destination: "https://hysaab.ai/:path*",
        statusCode: 301,      // Search Console's Change of Address validator wants a literal 301, not 308
      })),
      // The Arabic hire page is retired; the English one explains Ibtidah.
      { source: "/ar/hire", destination: "/hire", permanent: true },
      // Website change plan 2026-09-23: /product is merged into
      // /accounting (Hysaab Finance). A literal 301, like the host moves.
      { source: "/product", destination: "/accounting", statusCode: 301 },
      { source: "/ar/product", destination: "/ar/accounting", statusCode: 301 },
    ];
  },
};

export default nextConfig;

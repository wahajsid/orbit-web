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
      // Product URLs that changed name with the rebrand.
      { source: "/hire", destination: "https://ibtidah.ae", permanent: true },
      { source: "/ar/hire", destination: "https://ibtidah.ae", permanent: true },
    ];
  },
};

export default nextConfig;

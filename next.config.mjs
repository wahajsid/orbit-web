/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The old brand's hosts and www.hysaab.ai all 308 to the apex, path
      // preserved, so every indexed orbitgulf.com URL lands on its twin.
      // (Vercel also redirects www at the domain level; this is the belt.)
      ...["orbitgulf.com", "www.orbitgulf.com", "www.hysaab.ai"].map((host) => ({
        source: "/:path*",
        has: [{ type: "host", value: host }],
        destination: "https://hysaab.ai/:path*",
        permanent: true,
      })),
      // Product URLs that changed name with the rebrand.
      { source: "/hire", destination: "https://ibtidah.ae", permanent: true },
      { source: "/ar/hire", destination: "https://ibtidah.ae", permanent: true },
    ];
  },
};

export default nextConfig;

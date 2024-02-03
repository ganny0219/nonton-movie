/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // experimental: {
  //   serverActions: true,
  // },
  // output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  rewrites: async () => [
    {
      source: "/vtt/:slug(.+).vtt",
      destination: "/vtt/:slug",
    },
    {
      source: "/sitemap.xml",
      destination: "/sitemap",
    },
    {
      source: "/sitemap-:page.xml",
      destination: "/sitemap/:page",
    },
  ],
};

module.exports = nextConfig;

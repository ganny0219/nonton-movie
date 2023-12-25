// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
//   changefreq: "daily",
//   priority: 0.7,
//   sitemapSize: 5000,
//   generateRobotsTxt: true,
//   exclude: ["/pandora", "/pandora/*", "/api", "/api/*", "/_next", "/_next/*"],
//   robotsTxtOptions: {
//     policies: [
//       {
//         userAgent: "*",
//         allow: "/",
//       },
//       {
//         userAgent: "*",
//         disallow: [
//           "/pandora",
//           "/pandora/*",
//           "/api",
//           "/api/*",
//           "/_next",
//           "/_next/*",
//         ],
//       },
//     ],
//     additionalSitemaps: [
//       `${process.env.NEXT_PUBLIC_BASE_URL}/server-sitemap.xml`,
//     ],
//   },
// };

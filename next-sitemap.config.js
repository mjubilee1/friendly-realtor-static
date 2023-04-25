const siteUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

module.exports = {
  siteUrl,
  exclude: ["/404"],
  generateRobotsTxt: true,
	outDir: "./public",
	sourceDir: "./build",
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/404"],
      },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${siteUrl}sitemap.xml`,
      `${siteUrl}server-sitemap.xml`,
    ],
  },
};
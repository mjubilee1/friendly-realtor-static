const siteUrl = "https://friendlyrealtor.app/";

module.exports = {
  siteUrl,
  exclude: ["/404", "/server-sitemap.xml"],
  generateRobotsTxt: true,
	outDir: "./public",
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
	sitemapSize: 7000,
};

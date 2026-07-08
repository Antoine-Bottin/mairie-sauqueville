import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  const baseUrl = "https://www.sauqueville.fr";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
};

export default robots;

import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chirag640.github.io/desk-look-portfolio";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/"]
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: []
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  };
}

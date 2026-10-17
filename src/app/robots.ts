import type { MetadataRoute } from "next";
import { siteConfig, siteIndexable } from "@/config/site";

/** /robots.txt */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: siteIndexable ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}

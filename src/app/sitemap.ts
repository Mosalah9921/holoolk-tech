import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { projects } from "@/content/portfolio";
import { articles } from "@/content/blog";
import { lp } from "@/i18n";

/** خريطة الموقع لجوجل: /sitemap.xml — كل صفحة بنسختيها مع روابط hreflang */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (p: string) => `${siteConfig.url}${p === "/" ? "" : p}`;
  const page = (path: string, priority = 0.7, lastModified: Date = now): MetadataRoute.Sitemap => {
    const languages = { "ar-EG": abs(path), en: abs(lp("en", path)), "x-default": abs(path) };
    return [
      { url: abs(path), lastModified, changeFrequency: "monthly", priority, alternates: { languages } },
      { url: abs(lp("en", path)), lastModified, changeFrequency: "monthly", priority: Math.max(0.3, +(priority - 0.1).toFixed(1)), alternates: { languages } },
    ];
  };
  return [
    ...page("/", 1),
    ...page("/services", 0.9),
    ...services.flatMap((s) => page(`/services/${s.id}`, 0.8)),
    ...page("/solutions", 0.9),
    ...solutions.flatMap((s) => page(`/solutions/${s.id}`, 0.8)),
    ...page("/work", 0.8),
    ...projects.flatMap((p) => page(`/work/${p.slug}`, 0.7)),
    ...page("/pricing", 0.8),
    ...page("/start", 0.9),
    ...page("/book", 0.8),
    ...page("/blog", 0.8),
    ...articles.flatMap((a) => page(`/blog/${a.slug}`, 0.7, new Date(a.date))),
    ...page("/about"),
    ...page("/process"),
    ...page("/faq"),
    ...page("/international", 0.8),
    ...page("/contact", 0.8),
    ...page("/tools/preview"),
    ...page("/tools/audit"),
    ...page("/privacy", 0.3),
    ...page("/terms", 0.3),
  ];
}

import type { Metadata } from "next";
import { ogImage, siteConfig } from "@/config/site";
import { lp, type Locale } from "@/i18n";

/** صورة المشاركة لكل لغة (الإنجليزية تتولد من src/app/(en)/en/opengraph-image.tsx) */
export const ogImageFor = (locale: Locale) =>
  locale === "en"
    ? { url: "/en/opengraph-image", width: 1200, height: 630, type: "image/png", alt: "Holoolk Tech — Digital solutions that drive your business forward" }
    : ogImage;

/**
 * Metadata موحّدة لأي صفحة في اللغتين:
 * canonical + روابط hreflang للنسخة الأخرى + Open Graph + Twitter.
 * path: المسار العربي (بدون /en)، مثال "/services".
 */
export function pageMeta(
  locale: Locale,
  {
    title,
    description,
    path,
    absoluteTitle = false,
    type = "website",
    publishedTime,
    noindex = false,
  }: {
    title: string;
    description: string;
    path: string;
    absoluteTitle?: boolean;
    type?: "website" | "article";
    publishedTime?: string;
    noindex?: boolean;
  },
): Metadata {
  const url = lp(locale, path);
  const brand = locale === "en" ? siteConfig.nameEn : siteConfig.name;
  const fullTitle = absoluteTitle ? title : `${title} | ${brand}`;
  const image = ogImageFor(locale);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: { "ar-EG": path, en: lp("en", path), "x-default": path },
    },
    openGraph: {
      type,
      locale: locale === "en" ? "en_US" : "ar_EG",
      alternateLocale: locale === "en" ? ["ar_EG"] : ["en_US"],
      siteName: brand,
      url,
      title: fullTitle,
      description,
      images: [image],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

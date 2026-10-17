/**
 * الترجمة — الموقع بلغتين:
 *   العربية (الأساسية) بدون بادئة:  /services
 *   الإنجليزية تحت /en:             /en/services
 *
 * الاستخدام داخل أي مكوّن:
 *   const t = tr(locale);
 *   t("خدماتنا", "Our services")
 *   href={lp(locale, "/services")}
 */
export type Locale = "ar" | "en";

export const locales: Locale[] = ["ar", "en"];

/** اختيار النص حسب اللغة */
export function tr(locale: Locale) {
  return <T,>(ar: T, en: T): T => (locale === "en" ? en : ar);
}

/** مسارات تبقى كما هي في اللغتين (المواقع النموذجية عربية فقط) */
const shared = ["/demos"];

/** تحويل رابط داخلي للغة المطلوبة: "/services" → "/en/services" */
export function lp(locale: Locale, href: string): string {
  if (locale === "ar" || !href.startsWith("/") || href.startsWith("//")) return href;
  if (shared.some((p) => href === p || href.startsWith(p + "/"))) return href;
  if (href === "/" || href === "") return "/en";
  if (href.startsWith("/#")) return "/en" + href.slice(1);
  if (href === "/en" || href.startsWith("/en/") || href.startsWith("/en#")) return href;
  return "/en" + href;
}

/** المسار المقابل في اللغة الأخرى (لزر تبديل اللغة) */
export function switchLocalePath(pathname: string): { locale: Locale; href: string } {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname.slice(3) || "/";
    return { locale: "ar", href: rest };
  }
  return { locale: "en", href: lp("en", pathname) };
}

/** لغة المسار الحالي */
export function localeOfPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ar";
}

export const dirOf = (locale: Locale) => (locale === "en" ? "ltr" : "rtl");

/** تنسيق التاريخ (أرقام لاتينية في اللغتين) */
export function formatDate(locale: Locale, d: string) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "ar-EG-u-nu-latn", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(d));
}

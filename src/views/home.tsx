import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { CtaBand } from "@/components/home/CtaBand";
import { FinderBand } from "@/components/home/FinderBand";
import { pageMeta } from "@/i18n/meta";
import { seoFor } from "@/content/seo";
import type { Locale } from "@/i18n";

/** الصفحة الرئيسية — مختصرة عن قصد: كل قسم يقود لصفحته التفصيلية. */
export function homeMeta(locale: Locale) {
  return pageMeta(locale, {
    path: "/",
    absoluteTitle: true,
    ...seoFor("home", locale),
  });
}

export default function HomeView({ locale }: { locale: Locale }) {
  return (
    <>
      <JsonLd locale={locale} />
      <Hero locale={locale} />
      <ServicesGrid locale={locale} />
      <IndustriesGrid locale={locale} />
      <FinderBand locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}

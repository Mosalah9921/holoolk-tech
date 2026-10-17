import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { CtaBand } from "@/components/home/CtaBand";
import { FinderBand } from "@/components/home/FinderBand";
import { pageMeta } from "@/i18n/meta";
import { tr, type Locale } from "@/i18n";

/** الصفحة الرئيسية — مختصرة عن قصد: كل قسم يقود لصفحته التفصيلية. */
export function homeMeta(locale: Locale) {
  const t = tr(locale);
  return pageMeta(locale, {
    path: "/",
    absoluteTitle: true,
    title: t("حلولك تيك | شريكك التقني للتحول الرقمي وتطوير الأنظمة", "Holoolk Tech | Websites, Online Stores & Web Apps"),
    description: t(
      "نبتكر حلولاً رقمية تقود نمو أعمالك، من المتاجر الإلكترونية إلى الأنظمة السحابية المخصصة.",
      "We build fast, secure websites, online stores and custom web systems that help businesses in Egypt and the Gulf grow.",
    ),
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

import { siteConfig } from "@/config/site";
import { getFaq } from "@/content/faq";
import { getServices } from "@/content/services";
import { lp, type Locale } from "@/i18n";

/**
 * بيانات منظمة (Schema.org) — بتعرّف جوجل بنشاطك وبتخلّي الأسئلة الشائعة
 * تقدر تظهر تحت نتيجة البحث.
 */
export function JsonLd({ locale = "ar" }: { locale?: Locale }) {
  const en = locale === "en";
  const home = `${siteConfig.url}${en ? "/en" : ""}`;
  const sameAs = Object.values(siteConfig.socials).filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#business`,
        name: en ? siteConfig.nameEn : siteConfig.name,
        alternateName: en ? siteConfig.name : siteConfig.nameEn,
        description: en ? siteConfig.descriptionEn : siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/brand/mark-en.png`,
        image: `${siteConfig.url}${en ? "/og-en.png" : "/opengraph-image.png"}`,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phoneDisplay.replace(/\s/g, ""),
        address: { "@type": "PostalAddress", addressLocality: en ? "Cairo" : "القاهرة", addressCountry: "EG" },
        areaServed: ["EG", "SA", "AE", "KW", "QA"],
        knowsAbout: en
          ? ["Web design", "Website development", "E-commerce development", "Landing pages", "Web applications", "Dashboards", "UI/UX design", "SEO", "Next.js"]
          : ["تصميم مواقع", "برمجة مواقع", "تصميم متاجر إلكترونية", "صفحات هبوط", "لوحات تحكم", "أنظمة ويب", "تصميم UI/UX", "تحسين محركات البحث SEO"],
        sameAs,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: en ? "Web development services" : "خدمات تطوير المواقع",
          itemListElement: getServices(locale).map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.description, url: `${siteConfig.url}${lp(locale, `/services/${s.id}`)}` },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${home}/#website`,
        url: home,
        name: en ? siteConfig.nameEn : siteConfig.name,
        inLanguage: en ? "en" : "ar",
        publisher: { "@id": `${siteConfig.url}/#business` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** بيانات الأسئلة الشائعة لجوجل (في صفحة /faq) */
export function FaqJsonLd({ locale = "ar" }: { locale?: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getFaq(locale).map((q) => ({ "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: q.answer } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

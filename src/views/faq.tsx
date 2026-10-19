import { CircleHelp, MessageCircle, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { HeroVisual, heroImages } from "@/components/hero/HeroVisual";
import { getFaq } from "@/content/faq";
import { Section } from "@/components/ui/Section";
import { FaqExplorer } from "@/components/faq/FaqExplorer";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/home/CtaBand";
import { pageMeta } from "@/i18n/meta";
import { tr, type Locale } from "@/i18n";

export function faqMeta(locale: Locale) {
  const t = tr(locale);
  return pageMeta(locale, {
    path: "/faq",
    title: t("الأسئلة الشائعة", "Frequently asked questions"),
    description: t(
      "إجابات واضحة عن مدة التنفيذ، والملكية، والدعم، والظهور في محركات البحث.",
      "Clear answers about timelines, ownership, support and search engine visibility.",
    ),
  });
}

export default function FaqView({ locale }: { locale: Locale }) {
  const t = tr(locale);
  const count = getFaq(locale).length;
  return (
    <>
      <FaqJsonLd locale={locale} />
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("الأسئلة الشائعة", "FAQ") }]}
        title={t("كل ما تريد معرفته قبل أن نبدأ.", "Everything you need to know before we start.")}
        description={t("ابحث عن سؤالك أو تصفّح الأسئلة حسب الموضوع.", "Search for your question or browse by topic.")}
        aside={
          <HeroVisual
            image={heroImages.faq}
            cards={[
              { icon: CircleHelp, title: t(`${count} سؤالاً وإجابة`, `${count} questions answered`), text: t("قبل أن تبدأ مشروعك", "Before you start your project") },
              { icon: Search, title: t("بحث فوري", "Instant search"), text: t("اكتب سؤالك وستجده", "Type it and find it") },
              { icon: MessageCircle, title: t("سؤالك مختلف؟", "Something else?"), text: t("اسألنا على واتساب", "Ask us on WhatsApp") },
            ]}
          />
        }
      />
      <Section id="faq" className="pt-0 sm:pt-0 lg:pt-0">
        <h2 className="sr-only">{t("الأسئلة الشائعة", "Frequently asked questions")}</h2>
        <FaqExplorer locale={locale} />
      </Section>
      <CtaBand locale={locale} />
    </>
  );
}

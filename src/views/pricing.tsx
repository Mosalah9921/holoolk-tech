import { BadgeCheck, Layers, Plus, Wallet } from "lucide-react";
import { getPricingFaq } from "@/content/faq";
import { getPackages, getPaymentStages } from "@/content/pricing";
import { PageHeader } from "@/components/ui/PageHeader";
import { HeroVisual, heroImages } from "@/components/hero/HeroVisual";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Pricing } from "@/components/sections/Pricing";
import { Comparison } from "@/components/pricing/Comparison";
import { PaymentTerms } from "@/components/pricing/PaymentTerms";
import { CtaBand } from "@/components/home/CtaBand";
import { pageMeta } from "@/i18n/meta";
import { lp, tr, type Locale } from "@/i18n";

export function pricingMeta(locale: Locale) {
  const t = tr(locale);
  return pageMeta(locale, {
    path: "/pricing",
    title: t("الباقات", "Pricing"),
    description: t(
      "باقات مرنة لمواقع الشركات وصفحات الهبوط والمتاجر الإلكترونية، مع مقارنة تفصيلية للمزايا.",
      "Flexible packages for company websites, landing pages and online stores, with a detailed feature comparison.",
    ),
  });
}

export default function PricingView({ locale }: { locale: Locale }) {
  const t = tr(locale);
  const packages = getPackages(locale);
  const stages = getPaymentStages(locale).map((s) => `${s.percent}%`).join(" · ");
  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("الباقات", "Pricing") }]}
        title={t("باقات مرنة تواكب مراحل نمو أعمالك.", "Flexible packages for every stage of your growth.")}
        description={t(
          "كل باقة نقطة انطلاق، وبعد التشاور معك نُعدّ عرضاً مفصّلاً يتوافق مع متطلبات مشروعك بدقة.",
          "Each package is a starting point. After we talk, we prepare a detailed proposal tailored precisely to your project.",
        )}
        aside={
          <HeroVisual
            image={heroImages.pricing}
            cards={[
              { icon: Layers, title: t(`${packages.length} باقات`, `${packages.length} packages`), text: t("تناسب كل مرحلة نمو", "For every stage of growth") },
              { icon: Wallet, title: t("الدفع على 3 مراحل", "Pay in 3 milestones"), text: `⁦${stages}⁩` },
              { icon: BadgeCheck, title: t("عرض مخصص", "Tailored proposal"), text: t("بعد مناقشة متطلباتك", "After we discuss your needs") },
            ]}
          />
        }
      >
        <ButtonLink href={lp(locale, "/start")} size="lg">
          {t("احصل على عرض مخصص", "Get a tailored quote")}
        </ButtonLink>
        <ButtonLink href="#compare" variant="secondary" size="lg">
          {t("قارن المزايا", "Compare features")}
        </ButtonLink>
      </PageHeader>

      <Pricing withHeading={false} locale={locale} />

      <Section id="compare" className="bg-white">
        <SectionHeading
          title={t("مقارنة تفصيلية بين الباقات", "Detailed package comparison")}
          description={t("كل المزايا جنباً إلى جنب لتختار عن وضوح.", "Every feature side by side, so you can choose with clarity.")}
        />
        <Comparison locale={locale} />
        <PaymentTerms locale={locale} />
      </Section>

      <Section id="pricing-faq">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            title={t("أسئلة حول الباقات", "Questions about pricing")}
            description={t("لمزيد من الأسئلة، تصفّح صفحة الأسئلة الشائعة.", "For more answers, browse the full FAQ page.")}
            className="mb-0"
          >
            <ButtonLink href={lp(locale, "/faq")} variant="secondary">
              {t("كل الأسئلة", "All questions")}
            </ButtonLink>
          </SectionHeading>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {getPricingFaq(locale).map((item) => (
              <details key={item.question} className="group">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-start font-bold text-slate-900">
                  {item.question}
                  <Plus className="size-5 shrink-0 text-brand-600 transition-transform group-open:rotate-45" aria-hidden />
                </summary>
                <p className="-mt-1 pb-5 leading-8 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}

import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { SolutionFinderButton } from "@/components/finder/SolutionFinderButton";
import { ServicesHeroArt } from "@/components/services/ServicesHeroArt";
import { ServiceCards } from "@/components/services/ServiceCards";
import { Process } from "@/components/sections/Process";
import { CtaBand } from "@/components/home/CtaBand";
import { pageMeta } from "@/i18n/meta";
import { lp, tr, type Locale } from "@/i18n";

export function servicesMeta(locale: Locale) {
  const t = tr(locale);
  return pageMeta(locale, {
    path: "/services",
    title: t("خدماتنا", "Services"),
    description: t(
      "من الفكرة حتى النمو: مواقع الشركات، والمتاجر الإلكترونية، وتصميم الواجهات، وصفحات الهبوط، والأنظمة السحابية، والدعم المستمر.",
      "From idea to growth: company websites, online stores, UI/UX design, landing pages, cloud-based web systems and ongoing support.",
    ),
  });
}

export default function ServicesView({ locale }: { locale: Locale }) {
  const t = tr(locale);
  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("خدماتنا", "Services") }]}
        title={t("من فكرة على الورق، إلى منصة رقمية تنمو معك.", "From an idea on paper to a digital platform that grows with you.")}
        description={t(
          "نصمم ونطوّر ونطلق حلول ويب متكاملة، ثم نبقى بجانبك لتنمو. اختر خدمتك، أو دع المستشار الذكي يقترح عليك الأنسب في أقل من دقيقة.",
          "We design, build and launch complete web solutions, then stay by your side as you grow. Pick a service, or let our smart advisor suggest the best fit in under a minute.",
        )}
        aside={
          <div className="mt-2 lg:mt-0">
            <ServicesHeroArt locale={locale} />
          </div>
        }
      >
        <SolutionFinderButton locale={locale} />
        <ButtonLink href={lp(locale, "/start")} variant="secondary" size="lg">
          {t("ابدأ مشروعك الآن", "Start your project")}
          <ArrowLeft className="size-5" aria-hidden />
        </ButtonLink>
      </PageHeader>
      <ServiceCards locale={locale} />
      <Process className="" locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}

import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { SolutionFinderButton } from "@/components/finder/SolutionFinderButton";
import { ServicesHeroArt } from "@/components/services/ServicesHeroArt";
import { ServiceCards } from "@/components/services/ServiceCards";
import { Container } from "@/components/ui/Container";
import { Workflow } from "lucide-react";
import Link from "next/link";
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
      {/* مراحل العمل بالتفصيل في صفحة «منهجية العمل» — هنا رابط مختصر بدل تكرارها */}
      <section aria-labelledby="process-link-title" className="pb-4 sm:pb-6">
        <Container>
          <div className="flex flex-col items-start gap-5 rounded-3xl border border-brand-100 bg-brand-50/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-600 ring-1 ring-brand-100">
                <Workflow className="size-6" aria-hidden />
              </span>
              <div>
                <h2 id="process-link-title" className="text-lg leading-8 font-black text-slate-900 sm:text-xl">
                  {t("كيف ننفّذ مشروعك؟", "How do we deliver your project?")}
                </h2>
                <p className="mt-1 text-sm leading-7 text-slate-600">
                  {t("خمس مراحل واضحة من تحديد المتطلبات حتى الإطلاق والدعم، بمخرجات محددة في كل مرحلة.", "Five clear stages from requirements to launch and support, with defined deliverables at every step.")}
                </p>
              </div>
            </div>
            <Link href={lp(locale, "/process")} className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-brand-700 hover:border-brand-300 hover:bg-brand-50 sm:w-auto">
              {t("تعرّف على منهجية العمل", "See our process")}
              <ArrowLeft className="size-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}

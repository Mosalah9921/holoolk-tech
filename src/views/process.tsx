import { BadgeCheck, CheckCircle2, Rocket, Route } from "lucide-react";
import { getSteps } from "@/content/process";
import { PageHeader } from "@/components/ui/PageHeader";
import { HeroVisual, heroImages } from "@/components/hero/HeroVisual";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";
import { RemoteWork } from "@/components/remote/RemoteWork";
import { pageMeta } from "@/i18n/meta";
import { lp, tr, type Locale } from "@/i18n";

export function processMeta(locale: Locale) {
  const t = tr(locale);
  return pageMeta(locale, {
    path: "/process",
    title: t("منهجية العمل", "Our process"),
    description: t(
      "خمس مراحل واضحة من الاستماع إلى متطلباتك حتى الإطلاق والدعم، مع مخرجات محددة لكل مرحلة.",
      "Five clear stages, from understanding your requirements to launch and support, with defined deliverables at every step.",
    ),
  });
}

export default function ProcessView({ locale }: { locale: Locale }) {
  const t = tr(locale);
  const steps = getSteps(locale);
  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("منهجية العمل", "Our process") }]}
        title={t("منهجية واضحة من الفكرة إلى الإطلاق.", "A clear process from idea to launch.")}
        description={t(
          "نُطلعك على سير العمل في كل مرحلة، ولكل مرحلة مخرجات محددة تستلمها، ولا ننتقل إلى خطوة جديدة قبل اعتمادك.",
          "You’ll see progress at every stage, each stage has defined deliverables you receive, and we never move on without your approval.",
        )}
        aside={
          <HeroVisual
            image={heroImages.process}
            cards={[
              { icon: Route, title: t(`${steps.length} مراحل واضحة`, `${steps.length} clear stages`), text: t("لكل مرحلة مخرجات محددة", "Defined deliverables for each") },
              { icon: BadgeCheck, title: t("اعتمادك أولاً", "Your approval first"), text: t("لا ننتقل قبل موافقتك", "Nothing moves without your OK") },
              { icon: Rocket, title: t("إطلاق ومتابعة", "Launch & follow-up"), text: t("دعم بعد التسليم", "Support after delivery") },
            ]}
          />
        }
      >
        <ButtonLink href={lp(locale, "/start")} size="lg">
          {t("ابدأ المرحلة الأولى", "Start stage one")}
        </ButtonLink>
      </PageHeader>

      <Section id="timeline" className="bg-white">
        <ol className="relative mx-auto max-w-4xl">
          <span aria-hidden className="absolute inset-y-4 start-7 w-px bg-linear-to-b from-brand-300 via-accent-300 to-transparent sm:start-9" />
          {steps.map(({ icon: Icon, title, description, duration, deliverables }, i) => (
            <li key={title} className="relative flex gap-6 pb-12 last:pb-0 sm:gap-8">
              <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25 sm:size-18">
                <Icon className="size-6 sm:size-7" aria-hidden />
              </span>
              <div className="flex-1 rounded-[1.75rem] border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-black sm:text-2xl">
                    <span className="me-2 text-brand-600 tabular-nums">{i + 1}.</span>
                    {title}
                  </h2>
                  <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-bold text-accent-700">{duration}</span>
                </div>
                <p className="mt-3 leading-8 text-slate-600">{description}</p>
                <div className="mt-5 border-t border-slate-200 pt-5">
                  <p className="text-sm font-bold text-slate-900">{t("ما تستلمه في هذه المرحلة", "What you receive at this stage")}</p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="size-4 shrink-0 text-brand-600" aria-hidden />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <RemoteWork locale={locale} className="" />

      <CtaBand locale={locale} />
    </>
  );
}

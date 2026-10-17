import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpLeft, CalendarClock, CheckCircle2, CircleAlert, PlayCircle } from "lucide-react";
import { getSolutions } from "@/content/solutions";
import { getServices } from "@/content/services";
import { getPackages } from "@/content/pricing";
import { getProjects } from "@/content/portfolio";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";
import { pageMeta } from "@/i18n/meta";
import { lp, tr, type Locale } from "@/i18n";

export const solutionParams = () => getSolutions("ar").map((s) => ({ id: s.id }));

export function solutionMeta(locale: Locale, id: string) {
  const s = getSolutions(locale).find((x) => x.id === id);
  if (!s) return {};
  return pageMeta(locale, {
    path: `/solutions/${s.id}`,
    title: locale === "en" ? `Solutions for ${s.name}` : `حلول ${s.name}`,
    description: s.intro,
  });
}

export default function SolutionView({ locale, id }: { locale: Locale; id: string }) {
  const t = tr(locale);
  const solutions = getSolutions(locale);
  const solution = solutions.find((x) => x.id === id);
  if (!solution) notFound();

  const related = getServices(locale).filter((s) => solution.services.includes(s.id));
  const pkg = getPackages(locale).find((p) => p.id === solution.packageId);
  const others = solutions.filter((s) => s.id !== solution.id);
  /** دراسة الحالة المرتبطة بالمجال (عن طريق رابط النموذج الحي) */
  const caseStudy = solution.demo ? getProjects(locale).find((p) => p.href === solution.demo!.href) : undefined;

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("الحلول", "Solutions"), href: "/solutions" }, { label: solution.name }]}
        title={solution.headline}
        description={solution.intro}
        aside={
          <div aria-hidden className="relative mx-auto mt-2 w-full max-w-[280px] sm:max-w-[380px] lg:mt-0 lg:max-w-[440px]">
            <div className="absolute inset-[-10%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(85_131_186/0.35),rgb(163_191_224/0.15)_60%,transparent)]" />
            <div className="absolute inset-x-[14%] bottom-[2%] -z-10 h-[12%] rounded-[50%] bg-brand-800/15 blur-xl" />
            <Image
              src={solution.image}
              alt=""
              width={640}
              height={640}
              priority
              sizes="(min-width: 1024px) 440px, (min-width: 640px) 380px, 280px"
              className="w-full drop-shadow-[0_24px_30px_rgb(16_39_74/0.22)] motion-safe:animate-[drift_7s_ease-in-out_infinite]"
            />
            <span className="absolute inset-x-0 -bottom-3 mx-auto flex w-max max-w-[95%] items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-center text-xs leading-5 font-bold text-brand-800 shadow-lg ring-1 ring-slate-200 backdrop-blur sm:text-sm">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
              {solution.outcome}
            </span>
          </div>
        }
      >
        <ButtonLink href={lp(locale, "/start")} size="lg">
          {t("ابدأ مشروعك", "Start your project")}
        </ButtonLink>
        {solution.demo && (
          <ButtonLink href={solution.demo.href} target="_blank" rel="noopener" variant="secondary" size="lg">
            <PlayCircle className="size-5" aria-hidden />
            {t(`جرّب نموذج ${solution.demo.label}`, `Try the ${solution.demo.label} demo`)}
          </ButtonLink>
        )}
      </PageHeader>

      {/* قبل ← بعد */}
      <Section id="pains" aria-labelledby="pains-title" className="bg-white">
        <SectionHeading
          id="pains-title"
          align="center"
          title={t("من التحدي إلى الحل", "From challenge to solution")}
          description={t(
            `أبرز ما يواجهه أصحاب ${solution.name}، وكيف يعالجه النظام الذي نبنيه لك.`,
            `The most common challenges in ${solution.name}, and how the system we build for you solves each one.`,
          )}
        />
        <div className="mx-auto mb-4 hidden max-w-5xl grid-cols-[1fr_auto_1fr] gap-4 px-1 text-sm font-black md:grid">
          <span className="text-rose-700">{t("قبل", "Before")}</span>
          <span className="w-10" />
          <span className="text-emerald-700">{t("بعد", "After")}</span>
        </div>
        <ol className="mx-auto grid max-w-5xl gap-4">
          {solution.pains.map((p, i) => (
            <li key={p} className="grid items-stretch gap-2 md:grid-cols-[1fr_auto_1fr] md:gap-4">
              <div className="flex items-start gap-3 rounded-2xl border border-rose-100 bg-rose-50/60 p-5">
                <CircleAlert className="mt-0.5 size-5 shrink-0 text-rose-500" aria-hidden />
                <span className="leading-7 font-semibold text-slate-700">
                  <span className="me-1 text-xs font-black text-rose-700 md:hidden">{t("قبل:", "Before:")}</span>
                  {p}
                </span>
              </div>
              <span aria-hidden className="flex items-center justify-center">
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-600 text-white shadow-md shadow-brand-600/25">
                  <ArrowLeft className="size-5 rotate-[-90deg] ltr:rotate-90 md:rotate-0 md:ltr:rotate-0" />
                </span>
              </span>
              <div className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden />
                <span className="leading-7 font-semibold text-slate-800">
                  <span className="me-1 text-xs font-black text-emerald-700 md:hidden">{t("بعد:", "After:")}</span>
                  {solution.fixes[i]}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="features">
        <SectionHeading title={t("ما الذي نبنيه لك", "What we build for you")} description={t("مزايا مختارة بعناية لتخدم طبيعة نشاطك.", "Carefully chosen features that fit the way your business works.")} />
        <ul className="grid gap-px overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {solution.features.map((f, i) => (
            <li key={f.title} className="bg-white p-7">
              <span className="text-sm font-black text-accent-600 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{f.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="systems" aria-labelledby="systems-title" className="pt-0 sm:pt-0">
        <div className="overflow-hidden rounded-[2rem] bg-brand-800 p-8 text-white sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p dir="ltr" className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-wide text-accent-200 ring-1 ring-white/15">
                {solution.system}
              </p>
              <h2 id="systems-title" className="mt-5 text-3xl font-black text-white sm:text-4xl">
                {t("ما نبنيه تقنياً.", "Under the hood.")}
              </h2>
              <p className="mt-4 leading-8 text-white/75">
                {t("الأنظمة والتكاملات التي نطوّرها لهذا المجال، بحسب حجم نشاطك ومرحلته.", "The systems and integrations we build for this industry, scaled to the size and stage of your business.")}
              </p>
              {caseStudy && (
                <Link href={lp(locale, `/work/${caseStudy.slug}`)} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-brand-800 hover:bg-brand-50">
                  {t(`شاهد دراسة حالة ${caseStudy.title}`, `See the ${caseStudy.title} case study`)}
                  <ArrowLeft className="size-4" aria-hidden />
                </Link>
              )}
            </div>
            <ol className="grid gap-3">
              {solution.systems.map((x, i) => (
                <li key={x} className="flex items-start gap-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sm font-black text-accent-200 tabular-nums">{i + 1}</span>
                  <span className="pt-1 leading-7 text-white/90">{x}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section id="related" className="bg-white">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[1.75rem] border border-slate-200 p-7 sm:p-8">
            <h2 className="text-xl font-black">{t("الخدمات المرتبطة", "Related services")}</h2>
            <ul className="mt-5 grid gap-3">
              {related.map(({ id: sid, icon: SIcon, title, description }) => (
                <li key={sid}>
                  <Link href={lp(locale, `/services/${sid}`)} className="group flex items-center gap-4 rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-brand-50">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-slate-200">
                      <SIcon className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold text-slate-900">{title}</span>
                      <span className="line-clamp-1 block text-sm text-slate-500">{description}</span>
                    </span>
                    <ArrowUpLeft className="size-5 shrink-0 text-slate-300 group-hover:text-brand-600" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col rounded-[1.75rem] bg-brand-600 p-7 text-white sm:p-8">
            <p className="text-sm font-semibold text-brand-100">{pkg ? t("الباقة المقترحة", "Recommended package") : t("حل مخصص", "Custom solution")}</p>
            <h2 className="mt-2 text-2xl font-black text-white">{pkg ? pkg.name : t("نظام مصمم وفق احتياجك", "A system designed around your needs")}</h2>
            <p className="mt-3 flex-1 leading-7 text-brand-100">
              {pkg ? pkg.description : t("نحلل متطلباتك ونقترح نطاقاً وجدولاً زمنياً يناسبان حجم مشروعك.", "We analyze your requirements and propose a scope and timeline that fit the size of your project.")}
            </p>
            {pkg && (
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold">
                <CalendarClock className="size-4 text-silver-200" aria-hidden />
                {t("مدة التنفيذ:", "Delivery time:")} {pkg.timeline}
              </p>
            )}
            <Link href={lp(locale, pkg ? "/pricing" : "/start")} className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white font-bold text-brand-700 hover:bg-brand-50">
              {pkg ? t("تفاصيل الباقات", "See packages") : t("ابدأ مشروعك", "Start your project")}
              <ArrowLeft className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Section>

      <Section id="other-solutions">
        <SectionHeading title={t("مجالات أخرى نخدمها", "Other industries we serve")} />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.map(({ id: oid, image: oimage, name }) => (
            <li key={oid}>
              <Link
                href={lp(locale, `/solutions/${oid}`)}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 font-bold text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-b from-brand-50 to-slate-50">
                  <Image src={oimage} alt="" width={640} height={640} sizes="48px" className="size-11 object-contain" />
                </span>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}

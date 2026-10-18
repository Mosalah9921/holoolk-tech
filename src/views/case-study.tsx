import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpLeft, Check, Hammer } from "lucide-react";
import { getProjects } from "@/content/portfolio";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CoverPreview } from "@/components/portfolio/ProjectArt";
import Image from "next/image";
import { CtaBand } from "@/components/home/CtaBand";
import { pageMeta } from "@/i18n/meta";
import { lp, tr, type Locale } from "@/i18n";

export const caseStudyParams = () => getProjects("ar").map((p) => ({ slug: p.slug }));

const statusLabel = {
  ar: { live: "منشور", building: "قيد التطوير", demo: "موقع نموذجي", slot: "" },
  en: { live: "Live", building: "In development", demo: "Sample website", slot: "" },
} as const;

export function caseStudyMeta(locale: Locale, slug: string) {
  const t = tr(locale);
  const p = getProjects(locale).find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta(locale, {
    path: `/work/${p.slug}`,
    title: `${p.title} — ${p.status === "demo" ? t("موقع نموذجي", "Sample website") : t("دراسة حالة", "Case study")}`,
    description: `${p.caseStudy.headline} ${p.description}`,
  });
}

export default function CaseStudyView({ locale, slug }: { locale: Locale; slug: string }) {
  const t = tr(locale);
  const projects = getProjects(locale);
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const c = p.caseStudy;
  const others = projects.filter((x) => x.slug !== p.slug);
  const internal = p.href?.startsWith("/");

  return (
    <>
      <PageHeader locale={locale} crumbs={[{ label: t("أعمالنا", "Our work"), href: "/work" }, { label: p.title }]} title={c.headline} description={p.description}>
        {p.href ? (
          <ButtonLink href={p.href} target={internal ? undefined : "_blank"} rel={internal ? undefined : "noopener noreferrer"} size="lg">
            {p.status === "demo" ? t("جرّب الموقع بنفسك", "Try the website yourself") : t("زيارة المشروع", "Visit the project")}
            <ArrowUpLeft className="size-5" aria-hidden />
          </ButtonLink>
        ) : (
          <ButtonLink href={lp(locale, "/book")} size="lg">
            {t("اطلب عرضاً تجريبياً للنظام", "Request a system demo")}
            <ArrowLeft className="size-5" aria-hidden />
          </ButtonLink>
        )}
        <ButtonLink href={lp(locale, "/start")} variant="secondary" size="lg">
          {t("ابدأ مشروعاً مشابهاً", "Start a similar project")}
        </ButtonLink>
      </PageHeader>

      <Section id="facts" className="pt-0 pb-10 sm:pt-0 sm:pb-12 lg:pt-0 lg:pb-12">
        <dl className="grid gap-px overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-5">
            <dt className="text-xs font-bold text-slate-500">{t("المشروع", "Project")}</dt>
            <dd className="mt-1 font-bold text-slate-900">{p.title}</dd>
          </div>
          <div className="bg-white p-5">
            <dt className="text-xs font-bold text-slate-500">{t("المجال", "Industry")}</dt>
            <dd className="mt-1 font-bold text-slate-900">{c.sector}</dd>
          </div>
          <div className="bg-white p-5">
            <dt className="text-xs font-bold text-slate-500">{t("ما قدّمناه", "What we delivered")}</dt>
            <dd className="mt-1 font-bold text-slate-900">{c.scope.join(t("، ", ", "))}</dd>
          </div>
          <div className="bg-white p-5">
            <dt className="text-xs font-bold text-slate-500">{t("الحالة", "Status")}</dt>
            <dd className="mt-1 flex items-center gap-1.5 font-bold text-slate-900">
              {p.status === "building" && <Hammer className="size-4 text-amber-600" aria-hidden />}
              {statusLabel[locale][p.status]}
            </dd>
          </div>
        </dl>
      </Section>

      <Section id="preview" className="bg-white py-12 sm:py-14 lg:py-16">
        {p.image && p.href ? (
          <a
            href={p.href}
            target="_blank"
            rel="noopener"
            className="group mx-auto block max-w-5xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3" dir="ltr">
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#FF5F57]" />
                <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="size-2.5 rounded-full bg-[#28C840]" />
              </span>
              <span className="mx-auto truncate rounded-md bg-white px-3 py-1 text-xs text-slate-500 ring-1 ring-slate-200">
                {new URL(siteConfig.url).host}
                {p.href}
              </span>
            </div>
            <div className="relative aspect-video">
              <Image src={p.image} alt={t(`لقطة من موقع ${p.title}`, `Screenshot of the ${p.title} website`)} fill sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover object-top" />
              <span className="absolute inset-0 flex items-center justify-center bg-slate-900/0 opacity-0 transition-all duration-300 group-hover:bg-slate-900/30 group-hover:opacity-100">
                <span className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-900 shadow-lg">{t("افتح الموقع وجرّبه", "Open and try the website")}</span>
              </span>
            </div>
          </a>
        ) : p.cover ? (
          <div className="group relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-[1.75rem] border border-slate-200">
            <CoverPreview cover={p.cover} />
          </div>
        ) : null}
      </Section>

      <Section id="story" aria-labelledby="story-title">
        <h2 id="story-title" className="sr-only">
          {t("التحدي والحل", "Challenge and solution")}
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-7 sm:p-9">
            <p className="text-sm font-black text-rose-600">01 — {t("التحدي", "The challenge")}</p>
            <p className="mt-4 text-lg leading-9 text-slate-700">{c.challenge}</p>
          </article>
          <article className="rounded-[1.75rem] border border-brand-100 bg-brand-50/60 p-7 sm:p-9">
            <p className="text-sm font-black text-brand-600">02 — {t("الحل", "The solution")}</p>
            <p className="mt-4 text-lg leading-9 text-slate-700">{c.solution}</p>
          </article>
        </div>
      </Section>

      <Section id="features" className="bg-white" aria-labelledby="features-title">
        <h2 id="features-title" className="text-3xl font-black sm:text-4xl">
          {t("ما الذي بنيناه.", "What we built.")}
        </h2>
        <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {c.features.map((f, i) => (
            <li key={f.title} className="border-t border-slate-200 py-7">
              <span className="text-sm font-black text-brand-600 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{f.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {c.architecture && (
        <Section id="architecture" aria-labelledby="architecture-title">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-brand-600">{t("المعمارية التقنية المعتمدة في التصميم", "The technical architecture behind the design")}</p>
            <h2 id="architecture-title" className="mt-2 text-3xl font-black sm:text-4xl">
              {t("كيف صُمّم النظام من الداخل.", "How the system works inside.")}
            </h2>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <ol className="relative grid gap-3" aria-label={t("طبقات النظام", "System layers")}>
              {c.architecture.layers.map((l, i) => (
                <li key={l.name} className="relative">
                  <div className={`rounded-2xl border p-5 ${i === 1 ? "border-brand-200 bg-brand-50/70" : "border-slate-200 bg-white"}`}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-black text-slate-900">{l.name}</p>
                      <p className="text-xs font-semibold text-slate-500">{l.role}</p>
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {l.items.map((it) => (
                        <li key={it} className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {i < c.architecture!.layers.length - 1 && <span aria-hidden className="mx-auto -my-1 flex h-5 w-px bg-slate-300" />}
                </li>
              ))}
            </ol>
            <ul className="grid content-start gap-x-8 sm:grid-cols-2 lg:grid-cols-1">
              {c.architecture.decisions.map((d) => (
                <li key={d.title} className="border-t border-slate-200 py-5">
                  <h3 className="font-bold">{d.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-slate-600">{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <Section id="proves">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[1.75rem] bg-brand-800 p-8 text-white sm:p-10">
            <h2 className="text-2xl font-black text-white sm:text-3xl">{t("ماذا يعني هذا لمشروعك؟", "What this means for your project")}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {c.proves.map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-white/90">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 sm:p-10">
            <h2 className="text-lg font-bold">{t("التقنيات المستخدمة", "Technologies used")}</h2>
            <ul className="mt-5 flex flex-wrap gap-2" dir="ltr">
              {c.stack.map((s) => (
                <li key={s} className="rounded-lg bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                  {s}
                </li>
              ))}
            </ul>
            {p.status === "demo" && (
              <p className="mt-6 text-sm leading-7 text-slate-500">
                {t(
                  `هذا موقع نموذجي صممته ${siteConfig.name} ليعرض ما يمكن تنفيذه لنشاط من هذا النوع، ويمكنك تجربته كاملاً.`,
                  `This is a sample website designed by ${siteConfig.nameEn} to show what we can build for this kind of business. You can try every part of it. (The demo is in Arabic.)`,
                )}
              </p>
            )}
          </div>
        </div>
      </Section>

      <Section id="more" className="bg-white" aria-labelledby="more-title">
        <div className="flex items-end justify-between gap-4">
          <h2 id="more-title" className="text-2xl font-black sm:text-3xl">
            {t("مشاريع أخرى", "More projects")}
          </h2>
          <Link href={lp(locale, "/work")} className="text-sm font-bold text-brand-600 hover:text-brand-700">
            {t("كل الأعمال ←", "All work →")}
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={lp(locale, `/work/${o.slug}`)} className="block h-full rounded-2xl border border-slate-200 p-5 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
                <p className="text-xs font-bold text-brand-600">{o.category}</p>
                <p className="mt-1 font-black text-slate-900">{o.title}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{o.caseStudy.headline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}

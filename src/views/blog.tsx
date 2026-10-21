import Link from "next/link";
import { keepNumbers } from "@/lib/utils";
import { ArrowLeft, BookOpen, Clock, Lightbulb, Timer } from "lucide-react";
import { getArticles, readingLabel } from "@/content/blog";
import { PageHeader } from "@/components/ui/PageHeader";
import { HeroVisual, heroImages } from "@/components/hero/HeroVisual";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/home/CtaBand";
import { pageMeta } from "@/i18n/meta";
import { seoFor } from "@/content/seo";
import { formatDate, lp, tr, type Locale } from "@/i18n";

export function blogMeta(locale: Locale) {
  return pageMeta(locale, {
    path: "/blog",
    ...seoFor("blog", locale),
  });
}

export default function BlogView({ locale }: { locale: Locale }) {
  const t = tr(locale);
  const articles = getArticles(locale);
  const [featured, ...rest] = articles;
  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("مركز المعرفة", "Insights") }]}
        title={t("قرارات رقمية أوضح لنشاطك.", "Clearer digital decisions for your business.")}
        description={t(
          "أدلة عملية مكتوبة لأصحاب الأنشطة لا للمبرمجين: ما الذي تحتاجه، وما الذي يمكن تأجيله، وكيف تختار بثقة.",
          "Practical guides written for business owners, not developers: what you need, what can wait, and how to choose with confidence.",
        )}
        aside={
          <HeroVisual
            image={heroImages.blog}
            cards={[
              { icon: BookOpen, title: t(`${articles.length} أدلة عملية`, `${articles.length} practical guides`), text: t("لأصحاب الأنشطة", "For business owners") },
              { icon: Lightbulb, title: t("بلغة بسيطة", "Plain language"), text: t("بدون مصطلحات معقدة", "No confusing jargon") },
              { icon: Timer, title: t("قراءة سريعة", "Quick reads"), text: t("دقائق لكل دليل", "A few minutes each") },
            ]}
          />
        }
      />
      <Section id="articles" className="pt-0 sm:pt-0 lg:pt-0">
        <Link
          href={lp(locale, `/blog/${featured.slug}`)}
          className="group grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white transition-shadow hover:shadow-xl hover:shadow-slate-900/5 lg:grid-cols-[1fr_1fr]"
        >
          <div className="relative isolate flex min-h-60 flex-col justify-between overflow-hidden bg-linear-to-br from-brand-800 via-brand-700 to-accent-600 p-8 text-white sm:p-10">
            {/* شبكة خفيفة + دوائر ضوء — غلاف المقال المميز */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
            />
            <div aria-hidden className="absolute -end-16 -top-16 -z-10 size-64 rounded-full bg-white/10 blur-2xl" />
            <div aria-hidden className="absolute -start-10 -bottom-20 -z-10 size-72 rounded-full bg-accent-400/30 blur-3xl" />
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold ring-1 ring-white/25 backdrop-blur">
              <span className="size-1.5 rounded-full bg-emerald-300" aria-hidden />
              {t("أحدث مقال", "Latest article")}
            </span>
            <div className="mt-10">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur transition-transform duration-300 group-hover:-translate-y-1">
                <BookOpen className="size-7" aria-hidden />
              </span>
              <p className="mt-5 text-sm font-semibold text-white/75">{featured.category}</p>
              <p className="mt-1 text-2xl leading-[1.45] font-black text-balance sm:text-[1.7rem]">{t("دليل عملي لأصحاب الأنشطة", "A practical guide for business owners")}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <p className="text-sm font-bold text-brand-600">
              {featured.category} · {t("مقال مميز", "Featured")}
            </p>
            <h2 className="mt-3 text-2xl font-black group-hover:text-brand-700 sm:text-3xl">{keepNumbers(featured.title)}</h2>
            <p className="mt-3 leading-8 text-slate-600">{featured.description}</p>
            <p className="mt-6 flex items-center gap-4 text-sm text-slate-500">
              <span>{formatDate(locale, featured.date)}</span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden />
                {readingLabel(featured, locale)}
              </span>
            </p>
          </div>
        </Link>

        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((a, i) => (
            // عدد فردي: آخر مقال يتوسّط الصف
            <li key={a.slug} className={rest.length % 2 === 1 && i === rest.length - 1 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]" : undefined}>
              <Link
                href={lp(locale, `/blog/${a.slug}`)}
                className="group flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-7 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5"
              >
                <p className="text-sm font-bold text-brand-600">{a.category}</p>
                <h2 className="mt-3 text-xl leading-[1.5] font-black group-hover:text-brand-700">{keepNumbers(a.title)}</h2>
                <p className="mt-3 flex-1 leading-7 text-slate-600">{a.description}</p>
                <p className="mt-6 flex items-center justify-between text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-4" aria-hidden />
                    {readingLabel(a, locale)}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-brand-600">
                    {t("اقرأ المقال", "Read article")}
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand locale={locale} />
    </>
  );
}

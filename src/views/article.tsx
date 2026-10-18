import Link from "next/link";
import { keepNumbers } from "@/lib/utils";
import { notFound } from "next/navigation";
import { CalendarCheck, Clock } from "lucide-react";
import { getArticles, readingLabel } from "@/content/blog";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ArticleBody, slugifyHeading } from "@/components/blog/ArticleBody";
import { LogoMark } from "@/components/ui/Logo";
import { pageMeta } from "@/i18n/meta";
import { formatDate, lp, tr, type Locale } from "@/i18n";

export const articleParams = () => getArticles("ar").map((a) => ({ slug: a.slug }));

export function articleMeta(locale: Locale, slug: string) {
  const a = getArticles(locale).find((x) => x.slug === slug);
  if (!a) return {};
  return pageMeta(locale, { path: `/blog/${a.slug}`, title: a.title, description: a.description, type: "article", publishedTime: a.date });
}

export default function ArticleView({ locale, slug }: { locale: Locale; slug: string }) {
  const t = tr(locale);
  const articles = getArticles(locale);
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  const brand = locale === "en" ? siteConfig.nameEn : siteConfig.name;
  const toc = a.body
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => l.slice(3).trim());
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    inLanguage: locale,
    mainEntityOfPage: `${siteConfig.url}${lp(locale, `/blog/${a.slug}`)}`,
    author: { "@type": "Organization", name: brand, url: `${siteConfig.url}${lp(locale, "/about")}` },
    publisher: { "@type": "Organization", name: brand, logo: { "@type": "ImageObject", url: `${siteConfig.url}/brand/mark-en.png` } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="relative overflow-hidden pt-28 pb-10 sm:pt-32">
        <div aria-hidden className="bg-grid mask-fade pointer-events-none absolute inset-0 -z-10" />
        <Container className="max-w-3xl">
          <nav aria-label={t("مسار التنقل", "Breadcrumb")} className="text-sm text-slate-500">
            <Link href={lp(locale, "/")} className="hover:text-brand-600">
              {t("الرئيسية", "Home")}
            </Link>
            <span className="mx-2">/</span>
            <Link href={lp(locale, "/blog")} className="hover:text-brand-600">
              {t("مركز المعرفة", "Insights")}
            </Link>
          </nav>
          <p className="mt-6 text-sm font-bold text-brand-600">{a.category}</p>
          <h1 className="mt-3 text-3xl leading-[1.35] font-black text-balance sm:text-[2.6rem]">{keepNumbers(a.title)}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{a.description}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 pt-5 text-sm text-slate-500">
            <span className="flex items-center gap-2 font-semibold text-slate-700">
              <span className="flex size-8 items-center justify-center rounded-lg bg-brand-50 ring-1 ring-brand-100">
                <LogoMark className="size-6" />
              </span>
              {brand}
            </span>
            <span>{formatDate(locale, a.date)}</span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden />
              {readingLabel(a, locale)}
            </span>
          </div>
        </Container>
      </header>

      <Container className="max-w-3xl pb-12">
        {toc.length > 2 && (
          <nav aria-label={t("محتويات المقال", "Table of contents")} className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-black text-slate-900">{t("في هذا المقال", "In this article")}</p>
            <ol className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {toc.map((h, i) => (
                <li key={h}>
                  <a href={`#${slugifyHeading(h)}`} className="flex gap-2 text-slate-600 hover:text-brand-700">
                    <span className="font-bold text-brand-600 tabular-nums">{i + 1}.</span>
                    {h.replace(/^\d+[.)]\s*/, "")}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <article className="mt-4">
          <ArticleBody body={a.body} />
        </article>

        <aside aria-label={t("عن الكاتب", "About the author")} className="mt-10 flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-50 to-accent-100 ring-1 ring-brand-100">
            <LogoMark className="size-11" />
          </span>
          <div>
            <p className="text-xs font-bold text-slate-500">{t("كُتب بواسطة", "Written by")}</p>
            <p className="mt-0.5 font-black text-slate-900">{brand}</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {t(
                `محتوى عملي نكتبه ونراجعه في ${siteConfig.name} من واقع تنفيذ المشاريع، لمشاركة أفضل الممارسات والحلول الرقمية مع أصحاب الأنشطة.`,
                `Practical content written and reviewed at ${siteConfig.nameEn}, drawn from real project work, to share best practices and digital solutions with business owners.`,
              )}
            </p>
          </div>
        </aside>

        <div className="mt-6 flex flex-col items-start gap-5 rounded-[1.75rem] bg-brand-800 p-8 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xl font-black text-white">{t("هل تريد تطبيق هذا على نشاطك؟", "Want to apply this to your business?")}</p>
            <p className="mt-1 text-white/75">{t("جلسة مجانية لمدة 30 دقيقة، دون أي التزام.", "A free 30-minute session, no obligation.")}</p>
          </div>
          <ButtonLink href={lp(locale, "/book")} variant="inverse" size="lg" className="shrink-0">
            <CalendarCheck className="size-5" aria-hidden />
            {t("احجز استشارة", "Book a consultation")}
          </ButtonLink>
        </div>
      </Container>

      <Section id="related" className="bg-white" aria-labelledby="related-title">
        <h2 id="related-title" className="text-2xl font-black">
          {t("مقالات أخرى", "More articles")}
        </h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={lp(locale, `/blog/${r.slug}`)} className="block h-full rounded-2xl border border-slate-200 p-6 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-xs font-bold text-brand-600">{r.category}</p>
                <p className="mt-2 leading-7 font-black text-slate-900">{keepNumbers(r.title)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

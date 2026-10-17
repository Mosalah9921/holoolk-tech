import { Container } from "@/components/ui/Container";
import { ArticleBody, slugifyHeading } from "@/components/blog/ArticleBody";
import Link from "next/link";
import { lp, tr, type Locale } from "@/i18n";

/** قالب الصفحات القانونية: عنوان + تاريخ آخر تحديث + فهرس + المحتوى */
export function LegalPage({
  title,
  updated,
  intro,
  body,
  locale = "ar",
}: {
  title: string;
  updated: string;
  intro: string;
  body: string;
  locale?: Locale;
}) {
  const tt = tr(locale);
  const toc = body
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => l.slice(3).trim());
  return (
    <>
      <header className="relative overflow-hidden pt-32 pb-10 sm:pt-40">
        <div aria-hidden className="bg-grid mask-fade pointer-events-none absolute inset-0 -z-10" />
        <Container className="max-w-3xl">
          <nav aria-label={tt("مسار التنقل", "Breadcrumb")} className="text-sm text-slate-500">
            <Link href={lp(locale, "/")} className="hover:text-brand-600">
              {tt("الرئيسية", "Home")}
            </Link>
            <span className="mx-2">/</span>
            <span>{title}</span>
          </nav>
          <h1 className="mt-6 text-3xl font-black sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-slate-500">
            {tt("آخر تحديث:", "Last updated:")} {updated}
          </p>
          <p className="mt-5 text-lg leading-8 text-slate-600">{intro}</p>
        </Container>
      </header>
      <Container className="max-w-3xl pb-20">
        <nav aria-label={tt("المحتويات", "Contents")} className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-black text-slate-900">{tt("المحتويات", "Contents")}</p>
          <ol className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {toc.map((t, i) => (
              <li key={t}>
                <a href={`#${slugifyHeading(t)}`} className="flex gap-2 text-slate-600 hover:text-brand-700">
                  <span className="font-bold text-brand-600 tabular-nums">{i + 1}.</span>
                  {t}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <ArticleBody body={body} />
      </Container>
    </>
  );
}

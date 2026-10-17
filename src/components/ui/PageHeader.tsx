import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";
import { lp, tr, type Locale } from "@/i18n";
import { siteConfig } from "@/config/site";

/** رأس موحّد للصفحات الداخلية: مسار تصفح + عنوان + وصف + أزرار (اختياري) */
export function PageHeader({
  title,
  description,
  crumbs = [],
  children,
  aside,
  className,
  locale = "ar",
}: {
  locale?: Locale;
  title: string;
  description?: string;
  crumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  const t = tr(locale);
  const trail = [{ label: t("الرئيسية", "Home"), href: "/" }, ...crumbs];
  /** مسار التصفح لجوجل (BreadcrumbList) — بيظهر تحت عنوان الصفحة في نتائج البحث */
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${siteConfig.url}${lp(locale, c.href) === "/" ? "" : lp(locale, c.href)}` } : {}),
    })),
  };
  return (
    <section className={cn("relative isolate overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-brand-200/45 blur-[110px]" />
      </div>
      <Container className={cn(aside && "grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]")}>
        <div className="animate-rise">
          {crumbs.length > 0 && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c") }} />
          )}
          <nav aria-label={t("مسار التصفح", "Breadcrumb")} className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
            {trail.map((c, i) => (
              <span key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronLeft className="size-4" aria-hidden />}
                {c.href && i < trail.length - 1 ? (
                  <Link href={lp(locale, c.href)} className="hover:text-brand-700">
                    {c.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-slate-800" aria-current={i === trail.length - 1 ? "page" : undefined}>
                    {c.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
          <h1 className="max-w-3xl text-4xl leading-[1.2] font-black tracking-tight sm:text-5xl lg:text-[3.4rem]">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-lg leading-9 text-slate-600">{description}</p>}
          {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </div>
        {aside}
      </Container>
    </section>
  );
}

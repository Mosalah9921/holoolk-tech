import { CalendarClock, Check, Target } from "lucide-react";
import { getPackages, type Package } from "@/content/pricing";
import { tr, type Locale } from "@/i18n";
import { siteConfig } from "@/config/site";
import { cn, whatsappLink } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

/** الباقات — من غير أسعار: كل باقة بتفتح طلب عرض مخصص */
export function Pricing({ withHeading = true, locale = "ar" }: { withHeading?: boolean; locale?: Locale }) {
  const t = tr(locale);
  return (
    <Section id="pricing" aria-labelledby={withHeading ? "pricing-title" : undefined} className={withHeading ? undefined : "pt-0 sm:pt-0 lg:pt-0"}>
      {!withHeading && <h2 className="sr-only">{t("الباقات", "Packages")}</h2>}
      {withHeading && (
        <SectionHeading
          id="pricing-title"
          title={t("باقات مرنة تواكب مراحل نمو أعمالك", "Flexible packages for every stage of growth")}
          description={t("كل باقة نقطة انطلاق، وبعد التشاور معك نُعدّ عرضاً مفصّلاً يتوافق مع متطلبات مشروعك بدقة.", "Each package is a starting point. After we talk, we prepare a detailed proposal tailored precisely to your project.")}
        />
      )}

      <ul className="grid items-stretch gap-5 lg:grid-cols-3">
        {getPackages(locale).map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} locale={locale} />
        ))}
      </ul>
    </Section>
  );
}

function PackageCard({ pkg, locale }: { pkg: Package; locale: Locale }) {
  const t = tr(locale);
  const featured = pkg.popular;
  const message = t(`مرحباً حلولك تيك، أرغب في الحصول على عرض تفصيلي لـ "${pkg.name}".`, `Hello Holoolk Tech, I'd like a detailed quote for the "${pkg.name}" package.`);

  return (
    <li
      className={cn(
        "relative flex flex-col rounded-[1.75rem] p-7 sm:p-8",
        featured ? "bg-brand-600 text-white shadow-2xl shadow-brand-600/25" : "border border-slate-200 bg-white shadow-sm",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className={cn("text-xl font-black", featured && "text-white")}>{pkg.name}</h3>
        {featured && <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">{t("مُوصى به", "Recommended")}</span>}
      </div>
      <p className={cn("mt-3 text-sm leading-7", featured ? "text-brand-100" : "text-slate-600")}>{pkg.description}</p>

      <dl className={cn("mt-6 grid gap-2.5 rounded-2xl p-4 text-sm", featured ? "bg-white/10" : "bg-slate-50")}>
        <div className="flex items-start gap-2">
          <Target className={cn("mt-0.5 size-4 shrink-0", featured ? "text-silver-200" : "text-brand-600")} aria-hidden />
          <dt className={cn("shrink-0 whitespace-nowrap", featured ? "text-brand-100" : "text-slate-500")}>{t("الأنسب لـ", "Best for:")}</dt>
          <dd className="font-semibold">{pkg.idealFor}</dd>
        </div>
        <div className="flex items-start gap-2">
          <CalendarClock className={cn("mt-0.5 size-4 shrink-0", featured ? "text-silver-200" : "text-accent-500")} aria-hidden />
          <dt className={cn("shrink-0 whitespace-nowrap", featured ? "text-brand-100" : "text-slate-500")}>{t("مدة التنفيذ", "Timeline:")}</dt>
          <dd className="font-semibold">{pkg.timeline}</dd>
        </div>
      </dl>

      <ul className="mt-6 flex-1 space-y-3">
        {pkg.features.map((f) => (
          <li key={f} className={cn("flex items-start gap-2.5 text-sm leading-6", featured ? "text-white" : "text-slate-700")}>
            <Check className={cn("mt-0.5 size-4 shrink-0", featured ? "text-silver-200" : "text-brand-600")} aria-hidden />
            {f}
          </li>
        ))}
      </ul>

      <ButtonLink
        href={whatsappLink(siteConfig.contact.whatsapp, message)}
        target="_blank"
        rel="noopener noreferrer"
        variant={featured ? "inverse" : "secondary"}
        className="mt-8 w-full"
      >
        {pkg.cta}
      </ButtonLink>
    </li>
  );
}

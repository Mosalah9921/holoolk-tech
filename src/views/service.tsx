import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ChevronLeft, Target } from "lucide-react";
import { getServices } from "@/content/services";
import { getPackages } from "@/content/pricing";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Process } from "@/components/sections/Process";
import { pageMeta } from "@/i18n/meta";
import { lp, tr, type Locale } from "@/i18n";

/** صفحة لكل خدمة — بتتولّد تلقائياً من content/services.ts */
export const serviceParams = () => getServices("ar").map((s) => ({ id: s.id }));

export function serviceMeta(locale: Locale, id: string) {
  const s = getServices(locale).find((x) => x.id === id);
  if (!s) return {};
  return pageMeta(locale, { path: `/services/${s.id}`, title: s.title, description: s.description });
}

export default function ServiceView({ locale, id }: { locale: Locale; id: string }) {
  const t = tr(locale);
  const services = getServices(locale);
  const service = services.find((s) => s.id === id);
  if (!service) notFound();

  const pkg = getPackages(locale).find((p) => p.id === service.packageId);
  const others = services.filter((s) => s.id !== service.id);
  const waMessage = t(`مرحباً حلولك تيك، أرغب في الاستفسار عن خدمة "${service.title}".`, `Hello Holoolk Tech, I'd like to ask about your "${service.title}" service.`);

  /** بيانات منظمة لجوجل: الخدمة + مقدّمها */
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.short,
    url: `${siteConfig.url}${lp(locale, `/services/${service.id}`)}`,
    areaServed: [{ "@type": "Country", name: "Egypt" }, { "@type": "Place", name: "Middle East" }],
    availableLanguage: ["ar", "en"],
    provider: { "@type": "ProfessionalService", name: locale === "en" ? siteConfig.nameEn : siteConfig.name, url: `${siteConfig.url}${lp(locale, "/")}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd).replace(/</g, "\\u003c") }} />
      {/* رأس الصفحة */}
      <section className="relative isolate overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid mask-fade absolute inset-0" />
          <div className="absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-linear-to-l from-brand-200/60 to-accent-200/60 blur-[110px]" />
        </div>
        <Container>
          <nav aria-label={t("مسار التصفح", "Breadcrumb")} className="mb-8 flex items-center gap-1.5 text-sm text-slate-500">
            <Link href={lp(locale, "/")} className="hover:text-brand-600">
              {t("الرئيسية", "Home")}
            </Link>
            <ChevronLeft className="size-4" aria-hidden />
            <Link href={lp(locale, "/services")} className="hover:text-brand-600">
              {t("خدماتنا", "Services")}
            </Link>
            <ChevronLeft className="size-4" aria-hidden />
            <span className="font-semibold text-slate-800" aria-current="page">
              {service.title}
            </span>
          </nav>

          <div className="grid items-center gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div className="animate-fade-up max-w-3xl">
              {service.badge && (
                <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-accent-700 shadow-sm ring-1 ring-slate-200">{service.badge}</span>
              )}
              <h1 className="mt-5 text-4xl leading-tight font-black sm:text-5xl">{service.title}</h1>
              <p className="mt-5 text-lg leading-9 text-slate-600">{service.details}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={whatsappLink(siteConfig.contact.whatsapp, waMessage)} target="_blank" rel="noopener noreferrer" size="lg">
                  {t("اطلب هذه الخدمة", "Request this service")}
                  <ArrowLeft className="size-5" aria-hidden />
                </ButtonLink>
                <ButtonLink href={lp(locale, "/work")} variant="secondary" size="lg">
                  {t("تصفّح أعمالنا", "Browse our work")}
                </ButtonLink>
              </div>
            </div>

            {/* أيقونة الخدمة ثلاثية الأبعاد */}
            <div aria-hidden className="relative mx-auto w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[460px]">
              <div className="absolute inset-[-10%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(85_131_186/0.35),rgb(163_191_224/0.15)_60%,transparent)]" />
              <div className="absolute inset-x-[14%] bottom-[2%] -z-10 h-[12%] rounded-[50%] bg-brand-800/15 blur-xl" />
              <Image
                src={service.image}
                alt=""
                width={640}
                height={640}
                priority
                sizes="(min-width: 1024px) 460px, (min-width: 640px) 400px, 300px"
                className="w-full drop-shadow-[0_24px_30px_rgb(16_39_74/0.22)] motion-safe:animate-[drift_7s_ease-in-out_infinite]"
              />
            </div>
          </div>
        </Container>
      </section>

      <Section id="details" aria-labelledby="details-title" className="pt-0 sm:pt-0 lg:pt-0">
        <h2 id="details-title" className="sr-only">
          {t("تفاصيل الخدمة", "Service details")}
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <h3 className="text-xl font-bold">{t("ما الذي ستحصل عليه", "What you get")}</h3>
            <ul className="mt-6 space-y-4">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <h3 className="text-xl font-bold">{t("الأنسب لـ", "Ideal for")}</h3>
            <ul className="mt-6 space-y-4">
              {service.idealFor.map((f) => (
                <li key={f} className="flex items-start gap-3 text-slate-700">
                  <Target className="mt-1 size-5 shrink-0 text-accent-500" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>

            {pkg && (
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-brand-100 bg-brand-50/60 p-5">
                <div>
                  <p className="text-sm text-slate-500">{t("الباقة المقترحة", "Recommended package")}</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">{pkg.name}</p>
                  <p className="text-sm text-slate-600">
                    {t("مدة التنفيذ:", "Delivery time:")} {pkg.timeline}
                  </p>
                </div>
                <ButtonLink href={lp(locale, "/pricing")} variant="secondary" size="sm">
                  {t("تفاصيل الباقة", "Package details")}
                </ButtonLink>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Process locale={locale} />

      <Section id="more-services" aria-labelledby="more-title">
        <SectionHeading id="more-title" title={t("خدمات أخرى قد تهمّك", "Other services you may need")} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {others.map(({ id: otherId, image, title }) => (
            <li key={otherId}>
              <Link
                href={lp(locale, `/services/${otherId}`)}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
              >
                <Image src={image} alt="" width={640} height={640} sizes="120px" className="h-20 w-auto self-center object-contain transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105" />
                <span className="text-sm leading-6 font-bold text-slate-900">{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

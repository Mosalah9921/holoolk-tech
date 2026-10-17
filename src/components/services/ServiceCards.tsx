import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { getServices, type Service } from "@/content/services";
import { lp, tr, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** ترتيب عرض الخدمات الست */
const order = ["web-development", "e-commerce", "ui-ux-design", "landing-pages", "web-apps", "maintenance-support"];

/**
 * شبكة موحدة من 6 بطاقات تفاعلية متطابقة:
 * الواجهة تعرض الأيقونة والاسم ولمن تناسب، وعند المرور (أو التركيز بلوحة المفاتيح)
 * يظهر شرح مختصر وأهم المزايا. على اللمس (بدون hover) يظهر الشرح دائماً.
 */
export function ServiceCards({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const list = [...getServices(locale)].sort((x, y) => order.indexOf(x.id) - order.indexOf(y.id));

  return (
    <Section id="services" aria-labelledby="services-title" className="bg-white">
      <SectionHeading
        id="services-title"
        align="center"
        title={t("خدماتنا الأساسية", "Our core services")}
        description={t("ست خدمات متكاملة تغطي كافة احتياجاتك الرقمية من الفكرة وحتى الإطلاق والنمو المستمر.", "Six integrated services covering everything you need online, from the first idea to launch and ongoing growth.")}
      />

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <li key={s.id}>
            <ServiceCard service={s} locale={locale} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

function ServiceCard({ service: s, locale }: { service: Service; locale: Locale }) {
  const t = tr(locale);
  return (
    <Link
      href={lp(locale, `/services/${s.id}`)}
      className={cn(
        "group relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-b from-white to-slate-50 p-7 transition-all duration-500",
        "hover:-translate-y-1 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-800/10 focus-visible:-translate-y-1",
      )}
    >
      {/* توهج ناعم عند المرور */}
      <span aria-hidden className="absolute -bottom-24 -start-24 size-56 rounded-full bg-brand-200/0 blur-3xl transition-colors duration-500 group-hover:bg-brand-200/50" />

      <span className="relative -mx-2 -mt-2 flex h-36 items-center justify-center rounded-2xl bg-linear-to-b from-brand-50/80 to-transparent">
        <Image
          src={s.image}
          alt=""
          width={640}
          height={640}
          sizes="160px"
          className="h-36 w-auto object-contain drop-shadow-[0_12px_16px_rgb(16_39_74/0.18)] transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:scale-105"
        />
      </span>

      <h3 className="relative mt-5 text-xl leading-8 font-black text-slate-900">{s.title}</h3>
      {s.badge && <span className="relative mt-2 self-start rounded-full bg-accent-50 px-2.5 py-0.5 text-xs font-bold text-accent-700">{s.badge}</span>}

      {/* الواجهة: لمن تناسب — تختفي عند المرور */}
      <p className="relative mt-4 line-clamp-2 text-sm leading-7 text-slate-500 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-0 [@media(hover:hover)]:group-focus-visible:opacity-0">
        {t("مناسبة لـ:", "Ideal for:")} {s.idealFor[0]}
      </p>

      {/* الشرح: ينزلق من الأسفل عند المرور، وظاهر دائماً على اللمس */}
      <div
        className={cn(
          "relative mt-auto pt-5 transition-all duration-500 ease-out",
          "[@media(hover:hover)]:pointer-events-none [@media(hover:hover)]:absolute [@media(hover:hover)]:inset-0 [@media(hover:hover)]:z-10 [@media(hover:hover)]:m-0 [@media(hover:hover)]:flex [@media(hover:hover)]:flex-col [@media(hover:hover)]:justify-center [@media(hover:hover)]:bg-white/95 [@media(hover:hover)]:p-7 [@media(hover:hover)]:backdrop-blur-sm [@media(hover:hover)]:translate-y-4 [@media(hover:hover)]:opacity-0",
          "[@media(hover:hover)]:group-hover:pointer-events-auto [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100",
          "[@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100",
        )}
      >
        <span className="mb-3 hidden items-center gap-2.5 [@media(hover:hover)]:flex">
          <Image src={s.image} alt="" width={640} height={640} sizes="48px" className="size-12 object-contain" />
          <span className="text-base font-black text-slate-900">{s.title}</span>
        </span>
        <p className="text-sm leading-7 text-slate-700">{s.description}</p>
        <ul className="mt-4 space-y-2 border-t border-slate-200 pt-4">
          {s.features.slice(0, 2).map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs leading-6 font-medium text-slate-700">
              <Check className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden />
              {f}
            </li>
          ))}
        </ul>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
          {t("تفاصيل الخدمة", "Service details")}
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
        </span>
      </div>

      {/* تلميح المرور */}
      <span
        aria-hidden
        className="mt-auto hidden items-center gap-1.5 pt-5 text-xs font-bold text-brand-600/70 transition-opacity duration-300 group-hover:opacity-0 [@media(hover:hover)]:inline-flex"
      >
        <span className="size-1.5 rounded-full bg-brand-500 motion-safe:animate-ping" />
        {t("مرّر لعرض التفاصيل", "Hover for details")}
      </span>
    </Link>
  );
}

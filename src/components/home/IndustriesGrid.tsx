import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { lp, tr, type Locale } from "@/i18n";

/** الرئيسية: أهم 4 قطاعات فقط — باقي المجالات في صفحة /solutions */
const industries = [
  {
    name: { ar: "المطاعم والكافيهات", en: "Restaurants & cafés" },
    description: {
      ar: "منيو إلكتروني ذكي وطلبات وحجوزات مباشرة تصلك منظمة لرفع كفاءة التشغيل.",
      en: "A smart digital menu with direct orders and bookings that reach you organized, so service runs smoother.",
    },
    points: { ar: ["منيو QR تفاعلي", "إدارة الطلبات والطاولات", "ربط بوابات الدفع والتوصيل"], en: ["Interactive QR menu", "Order and table management", "Payment and delivery integrations"] },
    href: "/solutions/restaurants",
    image: "/images/solutions/restaurants.webp",
  },
  {
    name: { ar: "المتاجر والعلامات التجارية", en: "Retail & brands" },
    description: {
      ar: "متاجر إلكترونية متكاملة بالدفع والشحن ومتابعة المخزون والطلبات من لوحة واحدة.",
      en: "Complete online stores with payments, shipping, and inventory and order tracking from one dashboard.",
    },
    points: { ar: ["دفع إلكتروني وشحن", "تتبع المخزون والطلبات", "تجربة شراء سريعة"], en: ["Online payments and shipping", "Inventory and order tracking", "A fast checkout experience"] },
    href: "/solutions/stores",
    image: "/images/solutions/stores.webp",
  },
  {
    name: { ar: "العيادات والمراكز الطبية", en: "Clinics & medical centers" },
    description: {
      ar: "أتمتة حجز المواعيد وتنظيم بيانات المرضى بطريقة آمنة وسهلة.",
      en: "Automated appointment booking and organized patient data, simple and secure.",
    },
    points: { ar: ["نظام حجز مواعيد آلي", "صفحات للأطباء والخدمات", "تنبيهات المواعيد"], en: ["Automated appointment booking", "Doctor and service pages", "Appointment reminders"] },
    href: "/solutions/clinics",
    image: "/images/solutions/clinics.webp",
  },
  {
    name: { ar: "العقارات والتطوير العقاري", en: "Real estate & development" },
    description: {
      ar: "واجهات عرض مميزة للوحدات وإدارة مسار العملاء المحتملين بكفاءة.",
      en: "Standout unit listings and an efficient way to manage your sales pipeline.",
    },
    points: { ar: ["فلاتر وبحث عقاري ذكي", "ربط نظام CRM للعملاء", "حاسبات الأقساط والدفعات"], en: ["Smart property search and filters", "CRM for your leads", "Installment and payment calculators"] },
    href: "/solutions/real-estate",
    image: "/images/solutions/real-estate.webp",
  },
];

export function IndustriesGrid({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  return (
    <Section id="solutions" aria-labelledby="solutions-title">
      <SectionHeading
        id="solutions-title"
        align="center"
        title={t("حلول مصممة لمجال عملك", "Solutions built for your industry")}
        description={t("لكل نشاط احتياجاته؛ اختر مجالك وشاهد ما يمكن أن نبنيه لك.", "Every business has its own needs. Pick your industry and see what we can build for you.")}
      />

      <ul className="grid gap-5 md:grid-cols-2">
        {industries.map(({ image, name: nm, description: ds, points: pt, href: h }, i) => {
          const name = nm[locale];
          const description = ds[locale];
          const points = pt[locale];
          const href = lp(locale, h);
          return (
          // على الموبايل: 3 مجالات بس، والباقي في صفحة الحلول
          <li key={name} className={i >= 3 ? "max-md:hidden" : undefined}>
            <Link
              href={href}
              className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-800/[0.07] focus-visible:-translate-y-1 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="relative flex size-20 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-50 to-slate-100 ring-1 ring-brand-100/70 transition-all duration-300 group-hover:from-brand-100 group-hover:to-brand-50 group-hover:shadow-md group-hover:shadow-brand-600/10">
                  <Image
                    src={image}
                    alt=""
                    width={640}
                    height={640}
                    sizes="80px"
                    className="size-[4.5rem] object-contain drop-shadow-[0_6px_8px_rgb(16_39_74/0.18)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                  />
                </span>
                <h3 className="text-lg leading-8 font-bold text-slate-900">{name}</h3>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>

              <ul className="mt-5 grid flex-1 content-start gap-2.5 border-t border-slate-100 pt-5 xl:grid-cols-2 xl:gap-x-4">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm leading-6 font-medium text-slate-700">
                    <Check className="mt-1 size-4 shrink-0 text-brand-500" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>

              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
                {t("تفاصيل الحل", "Explore the solution")}
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />
              </span>
            </Link>
          </li>
          );
        })}
      </ul>

      <div className="mt-8 flex justify-center sm:mt-10">
        <ButtonLink href={lp(locale, "/solutions")} size="lg" className="w-full shadow-lg shadow-brand-600/20 sm:w-auto">
          {t("عرض كافة الحلول", "View all solutions")}
          <ArrowLeft className="size-5" aria-hidden />
        </ButtonLink>
      </div>

      {/* شريط هادئ للمجالات الأخرى */}
      <div className="mt-10 flex flex-col items-start gap-5 rounded-3xl border border-brand-100 bg-brand-50/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-600 ring-1 ring-brand-100">
            <Sparkles className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-base leading-7 font-bold text-slate-900">{t("نشاطك التجاري مختلف؟", "Is your business different?")}</p>
            <p className="text-sm leading-7 text-slate-600">
              {t("نبتكر أنظمة رقمية مخصصة لأي مجال عمل.", "We build custom digital systems for any industry.")}{" "}
              <Link href={lp(locale, "/solutions")} className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-600">
                {t("تصفّح كل المجالات", "Browse all industries")}
              </Link>
            </p>
          </div>
        </div>
        <ButtonLink href={lp(locale, "/start")} variant="secondary" className="w-full shrink-0 sm:w-auto">
          {t("طلب حل مخصص", "Request a custom solution")}
          <ArrowLeft className="size-4" aria-hidden />
        </ButtonLink>
      </div>
    </Section>
  );
}

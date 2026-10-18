import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { lp, tr, type Locale } from "@/i18n";

/** الرئيسية: أهم 4 خدمات فقط — والتفاصيل الكاملة في صفحة /services */
const highlights = [
  {
    image: "/images/home/web-ecommerce.webp",
    title: { ar: "تطوير المواقع والمتاجر الإلكترونية", en: "Websites & Online Stores" },
    tag: "Web & E-commerce",
    description: {
      ar: "منصات سريعة، متجاوبة بالكامل، مصممة لرفع المبيعات وتحسين الظهور في محركات البحث (SEO)\u200F.",
      en: "Fast, fully responsive platforms designed to grow sales and improve your visibility in search engines.",
    },
    points: { ar: ["متاجر متكاملة", "بوابات دفع آمنة", "سرعة تحميل فائقة"], en: ["Complete online stores", "Secure payment gateways", "Lightning-fast loading"] },
    href: "/services/e-commerce",
  },
  {
    image: "/images/home/cloud-erp.webp",
    title: { ar: "أنظمة إدارة الأعمال السحابية", en: "Cloud Business Systems" },
    tag: "Dashboards & CRM",
    description: {
      ar: "أتمتة شاملة لعملياتك الداخلية لتقليل التكاليف وزيادة كفاءة الإدارة والمتابعة.",
      en: "End-to-end automation of your internal operations to cut costs and make management more efficient.",
    },
    points: { ar: ["إدارة الطلبات والعملاء", "تقارير واضحة لحظية", "لوحات تحكم مخصصة"], en: ["Order and customer management", "Clear, real-time reports", "Custom dashboards"] },
    href: "/services/web-apps",
  },
  {
    image: "/images/home/ui-ux-design.webp",
    title: { ar: "تصميم تجربة وواجهة المستخدم", en: "UI/UX Design" },
    tag: "UI/UX",
    description: {
      ar: "واجهات عصرية مدروسة بعناية تركز على راحة العميل وتحويل الزوار إلى عملاء فعليين.",
      en: "Carefully crafted, modern interfaces focused on your customers' comfort and on turning visitors into clients.",
    },
    points: { ar: ["تصاميم تفاعلية حديثة", "سهولة الاستخدام", "هوية بصرية رقمية متكاملة"], en: ["Modern interactive designs", "Effortless usability", "A complete digital visual identity"] },
    href: "/services/ui-ux-design",
  },
  {
    image: "/images/home/api-integration.webp",
    title: { ar: "الاستشارات التقنية والربط البرمجي", en: "Consulting & Integrations" },
    tag: "API & Integration",
    description: {
      ar: "ربط أنظمتك الحالية مع خدمات الدفع، الشحن، والرسائل لتبسيط دورة العمل.",
      en: "Connect your existing systems with payment, shipping and messaging services to simplify your workflow.",
    },
    points: { ar: ["ربط بوابات الشحن والدفع", "أتمتة العمليات", "استشارات تقنية متخصصة"], en: ["Shipping and payment integrations", "Process automation", "Expert technical advice"] },
    href: "/book",
  },
];

export function ServicesGrid({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  return (
    <Section id="services" aria-labelledby="services-title" className="bg-white">
      <SectionHeading
        id="services-title"
        align="center"
        title={t("حلول ويب متكاملة لنمو أعمالك", "Complete web solutions to grow your business")}
        description={t("اختر ما يناسب مرحلة نشاطك، ونتولى التنفيذ كاملاً من الفكرة حتى الإطلاق.", "Choose what fits your stage, and we'll handle everything from idea to launch.")}
      />

      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {highlights.map(({ image, title: tt, tag, description: ds, points: pt, href: h }, i) => {
          const title = tt[locale];
          const description = ds[locale];
          const points = pt[locale];
          const href = lp(locale, h);
          return (
          // على الموبايل: 3 خدمات بس، والباقي في صفحة الخدمات
          <li key={title} className={i >= 3 ? "max-sm:hidden" : undefined}>
            <Link
              href={href}
              className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-800/[0.07] focus-visible:-translate-y-1"
            >
              {/* أيقونة ثلاثية الأبعاد على منصة متدرجة */}
              <span className="relative -mx-2 -mt-2 flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-b from-brand-50 via-slate-50 to-white">
                <span aria-hidden className="absolute inset-x-10 bottom-3 h-5 rounded-[50%] bg-brand-800/10 blur-md transition-all duration-500 group-hover:inset-x-14 group-hover:bg-brand-800/5" />
                <Image
                  src={image}
                  alt=""
                  width={560}
                  height={560}
                  sizes="(min-width: 1280px) 180px, (min-width: 640px) 200px, 180px"
                  className="relative h-32 w-auto object-contain transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105"
                />
              </span>

              <h3 className="mt-5 text-lg leading-8 font-bold text-slate-900">{title}</h3>
              {tag && (
                <span dir="ltr" className="mt-1 self-start text-xs font-bold tracking-wide text-accent-600">
                  {tag}
                </span>
              )}
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>

              <ul className="mt-5 flex-1 space-y-2.5 border-t border-slate-100 pt-5">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm leading-6 font-medium text-slate-700">
                    <Check className="mt-1 size-4 shrink-0 text-brand-500" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>

              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
                {t("اعرف المزيد", "Learn more")}
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />
              </span>
            </Link>
          </li>
          );
        })}
      </ul>

      <div className="mt-8 flex justify-center sm:mt-10">
        <ButtonLink href={lp(locale, "/services")} size="lg" className="w-full shadow-lg shadow-brand-600/20 sm:w-auto">
          {t("عرض كافة الخدمات", "View all services")}
          <ArrowLeft className="size-5" aria-hidden />
        </ButtonLink>
      </div>
    </Section>
  );
}

"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Award,
  Building2,
  CalendarCheck,
  Flame,
  Gift,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Soup,
  Stethoscope,
  Truck,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn, whatsappLink } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { Section } from "@/components/ui/Section";
import { buttonClasses } from "@/components/ui/Button";
import { tr, type Locale } from "@/i18n";

/* ============================================================
   "جرّب موقعك": معاينة حيّة — الزائر يكتب اسم نشاطه ويختار مجاله،
   فيشوف شكل موقعه فوراً، وبضغطة يبعت المعاينة على واتساب.
   ============================================================ */

type Kind = {
  id: string;
  label: string;
  icon: LucideIcon;
  sample: string;
  accent: string;
  soft: string;
  nav: string[];
  line: string;
  cta: string;
  tiles: { icon: LucideIcon; label: string }[];
};

const kindsAr: Kind[] = [
  {
    id: "restaurant",
    label: "مطعم أو كافيه",
    icon: UtensilsCrossed,
    sample: "مطعم بيت الكرم",
    accent: "#C2410C",
    soft: "#FFF7ED",
    nav: ["قائمة الطعام", "الفروع", "الحجز"],
    line: "أطباق منزلية طازجة يومياً — اطلب إلكترونياً أو احجز طاولتك.",
    cta: "احجز طاولة",
    tiles: [
      { icon: Flame, label: "مشويات" },
      { icon: Soup, label: "طواجن" },
      { icon: Truck, label: "توصيل" },
    ],
  },
  {
    id: "clinic",
    label: "عيادة",
    icon: Stethoscope,
    sample: "عيادة د. سلمى",
    accent: "#0F766E",
    soft: "#F0FDFA",
    nav: ["الخدمات", "الأطباء", "الحجز"],
    line: "احجز موعدك إلكترونياً في أقل من دقيقة، دون انتظار.",
    cta: "احجز موعداً",
    tiles: [
      { icon: Stethoscope, label: "الاستشارات" },
      { icon: CalendarCheck, label: "المواعيد" },
      { icon: ShieldCheck, label: "تعقيم شامل" },
    ],
  },
  {
    id: "store",
    label: "متجر",
    icon: ShoppingBag,
    sample: "متجر ورد",
    accent: "#BE185D",
    soft: "#FDF2F8",
    nav: ["المنتجات", "العروض", "السلة"],
    line: "منتجات أصلية، وشحن لجميع المحافظات، والدفع عند الاستلام.",
    cta: "تسوّق الآن",
    tiles: [
      { icon: Shirt, label: "وصل حديثاً" },
      { icon: Gift, label: "هدايا" },
      { icon: Truck, label: "شحن سريع" },
    ],
  },
  {
    id: "company",
    label: "شركة",
    icon: Building2,
    sample: "النخبة للمقاولات",
    accent: "#0369A1",
    soft: "#F0F9FF",
    nav: ["خدماتنا", "مشاريعنا", "تواصل معنا"],
    line: "خبرة راسخة في تنفيذ المشاريع وفق أعلى معايير الجودة والالتزام.",
    cta: "اطلب عرضاً",
    tiles: [
      { icon: Building2, label: "مشاريعنا" },
      { icon: Users, label: "فريقنا" },
      { icon: Award, label: "اعتماداتنا" },
    ],
  },
];

const kindsEn: Kind[] = [
  {
    ...kindsAr[0],
    label: "Restaurant or café",
    sample: "The Olive Table",
    nav: ["Menu", "Locations", "Book"],
    line: "Fresh home-style dishes every day. Order online or book your table.",
    cta: "Book a table",
    tiles: [
      { icon: Flame, label: "Grills" },
      { icon: Soup, label: "Stews" },
      { icon: Truck, label: "Delivery" },
    ],
  },
  {
    ...kindsAr[1],
    label: "Clinic",
    sample: "Dr. Salma's Clinic",
    nav: ["Services", "Doctors", "Book"],
    line: "Book your appointment online in under a minute, with no waiting.",
    cta: "Book an appointment",
    tiles: [
      { icon: Stethoscope, label: "Consultations" },
      { icon: CalendarCheck, label: "Appointments" },
      { icon: ShieldCheck, label: "Fully sterilized" },
    ],
  },
  {
    ...kindsAr[2],
    label: "Store",
    sample: "Bloom & Co.",
    nav: ["Products", "Offers", "Cart"],
    line: "Authentic products, nationwide shipping and cash on delivery.",
    cta: "Shop now",
    tiles: [
      { icon: Shirt, label: "New arrivals" },
      { icon: Gift, label: "Gifts" },
      { icon: Truck, label: "Fast shipping" },
    ],
  },
  {
    ...kindsAr[3],
    label: "Company",
    sample: "Elite Contracting",
    nav: ["Services", "Projects", "Contact"],
    line: "Proven experience delivering projects to the highest standards of quality and commitment.",
    cta: "Request a quote",
    tiles: [
      { icon: Building2, label: "Our projects" },
      { icon: Users, label: "Our team" },
      { icon: Award, label: "Certifications" },
    ],
  },
];

export function TryPreview({ bare = false, locale = "ar" }: { bare?: boolean; locale?: Locale }) {
  const t = tr(locale);
  const kinds = locale === "en" ? kindsEn : kindsAr;
  const [kindId, setKindId] = useState(kinds[0].id);
  const [name, setName] = useState("");
  const kind = kinds.find((k) => k.id === kindId) ?? kinds[0];
  const displayName = name.trim() || kind.sample;

  const message = t(
    `مرحباً حلولك تيك، اطّلعت على المعاينة وأرغب في موقع احترافي لـ "${displayName}" (${kind.label}).`,
    `Hello Holoolk Tech, I tried the preview and I'd like a professional website for "${displayName}" (${kind.label}).`,
  );

  return (
    <Section id="try" aria-labelledby={bare ? undefined : "try-title"} className={bare ? "pt-0 sm:pt-0 lg:pt-0" : undefined} containerClassName="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 [&>*]:min-w-0">
        {/* النص + التحكم */}
        <div>
{!bare && (
            <>
          <h2 id="try-title" className="text-3xl leading-[1.25] font-black tracking-tight sm:text-4xl lg:text-[2.6rem]">
            {t("عاين موقع نشاطك قبل تنفيذه.", "Preview your website before it's built.")}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-9 text-slate-600">
            {t(
              "أدخل اسم نشاطك واختر مجاله لترى في لحظات تصوّراً أولياً لحضورك الرقمي، ثم نتولى بناءه باحترافية: موقع سريع، عربي بالكامل، ومصمم لجذب العملاء.",
              "Enter your business name and industry to see a first concept of your online presence in seconds. Then we build it properly: fast, polished and designed to win customers.",
            )}
          </p>
            </>
          )}

          {/* الموبايل: المعاينة فوق الفورم عشان تبان وإنت بتكتب */}
          <div className={bare ? "lg:hidden" : "mt-8 lg:hidden"}>
            <SitePreview kind={kind} name={displayName} locale={locale} />
          </div>

          <div className="mt-8 max-w-lg rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <label htmlFor="biz-name" className="text-sm font-bold text-slate-900">
              {t("اسم النشاط", "Business name")}
            </label>
            <input
              id="biz-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t(`مثال: ${kind.sample}`, `e.g. ${kind.sample}`)}
              maxLength={32}
              autoComplete="organization"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder:text-slate-500 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:outline-none"
            />

            <fieldset className="mt-4">
              <legend className="text-sm font-bold text-slate-900">{t("مجال النشاط", "Industry")}</legend>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {kinds.map(({ id, label, icon: Icon }) => {
                  const active = id === kindId;
                  return (
                    <label
                      key={id}
                      className={cn(
                        "flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center text-xs font-bold transition-all has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-500",
                        active ? "border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/20" : "border-slate-200 text-slate-700 hover:border-slate-300",
                      )}
                    >
                      <input type="radio" name="biz-kind" checked={active} onChange={() => setKindId(id)} className="sr-only" />
                      <Icon className="size-5" aria-hidden />
                      {label}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <a
              href={whatsappLink(siteConfig.contact.whatsapp, message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("lead", { source: "hero_preview", kind: kind.id, locale })}
              className={buttonClasses({ size: "lg", className: "mt-5 w-full" })}
            >
              {t("حوّل المعاينة إلى موقع حقيقي", "Turn this preview into a real website")}
              <ArrowLeft className="size-5" aria-hidden />
            </a>
          </div>
          <p className="mt-3 max-w-lg text-xs text-slate-500">
            {t("المعاينة توضيحية، ويُصمَّم موقعك النهائي خصيصاً لهويتك واحتياجاتك.", "This preview is illustrative. Your final website is designed around your brand and needs.")}
          </p>
        </div>

        {/* المعاينة (ديسكتوب) */}
        <div className="hidden lg:block">
          <SitePreview kind={kind} name={displayName} locale={locale} />
        </div>
    </Section>
  );
}

function SitePreview({ kind, name, locale }: { kind: Kind; name: string; locale: Locale }) {
  const t = tr(locale);
  const Icon = kind.icon;

  return (
    <figure aria-label={t(`معاينة موقع ${name}`, `Website preview for ${name}`)} className="relative">
      <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_40px_80px_-30px_rgb(15_23_42/0.35)]">
        {/* شريط المتصفح */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3" dir="ltr">
          <span className="size-2.5 rounded-full bg-slate-300" />
          <span className="size-2.5 rounded-full bg-slate-300" />
          <span className="size-2.5 rounded-full bg-slate-300" />
          <div className="mx-auto w-1/2 truncate rounded-lg border border-slate-200 bg-white px-3 py-1 text-center text-[11px] text-slate-500">
            your-brand.com
          </div>
        </div>

        {/* الموقع */}
        <div key={kind.id} className="animate-fade-up">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex min-w-0 items-center gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg text-white" style={{ background: kind.accent }}>
                <Icon className="size-4" aria-hidden />
              </span>
              <span className="truncate text-sm font-black text-slate-900">{name}</span>
            </div>
            <div className="hidden items-center gap-4 text-xs font-semibold text-slate-500 sm:flex">
              {kind.nav.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>

          <div className="mx-4 rounded-2xl px-6 py-9 sm:px-8 sm:py-11" style={{ background: kind.soft }}>
            <p className="text-2xl leading-snug font-black break-words text-slate-900 sm:text-3xl">{name}</p>
            <p className="mt-3 max-w-xs text-sm leading-7 text-slate-600">{kind.line}</p>
            <span className="mt-5 inline-flex rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm" style={{ background: kind.accent }}>
              {kind.cta}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 p-3 sm:gap-3 sm:p-4">
            {kind.tiles.map(({ icon: TileIcon, label }) => (
              <div key={label} className="min-w-0 rounded-xl border border-slate-100 p-2.5 sm:p-3">
                <TileIcon className="size-5" style={{ color: kind.accent }} aria-hidden />
                <p className="mt-2 text-[11px] leading-4 font-bold break-words hyphens-auto text-slate-800 sm:text-xs">{label}</p>
                <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* شارة صغيرة */}
      <figcaption className="absolute -bottom-4 start-6 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-md">
        <span className="size-2 animate-pulse rounded-full bg-emerald-500" aria-hidden />
        {t("معاينة مباشرة تتحدّث أثناء الكتابة", "Live preview that updates as you type")}
      </figcaption>
    </figure>
  );
}

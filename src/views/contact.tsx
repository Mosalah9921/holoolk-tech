import { CalendarCheck, Clock, Mail, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { HeroHighlights } from "@/components/hero/HeroHighlights";
import { Section } from "@/components/ui/Section";
import { Contact } from "@/components/sections/Contact";
import { pageMeta } from "@/i18n/meta";
import { seoFor } from "@/content/seo";
import { lp, tr, type Locale } from "@/i18n";
import { waInquiry } from "@/lib/whatsapp-messages";

export function contactMeta(locale: Locale) {
  return pageMeta(locale, {
    path: "/contact",
    ...seoFor("contact", locale),
  });
}

export default function ContactView({ locale }: { locale: Locale }) {
  const t = tr(locale);
  const c = siteConfig.contact;
  const channels = [
    {
      icon: MessageCircle,
      title: t("واتساب", "WhatsApp"),
      text: t("أسرع وسيلة للتواصل، ونرد خلال ساعات العمل.", "The fastest way to reach us. We reply during business hours."),
      value: c.phoneDisplay,
      href: whatsappLink(c.whatsapp, waInquiry(locale)),
      ltr: true,
    },
    { icon: Mail, title: t("البريد الإلكتروني", "Email"), text: t("للعروض الرسمية والمراسلات التفصيلية.", "For formal proposals and detailed correspondence."), value: c.email, href: `mailto:${c.email}`, ltr: true },
    {
      icon: CalendarCheck,
      title: t("استشارة مجانية", "Free consultation"),
      text: t(`اختر موعداً يناسبك خلال ساعات العمل (${c.hours}).`, "Pick a time that suits you, Saturday to Thursday, 10 AM–8 PM Cairo time."),
      value: t("احجز جلسة 30 دقيقة", "Book a 30-minute session"),
      href: lp(locale, "/book"),
    },
    {
      icon: MapPin,
      title: t("المقر", "Based in"),
      text: t("نعمل عن بُعد مع عملاء داخل مصر وخارجها. اعرف كيف نعمل معك أينما كنت.", "We work remotely with clients in Egypt and abroad. See how we work with you, wherever you are."),
      value: t(c.location, c.locationEn),
      href: lp(locale, "/international"),
    },
  ];

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("تواصل معنا", "Contact us") }]}
        title={t("نسعد بالحديث عن مشروعك.", "Let’s talk about your project.")}
        description={t(
          "اختر الوسيلة الأنسب لك، أو أرسل تفاصيل مشروعك من النموذج أدناه وسنعود إليك خلال 24 ساعة.",
          "Choose whichever channel suits you best, or send your project details using the form below and we’ll get back to you within 24 hours.",
        )}
      >
        <HeroHighlights
          items={[
            { icon: MessageCircle, label: t("واتساب مباشر", "Direct WhatsApp") },
            { icon: Clock, label: t("رد خلال 24 ساعة", "Reply within 24 hours") },
            { icon: ShieldCheck, label: t("بياناتك في أمان", "Your data stays safe") },
          ]}
        />
      </PageHeader>
      <Section id="channels" className="pt-0 pb-6 sm:pt-0 sm:pb-8 lg:pt-0 lg:pb-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ icon: Icon, title, text, value, href, ltr }) => {
            const body = (
              <>
                <Icon className="size-6 text-brand-600" aria-hidden />
                <h2 className="mt-4 text-lg font-bold">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
                <p className="mt-4 truncate font-bold text-slate-900" dir={ltr ? "ltr" : undefined}>
                  {value}
                </p>
              </>
            );
            const cls = "block h-full rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm";
            return (
              <li key={title}>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`${cls} transition-all hover:-translate-y-0.5 hover:shadow-md`}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Section>
      <Contact locale={locale} />
    </>
  );
}

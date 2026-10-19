import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, MessageCircleMore, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { lp, tr, type Locale } from "@/i18n";
import { Logo } from "@/components/ui/Logo";

/** حسابات التواصل الاجتماعي — يظهر فقط ما له رابط في site.ts، والواتساب دائماً */
const socialMeta: Record<keyof typeof siteConfig.socials, { label: { ar: string; en: string }; icon: LucideIcon; hover: string }> = {
  facebook: { label: { ar: "فيسبوك", en: "Facebook" }, icon: Facebook, hover: "hover:bg-[#1877F2] hover:border-[#1877F2]" },
  instagram: { label: { ar: "إنستجرام", en: "Instagram" }, icon: Instagram, hover: "hover:bg-[#E1306C] hover:border-[#E1306C]" },
};

/** الفوتر: هوية + سوشيال واضح في الأعلى، ثم روابط وتواصل، ثم الحقوق */
export function Footer({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const en = locale === "en";
  const waMessage = t("مرحباً حلولك تيك، أود الاستفسار ومناقشة مشروع رقمي جديد.", "Hello Holoolk Tech, I'd like to discuss a new digital project.");
  const socials = [
    ...(Object.keys(socialMeta) as (keyof typeof socialMeta)[])
      .filter((k) => siteConfig.socials[k])
      .map((k) => ({ ...socialMeta[k], label: socialMeta[k].label[locale], href: siteConfig.socials[k] as string })),
    { label: t("واتساب", "WhatsApp"), icon: MessageCircleMore, hover: "hover:bg-[#25D366] hover:border-[#25D366]", href: whatsappLink(siteConfig.contact.whatsapp, waMessage) },
  ];
  const columns = [
    {
      title: t("استكشف", "Explore"),
      links: [
        { label: t("الخدمات", "Services"), href: "/services" },
        { label: t("الحلول", "Solutions"), href: "/solutions" },
        { label: t("أعمالنا", "Work"), href: "/work" },
        { label: t("الباقات", "Packages"), href: "/pricing" },
      ],
    },
    {
      title: t("الشركة", "Company"),
      links: [
        { label: t("من نحن", "About us"), href: "/about" },
        { label: t("منهجية العمل", "Our process"), href: "/process" },
        { label: t("مركز المعرفة", "Insights"), href: "/blog" },
        { label: t("للعملاء خارج مصر", "International clients"), href: "/international" },
        { label: t("الأسئلة الشائعة", "FAQ"), href: "/faq" },
      ],
    },
  ];
  const year = new Date().getFullYear();
  const since = siteConfig.launchYear;
  const years = year > since ? `${since}–${year}` : `${since}`;

  const contacts = [
    { icon: MessageCircleMore, value: siteConfig.contact.phoneDisplay, href: whatsappLink(siteConfig.contact.whatsapp, waMessage), external: true, ltr: true },
    { icon: Mail, value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}`, ltr: true },
    { icon: MapPin, value: en ? siteConfig.contact.locationEn : siteConfig.contact.location },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-brand-800 text-white">
      <div aria-hidden className="absolute -top-40 -start-40 -z-10 size-[460px] rounded-full bg-accent-500/15 blur-[120px]" />

      <Container className="pt-12 pb-8 sm:pt-14">
        {/* الهوية + السوشيال */}
        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-sm">
            <Logo light variant={locale} href={lp(locale, "/")} />
            <p className="mt-4 text-sm leading-7 text-white/70">{en ? siteConfig.taglineEn : siteConfig.tagline}.</p>
          </div>
          <div>
            <p className="text-sm font-bold text-white/80">{t("تابعنا وتواصل معنا", "Follow & reach us")}</p>
            <ul className="mt-3 flex flex-wrap items-center gap-2.5">
              {socials.map(({ label, href, icon: Icon, hover }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={`flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors duration-200 ${hover}`}
                  >
                    <Icon className="size-5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* الروابط + التواصل */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-10 md:grid-cols-[1fr_1fr_1.4fr]">
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3 className="text-sm font-black text-white">{c.title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={lp(locale, l.href)} className="text-white/65 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-black text-white">{t("تواصل معنا", "Contact")}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {contacts.map(({ icon: Icon, value, href, external, ltr }) => {
                const body = (
                  <>
                    <Icon className="size-[18px] shrink-0 text-accent-200" aria-hidden />
                    <span dir={ltr ? "ltr" : undefined}>{value}</span>
                  </>
                );
                return (
                  <li key={value}>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="inline-flex items-center gap-3 text-white/65 transition-colors hover:text-white"
                      >
                        {body}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-3 text-white/65">{body}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* الحقوق */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 pb-20 text-xs text-white/50 sm:flex-row sm:pb-0 sm:pe-20">
          <p>
            © <span className="tabular-nums">{years}</span> {en ? `${siteConfig.nameEn}. All rights reserved.` : `${siteConfig.name}. جميع الحقوق محفوظة.`}
          </p>
          <nav aria-label={t("روابط قانونية", "Legal")} className="flex items-center gap-5">
            <Link href={lp(locale, "/privacy")} className="transition-colors hover:text-white">
              {t("سياسة الخصوصية", "Privacy policy")}
            </Link>
            <Link href={lp(locale, "/terms")} className="transition-colors hover:text-white">
              {t("الشروط والأحكام", "Terms")}
            </Link>
            <a href={en ? "/" : "/en"} hrefLang={en ? "ar" : "en"} lang={en ? "ar" : "en"} className="transition-colors hover:text-white">
              {t("English", "العربية")}
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

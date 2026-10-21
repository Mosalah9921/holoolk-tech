import { getAbout } from "@/content/about";
import { getReasons } from "@/content/why-us";
import { tr, type Locale } from "@/i18n";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { LogoMark } from "@/components/ui/Logo";
import { whatsappLink } from "@/lib/utils";
import { waInquiry } from "@/lib/whatsapp-messages";

/** مين إحنا + ليه تختارنا — في سكشن واحد */
export function About({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const { aboutStory, teamStatement } = getAbout(locale);
  const reasons = getReasons(locale);
  return (
    <Section id="about" aria-labelledby="about-title">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* القصة */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-bold tracking-wide text-brand-700">
            <span className="size-1.5 rounded-full bg-brand-600" aria-hidden />
            {t("قصتنا", "Our story")}
          </p>
          <h2 id="about-title" className="mt-4 text-[1.6rem] leading-[1.45] font-black sm:text-3xl lg:text-[2.1rem]">
            <span className="block">{t("شركة حلول تقنية", "An IT solutions company")}</span>
            <span className="text-gradient block">{t("بمعايير عالمية.", "built to world-class standards.")}</span>
          </h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-slate-600 sm:text-[1.0625rem]">
            {aboutStory.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-8">
            <div className="flex items-center gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-brand-100">
                <LogoMark className="size-8" />
              </span>
              <p className="font-bold text-slate-900">{t(`${siteConfig.name} · تواصل مباشر مع فريق التنفيذ`, `${siteConfig.nameEn} · Direct access to your delivery team`)}</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">{teamStatement}</p>
            <a
              href={whatsappLink(siteConfig.contact.whatsapp, waInquiry(locale))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-xl bg-[#25D366]/10 px-3.5 py-2 text-xs font-bold text-[#0F6E5E] hover:bg-[#25D366]/20"
            >
              {t("تحدّث معنا مباشرة عبر واتساب", "Talk to us directly on WhatsApp")}
            </a>
          </div>

        </div>

        {/* ليه تختارنا */}
        <div>
          <h3 className="flex items-center gap-3 text-base font-black text-slate-900 sm:text-lg">
            <span className="h-px w-8 bg-brand-600" aria-hidden />
            {t("لماذا تختار حلولك تيك؟", "Why choose Holoolk Tech?")}
          </h3>
          <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, description }) => (
              <li key={title} className="border-t border-slate-200 py-5 sm:py-7">
                <div className="flex items-center gap-3 sm:block">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 sm:size-10">
                    <Icon className="size-[1.125rem] sm:size-5" aria-hidden />
                  </span>
                  <h4 className="text-base font-bold sm:mt-4 sm:text-lg">{title}</h4>
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

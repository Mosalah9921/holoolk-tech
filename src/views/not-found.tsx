import Link from "next/link";
import { ArrowLeft, Compass, LayoutGrid, MessageCircleMore, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { lp, tr, type Locale } from "@/i18n";

/** صفحة 404 — بسيطة وتعيد الزائر لمساره (في اللغتين) */
export default function NotFoundView({ locale, inSite = false }: { locale: Locale; inSite?: boolean }) {
  const Root = inSite ? "div" : "main";
  const t = tr(locale);
  const links = [
    { label: t("خدماتنا", "Services"), href: "/services", icon: LayoutGrid },
    { label: t("الحلول حسب المجال", "Solutions by industry"), href: "/solutions", icon: Compass },
    { label: t("أعمالنا", "Our work"), href: "/work", icon: Sparkles },
  ];
  return (
    <Root
      id={inSite ? undefined : "main"}
      className={`relative isolate flex flex-col items-center justify-center px-4 text-center ${inSite ? "min-h-[80dvh] pt-28 pb-16" : "min-h-dvh py-16"}`}
    >
      <div aria-hidden className="bg-grid mask-fade absolute inset-0 -z-10" />
      <div aria-hidden className="absolute top-1/3 left-1/2 -z-10 size-[420px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-[110px]" />

      {!inSite && <Logo variant={locale} href={lp(locale, "/")} />}

      <p dir="ltr" className={`text-gradient ${inSite ? "" : "mt-12"} text-[7rem] leading-none font-black tracking-tight sm:text-[9rem]`}>
        404
      </p>
      <h1 className="mt-6 text-2xl leading-[1.4] font-black text-slate-900 sm:text-3xl">{t("عذراً، هذه الصفحة غير موجودة", "Sorry, this page doesn’t exist")}</h1>
      <p className="mt-3 max-w-md text-base leading-8 text-slate-600">
        {t(
          "ربما تغيّر الرابط أو كُتب بشكل غير صحيح. يمكنك العودة إلى الرئيسية أو تصفّح أحد الأقسام التالية.",
          "The link may have changed or been mistyped. Head back to the homepage or explore one of the sections below.",
        )}
      </p>

      <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
        <ButtonLink href={lp(locale, "/")} size="lg">
          {t("العودة إلى الرئيسية", "Back to homepage")}
          <ArrowLeft className="size-5" aria-hidden />
        </ButtonLink>
        <ButtonLink
          href={whatsappLink(siteConfig.contact.whatsapp, t("مرحباً حلولك تيك، لم أجد الصفحة التي أبحث عنها في موقعكم.", "Hello Holoolk Tech, I couldn't find the page I was looking for on your website."))}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="lg"
        >
          <MessageCircleMore className="size-5 text-[#25D366]" aria-hidden />
          {t("اسألنا عبر واتساب", "Ask us on WhatsApp")}
        </ButtonLink>
      </div>

      <nav aria-label={t("أقسام مقترحة", "Suggested sections")} className="mt-10">
        <ul className="flex flex-wrap justify-center gap-2">
          {links.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <Link
                href={lp(locale, href)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-brand-200 hover:text-brand-700"
              >
                <Icon className="size-4 text-brand-600" aria-hidden />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Root>
  );
}

import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils";
import { lp, tr, type Locale } from "@/i18n";
import { waInquiry } from "@/lib/whatsapp-messages";

/** شريط الدعوة الختامي — يظهر في نهاية معظم الصفحات */
export function CtaBand({ locale = "ar", title, text }: { locale?: Locale; title?: string; text?: string }) {
  const t = tr(locale);
  title ??= t("جاهز لموقع أو نظام مبني حول نشاطك؟", "Ready for a website or system built around your business?");
  text ??= t(
    "تواصل معنا اليوم لمناقشة متطلبات مشروعك والحصول على خطة عمل وتقدير مالي مبدئي.",
    "Talk to us today about your project and get a clear plan and an initial cost estimate.",
  );
  return (
    <section data-cta-band aria-label={t("ابدأ مشروعك", "Start your project")} className="px-3 py-6 sm:px-6 sm:py-10">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-10 sm:rounded-[2.5rem] sm:px-14 sm:py-14 lg:py-16">
        <div aria-hidden className="absolute -top-40 -end-40 -z-10 size-[520px] rounded-full bg-brand-600/40 blur-[120px]" />
        <div aria-hidden className="absolute -bottom-40 -start-20 -z-10 size-[420px] rounded-full bg-accent-500/25 blur-[120px]" />
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl leading-[1.3] font-black tracking-tight text-balance text-white sm:text-[2.6rem] sm:leading-[1.25]">{title}</h2>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">{text}</p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href={lp(locale, "/start")}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-7 font-bold whitespace-nowrap text-slate-900 shadow-lg transition-transform hover:-translate-y-0.5"
            >
              {t("ابدأ مشروعك الآن", "Start your project")}
              <ArrowLeft className="size-5" aria-hidden />
            </Link>
            <a
              href={whatsappLink(siteConfig.contact.whatsapp, waInquiry(locale, t("أرغب في مناقشة فكرة مشروعي والحصول على خطة عمل وعرض مبدئي.", "I'd like to discuss my project idea and get an initial plan and proposal.")))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 px-7 font-bold whitespace-nowrap text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle className="size-5" aria-hidden />
              {t("تواصل عبر واتساب", "Chat on WhatsApp")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

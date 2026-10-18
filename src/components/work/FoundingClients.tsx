import { Handshake, MessageSquareQuote, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { tr, type Locale } from "@/i18n";

/** برنامج شركاء النجاح — عدد محدود من المشاريع بشروط تفضيلية مقابل عرضها كدراسات حالة */
export function FoundingClients({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const perks = locale === "en" ? [
    { icon: Sparkles, title: "Preferential terms", text: "Agreed with you in the consultation, based on your project’s scope." },
    { icon: Handshake, title: "Priority and full focus", text: "Priority scheduling and direct access to the delivery team from kickoff to launch." },
    { icon: MessageSquareQuote, title: "A two-way partnership", text: "Your review after launch, and your project featured among our selected case studies." },
  ] : [
    { icon: Sparkles, title: "شروط تفضيلية", text: "تُحدَّد معك في جلسة الاستشارة وفق حجم مشروعك." },
    { icon: Handshake, title: "أولوية وتركيز كامل", text: "جدولة ذات أولوية وتواصل مباشر مع فريق التنفيذ من البداية حتى الإطلاق." },
    { icon: MessageSquareQuote, title: "شراكة متبادلة", text: "تقييمك بعد الإطلاق، وعرض مشروعك ضمن دراسات الحالة المختارة." },
  ];
  return (
    <Section id="partner-program" aria-labelledby="partner-title" className="pt-0 sm:pt-0 lg:pt-0">
      <div className="ring-gradient overflow-hidden rounded-[2rem] bg-white p-8 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
              <span className="size-1.5 rounded-full bg-brand-600" />
              {t("أماكن محدودة كل ربع سنة", "Limited spots each quarter")}
            </p>
            <h2 id="partner-title" className="mt-4 text-3xl font-black sm:text-4xl">
              {t("برنامج شركاء النجاح.", "The Partner Program.")}
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              {t(
                "نخصّص كل ربع سنة عدداً محدوداً من المشاريع لبرنامج شراكة يحصل فيه العميل على شروط تفضيلية وتركيز كامل من فريقنا، مقابل أن يصبح مشروعه جزءاً من معرض أعمالنا المختار.",
                "Each quarter, we reserve a limited number of projects for our Partner Program: preferential terms and our team’s full focus, in return for featuring the finished project in our curated portfolio.",
              )}
            </p>
            <a
              href={whatsappLink(siteConfig.contact.whatsapp, t("مرحباً حلولك تيك، أرغب في الانضمام إلى برنامج شركاء النجاح.", "Hello Holoolk Tech, I’d like to request a spot in your Partner Program."))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-brand-600 px-6 font-bold text-white shadow-md shadow-brand-600/20 hover:bg-brand-700"
            >
              {t("اطلب الانضمام للبرنامج", "Request a spot")}
            </a>
          </div>
          <ul className="grid gap-3">
            {perks.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-slate-200">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-bold text-slate-900">{title}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

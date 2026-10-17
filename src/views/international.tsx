import { BadgeCheck, CalendarCheck, Clock3, FileSignature, Globe2, KeyRound, Languages, MessageCircleMore, Plus, Wallet } from "lucide-react";
import { getPaymentStages } from "@/content/pricing";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";
import { TimeZoneBoard } from "@/components/remote/TimeZoneBoard";
import { RemoteWork } from "@/components/remote/RemoteWork";
import { pageMeta } from "@/i18n/meta";
import { lp, tr, type Locale } from "@/i18n";

export function internationalMeta(locale: Locale) {
  const t = tr(locale);
  return pageMeta(locale, {
    path: "/international",
    title: t("للعملاء خارج مصر", "International clients"),
    description: t(
      "نعمل عن بُعد مع الشركات في الخليج وأوروبا وخارجها: مواقع عربية وإنجليزية، ساعات عمل متقاطعة، اتفاق مكتوب ودفعات مرحلية.",
      "We work remotely with businesses in the Gulf, Europe and beyond: Arabic and English websites, overlapping hours, a written agreement and milestone payments.",
    ),
  });
}

export default function InternationalView({ locale }: { locale: Locale }) {
  const t = tr(locale);
  const stages = getPaymentStages(locale);

  const reasons = [
    {
      icon: Languages,
      title: t("عربي وإنجليزي باحترافية", "Truly bilingual websites"),
      text: t(
        "مواقع بالعربية والإنجليزية بتصميم صحيح للاتجاهين، ومحتوى مصاغ لكل لغة لا مترجم آلياً.",
        "Arabic and English websites with layouts built properly for both directions, and copy written for each language, not machine-translated.",
      ),
    },
    {
      icon: Clock3,
      title: t("ساعات عمل متقاطعة", "Overlapping working hours"),
      text: t(
        "توقيت القاهرة قريب من الخليج بساعة واحدة أو أقل، ويتقاطع مع صباح أوروبا، فالرد يأتيك في يومك نفسه.",
        "Cairo is within an hour of the Gulf and overlaps with European mornings, so you hear back the same working day.",
      ),
    },
    {
      icon: FileSignature,
      title: t("اتفاق مكتوب قبل البدء", "A written agreement first"),
      text: t(
        "النطاق والمدة والتكلفة ومراحل الدفع مكتوبة وواضحة قبل أي عمل، فلا مفاجآت لاحقاً.",
        "Scope, timeline, cost and payment milestones are put in writing before any work begins, so there are no surprises.",
      ),
    },
    {
      icon: KeyRound,
      title: t("ملكية كاملة باسمك", "Full ownership in your name"),
      text: t(
        "الدومين والاستضافة والحسابات تُسجَّل باسمك، والكود ملكك بالكامل بعد السداد.",
        "Your domain, hosting and accounts are registered in your name, and the code is entirely yours once paid.",
      ),
    },
  ];

  const faq = [
    {
      q: t("هل نحتاج إلى أن نلتقي وجهاً لوجه؟", "Do we need to meet in person?"),
      a: t(
        "لا. ننفّذ المشروع كاملاً عن بُعد عبر الاجتماعات المرئية وواتساب ورابط معاينة حي، وكثير من العملاء يكملون مشاريعهم دون أي لقاء مباشر.",
        "No. We deliver the whole project remotely through video calls, WhatsApp and a live preview link. Most remote projects never need an in-person meeting.",
      ),
    },
    {
      q: t("بأي لغة نتواصل؟", "Which language do we work in?"),
      a: t(
        "بالعربية أو الإنجليزية حسب ما يناسبك، والمستندات والعروض متاحة باللغتين.",
        "Arabic or English, whichever suits you. Proposals and documents are available in both languages.",
      ),
    },
    {
      q: t("كيف يتم الدفع من خارج مصر؟", "How do payments work from outside Egypt?"),
      a: t(
        `على ثلاث مراحل مرتبطة بالإنجاز (${stages.map((s) => `${s.percent}%`).join(" · ")})، وتُوضَّح كل تفاصيل الدفع في العرض المكتوب قبل البدء.`,
        `In three milestones tied to delivery (${stages.map((s) => `${s.percent}%`).join(" · ")}). All payment details are set out in the written proposal before we start.`,
      ),
    },
    {
      q: t("هل تربطون بوابات الدفع المحلية في بلدي؟", "Can you integrate payment gateways in my country?"),
      a: t(
        "نعم في أغلب الحالات. نراجع بوابات الدفع المتاحة في سوقك ومتطلبات التسجيل فيها، ونوضح لك الخيار الأنسب قبل الاتفاق.",
        "In most cases, yes. We review the gateways available in your market and their sign-up requirements, then recommend the best option before we agree on anything.",
      ),
    },
  ];

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("للعملاء خارج مصر", "International clients") }]}
        title={t("من القاهرة، إلى نشاطك أينما كان.", "Built in Cairo. Delivered wherever you are.")}
        description={t(
          "نعمل عن بُعد مع الشركات ورواد الأعمال في الخليج وأوروبا وخارجها. تتواصل مباشرة مع فريق التنفيذ، وتتابع كل مرحلة أونلاين.",
          "We work remotely with companies and founders across the Gulf, Europe and beyond. You talk directly to the team building your project and follow every stage online.",
        )}
        aside={<TimeZoneBoard locale={locale} />}
      >
        <ButtonLink href={lp(locale, "/book")} size="lg">
          <CalendarCheck className="size-5" aria-hidden />
          {t("احجز مكالمة تعارف", "Book an intro call")}
        </ButtonLink>
        <ButtonLink
          href={whatsappLink(siteConfig.contact.whatsapp, t("مرحباً حلولك تيك، أنا من خارج مصر وأرغب في مناقشة مشروع.", "Hello Holoolk Tech, I'm based outside Egypt and I'd like to discuss a project."))}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          size="lg"
        >
          <MessageCircleMore className="size-5 text-[#25D366]" aria-hidden />
          {t("تحدث معنا على واتساب", "Chat on WhatsApp")}
        </ButtonLink>
      </PageHeader>

      <Section id="why-remote" aria-labelledby="why-remote-title" className="pt-0 sm:pt-0">
        <h2 id="why-remote-title" className="sr-only">
          {t("لماذا نناسب العملاء خارج مصر", "Why we’re a good fit for international clients")}
        </h2>
        <ul className="grid gap-px overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, text }) => (
            <li key={title} className="bg-white p-7">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <RemoteWork locale={locale} />

      <Section id="payments" aria-labelledby="payments-title">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-sm font-bold text-brand-600">{t("الدفع والعقود", "Payments & contracts")}</p>
            <h2 id="payments-title" className="mt-2 text-3xl font-black sm:text-4xl">
              {t("دفعات واضحة مرتبطة بالإنجاز.", "Clear payments, tied to progress.")}
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              {t(
                "لا تدفع المبلغ كاملاً مقدماً. تُقسَّم التكلفة على ثلاث مراحل مرتبطة بما يتم إنجازه فعلياً، وكل الشروط مكتوبة قبل البدء.",
                "You never pay everything upfront. The cost is split into three milestones tied to actual progress, with every term in writing before we start.",
              )}
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
              {[
                t("عرض مكتوب بالنطاق والمدة والتكلفة", "A written proposal with scope, timeline and cost"),
                t("فاتورة لكل مرحلة", "An invoice for every milestone"),
                t("لا تكاليف خفية أو رسوم مفاجئة", "No hidden costs or surprise fees"),
              ].map((x) => (
                <li key={x} className="flex items-center gap-2.5">
                  <BadgeCheck className="size-4.5 shrink-0 text-brand-600" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <ol className="grid gap-3 sm:grid-cols-3">
            {stages.map((s, i) => (
              <li key={s.label} className="flex flex-col rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                <span className="flex items-center justify-between">
                  <Wallet className="size-5 text-brand-600" aria-hidden />
                  <span className="text-xs font-bold text-slate-500">{t(`المرحلة ${i + 1}`, `Stage ${i + 1}`)}</span>
                </span>
                <span dir="ltr" className="mt-4 self-start text-4xl font-black text-slate-900 tabular-nums">
                  {s.percent}%
                </span>
                <span className="mt-2 text-sm leading-6 text-slate-600">{s.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="international-faq" className="bg-white">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            title={t("أسئلة العملاء من الخارج", "Questions from international clients")}
            description={t("وإن كان لديك سؤال آخر، راسلنا مباشرة.", "Have another question? Message us directly.")}
            className="mb-0"
          >
            <ButtonLink href={lp(locale, "/faq")} variant="secondary">
              <Globe2 className="size-4" aria-hidden />
              {t("كل الأسئلة", "All questions")}
            </ButtonLink>
          </SectionHeading>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {faq.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-start font-bold text-slate-900">
                  {item.q}
                  <Plus className="size-5 shrink-0 text-brand-600 transition-transform group-open:rotate-45" aria-hidden />
                </summary>
                <p className="-mt-1 pb-5 leading-8 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        locale={locale}
        title={t("مشروعك لا يحتاج أن تكون في القاهرة.", "Your project doesn’t need you in Cairo.")}
        text={t(
          "أخبرنا بفكرتك، وسنرسل لك خلال 24 ساعة خطة مبدئية ومقترحاً واضحاً، أينما كنت.",
          "Tell us about your idea and we’ll send you an initial plan and a clear proposal within 24 hours, wherever you are.",
        )}
      />
    </>
  );
}

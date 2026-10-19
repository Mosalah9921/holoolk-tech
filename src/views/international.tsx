import {
  BadgeCheck,
  CalendarCheck,
  Clock3,
  FileSignature,
  FileText,
  Globe2,
  ImageIcon,
  KeyRound,
  Languages,
  MessageCircleMore,
  PenTool,
  Plus,
  Rocket,
  UserRound,
  Video,
  Wallet,
} from "lucide-react";
import { getPaymentStages } from "@/content/pricing";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";
import { TimeZoneBoard } from "@/components/remote/TimeZoneBoard";
import { pageMeta } from "@/i18n/meta";
import { lp, tr, type Locale } from "@/i18n";

export function internationalMeta(locale: Locale) {
  const t = tr(locale);
  return pageMeta(locale, {
    path: "/international",
    title: t("للعملاء خارج مصر", "International clients"),
    description: t(
      "نعمل عن بُعد مع الشركات في الخليج وأوروبا وخارجها: مواقع بالعربية والإنجليزية وأي لغة يحتاجها سوقك، ساعات عمل متقاطعة، اتفاق مكتوب ودفعات مرحلية.",
      "Remote web development for businesses in the Gulf, Europe and beyond: multilingual websites, overlapping hours, a written agreement and milestone payments.",
    ),
  });
}

/** عنوان قسم موحّد: شارة صغيرة + عنوان من سطرين (الثاني بالتدرج) + وصف */
function Heading({ id, badge, line1, line2, text, center }: { id: string; badge: string; line1: string; line2: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto mb-8 max-w-2xl text-center sm:mb-10" : "mb-8 max-w-2xl sm:mb-10"}>
      <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-bold tracking-wide text-brand-700">
        <span className="size-1.5 rounded-full bg-brand-600" aria-hidden />
        {badge}
      </p>
      <h2 id={id} className="mt-4 text-[1.75rem] leading-[1.4] font-black sm:text-4xl lg:text-[2.5rem]">
        <span className="block">{line1}</span>
        <span className="text-gradient block text-balance">{line2}</span>
      </h2>
      {text && <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{text}</p>}
    </div>
  );
}

export default function InternationalView({ locale }: { locale: Locale }) {
  const t = tr(locale);
  const stages = getPaymentStages(locale);

  const reasons = [
    {
      icon: Languages,
      title: t("عربي وإنجليزي وأي لغة", "Arabic, English and beyond"),
      text: t(
        "نكتب المحتوى العربي والإنجليزي بأنفسنا، ونبني موقعك ليدعم أي لغة يحتاجها سوقك.",
        "We write Arabic and English copy ourselves, and build your site to support any language your market needs.",
      ),
    },
    {
      icon: Clock3,
      title: t("ساعات عمل متقاطعة", "Overlapping working hours"),
      text: t(
        "توقيت القاهرة قريب من الخليج بساعة أو أقل، ويتقاطع مع صباح أوروبا، فيصلك الرد في يوم عملك نفسه.",
        "Cairo is within an hour of the Gulf and overlaps with European mornings, so you hear back the same working day.",
      ),
    },
    {
      icon: FileSignature,
      title: t("اتفاق مكتوب قبل البدء", "A written agreement first"),
      text: t(
        "النطاق والمدة والتكلفة ومراحل الدفع مكتوبة ومعتمدة من الطرفين قبل أي عمل.",
        "Scope, timeline, cost and payment milestones are agreed in writing by both sides before any work begins.",
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

  const journey = [
    {
      icon: Video,
      title: t("مكالمة تعارف مجانية", "A free intro call"),
      text: t(
        "مكالمة مرئية أو على واتساب نفهم فيها نشاطك وسوقك وما تريد أن يحققه موقعك.",
        "A video or WhatsApp call to understand your business, your market and what your website needs to achieve.",
      ),
      tag: t("Google Meet · Zoom · واتساب", "Google Meet · Zoom · WhatsApp"),
    },
    {
      icon: FileText,
      title: t("خطة وعرض مكتوب", "A written plan and proposal"),
      text: t(
        "تصلك خلال 24 ساعة خطة مبدئية، ثم عرض مكتوب بالنطاق والمدة والتكلفة ومراحل الدفع.",
        "Within 24 hours you get an initial plan, followed by a written proposal covering scope, timeline, cost and milestones.",
      ),
      tag: t("خلال 24 ساعة", "Within 24 hours"),
    },
    {
      icon: PenTool,
      title: t("تصميم تراجعه بالتعليقات", "Design you review with comments"),
      text: t(
        "بعد الاعتماد والدفعة الأولى نبدأ التصميم، وتعلّق على أي جزء منه مباشرة من رابط.",
        "Once approved and the first payment is made, we start designing. You comment on any part directly from a link.",
      ),
      tag: "Figma",
    },
    {
      icon: Globe2,
      title: t("تطوير بمتابعة أسبوعية", "Development with weekly updates"),
      text: t(
        "تتابع موقعك على رابط معاينة حي، ويصلك كل أسبوع ملخص بما تم وما التالي.",
        "Follow your site on a live preview link, with a weekly summary of what’s done and what’s next.",
      ),
      tag: t("رابط معاينة حي", "Live preview link"),
    },
    {
      icon: Rocket,
      title: t("إطلاق وتسليم موثّق", "Launch and documented handover"),
      text: t(
        "نطلق الموقع على دومينك، ونسلّمك كل الحسابات باسمك مع تدريب مسجّل ودعم بعد الإطلاق.",
        "We launch on your domain and hand over every account in your name, with recorded training and post-launch support.",
      ),
      tag: t("ملكية كاملة", "Full ownership"),
    },
  ];

  const needs = [
    { icon: UserRound, title: t("شخص واحد للتواصل", "One point of contact"), text: t("يتابع معنا ويعتمد القرارات.", "Who follows up and signs off decisions.") },
    { icon: ImageIcon, title: t("الشعار والصور", "Your logo and photos"), text: t("إن وُجدت، وإلا نقترح البديل المناسب.", "If you have them; otherwise we suggest alternatives.") },
    { icon: FileText, title: t("معلومات نشاطك", "Your business details"), text: t("ونتولى معك صياغة النصوص.", "We help you shape them into website copy.") },
    { icon: Globe2, title: t("الدومين", "A domain"), text: t("وإن لم يكن لديك، نسجّله باسمك.", "If you don’t have one, we register it in your name.") },
  ];

  const faq = [
    {
      q: t("هل نحتاج إلى أن نلتقي وجهاً لوجه؟", "Do we need to meet in person?"),
      a: t(
        "لا. ننفّذ المشروع كاملاً عن بُعد عبر الاجتماعات المرئية وواتساب ورابط معاينة حي، وأغلب المشاريع عن بُعد لا تحتاج إلى أي لقاء مباشر.",
        "No. We deliver the whole project remotely through video calls, WhatsApp and a live preview link. Most remote projects never need an in-person meeting.",
      ),
    },
    {
      q: t("كم يستغرق الرد على رسائلي؟", "How quickly do you reply?"),
      a: t(
        "نرد خلال ساعات العمل بتوقيت القاهرة، من السبت إلى الخميس، وغالباً في اليوم نفسه. وفي المراحل المهمة نتفق على مواعيد ثابتة للمتابعة.",
        "We reply during Cairo business hours, Saturday to Thursday, usually the same day. At key stages we also agree on fixed check-in times.",
      ),
    },
    {
      q: t("بأي لغة نتواصل؟", "Which language do we work in?"),
      a: t(
        "بالعربية أو الإنجليزية حسب ما يناسبك، والعروض والمستندات متاحة باللغتين.",
        "Arabic or English, whichever suits you. Proposals and documents are available in both languages.",
      ),
    },
    {
      q: t("هل تبنون مواقع بلغات غير العربية والإنجليزية؟", "Do you build websites in languages other than Arabic and English?"),
      a: t(
        "نعم، مثل الفرنسية أو الألمانية أو الإسبانية أو التركية، برابط مستقل وظهور في جوجل لكل لغة. نكتب المحتوى العربي والإنجليزي بأنفسنا، أما اللغات الأخرى فنعتمد فيها على ترجمة احترافية يراجعها متحدث أصلي، أو على محتوى يجهّزه فريقك.",
        "Yes, such as French, German, Spanish or Turkish, each with its own URL and search visibility. We write Arabic and English copy ourselves; for other languages we use professional translation reviewed by a native speaker, or content prepared by your team.",
      ),
    },
    {
      q: t("كيف يتم الدفع من خارج مصر؟", "How do payments work from outside Egypt?"),
      a: t(
        `على ثلاث مراحل مرتبطة بالإنجاز (${stages.map((s) => `${s.percent}%`).join(" · ")})، والعملة وطريقة التحويل نتفق عليهما معك ونكتبهما في العرض قبل البدء.`,
        `In three milestones tied to delivery (${stages.map((s) => `${s.percent}%`).join(" · ")}). The currency and transfer method are agreed with you and written into the proposal before we start.`,
      ),
    },
    {
      q: t("هل تربطون بوابات الدفع المحلية في بلدي؟", "Can you integrate payment gateways in my country?"),
      a: t(
        "نعم في أغلب الحالات. نراجع بوابات الدفع المتاحة في سوقك ومتطلبات التسجيل فيها، ونوضح لك الخيار الأنسب قبل الاتفاق.",
        "In most cases, yes. We review the gateways available in your market and their sign-up requirements, then recommend the best option before we agree on anything.",
      ),
    },
    {
      q: t("ماذا يحدث بعد إطلاق الموقع؟", "What happens after launch?"),
      a: t(
        "يشمل كل مشروع فترة دعم فني بعد الإطلاق تختلف حسب الباقة، ثم يمكنك الاستمرار معنا في خطة صيانة ومتابعة، أو إدارة الموقع بنفسك بعد التدريب.",
        "Every project includes a post-launch support period that depends on the package. After that you can continue with a maintenance plan, or run the site yourself after training.",
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
          "نعمل عن بُعد مع الشركات ورواد الأعمال في الخليج وأوروبا وخارجها. تتواصل مباشرة مع فريق التنفيذ، وتتابع كل مرحلة أونلاين دون الحاجة إلى السفر.",
          "We work remotely with companies and founders across the Gulf, Europe and beyond. You talk directly to the team building your project and follow every stage online, no travel needed.",
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

      {/* ===== لماذا نناسبك ===== */}
      <Section id="why-remote" aria-labelledby="why-remote-title" className="pt-0 sm:pt-0 lg:pt-0">
        <h2 id="why-remote-title" className="sr-only">
          {t("لماذا نناسب العملاء خارج مصر", "Why we’re a good fit for international clients")}
        </h2>
        <ul className="grid gap-px overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 bg-white p-5 sm:block sm:p-6 lg:p-7">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-600 to-brand-800 text-white shadow-md shadow-brand-600/20">
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-bold sm:mt-5 sm:text-lg">{title}</h3>
                <p className="mt-1.5 text-sm leading-7 text-slate-600">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* ===== رحلة المشروع ===== */}
      <Section id="journey" aria-labelledby="journey-title" className="bg-white">
        <Heading
          id="journey-title"
          center
          badge={t("خطوات العمل", "How it works")}
          line1={t("من أول رسالة", "From your first message")}
          line2={t("إلى إطلاق موقعك.", "to your website’s launch.")}
          text={t(
            "خمس خطوات واضحة تعرفها من البداية، وتتابع كلاً منها وأنت في بلدك.",
            "Five clear steps you know from day one, each one followed from wherever you are.",
          )}
        />
        <ol className="relative grid gap-4 lg:grid-cols-5 lg:gap-3">
          {/* خط الربط بين الخطوات (كمبيوتر) */}
          <span aria-hidden className="absolute inset-x-[10%] top-7 hidden h-px bg-linear-to-r from-brand-200 via-brand-300 to-brand-200 lg:block" />
          {journey.map(({ icon: Icon, title, text, tag }, i) => (
            <li key={title} className="relative flex gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50/60 p-5 lg:flex-col lg:gap-0 lg:border-0 lg:bg-transparent lg:p-2 lg:text-center">
              <span className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-md ring-1 ring-slate-200 lg:mx-auto">
                <Icon className="size-6" aria-hidden />
                <span className="absolute -top-2 -end-2 flex size-6 items-center justify-center rounded-full bg-brand-600 text-[11px] font-black text-white ring-2 ring-white tabular-nums">
                  {i + 1}
                </span>
              </span>
              <div className="min-w-0 lg:mt-5">
                <h3 className="text-base font-bold text-slate-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-7 text-slate-600">{text}</p>
                <p className="mt-3 inline-flex rounded-lg bg-white px-2 py-0.5 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">{tag}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ===== الدفع + ما نحتاجه منك ===== */}
      <Section id="payments" aria-labelledby="payments-title">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div>
            <Heading
              id="payments-title"
              badge={t("الدفع والعقود", "Payments & contracts")}
              line1={t("دفعات واضحة،", "Clear payments,")}
              line2={t("مرتبطة بالإنجاز.", "tied to progress.")}
              text={t(
                "لا تدفع المبلغ كاملاً مقدماً. تُقسَّم التكلفة على ثلاث مراحل مرتبطة بما يُنجز فعلياً، وكل الشروط مكتوبة قبل البدء.",
                "You never pay everything upfront. The cost is split into three milestones tied to actual progress, with every term in writing before we start.",
              )}
            />
            <ul className="-mt-2 space-y-2.5 text-sm text-slate-700 sm:text-[0.9375rem]">
              {[
                t("عرض مكتوب بالنطاق والمدة والتكلفة", "A written proposal with scope, timeline and cost"),
                t("العملة وطريقة التحويل يُتفق عليهما مسبقاً", "Currency and transfer method agreed upfront"),
                t("فاتورة لكل مرحلة، ولا رسوم مفاجئة", "An invoice for every milestone, no surprise fees"),
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
              <li key={s.label} className="flex items-center gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:flex-col sm:items-start sm:gap-0 sm:p-6">
                <span dir="ltr" className="w-16 shrink-0 text-3xl font-black text-slate-900 tabular-nums sm:order-2 sm:mt-4 sm:w-auto sm:text-4xl">
                  {s.percent}%
                </span>
                <span className="flex min-w-0 flex-col sm:contents">
                  <span className="flex items-center gap-2 sm:order-1 sm:w-full sm:justify-between">
                    <Wallet className="hidden size-5 text-brand-600 sm:block" aria-hidden />
                    <span className="text-xs font-bold text-slate-500">{t(`المرحلة ${i + 1}`, `Stage ${i + 1}`)}</span>
                  </span>
                  <span className="mt-0.5 text-sm leading-6 text-slate-700 sm:order-3 sm:mt-2 sm:text-slate-600">{s.label}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* ما نحتاجه منك للبدء */}
        <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white p-5 sm:mt-12 sm:p-7">
          <h3 className="flex items-center gap-2 text-lg font-black text-slate-900">
            <span className="h-px w-6 bg-brand-600" aria-hidden />
            {t("ما نحتاجه منك للبدء", "What we need from you to start")}
          </h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {needs.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-slate-900">{title}</span>
                  <span className="mt-0.5 block text-sm leading-6 text-slate-600">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ===== الأسئلة ===== */}
      <Section id="international-faq" className="bg-white">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            title={t("أسئلة العملاء من الخارج", "Questions from international clients")}
            description={t("وإن كان لديك سؤال آخر، راسلنا مباشرة.", "Have another question? Message us directly.")}
            className="mb-0 md:flex-col md:items-start md:justify-start lg:sticky lg:top-28 lg:self-start"
          >
            <ButtonLink href={lp(locale, "/faq")} variant="secondary">
              <Globe2 className="size-4" aria-hidden />
              {t("كل الأسئلة", "All questions")}
            </ButtonLink>
          </SectionHeading>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {faq.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-start font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
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

import { ClipboardCheck, FileText, PenTool, Link2, MessageCircleMore, Video, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { tr, type Locale } from "@/i18n";

type Item = { icon: LucideIcon; tool: string; title: { ar: string; en: string }; text: { ar: string; en: string } };

/** أدوات العمل عن بُعد — كل أداة مربوطة بلحظة في المشروع */
const items: Item[] = [
  {
    icon: Video,
    tool: "Google Meet · Zoom",
    title: { ar: "اجتماع انطلاق مرئي", en: "A kickoff video call" },
    text: {
      ar: "نبدأ بجلسة مرئية نفهم فيها نشاطك وأهدافك، ونتفق على النطاق والجدول الزمني.",
      en: "We start with a video session to understand your business and goals, and agree on scope and timeline.",
    },
  },
  {
    icon: MessageCircleMore,
    tool: "WhatsApp",
    title: { ar: "قناة تواصل مباشرة", en: "A direct line to your team" },
    text: {
      ar: "محادثة واحدة للمشروع مع فريق التنفيذ مباشرة، والرد خلال ساعات العمل.",
      en: "One project chat directly with the delivery team, with replies during business hours.",
    },
  },
  {
    icon: PenTool,
    tool: "Figma",
    title: { ar: "مراجعة التصميم بالتعليقات", en: "Design review with comments" },
    text: {
      ar: "تفتح التصميم من رابط وتعلّق على أي جزء مباشرة، دون اجتماعات طويلة.",
      en: "Open the design from a link and comment on any part of it directly, no long meetings needed.",
    },
  },
  {
    icon: Link2,
    tool: "Live preview",
    title: { ar: "رابط معاينة حي", en: "A live preview link" },
    text: {
      ar: "تتابع موقعك وهو يُبنى من هاتفك أو حاسوبك، وتجرّب كل جزء فور جاهزيته.",
      en: "Watch your website take shape from your phone or laptop, and try each part as soon as it’s ready.",
    },
  },
  {
    icon: ClipboardCheck,
    tool: "Weekly update",
    title: { ar: "ملخص تقدم أسبوعي", en: "A weekly progress summary" },
    text: {
      ar: "رسالة مكتوبة كل أسبوع: ما تم إنجازه، وما التالي، وما نحتاجه منك.",
      en: "A short written update every week: what’s done, what’s next and anything we need from you.",
    },
  },
  {
    icon: FileText,
    tool: "Handover",
    title: { ar: "تسليم موثّق", en: "A documented handover" },
    text: {
      ar: "تسليم كل الحسابات والصلاحيات باسمك، مع تدريب مسجّل تعود إليه في أي وقت.",
      en: "Every account and access handed over in your name, plus a recorded training session you can revisit anytime.",
    },
  },
];

export function RemoteWork({ locale = "ar", className = "bg-white" }: { locale?: Locale; className?: string }) {
  const t = tr(locale);
  return (
    <Section id="remote" aria-labelledby="remote-title" className={className}>
      <SectionHeading
        id="remote-title"
        title={t("كيف نعمل معك عن بُعد", "How we work with you remotely")}
        description={t(
          "مشروعك بالكامل أونلاين، ومع ذلك تعرف في كل لحظة أين وصلنا. هذه الأدوات التي نستخدمها في كل مرحلة.",
          "Your whole project runs online, yet you always know exactly where things stand. These are the tools we use at every stage.",
        )}
      />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, tool, title, text }, i) => (
          <li key={tool} className="relative flex flex-col rounded-[1.5rem] border border-slate-200 bg-slate-50/60 p-6 transition-colors hover:border-brand-200 hover:bg-white">
            <div className="flex items-center justify-between gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/20">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="text-xs font-black text-slate-500 tabular-nums" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-bold">{title[locale]}</h3>
            <p className="mt-1.5 flex-1 text-sm leading-7 text-slate-600">{text[locale]}</p>
            <p dir="ltr" className="mt-4 self-start rounded-lg bg-white px-2 py-0.5 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
              {tool}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

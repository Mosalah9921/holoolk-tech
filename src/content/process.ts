import { Headphones, MessagesSquare, PenTool, Rocket, Terminal, type LucideIcon } from "lucide-react";

/** خطوات طريقة العمل */
export type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
};

export const steps: Step[] = [
  {
    icon: MessagesSquare,
    title: "الاستماع والتحليل",
    description: "جلسة نتعرف فيها على نشاطك وجمهورك وأهدافك، ونتفق على نطاق العمل والجدول الزمني.",
    duration: "اليوم الأول",
    deliverables: ["ملخص المتطلبات والأهداف", "نطاق العمل والجدول الزمني"],
  },
  {
    icon: PenTool,
    title: "التخطيط والتصميم",
    description: "نبني هيكل الموقع ونصمم الواجهات، ونراجعها معك قبل البدء في البرمجة.",
    duration: "2–5 أيام",
    deliverables: ["خريطة الموقع وهيكل الصفحات", "تصميم الواجهات على Figma", "جولة مراجعة واعتماد"],
  },
  {
    icon: Terminal,
    title: "التطوير",
    description: "نحوّل التصميم إلى موقع سريع ومتجاوب، وتتابع التقدم عبر رابط تجريبي.",
    duration: "حسب الباقة",
    deliverables: ["رابط تجريبي مباشر", "تحديثات دورية بسير العمل"],
  },
  {
    icon: Rocket,
    title: "الاختبار والإطلاق",
    description: "نختبر الموقع على مختلف الأجهزة والمتصفحات، ثم نطلقه على نطاقك الخاص.",
    duration: "يوم إلى يومين",
    deliverables: ["اختبار على الأجهزة والمتصفحات", "ربط النطاق وشهادة الأمان SSL", "إعداد أدوات التحليل"],
  },
  {
    icon: Headphones,
    title: "المتابعة والدعم",
    description: "دعم فني بعد التسليم، وتدريب يمكّنك من إدارة المحتوى بنفسك.",
    duration: "مستمر",
    deliverables: ["جلسة تدريب على إدارة الموقع", "دعم فني طوال فترة الباقة"],
  },
];

/* ============================ English ============================ */

const stepsEnText: Pick<Step, "title" | "description" | "duration" | "deliverables">[] = [
  {
    title: "Discovery",
    description: "A session to understand your business, audience and goals, where we agree on scope and timeline.",
    duration: "Day one",
    deliverables: ["Requirements and goals summary", "Scope of work and timeline"],
  },
  {
    title: "Planning & design",
    description: "We map out the site structure and design the interfaces, then review them with you before any coding starts.",
    duration: "2–5 days",
    deliverables: ["Sitemap and page structure", "Interface design in Figma", "Review and approval round"],
  },
  {
    title: "Development",
    description: "We turn the design into a fast, responsive website, and you follow progress through a live preview link.",
    duration: "Per package",
    deliverables: ["Live preview link", "Regular progress updates"],
  },
  {
    title: "Testing & launch",
    description: "We test across devices and browsers, then launch on your own domain.",
    duration: "1–2 days",
    deliverables: ["Cross-device and browser testing", "Domain and SSL setup", "Analytics setup"],
  },
  {
    title: "Support & growth",
    description: "Support after delivery, plus training so you can manage your content yourself.",
    duration: "Ongoing",
    deliverables: ["Website management training session", "Support throughout your package"],
  },
];

export const stepsEn: Step[] = steps.map((s, i) => ({ ...s, ...stepsEnText[i] }));

export const getSteps = (locale: "ar" | "en") => (locale === "en" ? stepsEn : steps);

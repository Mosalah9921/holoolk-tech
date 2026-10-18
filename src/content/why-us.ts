import { Code2, FileCheck2, Gauge, Languages, MessagesSquare, Wrench, type LucideIcon } from "lucide-react";

/** "لماذا تختارنا" — مزايا حقيقية يمكن الالتزام بها */
export type Reason = { icon: LucideIcon; title: string; description: string };

export const reasons: Reason[] = [
  {
    icon: MessagesSquare,
    title: "تواصل مباشر مع فريق التنفيذ",
    description: "دون وسطاء أو طبقات إدارية؛ الفريق الذي يستمع إلى متطلباتك هو نفسه من ينفّذها.",
  },
  {
    icon: Code2,
    title: "تطوير مخصص لا قوالب جاهزة",
    description: "نصمم موقعك ونبرمجه من الصفر حول طبيعة نشاطك، بتقنيات حديثة مثل Next.js تمنحه السرعة والأمان.",
  },
  {
    icon: Languages,
    title: "تجربة عربية أصيلة",
    description: "اتجاه صحيح من اليمين إلى اليسار وخطوط عربية مدروسة، لا مجرد ترجمة لموقع أجنبي.",
  },
  {
    icon: Gauge,
    title: "أداء عالٍ منذ اليوم الأول",
    description: "السرعة جزء أصيل من التصميم، وليست تحسيناً يُضاف بعد التسليم.",
  },
  {
    icon: FileCheck2,
    title: "اتفاق واضح وموثّق",
    description: "نطاق العمل والجدول الزمني محددان كتابياً قبل البدء، دون مفاجآت لاحقة.",
  },
  {
    icon: Wrench,
    title: "دعم مستمر بعد الإطلاق",
    description: "دعم فني ضمن باقتك، وتدريب يمكّنك من إدارة محتوى موقعك باستقلالية.",
  },
];

/* ============================ English ============================ */

const reasonsEnText: Pick<Reason, "title" | "description">[] = [
  { title: "Direct access to your delivery team", description: "No middlemen or layers of account managers: the team that hears your requirements is the team that builds them." },
  { title: "Custom-built, never templates", description: "We design and code your site from scratch around your business, using modern tech like Next.js for speed and security." },
  { title: "Truly Arabic-first", description: "Proper right-to-left layouts and carefully chosen Arabic typography, not a translated foreign website." },
  { title: "High performance from day one", description: "Speed is part of the design, not a patch applied after delivery." },
  { title: "A clear, written agreement", description: "Scope and timeline agreed in writing before we start, so there are no surprises later." },
  { title: "Ongoing support after launch", description: "Support included in your package, plus training so you can manage your content independently." },
];

export const reasonsEn: Reason[] = reasons.map((r, i) => ({ ...r, ...reasonsEnText[i] }));

export const getReasons = (locale: "ar" | "en") => (locale === "en" ? reasonsEn : reasons);

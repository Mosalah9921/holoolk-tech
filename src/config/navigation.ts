import {
  Newspaper,
  CalendarCheck,
  Globe2,
  ClipboardList,
  Eye,
  HelpCircle,
  Layers,
  LayoutGrid,
  Mail,
  Rocket,
  ScanSearch,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { lp } from "@/i18n";

/**
 * خريطة الموقع — منها بتتبني القائمة العلوية (والقوائم المنسدلة)، والفوتر، والبحث السريع (Ctrl+K).
 * لإضافة صفحة جديدة: أضفها هنا في المجموعة المناسبة.
 */
export type NavLink = { label: string; href: string; description?: string; icon?: LucideIcon; /** صورة أيقونة ثلاثية الأبعاد (اختياري) */ image?: string };
export type NavGroup = {
  label: string;
  href?: string;
  /** وصف قصير يظهر في رأس القائمة المنسدلة */
  intro?: string;
  items?: NavLink[];
  /** كارت مميز داخل القائمة المنسدلة */
  feature?: { title: string; text: string; href: string; cta: string };
  /** عرض مختصر: اسم + أيقونة فقط بدون وصف */
  compact?: boolean;
  /** رابط بارز أسفل عناصر القائمة المنسدلة (بدلاً من «عرض الكل» في الأعلى) */
  footerLink?: { label: string; href: string };
};

const bySlug = <T extends { id: string }>(list: T[], id: string) => {
  const item = list.find((x) => x.id === id);
  if (!item) throw new Error(`navigation: "${id}" not found`);
  return item;
};

type L = "ar" | "en";

/** قائمة الخدمات: نصوص مختصرة مخصصة للقائمة (بالترتيب) */
const serviceMenu = [
  { id: "web-development", label: { ar: "مواقع وهوية الشركات", en: "Business websites" }, description: { ar: "واجهات احترافية تمثل علامتك", en: "Professional sites that represent your brand" } },
  { id: "e-commerce", label: { ar: "المتاجر الإلكترونية", en: "Online stores" }, description: { ar: "تجربة شراء سريعة ودفع آمن", en: "Fast checkout and secure payments" } },
  { id: "web-apps", label: { ar: "الأنظمة ولوحات التحكم", en: "Systems & dashboards" }, description: { ar: "أتمتة العمليات والإدارة", en: "Automate operations and management" } },
  { id: "ui-ux-design", label: { ar: "تصميم واجهات UI/UX", en: "UI/UX design" }, description: { ar: "تصاميم عصرية وسهلة الاستخدام", en: "Modern, easy-to-use interfaces" } },
  { id: "landing-pages", label: { ar: "صفحات الهبوط", en: "Landing pages" }, description: { ar: "مخصصة لرفع تحويل الإعلانات", en: "Built to convert your ad traffic" } },
  { id: "maintenance-support", label: { ar: "الصيانة والدعم", en: "Care & support" }, description: { ar: "متابعة وحماية بعد الإطلاق", en: "Stability, security and peace of mind" } },
];

/** قائمة الحلول: أهم 6 مجالات فقط (والباقي في صفحة /solutions) */
const solutionMenu = [
  { id: "restaurants", label: { ar: "المطاعم والكافيهات", en: "Restaurants & cafés" } },
  { id: "clinics", label: { ar: "العيادات والمراكز الطبية", en: "Clinics & medical centers" } },
  { id: "stores", label: { ar: "المتاجر والعلامات التجارية", en: "Retail & brands" } },
  { id: "real-estate", label: { ar: "العقارات والتطوير العقاري", en: "Real estate & development" } },
  { id: "companies", label: { ar: "الشركات وبوابات الأعمال", en: "Business portals & CRM" } },
  { id: "education", label: { ar: "التعليم والتدريب", en: "Education & training" } },
];

export function getMainNav(locale: L = "ar"): NavGroup[] {
  const t = <T,>(ar: T, en: T) => (locale === "en" ? en : ar);
  const groups: NavGroup[] = [
    {
      label: t("الخدمات", "Services"),
      href: "/services",
      intro: t("خدماتنا الأساسية", "Our core services"),
      footerLink: { label: t("عرض كافة الخدمات", "View all services"), href: "/services" },
      items: serviceMenu.map(({ id, label, description }) => ({ label: label[locale], description: description[locale], href: `/services/${id}`, icon: bySlug(services, id).icon, image: bySlug(services, id).image })),
      feature: {
        title: t("عاين موقعك قبل التنفيذ", "Preview your website first"),
        text: t("تصوّر مبدئي لموقع نشاطك خلال ثوانٍ.", "See a first concept of your business website in seconds."),
        href: "/tools/preview",
        cta: t("جرّب المعاينة", "Try the preview"),
      },
    },
    {
      label: t("الحلول", "Solutions"),
      href: "/solutions",
      intro: t("أبرز المجالات التي نخدمها", "Key industries we serve"),
      items: solutionMenu.map(({ id, label }) => ({ label: label[locale], href: `/solutions/${id}`, icon: bySlug(solutions, id).icon, image: bySlug(solutions, id).image })),
      compact: true,
      footerLink: {
        label: t(`استكشف كافة القطاعات والحلول (${solutions.length} مجالاً)`, `Explore all ${solutions.length} industries and solutions`),
        href: "/solutions",
      },
      feature: {
        title: t("لم تجد مجالك؟", "Don't see your industry?"),
        text: t("نصمم حلولاً مخصصة لأي نشاط.", "We design custom solutions for any business."),
        href: "/start",
        cta: t("ابدأ مشروعك", "Start your project"),
      },
    },
    { label: t("أعمالنا", "Work"), href: "/work" },
    { label: t("الباقات", "Pricing"), href: "/pricing" },
    {
      label: t("الشركة", "Company"),
      intro: t("تعرّف علينا", "Get to know us"),
      items: [
        { label: t("من نحن", "About us"), href: "/about", description: t("قصتنا ومبادئنا ولماذا تختارنا", "Our story, principles and why clients choose us"), icon: Users },
        { label: t("منهجية العمل", "Our process"), href: "/process", description: t("المراحل والمخرجات بالتفصيل", "Every stage and deliverable, in detail"), icon: Workflow },
        { label: t("مركز المعرفة", "Insights"), href: "/blog", description: t("أدلة عملية لاتخاذ قرارات رقمية أفضل", "Practical guides for better digital decisions"), icon: Newspaper },
        { label: t("للعملاء خارج مصر", "International clients"), href: "/international", description: t("كيف نعمل معك عن بُعد أينما كنت", "How we work with you remotely, anywhere"), icon: Globe2 },
        { label: t("الأسئلة الشائعة", "FAQ"), href: "/faq", description: t("إجابات عن أكثر الأسئلة تكراراً", "Answers to the questions we hear most"), icon: HelpCircle },
        { label: t("تواصل معنا", "Contact"), href: "/contact", description: t("كل قنوات التواصل في مكان واحد", "Every way to reach us, in one place"), icon: Mail },
      ],
    },
    {
      label: t("أدوات مجانية", "Free tools"),
      intro: t("أدوات مجانية قبل البدء", "Free tools to help you decide"),
      items: [
        { label: t("معاينة موقعك", "Website preview"), href: "/tools/preview", description: t("شاهد تصوّراً أولياً لموقع نشاطك", "See a first concept of your website"), icon: Eye },
        { label: t("تقييم موقعك الحالي", "Website audit"), href: "/tools/audit", description: t("تقرير مجاني بأبرز نقاط التحسين", "A free report on what to improve"), icon: ScanSearch },
        { label: t("مخطِّط المشروع", "Project planner"), href: "/start", description: t("حدّد احتياجاتك خطوة بخطوة", "Define your needs step by step"), icon: ClipboardList },
        { label: t("احجز استشارة مجانية", "Book a free consultation"), href: "/book", description: t("اختر الموعد المناسب لجلسة 30 دقيقة", "Pick a time for a 30-minute session"), icon: CalendarCheck },
      ],
    },
  ];
  // روابط اللغة الحالية (/en/... للإنجليزية)
  const l = (h: string) => lp(locale, h);
  return groups.map((g) => ({
    ...g,
    href: g.href && l(g.href),
    footerLink: g.footerLink && { ...g.footerLink, href: l(g.footerLink.href) },
    feature: g.feature && { ...g.feature, href: l(g.feature.href) },
    items: g.items?.map((i) => ({ ...i, href: l(i.href) })),
  }));
}

/** للتوافق مع الكود القديم */
export const mainNav = getMainNav("ar");

/** روابط إضافية للفوتر */
export const footerExtra: NavLink[] = [
  { label: "كل الخدمات", href: "/services", icon: LayoutGrid },
  { label: "كل الحلول", href: "/solutions", icon: Layers },
  { label: "ابدأ مشروعك", href: "/start", icon: Rocket },
];

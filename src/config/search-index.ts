import {
  Briefcase,
  Newspaper,
  CalendarCheck,
  BookOpenCheck,
  Eye,
  Globe2,
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
import { getServices } from "@/content/services";
import { getSolutions } from "@/content/solutions";
import { getFaq } from "@/content/faq";
import { getProjects } from "@/content/portfolio";
import { getArticles } from "@/content/blog";
import { lp, type Locale } from "@/i18n";

/**
 * فهرس البحث السريع (Ctrl+K).
 * ⚡ ملف منفصل بيتحمّل بس لما الزائر يفتح البحث — عشان نصوص المقالات والصفحات متتحمّلش مع كل صفحة.
 */
export type SearchEntry = { title: string; href: string; group: string; hint?: string; icon?: LucideIcon };

export function getSearchIndex(locale: Locale = "ar"): SearchEntry[] {
  const t = <T,>(ar: T, en: T) => (locale === "en" ? en : ar);
  const g = {
    pages: t("الصفحات", "Pages"),
    tools: t("الأدوات", "Tools"),
    services: t("الخدمات", "Services"),
    solutions: t("الحلول", "Solutions"),
    blog: t("مركز المعرفة", "Insights"),
    work: t("أعمالنا", "Work"),
    faq: t("الأسئلة الشائعة", "FAQ"),
  };
  const list: SearchEntry[] = [
    { title: t("الرئيسية", "Home"), href: "/", group: g.pages },
    { title: t("كل الخدمات", "All services"), href: "/services", group: g.pages, icon: LayoutGrid },
    { title: t("الحلول حسب المجال", "Solutions by industry"), href: "/solutions", group: g.pages, icon: Layers },
    { title: t("أعمالنا", "Our work"), href: "/work", group: g.pages },
    { title: t("الباقات والمقارنة", "Pricing & comparison"), href: "/pricing", group: g.pages },
    { title: t("من نحن", "About us"), href: "/about", group: g.pages, icon: Users },
    { title: t("منهجية العمل", "Our process"), href: "/process", group: g.pages, icon: Workflow },
    { title: t("الأسئلة الشائعة", "FAQ"), href: "/faq", group: g.pages, icon: HelpCircle },
    { title: t("للعملاء خارج مصر", "International clients"), href: "/international", group: g.pages, icon: Globe2, hint: t("العمل عن بُعد", "Working remotely") },
    { title: t("تواصل معنا", "Contact us"), href: "/contact", group: g.pages, icon: Mail },
    { title: t("ابدأ مشروعك", "Start your project"), href: "/start", group: g.tools, icon: Rocket, hint: t("مخطِّط المشروع", "Project planner") },
    { title: t("معاينة موقعك", "Website preview"), href: "/tools/preview", group: g.tools, icon: Eye },
    { title: t("تقييم موقعك الحالي", "Website audit"), href: "/tools/audit", group: g.tools, icon: ScanSearch },
    { title: t("احجز استشارة مجانية", "Book a free consultation"), href: "/book", group: g.tools, icon: CalendarCheck, hint: t("جلسة 30 دقيقة", "30-minute session") },
    ...getServices(locale).map((s) => ({ title: s.title, href: `/services/${s.id}`, group: g.services, icon: s.icon, hint: s.idealFor[0] })),
    ...getSolutions(locale).map((s) => ({ title: s.name, href: `/solutions/${s.id}`, group: g.solutions, icon: s.icon, hint: s.short })),
    { title: t("مركز المعرفة", "Insights"), href: "/blog", group: g.pages, icon: Newspaper },
    ...getArticles(locale).map((a) => ({ title: a.title, href: `/blog/${a.slug}`, group: g.blog, icon: Newspaper, hint: a.category })),
    ...getProjects(locale).map((p) => ({ title: p.title, href: `/work/${p.slug}`, group: g.work, icon: Briefcase, hint: p.category })),
    ...getFaq(locale).map((q) => ({ title: q.question, href: `/faq?q=${encodeURIComponent(q.question)}`, group: g.faq, icon: BookOpenCheck })),
  ];
  return list.map((e) => ({ ...e, href: lp(locale, e.href) }));
}

/** للتوافق مع الكود القديم */
export const searchIndex = getSearchIndex("ar");

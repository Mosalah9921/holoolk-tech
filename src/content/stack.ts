import { Blocks, Cloud, Database, LayoutTemplate, Palette, PlugZap, Server, ShieldCheck, type LucideIcon } from "lucide-react";

/**
 * التقنيات حسب المسار (Track).
 * core: true = التقنيات الأساسية اللي بنبني بيها أغلب المشاريع (بتظهر مميزة).
 * ⚠️ احذف أي تقنية مش هتقدر تسلّم بيها مشروع فعلاً — العميل ممكن يطلبها بالاسم.
 */
export type Tech = { name: string; core?: boolean };
export type Track = { id: string; icon: LucideIcon; title: string; text: string; tech: Tech[] };

export const tracks: Track[] = [
  {
    id: "frontend",
    icon: LayoutTemplate,
    title: "واجهات المستخدم",
    text: "الواجهة الأمامية — ما يراه المستخدم ويتفاعل معه.",
    tech: [
      { name: "TypeScript", core: true },
      { name: "React", core: true },
      { name: "Next.js", core: true },
      { name: "Tailwind CSS", core: true },
      { name: "JavaScript (ES2024)" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Sass" },
      { name: "Vue.js" },
      { name: "Nuxt" },
      { name: "Framer Motion" },
    ],
  },
  {
    id: "backend",
    icon: Server,
    title: "الخوادم والواجهات البرمجية",
    text: "الواجهة الخلفية — منطق النظام والواجهات البرمجية.",
    tech: [
      { name: "Node.js", core: true },
      { name: "REST APIs", core: true },
      { name: "Next.js Server Actions", core: true },
      { name: "Express" },
      { name: "NestJS" },
      { name: "Python" },
      { name: "FastAPI" },
      { name: "Django" },
      { name: "PHP" },
      { name: "Laravel" },
      { name: "GraphQL" },
    ],
  },
  {
    id: "data",
    icon: Database,
    title: "قواعد البيانات",
    text: "قواعد البيانات — تخزين البيانات وتنظيمها وحمايتها.",
    tech: [
      { name: "PostgreSQL", core: true },
      { name: "Supabase", core: true },
      { name: "Prisma ORM", core: true },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "Firebase" },
      { name: "SQLite" },
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "السحابة والنشر",
    text: "السحابة والنشر — الاستضافة والنشر المستمر.",
    tech: [
      { name: "Vercel", core: true },
      { name: "Git & GitHub", core: true },
      { name: "GitHub Actions" },
      { name: "Docker" },
      { name: "AWS" },
      { name: "Cloudflare" },
      { name: "Linux" },
      { name: "Nginx" },
    ],
  },
  {
    id: "cms",
    icon: Blocks,
    title: "إدارة المحتوى والمتاجر",
    text: "إدارة المحتوى والمتاجر — لوحات تحكم سهلة لفريقك.",
    tech: [
      { name: "Sanity", core: true },
      { name: "Headless CMS", core: true },
      { name: "WordPress" },
      { name: "WooCommerce" },
      { name: "Shopify" },
      { name: "Strapi" },
    ],
  },
  {
    id: "integrations",
    icon: PlugZap,
    title: "الدفع والتكاملات",
    text: "التكاملات — ربط موقعك بالخدمات التي تعتمد عليها.",
    tech: [
      { name: "Paymob", core: true },
      { name: "WhatsApp Business", core: true },
      { name: "Google Analytics 4", core: true },
      { name: "Fawry" },
      { name: "Stripe" },
      { name: "Meta Pixel" },
      { name: "Google Maps" },
      { name: "Email APIs" },
    ],
  },
  {
    id: "design",
    icon: Palette,
    title: "التصميم وتجربة المستخدم",
    text: "تجربة المستخدم والتصميم — من النموذج الأولي إلى نظام التصميم.",
    tech: [
      { name: "Figma", core: true },
      { name: "Design Systems", core: true },
      { name: "Wireframing" },
      { name: "Prototyping" },
      { name: "RTL Typography" },
      { name: "Accessibility (WCAG)" },
    ],
  },
  {
    id: "quality",
    icon: ShieldCheck,
    title: "الجودة والأمان",
    text: "الاختبار والأمان — قبل كل إطلاق.",
    tech: [
      { name: "Lighthouse", core: true },
      { name: "OWASP Top 10", core: true },
      { name: "Playwright" },
      { name: "Vitest" },
      { name: "ESLint" },
      { name: "HTTPS / TLS" },
      { name: "Role-Based Access" },
    ],
  },
];

/* ============================ English ============================ */

const tracksEnText: Record<string, Pick<Track, "title" | "text">> = {
  frontend: { title: "Frontend", text: "What users see and interact with." },
  backend: { title: "Backend & APIs", text: "Business logic and application interfaces." },
  data: { title: "Databases", text: "Storing, organizing and protecting your data." },
  cloud: { title: "Cloud & DevOps", text: "Hosting and continuous deployment." },
  cms: { title: "CMS & E-commerce", text: "Easy dashboards for your team." },
  integrations: { title: "Payments & integrations", text: "Connecting your website to the services you rely on." },
  design: { title: "UI/UX design", text: "From prototype to design system." },
  quality: { title: "Quality & security", text: "Testing and security checks before every launch." },
};

export const tracksEn: Track[] = tracks.map((t) => ({ ...t, ...tracksEnText[t.id] }));

export const getTracks = (locale: "ar" | "en") => (locale === "en" ? tracksEn : tracks);

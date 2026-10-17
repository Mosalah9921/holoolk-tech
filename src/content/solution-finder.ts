import {
  Briefcase,
  Building2,
  CalendarClock,
  Compass,
  Gauge,
  Hourglass,
  Layers,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Store,
  UtensilsCrossed,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * المستشار الذكي لاختيار الحل — الأسئلة وقواعد التوصية.
 * المدد هنا متوافقة مع الأسئلة الشائعة والباقات؛ عدّلها معاً.
 */
type L = "ar" | "en";
/** نص باللغتين */
type T2 = { ar: string; en: string };
const pick = (locale: L, v: T2) => v[locale];

export type Option = { id: string; label: string; icon: LucideIcon };
export type Step = { id: "sector" | "goal" | "timeline"; title: string; hint: string; options: Option[] };

type StepDef = { id: Step["id"]; title: T2; hint: T2; options: { id: string; label: T2; icon: LucideIcon }[] };

const stepDefs: StepDef[] = [
  {
    id: "sector",
    title: { ar: "ما مجال نشاطك؟", en: "What's your industry?" },
    hint: { ar: "اختر الأقرب لنشاطك التجاري.", en: "Pick the closest match to your business." },
    options: [
      { id: "restaurants", label: { ar: "مطاعم وكافيهات", en: "Restaurants & cafés" }, icon: UtensilsCrossed },
      { id: "retail", label: { ar: "تجارة وتجزئة", en: "Retail & commerce" }, icon: Store },
      { id: "companies", label: { ar: "شركات وخدمات", en: "Companies & services" }, icon: Briefcase },
      { id: "clinics", label: { ar: "عيادات وصحة", en: "Clinics & healthcare" }, icon: Stethoscope },
      { id: "real-estate", label: { ar: "عقارات ومقاولات", en: "Real estate & construction" }, icon: Building2 },
      { id: "other", label: { ar: "مجال آخر", en: "Something else" }, icon: Compass },
    ],
  },
  {
    id: "goal",
    title: { ar: "ما هدفك الرقمي الأساسي؟", en: "What's your main digital goal?" },
    hint: { ar: "الهدف الأهم الآن، ويمكن إضافة الباقي لاحقاً.", en: "Your top priority right now. The rest can come later." },
    options: [
      { id: "sell", label: { ar: "البيع واستقبال المدفوعات أونلاين", en: "Sell and accept payments online" }, icon: ShoppingBag },
      { id: "identity", label: { ar: "واجهة تعريفية وبناء هوية رقمية", en: "A professional presence and brand online" }, icon: Sparkles },
      { id: "operations", label: { ar: "إدارة العمليات والطلبات والحجوزات", en: "Manage operations, orders and bookings" }, icon: Workflow },
      { id: "custom", label: { ar: "تطبيق أو منصة مخصصة بالكامل", en: "A fully custom app or platform" }, icon: Layers },
    ],
  },
  {
    id: "timeline",
    title: { ar: "ما الإطار الزمني لمشروعك؟", en: "What's your timeline?" },
    hint: { ar: "يساعدنا على اقتراح خطة تنفيذ واقعية.", en: "This helps us suggest a realistic plan." },
    options: [
      { id: "fast", label: { ar: "إطلاق سريع خلال أسبوعين", en: "A fast launch within two weeks" }, icon: Gauge },
      { id: "month", label: { ar: "خطة عمل متدرجة خلال شهر", en: "A phased plan within a month" }, icon: CalendarClock },
      { id: "study", label: { ar: "مشروع ضخم قيد الدراسة والتخطيط", en: "A larger project still in planning" }, icon: Hourglass },
    ],
  },
];

export function getFinderSteps(locale: L = "ar"): Step[] {
  return stepDefs.map((s) => ({
    id: s.id,
    title: pick(locale, s.title),
    hint: pick(locale, s.hint),
    options: s.options.map((o) => ({ id: o.id, icon: o.icon, label: pick(locale, o.label) })),
  }));
}

/** للتوافق مع الكود القديم */
export const finderSteps = getFinderSteps("ar");

export type Answers = Partial<Record<Step["id"], string>>;

export type Recommendation = {
  title: string;
  summary: string;
  benefits: string[];
  /** المدة التقديرية بالأسابيع (للمقارنة مع الإطار الزمني) — null = تُحدد بعد الدراسة */
  weeks: number | null;
  duration: string;
  href: string;
  /** ملاحظة واقعية حسب الإطار الزمني */
  note?: string;
};

type RecDef = { title: T2; summary?: T2; benefits: { ar: string[]; en: string[] } };

const operationsBySector: Record<string, RecDef> = {
  restaurants: {
    title: { ar: "نظام إدارة طلبات ومنيو QR تفاعلي", en: "Order management with an interactive QR menu" },
    benefits: {
      ar: ["منيو QR تفاعلي سهل التحديث", "إدارة الطلبات والطاولات من شاشة واحدة", "ربط بوابات الدفع وشركات التوصيل", "تقارير مبيعات يومية"],
      en: ["An interactive, easy-to-update QR menu", "Orders and tables managed from one screen", "Payment gateways and delivery integrations", "Daily sales reports"],
    },
  },
  retail: {
    title: { ar: "نظام مخزون ومبيعات بلوحة تحكم واحدة", en: "Inventory and sales from one dashboard" },
    benefits: {
      ar: ["مزامنة المخزون لحظياً", "تقارير مبيعات يومية", "تتبع الطلبات والموردين", "تقارير مالية حية"],
      en: ["Real-time inventory sync", "Daily sales reports", "Order and supplier tracking", "Live financial reports"],
    },
  },
  clinics: {
    title: { ar: "نظام حجز مواعيد مع لوحة متابعة للعيادة", en: "Appointment booking with a clinic dashboard" },
    benefits: {
      ar: ["حجز مواعيد آلي على مدار الساعة", "صفحات واضحة للأطباء والخدمات", "تنبيهات تلقائية بالمواعيد", "لوحة متابعة للأطباء والاستقبال"],
      en: ["24/7 automated appointment booking", "Clear doctor and service pages", "Automatic appointment reminders", "A dashboard for doctors and reception"],
    },
  },
  "real-estate": {
    title: { ar: "منصة عرض وحدات مع نظام CRM للعملاء", en: "A property listing platform with a CRM" },
    benefits: {
      ar: ["عرض الوحدات بفلاتر بحث ذكية", "متابعة العملاء المحتملين حتى التعاقد", "حاسبات الأقساط والدفعات", "تقارير أداء فريق المبيعات"],
      en: ["Unit listings with smart search filters", "Lead follow-up all the way to contract", "Installment and payment calculators", "Sales team performance reports"],
    },
  },
  companies: {
    title: { ar: "بوابة أعمال ولوحة تحكم لإدارة العمليات", en: "A business portal and operations dashboard" },
    benefits: {
      ar: ["أتمتة سير العمل والموافقات", "صلاحيات مختلفة لكل فريق", "لوحات تحكم وتقارير مخصصة", "ربط مع أنظمتك الحالية"],
      en: ["Automated workflows and approvals", "Different permissions for every team", "Custom dashboards and reports", "Integration with your existing systems"],
    },
  },
  other: {
    title: { ar: "نظام إدارة سحابي مخصص لطبيعة عملك", en: "A cloud management system built around your work" },
    benefits: {
      ar: ["أتمتة المهام المتكررة", "إدارة الطلبات والعملاء من مكان واحد", "لوحات تحكم وتقارير مخصصة", "قابل للتوسع مع نمو نشاطك"],
      en: ["Automated repetitive tasks", "Orders and customers managed in one place", "Custom dashboards and reports", "Scales as your business grows"],
    },
  },
};

const fixed: Record<"restaurantSell" | "store" | "custom" | "landing" | "company", RecDef & { summary: T2 }> = {
  restaurantSell: {
    title: { ar: "منيو إلكتروني بطلبات أونلاين ودفع وتوصيل", en: "A digital menu with online ordering, payment and delivery" },
    summary: { ar: "استقبل طلبات عملائك مباشرة دون عمولات المنصات، مع دفع آمن وربط بالتوصيل.", en: "Take orders directly from your customers with no platform commissions, plus secure payments and delivery integration." },
    benefits: {
      ar: ["طلبات أونلاين باسم مطعمك", "دفع إلكتروني آمن", "ربط شركات التوصيل", "لوحة لمتابعة الطلبات"],
      en: ["Online orders under your own brand", "Secure online payments", "Delivery company integrations", "An order tracking dashboard"],
    },
  },
  store: {
    title: { ar: "متجر إلكتروني متكامل مع نظام دفع آمن", en: "A complete online store with secure payments" },
    summary: { ar: "متجر سريع ومتجاوب مصمم لرفع المبيعات، بإدارة سهلة للمنتجات والطلبات.", en: "A fast, responsive store designed to grow sales, with easy product and order management." },
    benefits: {
      ar: ["بوابات دفع آمنة", "إدارة المنتجات والمخزون والطلبات", "ربط شركات الشحن", "تهيئة كاملة لمحركات البحث"],
      en: ["Secure payment gateways", "Product, inventory and order management", "Shipping integrations", "Complete search engine optimization"],
    },
  },
  custom: {
    title: { ar: "منصة ويب مخصصة بالكامل لفكرتك", en: "A fully custom web platform for your idea" },
    summary: { ar: "نحوّل فكرتك إلى منصة متكاملة ببنية سحابية قابلة للتوسع وتجربة استخدام مدروسة.", en: "We turn your idea into a complete platform with a scalable cloud architecture and a thoughtful user experience." },
    benefits: {
      ar: ["تحليل الفكرة وتصميم تجربة المستخدم", "بنية سحابية قابلة للتوسع", "لوحة تحكم وصلاحيات متعددة", "إطلاق على مراحل مع دعم مستمر"],
      en: ["Idea analysis and UX design", "A scalable cloud architecture", "A dashboard with role-based permissions", "A phased launch with ongoing support"],
    },
  },
  landing: {
    title: { ar: "صفحة هبوط احترافية تعرّف بنشاطك", en: "A professional landing page for your business" },
    summary: { ar: "أسرع طريقة لحضور رقمي احترافي: صفحة واحدة مركزة تحوّل الزوار إلى عملاء.", en: "The fastest route to a professional online presence: one focused page that turns visitors into customers." },
    benefits: {
      ar: ["تصميم احترافي يعكس هويتك", "زر تواصل مباشر عبر واتساب", "سرعة تحميل عالية", "جاهزة للحملات الإعلانية"],
      en: ["A professional design that reflects your brand", "A direct WhatsApp contact button", "Fast loading", "Ready for ad campaigns"],
    },
  },
  company: {
    title: { ar: "موقع شركة احترافي يبني هويتك الرقمية", en: "A professional company website that builds your brand" },
    summary: { ar: "موقع متكامل يعرض خدماتك وأعمالك بثقة، ويظهر بقوة في نتائج البحث.", en: "A complete website that presents your services and work with confidence, and performs well in search." },
    benefits: {
      ar: ["تصميم مخصص بهوية علامتك", "لوحة تحكم لتحديث المحتوى", "تهيئة لمحركات البحث", "نماذج تواصل وربط واتساب"],
      en: ["A custom design in your brand identity", "A dashboard to update your content", "Search engine optimization", "Contact forms and WhatsApp integration"],
    },
  },
};

const durations = {
  w35: { ar: "من 3 إلى 5 أسابيع", en: "3 to 5 weeks" },
  study: { ar: "تُحدد بعد دراسة المتطلبات", en: "Set after reviewing your requirements" },
  w1: { ar: "نحو أسبوع", en: "About one week" },
  w23: { ar: "من أسبوعين إلى 3 أسابيع", en: "2 to 3 weeks" },
};

export function recommend(a: Answers, locale: L = "ar"): Recommendation {
  const sector = a.sector ?? "other";
  const build = (d: RecDef, summary: T2, weeks: number | null, duration: T2, href: string): Recommendation => ({
    title: pick(locale, d.title),
    summary: pick(locale, summary),
    benefits: d.benefits[locale],
    weeks,
    duration: pick(locale, duration),
    href,
  });
  let rec: Recommendation;

  switch (a.goal) {
    case "sell":
      rec =
        sector === "restaurants"
          ? build(fixed.restaurantSell, fixed.restaurantSell.summary, 4, durations.w35, "/solutions/restaurants")
          : build(fixed.store, fixed.store.summary, 4, durations.w35, "/services/e-commerce");
      break;
    case "operations": {
      const o = operationsBySector[sector] ?? operationsBySector.other;
      rec = build(
        o,
        { ar: "نظام سحابي يختصر الوقت ويقلل الأخطاء، ويمنحك رؤية كاملة لعملك من أي مكان.", en: "A cloud system that saves time, reduces errors and gives you a full view of your business from anywhere." },
        null,
        durations.study,
        "/services/web-apps",
      );
      break;
    }
    case "custom":
      rec = build(fixed.custom, fixed.custom.summary, null, durations.study, "/services/web-apps");
      break;
    default: // identity
      rec =
        a.timeline === "fast"
          ? build(fixed.landing, fixed.landing.summary, 1, durations.w1, "/services/landing-pages")
          : build(fixed.company, fixed.company.summary, 3, durations.w23, "/services/web-development");
  }

  if (a.timeline === "fast" && (rec.weeks === null || rec.weeks > 2)) {
    rec.note = pick(locale, {
      ar: "لإطلاق خلال أسبوعين، نبدأ بنسخة أولى تضم المزايا الأساسية، ثم نضيف الباقي على مراحل.",
      en: "To launch within two weeks, we start with a first version covering the essentials, then add the rest in phases.",
    });
  } else if (a.timeline === "study") {
    rec.note = pick(locale, {
      ar: "نقترح البدء بجلسة استشارية مجانية لدراسة المتطلبات ووضع خطة تنفيذ واضحة.",
      en: "We suggest starting with a free consultation to review your requirements and set a clear delivery plan.",
    });
  }
  return rec;
}

export function labelOf(step: Step["id"], id?: string, locale: L = "ar") {
  return getFinderSteps(locale).find((s) => s.id === step)?.options.find((o) => o.id === id)?.label ?? "";
}

export function whatsappSummary(a: Answers, rec: Recommendation, locale: L = "ar") {
  if (locale === "en") {
    return [
      "Hello Holoolk Tech 👋",
      "I used the Solution Advisor on your website. Here are my answers:",
      `• Industry: ${labelOf("sector", a.sector, "en")}`,
      `• Goal: ${labelOf("goal", a.goal, "en")}`,
      `• Timeline: ${labelOf("timeline", a.timeline, "en")}`,
      `• Suggested solution: ${rec.title}`,
      "I'd like to discuss getting started.",
    ].join("\n");
  }
  return [
    "مرحباً حلولك تيك 👋",
    "استخدمت المستشار الذكي على موقعكم، وهذه إجاباتي:",
    `• المجال: ${labelOf("sector", a.sector)}`,
    `• الهدف: ${labelOf("goal", a.goal)}`,
    `• الإطار الزمني: ${labelOf("timeline", a.timeline)}`,
    `• الحل المقترح: ${rec.title}`,
    "أرغب في مناقشة بدء تنفيذ هذا الحل.",
  ].join("\n");
}

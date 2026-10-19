/**
 * الباقات — من غير أسعار. كل باقة بتوصل العميل لطلب عرض مخصص على واتساب.
 */
export type Package = {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  idealFor: string;
  timeline: string;
  features: string[];
  popular?: boolean;
  cta: string;
};

export const packages: Package[] = [
  {
    id: "starter",
    name: "باقة الانطلاق",
    nameEn: "Starter",
    description: "مثالية للمشاريع الناشئة والمهنيين الذين يحتاجون إلى صفحة هبوط أو تواجد رقمي سريع وعصري.",
    idealFor: "الحملات الإعلانية والمشاريع الناشئة",
    timeline: "أسبوع تقريباً",
    cta: "اطلب عرضاً لباقة الانطلاق",
    features: [
      "صفحة هبوط احترافية متكاملة (One-Page)\u200F",
      "متوافق بالكامل مع الهواتف والشاشات الذكية",
      "ربط سريع مع WhatsApp ونموذج تواصل",
      "تهيئة أساسية لمحركات البحث (SEO)\u200F",
      "ربط Google Analytics لقياس الزيارات",
      "دومين واستضافة سريعة لمدة عام",
      "دعم فني وتعديلات لمدة 30 يوماً",
    ],
  },
  {
    id: "business",
    name: "باقة الأعمال والشركات",
    nameEn: "Business",
    description: "الحل الشامل للشركات والمؤسسات التي تبحث عن موقع متكامل يعكس مكانة علامتها ومصداقيتها.",
    idealFor: "الشركات والعيادات والمكاتب",
    timeline: "من أسبوعين إلى 3 أسابيع",
    popular: true,
    cta: "اطلب عرضاً لباقة الأعمال",
    features: [
      "موقع تعريفي متعدد الصفحات (حتى 6 صفحات)",
      "تصميم UI/UX مخصص بالكامل بدون قوالب جاهزة",
      "معرض أعمال تفاعلي وكتالوج للخدمات",
      "أداء سريع يُختبر قبل الإطلاق وكود نظيف",
      "لوحة تحكم سهلة لتعديل النصوص والصور",
      "ربط أدوات القياس (Google Analytics وPixel)",
      "إيميلات رسمية باسم الشركة (info@domain)\u200F",
      "دعم فني وصيانة لمدة شهرين",
    ],
  },
  {
    id: "ecommerce",
    name: "باقة المتاجر والأنظمة",
    nameEn: "Pro Commerce",
    description: "منظومة إلكترونية متطورة للمتاجر والمشاريع الكبيرة التي تتطلب بوابات دفع وأنظمة مخصصة.",
    idealFor: "العلامات التجارية والمتاجر والمشاريع الكبرى",
    timeline: "من 3 إلى 5 أسابيع",
    cta: "اطلب استشارة لمتجرك",
    features: [
      "متجر إلكتروني شامل مع نظام إدارة الطلبات والمنتجات",
      "ربط مع بوابات الدفع الإلكتروني وشركات الشحن",
      "نظام كوبونات الخصم وسلات الشراء المتروكة",
      "إشعارات تلقائية للطلبات عبر WhatsApp والإيميل",
      "ربط أدوات التحليل المتقدمة (Pixel & GA4)\u200F",
      "تدريب كامل لفريقك على إدارة النظام",
      "دعم فني ومتابعة مخصصة لمدة 3 أشهر",
    ],
  },
];

/**
 * جدول المقارنة بين الباقات — القيم بنفس ترتيب packages:
 * true = متوفر، false = غير متوفر، أو نص قصير.
 */
export type ComparisonRow = { label: string; values: (boolean | string)[]; /** أول صف في كل مجموعة بيحمل اسمها */ group?: string };

export const comparison: ComparisonRow[] = [
  { group: "التصميم والتطوير", label: "عدد الصفحات", values: ["صفحة واحدة", "حتى 6 صفحات", "متجر متكامل"] },
  { label: "تصميم مخصص بالكامل", values: [true, true, true] },
  { label: "توافق كامل مع الجوال", values: [true, true, true] },
  { group: "التسويق والتواصل", label: "تهيئة لمحركات البحث", values: ["أساسية", "متقدمة", "متقدمة"] },
  { label: "ربط واتساب ونماذج التواصل", values: [true, true, true] },
  { label: "ربط أدوات القياس", values: ["Google Analytics", "Analytics وPixel", "متقدم: GA4 وPixel"] },
  { label: "بريد إلكتروني رسمي باسم الشركة", values: [false, true, true] },
  { group: "الإدارة والمتجر", label: "لوحة تحكم بالمحتوى", values: [false, true, true] },
  { label: "معرض أعمال وكتالوج خدمات", values: [false, true, true] },
  { label: "إدارة المنتجات والطلبات", values: [false, false, true] },
  { label: "بوابات الدفع والشحن", values: [false, false, true] },
  { group: "التسليم والدعم", label: "تدريب على إدارة الموقع", values: [false, true, true] },
  { label: "الدعم الفني بعد التسليم", values: ["30 يوماً", "شهران", "3 أشهر"] },
];

/**
 * نظام الدفعات — مصدر واحد يظهر في صفحة الباقات وفي إجابة سؤال الدفعات.
 * عدّل النسب هنا فقط.
 */
export const paymentStages: { percent: number; label: string }[] = [
  { percent: 30, label: "دفعة أولى لبدء العمل" },
  { percent: 40, label: "عند اعتماد التصميم واختبار النسخة التجريبية" },
  { percent: 30, label: "عند التسليم النهائي وإطلاق المشروع" },
];

/* ============================ English ============================ */

const packagesEnText: Record<string, Pick<Package, "name" | "description" | "idealFor" | "timeline" | "cta" | "features">> = {
  starter: {
    name: "Starter",
    description: "Ideal for new ventures and professionals who need a landing page or a fast, modern online presence.",
    idealFor: "Ad campaigns and early-stage projects",
    timeline: "About one week",
    cta: "Request a Starter quote",
    features: [
      "A complete, professional one-page landing site",
      "Fully responsive on phones and tablets",
      "Quick WhatsApp integration and a contact form",
      "Essential search engine optimization (SEO)",
      "Google Analytics connected to track visits",
      "Domain and fast hosting for one year",
      "30 days of support and revisions",
    ],
  },
  business: {
    name: "Business",
    description: "The complete solution for companies and organizations that want a full website reflecting their brand’s stature and credibility.",
    idealFor: "Companies, clinics and firms",
    timeline: "2 to 3 weeks",
    cta: "Request a Business quote",
    features: [
      "A multi-page company website (up to 6 pages)",
      "Fully custom UI/UX design, no templates",
      "Interactive portfolio and service catalog",
      "Performance tested before launch, with clean code",
      "An easy dashboard to edit text and images",
      "Analytics connected (Google Analytics & Pixel)",
      "Branded business email (info@yourdomain)",
      "Two months of support and maintenance",
    ],
  },
  ecommerce: {
    name: "Pro Commerce",
    description: "An advanced commerce setup for stores and larger projects that need payment gateways and custom systems.",
    idealFor: "Brands, stores and larger projects",
    timeline: "3 to 5 weeks",
    cta: "Get a consultation for your store",
    features: [
      "A complete online store with order and product management",
      "Online payment gateways and shipping integrations",
      "Discount coupons and abandoned-cart recovery",
      "Automatic order notifications by WhatsApp and email",
      "Advanced analytics connected (Pixel & GA4)",
      "Full training for your team",
      "Three months of dedicated support",
    ],
  },
};

export const packagesEn: Package[] = packages.map((p) => ({ ...p, ...packagesEnText[p.id] }));

export const comparisonEn: ComparisonRow[] = [
  { group: "Design & build", label: "Pages", values: ["One page", "Up to 6 pages", "Full store"] },
  { label: "Fully custom design", values: [true, true, true] },
  { label: "Fully mobile-friendly", values: [true, true, true] },
  { group: "Marketing & contact", label: "Search engine optimization", values: ["Essential", "Advanced", "Advanced"] },
  { label: "WhatsApp & contact forms", values: [true, true, true] },
  { label: "Analytics", values: ["Google Analytics", "Analytics + Pixel", "Advanced: GA4 + Pixel"] },
  { label: "Branded business email", values: [false, true, true] },
  { group: "Management & commerce", label: "Content dashboard", values: [false, true, true] },
  { label: "Portfolio & service catalog", values: [false, true, true] },
  { label: "Product & order management", values: [false, false, true] },
  { label: "Payment & shipping gateways", values: [false, false, true] },
  { group: "Delivery & support", label: "Website management training", values: [false, true, true] },
  { label: "Support after launch", values: ["30 days", "2 months", "3 months"] },
];

export const paymentStagesEn: { percent: number; label: string }[] = [
  { percent: 30, label: "Upfront to kick off the project" },
  { percent: 40, label: "On design approval and beta testing" },
  { percent: 30, label: "On final delivery and launch" },
];

export const getPackages = (locale: "ar" | "en") => (locale === "en" ? packagesEn : packages);
export const getComparison = (locale: "ar" | "en") => (locale === "en" ? comparisonEn : comparison);
export const getPaymentStages = (locale: "ar" | "en") => (locale === "en" ? paymentStagesEn : paymentStages);

import {
  Figma,
  LayoutTemplate,
  Server,
  ShieldCheck,
  ShoppingBag,
  Target,
  type LucideIcon,
} from "lucide-react";

/**
 * الخدمات — ممكن تعدّل النصوص هنا أو تخلّي Gemini يكتبها.
 * الأيقونات من https://lucide.dev/icons (اكتب اسم الأيقونة وضيفها في الـ import).
 */
export type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  badge?: string;
  /** للصفحة المستقلة /services/[id] */
  details: string;
  idealFor: string[];
  /** الباقة المرتبطة في content/pricing.ts (اختياري) */
  packageId?: string;
  /** أيقونة ثلاثية الأبعاد (public/images/services) */
  image: string;
  /** اسم مختصر يظهر على البطاقات الصغيرة */
  short: string;
};

export const services: Service[] = [
  {
    id: "web-development",
    image: "/images/services/corporate-sites.webp",
    short: "مواقع الشركات",
    icon: LayoutTemplate,
    title: "مواقع الشركات والهوية الرقمية",
    description:
      "واجهات تعريفية حديثة وسريعة تعكس قوة علامتك التجارية وتخلق انطباعاً أولياً احترافياً يدوم لدى عملائك.",
    badge: "الأكثر طلباً",
    details:
      "موقع شركتك هو نقطة التواصل الأولى بينك وبين عملائك، وعليه يُبنى انطباعهم الأول. نطوّر لك موقعاً متعدد الصفحات يعرض خدماتك وأعمالك بوضوح، ويُسهّل على الزائر التواصل معك في أي وقت، مع لوحة تحكم تتيح لك تحديث المحتوى بنفسك.",
    idealFor: ["الشركات والمكاتب الهندسية والقانونية", "العيادات والمراكز الطبية والتعليمية", "كل نشاط يحتاج إلى حضور رقمي رسمي"],
    packageId: "business",
    features: [
      "تصميم عصري متجاوب مع كل الشاشات",
      "سرعة تحميل قياسية متوافقة مع Google PageSpeed",
      "تهيئة تقنية متقدمة لمحركات البحث (SEO)\u200F",
      "ربط مباشر وسهل مع WhatsApp ونماذج التواصل",
      "بالعربية والإنجليزية أو أي لغة يحتاجها سوقك",
    ],
  },
  {
    id: "e-commerce",
    image: "/images/services/ecommerce.webp",
    short: "المتاجر الإلكترونية",
    icon: ShoppingBag,
    title: "المتاجر الإلكترونية المتكاملة",
    description:
      "منصات بيع مصممة لتحويل الزوار إلى مشترين مع تجربة دفع سلسة وبوابات دفع محلية وعالمية معتمدة.",
    badge: "زيادة مبيعات",
    details:
      "متجر إلكتروني متكامل باللغة العربية: عرض المنتجات، وسلة الشراء، والدفع الإلكتروني، ومتابعة الطلبات والشحن من لوحة تحكم واحدة. صُمّمت رحلة الشراء لتكتمل في أقل عدد من الخطوات، فترتفع نسبة إتمام الطلبات.",
    idealFor: ["العلامات التجارية التي تبيع عبر منصات التواصل وتحتاج إلى متجر مستقل", "المتاجر التقليدية التي تتوسع في البيع الإلكتروني", "المشاريع ذات المنتجات المتعددة والطلبات اليومية"],
    packageId: "ecommerce",
    features: [
      "ربط بوابات الدفع (Visa، ميزة، المحافظ الإلكترونية، Fawry)\u200F",
      "تكامل مباشر مع شركات الشحن والتوصيل",
      "لوحة تحكم كاملة بالعربي لإدارة المنتجات والطلبات",
      "نظام إشعارات تلقائية عبر الواتساب والبريد",
      "متجر بلغة واحدة أو عدة لغات حسب أسواقك",
    ],
  },
  {
    id: "landing-pages",
    image: "/images/services/landing-pages.webp",
    short: "صفحات الهبوط",
    icon: Target,
    title: "صفحات الهبوط الإعلانية",
    description:
      "صفحات فردية مركزة ومهيأة خصيصاً للحملات الإعلانية ومصممة لتحويل أكبر عدد من الزوار إلى عملاء.",
    details:
      "صفحة الهبوط هي ما يحدد العائد الفعلي من إنفاقك الإعلاني. نبني صفحة واحدة فائقة السرعة، برسالة واضحة، وكل عنصر فيها يقود الزائر إلى إجراء واحد: الطلب أو التسجيل أو التواصل.",
    idealFor: ["الحملات الإعلانية على فيسبوك وتيك توك وجوجل", "إطلاق منتج أو خدمة جديدة", "الدورات التدريبية والفعاليات والعروض محدودة المدة"],
    packageId: "starter",
    features: [
      "بنية بصرية ونصوص تسويقية موجهة للإقناع",
      "تحميل فائق السرعة على الموبايل",
      "ربط مع بكسل التتبع (Facebook Pixel, TikTok, GA4)\u200F",
      "أزرار اتخاذ قرار وتواصل فوري وواضح",
    ],
  },
  {
    id: "web-apps",
    image: "/images/services/cloud-systems.webp",
    short: "الأنظمة السحابية",
    icon: Server,
    title: "الأنظمة السحابية ولوحات التحكم",
    description:
      "برمجة بوابات أعمال وأنظمة مخصصة لإدارة العمليات، الحجوزات، الموظفين، أو بيانات العملاء بكل دقة.",
    badge: "حلول مؤسسية",
    details:
      "عندما لا تعود الجداول والأوراق كافية، نطوّر لك نظاماً مصمماً وفق طبيعة عملك: لوحة تحكم، وصلاحيات للموظفين، وتقارير دقيقة، وتكامل مع الأنظمة التي تعتمد عليها. نبدأ بالجزء الأهم ونطلقه سريعاً، ثم نوسّعه على مراحل.",
    idealFor: ["أنظمة الحجوزات والمواعيد", "إدارة العملاء والطلبات والمخزون", "منصات SaaS والمشاريع الناشئة"],
    features: [
      "قواعد بيانات سريعة وآمنة",
      "صلاحيات متعددة للمستخدمين والمديرين",
      "تقارير وإحصائيات تفاعلية سهلة القراءة",
      "قابلية كاملة للتوسع والربط البرمجي (APIs)\u200F",
    ],
  },
  {
    id: "ui-ux-design",
    image: "/images/services/ui-ux.webp",
    short: "تصميم UI/UX",
    icon: Figma,
    title: "تصميم واجهات وتجربة المستخدم (UI/UX)\u200F",
    description:
      "دراسة سلوك زوار موقعك وبناء تصاميم أولية تفاعلية جذابة وسهلة الاستخدام عبر Figma قبل كتابة الكود.",
    details:
      "قبل كتابة أي سطر برمجي، نصمم الموقع أو التطبيق كاملاً على Figma كنموذج تفاعلي يمكنك تجربته. بذلك ترى النتيجة النهائية وتعتمدها مبكراً، مما يوفّر كثيراً من الوقت والجهد في مرحلة التطوير.",
    idealFor: ["أصحاب الأفكار الراغبين في رؤيتها قبل تنفيذها", "الشركات التي تمتلك فريق تطوير وتحتاج إلى تصميم احترافي", "تحديث واجهة موقع أو تطبيق قائم"],
    features: [
      "نموذج تفاعلي تجرّبه قبل التنفيذ",
      "اختيار متقن للألوان والخطوط المتناسقة",
      "تجربة مستخدم سهلة وبديهية",
      "تسليم ملفات التصميم المنظمة للمطورين",
    ],
  },
  {
    id: "maintenance-support",
    image: "/images/services/maintenance.webp",
    short: "الصيانة والدعم",
    icon: ShieldCheck,
    title: "الصيانة السحابية والدعم الفني",
    description:
      "متابعة وتحديثات وحماية مستمرة تحافظ على موقعك آمناً وسريعاً ومستقراً.",
    details:
      "موقعك أصل من أصول عملك ويحتاج إلى رعاية مستمرة. نتابع أمانه وأداءه، ونُجري النسخ الاحتياطي، ونحدّث المكتبات البرمجية، وننفّذ التعديلات التي تحتاجها، لتتفرغ أنت لإدارة أعمالك.",
    idealFor: ["أصحاب المواقع الذين يفضّلون التفرغ لأعمالهم", "المواقع التي يتجدد محتواها باستمرار", "المتاجر التي يعني أي توقف فيها خسارة في المبيعات"],
    features: [
      "نسخ احتياطي دوري أوتوماتيكي",
      "مراقبة الأمان وشهادات الحماية SSL",
      "تحديث مستمر للأنظمة والمكتبات البرمجية",
      "دعم فني سريع واستشارات تقنية دورية",
    ],
  },
];

/* ============================ English ============================ */

type ServiceText = Pick<Service, "short" | "title" | "description" | "badge" | "details" | "idealFor" | "features">;

const servicesEnText: Record<string, ServiceText> = {
  "web-development": {
    short: "Business websites",
    title: "Business Websites & Online Presence",
    description: "Fast, modern company websites that reflect the strength of your brand and leave a lasting first impression.",
    badge: "Most popular",
    details:
      "Your website is where most clients meet your business for the first time, and it shapes their first impression. We build a multi-page website that presents your services and work with clarity, makes it effortless to get in touch, and comes with a dashboard so you can update the content yourself.",
    idealFor: ["Companies, engineering and law firms", "Clinics, medical and training centers", "Any business that needs a credible online presence"],
    features: [
      "Modern design, fully responsive on every screen",
      "Top-tier loading speed, tuned for Google PageSpeed",
      "Advanced technical SEO from day one",
      "Direct WhatsApp integration and contact forms",
      "In Arabic, English or any language your market needs",
    ],
  },
  "e-commerce": {
    short: "Online stores",
    title: "Complete E-commerce Stores",
    description: "Online stores built to turn visitors into buyers, with a smooth checkout and trusted local and international payment gateways.",
    badge: "Sales growth",
    details:
      "A complete Arabic-first online store: product catalog, cart, online payments, and order and shipping tracking, all from one dashboard. The checkout is designed to finish in as few steps as possible, so more carts turn into completed orders.",
    idealFor: ["Brands selling through social media that need their own store", "Retailers expanding into online sales", "Businesses with large catalogs and daily orders"],
    features: [
      "Payment gateways (Visa, Meeza, mobile wallets, Fawry)",
      "Direct integration with shipping and delivery companies",
      "A full Arabic dashboard for products and orders",
      "Automatic order notifications by WhatsApp and email",
      "A store in one language or several, depending on your markets",
    ],
  },
  "landing-pages": {
    short: "Landing pages",
    title: "High-Converting Landing Pages",
    description: "Focused single pages built for your ad campaigns and designed to maximize conversions.",
    details:
      "Your landing page decides the real return on your ad spend. We build one ultra-fast page with a clear message, where every element leads the visitor to a single action: order, sign up, or get in touch.",
    idealFor: ["Ad campaigns on Facebook, TikTok and Google", "Launching a new product or service", "Courses, events and limited-time offers"],
    features: [
      "Persuasive visual structure and conversion-focused copy",
      "Lightning-fast loading on mobile",
      "Tracking pixels connected (Facebook Pixel, TikTok, GA4)",
      "Clear calls to action and instant contact options",
    ],
  },
  "web-apps": {
    short: "Cloud systems",
    title: "Cloud Systems & Dashboards",
    description: "Custom business portals and systems to manage operations, bookings, staff and customer data with precision.",
    badge: "Business solutions",
    details:
      "When spreadsheets and paperwork no longer keep up, we build a system around the way you actually work: a dashboard, staff permissions, accurate reports, and integrations with the tools you rely on. We start with the most important part, launch it quickly, then grow it in phases.",
    idealFor: ["Booking and appointment systems", "Customer, order and inventory management", "SaaS platforms and startups"],
    features: [
      "Fast, secure databases",
      "Role-based permissions for users and managers",
      "Interactive reports and clear analytics",
      "Built to scale, with full API integrations",
    ],
  },
  "ui-ux-design": {
    short: "UI/UX design",
    title: "UI/UX Design",
    description: "We study how your visitors behave and design engaging, easy-to-use interactive prototypes in Figma before any code is written.",
    details:
      "Before a single line of code, we design your website or app in Figma as a clickable prototype you can try yourself. You see and approve the final result early, which saves a great deal of time and effort during development.",
    idealFor: ["Founders who want to see their idea before building it", "Companies with an in-house dev team that need professional design", "Redesigning an existing website or app"],
    features: [
      "Live, clickable prototypes",
      "Carefully chosen, harmonious colors and typography",
      "Intuitive, friction-free user experience",
      "Organized, developer-ready design handoff",
    ],
  },
  "maintenance-support": {
    short: "Care & support",
    title: "Maintenance & Technical Support",
    description: "Ongoing monitoring, updates and protection that keep your website secure, fast and stable.",
    details:
      "Your website is a business asset and deserves ongoing care. We monitor its security and performance, run backups, update libraries and make the changes you need, so you can focus on running your business.",
    idealFor: ["Owners who would rather focus on their business", "Websites with frequently updated content", "Stores where any downtime means lost sales"],
    features: [
      "Automatic scheduled backups",
      "Security monitoring and SSL certificates",
      "Continuous system and library updates",
      "Fast support and regular technical advice",
    ],
  },
};

export const servicesEn: Service[] = services.map((s) => ({ ...s, ...servicesEnText[s.id] }));

export const getServices = (locale: "ar" | "en") => (locale === "en" ? servicesEn : services);

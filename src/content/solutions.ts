import { Building2, Dumbbell, GraduationCap, Home, ShoppingBag, Stethoscope, UtensilsCrossed, type LucideIcon } from "lucide-react";

/**
 * الحلول حسب المجال — 7 مجالات أساسية، كل مجال له صفحة مستقلة على /solutions/[id]
 * (السياحة والتجميل والشحن والفعاليات اتشالوا وبقوا تحت «حل مخصص» — مساراتهم القديمة بتتحوّل لـ /solutions)
 * services: معرّفات الخدمات المرتبطة من content/services.ts
 * demo: رابط موقع نموذجي (اختياري) — packageId: الباقة المقترحة من content/pricing.ts
 */
export const solutionGroups = ["المطاعم والتجارة", "الصحة والتعليم واللياقة", "العقارات والشركات"] as const;
export type SolutionGroup = (typeof solutionGroups)[number];

/** أسماء مختصرة للمجموعات (تبويبات الفلترة) */
export const groupShort: Record<SolutionGroup, string> = {
  "المطاعم والتجارة": "المطاعم والتجارة",
  "الصحة والتعليم واللياقة": "الصحة والتعليم",
  "العقارات والشركات": "العقارات والشركات",
};

export type Solution = {
  id: string;
  icon: LucideIcon;
  /** أيقونة ثلاثية الأبعاد بخلفية شفافة: /images/solutions/<id>.webp */
  image: string;
  group: SolutionGroup;
  /** اسم النظام بالإنجليزية (يظهر كوسم تقني) */
  system: string;
  /** يظهر في الصفحة الرئيسية */
  featured?: boolean;
  name: string;
  short: string;
  /** النتيجة التي يحصل عليها العميل — جملة واحدة تظهر على البطاقة */
  outcome: string;
  /** 3 فوائد مختصرة (بلغة صاحب النشاط لا بلغة تقنية) */
  benefits: string[];
  /** الحل المقابل لكل تحدٍّ في pains (بنفس الترتيب) — قسم «قبل ← بعد» */
  fixes: string[];
  headline: string;
  intro: string;
  pains: string[];
  features: { title: string; text: string }[];
  /** ما نبنيه تقنياً — الوصف البرمجي للحل */
  systems: string[];
  services: string[];
  demo?: { href: string; label: string };
  packageId?: string;
  accent: string;
};

export const solutions: Solution[] = [
  {
    id: "restaurants",
    image: "/images/solutions/restaurants.webp",
    group: "المطاعم والتجارة",
    system: "Restaurant Ordering & Booking",
    featured: true,
    icon: UtensilsCrossed,
    name: "المطاعم والكافيهات",
    short: "قوائم طعام تفاعلية وحجز طاولات وطلبات مباشرة.",
    outcome: "طلبات وحجوزات مباشرة بدون عمولات تطبيقات التوصيل",
    benefits: ["طلبات مباشرة على واتساب", "منيو تحدّثه بنفسك في ثوانٍ", "حجز طاولات بتأكيد فوري"],
    fixes: ["موقعك يستقبل الطلبات مباشرة دون عمولات وسيطة", "منيو رقمي تحدّثه من لوحة التحكم في أي وقت", "حجز إلكتروني منظّم بتأكيد تلقائي عبر واتساب"],
    headline: "حوّل زوّار صفحاتك إلى طلبات وحجوزات فعلية.",
    intro:
      "نبني للمطاعم والكافيهات مواقع تعرض الأطباق بشكل شهي، وتتيح الحجز والطلب المباشر دون الاعتماد الكامل على تطبيقات التوصيل.",
    pains: [
      "الاعتماد الكامل على تطبيقات التوصيل وعمولاتها المرتفعة",
      "قائمة طعام قديمة لا تعكس الأصناف الحالية",
      "ضياع الحجوزات بين المكالمات والرسائل",
    ],
    features: [
      { title: "قائمة طعام تفاعلية", text: "أقسام واضحة وأصناف قابلة للتحديث من لوحة التحكم في أي وقت." },
      { title: "حجز طاولات إلكتروني", text: "اختيار اليوم والساعة وعدد الأفراد، مع تأكيد فوري عبر واتساب." },
      { title: "طلب مباشر", text: "استقبال الطلبات على واتساب مباشرة دون عمولات وسيطة." },
      { title: "صفحات الفروع", text: "عنوان كل فرع ومواعيده وخريطته في مكان واحد." },
      { title: "معرض للأطباق", text: "صور احترافية تُبرز أفضل ما في قائمتك." },
      { title: "سرعة على الجوال", text: "تجربة سلسة لأن أغلب زوارك يتصفحون من هواتفهم." },
    ],
    systems: [
      "لوحة تحكم لإدارة الطلبات والحجوزات من أي جهاز",
      "قوائم طعام رقمية ديناميكية برمز QR تُحدَّث لحظياً",
      "إشعارات فورية بالطلبات الجديدة عبر واتساب",
      "إمكانية الربط مع نظام الكاشير الحالي حسب احتياجك",
      "لوحة تقارير للمبيعات والأصناف الأكثر طلباً",
    ],
    services: ["landing-pages", "web-development"],
    demo: { href: "/demos/restaurant", label: "مطعم سُفرة" },
    packageId: "business",
    accent: "#EA580C",
  },
  {
    id: "stores",
    image: "/images/solutions/stores.webp",
    group: "المطاعم والتجارة",
    system: "E-Commerce Platforms",
    featured: true,
    icon: ShoppingBag,
    name: "المتاجر والعلامات التجارية",
    short: "متجر عربي متكامل بالدفع والشحن وإدارة الطلبات.",
    outcome: "متجرك الخاص يبيع على مدار الساعة دون عمولات",
    benefits: ["دفع إلكتروني وشحن مربوط", "مخزون يتحدّث تلقائياً", "بدون عمولات منصات"],
    demo: { href: "/demos/store", label: "متجر رَكض" },
    fixes: ["سلة ودفع إلكتروني تستقبل الطلبات وأنت نائم", "متجرك الخاص بلا عمولات تقتطع من أرباحك", "مخزون وطلبات تتحدث تلقائياً من لوحة واحدة"],
    headline: "متجرك الخاص، بهويتك أنت، دون عمولات منصات البيع.",
    intro:
      "متاجر إلكترونية عربية سريعة تجعل الشراء سهلاً من أول نقرة، مع لوحة تحكم كاملة لإدارة المنتجات والطلبات والمخزون.",
    pains: [
      "البيع عبر الرسائل يستهلك الوقت ويضيّع الطلبات",
      "عمولات المنصات تقتطع من أرباحك",
      "صعوبة متابعة المخزون والطلبات يدوياً",
    ],
    features: [
      { title: "متجر عربي متكامل", text: "تصنيفات ومنتجات ومتغيرات مقاسات وألوان." },
      { title: "دفع إلكتروني ومحلي", text: "بوابات الدفع المحلية والمحافظ والدفع عند الاستلام." },
      { title: "تكامل مع الشحن", text: "حساب تكلفة الشحن وتتبع الطلبات." },
      { title: "عروض وكوبونات", text: "أكواد خصم وحملات موسمية واسترجاع السلات المتروكة." },
      { title: "لوحة تحكم شاملة", text: "إدارة المخزون والطلبات والعملاء من مكان واحد." },
      { title: "إشعارات فورية", text: "تنبيه بكل طلب جديد عبر واتساب والبريد الإلكتروني." },
    ],
    systems: [
      "متجر مخصص بالكامل بلا قيود المنصات الجاهزة",
      "ربط بوابات الدفع المحلية والمحافظ الرقمية",
      "ربط شركات الشحن وتتبع الشحنات آلياً",
      "إدارة المخزون والطلبات من لوحة واحدة",
      "تقارير مبيعات وعملاء وسلات متروكة",
    ],
    services: ["e-commerce", "maintenance-support"],
    packageId: "ecommerce",
    accent: "#DB2777",
  },
  {
    id: "clinics",
    image: "/images/solutions/clinics.webp",
    group: "الصحة والتعليم واللياقة",
    system: "Clinic Booking System",
    featured: true,
    icon: Stethoscope,
    name: "العيادات والمراكز الطبية",
    short: "حجز مواعيد إلكتروني وملفات للأطباء والخدمات.",
    outcome: "مرضى يحجزون بأنفسهم، واستقبال أهدأ",
    benefits: ["حجز إلكتروني حسب الطبيب", "تذكير تلقائي قبل الموعد", "ملفات واضحة للأطباء والخدمات"],
    fixes: ["المريض يحجز إلكترونياً ويخف الضغط على الهاتف", "صفحة لكل طبيب وخدمة تبني الثقة قبل الزيارة", "تذكير تلقائي يقلل المواعيد الفائتة"],
    headline: "مواعيد منظّمة، ومرضى يثقون بك قبل أن يصلوا.",
    intro:
      "مواقع طبية هادئة وموثوقة تعرّف بالأطباء والخدمات، وتنظّم الحجوزات إلكترونياً لتخفيف الضغط عن الهاتف والاستقبال.",
    pains: [
      "ازدحام الهاتف بمكالمات الحجز والاستفسار",
      "غياب معلومات واضحة عن الأطباء والخدمات",
      "مواعيد فائتة دون تذكير مسبق",
    ],
    features: [
      { title: "حجز مواعيد إلكتروني", text: "حسب الطبيب والخدمة والمواعيد المتاحة فعلياً." },
      { title: "ملفات الأطباء", text: "التخصص والخبرة والمؤهلات بشكل يعزز الثقة." },
      { title: "صفحات الخدمات", text: "شرح مبسط لكل خدمة وعلاج يجيب عن أسئلة المريض." },
      { title: "تذكير بالمواعيد", text: "رسائل تذكير تلقائية تقلل نسبة المواعيد الفائتة." },
      { title: "أسئلة شائعة طبية", text: "إجابات جاهزة توفّر وقت فريق الاستقبال." },
      { title: "تصميم مطمئن", text: "ألوان وتجربة استخدام تمنح المريض الراحة من أول زيارة." },
    ],
    systems: [
      "سجل بسيط لبيانات المرضى ومواعيدهم بصلاحيات محددة",
      "جداول مواعيد تلقائية حسب الطبيب والعيادة",
      "تذكير المرضى بالمواعيد عبر واتساب والرسائل",
      "دفع إلكتروني للحجز أو العربون عند الحاجة",
      "تقارير للزيارات والمواعيد",
    ],
    services: ["web-development", "web-apps"],
    demo: { href: "/demos/clinic", label: "عيادات نَقاء" },
    packageId: "business",
    accent: "#0D9488",
  },
  {
    id: "education",
    image: "/images/solutions/education.webp",
    group: "الصحة والتعليم واللياقة",
    system: "Learning & Training Platforms",
    icon: GraduationCap,
    name: "التعليم والتدريب",
    short: "منصات دورات أونلاين وتسجيل ومتابعة للطلاب.",
    outcome: "دوراتك أونلاين، والتسجيل منظّم بلا ورق",
    benefits: ["منصة دورات أونلاين", "تسجيل الطلاب ومتابعة تقدمهم", "شهادات إتمام رقمية"],
    demo: { href: "/demos/academy", label: "أكاديمية مَدار" },
    fixes: ["كتالوج دورات يعرض المنهج والمستوى والمدرب قبل الدفع", "تسجيل ودفع إلكتروني بدل الرسائل والتحويلات اليدوية", "حضور برمز QR وتقارير التزام للدورات الحضورية"],
    headline: "دوراتك وطلابك وحضورهم في منصة واحدة.",
    intro:
      "منصات للأكاديميات ومراكز التدريب تعرض الدورات بوضوح، وتنظّم التسجيل والدفع، وتتابع تقدّم الطلاب وحضورهم، أونلاين أو في القاعة.",
    pains: [
      "دورات معروضة في منشورات متفرقة لا تشرح المحتوى ولا المستوى",
      "التسجيل والدفع عبر الرسائل يستنزف الوقت وقد يُفقدك بعض الطلاب",
      "تسجيل الحضور ومتابعة الطلاب يدوياً",
    ],
    features: [
      { title: "كتالوج الدورات", text: "صفحة لكل دورة بالمنهج والمدة والمستوى والمدرب." },
      { title: "تسجيل ودفع إلكتروني", text: "اشتراك في دورة منفردة أو باقة شهرية وسنوية." },
      { title: "حساب الطالب", text: "الدروس والتقدّم والشهادات في مكان واحد." },
      { title: "حضور برمز QR", text: "للدورات الحضورية: مسح الرمز عند الدخول وتحديث السجل لحظياً." },
      { title: "إشعارات وتذكيرات", text: "تنبيهات عبر واتساب بمواعيد الجلسات والتحديثات." },
      { title: "لوحة تحكم وتقارير", text: "أعداد المسجّلين والحضور والإيرادات بتقارير واضحة." },
    ],
    systems: [
      "منصة دورات أونلاين بدروس مسجّلة أو جلسات مباشرة",
      "تسجيل ودفع واشتراكات إلكترونية",
      "متابعة تقدّم الطلاب وشهادات إتمام رقمية",
      "هويات رقمية وحضور برمز QR للدورات الحضورية",
      "إدارة المجموعات والمواعيد والإشعارات",
    ],
    services: ["web-apps", "web-development"],
    packageId: undefined,
    accent: "#4F46E5",
  },
  {
    id: "fitness",
    image: "/images/solutions/fitness.webp",
    icon: Dumbbell,
    group: "الصحة والتعليم واللياقة",
    system: "Gym & Membership Management",
    name: "الأندية الرياضية واللياقة",
    short: "اشتراكات وجداول حصص ودخول برمز QR.",
    outcome: "اشتراكات تتجدد وأعضاء يلتزمون",
    benefits: ["تجديد الاشتراكات تلقائياً", "جدول حصص محدَّث دائماً", "دخول برمز QR"],
    fixes: ["تنبيه وتجديد تلقائي قبل انتهاء الاشتراك", "جدول حصص حي يصل لكل الأعضاء فوراً", "صفحات اشتراك واضحة تحوّل المهتم إلى مشترك"],
    headline: "اشتراكات منظمة، وأعضاء يعودون كل أسبوع.",
    intro:
      "مواقع وأنظمة للأندية الرياضية ومراكز اللياقة تعرض الحصص والمدربين، وتدير الاشتراكات والتجديدات والدخول بالبطاقات الرقمية.",
    pains: [
      "متابعة الاشتراكات المنتهية يدوياً",
      "جداول حصص تتغير ولا تصل إلى الأعضاء",
      "صعوبة تحويل المهتمين إلى مشتركين",
    ],
    features: [
      { title: "جدول حصص تفاعلي", text: "تصفية حسب اليوم والمدرب والمستوى." },
      { title: "باقات الاشتراك", text: "مقارنة واضحة بين الباقات والتجديد الإلكتروني." },
      { title: "حصة تجريبية", text: "تسجيل سريع يحوّل الاهتمام إلى زيارة." },
      { title: "بطاقة عضوية رقمية", text: "دخول النادي برمز QR من الهاتف." },
      { title: "ملفات المدربين", text: "تعريف بالمدربين وتخصصاتهم." },
      { title: "تنبيهات التجديد", text: "تذكير تلقائي قبل انتهاء الاشتراك." },
    ],
    systems: [
      "نظام إدارة العضويات والتجديدات",
      "بطاقات دخول رقمية برمز QR",
      "حجز الحصص والأماكن المحدودة",
      "تقارير الحضور والإيرادات",
    ],
    services: ["web-development", "web-apps"],
    demo: { href: "/demos/gym", label: "نادي PULSE" },
    packageId: "business",
    accent: "#65A30D",
  },
  {
    id: "real-estate",
    image: "/images/solutions/real-estate.webp",
    icon: Home,
    group: "العقارات والشركات",
    system: "Real Estate Portals",
    featured: true,
    name: "العقارات والتطوير العقاري",
    short: "بحث عقاري متقدم وإدارة الوحدات والحجوزات.",
    outcome: "استفسارات تتحول إلى معاينات وصفقات",
    benefits: ["عرض احترافي لكل وحدة", "بحث وفلاتر ذكية", "متابعة العملاء المحتملين"],
    fixes: ["كل وحداتك في منصة واحدة بصور ومخططات احترافية", "فلاتر ذكية وحجز معاينة يحوّل الاستفسار إلى زيارة", "حالة كل وحدة (متاحة/محجوزة) تتحدث لحظياً"],
    headline: "وحداتك أمام المشتري المناسب، في الوقت المناسب.",
    intro:
      "نطوّر للشركات العقارية والمطورين بوابات عرض وبحث متقدمة، وأنظمة لإدارة الوحدات وطلبات المعاينة والعملاء المحتملين.",
    pains: [
      "عرض الوحدات بصور متفرقة على منصات مختلفة",
      "استفسارات كثيرة لا تتحول إلى معاينات",
      "متابعة الوحدات المتاحة والمحجوزة يدوياً",
    ],
    features: [
      { title: "بحث عقاري متقدم", text: "تصفية حسب الموقع والمساحة والسعر وعدد الغرف." },
      { title: "صفحة لكل وحدة", text: "صور ومخططات وموقع على الخريطة ومواصفات كاملة." },
      { title: "حجز المعاينات", text: "طلب معاينة بموعد محدد يصل إلى فريق المبيعات." },
      { title: "حاسبة التقسيط", text: "تقدير الأقساط حسب المقدّم والمدة." },
      { title: "حالة الوحدات لحظياً", text: "متاح ومحجوز ومباع بلا تحديث يدوي." },
      { title: "إدارة العملاء المحتملين", text: "كل استفسار يُسجَّل ويُتابَع حتى البيع." },
    ],
    systems: [
      "محركات بحث عقارية متقدمة بالخرائط والفلاتر",
      "لوحة لإدارة الوحدات وحالتها (متاح، محجوز، مباع)",
      "حجز المعاينات بمواعيد محددة",
      "إدارة العملاء المحتملين لفريق المبيعات",
      "حاسبة تقسيط تساعد العميل على اتخاذ القرار",
    ],
    services: ["web-apps", "web-development"],
    packageId: undefined,
    accent: "#B45309",
  },
  {
    id: "companies",
    image: "/images/solutions/companies.webp",
    group: "العقارات والشركات",
    system: "Business Portals & CRM",
    featured: true,
    icon: Building2,
    name: "الشركات والمؤسسات",
    short: "مواقع مؤسسية وأنظمة CRM وبوابات أعمال مخصصة.",
    outcome: "عمليات منظّمة في نظام واحد",
    benefits: ["أتمتة العمليات الداخلية", "متابعة العملاء والصفقات", "موقع يليق بشركتك"],
    fixes: ["نظام واحد يجمع العمليات بدلاً من الجداول والرسائل", "CRM يتابع كل عميل وصفقة حتى الإغلاق", "موقع حديث يعكس مستوى شركتك الحقيقي"],
    headline: "أنظمة تنظّم شركتك من الداخل، وبوابات تليق بها من الخارج.",
    intro:
      "من الموقع المؤسسي إلى الأنظمة الإدارية الداخلية: نبني للشركات بوابات أعمال وأنظمة CRM وأتمتة لدورات العمل، تنظّم العمليات وتختصر الوقت.",
    pains: [
      "عمليات داخلية متفرقة بين جداول ورسائل وبريد",
      "بيانات العملاء والصفقات بلا متابعة منظمة",
      "موقع قديم لا يمثل مستوى الشركة الحالي",
    ],
    features: [
      { title: "نظام إدارة العملاء (CRM)\u200F", text: "كل عميل وصفقة ومتابعة في مكان واحد، مع تذكير بالخطوة التالية." },
      { title: "بوابة العملاء", text: "يتابع عميلك طلباته ومستنداته وفواتيره دون مراسلات." },
      { title: "أتمتة دورات العمل", text: "طلبات وموافقات داخلية تمر بخطوات واضحة وتلقائية." },
      { title: "لوحات المؤشرات", text: "تقارير لحظية للإدارة بالأرقام التي تهمها." },
      { title: "موقع مؤسسي احترافي", text: "خدمات ومشاريع وفريق تُعرض بما يليق بحجم شركتك." },
      { title: "صلاحيات وأمان", text: "كل موظف يرى ما يخصه فقط، بسجل كامل للتعديلات." },
    ],
    systems: [
      "بوابات إلكترونية مخصصة للعملاء والموظفين",
      "أنظمة إدارة علاقات العملاء (CRM)\u200F",
      "أتمتة دورات العمل والموافقات الداخلية",
      "لوحات مؤشرات أداء وتقارير للإدارة",
      "ربط الأنظمة الحالية عبر واجهات برمجية (APIs)\u200F",
    ],
    services: ["web-apps", "web-development"],
    packageId: undefined,
    accent: "#0284C7",
  },
];

/* ============================ English ============================ */

/** أسماء المجموعات بالإنجليزية */
export const groupEn: Record<SolutionGroup, { full: string; short: string }> = {
  "المطاعم والتجارة": { full: "Food & Retail", short: "Food & Retail" },
  "الصحة والتعليم واللياقة": { full: "Health, Education & Fitness", short: "Health & Education" },
  "العقارات والشركات": { full: "Real Estate & Business", short: "Real Estate & Business" },
};

export const groupLabel = (locale: "ar" | "en", g: SolutionGroup, short = false) =>
  locale === "en" ? (short ? groupEn[g].short : groupEn[g].full) : short ? groupShort[g] : g;

type SolutionText = Pick<Solution, "name" | "short" | "outcome" | "benefits" | "fixes" | "headline" | "intro" | "pains" | "features" | "systems"> & {
  demoLabel?: string;
};

const solutionsEnText: Record<string, SolutionText> = {
  restaurants: {
    name: "Restaurants & Cafés",
    short: "Interactive menus, table bookings and direct orders.",
    outcome: "Direct orders and bookings, with no delivery-app commissions",
    benefits: ["Direct orders on WhatsApp", "A menu you update in seconds", "Table bookings, confirmed instantly"],
    fixes: ["Your website takes orders directly, with no middleman commissions", "A digital menu you update from the dashboard anytime", "Organized online bookings, auto-confirmed on WhatsApp"],
    headline: "Turn your page visitors into real orders and bookings.",
    intro: "We build restaurant and café websites that make every dish look irresistible and let guests book or order directly, without relying entirely on delivery apps.",
    pains: ["Total dependence on delivery apps and their high commissions", "An outdated menu that no longer matches what you serve", "Bookings lost between phone calls and messages"],
    features: [
      { title: "Interactive menu", text: "Clear sections and dishes you can update from the dashboard at any time." },
      { title: "Online table booking", text: "Guests pick the day, time and party size, with instant WhatsApp confirmation." },
      { title: "Direct ordering", text: "Receive orders straight to WhatsApp, with no middleman commissions." },
      { title: "Branch pages", text: "Every branch's address, hours and map in one place." },
      { title: "Food gallery", text: "Professional photos that showcase the best of your menu." },
      { title: "Fast on mobile", text: "A smooth experience, because most of your guests browse on their phones." },
    ],
    systems: [
      "A dashboard to manage orders and bookings from any device",
      "Dynamic QR menus that update in real time",
      "Instant WhatsApp notifications for every new order",
      "Optional integration with your existing cashier system",
      "Sales reports and best-selling dishes at a glance",
    ],
    demoLabel: "Sufra Restaurant",
  },
  clinics: {
    name: "Clinics & Medical Centers",
    short: "Online appointments, plus doctor and service profiles.",
    outcome: "Patients book themselves, and your front desk breathes easier",
    benefits: ["Online booking by doctor", "Automatic reminders before visits", "Clear doctor and service profiles"],
    fixes: ["Patients book online, easing the pressure on your phones", "A page for every doctor and service builds trust before the visit", "Automatic reminders reduce missed appointments"],
    headline: "Organized appointments, and patients who trust you before they arrive.",
    intro: "Calm, trustworthy medical websites that introduce your doctors and services and handle bookings online, easing the load on your phones and reception.",
    pains: ["Phones flooded with booking and inquiry calls", "No clear information about doctors and services", "Missed appointments with no reminders"],
    features: [
      { title: "Online appointments", text: "By doctor, service and real availability." },
      { title: "Doctor profiles", text: "Specialties, experience and credentials that build trust." },
      { title: "Service pages", text: "Simple explanations of every treatment that answer patients' questions." },
      { title: "Appointment reminders", text: "Automatic reminders that reduce missed appointments." },
      { title: "Medical FAQs", text: "Ready answers that save your reception team's time." },
      { title: "Reassuring design", text: "Colors and an experience that put patients at ease from the first visit." },
    ],
    systems: [
      "A simple patient and appointment record with defined permissions",
      "Automatic schedules by doctor and clinic",
      "Appointment reminders by WhatsApp and SMS",
      "Online payment for bookings or deposits when needed",
      "Visit and appointment reports",
    ],
    demoLabel: "Naqaa Clinics",
  },
  education: {
    name: "Education & Training",
    short: "Online course platforms with student enrollment and tracking.",
    outcome: "Your courses online, with paperless enrollment",
    benefits: ["An online course platform", "Student enrollment and progress tracking", "Digital certificates of completion"],
    demoLabel: "Madar Academy",
    fixes: ["A course catalog that shows curriculum, level and instructor before payment", "Online enrollment and payment instead of messages and manual transfers", "QR attendance and progress reports for in-person courses"],
    headline: "Your courses, students and attendance on one platform.",
    intro: "Platforms for academies and training centers that present courses clearly, handle enrollment and payment, and track student progress and attendance, online or in the classroom.",
    pains: ["Courses scattered across posts that don’t explain content or level", "Enrollment and payment by message take staff time and can cost you students", "Tracking attendance and progress by hand"],
    features: [
      { title: "Course catalog", text: "A page for every course with curriculum, length, level and instructor." },
      { title: "Online enrollment & payment", text: "Single courses or monthly and yearly plans." },
      { title: "Student account", text: "Lessons, progress and certificates in one place." },
      { title: "QR attendance", text: "For in-person courses: scan at the door and the record updates instantly." },
      { title: "Notifications & reminders", text: "WhatsApp alerts for session times and updates." },
      { title: "Dashboard & reports", text: "Enrollments, attendance and revenue in clear reports." },
    ],
    systems: [
      "An online course platform with recorded lessons or live sessions",
      "Online enrollment, payments and subscriptions",
      "Student progress tracking and digital certificates",
      "Digital IDs and QR attendance for in-person courses",
      "Group, schedule and notification management",
    ],
  },
  fitness: {
    name: "Gyms & Fitness Centers",
    short: "Memberships, class schedules and QR entry.",
    outcome: "Memberships that renew, and members who stay",
    benefits: ["Automatic membership renewals", "An always up-to-date class schedule", "QR entry"],
    fixes: ["Automatic alerts and renewals before memberships expire", "A live class schedule that reaches every member instantly", "Clear membership pages that turn interest into sign-ups"],
    headline: "Organized memberships, and members who come back every week.",
    intro: "Websites and systems for gyms and fitness centers that showcase classes and coaches, and manage memberships, renewals and digital-card entry.",
    pains: ["Tracking expired memberships by hand", "Class schedules change and never reach members", "Turning interested visitors into members is hard"],
    features: [
      { title: "Interactive class schedule", text: "Filter by day, coach and level." },
      { title: "Membership plans", text: "A clear plan comparison with online renewal." },
      { title: "Free trial class", text: "A quick sign-up that turns interest into a visit." },
      { title: "Digital membership card", text: "Enter the gym with a QR code on your phone." },
      { title: "Coach profiles", text: "Introduce your coaches and their specialties." },
      { title: "Renewal alerts", text: "Automatic reminders before a membership expires." },
    ],
    systems: [
      "Membership and renewal management",
      "QR digital entry cards",
      "Class bookings with limited spots",
      "Attendance and revenue reports",
    ],
    demoLabel: "PULSE Gym",
  },
  stores: {
    name: "Retail & Brands",
    short: "A complete Arabic store with payments, shipping and order management.",
    outcome: "Your own store, selling around the clock with no commissions",
    benefits: ["Online payments and connected shipping", "Inventory that updates automatically", "No marketplace commissions"],
    demoLabel: "RAKD Store",
    fixes: ["A cart and checkout that take orders while you sleep", "Your own store, with no commissions eating your profit", "Inventory and orders that update automatically from one dashboard"],
    headline: "Your own store, your own brand, with no marketplace commissions.",
    intro: "Fast, Arabic-first online stores that make buying easy from the first click, with a complete dashboard for products, orders and inventory.",
    pains: ["Selling through messages wastes time and loses orders", "Platform commissions eat into your profit", "Tracking inventory and orders by hand is hard"],
    features: [
      { title: "A complete Arabic store", text: "Categories, products, and size and color variants." },
      { title: "Online & local payments", text: "Local gateways, mobile wallets and cash on delivery." },
      { title: "Shipping integration", text: "Shipping cost calculation and order tracking." },
      { title: "Offers & coupons", text: "Discount codes, seasonal campaigns and abandoned-cart recovery." },
      { title: "A complete dashboard", text: "Manage inventory, orders and customers in one place." },
      { title: "Instant notifications", text: "An alert for every new order by WhatsApp and email." },
    ],
    systems: [
      "Custom e-commerce, free from platform limits",
      "Local payment gateways and digital wallets",
      "Shipping integrations with automatic tracking",
      "Inventory and orders managed from one dashboard",
      "Sales, customer and abandoned-cart reports",
    ],
  },
  "real-estate": {
    name: "Real Estate & Development",
    short: "Advanced property search, unit management and bookings.",
    outcome: "Inquiries that turn into viewings and deals",
    benefits: ["A professional page for every unit", "Smart search and filters", "Lead follow-up"],
    fixes: ["All your units on one platform, with professional photos and floor plans", "Smart filters and viewing bookings that turn inquiries into visits", "Each unit's status (available or reserved) updates in real time"],
    headline: "Your units in front of the right buyer, at the right time.",
    intro: "We build advanced listing and search portals for real estate companies and developers, plus systems to manage units, viewing requests and leads.",
    pains: ["Units shown with scattered photos across different platforms", "Plenty of inquiries that never turn into viewings", "Tracking available and reserved units by hand"],
    features: [
      { title: "Advanced property search", text: "Filter by location, area, price and number of rooms." },
      { title: "A page for every unit", text: "Photos, floor plans, map location and full specifications." },
      { title: "Viewing bookings", text: "Viewing requests with set times, sent straight to your sales team." },
      { title: "Installment calculator", text: "Estimate installments by down payment and term." },
      { title: "Live unit status", text: "Available, reserved and sold, with no manual updates." },
      { title: "Lead management", text: "Every inquiry is logged and followed up until the sale." },
    ],
    systems: [
      "Advanced property search with maps and filters",
      "A dashboard for units and their status (available, reserved, sold)",
      "Viewing bookings with set appointments",
      "Lead management for your sales team",
      "An installment calculator that helps buyers decide",
    ],
  },
  companies: {
    name: "Companies & Organizations",
    short: "Corporate websites, CRM and custom business portals.",
    outcome: "Organized operations, in one system",
    benefits: ["Automated internal operations", "Customer and deal follow-up", "A website worthy of your company"],
    fixes: ["One system for your operations instead of spreadsheets and messages", "A CRM that follows every client and deal to the close", "A modern website that reflects your company's true caliber"],
    headline: "Systems that organize your company inside, and portals that represent it outside.",
    intro: "From corporate websites to internal management systems, we build business portals, CRM systems and workflow automation that organize your operations and save time.",
    pains: ["Internal operations scattered across spreadsheets, messages and email", "Customer and deal data with no organized follow-up", "An outdated website that doesn't reflect your company today"],
    features: [
      { title: "CRM", text: "Every client, deal and follow-up in one place, with reminders for the next step." },
      { title: "Client portal", text: "Clients follow their requests, documents and invoices without back-and-forth." },
      { title: "Workflow automation", text: "Internal requests and approvals that move through clear, automatic steps." },
      { title: "KPI dashboards", text: "Real-time reports with the numbers management cares about." },
      { title: "A professional corporate site", text: "Services, projects and people presented as your company deserves." },
      { title: "Permissions & security", text: "Each employee sees only what's relevant, with a full audit trail." },
    ],
    systems: [
      "Custom portals for clients and employees",
      "Customer relationship management (CRM)",
      "Workflow and internal approval automation",
      "KPI dashboards and management reports",
      "Integration with your existing systems via APIs",
    ],
  },
};

export const solutionsEn: Solution[] = solutions.map((s) => {
  const { demoLabel, ...text } = solutionsEnText[s.id];
  return { ...s, ...text, demo: s.demo ? { ...s.demo, label: demoLabel ?? s.demo.label } : undefined };
});

export const getSolutions = (locale: "ar" | "en") => (locale === "en" ? solutionsEn : solutions);

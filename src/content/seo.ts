import type { Locale } from "@/i18n";

/**
 * عناوين ووصف جوجل (SEO) — مبنية على الكلمات اللي العملاء بيكتبوها فعلاً في البحث:
 * «تصميم مواقع»، «شركة تصميم مواقع في مصر»، «عمل متجر إلكتروني»، «تصميم لاندنج بيج»…
 * العنوان من غير اسم البراند (بيتضاف تلقائياً لو المساحة تسمح). الوصف حتى ~155 حرف.
 */
type Meta = { title: string; description: string; keywords?: string[]; shareTitle?: string; shareDescription?: string };
type Pair = { ar: Meta; en: Meta };

export const pageSeo = {
  home: {
    ar: {
      title: "تصميم مواقع ومتاجر إلكترونية في مصر | حلولك تيك",
      description:
        "حلولك تيك شركة تصميم وبرمجة مواقع في مصر: مواقع شركات، متاجر إلكترونية، صفحات هبوط ولوحات تحكم سريعة وآمنة، مع عرض مكتوب ودعم بعد الإطلاق.",
    },
    en: {
      title: "Web Design & Development Company in Egypt | Holoolk Tech",
      description:
        "Holoolk Tech builds fast, secure business websites, e-commerce stores, landing pages and custom dashboards for companies in Egypt and the Gulf.",
    },
  },
  services: {
    ar: {
      title: "خدمات تصميم وبرمجة المواقع",
      description:
        "تصميم مواقع الشركات، المتاجر الإلكترونية، صفحات الهبوط، لوحات التحكم وواجهات UI/UX مع صيانة ودعم فني — حلول ويب احترافية للشركات في مصر والخليج.",
    },
    en: {
      title: "Web Design & Development Services",
      description:
        "Business websites, e-commerce stores, landing pages, dashboards, UI/UX design and website maintenance for companies in Egypt and the Gulf.",
    },
  },
  solutions: {
    ar: {
      title: "تصميم مواقع حسب نشاطك",
      description:
        "مواقع مصممة لطريقة عمل كل مجال: المطاعم والكافيهات، المتاجر، العيادات، التعليم، الجيم، العقارات والشركات — بمزايا جاهزة لنشاطك.",
    },
    en: {
      title: "Website Solutions by Industry",
      description:
        "Websites shaped around how your industry works: restaurants, stores, clinics, education, gyms, real estate and companies.",
    },
  },
  work: {
    ar: {
      title: "أعمالنا ونماذج مواقع تعمل فعلياً",
      description:
        "جرّب نماذج توضيحية لمواقع ومتاجر صممتها حلولك تيك: متجر إلكتروني، موقع مطعم، منصة تعليمية وغيرها — على الجوال قبل أن تبدأ مشروعك.",
    },
    en: {
      title: "Our Work & Live Website Demos",
      description:
        "Try live demo websites built by Holoolk Tech: an online store, a restaurant site, an education platform and more — on your phone, before you start.",
    },
  },
  pricing: {
    ar: {
      title: "باقات تصميم المواقع والمتاجر",
      description:
        "قارن باقات تصميم موقعك أو متجرك الإلكتروني: عدد الصفحات، لوحة التحكم، SEO، التحليلات والدعم الفني — واحصل على عرض مكتوب خلال 24 ساعة عمل.",
    },
    en: {
      title: "Website Design Packages",
      description:
        "Compare packages for your website or online store: pages, dashboard, SEO, analytics and support — and get a written proposal within 24 business hours.",
    },
  },
  about: {
    ar: {
      title: "من نحن — استوديو تصميم مواقع في القاهرة",
      description:
        "حلولك تيك استوديو متخصص في تصميم وبرمجة المواقع والمتاجر الإلكترونية من القاهرة، نعمل بعرض مكتوب ومراحل واضحة وملكية كاملة للكود.",
    },
    en: {
      title: "About Us — Web Design Studio in Cairo",
      description:
        "Holoolk Tech is a Cairo-based studio focused on websites and online stores, working with written scopes, clear milestones and full code ownership.",
    },
  },
  contact: {
    ar: {
      title: "تواصل معنا لتصميم موقعك",
      description:
        "تواصل مع حلولك تيك عبر واتساب أو البريد الإلكتروني لبدء تصميم موقعك أو متجرك الإلكتروني، ونرد عليك خلال 24 ساعة بخطة مبدئية.",
    },
    en: {
      title: "Contact Us About Your Website",
      description:
        "Reach Holoolk Tech on WhatsApp or email to start your website or online store — we reply within 24 hours with an initial plan.",
    },
  },
  start: {
    ar: {
      title: "اطلب عرض سعر لتصميم موقعك",
      description:
        "أجب عن أسئلة بسيطة عن مشروعك واحصل على خطة مبدئية وعرض مكتوب لتصميم موقعك أو متجرك الإلكتروني خلال 24 ساعة عمل، دون أي التزام.",
    },
    en: {
      title: "Get a Website Quote",
      description:
        "Answer a few quick questions about your project and get an initial plan and written proposal for your website or store within 24 business hours.",
    },
  },
  book: {
    ar: {
      title: "استشارة مجانية لتصميم موقعك",
      description:
        "احجز استشارة مجانية مع حلولك تيك عبر واتساب أو مكالمة فيديو لمناقشة فكرة موقعك أو متجرك الإلكتروني واختيار الحل الأنسب لك.",
    },
    en: {
      title: "Free Website Consultation",
      description:
        "Book a free consultation with Holoolk Tech over WhatsApp or video call to discuss your website or online store and choose the right approach.",
    },
  },
  faq: {
    ar: {
      title: "أسئلة شائعة عن تصميم المواقع",
      description:
        "إجابات واضحة عن مدة تصميم الموقع، الاستضافة والدومين، لوحة التحكم، الدفع الإلكتروني، ملكية الكود والدعم الفني بعد الإطلاق.",
    },
    en: {
      title: "Website Design FAQ",
      description:
        "Clear answers about project timelines, hosting and domains, dashboards, online payments, code ownership and post-launch support.",
    },
  },
  blog: {
    ar: {
      title: "مقالات عن تصميم المواقع والتجارة الإلكترونية",
      description:
        "نصائح عملية عن تصميم المواقع والمتاجر الإلكترونية، الظهور في نتائج جوجل وتحويل زوار موقعك إلى عملاء.",
    },
    en: {
      title: "Insights on Web Design & E-commerce",
      description:
        "Practical advice on websites and online stores, ranking on Google and turning your visitors into customers.",
    },
  },
  process: {
    ar: {
      title: "خطوات تصميم موقعك معنا",
      description:
        "من الاستشارة والعرض المكتوب إلى التصميم والبرمجة والإطلاق والدعم: تعرّف على مراحل تنفيذ موقعك مع حلولك تيك ومدة كل مرحلة.",
    },
    en: {
      title: "How We Build Your Website",
      description:
        "From consultation and written proposal to design, development, launch and support — the stages of your website project and how long each takes.",
    },
  },
  audit: {
    ar: {
      title: "فحص مجاني لموقعك: السرعة وSEO",
      description:
        "احصل على تقييم مجاني لموقعك الحالي: السرعة على الجوال، الظهور في جوجل، الأمان وتجربة المستخدم، مع توصيات عملية للتحسين.",
    },
    en: {
      title: "Free Website Audit: Speed & SEO",
      description:
        "Get a free review of your current website: mobile speed, Google visibility, security and user experience, with practical recommendations.",
    },
  },
  international: {
    ar: {
      title: "تصميم مواقع لعملاء الخليج وخارج مصر",
      description:
        "نصمم مواقع ومتاجر إلكترونية لعملاء السعودية والإمارات والكويت وقطر وخارج مصر، عن بُعد بالكامل وبمواعيد تناسب منطقتك الزمنية.",
    },
    en: {
      title: "Web Design for Gulf & International Clients",
      description:
        "We build websites and online stores for clients in Saudi Arabia, the UAE, Kuwait, Qatar and beyond — fully remote, on your time zone.",
    },
  },
} satisfies Record<string, Pair>;

/** صفحات الخدمات — الكلمة المفتاحية في أول العنوان */
export const serviceSeo: Record<string, Pair> = {
  "web-development": {
    ar: {
      title: "تصميم موقع شركة احترافي",
      description:
        "تصميم وبرمجة موقع شركة سريع ومتجاوب مع الجوال يعرض خدماتك وأعمالك، مع لوحة تحكم لتحديث المحتوى وتهيئة كاملة لمحركات البحث.",
    },
    en: {
      title: "Business Website Design",
      description:
        "A fast, mobile-friendly company website that presents your services and work, with a dashboard to update content and full SEO setup.",
    },
  },
  "e-commerce": {
    ar: {
      title: "تصميم متجر إلكتروني متكامل",
      description:
        "عمل متجر إلكتروني عربي مع بوابات الدفع المحلية والمحافظ والدفع عند الاستلام، وإدارة المنتجات والطلبات والشحن من لوحة تحكم واحدة.",
    },
    en: {
      title: "E-commerce Website Development",
      description:
        "A complete online store with local and international payment options, cash on delivery, and products, orders and shipping managed from one dashboard.",
    },
  },
  "landing-pages": {
    ar: {
      title: "تصميم صفحة هبوط (Landing Page) للإعلانات",
      description:
        "تصميم لاندنج بيج سريعة لحملاتك على فيسبوك وتيك توك وجوجل، مركّزة على خطوة واحدة ومربوطة بالبكسل لزيادة التحويلات.",
    },
    en: {
      title: "Landing Page Design for Ads",
      description:
        "Fast landing pages for your Facebook, TikTok and Google campaigns, focused on one clear action and connected to your tracking pixels.",
    },
  },
  "web-apps": {
    ar: {
      title: "برمجة لوحات تحكم وأنظمة إدارة",
      description:
        "برمجة أنظمة ولوحات تحكم مخصصة لإدارة الحجوزات والعملاء والطلبات والمخزون، بصلاحيات للموظفين وتقارير واضحة ومتاحة من أي جهاز.",
    },
    en: {
      title: "Custom Dashboards & Web Systems",
      description:
        "Custom dashboards and web systems to manage bookings, customers, orders and inventory, with staff permissions and clear reports.",
    },
  },
  "ui-ux-design": {
    ar: {
      title: "تصميم واجهات المستخدم UI/UX",
      description:
        "تصميم واجهات وتجربة مستخدم لموقعك أو تطبيقك على Figma كنموذج تفاعلي تجرّبه وتعتمده قبل البرمجة، مع ملفات منظمة للمطورين.",
    },
    en: {
      title: "UI/UX Design",
      description:
        "Website and app interface design in Figma as an interactive prototype you can test and approve before development, with organized developer files.",
    },
  },
  "maintenance-support": {
    ar: {
      title: "صيانة المواقع والدعم الفني",
      description:
        "صيانة ودعم فني لموقعك: نسخ احتياطي، مراقبة الأمان وشهادات SSL، تحديث المكتبات البرمجية وتنفيذ التعديلات بسرعة.",
    },
    en: {
      title: "Website Maintenance & Support",
      description:
        "Ongoing website care: backups, security and SSL monitoring, library updates and fast content changes.",
    },
  },
};

/** صفحات المجالات — «تصميم موقع + نوع النشاط» */
export const solutionSeoTitle: Record<string, { ar: string; en: string }> = {
  restaurants: { ar: "تصميم موقع مطعم وكافيه", en: "Restaurant & Café Website Design" },
  stores: { ar: "تصميم متجر إلكتروني للبراندات", en: "Online Store Design for Brands" },
  clinics: { ar: "تصميم موقع عيادة ومركز طبي", en: "Clinic & Medical Center Website Design" },
  education: { ar: "تصميم منصة تعليمية وموقع تدريب", en: "Education & Training Platform Design" },
  fitness: { ar: "تصميم موقع جيم ونادي رياضي", en: "Gym & Fitness Website Design" },
  "real-estate": { ar: "تصميم موقع عقارات", en: "Real Estate Website Design" },
  companies: { ar: "تصميم موقع شركة ومؤسسة", en: "Company & Organization Website Design" },
};

/** اسم البراند — بيتضاف لكل صفحة */
export const brandKeywords: Record<Locale, string[]> = {
  ar: ["حلولك تيك", "Holoolk Tech", "حلولك", "holoolktech"],
  en: ["Holoolk Tech", "حلولك تيك", "holoolktech"],
};

/** الكلمات الأساسية للموقع كله (الصفحة الرئيسية والجذر) */
export const siteKeywords: Record<Locale, string[]> = {
  ar: [
    "تصميم مواقع", "تصميم مواقع في مصر", "شركة تصميم مواقع", "أفضل شركة تصميم مواقع في مصر", "تصميم مواقع القاهرة",
    "برمجة مواقع", "تطوير مواقع", "عمل موقع إلكتروني", "إنشاء موقع إلكتروني", "تصميم موقع احترافي", "تكلفة تصميم موقع",
    "تصميم موقع شركة", "تصميم مواقع الشركات", "تصميم متجر إلكتروني", "عمل متجر إلكتروني", "إنشاء متجر إلكتروني",
    "تصميم صفحة هبوط", "تصميم لاندنج بيج", "برمجة لوحة تحكم", "تصميم أنظمة ويب", "نظام حجز مواعيد أونلاين",
    "تصميم UI UX", "تحسين محركات البحث", "سيو SEO", "تصميم مواقع متجاوبة مع الجوال", "موقع سريع وآمن",
    "تصميم مواقع للمطاعم", "تصميم موقع عيادة", "تصميم منصة تعليمية", "تصميم موقع عقارات", "تصميم موقع جيم",
    "تصميم مواقع السعودية", "تصميم مواقع الإمارات", "تصميم مواقع الخليج", "مبرمج مواقع", "مطور مواقع فريلانسر",
  ],
  en: [
    "web design Egypt", "web design company in Egypt", "website design Cairo", "web development company Egypt", "website development Cairo",
    "best web design agency Egypt", "custom website development", "business website design", "company website design", "professional website design",
    "e-commerce website development", "online store design", "build an online store", "Arabic e-commerce website", "landing page design",
    "custom dashboard development", "web application development", "booking system development", "UI/UX design", "SEO services Egypt",
    "responsive web design", "fast secure websites", "Next.js development agency", "Arabic website design", "bilingual Arabic English website",
    "restaurant website design", "clinic website design", "real estate website design", "gym website design", "education platform development",
    "web design Saudi Arabia", "web design UAE", "web design Dubai", "web design Gulf", "offshore web development Egypt",
  ],
};

/** كلمات إضافية لكل صفحة */
const pageKeywords: Partial<Record<keyof typeof pageSeo, Record<Locale, string[]>>> = {
  services: {
    ar: ["خدمات تصميم المواقع", "خدمات برمجة المواقع", "تصميم وبرمجة المواقع", "صيانة المواقع", "تصميم UI UX"],
    en: ["web design services", "website development services", "website maintenance", "UI/UX design services"],
  },
  solutions: {
    ar: ["تصميم موقع مطعم", "تصميم موقع عيادة", "تصميم موقع جيم", "تصميم موقع عقارات", "تصميم منصة تعليمية", "تصميم موقع شركة"],
    en: ["industry website solutions", "restaurant website", "clinic website", "gym website", "real estate website", "education platform"],
  },
  work: {
    ar: ["نماذج مواقع", "أمثلة مواقع إلكترونية", "معرض أعمال تصميم مواقع", "نموذج متجر إلكتروني"],
    en: ["website examples", "web design portfolio", "website demos", "online store demo"],
  },
  pricing: {
    ar: ["أسعار تصميم المواقع", "تكلفة تصميم موقع", "باقات تصميم المواقع", "سعر عمل متجر إلكتروني", "عرض سعر موقع"],
    en: ["website design packages", "website design cost Egypt", "e-commerce website cost", "website quote"],
  },
  about: {
    ar: ["استوديو تصميم مواقع", "شركة برمجة في القاهرة", "فريق تطوير مواقع"],
    en: ["web design studio Cairo", "web development team Egypt", "about Holoolk Tech"],
  },
  contact: {
    ar: ["تواصل مع شركة تصميم مواقع", "رقم شركة تصميم مواقع", "واتساب تصميم مواقع"],
    en: ["contact web design company", "web designer WhatsApp Egypt"],
  },
  start: {
    ar: ["طلب تصميم موقع", "عرض سعر تصميم موقع", "ابدأ مشروع موقع"],
    en: ["website quote request", "start a website project", "website proposal"],
  },
  book: {
    ar: ["استشارة مجانية تصميم موقع", "استشارة تقنية مجانية"],
    en: ["free website consultation", "free web design consultation"],
  },
  faq: {
    ar: ["أسئلة تصميم المواقع", "كم يستغرق تصميم موقع", "استضافة ودومين", "ملكية كود الموقع"],
    en: ["web design FAQ", "how long to build a website", "hosting and domain", "website code ownership"],
  },
  blog: {
    ar: ["مقالات تصميم المواقع", "نصائح التجارة الإلكترونية", "الظهور في جوجل", "تسويق رقمي"],
    en: ["web design blog", "e-commerce tips", "SEO tips", "digital marketing"],
  },
  process: {
    ar: ["مراحل تصميم موقع", "خطوات إنشاء موقع إلكتروني", "مدة تصميم موقع"],
    en: ["website development process", "web design steps", "website timeline"],
  },
  audit: {
    ar: ["فحص موقع مجاني", "تحليل سرعة الموقع", "فحص سيو مجاني", "تقييم موقع إلكتروني"],
    en: ["free website audit", "website speed test", "free SEO audit", "website review"],
  },
  international: {
    ar: ["تصميم مواقع السعودية", "تصميم مواقع الإمارات", "تصميم مواقع الكويت", "تصميم مواقع قطر", "شركة تصميم مواقع عن بعد"],
    en: ["web design Saudi Arabia", "web design UAE", "web design Kuwait", "web design Qatar", "remote web development team"],
  },
};

/** كلمات صفحات الخدمات */
export const serviceKeywords: Record<string, Record<Locale, string[]>> = {
  "web-development": {
    ar: ["تصميم موقع شركة", "تصميم مواقع الشركات", "موقع تعريفي", "تصميم موقع احترافي", "برمجة موقع شركة"],
    en: ["business website design", "corporate website", "company website development", "professional website"],
  },
  "e-commerce": {
    ar: ["تصميم متجر إلكتروني", "عمل متجر إلكتروني", "إنشاء متجر أونلاين", "بوابات الدفع", "الدفع عند الاستلام", "متجر إلكتروني بالعربي"],
    en: ["e-commerce website development", "online store design", "payment gateway integration", "cash on delivery store", "Arabic online store"],
  },
  "landing-pages": {
    ar: ["تصميم صفحة هبوط", "تصميم لاندنج بيج", "صفحة هبوط للإعلانات", "صفحة مبيعات", "ربط بكسل فيسبوك"],
    en: ["landing page design", "ad landing page", "sales page", "Facebook Pixel setup", "conversion landing page"],
  },
  "web-apps": {
    ar: ["برمجة لوحة تحكم", "نظام إدارة", "نظام حجز مواعيد", "نظام إدارة عملاء CRM", "برمجة أنظمة سحابية", "SaaS"],
    en: ["custom dashboard development", "web application development", "booking system", "CRM development", "SaaS development"],
  },
  "ui-ux-design": {
    ar: ["تصميم UI UX", "تصميم واجهات المستخدم", "تصميم تجربة المستخدم", "تصميم فيجما Figma", "نموذج تفاعلي"],
    en: ["UI/UX design", "user interface design", "Figma prototype", "user experience design"],
  },
  "maintenance-support": {
    ar: ["صيانة المواقع", "دعم فني للمواقع", "حماية المواقع", "نسخ احتياطي للموقع", "تحديث الموقع"],
    en: ["website maintenance", "website support", "website security", "website backups"],
  },
};

/** كلمات صفحات المجالات */
export const solutionKeywords: Record<string, Record<Locale, string[]>> = {
  restaurants: { ar: ["تصميم موقع مطعم", "منيو إلكتروني", "حجز طاولات أونلاين", "موقع كافيه", "طلبات أونلاين بدون عمولة"], en: ["restaurant website design", "digital menu", "online table booking", "café website"] },
  stores: { ar: ["تصميم متجر إلكتروني", "متجر براند ملابس", "متجر أونلاين", "بيع أونلاين بدون عمولة"], en: ["online store for brands", "fashion e-commerce", "D2C online store"] },
  clinics: { ar: ["تصميم موقع عيادة", "موقع طبيب", "حجز مواعيد عيادة أونلاين", "موقع مركز طبي"], en: ["clinic website design", "doctor website", "online appointment booking", "medical center website"] },
  education: { ar: ["تصميم منصة تعليمية", "موقع كورسات", "منصة تدريب أونلاين", "موقع سنتر تعليمي"], en: ["education platform development", "online course website", "training center website"] },
  fitness: { ar: ["تصميم موقع جيم", "موقع نادي رياضي", "نظام اشتراكات جيم", "موقع مدرب رياضي"], en: ["gym website design", "fitness center website", "gym membership system"] },
  "real-estate": { ar: ["تصميم موقع عقارات", "موقع شركة تطوير عقاري", "عرض وحدات عقارية أونلاين"], en: ["real estate website design", "property developer website", "property listings website"] },
  companies: { ar: ["تصميم موقع شركة", "موقع مؤسسة", "بوابة أعمال", "موقع شركة احترافي"], en: ["company website design", "corporate website", "business portal"] },
};

/** مشاركة الصفحة الرئيسية على فيسبوك وواتساب — صياغة تسويقية أكتر من جوجل */
const homeShare: Record<Locale, { shareTitle: string; shareDescription: string }> = {
  ar: {
    shareTitle: "حلولك تيك | مواقع ومتاجر إلكترونية تقود عملك نحو المستقبل",
    shareDescription:
      "نصمم ونبرمج مواقع الشركات والمتاجر الإلكترونية ولوحات التحكم: سريعة، آمنة، ومتجاوبة مع الجوال. اطلب خطتك المبدئية وعرضك المكتوب مجاناً خلال 24 ساعة.",
  },
  en: {
    shareTitle: "Holoolk Tech | Websites & Online Stores That Move Your Business Forward",
    shareDescription:
      "We design and build business websites, online stores and dashboards — fast, secure and mobile-first. Get a free initial plan and written proposal within 24 hours.",
  },
};

export const seoFor = (key: keyof typeof pageSeo, locale: Locale): Meta => ({
  ...pageSeo[key][locale],
  keywords: key === "home" ? siteKeywords[locale] : pageKeywords[key]?.[locale],
  ...(key === "home" ? homeShare[locale] : {}),
});

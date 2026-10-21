/**
 * إعدادات الموقع العامة — عدّل البيانات دي بس وكل الموقع هيتحدث.
 * ⚠️ البيانات اللي عليها TODO لازم تتغير قبل النشر.
 */
export const siteConfig = {
  name: "حلولك تيك",
  nameEn: "Holoolk Tech",
  tagline: "حلول رقمية تقود عملك نحو المستقبل",
  taglineEn: "Digital solutions that drive your business forward",
  description:
    "حلولك تيك شركة تصميم وبرمجة مواقع في مصر: مواقع شركات، متاجر إلكترونية، صفحات هبوط ولوحات تحكم سريعة وآمنة ومتجاوبة مع الجوال، بعرض مكتوب ودعم بعد الإطلاق.",
  descriptionEn:
    "Holoolk Tech is a web design and development company in Egypt building fast, secure, mobile-first business websites, online stores, landing pages and dashboards.",
  /** الدومين الرسمي (بيتحدد في next.config.ts) */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.holoolktech.com",
  locale: "ar_EG",
  /** سنة الإطلاق — تظهر في حقوق الملكية بالفوتر */
  launchYear: 2026,

  contact: {
    whatsapp: "201063256491",
    phoneDisplay: "+20 106 325 6491",
    email: "info@holoolktech.com",
    location: "القاهرة، جمهورية مصر العربية",
    locationEn: "Cairo, Egypt",
    hours: "السبت – الخميس: 9:00 ص – 6:00 م",
    hoursEn: "Saturday – Thursday, 9:00 AM – 6:00 PM (Cairo time)",
  },

  /** ⚠️ TODO: ضع روابط صفحاتك الحقيقية. أي حساب تتركه فارغاً "" لن يظهر في الموقع. */
  socials: {
    facebook: "https://www.facebook.com/holoolktech",
    instagram: "https://instagram.com/holoolktech",
  },
} as const;

/**
 * صورة المعاينة عند مشاركة الرابط (واتساب، فيسبوك، لينكدإن) — 1200×630.
 * Next.js يضيفها تلقائياً للصفحات، لكن أي صفحة تكتب openGraph خاص بها يجب أن تمرّرها صراحةً.
 */
export const ogImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "حلولك تيك — حلول رقمية تقود عملك نحو المستقبل",
};

/**
 * الظهور في جوجل: مقفول طول ما الموقع على رابط مؤقت (*.vercel.app)،
 * وبيفتح لوحده أول ما الدومين الحقيقي يتربط في Vercel.
 */
export const siteIndexable = !/\.vercel\.app$/i.test(new URL(siteConfig.url).host);

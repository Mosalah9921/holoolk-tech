import { BarChart3, Code2, Languages, Megaphone, PenTool, type LucideIcon } from "lucide-react";

/** بيانات المنصة التعليمية النموذجية «مَدار» — دورات ومدربون افتراضيون لأغراض العرض */
export type Track = "code" | "design" | "marketing" | "data" | "lang";
export type Level = "مبتدئ" | "متوسط" | "متقدم";

export const tracks: Record<Track, { label: string; icon: LucideIcon; from: string; to: string }> = {
  code: { label: "البرمجة", icon: Code2, from: "#3B2DB8", to: "#6D5DF5" },
  design: { label: "التصميم", icon: PenTool, from: "#C2410C", to: "#FB923C" },
  marketing: { label: "التسويق الرقمي", icon: Megaphone, from: "#0F766E", to: "#2DD4BF" },
  data: { label: "تحليل البيانات", icon: BarChart3, from: "#1D4ED8", to: "#60A5FA" },
  lang: { label: "اللغات", icon: Languages, from: "#9D174D", to: "#F472B6" },
};

export type Course = {
  id: string;
  title: string;
  track: Track;
  level: Level;
  instructor: { name: string; role: string };
  lessons: number;
  hours: number;
  price: number;
  tag?: "جديد" | "الأكثر تسجيلاً" | "مباشر";
  summary: string;
  outcomes: string[];
  modules: { title: string; lessons: { title: string; min: number; free?: boolean }[] }[];
};

export const courses: Course[] = [
  {
    id: "frontend",
    title: "تطوير واجهات الويب من الصفر إلى الاحتراف",
    track: "code",
    level: "مبتدئ",
    instructor: { name: "م. كريم سامي", role: "مطوّر واجهات أول" },
    lessons: 64,
    hours: 38,
    price: 1490,
    tag: "الأكثر تسجيلاً",
    summary: "ابدأ من HTML وCSS وصولاً إلى JavaScript وReact، وابنِ 6 مشاريع حقيقية تضيفها إلى معرض أعمالك.",
    outcomes: ["بناء صفحات متجاوبة باحترافية", "كتابة JavaScript حديثة بثقة", "تطوير تطبيقات React", "نشر مشاريعك على الإنترنت"],
    modules: [
      { title: "أساسيات الويب", lessons: [{ title: "كيف يعمل الإنترنت والمتصفح", min: 12, free: true }, { title: "هيكل الصفحة بـ HTML", min: 24 }, { title: "التنسيق بـ CSS", min: 31 }] },
      { title: "JavaScript الحديثة", lessons: [{ title: "المتغيرات والدوال", min: 28 }, { title: "التعامل مع الصفحة DOM", min: 35 }, { title: "جلب البيانات من API", min: 26 }] },
      { title: "React عملياً", lessons: [{ title: "المكوّنات والخصائص", min: 30 }, { title: "إدارة الحالة", min: 33 }, { title: "مشروع: متجر صغير", min: 54 }] },
    ],
  },
  {
    id: "uiux",
    title: "تصميم تجربة وواجهات المستخدم UI/UX",
    track: "design",
    level: "مبتدئ",
    instructor: { name: "أ. سلمى فؤاد", role: "مصممة منتجات رقمية" },
    lessons: 42,
    hours: 24,
    price: 1290,
    tag: "جديد",
    summary: "تعلّم التفكير التصميمي وأدوات Figma، وصمّم تطبيقاً كاملاً من البحث إلى النموذج التفاعلي.",
    outcomes: ["فهم احتياجات المستخدم", "تصميم واجهات أنيقة في Figma", "بناء نظام تصميم", "تقديم نماذج تفاعلية للعميل"],
    modules: [
      { title: "التفكير التصميمي", lessons: [{ title: "ما الفرق بين UI وUX؟", min: 14, free: true }, { title: "بحث المستخدم", min: 26 }] },
      { title: "Figma باحتراف", lessons: [{ title: "الإطارات والتخطيط التلقائي", min: 29 }, { title: "المكوّنات والمتغيرات", min: 32 }] },
      { title: "مشروع التخرج", lessons: [{ title: "تصميم تطبيق حجز", min: 48 }, { title: "النموذج التفاعلي", min: 37 }] },
    ],
  },
  {
    id: "ads",
    title: "إعلانات السوشيال ميديا بنتائج قابلة للقياس",
    track: "marketing",
    level: "متوسط",
    instructor: { name: "أ. ياسمين حمدي", role: "خبيرة تسويق أداء" },
    lessons: 30,
    hours: 16,
    price: 990,
    summary: "خطط لحملات ميتا وتيك توك، واستهدف الجمهور الصحيح، واقرأ النتائج لتخفض تكلفة العميل.",
    outcomes: ["بناء استراتيجية إعلانية", "إعداد البكسل وتتبع التحويلات", "اختبار الإعلانات A/B", "تحليل العائد على الإنفاق"],
    modules: [
      { title: "أساسيات الحملات", lessons: [{ title: "رحلة العميل والقمع البيعي", min: 18, free: true }, { title: "اختيار هدف الحملة", min: 21 }] },
      { title: "الاستهداف والمحتوى", lessons: [{ title: "الجماهير المشابهة", min: 24 }, { title: "كتابة إعلان يبيع", min: 27 }] },
    ],
  },
  {
    id: "excel-bi",
    title: "تحليل البيانات بـ Excel وPower BI",
    track: "data",
    level: "مبتدئ",
    instructor: { name: "م. عمرو رأفت", role: "محلل بيانات" },
    lessons: 36,
    hours: 20,
    price: 1090,
    tag: "الأكثر تسجيلاً",
    summary: "حوّل الجداول إلى قرارات: تنظيف البيانات، والدوال المتقدمة، ولوحات تقارير تفاعلية في Power BI.",
    outcomes: ["تنظيف البيانات وتنظيمها", "الجداول المحورية والدوال المتقدمة", "لوحات Power BI تفاعلية", "عرض النتائج للإدارة"],
    modules: [
      { title: "Excel للمحللين", lessons: [{ title: "تنظيف البيانات بسرعة", min: 22, free: true }, { title: "الجداول المحورية", min: 30 }] },
      { title: "Power BI", lessons: [{ title: "نمذجة البيانات", min: 34 }, { title: "لوحة مبيعات تفاعلية", min: 41 }] },
    ],
  },
  {
    id: "python",
    title: "بايثون لتحليل البيانات والأتمتة",
    track: "data",
    level: "متوسط",
    instructor: { name: "م. عمرو رأفت", role: "محلل بيانات" },
    lessons: 48,
    hours: 28,
    price: 1390,
    tag: "مباشر",
    summary: "جلسات مباشرة أسبوعية تتعلم فيها بايثون وPandas، وتؤتمت مهام العمل المتكررة.",
    outcomes: ["أساسيات بايثون بثقة", "تحليل البيانات بـ Pandas", "رسوم بيانية واضحة", "أتمتة التقارير المتكررة"],
    modules: [
      { title: "بايثون أولاً", lessons: [{ title: "إعداد بيئة العمل", min: 15, free: true }, { title: "الحلقات والدوال", min: 33 }] },
      { title: "Pandas", lessons: [{ title: "قراءة الملفات وتنظيفها", min: 36 }, { title: "التجميع والتحليل", min: 39 }] },
    ],
  },
  {
    id: "english",
    title: "الإنجليزية للأعمال والمقابلات",
    track: "lang",
    level: "متوسط",
    instructor: { name: "أ. نادين خليل", role: "مدربة لغة إنجليزية" },
    lessons: 40,
    hours: 22,
    price: 890,
    summary: "مراسلات مهنية، وعروض تقديمية، واستعداد عملي لمقابلات العمل بالإنجليزية.",
    outcomes: ["كتابة بريد مهني", "التحدث في الاجتماعات بثقة", "تقديم العروض", "اجتياز مقابلات العمل"],
    modules: [
      { title: "التواصل المكتوب", lessons: [{ title: "بريد إلكتروني احترافي", min: 19, free: true }, { title: "التقارير المختصرة", min: 24 }] },
      { title: "التحدث والمقابلات", lessons: [{ title: "عرّف نفسك في دقيقتين", min: 21 }, { title: "أسئلة المقابلة الأشهر", min: 32 }] },
    ],
  },
  {
    id: "brand",
    title: "تصميم الهوية البصرية للعلامات التجارية",
    track: "design",
    level: "متقدم",
    instructor: { name: "أ. سلمى فؤاد", role: "مصممة منتجات رقمية" },
    lessons: 28,
    hours: 18,
    price: 1190,
    summary: "من فهم العلامة إلى الشعار ودليل الهوية الكامل، مع دراسات حالة لعلامات عربية.",
    outcomes: ["تحليل العلامة والجمهور", "تصميم شعار قوي", "بناء لوحة الألوان والخطوط", "إعداد دليل الهوية"],
    modules: [
      { title: "استراتيجية العلامة", lessons: [{ title: "شخصية العلامة", min: 17, free: true }, { title: "تحليل المنافسين", min: 22 }] },
      { title: "الشعار والدليل", lessons: [{ title: "رسم الشعار", min: 38 }, { title: "دليل الهوية", min: 35 }] },
    ],
  },
  {
    id: "backend",
    title: "تطوير الخوادم بـ Node.js وقواعد البيانات",
    track: "code",
    level: "متقدم",
    instructor: { name: "م. كريم سامي", role: "مطوّر واجهات أول" },
    lessons: 52,
    hours: 32,
    price: 1590,
    tag: "جديد",
    summary: "ابنِ واجهات برمجية آمنة بـ Node.js وPostgreSQL، مع المصادقة والصلاحيات والنشر السحابي.",
    outcomes: ["بناء REST APIs", "تصميم قواعد البيانات", "المصادقة والصلاحيات", "النشر على السحابة"],
    modules: [
      { title: "Node.js", lessons: [{ title: "أول خادم لك", min: 20, free: true }, { title: "Express والمسارات", min: 31 }] },
      { title: "البيانات والأمان", lessons: [{ title: "PostgreSQL وPrisma", min: 40 }, { title: "تسجيل الدخول بأمان", min: 37 }] },
    ],
  },
];

export const paths = [
  { title: "مطوّر واجهات ويب", track: "code" as Track, months: 4, steps: ["أساسيات الويب", "JavaScript", "React", "مشروع تخرج"] },
  { title: "مصمم UI/UX", track: "design" as Track, months: 3, steps: ["التفكير التصميمي", "Figma", "أنظمة التصميم", "معرض أعمال"] },
  { title: "محلل بيانات", track: "data" as Track, months: 4, steps: ["Excel", "Power BI", "بايثون", "مشروع تحليلي"] },
];

export const egp = (n: number) => `${n.toLocaleString("en-US")} ج.م`;

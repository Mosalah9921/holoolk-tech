import { paymentStages, paymentStagesEn } from "@/content/pricing";

/**
 * الأسئلة الشائعة — تظهر في الموقع وتُرسل إلى جوجل كبيانات منظمة (FAQ).
 * ⚠️ راجع الإجابات (خصوصاً المدد) وعدّلها بما يتوافق مع أسلوب عملك.
 */
export const faqCategories = ["عام", "التنفيذ", "الملكية والدعم", "التسويق والظهور"] as const;
export type FaqCategory = (typeof faqCategories)[number];
export type FaqItem = {
  question: string;
  answer: string;
  category: FaqCategory;
};

const [s1, s2, s3] = paymentStages;

export const faq: FaqItem[] = [
  {
    question: "كم يستغرق تنفيذ المشروع من البداية حتى الإطلاق؟",
    category: "التنفيذ",
    answer:
      "يعتمد على حجم المشروع: صفحة الهبوط نحو أسبوع، وموقع الشركة من أسبوعين إلى ثلاثة، والمتجر الإلكتروني من ثلاثة إلى خمسة أسابيع، أما الأنظمة المخصصة فنحدد مدتها بعد دراسة المتطلبات. ويُكتب الجدول الزمني في الاتفاق قبل البدء.",
  },
  {
    question: "هل أحصل على حقوق الملكية الكاملة والكود المصدري؟",
    category: "الملكية والدعم",
    answer:
      "نعم. بعد التسليم يصبح الكود المصدري والتصميم والمحتوى ملكاً لك بالكامل، ويُسجَّل النطاق (الدومين) باسمك، ونسلّمك كل صلاحيات الاستضافة والحسابات لتنقلها إلى أي جهة في أي وقت.",
  },
  {
    question: "هل تعتمدون على قوالب جاهزة؟",
    category: "التنفيذ",
    answer:
      "لا. نصمم كل موقع ونطوّره من البداية وفق طبيعة نشاطك، باستخدام تقنيات حديثة مثل Next.js، ليكون أسرع وأكثر أماناً وتميزاً.",
  },
  {
    question: "هل يمكنني تعديل المحتوى بنفسي؟",
    category: "الملكية والدعم",
    answer:
      "نعم. تتضمن باقات الشركات والمتاجر لوحة تحكم عربية سهلة الاستخدام، ونقدّم لك تدريباً موجزاً يمكّنك من تحديث النصوص والصور والمنتجات.",
  },
  {
    question: "ماذا لو لم يناسبني التصميم؟",
    category: "التنفيذ",
    answer:
      "نراجع التصميم معك ونعدّله قبل كتابة أي كود، وتتضمن كل باقة جولات تعديل محددة. ولا ننتقل إلى مرحلة التطوير إلا بعد اعتمادك.",
  },
  {
    question: "هل سيظهر موقعي في نتائج جوجل؟",
    category: "التسويق والظهور",
    answer:
      "نُهيّئ الموقع تقنياً لمحركات البحث من حيث السرعة والبيانات المنظمة وخريطة الموقع، وهذا هو الأساس. أما تصدّر النتائج فيعتمد أيضاً على المحتوى والمنافسة والوقت، لذا لا يمكن لأي جهة أن تضمنه.",
  },
  {
    question: "هل تتعاملون مع عملاء خارج مصر؟",
    category: "عام",
    answer: "نعم، ندير المشاريع كاملة عن بُعد عبر الاجتماعات المرئية وواتساب، مع رابط تجريبي تتابع من خلاله سير العمل أولاً بأول.",
  },
  {
    question: "ماذا عن الدعم الفني بعد تسليم المشروع؟",
    category: "الملكية والدعم",
    answer:
      "تتضمن كل باقة دعماً فنياً مجانياً بعد التسليم، من 30 يوماً حتى 3 أشهر بحسب الباقة، لإصلاح أي خلل وتنفيذ التعديلات البسيطة. وبعدها يمكنك الاستمرار معنا بباقة صيانة شهرية اختيارية تشمل التحديثات والنسخ الاحتياطي، أو تولّي إدارة موقعك بنفسك؛ والقرار لك.",
  },
  {
    question: "ما الذي تحتاجونه مني لبدء المشروع؟",
    category: "عام",
    answer:
      "نبذة عن نشاطك وجمهورك، والشعار إن وُجد، والمحتوى الأساسي من نصوص وصور. وإن لم يكن المحتوى جاهزاً، نساعدك في إعداده وتنظيمه.",
  },
  {
    question: "هل يمكن تطوير موقعي الحالي بدلاً من بناء موقع جديد؟",
    category: "التنفيذ",
    answer:
      "نعم. نبدأ بتقييم الموقع الحالي من حيث السرعة والتصميم والبنية التقنية، ثم نوصي بالأنسب: تحسينه أو إعادة بنائه.",
  },
  {
    question: "هل توفرون النطاق (الدومين) والاستضافة؟",
    category: "الملكية والدعم",
    answer:
      "نعم، تتضمن بعض الباقات النطاق والاستضافة لمدة عام كامل، ويمكننا كذلك العمل على استضافتك الحالية إن كانت مناسبة.",
  },
  {
    question: "هل يمكن ربط الموقع ببوابات الدفع والشحن والفوترة الإلكترونية؟",
    category: "التنفيذ",
    answer:
      "نعم. نربط الموقع ببوابات الدفع الإلكتروني وشركات الشحن بحسابات نشاطك أنت. أما الربط مع منظومة الفاتورة الإلكترونية فندرسه حسب احتياج مشروعك ونوضح لك إمكانيته قبل الاتفاق.",
  },
  {
    question: "كيف تبدأ آلية العمل وتقسيم الدفعات؟",
    category: "عام",
    answer: `نبدأ بجلسة مجانية لفهم احتياجك، ثم نرسل عرضاً مكتوباً بالنطاق والمدة والتكلفة. وبعد موافقتك يتم تقسيم التكلفة على مراحل واضحة: ${s1.percent}% ${s1.label}، ${s2.percent}% ${s2.label}، و${s3.percent}% المتبقية ${s3.label}.`,
  },
];

/* ============================ English ============================ */

export const faqCategoryEn: Record<FaqCategory, string> = {
  عام: "General",
  التنفيذ: "Delivery",
  "الملكية والدعم": "Ownership & support",
  "التسويق والظهور": "Marketing & visibility",
};

export const faqCategoryLabel = (locale: "ar" | "en", c: FaqCategory) => (locale === "en" ? faqCategoryEn[c] : c);

const [e1, e2, e3] = paymentStagesEn;

const faqEnText: Pick<FaqItem, "question" | "answer">[] = [
  {
    question: "How long does a project take from start to launch?",
    answer:
      "It depends on the size of the project: a landing page takes about a week, a company website two to three weeks, and an online store three to five weeks. For custom systems, we set the timeline after studying the requirements. Either way, the timeline is written into the agreement before we start.",
  },
  {
    question: "Do I get full ownership and the source code?",
    answer:
      "Yes. After delivery, the source code, design and content are entirely yours. The domain is registered in your name, and we hand over all hosting and account access so you can move to any provider at any time.",
  },
  {
    question: "Do you use ready-made templates?",
    answer:
      "No. We design and build every website from scratch around your business, using modern technologies like Next.js and React, so it's faster, more secure and truly yours.",
  },
  {
    question: "Can I edit the content myself?",
    answer:
      "Yes. The Business and Pro Commerce packages include an easy-to-use dashboard, and we give you a short training session so you can update text, images and products yourself.",
  },
  {
    question: "What if I don't like the design?",
    answer:
      "We review and refine the design with you before writing any code, and every package includes defined revision rounds. We only move to development once you approve.",
  },
  {
    question: "Will my website show up on Google?",
    answer:
      "We build the technical SEO foundation: speed, structured data and a sitemap. Ranking at the top also depends on content, competition and time, so no one can honestly guarantee it.",
  },
  {
    question: "Do you work with clients outside Egypt?",
    answer: "Yes. We run projects fully remotely over video calls and WhatsApp, with a live preview link so you can follow progress every step of the way.",
  },
  {
    question: "What about support after delivery?",
    answer:
      "Every package includes free support after delivery, from 30 days to 3 months depending on the package, to fix any issues and make minor changes. After that, you can continue with an optional monthly maintenance plan covering updates and backups, or manage the website yourself. The choice is yours.",
  },
  {
    question: "What do you need from me to get started?",
    answer:
      "A short overview of your business and audience, your logo if you have one, and your core content: text and images. If your content isn't ready yet, we'll help you prepare and organize it.",
  },
  {
    question: "Can you improve my current website instead of building a new one?",
    answer:
      "Yes. We start by reviewing your current website's speed, design and technical structure, then recommend the best path: improving it or rebuilding it.",
  },
  {
    question: "Do you provide the domain and hosting?",
    answer: "Yes. Some packages include the domain and hosting for a full year, and we can also work with your current hosting if it's suitable.",
  },
  {
    question: "Can the website connect to payment, shipping and e-invoicing systems?",
    answer:
      "Yes. We connect your website to online payment gateways and shipping companies using your own business accounts. E-invoicing integration is assessed per project, and we'll tell you clearly what's possible before we agree on anything.",
  },
  {
    question: "How does the process start, and how are payments split?",
    answer: `We start with a free session to understand your needs, then send a written proposal with scope, timeline and cost. Once you approve, the cost is split into clear milestones: ${e1.percent}% ${e1.label.toLowerCase()}, ${e2.percent}% ${e2.label.toLowerCase()}, and the remaining ${e3.percent}% ${e3.label.toLowerCase()}.`,
  },
];

export const faqEn: FaqItem[] = faq.map((q, i) => ({ ...q, ...faqEnText[i] }));

export const getFaq = (locale: "ar" | "en") => (locale === "en" ? faqEn : faq);

/** أسئلة صفحة الباقات (نفس الأسئلة في اللغتين) */
const pricingIdx = faq
  .map((q, i) => (q.category === "الملكية والدعم" || q.question.includes("يستغرق") || q.question.includes("الدفعات") ? i : -1))
  .filter((i) => i >= 0);
export const getPricingFaq = (locale: "ar" | "en") => getFaq(locale).filter((_, i) => pricingIdx.includes(i));

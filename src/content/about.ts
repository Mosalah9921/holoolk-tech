import { Cloud, Compass, ShieldCheck } from "lucide-react";

/**
 * هوية مؤسسية: الموقع بيتكلم باسم "حلولك تيك" كشركة، من غير أسماء أو صور أفراد.
 */
export const teamStatement =
  "نعمل في حلولك تيك على تصميم وتطوير الأنظمة السحابية والحلول الرقمية الآمنة، بمنهجية واضحة وتواصل مباشر مع كل عميل.";

/** مجالات الخبرة */
export const expertise = [
  {
    icon: Cloud,
    title: "البرمجيات والأنظمة السحابية",
    text: "مواقع ومتاجر ومنصات ويب سريعة، مبنية على بنية حديثة تنمو مع أعمالك.",
    points: ["تقنيات ويب عالمية حديثة مثل Next.js", "قواعد بيانات آمنة وربط مع أنظمتك (APIs)\u200F", "استضافة سحابية سريعة وموثوقة"],
  },
  {
    icon: ShieldCheck,
    title: "أمن المعلومات وحماية البيانات",
    text: "الأمان جزء من التصميم منذ اليوم الأول، لا إضافة لاحقة.",
    points: ["اتصال مشفّر (HTTPS) لحماية البيانات أثناء انتقالها", "صلاحيات دقيقة حسب دور كل مستخدم", "حماية النماذج من الرسائل المزعجة"],
  },
  {
    icon: Compass,
    title: "الاستشارات التقنية",
    text: "نساعدك على اختيار الحل الأنسب قبل التنفيذ، لتستثمر فيما تحتاجه فعلاً.",
    points: ["تحليل المتطلبات وتحديد الأولويات", "تقييم الأنظمة الحالية", "خطة تنفيذ مرحلية واضحة"],
  },
];

export const aboutStory = [
  "انطلقت حلولك تيك من قناعة واضحة: كل مشروع عربي، صغيراً كان أو كبيراً، يستحق موقعاً بجودة المواقع العالمية، دون تعقيد أو وعود غير واقعية.",
  "نعمل بنموذج مختلف عن الوكالات التقليدية؛ فعندما تتعاون معنا، تتواصل مباشرة مع فريق التنفيذ دون وسطاء، فتصل رؤيتك كما هي، وتُتخذ القرارات في دقائق لا في أيام.",
  "نركّز على ما نتقنه: مواقع وأنظمة ويب مبنية على بنية برمجية حديثة، بمعايير أمان وحماية مدمجة في كل مرحلة، وبالتقنيات ذاتها التي تعتمد عليها الشركات التقنية الرائدة؛ ليبقى نظامك سريعاً وآمناً وقابلاً للنمو مع أعمالك.",
];

/** المبادئ التي نعمل بها */
export const values = [
  { title: "الوضوح", description: "نطاق عمل وجدول زمني موثّقان قبل البدء." },
  { title: "الجودة", description: "كود نظيف وتصميم مدروس، لا قوالب جاهزة." },
  { title: "الشراكة", description: "نجاح موقعك هو المقياس الحقيقي لعملنا." },
];


/* ============================ English ============================ */

export const teamStatementEn =
  "At Holoolk Tech, we design and build secure cloud systems and digital solutions, with a clear process and direct communication with every client.";

export const expertiseEn = [
  {
    icon: Cloud,
    title: "Software & cloud systems",
    text: "Fast websites, stores and web platforms, built on a modern foundation that grows with your business.",
    points: ["Modern tech like Next.js and React", "Secure databases and integrations (APIs)", "Fast, reliable cloud hosting"],
  },
  {
    icon: ShieldCheck,
    title: "Security & data protection",
    text: "Security is part of the design from day one, not an afterthought.",
    points: ["HTTPS/TLS encryption for data in transit", "Fine-grained, role-based permissions", "Spam and abuse protection on forms"],
  },
  {
    icon: Compass,
    title: "Technical consulting",
    text: "We help you choose the right solution before you build, so you invest only in what you actually need.",
    points: ["Requirements analysis and priorities", "Review of your current systems", "A clear, phased delivery plan"],
  },
];

export const aboutStoryEn = [
  "Holoolk Tech started from a simple conviction: every Arab business, big or small, deserves a website built to world-class standards, without complexity or unrealistic promises.",
  "We work differently from traditional agencies. When you work with us, you talk directly to the team building your website, with no middlemen, so your vision arrives intact and decisions take minutes, not days.",
  "We focus on what we do best: websites and web systems built on a modern architecture, with security built into every stage, using the same technologies trusted by leading tech companies, so your system stays fast, secure and ready to grow with your business.",
];

export const valuesEn = [
  { title: "Clarity", description: "Scope and timeline documented before we start." },
  { title: "Quality", description: "Clean code and thoughtful design, never templates." },
  { title: "Partnership", description: "Your website's success is the real measure of our work." },
];

export const getAbout = (locale: "ar" | "en") =>
  locale === "en"
    ? { teamStatement: teamStatementEn, expertise: expertiseEn, aboutStory: aboutStoryEn, values: valuesEn }
    : { teamStatement, expertise, aboutStory, values };

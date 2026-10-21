import type { Locale } from "@/i18n";

/**
 * أرقام + أسئلة شائعة لكل صفحة خدمة.
 *
 * ⚠️ الأرقام هنا «التزامات» حقيقية بنقدر ننفّذها (مدة التنفيذ، فترة الدعم، هدف السرعة…)
 * ومطابقة للمكتوب في الباقات ومنهجية العمل — مش إنجازات زي «سلّمنا 50 موقع».
 * لما يبقى عندنا مشاريع حقيقية، نضيف أرقام الإنجازات هنا.
 */
export type Stat = { value: string; label: string };
export type Faq = { q: string; a: string };
type Extra = { stats: Record<Locale, Stat[]>; faq: Record<Locale, Faq[]> };

export const serviceExtras: Record<string, Extra> = {
  "web-development": {
    stats: {
      ar: [
        { value: "2–3 أسابيع", label: "مدة التنفيذ المعتادة" },
        { value: "حتى 6 صفحات", label: "ضمن باقة الأعمال" },
        { value: "90+", label: "هدفنا في اختبار سرعة Google" },
        { value: "شهران", label: "دعم فني بعد الإطلاق" },
      ],
      en: [
        { value: "2–3 weeks", label: "Typical delivery time" },
        { value: "Up to 6 pages", label: "Included in the Business package" },
        { value: "90+", label: "Our target on Google's speed test" },
        { value: "2 months", label: "Support after launch" },
      ],
    },
    faq: {
      ar: [
        { q: "كم يستغرق تنفيذ موقع الشركة؟", a: "من أسبوعين إلى ثلاثة أسابيع في المعتاد، تبدأ بعد اعتماد العرض واستلام المحتوى الأساسي (النصوص والشعار والصور). نحدد الموعد النهائي كتابياً في العرض." },
        { q: "هل أستطيع تعديل محتوى الموقع بنفسي؟", a: "نعم. نسلّمك لوحة تحكم بسيطة لتعديل النصوص والصور والخدمات، مع جلسة تدريب قصيرة على استخدامها." },
        { q: "ماذا لو لم يكن لديّ محتوى جاهز؟", a: "نرسل لك نموذجاً بسيطاً بالمعلومات المطلوبة، ويمكننا صياغة النصوص التسويقية للصفحات مقابل تكلفة إضافية يحددها العرض." },
      ],
      en: [
        { q: "How long does a company website take?", a: "Usually two to three weeks, starting once the proposal is approved and we receive your core content (text, logo and images). The final date is set in writing in the proposal." },
        { q: "Can I edit the website content myself?", a: "Yes. You get a simple dashboard to edit text, images and services, plus a short training session on how to use it." },
        { q: "What if I don't have content ready?", a: "We send you a simple template of what we need, and we can write the page copy for you at an additional cost stated in the proposal." },
      ],
    },
  },
  "e-commerce": {
    stats: {
      ar: [
        { value: "3–5 أسابيع", label: "مدة التنفيذ حسب عدد المنتجات" },
        { value: "3 طرق دفع", label: "بطاقات · محافظ · عند الاستلام" },
        { value: "90+", label: "هدفنا في اختبار سرعة Google" },
        { value: "3 أشهر", label: "دعم ومتابعة بعد الإطلاق" },
      ],
      en: [
        { value: "3–5 weeks", label: "Delivery, depending on catalog size" },
        { value: "3 payment types", label: "Cards · wallets · cash on delivery" },
        { value: "90+", label: "Our target on Google's speed test" },
        { value: "3 months", label: "Support after launch" },
      ],
    },
    faq: {
      ar: [
        { q: "هل يدعم المتجر الدفع عند الاستلام والمحافظ الإلكترونية؟", a: "نعم. نربط المتجر بالبطاقات البنكية والمحافظ الإلكترونية وفوري، مع خيار الدفع عند الاستلام، حسب ما يناسب سوقك." },
        { q: "هل توجد عمولة على كل طلب؟", a: "لا نأخذ أي عمولة على مبيعاتك. الرسوم الوحيدة هي رسوم بوابة الدفع نفسها، وتُدفع لمزوّدها مباشرة." },
        { q: "من يضيف المنتجات إلى المتجر؟", a: "تستطيع إضافتها بنفسك من لوحة التحكم بعد التدريب، أو نتولى إدخال المنتجات الأولى عنك إذا طلبت ذلك في العرض." },
      ],
      en: [
        { q: "Does the store support cash on delivery and e-wallets?", a: "Yes. We connect your store to bank cards, e-wallets and local payment options, plus cash on delivery, based on what suits your market." },
        { q: "Is there a commission on each order?", a: "We take no commission on your sales. The only fees are the payment gateway's own fees, paid directly to the provider." },
        { q: "Who adds the products to the store?", a: "You can add them yourself from the dashboard after training, or we can enter your first products for you if you include it in the proposal." },
      ],
    },
  },
  "landing-pages": {
    stats: {
      ar: [
        { value: "أسبوع تقريباً", label: "من الاعتماد حتى الإطلاق" },
        { value: "هدف واحد", label: "صفحة مركّزة على إجراء واحد" },
        { value: "2.5 ثانية", label: "حدّ أقصى مستهدف لظهور المحتوى على الجوال" },
        { value: "30 يوماً", label: "دعم وتعديلات بعد الإطلاق" },
      ],
      en: [
        { value: "About 1 week", label: "From approval to launch" },
        { value: "One goal", label: "A page focused on a single action" },
        { value: "2.5 sec", label: "Max target for mobile content load" },
        { value: "30 days", label: "Support and revisions after launch" },
      ],
    },
    faq: {
      ar: [
        { q: "ما الفرق بين صفحة الهبوط والموقع الكامل؟", a: "صفحة الهبوط صفحة واحدة لهدف واحد، مثل حملة إعلانية أو منتج محدد، بينما يعرض الموقع الكامل نشاطك وخدماتك في عدة صفحات." },
        { q: "هل تربطون الصفحة بإعلانات فيسبوك وجوجل؟", a: "نعم. نربطها بـ Meta Pixel وGoogle Analytics لتقيس نتائج حملتك بدقة وتعرف مصدر كل عميل." },
        { q: "هل يمكن تحويل صفحة الهبوط إلى موقع كامل لاحقاً؟", a: "بالتأكيد. نبنيها بطريقة تسمح بإضافة صفحات أخرى لاحقاً دون البدء من الصفر." },
      ],
      en: [
        { q: "What's the difference between a landing page and a full website?", a: "A landing page is a single page for one goal, such as an ad campaign or a specific product, while a full website presents your business and services across several pages." },
        { q: "Do you connect the page to Facebook and Google ads?", a: "Yes. We connect it to Meta Pixel and Google Analytics so you can measure your campaign accurately and see where each customer came from." },
        { q: "Can the landing page grow into a full website later?", a: "Absolutely. We build it so more pages can be added later without starting over." },
      ],
    },
  },
  "web-apps": {
    stats: {
      ar: [
        { value: "أسبوعياً", label: "رابط تجريبي وتحديث بالتقدّم" },
        { value: "صلاحيات متعددة", label: "مدير · موظفين · عملاء" },
        { value: "24/7", label: "متاح من أي جهاز ومتصفح" },
        { value: "100%", label: "ملكية الكود والبيانات لك" },
      ],
      en: [
        { value: "Weekly", label: "Live preview and progress update" },
        { value: "Multiple roles", label: "Admin · staff · customers" },
        { value: "24/7", label: "Available from any device or browser" },
        { value: "100%", label: "You own the code and the data" },
      ],
    },
    faq: {
      ar: [
        { q: "كم يستغرق بناء نظام أو لوحة تحكم؟", a: "يعتمد على حجم النظام وعدد الشاشات والصلاحيات. نحدد المدة بدقة بعد جلسة دراسة المتطلبات، وغالباً نقسّم المشروع إلى مراحل تبدأ في استخدامها مبكراً." },
        { q: "هل يمكن ربط النظام بأنظمتي الحالية؟", a: "نعم، عبر واجهات برمجية (APIs) مع أنظمة الدفع والشحن والرسائل وغيرها، بعد التأكد من إمكانيات النظام الآخر." },
        { q: "أين تُحفظ بيانات النظام؟", a: "على استضافة سحابية آمنة باسمك، مع نسخ احتياطي منتظم وصلاحيات دقيقة لكل مستخدم." },
      ],
      en: [
        { q: "How long does a system or dashboard take?", a: "It depends on the number of screens and user roles. We set an exact timeline after a requirements session, and usually split the project into phases you can start using early." },
        { q: "Can it connect to my existing systems?", a: "Yes, through APIs with payment, shipping, messaging and other services, after we confirm what the other system supports." },
        { q: "Where is the system's data stored?", a: "On secure cloud hosting in your name, with regular backups and precise permissions for each user." },
      ],
    },
  },
  "ui-ux-design": {
    stats: {
      ar: [
        { value: "2–5 أيام", label: "مرحلة التخطيط والتصميم" },
        { value: "نموذج تفاعلي", label: "تجرّبه على Figma قبل البرمجة" },
        { value: "جوال أولاً", label: "تصميم يبدأ من الشاشة الأصغر" },
        { value: "100%", label: "ملفات التصميم ملكك" },
      ],
      en: [
        { value: "2–5 days", label: "Planning and design phase" },
        { value: "Interactive", label: "A Figma prototype you can try first" },
        { value: "Mobile-first", label: "Designed from the smallest screen up" },
        { value: "100%", label: "You own the design files" },
      ],
    },
    faq: {
      ar: [
        { q: "هل يمكنني طلب التصميم فقط دون البرمجة؟", a: "نعم. نسلّمك ملفات Figma منظمة وجاهزة لأي فريق تطوير، مع دليل للألوان والخطوط والمكونات." },
        { q: "كم عدد جولات التعديل على التصميم؟", a: "نحدد عدد جولات المراجعة كتابياً في العرض قبل البدء، حتى تعرف ما يشمله المشروع بالضبط." },
        { q: "هل تصممون للجوال والكمبيوتر معاً؟", a: "نعم. نبدأ بتصميم الجوال لأن أغلب زوارك يتصفحون منه، ثم نكيّف التصميم للتابلت والكمبيوتر." },
      ],
      en: [
        { q: "Can I order the design only, without development?", a: "Yes. We deliver organized Figma files ready for any development team, with a guide to colors, fonts and components." },
        { q: "How many revision rounds are included?", a: "We set the number of review rounds in writing in the proposal before we start, so you know exactly what's included." },
        { q: "Do you design for both mobile and desktop?", a: "Yes. We start with mobile, since most of your visitors browse on their phones, then adapt the design for tablet and desktop." },
      ],
    },
  },
  "maintenance-support": {
    stats: {
      ar: [
        { value: "يومي أو أسبوعي", label: "نسخ احتياطي تلقائي" },
        { value: "SSL", label: "مراقبة شهادة الأمان وتجديدها" },
        { value: "24 ساعة عمل", label: "أقصى مدة للرد على طلبك" },
        { value: "عقد مرن", label: "شهري أو سنوي حسب احتياجك" },
      ],
      en: [
        { value: "Daily or weekly", label: "Automatic backups" },
        { value: "SSL", label: "Security certificate monitoring and renewal" },
        { value: "24 business hrs", label: "Maximum response time" },
        { value: "Flexible", label: "Monthly or yearly plan" },
      ],
    },
    faq: {
      ar: [
        { q: "هل تقدمون الصيانة لمواقع لم تبنوها؟", a: "نعم، بعد فحص مبدئي للموقع للتأكد من حالته التقنية وإمكانية العمل عليه بأمان." },
        { q: "ماذا يشمل عقد الصيانة؟", a: "النسخ الاحتياطي، وتحديث المكتبات البرمجية، ومراقبة الأمان والسرعة، وتنفيذ التعديلات البسيطة على المحتوى." },
        { q: "ماذا يحدث إذا توقف الموقع فجأة؟", a: "نتعامل مع الأعطال الطارئة بأولوية، ونستعيد آخر نسخة احتياطية سليمة عند الحاجة لتقليل مدة التوقف." },
      ],
      en: [
        { q: "Do you maintain websites you didn't build?", a: "Yes, after an initial review to confirm the site's technical condition and that we can work on it safely." },
        { q: "What does the maintenance plan include?", a: "Backups, library updates, security and speed monitoring, and small content changes." },
        { q: "What happens if the website suddenly goes down?", a: "We treat urgent issues as a priority and restore the latest healthy backup when needed to minimize downtime." },
      ],
    },
  },
};

/** التزاماتنا العامة — بتظهر في «من نحن» (كلها قابلة للتحقق من العرض المكتوب ومنهجية العمل) */
export const companyCommitments: Record<Locale, Stat[]> = {
  ar: [
    { value: "خلال 24 ساعة", label: "عرض مكتوب بعد مناقشة طلبك (أيام العمل)" },
    { value: "5 مراحل", label: "واضحة لكل مشروع، باعتمادك قبل كل خطوة" },
    { value: "3 دفعات", label: "مرتبطة بالإنجاز: 30% · 40% · 30%" },
    { value: "100%", label: "ملكية الكود والبيانات بعد السداد" },
  ],
  en: [
    { value: "Within 24 hrs", label: "A written proposal after we discuss your request (business days)" },
    { value: "5 phases", label: "Clear stages, with your approval before each step" },
    { value: "3 payments", label: "Tied to progress: 30% · 40% · 30%" },
    { value: "100%", label: "Code and data ownership after payment" },
  ],
};

/**
 * معرض الأعمال.
 * status: "live" = منشور | "building" = قيد التطوير | "demo" = موقع نموذجي (جوه /demos) | "slot" = مكان فاضي
 * href: رابط المشروع (داخلي زي /demos/gym أو خارجي https://...)
 * image: صورة الغلاف في public/portfolio/ (اختياري) — ولو مفيش، cover بيرسم غلاف بألوان المشروع.
 */
export type CaseStudy = {
  /** سطر يلخّص المشروع أعلى صفحته */
  headline: string;
  /** المجال أو نوع العميل */
  sector: string;
  /** ما الذي قدّمناه (تصميم، تطوير، ...) */
  scope: string[];
  challenge: string;
  solution: string;
  features: { title: string; text: string }[];
  stack: string[];
  /** ما الذي يثبته هذا المشروع — بدون أرقام غير حقيقية */
  proves: string[];
  /** المعمارية التقنية (اختياري) — طبقات النظام والقرارات الهندسية */
  architecture?: {
    layers: { name: string; role: string; items: string[] }[];
    decisions: { title: string; text: string }[];
  };
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  status: "live" | "building" | "demo" | "slot";
  href?: string;
  image?: string;
  cover?: { bg: string; fg: string; accent: string; label: string };
  caseStudy: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "rakd-store",
    title: "متجر رَكض",
    category: "متجر إلكتروني",
    description: "متجر رياضي لقمصان الأندية وملابس التمرين وأحذية الكرة والشنط، بكتالوج قابل للفلترة، ومعرض صور لكل منتج، وسلة ذكية بشريط شحن مجاني، وإتمام طلب بخطوة واحدة.",
    tags: ["متجر إلكتروني", "سلة وإتمام طلب", "أكواد خصم"],
    status: "demo",
    href: "/demos/store",
    image: "/images/demos/store-v3.webp",
    cover: { bg: "#F4F3EF", fg: "#111111", accent: "#FF5A1F", label: "RAKD" },
    caseStudy: {
      headline: "متجر رياضي يحوّل التصفح السريع إلى طلب مكتمل في دقائق.",
      sector: "متاجر الملابس والمستلزمات الرياضية",
      scope: ["الهوية البصرية للمتجر", "تجربة الشراء", "تصميم الواجهات", "التطوير"],
      challenge:
        "تبيع علامات ملابس كثيرة عبر رسائل السوشيال ميديا، فيضيع وقت طويل في السؤال عن المقاسات والألوان والأسعار، وتتراكم الطلبات يدوياً، ويتخلى عدد كبير من العملاء عن الشراء قبل إتمامه.",
      solution:
        "متجر نموذجي بهوية رياضية جريئة، يعرض أكثر من 25 منتجاً في أربعة أقسام بكتالوج قابل للبحث والفلترة والترتيب، ويتيح تصفح صور المنتج واختيار المقاس من نافذة سريعة، مع سلة جانبية تُظهر المتبقي للشحن المجاني، وإتمام طلب واضح يدعم الدفع عند الاستلام وأكواد الخصم.",
      features: [
        { title: "كتالوج ذكي", text: "بحث فوري وفلترة حسب القسم وترتيب حسب السعر." },
        { title: "معرض صور ومقاسات", text: "نافذة سريعة يتصفح فيها العميل صور المنتج ويختار مقاسه قبل الإضافة." },
        { title: "سلة تحفّز الشراء", text: "شريط تقدم للشحن المجاني يرفع متوسط قيمة الطلب." },
        { title: "إتمام طلب مختصر", text: "بيانات الشحن وطريقة الدفع وكود الخصم في شاشة واحدة." },
        { title: "مصمم للهاتف أولاً", text: "لأن أغلب مشتري الملابس يتسوقون من الهاتف." },
        { title: "جاهز للربط", text: "قابل للربط ببوابات الدفع وشركات الشحن ولوحة إدارة الطلبات." },
      ],
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      proves: ["بناء متاجر إلكترونية متكاملة", "تجربة شراء مصممة لرفع المبيعات", "هوية بصرية مستقلة لكل علامة"],
    },
  },
  {
    slug: "madar-academy",
    title: "أكاديمية مَدار",
    category: "منصة تعليمية",
    description: "منصة دورات أونلاين بكتالوج قابل للبحث، وصفحة لكل دورة بالمنهج والدروس المجانية، ومسارات مهنية، واشتراك شهري أو سنوي.",
    tags: ["منصة تعليمية", "دورات", "اشتراكات"],
    status: "demo",
    href: "/demos/academy",
    image: "/images/demos/academy-v3.webp",
    cover: { bg: "#FAFAFE", fg: "#12102B", accent: "#3B2DB8", label: "مَدار" },
    caseStudy: {
      headline: "منصة تعليمية عربية تجعل اختيار الدورة والتسجيل فيها قراراً سهلاً.",
      sector: "التعليم والتدريب",
      scope: ["تجربة المستخدم", "تصميم الواجهات", "التطوير", "بنية المحتوى التعليمي"],
      challenge:
        "يعرض كثير من المدربين ومراكز التدريب دوراتهم عبر منشورات متفرقة وروابط خارجية، فلا يعرف الطالب محتوى الدورة أو مستواها قبل الدفع، ويصعب على المركز تنظيم التسجيل والمتابعة.",
      solution:
        "منصة نموذجية تعرض كل الدورات في كتالوج واحد بالبحث والفلترة حسب المجال والمستوى، ولكل دورة صفحة بالمنهج الكامل ودرس مجاني للتجربة وبيانات المدرب، مع مسارات مهنية مرتبة واشتراك شهري أو سنوي.",
      features: [
        { title: "كتالوج دورات", text: "بحث وفلترة حسب المجال والمستوى في لحظة." },
        { title: "صفحة لكل دورة", text: "المنهج الكامل ومدة كل درس ونتائج التعلم والمدرب." },
        { title: "دروس مجانية للتجربة", text: "الدرس الأول متاح لبناء الثقة قبل التسجيل." },
        { title: "مسارات مهنية", text: "دورات مرتبة في مسار واضح من البداية للاحتراف." },
        { title: "اشتراكات مرنة", text: "شراء دورة منفردة أو اشتراك شهري وسنوي." },
        { title: "تجربة الطالب", text: "تقدم الدورات والجلسات المباشرة والشهادات في مكان واحد." },
      ],
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      proves: ["بناء منصات تعليمية واشتراكات", "تنظيم محتوى كبير بتجربة بسيطة", "واجهات عربية غنية بالتفاعل"],
    },
  },
  {
    slug: "sufra-restaurant",
    title: "مطعم سُفرة",
    category: "موقع مطعم",
    description: "قائمة طعام تفاعلية مقسّمة، وحجز طاولات إلكتروني، وهوية بصرية دافئة تعكس طابع المطبخ الشرقي.",
    tags: ["قائمة تفاعلية", "حجز", "Landing"],
    status: "demo",
    href: "/demos/restaurant",
    image: "/images/demos/restaurant-v3.webp",
    cover: { bg: "#FBF6EE", fg: "#2B1D14", accent: "#B9461F", label: "سُفرة" },
    caseStudy: {
      headline: "موقع مطعم يحوّل المتصفح الجائع إلى حجز طاولة خلال دقيقة.",
      sector: "مطاعم وكافيهات",
      scope: ["الهوية البصرية للموقع", "تصميم الواجهات", "التطوير", "تهيئة محركات البحث"],
      challenge:
        "تعتمد مطاعم كثيرة على صفحات التواصل الاجتماعي وحدها، فتضيع قائمة الطعام بين المنشورات، ويضطر العميل إلى السؤال عن الأسعار والمواعيد في الرسائل، فيذهب بعضهم إلى مطعم آخر قبل أن يصله الرد.",
      solution:
        "موقع نموذجي بهوية دافئة تعكس المطبخ الشرقي، تتصدره قائمة طعام تفاعلية مقسّمة حسب الأصناف، ونموذج حجز طاولة واضح، وكل ما يحتاجه الزائر للقرار في صفحة واحدة سريعة على الهاتف.",
      features: [
        { title: "قائمة طعام تفاعلية", text: "أقسام قابلة للتنقل وأسعار واضحة وعلامات للأطباق المميزة." },
        { title: "حجز طاولة إلكتروني", text: "اختيار التاريخ وعدد الأفراد وإرسال الطلب مباشرة." },
        { title: "هوية بصرية مستقلة", text: "ألوان وخطوط مستوحاة من طابع المطعم لا من قالب جاهز." },
        { title: "مصمم للهاتف أولاً", text: "لأن أغلب زوار المطاعم يتصفحون من الهاتف وهم في الطريق." },
      ],
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      proves: ["تصميم هوية مخصصة لكل نشاط", "نماذج حجز سهلة الاستخدام", "سرعة وتجربة ممتازة على الهاتف"],
    },
  },
  {
    slug: "naqaa-clinics",
    title: "عيادات نَقاء",
    category: "موقع عيادة",
    description: "حجز مواعيد إلكتروني باختيار اليوم والساعة، وعرض للخدمات والأطباء، بتصميم هادئ يعزز الثقة.",
    tags: ["حجز مواعيد", "طبي", "Responsive"],
    status: "demo",
    href: "/demos/clinic",
    image: "/images/demos/clinic-v3.webp",
    cover: { bg: "#ECF7FA", fg: "#0F172A", accent: "#0E7490", label: "نَقاء" },
    caseStudy: {
      headline: "تجربة حجز طبية هادئة تبني الثقة قبل الزيارة الأولى.",
      sector: "عيادات ومراكز طبية",
      scope: ["تجربة المستخدم", "تصميم الواجهات", "التطوير", "نظام حجز المواعيد"],
      challenge:
        "يتردد المريض في اختيار عيادة لا يعرف عنها شيئاً، وتستهلك المكالمات الهاتفية لحجز المواعيد وقت موظفي الاستقبال، وتتكرر الأسئلة نفسها عن الأطباء والخدمات والمواعيد يومياً.",
      solution:
        "موقع نموذجي بتصميم هادئ ومريح، يعرض التخصصات والأطباء بوضوح، ويتيح حجز موعد إلكترونياً باختيار اليوم والساعة المتاحة، فيصل المريض إلى العيادة وقد عرف مسبقاً كل ما يحتاجه.",
      features: [
        { title: "حجز مواعيد تفاعلي", text: "اختيار الخدمة واليوم والساعة في خطوات قليلة واضحة." },
        { title: "صفحات الأطباء والخدمات", text: "تعريف مختصر بكل طبيب وتخصص يعزز الثقة." },
        { title: "تصميم يبعث على الطمأنينة", text: "ألوان هادئة ومساحات مريحة ونصوص واضحة." },
        { title: "سهولة الوصول", text: "خطوط مقروءة وتباين مناسب وتنقل كامل بلوحة المفاتيح." },
      ],
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      proves: ["بناء أنظمة حجز مواعيد", "تصميم يراعي طبيعة القطاع الطبي", "الاهتمام بسهولة الوصول"],
    },
  },
  {
    slug: "pulse-gym",
    title: "نادي PULSE",
    category: "موقع جيم",
    description: "جدول حصص تفاعلي، وباقات اشتراك، وتسجيل لحصة تجريبية مجانية، بهوية بصرية جريئة مفعمة بالحيوية.",
    tags: ["جدول تفاعلي", "اشتراكات", "Dark UI"],
    status: "demo",
    href: "/demos/gym",
    image: "/images/demos/gym-v3.webp",
    cover: { bg: "#0B0B0C", fg: "#FFFFFF", accent: "#C6F432", label: "PULSE" },
    caseStudy: {
      headline: "هوية جريئة وجدول حصص حي يدفع الزائر إلى حصته الأولى.",
      sector: "أندية رياضية ومراكز لياقة",
      scope: ["الهوية البصرية للموقع", "تصميم الواجهات", "التطوير"],
      challenge:
        "يبحث المشترك المحتمل عن ثلاثة أشياء: مواعيد الحصص، وأنظمة الاشتراك، وطريقة سهلة للتجربة قبل الالتزام. وحين تتوزع هذه المعلومات بين الصور والمنشورات، يتأجل القرار.",
      solution:
        "موقع نموذجي بواجهة داكنة جريئة تعكس طاقة النادي، يضم جدول حصص تفاعلياً حسب اليوم والمستوى، وعرضاً واضحاً لأنظمة الاشتراك، ونموذجاً لحجز حصة تجريبية مجانية.",
      features: [
        { title: "جدول حصص تفاعلي", text: "تصفية حسب اليوم ونوع الحصة ومستوى التمرين." },
        { title: "أنظمة الاشتراك", text: "مقارنة واضحة بين الباقات تسهّل القرار." },
        { title: "حصة تجريبية مجانية", text: "نموذج تسجيل سريع يحوّل الاهتمام إلى زيارة." },
        { title: "واجهة داكنة جريئة", text: "تباين عالٍ وحركة مدروسة تعكس هوية النادي." },
      ],
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      proves: ["تنفيذ هويات بصرية جريئة ومتنوعة", "واجهات تفاعلية غنية بالبيانات", "تحويل الزوار إلى مشتركين"],
    },
  },
];

/* ============================ English ============================ */

type ProjectText = Pick<Project, "title" | "category" | "description" | "tags"> & {
  coverLabel?: string;
  caseStudy: Omit<CaseStudy, "stack">;
};

const projectsEnText: Record<string, ProjectText> = {
  "rakd-store": {
    title: "RAKD Store",
    category: "Online store",
    description: "A sports store for club jerseys, training wear, football boots and bags, with a filterable catalog, a photo gallery for every product, a smart cart with a free-shipping bar, and one-step checkout.",
    tags: ["E-commerce", "Cart & checkout", "Discount codes"],
    coverLabel: "RAKD",
    caseStudy: {
      headline: "A sportswear store that turns quick browsing into a completed order in minutes.",
      sector: "Sportswear & sports equipment stores",
      scope: ["Store visual identity", "Shopping experience", "Interface design", "Development"],
      challenge:
        "Many apparel brands sell through social media messages, so a lot of time goes into answering questions about sizes, colors and prices. Orders pile up manually, and many customers abandon the purchase before it's complete.",
      solution:
        "A concept store with a bold athletic identity, featuring more than 25 products across four categories in a searchable catalog with filters and sorting, a quick view with a photo gallery and size picker, a side cart that shows how much is left for free shipping, and a clear checkout with cash on delivery and discount codes.",
      features: [
        { title: "Smart catalog", text: "Instant search, filtering by category and sorting by price." },
        { title: "Photo gallery & sizes", text: "A quick view where shoppers browse product photos and pick their size before adding to cart." },
        { title: "A cart that drives sales", text: "A free-shipping progress bar that lifts the average order value." },
        { title: "Streamlined checkout", text: "Shipping details, payment method and discount code on one screen." },
        { title: "Mobile-first", text: "Because most apparel shoppers buy from their phones." },
        { title: "Integration-ready", text: "Ready to connect to payment gateways, couriers and an order dashboard." },
      ],
      proves: ["Building complete online stores", "Shopping experiences designed to increase sales", "A distinct identity for every brand"],
    },
  },
  "madar-academy": {
    title: "Madar Academy",
    category: "E-learning platform",
    description: "An online course platform with a searchable catalog, a page for every course with its curriculum and free lessons, career paths, and monthly or yearly plans.",
    tags: ["E-learning", "Courses", "Subscriptions"],
    coverLabel: "Madar",
    caseStudy: {
      headline: "An Arabic learning platform that makes choosing and joining a course an easy decision.",
      sector: "Education & training",
      scope: ["User experience", "Interface design", "Development", "Learning content structure"],
      challenge:
        "Many trainers and training centers promote their courses through scattered posts and external links, so students can't see what a course covers or its level before paying, and centers struggle to organize enrollment and follow-up.",
      solution:
        "A concept platform that brings every course into one catalog with search and filters by field and level. Each course has a page with the full curriculum, a free preview lesson and instructor details, alongside structured career paths and monthly or yearly subscriptions.",
      features: [
        { title: "Course catalog", text: "Search and filter by field and level in an instant." },
        { title: "A page for every course", text: "Full curriculum, lesson lengths, learning outcomes and the instructor." },
        { title: "Free preview lessons", text: "The first lesson is open to build trust before enrolling." },
        { title: "Career paths", text: "Courses arranged into a clear path from beginner to professional." },
        { title: "Flexible plans", text: "Buy a single course, or subscribe monthly or yearly." },
        { title: "Student experience", text: "Course progress, live sessions and certificates in one place." },
      ],
      proves: ["Building learning platforms and subscriptions", "Organizing large content with a simple experience", "Rich, interactive Arabic interfaces"],
    },
  },
  "sufra-restaurant": {
    title: "Sufra Restaurant",
    category: "Restaurant website",
    description: "A sectioned interactive menu, online table booking, and a warm visual identity inspired by Middle Eastern cuisine.",
    tags: ["Interactive menu", "Booking", "Landing"],
    coverLabel: "Sufra",
    caseStudy: {
      headline: "A restaurant website that turns a hungry visitor into a table booking within a minute.",
      sector: "Restaurants & cafés",
      scope: ["Website visual identity", "Interface design", "Development", "SEO"],
      challenge:
        "Many restaurants rely on social media alone, so the menu gets lost among posts and guests have to message to ask about prices and opening hours. Some head to another restaurant before they get a reply.",
      solution:
        "A concept website with a warm identity inspired by Middle Eastern cuisine, led by an interactive menu organized by category and a clear table booking form, with everything a visitor needs to decide on one fast, mobile-friendly page.",
      features: [
        { title: "Interactive menu", text: "Navigable sections, clear prices and highlighted signature dishes." },
        { title: "Online table booking", text: "Pick the date and party size and send the request directly." },
        { title: "A distinct visual identity", text: "Colors and type inspired by the restaurant's character, not a template." },
        { title: "Mobile-first", text: "Because most restaurant visitors browse on their phones, often on the way." },
      ],
      proves: ["Custom identities for every business", "Easy-to-use booking forms", "Speed and an excellent mobile experience"],
    },
  },
  "naqaa-clinics": {
    title: "Naqaa Clinics",
    category: "Clinic website",
    description: "Online appointment booking by day and time, with services and doctors presented in a calm design that builds trust.",
    tags: ["Appointments", "Medical", "Responsive"],
    coverLabel: "Naqaa",
    caseStudy: {
      headline: "A calm booking experience that builds trust before the first visit.",
      sector: "Clinics & medical centers",
      scope: ["User experience", "Interface design", "Development", "Appointment booking"],
      challenge:
        "Patients hesitate to choose a clinic they know nothing about, booking calls eat up reception's time, and the same questions about doctors, services and hours come up every day.",
      solution:
        "A concept website with a calm, reassuring design that presents specialties and doctors clearly and lets patients book online by choosing an available day and time, so they arrive already knowing everything they need.",
      features: [
        { title: "Interactive booking", text: "Choose the service, day and time in a few clear steps." },
        { title: "Doctor & service pages", text: "Short introductions to every doctor and specialty that build trust." },
        { title: "A reassuring design", text: "Calm colors, comfortable spacing and clear copy." },
        { title: "Accessibility", text: "Readable type, good contrast and full keyboard navigation." },
      ],
      proves: ["Building appointment booking systems", "Design that respects the medical sector", "Attention to accessibility"],
    },
  },
  "pulse-gym": {
    title: "PULSE Gym",
    category: "Gym website",
    description: "An interactive class schedule, membership plans and free trial sign-up, wrapped in a bold, energetic identity.",
    tags: ["Live schedule", "Memberships", "Dark UI"],
    caseStudy: {
      headline: "A bold identity and a live class schedule that move visitors to their first session.",
      sector: "Gyms & fitness centers",
      scope: ["Website visual identity", "Interface design", "Development"],
      challenge:
        "Prospective members look for three things: class times, membership options, and an easy way to try before committing. When that information is scattered across images and posts, the decision gets postponed.",
      solution:
        "A concept website with a bold dark interface that reflects the gym's energy, featuring an interactive class schedule by day and level, a clear view of membership plans, and a free trial booking form.",
      features: [
        { title: "Interactive schedule", text: "Filter by day, class type and training level." },
        { title: "Membership plans", text: "A clear comparison that makes the decision easy." },
        { title: "Free trial class", text: "A quick sign-up form that turns interest into a visit." },
        { title: "Bold dark interface", text: "High contrast and purposeful motion that reflect the gym's identity." },
      ],
      proves: ["Bold, varied visual identities", "Rich, interactive data-driven interfaces", "Turning visitors into members"],
    },
  },
};

export const projectsEn: Project[] = projects.map((p) => {
  const { coverLabel, caseStudy, ...text } = projectsEnText[p.slug];
  return {
    ...p,
    ...text,
    cover: p.cover ? { ...p.cover, label: coverLabel ?? p.cover.label } : undefined,
    caseStudy: { ...p.caseStudy, ...caseStudy },
  };
});

export const getProjects = (locale: "ar" | "en") => (locale === "en" ? projectsEn : projects);

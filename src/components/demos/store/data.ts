/** بيانات المتجر النموذجي «رَكض» — متجر رياضي متعدد الماركات (منتجات وأسعار لأغراض العرض) */
export type Category = "jerseys" | "training" | "shoes" | "bags";
export type Product = {
  id: string;
  name: string;
  category: Category;
  /** صور المنتج (الأولى هي صورة الكارت) */
  images: string[];
  price: number;
  oldPrice?: number;
  sizes: string[];
  badge?: "جديد" | "الأكثر مبيعاً" | "خصم";
  /** وصف قصير في نافذة المنتج */
  note: string;
};

export const categoryLabel: Record<Category | "all", string> = {
  all: "الكل",
  jerseys: "قمصان الأندية",
  training: "ملابس التمرين",
  shoes: "أحذية الكرة",
  bags: "شنط وإكسسوارات",
};

const img = (n: string) => `/images/demos/store/${n}.webp`;
const S = ["S", "M", "L", "XL", "XXL"];
const SH = ["39", "40", "41", "42", "43", "44"];
const ONE = ["مقاس واحد"];

export const products: Product[] = [
  { id: "ahly-home", name: "قميص الأهلي الأساسي 25/26", category: "jerseys", images: [img("ahly-home")], price: 1450, sizes: S, badge: "الأكثر مبيعاً", note: "قماش خفيف يطرد العرق، بقصّة اللاعبين." },
  { id: "ahly-third", name: "قميص الأهلي الثالث 25/26", category: "jerseys", images: [img("ahly-third")], price: 1450, sizes: S, badge: "جديد", note: "الإصدار الأسود بتفاصيل ذهبية." },
  { id: "real-madrid-ls", name: "قميص ريال مدريد بأكمام طويلة", category: "jerseys", images: [img("real-madrid-ls")], price: 1650, oldPrice: 1850, sizes: S, badge: "خصم", note: "أكمام طويلة لتمارين الشتاء." },
  { id: "egypt-jersey", name: "قميص منتخب مصر الاحتياطي", category: "jerseys", images: [img("egypt-jersey")], price: 1350, sizes: S, note: "تصميم مستوحى من الفراعنة بخامة مريحة." },
  { id: "zamalek-tee", name: "تيشيرت الزمالك القطني", category: "jerseys", images: [img("zamalek-tee")], price: 899, sizes: S, note: "قطن 100% للاستخدام اليومي." },
  { id: "brazil-polo", name: "بولو البرازيل الكلاسيكي", category: "jerseys", images: [img("brazil-polo")], price: 1190, sizes: S, note: "ياقة بولو بطابع البرازيل الشهير." },

  { id: "half-zip", name: "توب تدريب نصف سوستة", category: "training", images: [img("half-zip"), img("half-zip-side")], price: 1150, sizes: S, badge: "الأكثر مبيعاً", note: "طبقة أولى دافئة لتمارين الصباح والجري." },
  { id: "navy-jacket", name: "جاكيت مضاد للرياح بكابيشون", category: "training", images: [img("navy-jacket"), img("jacket-colors")], price: 1690, sizes: S, badge: "جديد", note: "متاح بثلاثة ألوان، خفيف ومقاوم للرياح." },
  { id: "red-track-jacket", name: "جاكيت تراك كلاسيكي أحمر", category: "training", images: [img("red-track-jacket")], price: 1490, oldPrice: 1690, sizes: S, badge: "خصم", note: "الخطوط الثلاثة الكلاسيكية بخامة لامعة." },
  { id: "black-track-pants", name: "بنطلون تراك أسود بخطوط", category: "training", images: [img("black-track-pants")], price: 990, sizes: S, note: "خصر مطاطي برباط وجيوب جانبية." },
  { id: "beige-pants", name: "بنطلون رياضي بيج", category: "training", images: [img("beige-pants"), img("track-pants-colors")], price: 950, sizes: S, note: "متاح بالأسود والرمادي والبيج." },
  { id: "training-shorts", name: "شورت تدريب بجيوب سوستة", category: "training", images: [img("training-shorts")], price: 649, sizes: S, note: "خفيف وسريع الجفاف للملعب والجيم." },
  { id: "purple-tank", name: "تيشيرت بدون أكمام بكابيشون", category: "training", images: [img("purple-tank"), img("tanks-colors")], price: 599, sizes: S, note: "متاح بأربعة ألوان للجيم والجري." },
  { id: "graphic-hoodies", name: "هودي جرافيك أوفر سايز", category: "training", images: [img("graphic-hoodies")], price: 1190, sizes: S, badge: "جديد", note: "بالأزرق والأسود، طباعة على الظهر." },

  { id: "turf-blue", name: "حذاء ترتان CURVA أزرق", category: "shoes", images: [img("turf-blue"), img("turf-collection")], price: 1250, sizes: SH, badge: "الأكثر مبيعاً", note: "نعل ترتان بثبات ممتاز على النجيل الصناعي." },
  { id: "turf-teal", name: "حذاء ترتان CURVA تركواز", category: "shoes", images: [img("turf-teal")], price: 1250, sizes: SH, note: "جزء علوي محبوك يحتضن القدم." },
  { id: "turf-red", name: "حذاء ترتان بدون رباط أحمر", category: "shoes", images: [img("turf-red")], price: 1390, sizes: SH, badge: "جديد", note: "تصميم بدون رباط لتحكم أفضل في الكرة." },
  { id: "turf-silver", name: "حذاء ترتان CURVA فضي", category: "shoes", images: [img("turf-silver")], price: 1190, oldPrice: 1350, sizes: SH, badge: "خصم", note: "خفيف الوزن ومناسب للملاعب الخماسية." },
  { id: "turf-sky", name: "حذاء ترتان سماوي", category: "shoes", images: [img("turf-sky")], price: 1390, sizes: SH, note: "قبضة عالية ونعل مرن." },
  { id: "turf-grey", name: "حذاء ترتان رمادي", category: "shoes", images: [img("turf-grey")], price: 1290, sizes: SH, note: "لمسات وردية وزرقاء بتصميم عصري." },

  { id: "backpack-black", name: "شنطة ظهر رياضية سوداء", category: "bags", images: [img("backpack-black"), img("backpack-duo"), img("backpack-colors")], price: 1350, sizes: ONE, badge: "الأكثر مبيعاً", note: "جيب للابتوب وجيوب جانبية للزجاجة." },
  { id: "backpack-grey", name: "شنطة ظهر رمادي", category: "bags", images: [img("backpack-grey")], price: 1350, sizes: ONE, note: "سعة كبيرة للمدرسة والتمرين." },
  { id: "duffel-black", name: "شنطة رياضية للجيم", category: "bags", images: [img("duffel-black"), img("duffel-colors")], price: 1490, sizes: ONE, note: "قسم منفصل للحذاء، متاحة بثلاثة ألوان." },
  { id: "phantom-gymsack", name: "شنطة حبل بطباعة", category: "bags", images: [img("phantom-gymsack")], price: 349, sizes: ONE, note: "خفيفة للملعب والتمرين." },
  { id: "grey-gymsack", name: "شنطة حبل رمادي", category: "bags", images: [img("grey-gymsack")], price: 299, sizes: ONE, note: "خامة مقاومة للماء." },
  { id: "ahly-flag", name: "علم الأهلي للمدرجات", category: "bags", images: [img("ahly-flag")], price: 249, sizes: ONE, note: "طباعة عالية الجودة بمقاس كبير." },
];

export const FREE_SHIPPING = 1500;
export const SHIPPING_FEE = 60;
export const egp = (n: number) => `${n.toLocaleString("en-US")} ج.م`;

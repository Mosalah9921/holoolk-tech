/**
 * مركز المعرفة — المقالات.
 * body بصيغة بسيطة: سطر يبدأ بـ "## " = عنوان فرعي، "- " = عنصر قائمة، "> " = ملاحظة مميزة، والباقي فقرات.
 * لإضافة مقال: انسخ أي عنصر وغيّر slug والمحتوى، وهيظهر تلقائياً في /blog وخريطة الموقع.
 */
export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string; // YYYY-MM-DD
  body: string;
};

export const articles: Article[] = [
  {
    slug: "why-store-visitors-dont-buy",
    title: "لماذا يزور العملاء متجرك ولا يشترون؟ 8 أسباب وحلولها",
    description: "زيارات كثيرة ومبيعات قليلة؟ المشكلة غالباً ليست في منتجاتك، بل في تفاصيل داخل المتجر. ثمانية أسباب شائعة تُضيّع المبيعات، وكيف تعالج كلاً منها.",
    category: "المتاجر الإلكترونية",
    date: "2026-10-17",
    body: `تنفق على الإعلانات، وتصل الزيارات إلى متجرك، ثم يغادر أغلب الزوار دون أن يشتروا. هذا السيناريو هو الأكثر شيوعاً بين أصحاب المتاجر الإلكترونية، والخبر الجيد أن أسبابه في الغالب معروفة وقابلة للإصلاح. فمعدل التحويل لا يتحدد بجودة المنتج وحدها، بل بكل خطوة يمر بها العميل من أول نظرة حتى تأكيد الطلب.

## 1. المتجر بطيء على الموبايل

أغلب زوار المتاجر في منطقتنا يتصفحون من الهاتف، وعبر اتصال ليس دائماً سريعاً. كل ثانية تأخير إضافية في التحميل ترفع احتمال مغادرة الزائر قبل أن يرى منتجاً واحداً.

- اضغط الصور بصيغ حديثة مثل WebP، واعرض لكل شاشة الحجم المناسب لها.
- قِس سرعة متجرك على الموبايل تحديداً عبر أداة PageSpeed Insights، لا على جهاز الكمبيوتر.

## 2. صور المنتجات لا تجيب عن أسئلة العميل

العميل لا يستطيع لمس المنتج، فالصورة هي بديل التجربة الكاملة. صورة واحدة صغيرة على خلفية عشوائية لا تكفي لإقناعه.

- اعرض المنتج من أكثر من زاوية، مع صورة تُظهر الخامة أو التفاصيل عن قرب.
- استخدم خلفية موحدة ونظيفة في كل المتجر، فهي تمنحه مظهراً احترافياً متماسكاً.

## 3. السعر النهائي يظهر متأخراً

من أكثر أسباب ترك السلة شيوعاً أن يكتشف العميل رسوم الشحن عند الخطوة الأخيرة. المفاجأة في السعر تهدم الثقة فوراً.

- وضّح تكلفة الشحن مبكراً، أو اعرض حد الشحن المجاني بوضوح.
- شريط بسيط داخل السلة يقول «باقي لك 200 جنيه للشحن المجاني» يشجع على إضافة منتج بدلاً من المغادرة.

## 4. إتمام الطلب طويل ومعقد

كل حقل إضافي في صفحة الدفع هو فرصة جديدة لتراجع العميل. إجبار الزائر على إنشاء حساب قبل الشراء من أكثر العوائق تكلفة.

- اسمح بالشراء كضيف، واطلب فقط البيانات الضرورية للتوصيل.
- اجمع خطوات الطلب في صفحة واحدة واضحة قدر الإمكان.

## 5. طرق الدفع لا تناسب جمهورك

متجر لا يقدم إلا البطاقات البنكية يخسر شريحة كبيرة من العملاء. عادات الدفع تختلف من سوق لآخر، والمتجر الناجح يتكيف معها.

- وفّر الدفع عند الاستلام إن كان شائعاً لدى عملائك، إلى جانب المحافظ الإلكترونية والبطاقات.
- اعرض شعارات وسائل الدفع المتاحة قبل صفحة الدفع، لا داخلها فقط.

## 6. غياب إشارات الثقة

الزائر الجديد لا يعرفك، ويحتاج إلى ما يطمئنه قبل أن يدفع. متجر بلا سياسة استبدال واضحة أو وسيلة تواصل ظاهرة يبدو مخاطرة.

- اكتب سياسة الاستبدال والاسترجاع بلغة بسيطة، وضع رابطها بجوار زر الشراء.
- أضف رقم واتساب ظاهراً، وآراء عملاء حقيقيين مع صورهم إن أمكن.

## 7. البحث والتصفح لا يوصلان العميل لما يريد

العميل الذي يعرف ما يريد يجب أن يصل إليه في ثوانٍ. تصنيفات مربكة أو بحث لا يفهم الأخطاء الإملائية يحولان الرغبة في الشراء إلى إحباط.

- نظّم المنتجات في تصنيفات واضحة بأسماء يستخدمها عملاؤك فعلاً.
- أضف فلاتر للمقاس واللون والسعر، وترتيباً حسب الأحدث والأقل سعراً.

## 8. لا متابعة بعد مغادرة الزائر

ليس كل من يغادر قد فقد اهتمامه؛ بعضهم انشغل فقط. المتاجر التي لا تعيد التواصل تترك جزءاً كبيراً من المبيعات على الطاولة.

- فعّل رسائل تذكير بالسلة المتروكة عبر البريد أو واتساب بعد موافقة العميل.
- استخدم إعلانات إعادة الاستهداف لمن زار صفحة منتج ولم يشترِ.

> لا تحاول إصلاح كل شيء في يوم واحد. ابدأ بقياس أين يغادر العملاء تحديداً: في صفحة المنتج، أم السلة، أم صفحة الدفع؛ ثم عالج النقطة الأكثر نزيفاً أولاً.

## الخلاصة

المتجر الإلكتروني الناجح ليس مجرد واجهة جميلة، بل رحلة شراء مدروسة تزيل كل عائق بين العميل وزر «تأكيد الطلب». راجع متجرك بعين عميل يزوره لأول مرة من هاتفه، وستكتشف بنفسك أين تضيع مبيعاتك. ويسعدنا في حلولك تيك مراجعة متجرك مجاناً وتحديد أهم التحسينات التي ترفع مبيعاتك، ويمكنك تجربة نموذج «متجر رَكض» لترى هذه المبادئ مطبقة عملياً.`,
  },
  {
    slug: "custom-system-vs-saas",
    title: "نظام مخصص أم اشتراك في نظام جاهز؟ كيف تختار لشركتك",
    description: "مقارنة عملية بين البرمجيات الجاهزة بالاشتراك والأنظمة المبنية خصيصاً: متى يوفر لك الجاهز، ومتى يصبح النظام المخصص استثماراً أذكى.",
    category: "قرارات المشروع",
    date: "2026-10-15",
    body: `تواجه الشركات النامية حيرة متكررة: هل تشترك في نظام جاهز لإدارة العملاء أو الحجوزات أو المخزون، أم تستثمر في تطوير نظام مخصص يلائم طريقة عملها بدقة؟ القرار الصحيح يوفر عليك سنوات من الحلول الالتفافية، والقرار الخاطئ يكلفك أكثر مما تتوقع.

## متى تكون الأنظمة الجاهزة كافية؟

- عندما تكون عملياتك قياسية وتشبه عمليات معظم الشركات في مجالك.
- عندما تحتاج إلى البدء خلال أيام، لا أسابيع.
- عندما يكون عدد المستخدمين صغيراً واحتياجات الربط بأنظمة أخرى محدودة.

في هذه الحالات، يمنحك النظام الجاهز بداية سريعة بتكلفة أولية منخفضة، وهذا اختيار منطقي تماماً.

## الحدود التي تظهر مع النمو

- **التكيف المعكوس:** بدلاً من أن يتكيف النظام مع طريقة عملك، تجد فريقك يغيّر طريقة عمله ليناسب النظام.
- **الاشتراكات المتراكمة:** تُحسب التكلفة غالباً لكل مستخدم شهرياً، فتتضاعف مع كل موظف جديد وكل ميزة إضافية.
- **صعوبة الربط:** ربط النظام بأدواتك الأخرى قد يكون محدوداً أو بتكلفة إضافية.
- **بياناتك خارج يدك:** تصدير بياناتك أو الانتقال إلى نظام آخر قد يكون معقداً.

## القيمة الحقيقية للنظام المخصص

النظام المخصص يُبنى حول عملياتك الفعلية، فيختصر الخطوات بدلاً من إضافتها. تملك الكود والبيانات ملكية كاملة، وتتحكم في معايير الأمان والصلاحيات، وتضيف المزايا عندما تحتاجها لا عندما يقررها مزود الخدمة.

## كيف تتخذ القرار؟

اطرح على نفسك ثلاثة أسئلة: هل عملياتك تميزك عن منافسيك؟ هل ستتجاوز تكلفة الاشتراكات خلال ثلاث سنوات تكلفة بناء نظامك؟ هل تحتاج إلى ربط عميق بأنظمة أخرى؟ إن كانت إجابتان على الأقل بنعم، فالنظام المخصص يستحق الدراسة الجادة.

> الحل لا يكون دائماً أبيض أو أسود؛ كثير من الشركات تبدأ بنظام جاهز للعمليات العامة، وتبني نظاماً مخصصاً للجزء الذي يصنع تميزها.

## الخلاصة

التحول الرقمي ليس قالباً موحداً. ابدأ بفهم عملياتك قبل اختيار الأداة، ويسعدنا في حلولك تيك تقييم وضعك الحالي واقتراح المسار الأنسب لأعمالك في جلسة استشارية مجانية.`,
  },
  {
    slug: "data-security-practices-2026",
    title: "5 ممارسات أمنية أساسية لحماية بيانات منشأتك",
    description: "مع اعتماد الأعمال على الأنظمة السحابية، أصبح الأمان ركيزة لاستمرار النشاط. خمس ممارسات أساسية تحمي بيانات منشأتك وعملائك.",
    category: "الأمان والحماية",
    date: "2026-10-15",
    body: `كلما اعتمدت منشأتك على الأنظمة الرقمية، أصبحت بياناتها أثمن، وأصبح الوصول غير المصرح به إليها أكثر كلفة. والخبر الجيد أن أغلب الحوادث الأمنية الشائعة يمكن تجنبها بممارسات أساسية واضحة، لا تحتاج إلى ميزانيات ضخمة بقدر ما تحتاج إلى انضباط.

## 1. المصادقة الثنائية لكل الحسابات المهمة

كلمة المرور وحدها لم تعد كافية. فعّل التحقق بخطوتين على البريد الإلكتروني، ولوحات التحكم، وحسابات الاستضافة والنطاق. حتى لو تسربت كلمة مرور، تبقى الحسابات محمية.

## 2. صلاحيات محدودة حسب الدور

لا يحتاج كل موظف إلى الوصول إلى كل شيء. صمّم الصلاحيات بحيث يرى كل مستخدم ويعدّل ما يخص عمله فقط، وراجعها دورياً، وألغِ صلاحيات من يغادر الفريق في اليوم نفسه.

## 3. التشفير أثناء النقل والتخزين

- اتصال مشفّر HTTPS لكل موقع ونظام، دون استثناء.
- تشفير البيانات الحساسة داخل قاعدة البيانات.
- عدم إرسال كلمات المرور أو البيانات الحساسة عبر رسائل غير مشفرة.

## 4. نسخ احتياطي مُختبر

النسخة الاحتياطية التي لم تُجرَّب استعادتها مجرد افتراض. اعتمد نسخاً احتياطياً تلقائياً منتظماً، واحفظ نسخة في موقع منفصل، واختبر الاسترجاع فعلياً كل فترة لتتأكد أنك تستطيع العودة للعمل إن حدث طارئ.

## 5. التحديث وفحص الثغرات دورياً

أغلب الاختراقات تستغل ثغرات معروفة لها تحديثات متاحة لم تُثبّت. حدّث أنظمتك ومكتباتك البرمجية بانتظام، وافحصها دورياً، وراقب أي نشاط غير معتاد في السجلات.

> الأمان ليس منتجاً تشتريه مرة واحدة، بل عادة يومية في طريقة بناء الأنظمة وإدارتها.

## من أين تبدأ؟

إن لم تطبق أياً من هذه الممارسات بعد، فابدأ بالمصادقة الثنائية والنسخ الاحتياطي؛ فهما الأسرع تطبيقاً والأكبر أثراً. وفي حلولك تيك نضع الأمان في قلب كل نظام نبنيه منذ مرحلة التصميم، لتعمل بثقة دون قلق على بياناتك.`,
  },
  {
    slug: "facebook-page-is-not-enough",
    title: "لماذا لا تكفي صفحة فيسبوك لنشاطك التجاري؟",
    description: "صفحات التواصل الاجتماعي أداة ممتازة للوصول، لكنها ليست ملكك. تعرّف على ما يضيفه الموقع الإلكتروني ولا تستطيع الصفحة تقديمه.",
    category: "النمو الرقمي",
    date: "2026-10-15",
    body: `يبدأ أغلب أصحاب الأنشطة حضورهم الرقمي بصفحة على فيسبوك أو إنستجرام، وهذه بداية منطقية؛ فالجمهور هناك، والإنشاء مجاني وسريع. لكن مع نمو النشاط تظهر حدود هذه الصفحات بوضوح، ويتحول الاعتماد الكامل عليها إلى مخاطرة حقيقية.

## الصفحة ليست ملكك

الصفحة تعيش على منصة تضع قواعدها وتغيّرها متى شاءت. قد تنخفض نسبة وصول منشوراتك فجأة، وقد يُقيَّد الحساب أو يُغلق بسبب بلاغ خاطئ، فتفقد في لحظة سنوات من التواصل مع عملائك. أما الموقع فهو أصل رقمي تملكه، على نطاق يحمل اسمك، ولا يستطيع أحد أن يغلقه عليك.

## العميل يبحث في جوجل لا في فيسبوك

حين يحتاج شخص إلى عيادة أسنان أو مطعم قريب أو شركة صيانة، فإنه يكتب حاجته في محرك البحث. الصفحات الاجتماعية نادراً ما تظهر بقوة في هذه النتائج، بينما يستطيع موقع مهيأ جيداً أن يظهر أمام عميل جاهز للشراء في اللحظة التي يبحث فيها.

## المعلومات تضيع بين المنشورات

قائمة الأسعار، ومواعيد العمل، والعنوان، وتفاصيل الخدمات؛ كلها تُنشر مرة ثم تختفي تحت عشرات المنشورات الجديدة، فيضطر العميل إلى السؤال في الرسائل وانتظار الرد. الموقع يجمع هذه المعلومات في مكان منظم يصل إليه الزائر في ثوانٍ، دون أن يحتاج إلى سؤال أحد.

## الثقة والانطباع الأول

يرى كثير من العملاء أن النشاط الذي يملك موقعاً احترافياً أكثر جدية واستقراراً. الموقع المصمم بعناية يقول للعميل إنك تستثمر في عملك، وإنك ستكون موجوداً غداً.

## ما يقدمه الموقع ولا تقدمه الصفحة

- حجز المواعيد أو الطاولات إلكترونياً على مدار الساعة.
- نماذج طلب تصلك منظمة بكل التفاصيل التي تحتاجها.
- قياس دقيق لعدد الزوار ومصادرهم وما يبحثون عنه.
- حرية كاملة في التصميم والهوية دون قيود قالب المنصة.
- بريد إلكتروني رسمي باسم نطاقك يعزز احترافيتك.

> لا نقول لك أغلق صفحتك؛ بل اجعلها بوابة توجّه الجمهور إلى موقعك، حيث تتحول المتابعة إلى طلب فعلي.

## الخلاصة

الصفحات الاجتماعية مكان ممتاز لبدء الحديث مع جمهورك، والموقع هو المكان الذي يكتمل فيه هذا الحديث بصفقة. الجمع بين الاثنين هو ما تفعله الأنشطة التي تنمو بثبات.`,
  },
  {
    slug: "clinic-website-guide",
    title: "كيف تختار موقعاً إلكترونياً مناسباً لعيادتك؟",
    description: "دليل عملي لأصحاب العيادات والمراكز الطبية: ما الذي يحتاجه المريض من موقعك، وما المزايا التي تستحق الاستثمار فيها.",
    category: "دليل القطاعات",
    date: "2026-10-15",
    body: `قبل أن يتصل المريض بعيادتك، غالباً ما يكون قد بحث عنها، وقرأ عن الطبيب، وقارن بينها وبين عيادة أخرى. موقع العيادة هو المكان الذي يُتخذ فيه هذا القرار، ولذلك يحتاج إلى تخطيط مختلف عن أي موقع تجاري آخر.

## ابدأ بما يبحث عنه المريض

المريض لا يبحث عن تصميم مبهر، بل عن إجابات واضحة: ما التخصصات المتاحة؟ من الأطباء وما خبراتهم؟ أين العيادة ومتى تعمل؟ وكيف أحجز؟ أي موقع لا يجيب عن هذه الأسئلة في أول نظرة يدفع المريض إلى الضغط على زر الرجوع.

## الحجز الإلكتروني أولوية لا رفاهية

المكالمات الهاتفية لحجز المواعيد تستهلك وقت فريق الاستقبال، وتضيع كثيراً منها خارج ساعات العمل. نظام حجز بسيط يختار فيه المريض الخدمة واليوم والساعة المتاحة يريح الطرفين، ويضمن ألا يفوتك مريض قرر الحجز في منتصف الليل.

## الثقة قبل كل شيء

- صفحة لكل طبيب تعرض مؤهلاته وتخصصه بوضوح.
- صور حقيقية للعيادة بدلاً من الصور الجاهزة المكررة.
- معلومات تواصل وعنوان وخريطة واضحة.
- تصميم هادئ بألوان مريحة ونصوص سهلة القراءة.

## السرعة على الهاتف

نسبة كبيرة من المرضى يتصفحون من هواتفهم، وكثير منهم في حالة قلق أو استعجال. موقع بطيء أو صعب التصفح على الشاشة الصغيرة يعني مريضاً ذهب إلى عيادة أخرى. اطلب دائماً أن يُصمم الموقع للهاتف أولاً.

## سهولة الوصول

بين زوار المواقع الطبية كبار سن وأشخاص بإعاقات بصرية أو حركية. الخطوط المقروءة، والتباين الجيد بين الألوان، وإمكانية التنقل بلوحة المفاتيح ليست تفاصيل تقنية، بل احترام لمرضاك.

> قاعدة بسيطة: إن استطاع مريض جديد أن يحجز موعداً من هاتفه خلال دقيقتين دون اتصال، فموقعك يؤدي دوره.

## ما الذي يمكن تأجيله؟

لا تحتاج في البداية إلى ملفات مرضى إلكترونية أو تطبيق مستقل. ابدأ بموقع واضح ونظام حجز فعّال، ثم أضف المزايا تدريجياً بحسب احتياج عيادتك الفعلي.`,
  },
  {
    slug: "restaurant-website-essentials",
    title: "ما الذي يحتاجه موقع المطعم ليجلب حجوزات فعلية؟",
    description: "قائمة الطعام، والحجز، والصور، والسرعة: العناصر التي تحوّل زائر موقع المطعم إلى ضيف على طاولتك.",
    category: "دليل القطاعات",
    date: "2026-10-15",
    body: `زائر موقع المطعم غالباً جائع ومستعجل، ويتخذ قراره في دقائق. لذلك لا يحتاج موقع المطعم إلى صفحات كثيرة، بل إلى عناصر قليلة مختارة بعناية تقود الزائر مباشرة إلى الحجز أو الطلب.

## قائمة طعام تُقرأ لا تُحمَّل

أكثر خطأ شائع هو رفع قائمة الطعام كملف PDF أو صورة. هذه الصيغ بطيئة على الهاتف، ولا يقرؤها محرك البحث، ويصعب تحديثها. القائمة الأفضل نصية ومقسمة إلى أقسام واضحة، بأسعار ظاهرة، وعلامات للأطباق المميزة أو النباتية.

## زر الحجز في كل مكان

يجب أن يكون الحجز على بعد ضغطة واحدة من أي صفحة. نموذج قصير يطلب التاريخ والوقت وعدد الأفراد ورقم الهاتف يكفي، وكل حقل إضافي يقلل عدد من يكملون الحجز.

## صور تفتح الشهية

الصورة هي ما يبيع الطبق قبل أن يُتذوق. استثمر في تصوير احترافي لأطباقك الأساسية وأجواء المكان، وتجنب الصور الجاهزة التي يعرف العميل أنها ليست من مطبخك.

## المعلومات الأساسية واضحة

- العنوان مع رابط مباشر إلى الخريطة.
- مواعيد العمل محدثة، خاصة في المواسم والأعياد.
- رقم هاتف قابل للضغط مباشرة من الهاتف.
- روابط التوصيل إن كنت تتعامل مع تطبيقات توصيل.

## هوية تشبه مطعمك

مطعم المأكولات الشرقية التقليدية لا يشبه مقهى القهوة المختصة، ولا ينبغي أن يتشابه موقعاهما. الألوان والخطوط وطريقة الكتابة يجب أن تعكس تجربة الضيف داخل المطعم.

> اختبار سريع: افتح موقعك من هاتفك وأنت خارج المطعم. هل تستطيع خلال 30 ثانية أن تعرف ما الذي تأكله، وكم ستدفع، وكيف تحجز؟

## الخلاصة

موقع المطعم الناجح قصير وسريع ومركّز: قائمة واضحة، وصور حقيقية، وحجز سهل. كل ما عدا ذلك يمكن أن يأتي لاحقاً.`,
  },
  {
    slug: "template-vs-custom-website",
    title: "موقع جاهز أم موقع مخصص: أيهما يناسب مشروعك؟",
    description: "مقارنة صريحة بين القوالب الجاهزة والمواقع المبنية خصيصاً: متى يكفيك القالب، ومتى يصبح التطوير المخصص استثماراً ضرورياً.",
    category: "قرارات المشروع",
    date: "2026-10-15",
    body: `من أول الأسئلة التي يواجهها صاحب أي مشروع: هل أكتفي بقالب جاهز على منصة لبناء المواقع، أم أطلب موقعاً مبنياً خصيصاً؟ لا توجد إجابة واحدة صحيحة للجميع، لكن هناك معايير واضحة تساعدك على الاختيار.

## متى يكفيك القالب الجاهز؟

- عندما تختبر فكرة جديدة ولم تتأكد بعد من جدواها.
- عندما يكون احتياجك صفحة تعريفية بسيطة دون وظائف خاصة.
- عندما تحتاج إلى حضور سريع خلال أيام قليلة.

القوالب خيار معقول في هذه الحالات، بشرط أن تعرف حدودها مسبقاً.

## حدود القوالب التي تظهر لاحقاً

- **التشابه:** القالب نفسه يستخدمه آلاف غيرك، فيصعب أن يتميز موقعك.
- **السرعة:** القوالب تحمّل أكواداً لمزايا لا تستخدمها، فيصبح الموقع أبطأ.
- **العربية:** كثير من القوالب مصممة للإنجليزية أولاً، فتظهر مشكلات في الاتجاه والخطوط.
- **التوسع:** حين تحتاج إلى نظام حجز خاص أو ربط بأنظمتك، تصطدم بقيود المنصة.
- **الملكية:** موقعك يعيش داخل منصة لا تملكها، وقد يصعب نقله لاحقاً.

## متى يصبح الموقع المخصص ضرورياً؟

عندما يكون الموقع جزءاً من طريقة عملك لا مجرد واجهة: نظام حجز بقواعد خاصة، أو متجر بمنطق تسعير معين، أو لوحة تحكم لفريقك، أو هوية بصرية تريدها أن تميزك فعلاً. في هذه الحالات يوفر عليك البناء المخصص كثيراً من الحلول الالتفافية لاحقاً.

## السؤال الحقيقي: ماذا تحتاج بعد سنة؟

لا تقارن الخيارين بما تحتاجه اليوم فقط. تخيل نشاطك بعد عام: هل ستحتاج إلى لغة ثانية، أو حجز إلكتروني، أو ربط بنظام محاسبي؟ إن كانت الإجابة نعم، فابدأ بأساس يتحمل هذا النمو.

> نصيحة عملية: اطلب من أي جهة تتعامل معها أن توضح لك من يملك الكود والنطاق والاستضافة بعد التسليم. هذا السؤال وحده يكشف الكثير.

## الخلاصة

القالب الجاهز بداية سريعة، والموقع المخصص أساس للنمو. اختر بحسب مرحلة مشروعك وطموحك، لا بحسب ما يفعله الآخرون.`,
  },
  {
    slug: "questions-before-hiring-web-agency",
    title: "7 أسئلة اسألها قبل التعاقد مع أي شركة تطوير مواقع",
    description: "قبل أن توقّع، اسأل هذه الأسئلة السبعة لتتجنب أكثر مشكلات مشاريع المواقع شيوعاً: التأخير، والتكاليف المفاجئة، وفقدان ملكية موقعك.",
    category: "قرارات المشروع",
    date: "2026-10-15",
    body: `اختيار الجهة التي تبني موقعك قرار يؤثر في نشاطك لسنوات. والفرق بين تجربة ناجحة وأخرى مرهقة يظهر غالباً في أسئلة بسيطة لم تُطرح قبل التعاقد. هذه سبعة أسئلة ننصح كل عميل بطرحها، علينا وعلى غيرنا.

## 1. من يملك الموقع بعد التسليم؟

تأكد كتابياً أنك ستملك الكود المصدري والنطاق وحسابات الاستضافة باسمك. بعض الجهات تحتفظ بها لنفسها، فتصبح رهيناً لها في كل تعديل.

## 2. ما النطاق الدقيق للعمل؟

اطلب قائمة مكتوبة بالصفحات والمزايا المتفق عليها. الغموض في البداية هو السبب الأول للخلاف في النهاية.

## 3. ما الجدول الزمني ومراحله؟

اسأل عن مراحل المشروع وما ستستلمه في نهاية كل مرحلة، لا عن موعد التسليم النهائي وحده. المراحل الواضحة تكشف أي تأخير مبكراً.

## 4. كم عدد جولات التعديل المتاحة؟

التعديلات جزء طبيعي من أي مشروع، لكن عددها وحدودها يجب أن يكون واضحاً منذ البداية.

## 5. هل يمكنني رؤية أعمال سابقة حقيقية؟

اطلب روابط تعمل فعلاً لا صوراً فقط، وجرّبها من هاتفك. افتح الموقع، وتنقل بين صفحاته، وجرّب نماذجه.

## 6. ماذا يحدث بعد الإطلاق؟

من سيصلح الأعطال؟ وكيف تُضاف صفحة جديدة؟ وهل هناك فترة دعم مشمولة؟ الموقع بداية علاقة، لا نهاية مشروع.

## 7. كيف سنتواصل أثناء العمل؟

اعرف مع من ستتحدث تحديداً، وعبر أي وسيلة، وخلال أي مدة يُرد عليك. وضوح التواصل يختصر نصف مشكلات أي مشروع.

> أي جهة محترفة سترحب بهذه الأسئلة وتجيب عنها بوضوح. التردد في الإجابة هو بحد ذاته إجابة.

## الخلاصة

خمس عشرة دقيقة من الأسئلة قبل التعاقد توفر عليك شهوراً من المشكلات بعده. اكتب الإجابات، واطلب أن تكون جزءاً من الاتفاق.`,
  },
];

/** وقت القراءة التقريبي بالدقائق (حوالي 180 كلمة في الدقيقة للعربية) */
export function readingMinutes(a: Article) {
  return Math.max(2, Math.round(a.body.split(/\s+/).length / 180));
}

/** صيغة صحيحة لوقت القراءة (عربي/إنجليزي) */
export function readingLabel(a: Article, locale: "ar" | "en" = "ar") {
  const n = readingMinutes(a);
  if (locale === "en") return `${Math.max(2, Math.round(a.body.split(/\s+/).length / 220))} min read`;
  if (n === 2) return "دقيقتان للقراءة";
  if (n <= 10) return `${n} دقائق للقراءة`;
  return `${n} دقيقة للقراءة`;
}

/* ============================ English ============================ */

export const articlesEn: Article[] = [
  {
    slug: "why-store-visitors-dont-buy",
    title: "Why Shoppers Visit Your Store but Don’t Buy: 8 Fixes",
    description: "Plenty of traffic but few sales? The problem is rarely your products. It's usually small details inside the store. Eight common conversion killers and how to fix each one.",
    category: "E-commerce",
    date: "2026-10-17",
    body: `You pay for ads, the traffic arrives, and most visitors leave without buying. It's the most common story among online store owners, and the good news is that the causes are usually well known and fixable. Your conversion rate isn't decided by product quality alone. It's shaped by every step a shopper takes, from the first glance to the order confirmation.

## 1. Your store is slow on mobile

Most shoppers browse on their phones, often on connections that aren't always fast. Every extra second of loading time raises the chance that a visitor leaves before seeing a single product.

- Compress images in modern formats like WebP, and serve each screen the size it actually needs.
- Measure your store's speed on mobile specifically with PageSpeed Insights, not just on a desktop.

## 2. Product photos don't answer the shopper's questions

Customers can't touch the product, so photos have to stand in for the whole experience. One small image on a random background won't convince anyone.

- Show the product from several angles, including a close-up of the material and details.
- Use one clean, consistent background across the store for a polished, cohesive look.

## 3. The real price shows up too late

One of the top reasons for abandoned carts is discovering shipping fees at the very last step. A surprise in the price destroys trust instantly.

- Make shipping costs clear early, or display your free-shipping threshold prominently.
- A simple cart bar saying "You're 200 EGP away from free shipping" encourages one more item instead of an exit.

## 4. Checkout is long and complicated

Every extra field on the checkout page is another chance for the customer to back out. Forcing visitors to create an account before buying is one of the costliest obstacles of all.

- Allow guest checkout, and ask only for the details you need to deliver.
- Keep the checkout steps on a single, clear page wherever possible.

## 5. Payment options don't fit your audience

A store that only accepts bank cards loses a large share of customers. Payment habits differ from market to market, and successful stores adapt to them.

- Offer cash on delivery if your customers expect it, alongside digital wallets and cards.
- Show the accepted payment logos before checkout, not only inside it.

## 6. There are no trust signals

New visitors don't know you, and they need reassurance before paying. A store without a clear returns policy or a visible way to get in touch feels like a risk.

- Write your exchange and returns policy in plain language, and link it right next to the buy button.
- Add a visible WhatsApp number and genuine customer reviews, with photos where possible.

## 7. Search and browsing don't lead shoppers to what they want

A customer who knows what they want should find it in seconds. Confusing categories, or a search that can't handle typos, turn buying intent into frustration.

- Organize products into clear categories, named the way your customers actually talk.
- Add filters for size, color and price, plus sorting by newest and lowest price.

## 8. There's no follow-up after a visitor leaves

Not everyone who leaves has lost interest; some simply got distracted. Stores that never reach back out leave a big share of their sales on the table.

- Set up abandoned-cart reminders by email or WhatsApp, with the customer's consent.
- Use retargeting ads for people who viewed a product page but didn't buy.

> Don't try to fix everything in one day. Start by measuring exactly where shoppers drop off (product page, cart or checkout), then fix the leakiest step first.

## The bottom line

A successful online store isn't just a beautiful storefront. It's a carefully designed buying journey that removes every obstacle between the customer and the "Place order" button. Review your store through the eyes of a first-time visitor on their phone, and you'll see exactly where your sales are slipping away. At Holoolk Tech, we're happy to review your store for free and pinpoint the improvements that will lift your sales. You can also try our RAKD Store demo to see these principles in action.`,
  },
  {
    slug: "custom-system-vs-saas",
    title: "Custom System or Off-the-Shelf Software? How to Choose",
    description: "A practical comparison of subscription software and custom-built systems: when off-the-shelf saves you money, and when custom becomes the smarter investment.",
    category: "Project decisions",
    date: "2026-10-15",
    body: `Growing businesses face the same dilemma again and again: subscribe to a ready-made system for customers, bookings or inventory, or invest in a custom system that fits the way they work? The right decision saves you years of workarounds. The wrong one costs more than you expect.

## When is off-the-shelf software enough?

- When your processes are standard and similar to most businesses in your industry.
- When you need to get started in days, not weeks.
- When you have few users and limited integration needs.

In these cases, a ready-made system gives you a fast start at a low upfront cost, and it's a perfectly sensible choice.

## The limits that appear as you grow

- **Reverse adaptation:** instead of the system adapting to your workflow, your team bends its workflow to fit the system.
- **Stacking subscriptions:** pricing is usually per user per month, so costs multiply with every new hire and every add-on.
- **Hard integrations:** connecting the system to your other tools may be limited or cost extra.
- **Your data isn't in your hands:** exporting your data or moving to another system can be complicated.

## The real value of a custom system

A custom system is built around your actual operations, so it removes steps instead of adding them. You fully own the code and the data, you control security and permissions, and you add features when you need them, not when a vendor decides.

## How to decide

Ask yourself three questions: Do your processes set you apart from competitors? Will three years of subscriptions cost more than building your own system? Do you need deep integration with other systems? If at least two answers are yes, a custom system deserves serious consideration.

> It's rarely black and white. Many companies start with off-the-shelf software for general operations, then build a custom system for the part that makes them unique.

## The bottom line

Digital transformation isn't one-size-fits-all. Start by understanding your operations before choosing the tool. At Holoolk Tech, we're happy to review your current setup and recommend the right path in a free consultation.`,
  },
  {
    slug: "data-security-practices-2026",
    title: "5 Essential Security Practices to Protect Your Business Data",
    description: "As businesses move to the cloud, security has become essential to staying in business. Five core practices that protect your company's and your customers' data.",
    category: "Security",
    date: "2026-10-15",
    body: `The more your business relies on digital systems, the more valuable its data becomes, and the more costly unauthorized access gets. The good news: most common security incidents can be avoided with clear, basic practices that need discipline far more than big budgets.

## 1. Two-factor authentication on every important account

A password alone is no longer enough. Turn on two-step verification for email, dashboards, hosting and domain accounts. Even if a password leaks, your accounts stay protected.

## 2. Role-based, limited permissions

Not every employee needs access to everything. Design permissions so each user sees and edits only what their job requires, review them regularly, and revoke access for anyone leaving the team on the same day.

## 3. Encryption in transit and at rest

- An encrypted HTTPS connection for every website and system, without exception.
- Sensitive data encrypted inside the database.
- Never sending passwords or sensitive data through unencrypted messages.

## 4. Tested backups

A backup you've never restored is just an assumption. Set up regular automatic backups, keep a copy in a separate location, and actually test restoring from time to time so you know you can get back to work if something goes wrong.

## 5. Regular updates and vulnerability checks

Most breaches exploit known vulnerabilities that already have available fixes. Update your systems and libraries regularly, scan them periodically, and watch your logs for unusual activity.

> Security isn't a product you buy once. It's a daily habit in how systems are built and run.

## Where to start

If you haven't applied any of these yet, start with two-factor authentication and backups: they're the quickest to set up and have the biggest impact. At Holoolk Tech, security is at the heart of every system we build from the design stage, so you can work with confidence.`,
  },
  {
    slug: "facebook-page-is-not-enough",
    title: "Why a Facebook Page Isn't Enough for Your Business",
    description: "Social pages are great for reach, but you don't own them. Here's what a website gives you that a page simply can't.",
    category: "Digital growth",
    date: "2026-10-15",
    body: `Most business owners start their online presence with a Facebook or Instagram page, and that makes sense: the audience is there, and it's free and fast to set up. But as the business grows, the limits of these pages become clear, and relying on them entirely becomes a real risk.

## The page isn't yours

Your page lives on a platform that sets and changes the rules whenever it likes. Your reach can drop suddenly, and your account can be restricted or closed over a false report, wiping out years of conversations with your customers in a moment. A website is a digital asset you own, on a domain with your name, and no one can shut it down on you.

## Customers search Google, not Facebook

When someone needs a dentist, a nearby restaurant or a maintenance company, they type what they need into a search engine. Social pages rarely rank well in those results, while a well-optimized website can appear in front of a ready-to-buy customer at the exact moment they're searching.

## Information gets lost between posts

Price lists, opening hours, your address, service details: they're posted once and then buried under dozens of new posts, so customers have to ask in messages and wait for a reply. A website organizes all of this in one place that visitors reach in seconds, without asking anyone.

## Trust and first impressions

Many customers see a business with a professional website as more serious and established. A well-designed site tells customers you invest in your business, and that you'll still be here tomorrow.

## What a website does that a page can't

- 24/7 online booking for appointments or tables.
- Request forms that reach you organized, with every detail you need.
- Accurate insight into how many visitors you get, where they come from and what they look for.
- Complete freedom in design and branding, without a platform's template limits.
- A professional email address on your own domain.

> We're not saying close your page. Make it the gateway that sends your audience to your website, where following turns into an actual order.

## The bottom line

Social pages are a great place to start the conversation with your audience. Your website is where that conversation closes as a deal. Businesses that grow steadily use both.`,
  },
  {
    slug: "clinic-website-guide",
    title: "How to Choose the Right Website for Your Clinic",
    description: "A practical guide for clinic and medical center owners: what patients need from your website, and which features are worth investing in.",
    category: "Industry guides",
    date: "2026-10-15",
    body: `Before a patient calls your clinic, they've usually already searched for it, read about the doctor, and compared you with another clinic. Your website is where that decision is made, so it needs different planning from any other business website.

## Start with what patients look for

Patients aren't looking for flashy design. They want clear answers: Which specialties are available? Who are the doctors, and what's their experience? Where is the clinic, and when is it open? How do I book? A website that doesn't answer these at first glance sends patients straight to the back button.

## Online booking is a priority, not a luxury

Booking calls eat up your reception team's time, and many are missed outside working hours. A simple booking system where patients choose the service, day and available time makes life easier for everyone, and means you never miss a patient who decided to book at midnight.

## Trust above all

- A page for every doctor, clearly showing their credentials and specialty.
- Real photos of the clinic instead of generic stock images.
- Clear contact details, address and map.
- A calm design with soothing colors and easy-to-read text.

## Speed on mobile

A large share of patients browse on their phones, often while anxious or in a hurry. A slow website that's hard to use on a small screen means a patient who went to another clinic. Always ask for a mobile-first design.

## Accessibility

Medical websites are visited by older people and people with visual or motor disabilities. Readable fonts, good color contrast and keyboard navigation aren't technical details; they're respect for your patients.

> A simple rule: if a new patient can book an appointment from their phone in under two minutes without calling, your website is doing its job.

## What can wait?

You don't need electronic patient records or a standalone app at the start. Begin with a clear website and an effective booking system, then add features gradually based on your clinic's real needs.`,
  },
  {
    slug: "restaurant-website-essentials",
    title: "What a Restaurant Website Needs to Win Real Bookings",
    description: "Menu, booking, photos and speed: the elements that turn a restaurant website visitor into a guest at your table.",
    category: "Industry guides",
    date: "2026-10-15",
    body: `A restaurant website visitor is usually hungry and in a hurry, and decides within minutes. So a restaurant website doesn't need many pages; it needs a few carefully chosen elements that lead visitors straight to booking or ordering.

## A menu people can read, not download

The most common mistake is uploading the menu as a PDF or an image. These formats are slow on phones, invisible to search engines and hard to update. The best menu is text-based, organized into clear sections, with visible prices and labels for signature or vegetarian dishes.

## A booking button everywhere

Booking should always be one tap away, from any page. A short form asking for date, time, party size and phone number is enough; every extra field reduces the number of people who finish booking.

## Photos that whet the appetite

The photo sells the dish before anyone tastes it. Invest in professional photos of your main dishes and your space, and avoid stock images that customers know didn't come from your kitchen.

## The essentials, clearly visible

- Your address, with a direct link to the map.
- Up-to-date opening hours, especially during holidays and seasons.
- A phone number that can be tapped to call.
- Delivery links, if you work with delivery apps.

## An identity that feels like your restaurant

A traditional Middle Eastern restaurant shouldn't look like a specialty coffee shop, and their websites shouldn't either. Colors, fonts and tone of voice should reflect the experience guests have inside.

> A quick test: open your website on your phone while you're away from the restaurant. Can you find out within 30 seconds what you'll eat, how much you'll pay and how to book?

## The bottom line

A successful restaurant website is short, fast and focused: a clear menu, real photos and easy booking. Everything else can come later.`,
  },
  {
    slug: "template-vs-custom-website",
    title: "Template or Custom Website: Which One Fits Your Business?",
    description: "An honest comparison of ready-made templates and custom-built websites: when a template is enough, and when custom development becomes a necessary investment.",
    category: "Project decisions",
    date: "2026-10-15",
    body: `One of the first questions every business owner faces: should I settle for a template on a website builder, or get a custom-built website? There's no single right answer for everyone, but there are clear criteria that help you choose.

## When is a template enough?

- When you're testing a new idea and haven't validated it yet.
- When you need a simple informational page with no special features.
- When you need an online presence within a few days.

Templates are a reasonable choice in these cases, as long as you know their limits upfront.

## The limits that show up later

- **Sameness:** thousands of others use the same template, so it's hard to stand out.
- **Speed:** templates load code for features you don't use, which slows your website down.
- **Arabic support:** many templates are designed English-first, causing direction and font issues.
- **Growth:** when you need a custom booking flow or integration with your systems, you hit the platform's limits.
- **Ownership:** your website lives inside a platform you don't own, and it can be hard to move later.

## When does custom become necessary?

When your website is part of how you operate, not just a storefront: booking with special rules, a store with specific pricing logic, a dashboard for your team, or a visual identity you want to truly set you apart. In these cases, building custom saves you a lot of workarounds down the road.

## The real question: what will you need in a year?

Don't compare the options based only on today. Picture your business a year from now: will you need a second language, online booking, or integration with an accounting system? If the answer is yes, start on a foundation that can carry that growth.

> Practical advice: ask any provider you work with who will own the code, the domain and the hosting after delivery. That question alone reveals a lot.

## The bottom line

A template is a quick start; a custom website is a foundation for growth. Choose based on your stage and your ambition, not on what everyone else is doing.`,
  },
  {
    slug: "questions-before-hiring-web-agency",
    title: "7 Questions to Ask Before Hiring a Web Developer",
    description: "Before you sign, ask these seven questions to avoid the most common website project problems: delays, surprise costs and losing ownership of your site.",
    category: "Project decisions",
    date: "2026-10-15",
    body: `Choosing who builds your website affects your business for years. The difference between a smooth experience and an exhausting one often comes down to simple questions that weren't asked before signing. Here are seven questions we recommend every client asks, of us and of anyone else.

## 1. Who owns the website after delivery?

Make sure, in writing, that the source code, domain and hosting accounts will be in your name. Some providers keep them, leaving you dependent on them for every change.

## 2. What exactly is the scope of work?

Ask for a written list of the pages and features agreed. Ambiguity at the start is the number one cause of disputes at the end.

## 3. What's the timeline, and what are its milestones?

Ask about the project stages and what you'll receive at the end of each one, not just the final delivery date. Clear milestones expose delays early.

## 4. How many revision rounds are included?

Revisions are a normal part of any project, but how many and what they cover should be clear from the start.

## 5. Can I see real previous work?

Ask for links that actually work, not just screenshots, and try them on your phone. Open the website, move between pages and try the forms.

## 6. What happens after launch?

Who fixes issues? How do you add a new page? Is there an included support period? A website is the start of a relationship, not the end of a project.

## 7. How will we communicate during the project?

Know exactly who you'll be talking to, through which channel, and how quickly you'll get replies. Clear communication prevents half the problems in any project.

> Any professional provider will welcome these questions and answer them clearly. Hesitation is an answer in itself.

## The bottom line

Fifteen minutes of questions before signing saves you months of problems afterwards. Write down the answers, and ask for them to be part of the agreement.`,
  },
];

export const getArticles = (locale: "ar" | "en") => (locale === "en" ? articlesEn : articles);

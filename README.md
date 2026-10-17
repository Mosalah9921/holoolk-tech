# حلولك تيك — Holoolk Tech

الموقع الرسمي للشركة. مبني بـ **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4**، عربي بالكامل (RTL) بخط **Cairo**، ومعاه نسخة إنجليزية على `/en`.

- **58 صفحة** كلها بتتبني مسبقاً (Static) — سريعة ورخيصة في الاستضافة.
- قياس Lighthouse (أكتوبر 2026): الكمبيوتر 99–100 في السرعة، و100 في سهولة الاستخدام وأفضل الممارسات والـ SEO.

---

## التشغيل على جهازك

محتاج **Node.js 20 أو أحدث**.

```bash
npm install      # أول مرة بس
npm run dev      # افتح http://localhost:3000
npm run build    # بناء نسخة الإنتاج (لازم يعدّي من غير أخطاء قبل النشر)
```

---

## خطوات الإطلاق (بالترتيب)

### 1. الدومين
اشترِ `holoolk.com` (من Namecheap أو GoDaddy أو أي مسجّل). لو الدومين اتغيّر، عدّل `url` في `src/config/site.ts`.

### 2. النشر على Vercel (مجاني للبداية)
1. ارفع المشروع على GitHub (ريبو Private).
2. من [vercel.com](https://vercel.com): **Add New → Project** ← اختار الريبو ← **Deploy**.
3. **Settings → Domains**: ضيف `holoolk.com` و`www.holoolk.com`، ونفّذ إعدادات الـ DNS اللي هيطلبها منك عند مسجّل الدومين.

### 3. الإيميل الرسمي
اعمل `contact@holoolk.com` (Google Workspace أو Zoho Mail — Zoho فيه خطة مجانية). الإيميل ده ظاهر في الموقع كله، فلازم يكون شغال قبل الإطلاق.

### 4. متغيرات البيئة (Vercel → Settings → Environment Variables)

| المتغير | منين | لازم؟ |
|---|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | نموذج مجاني على [formspree.io](https://formspree.io) — كل طلب يوصلك نسخة منه على الإيميل | **مهم جداً** |
| `NEXT_PUBLIC_GA_ID` | [Google Analytics](https://analytics.google.com) (شكله `G-XXXXXXXXXX`) | مهم |
| `NEXT_PUBLIC_FB_PIXEL_ID` | Meta Events Manager — لو هتعمل إعلانات فيسبوك/إنستجرام | اختياري |

بعد إضافتها اعمل **Redeploy**.

### 5. جوجل
1. [Google Search Console](https://search.google.com/search-console): ضيف الدومين ← وثّقه ← ابعت `https://holoolk.com/sitemap.xml`.
2. [Google Business Profile](https://business.google.com): اعمل صفحة للشركة عشان تظهر في الخرائط والبحث المحلي.

### 6. مراجعة أخيرة
- [ ] جرّب كل نموذج (التواصل، ابدأ مشروعك، حجز الاستشارة، تقييم الموقع) ووصّل الرسالة لواتساب.
- [ ] اتأكد إن نسخة الطلب وصلت على الإيميل (Formspree).
- [ ] راجع [سياسة الخصوصية](src/content/legal.ts) و[الشروط](src/content/legal.ts) — يُفضّل مع محامٍ.
- [ ] افتح الموقع من موبايلك على 4G.

---

## تعديل المحتوى (من غير ما تلمس التصميم)

| عاوز تعدّل | الملف |
|---|---|
| الاسم، الواتساب، الإيميل، العنوان، السوشيال | `src/config/site.ts` |
| الخدمات | `src/content/services.ts` |
| الحلول (11 مجال) | `src/content/solutions.ts` |
| الأعمال ودراسات الحالة | `src/content/portfolio.ts` |
| المقالات | `src/content/blog.ts` |
| الباقات وجدول المقارنة ونسب الدفعات | `src/content/pricing.ts` |
| الأسئلة الشائعة (وأهم 5 في الرئيسية عبر `home`) | `src/content/faq.ts` |
| التقنيات (65 تقنية) | `src/content/stack.ts` |
| آراء العملاء (القسم بيظهر تلقائياً أول ما تضيف رأي) | `src/content/testimonials.ts` |
| من نحن ومجالات الخبرة | `src/content/about.ts` |
| سياسة الخصوصية والشروط | `src/content/legal.ts` |
| النسخة الإنجليزية | `src/content/en.ts` |
| القوائم والبحث | `src/config/navigation.ts` |

**أي صفحة جديدة بتتضاف تلقائياً** لخريطة الموقع والبحث والقوائم لما تضيفها في ملف المحتوى بتاعها.

---

## هيكل المشروع

```
src/
├── app/
│   ├── layout.tsx              ← الغلاف العام (الخط، الاتجاه، الـ SEO)
│   ├── (site)/                 ← كل الصفحات العربية (بالهيدر والفوتر)
│   │   ├── page.tsx            ← الرئيسية
│   │   ├── services/ solutions/ work/ blog/   ← صفحات + صفحة لكل عنصر
│   │   ├── pricing/ about/ process/ faq/ contact/
│   │   ├── start/ (مخطِّط المشروع)   book/ (حجز الاستشارة)   tools/
│   │   └── privacy/ terms/
│   ├── en/                     ← النسخة الإنجليزية
│   ├── demos/                  ← المواقع النموذجية (مطعم، عيادة، جيم)
│   └── sitemap.ts · robots.ts · manifest.ts · opengraph-image.png
├── components/                 ← مكونات التصميم
├── content/                    ← كل نصوص الموقع
├── config/                     ← الإعدادات والقوائم
└── lib/                        ← أدوات مساعدة (واتساب، التتبع)
public/brand/                   ← ملفات اللوجو (عربي، إنجليزي، ونسخ للخلفيات الغامقة)
```

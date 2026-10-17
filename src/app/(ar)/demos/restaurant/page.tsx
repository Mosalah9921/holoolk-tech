import type { Metadata } from "next";
import { El_Messiri } from "next/font/google";
import { Clock, Flame, MapPin, Phone, Star, Truck, UtensilsCrossed } from "lucide-react";
import { DemoBanner, DemoCTA } from "@/components/demos/DemoChrome";
import { DemoForm } from "@/components/demos/DemoForm";
import { RestaurantMenu } from "@/components/demos/restaurant/Menu";
import { Reveal } from "@/components/ui/Reveal";

/* ============================================================
   موقع نموذجي: مطعم "سُفرة" (نشاط وهمي)
   الألوان: كريمي + طوبي + زيتوني — دافئ ومناسب للأكل الشرقي
   ============================================================ */

const messiri = El_Messiri({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  alternates: { canonical: "/demos/restaurant" },
  title: "نموذج: مطعم سُفرة",
  description: "موقع نموذجي لمطعم شرقي: قائمة طعام تفاعلية وحجز طاولات. من تصميم حلولك تيك.",
};

const NAME = "مطعم سُفرة";

const hours = [
  { day: "السبت – الأربعاء", time: "1 ظهراً – 12 منتصف الليل" },
  { day: "الخميس – الجمعة", time: "1 ظهراً – 2 صباحاً" },
];

const inputCls =
  "w-full rounded-xl border border-[#2B1D14]/15 bg-white px-4 py-3 text-[#2B1D14] placeholder:text-[#2B1D14]/40 focus:border-[#B9461F] focus:outline-none focus:ring-4 focus:ring-[#B9461F]/15";

export default function RestaurantDemo() {
  return (
    <div className={`${messiri.className} min-h-dvh bg-[#FBF6EE] text-[#2B1D14]`}>
      <DemoBanner name={NAME} />

      {/* الهيدر */}
      <header className="sticky top-0 z-50 border-b border-[#2B1D14]/10 bg-[#FBF6EE]/90 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4">
          <a href="#top" className="flex items-center gap-2 text-2xl font-bold">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#B9461F] text-[#FBF6EE]">
              <UtensilsCrossed className="size-5" aria-hidden />
            </span>
            سُفرة
          </a>
          <nav className="hidden gap-8 text-lg md:flex" aria-label="قائمة المطعم">
            <a href="#menu" className="hover:text-[#B9461F]">قائمة الطعام</a>
            <a href="#story" className="hover:text-[#B9461F]">حكايتنا</a>
            <a href="#visit" className="hover:text-[#B9461F]">زورنا</a>
          </nav>
          <a href="#book" className="rounded-full bg-[#2B1D14] px-5 py-2.5 font-bold text-[#FBF6EE] transition-colors hover:bg-[#B9461F]">
            احجز طاولة
          </a>
        </div>
      </header>

      <main id="top">
        {/* الهيرو */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
            <div className="animate-fade-up">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#5B6B3A]/12 px-4 py-1.5 font-bold text-[#5B6B3A]">
                <Flame className="size-4" aria-hidden />
                مطبخ شرقي من 1998
              </p>
              <h1 className="text-5xl leading-[1.3] font-bold sm:text-6xl">
                مذاق البيت…
                <br />
                <span className="text-[#B9461F]">بإتقان المطاعم.</span>
              </h1>
              <p className="mt-6 max-w-md text-xl leading-9 text-[#2B1D14]/70">
                مشويات على الفحم، وطواجن في الفخار، وحلويات طازجة من الفرن، كما تُعدّ في بيت العائلة يوم الجمعة.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#menu" className="rounded-full bg-[#B9461F] px-7 py-3.5 text-lg font-bold text-[#FBF6EE] shadow-lg shadow-[#B9461F]/25 transition-transform hover:-translate-y-0.5">
                  تصفّح القائمة
                </a>
                <a href="#book" className="rounded-full border-2 border-[#2B1D14] px-7 py-3 text-lg font-bold transition-colors hover:bg-[#2B1D14] hover:text-[#FBF6EE]">
                  احجز طاولة
                </a>
              </div>
              <div className="mt-10 flex items-center gap-6 text-[#2B1D14]/70">
                <span className="flex items-center gap-1.5">
                  <Star className="size-5 fill-[#E0A43B] text-[#E0A43B]" aria-hidden />
                  <b className="text-[#2B1D14]">4.8</b> تقييم الزوار
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="size-5 text-[#5B6B3A]" aria-hidden />
                  توصيل خلال 45 دقيقة
                </span>
              </div>
            </div>

            {/* طبق زخرفي */}
            <div aria-hidden className="relative mx-auto aspect-square w-full max-w-md">
              <svg viewBox="0 0 400 400" className="size-full animate-spin [animation-duration:90s]">
                <circle cx="200" cy="200" r="190" fill="#EADBC4" />
                <circle cx="200" cy="200" r="160" fill="none" stroke="#B9461F" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
                <circle cx="200" cy="200" r="140" fill="#FBF6EE" />
                <circle cx="200" cy="200" r="120" fill="none" stroke="#5B6B3A" strokeWidth="1.5" strokeDasharray="14 8" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <g key={i} transform={`rotate(${i * 30} 200 200)`}>
                    <path d="M200 25 q10 12 0 24 q-10 -12 0 -24z" fill="#B9461F" opacity="0.85" />
                  </g>
                ))}
                <circle cx="200" cy="200" r="70" fill="#B9461F" />
                <circle cx="200" cy="200" r="54" fill="none" stroke="#FBF6EE" strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-[#FBF6EE]">سُفرة</span>
              </div>
              <div className="absolute -bottom-2 start-0 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-[#2B1D14]/10">
                <p className="text-sm text-[#2B1D14]/70">طبق اليوم</p>
                <p className="font-bold">طاجن بامية باللحمة</p>
              </div>
              <div className="absolute top-6 end-0 flex items-center gap-2 rounded-full bg-[#5B6B3A] px-4 py-2 text-sm font-bold text-white shadow-lg">
                <span className="size-2 animate-pulse rounded-full bg-lime-300" />
                مفتوح الآن
              </div>
            </div>
          </div>
        </section>

        {/* المنيو */}
        <section id="menu" className="scroll-mt-20 bg-white py-20">
          <Reveal className="mx-auto max-w-5xl px-4">
            <div className="mb-10 text-center">
              <p className="font-bold text-[#B9461F]">قائمة الطعام</p>
              <h2 className="mt-2 text-4xl font-bold">اختر من سُفرتنا</h2>
            </div>
            <RestaurantMenu />
          </Reveal>
        </section>

        {/* الحكاية */}
        <section id="story" className="scroll-mt-20 py-20">
          <Reveal className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "+25", l: "سنة في المطبخ" },
                { n: "+60", l: "صنف في القائمة" },
                { n: "100%", l: "لحوم بلدية طازجة" },
                { n: "3", l: "فروع في القاهرة" },
              ].map((s, i) => (
                <div key={s.l} className={`rounded-3xl p-6 ${i % 3 === 0 ? "bg-[#B9461F] text-[#FBF6EE]" : "bg-[#EADBC4]"}`}>
                  <p className="text-4xl font-bold">{s.n}</p>
                  <p className="mt-1 opacity-80">{s.l}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="font-bold text-[#B9461F]">حكايتنا</p>
              <h2 className="mt-2 text-4xl leading-tight font-bold">بدأت من مطبخ العائلة… وكبرت بكم</h2>
              <p className="mt-6 text-lg leading-9 text-[#2B1D14]/70">
                في عام 1998 افتتحنا فرعنا الأول بأربع طاولات ووصفات الحاجة أم محمود. واليوم أصبحنا ثلاثة فروع، وما زلنا نتبّل
                المشويات بالأيدي ذاتها، ونطهو الطواجن في الفخار نفسه.
              </p>
            </div>
          </Reveal>
        </section>

        {/* الحجز */}
        <section id="book" className="scroll-mt-20 bg-[#2B1D14] py-20 text-[#FBF6EE]">
          <Reveal className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="font-bold text-[#E0A43B]">احجز طاولتك</p>
              <h2 className="mt-2 text-4xl leading-tight font-bold">عزومة عائلية؟ عيد ميلاد؟ لقاء أصدقاء؟</h2>
              <p className="mt-5 text-lg leading-9 text-[#FBF6EE]/70">
                احجز من هنا في أقل من دقيقة، وسنؤكد حجزك عبر واتساب. وللمجموعات التي تتجاوز 12 فرداً يُرجى التواصل معنا مباشرة.
              </p>
              <p className="mt-6 flex items-center gap-2 text-xl font-bold" dir="ltr">
                <Phone className="size-5 text-[#E0A43B]" aria-hidden />
                19XXX
              </p>
            </div>

            <DemoForm
              successTitle="تم استلام طلب الحجز!"
              successClassName="rounded-3xl bg-[#FBF6EE] p-10 text-center text-[#2B1D14]"
              className="grid gap-4 rounded-3xl bg-[#FBF6EE] p-6 text-[#2B1D14] sm:grid-cols-2 sm:p-8"
            >
              <label className="sm:col-span-2">
                <span className="mb-1.5 block font-bold">الاسم</span>
                <input required className={inputCls} placeholder="الاسم" />
              </label>
              <label>
                <span className="mb-1.5 block font-bold">رقم الهاتف</span>
                <input required type="tel" dir="ltr" className={`${inputCls} text-end`} placeholder="01xxxxxxxxx" />
              </label>
              <label>
                <span className="mb-1.5 block font-bold">عدد الأفراد</span>
                <select className={inputCls} defaultValue="4">
                  {[2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                    <option key={n} value={n}>
                      {n} أفراد
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className="mb-1.5 block font-bold">اليوم</span>
                <input required type="date" className={inputCls} />
              </label>
              <label>
                <span className="mb-1.5 block font-bold">الساعة</span>
                <select className={inputCls} defaultValue="8">
                  {[2, 4, 6, 7, 8, 9, 10].map((h) => (
                    <option key={h} value={h}>
                      {h}:00 {h < 6 ? "عصراً" : "مساءً"}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="mt-2 rounded-full bg-[#B9461F] py-3.5 text-lg font-bold text-[#FBF6EE] transition-colors hover:bg-[#9a3a19] sm:col-span-2">
                تأكيد الحجز
              </button>
            </DemoForm>
          </Reveal>
        </section>

        {/* زورنا */}
        <section id="visit" className="scroll-mt-20 py-20">
          <Reveal className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <MapPin className="size-7 text-[#B9461F]" aria-hidden />
              <h3 className="mt-4 text-2xl font-bold">العنوان</h3>
              <p className="mt-2 text-lg leading-8 text-[#2B1D14]/70">12 شارع المثال، مدينة نصر، القاهرة</p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <Clock className="size-7 text-[#B9461F]" aria-hidden />
              <h3 className="mt-4 text-2xl font-bold">المواعيد</h3>
              <dl className="mt-2 space-y-1 text-lg text-[#2B1D14]/70">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <dt>{h.day}</dt>
                    <dd className="font-bold text-[#2B1D14]">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-3xl bg-[#5B6B3A] p-8 text-white">
              <Truck className="size-7" aria-hidden />
              <h3 className="mt-4 text-2xl font-bold">تفضّل الطعام في منزلك؟</h3>
              <p className="mt-2 text-lg leading-8 text-white/80">نوصّل طلبك حتى باب منزلك في مدينة نصر ومصر الجديدة خلال 45 دقيقة.</p>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-[#2B1D14]/10 py-8 pb-24 text-center text-[#2B1D14]/70">
        © سُفرة — مطبخ شرقي. موقع نموذجي من تصميم حلولك تيك.
      </footer>

      <DemoCTA name={NAME} />
    </div>
  );
}

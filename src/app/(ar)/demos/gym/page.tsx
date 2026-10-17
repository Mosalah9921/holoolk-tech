import type { Metadata } from "next";
import { Changa } from "next/font/google";
import { Activity, Check, Dumbbell, Flame, HeartPulse, Swords, Timer, Users, type LucideIcon } from "lucide-react";
import { DemoBanner, DemoCTA } from "@/components/demos/DemoChrome";
import { DemoForm } from "@/components/demos/DemoForm";
import { GymSchedule } from "@/components/demos/gym/Schedule";
import { Reveal } from "@/components/ui/Reveal";

/* ============================================================
   موقع نموذجي: نادي "PULSE" للياقة (نشاط وهمي)
   الألوان: أسود + أخضر ليموني نيون — طاقة وحركة
   ============================================================ */

const changa = Changa({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700", "800"], display: "swap" });

export const metadata: Metadata = {
  alternates: { canonical: "/demos/gym" },
  title: "نموذج: نادي PULSE للياقة",
  description: "موقع نموذجي لنادٍ رياضي: جدول حصص تفاعلي واشتراكات وحجز حصة مجانية. من تصميم حلولك تيك.",
};

const NAME = "نادي PULSE";
const LIME = "#C6F432";

const programs: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Dumbbell, title: "قوة وعضلات", text: "برامج تضخيم وقوة بإشراف مدرب لكل مستوى." },
  { icon: Flame, title: "حرق دهون", text: "HIIT وكارديو مكثّف بنتائج تقيسها أسبوعياً." },
  { icon: Swords, title: "فنون قتالية", text: "ملاكمة وكيك بوكسينج للياقة والدفاع عن النفس." },
  { icon: HeartPulse, title: "يوجا وبيلاتس", text: "مرونة وتوازن وتنفّس واعٍ — لعقلك قبل جسدك." },
];

const plans = [
  { name: "شهري", price: 900, per: "شهر", features: ["دخول الصالة كل يوم", "حصتان جماعيتان أسبوعياً", "قياس InBody"], featured: false },
  { name: "3 شهور", price: 2400, per: "3 شهور", features: ["دخول الصالة كل يوم", "كل الحصص الجماعية", "قياس InBody شهري", "برنامج غذائي"], featured: true },
  { name: "سنوي", price: 7900, per: "سنة", features: ["جميع مزايا اشتراك 3 شهور", "8 جلسات مدرب خاص", "تجميد الاشتراك لمدة شهرين", "دعوة صديق مجاناً"], featured: false },
];

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[#C6F432] focus:outline-none";

export default function GymDemo() {
  return (
    <div className={`${changa.className} min-h-dvh bg-[#0B0B0C] text-white [color-scheme:dark]`}>
      <DemoBanner name={NAME} />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0C]/85 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4">
          <a href="#top" dir="ltr" className="flex items-center gap-2 text-2xl font-extrabold tracking-wider">
            <Activity className="size-7" style={{ color: LIME }} aria-hidden />
            PULSE
          </a>
          <nav className="hidden gap-8 font-semibold text-white/70 md:flex" aria-label="قائمة النادي">
            <a href="#programs" className="hover:text-white">البرامج</a>
            <a href="#schedule" className="hover:text-white">جدول الحصص</a>
            <a href="#plans" className="hover:text-white">الاشتراكات</a>
          </nav>
          <a href="#trial" className="rounded-lg px-5 py-2.5 font-bold text-black transition-transform hover:scale-105" style={{ background: LIME }}>
            حصة مجانية
          </a>
        </div>
      </header>

      <main id="top">
        {/* الهيرو */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-[0.07]"
            style={{ backgroundImage: "repeating-linear-gradient(-45deg, #fff 0 2px, transparent 2px 28px)" }}
          />
          <div aria-hidden className="absolute -end-40 top-0 -z-10 size-[520px] rounded-full blur-[140px]" style={{ background: `${LIME}33` }} />
          <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
            <p dir="ltr" className="text-end text-[18vw] leading-none font-extrabold tracking-tighter text-white/[0.04] select-none sm:text-[160px]" aria-hidden>
              PULSE
            </p>
            <div className="animate-fade-up -mt-10 max-w-3xl sm:-mt-20">
              <h1 className="text-5xl leading-[1.15] font-extrabold sm:text-7xl">
                قوّتك
                <br />
                <span style={{ color: LIME }}>تبدأ من هنا.</span>
              </h1>
              <p className="mt-6 max-w-xl text-xl leading-9 text-white/70">
                صالة مجهّزة بالكامل، وأكثر من 20 حصة جماعية أسبوعياً، ومدربون معتمدون يرافقونك خطوة بخطوة حتى تبلغ هدفك.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#trial" className="rounded-lg px-8 py-4 text-lg font-bold text-black transition-transform hover:-translate-y-0.5" style={{ background: LIME }}>
                  احصل على حصتك الأولى مجاناً
                </a>
                <a href="#plans" className="rounded-lg border border-white/20 px-8 py-4 text-lg font-bold hover:bg-white/5">
                  تصفّح الاشتراكات
                </a>
              </div>
            </div>

            <ul className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4">
              {[
                { icon: Timer, n: "24/7", l: "مفتوح على مدار الساعة" },
                { icon: Users, n: "+1,200", l: "عضو نشط" },
                { icon: Dumbbell, n: "+150", l: "جهاز حديث" },
                { icon: Activity, n: "12", l: "مدرب معتمد" },
              ].map(({ icon: Icon, n, l }) => (
                <li key={l} className="bg-[#0B0B0C] p-6">
                  <Icon className="size-5" style={{ color: LIME }} aria-hidden />
                  <p dir="ltr" className="mt-3 text-end text-3xl font-extrabold">
                    {n}
                  </p>
                  <p className="text-white/60">{l}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* البرامج */}
        <section id="programs" className="scroll-mt-20 bg-[#121214] py-20">
          <Reveal className="mx-auto max-w-6xl px-4">
            <h2 className="text-4xl font-extrabold">
              اختر <span style={{ color: LIME }}>هدفك</span>
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {programs.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0C] p-7 transition-colors hover:border-[#C6F432]/60">
                  <span dir="ltr" className="absolute top-4 end-5 text-5xl font-extrabold text-white/[0.06]">
                    0{i + 1}
                  </span>
                  <Icon className="size-9 transition-transform group-hover:scale-110" style={{ color: LIME }} aria-hidden />
                  <h3 className="mt-6 text-2xl font-bold">{title}</h3>
                  <p className="mt-2 leading-7 text-white/60">{text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* الجدول */}
        <section id="schedule" className="scroll-mt-20 py-20">
          <Reveal className="mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-4xl font-extrabold">
              جدول <span style={{ color: LIME }}>الحصص</span>
            </h2>
            <GymSchedule />
          </Reveal>
        </section>

        {/* الاشتراكات */}
        <section id="plans" className="scroll-mt-20 bg-[#121214] py-20">
          <Reveal className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-4xl font-extrabold">
              اشتراك <span style={{ color: LIME }}>على مقاسك</span>
            </h2>
            <ul className="mt-12 grid items-center gap-5 md:grid-cols-3">
              {plans.map((p) => (
                <li
                  key={p.name}
                  className={
                    p.featured
                      ? "rounded-2xl p-8 text-black md:scale-105"
                      : "rounded-2xl border border-white/10 bg-[#0B0B0C] p-8"
                  }
                  style={p.featured ? { background: LIME } : undefined}
                >
                  {p.featured && <p className="mb-2 text-sm font-bold">⚡ الأوفر</p>}
                  <h3 className="text-2xl font-bold">{p.name}</h3>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold">{p.price.toLocaleString("ar-EG")}</span>
                    <span className={p.featured ? "text-black/70" : "text-white/60"}>ج.م / {p.per}</span>
                  </p>
                  <ul className="mt-6 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="size-5 shrink-0" style={p.featured ? undefined : { color: LIME }} aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#trial"
                    className={
                      p.featured
                        ? "mt-8 block rounded-lg bg-black py-3.5 text-center font-bold text-white"
                        : "mt-8 block rounded-lg border border-white/20 py-3.5 text-center font-bold hover:bg-white/5"
                    }
                  >
                    اشترك الآن
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* الحصة المجانية */}
        <section id="trial" className="scroll-mt-20 py-20 pb-28">
          <Reveal className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-4xl leading-tight font-extrabold sm:text-5xl">
              حصتك الأولى <span style={{ color: LIME }}>هدية منّا.</span>
            </h2>
            <p className="mt-4 text-lg text-white/60">سجّل بياناتك وسنتواصل معك لتحديد موعد يناسبك، دون أي التزام.</p>
            <DemoForm
              successTitle="شكراً لك! سنتواصل معك خلال ساعات"
              successClassName="mt-10 rounded-2xl border border-[#C6F432]/40 bg-[#C6F432]/10 p-10 text-[#C6F432]"
              className="mt-10 grid gap-3 text-start sm:grid-cols-[1fr_1fr_auto]"
            >
              <input required aria-label="الاسم" placeholder="الاسم" className={inputCls} />
              <input required aria-label="رقم الهاتف" type="tel" dir="ltr" placeholder="01xxxxxxxxx" className={`${inputCls} text-end`} />
              <button type="submit" className="rounded-lg px-8 py-3 font-bold text-black transition-transform hover:scale-[1.02]" style={{ background: LIME }}>
                احجز حصتك
              </button>
            </DemoForm>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 pb-24 text-center text-sm text-white/50">
        © PULSE Fitness Club. موقع نموذجي من تصميم حلولك تيك.
      </footer>

      <DemoCTA name={NAME} />
    </div>
  );
}

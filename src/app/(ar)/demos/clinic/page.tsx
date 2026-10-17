import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import {
  Baby,
  BadgeCheck,
  Clock,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import { DemoBanner, DemoCTA } from "@/components/demos/DemoChrome";
import { BookingWidget } from "@/components/demos/clinic/BookingWidget";
import { Reveal } from "@/components/ui/Reveal";

/* ============================================================
   موقع نموذجي: عيادات "نَقاء" لطب الأسنان (نشاط وهمي)
   الألوان: أبيض + تركوازي — نظيف ومريح ويوحي بالثقة
   ============================================================ */

const plex = IBM_Plex_Sans_Arabic({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  alternates: { canonical: "/demos/clinic" },
  title: "نموذج: عيادات نقاء لطب الأسنان",
  description: "موقع نموذجي لعيادة أسنان: حجز مواعيد إلكتروني وعرض الخدمات والأطباء. من تصميم حلولك تيك.",
};

const NAME = "عيادات نَقاء";

const services: { icon: LucideIcon; title: string; text: string; from: number }[] = [
  { icon: Sparkles, title: "تنظيف وتلميع", text: "إزالة الجير والتصبغات في جلسة واحدة.", from: 600 },
  { icon: Smile, title: "تبييض الأسنان", text: "تبييض بالليزر حتى 8 درجات أفتح.", from: 3500 },
  { icon: Stethoscope, title: "حشو العصب", text: "علاج الجذور بأجهزة روتاري دون ألم.", from: 1800 },
  { icon: HeartPulse, title: "تقويم الأسنان", text: "تقويم شفاف أو تقليدي بمتابعة شهرية.", from: 15000 },
  { icon: Syringe, title: "زراعة الأسنان", text: "زرعات أوروبية بضمان مكتوب.", from: 12000 },
  { icon: Baby, title: "أسنان الأطفال", text: "عيادة مخصصة للأطفال وتجربة مطمئنة.", from: 400 },
];

const doctors = [
  { name: "د. سارة منصور", role: "استشاري تقويم الأسنان", years: 14 },
  { name: "د. كريم الشاذلي", role: "أخصائي زراعة وجراحة الفم", years: 11 },
  { name: "د. منى رفعت", role: "أخصائي أسنان الأطفال", years: 9 },
];

const faq = [
  { q: "هل الكشف الأول مدفوع؟", a: "رسوم الكشف الأول 250 ج.م، وتُخصم من تكلفة العلاج عند البدء معنا." },
  { q: "هل تتعاملون مع شركات التأمين؟", a: "نعم، نتعامل مع معظم شركات التأمين الطبي. أرسل إلينا اسم شركتك لنؤكد لك التغطية." },
  { q: "هل يمكن تقسيط التقويم أو الزراعة؟", a: "نعم، يتوفر التقسيط حتى 12 شهراً دون فوائد على العلاجات الكبرى." },
];

export default function ClinicDemo() {
  return (
    <div className={`${plex.className} min-h-dvh bg-white text-slate-800`}>
      <DemoBanner name={NAME} />

      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-[#0E7490] text-white">
              <Smile className="size-6" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold text-slate-900">نَقاء</span>
              <span className="block text-xs text-slate-500">لطب وتجميل الأسنان</span>
            </span>
          </a>
          <nav className="hidden gap-7 font-medium text-slate-600 md:flex" aria-label="قائمة العيادة">
            <a href="#services" className="hover:text-[#0E7490]">الخدمات</a>
            <a href="#doctors" className="hover:text-[#0E7490]">الأطباء</a>
            <a href="#faq" className="hover:text-[#0E7490]">الأسئلة</a>
            <a href="#contact" className="hover:text-[#0E7490]">التواصل</a>
          </nav>
          <a href="#book" className="rounded-xl bg-[#0E7490] px-5 py-2.5 font-bold text-white hover:bg-[#0B5F76]">
            احجز موعداً
          </a>
        </div>
      </header>

      <main id="top">
        {/* الهيرو + الحجز */}
        <section id="book" className="relative scroll-mt-20 overflow-hidden bg-linear-to-b from-[#ECF7FA] to-white">
          <div aria-hidden className="absolute -top-24 end-[-10%] size-[480px] rounded-full bg-[#22C3B5]/15 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <div className="animate-fade-up">
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[#0E7490] shadow-sm">
                <ShieldCheck className="size-4" aria-hidden />
                تعقيم كامل بمعايير دولية
              </p>
              <h1 className="mt-6 text-4xl leading-[1.35] font-bold text-slate-900 sm:text-5xl">
                ابتسامتك…
                <br />
                <span className="text-[#0E7490]">في أيدٍ أمينة.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-9 text-slate-600">
                نخبة من الاستشاريين وأحدث أجهزة طب الأسنان، لتحصل على العلاج الذي تحتاجه دون ألم ودون انتظار.
              </p>
              <ul className="mt-8 grid max-w-lg grid-cols-3 gap-3">
                {[
                  { n: "+15", l: "سنة خبرة" },
                  { n: "+8,000", l: "مريض" },
                  { n: "3", l: "استشاريين" },
                ].map((s) => (
                  <li key={s.l} className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm">
                    <p className="text-2xl font-bold text-slate-900">{s.n}</p>
                    <p className="text-sm text-slate-500">{s.l}</p>
                  </li>
                ))}
              </ul>
            </div>
            <BookingWidget />
          </div>
        </section>

        {/* الخدمات */}
        <section id="services" className="scroll-mt-20 py-20">
          <Reveal className="mx-auto max-w-6xl px-4">
            <div className="mb-12 max-w-xl">
              <p className="font-semibold text-[#0E7490]">خدماتنا</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">رعاية متكاملة لأسنانك في مكان واحد</h2>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(({ icon: Icon, title, text, from }) => (
                <li key={title} className="group rounded-3xl border border-slate-100 bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#0E7490]/20 hover:shadow-xl hover:shadow-cyan-900/5">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-[#ECF7FA] text-[#0E7490] transition-colors group-hover:bg-[#0E7490] group-hover:text-white">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{text}</p>
                  <p className="mt-5 border-t border-slate-100 pt-4 text-sm text-slate-500">
                    يبدأ من <b className="text-lg text-slate-900">{from.toLocaleString("ar-EG")}</b> ج.م
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* الأطباء */}
        <section id="doctors" className="scroll-mt-20 bg-[#F4F9FB] py-20">
          <Reveal className="mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <p className="font-semibold text-[#0E7490]">فريقنا</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">أطباء تثق بهم</h2>
            </div>
            <ul className="grid gap-6 md:grid-cols-3">
              {doctors.map((d, i) => (
                <li key={d.name} className="overflow-hidden rounded-3xl bg-white shadow-sm">
                  <div
                    className="flex aspect-[4/3] items-end justify-center"
                    style={{ background: ["#CDEBF1", "#D6F2EE", "#E3EEF9"][i] }}
                  >
                    {/* مكان صورة الطبيب */}
                    <svg viewBox="0 0 120 100" className="h-4/5 text-[#0E7490]/25" aria-hidden>
                      <circle cx="60" cy="34" r="22" fill="currentColor" />
                      <path d="M14 100c4-26 22-40 46-40s42 14 46 40z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900">{d.name}</h3>
                    <p className="text-[#0E7490]">{d.role}</p>
                    <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
                      <BadgeCheck className="size-4 text-[#22C3B5]" aria-hidden />
                      خبرة {d.years} سنة
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* الأسئلة */}
        <section id="faq" className="scroll-mt-20 py-20">
          <Reveal className="mx-auto max-w-3xl px-4">
            <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">الأسئلة الشائعة</h2>
            <div className="space-y-3">
              {faq.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-slate-200 open:border-[#0E7490]/30 open:bg-[#F4F9FB]">
                  <summary className="flex cursor-pointer items-center justify-between p-5 font-bold text-slate-900">
                    {f.q}
                    <span className="text-2xl leading-none text-[#0E7490] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-5 pb-5 leading-8 text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </section>

        {/* التواصل */}
        <section id="contact" className="scroll-mt-20 px-4 pb-24">
          <Reveal className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-3xl bg-[#0E7490]/20 sm:grid-cols-3">
            {[
              { icon: MapPin, t: "العنوان", v: "45 شارع المثال، المعادي، القاهرة" },
              { icon: Clock, t: "المواعيد", v: "يومياً 11 ص – 9 م (ما عدا الجمعة)" },
              { icon: Phone, t: "للحجز والاستفسار", v: "0100 000 0000", ltr: true },
            ].map(({ icon: Icon, t, v, ltr }) => (
              <div key={t} className="bg-[#0E7490] p-8 text-white">
                <Icon className="size-6 text-[#7FE3D8]" aria-hidden />
                <p className="mt-4 text-sm text-white/70">{t}</p>
                <p className="mt-1 text-lg font-bold" dir={ltr ? "ltr" : undefined}>
                  {v}
                </p>
              </div>
            ))}
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-8 pb-24 text-center text-sm text-slate-500">
        © عيادات نَقاء. موقع نموذجي من تصميم حلولك تيك.
      </footer>

      <DemoCTA name={NAME} />
    </div>
  );
}

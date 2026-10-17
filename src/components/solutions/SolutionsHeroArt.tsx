import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { solutions } from "@/content/solutions";
import { lp, type Locale } from "@/i18n";

/** أسماء مختصرة للمربعات */
const labelsEn: Record<string, string> = {
  restaurants: "Restaurants",
  travel: "Travel",
  beauty: "Beauty",
  clinics: "Clinics",
  education: "Education",
  fitness: "Fitness",
  stores: "Retail",
  "real-estate": "Real estate",
  logistics: "Logistics",
  companies: "Companies",
  events: "Events",
};
const labels: Record<string, string> = {
  restaurants: "المطاعم",
  travel: "السياحة",
  beauty: "التجميل",
  clinics: "العيادات",
  education: "التعليم",
  fitness: "اللياقة",
  stores: "المتاجر",
  "real-estate": "العقارات",
  logistics: "الشحن",
  companies: "الشركات",
  events: "الفعاليات",
};
const delays = ["0s", "-1.6s", "-3.2s", "-4.8s", "-0.8s", "-2.4s", "-4s", "-5.6s", "-1.2s", "-2.8s", "-4.4s", "-6s"];

/** هيرو صفحة الحلول: شبكة عائمة (4 × 3) من بطاقات زجاجية بأيقونات ثلاثية الأبعاد لكل مجال + بطاقة «مجالك؟» */
export function SolutionsHeroArt({ locale = "ar" }: { locale?: Locale }) {
  const L = locale === "en" ? labelsEn : labels;
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div aria-hidden className="absolute inset-[-12%] -z-10 bg-[radial-gradient(closest-side,rgb(85_131_186/0.32),rgb(163_191_224/0.15)_60%,transparent)]" />
      <ul className="grid grid-cols-4 gap-2 sm:gap-3">
        {solutions.map((s, i) => (
          <li key={s.id} className={`sm:motion-safe:animate-[drift_7s_ease-in-out_infinite] ${i % 2 === 1 ? "mt-3 sm:mt-5" : ""}`} style={{ animationDelay: delays[i] }}>
            <Link
              href={lp(locale, `/solutions/${s.id}`)}
              className="group relative flex flex-col items-center rounded-2xl border border-white/80 bg-white/90 sm:bg-white/65 p-1.5 pb-2 text-center shadow-[0_14px_36px_-18px_rgb(16_39_74/0.35)] ring-1 ring-slate-900/5 sm:backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/90 hover:shadow-[0_24px_44px_-20px_rgb(16_39_74/0.45)] focus-visible:-translate-y-1.5 sm:rounded-3xl sm:p-2 sm:pb-3"
            >
              <span aria-hidden className="absolute inset-x-4 top-2 aspect-square rounded-full bg-accent-400/0 blur-2xl transition-colors duration-500 group-hover:bg-accent-400/35" />
              <Image
                src={s.image}
                alt=""
                width={640}
                height={640}
                sizes="(min-width: 1024px) 130px, 22vw"
                className="relative aspect-square w-full object-contain drop-shadow-[0_8px_12px_rgb(16_39_74/0.16)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
              />
              <span className="relative text-[11px] leading-4 font-bold text-slate-800 sm:text-xs sm:leading-5">{L[s.id] ?? s.name}</span>
            </Link>
          </li>
        ))}
        <li className="mt-3 sm:motion-safe:animate-[drift_7s_ease-in-out_infinite] sm:mt-5" style={{ animationDelay: delays[11] }}>
          <Link
            href={lp(locale, "/start")}
            className="group flex h-full flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-brand-200 bg-white/40 p-2 text-center sm:backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-400 hover:bg-white/80 sm:gap-2 sm:rounded-3xl"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-transform duration-500 group-hover:rotate-90 sm:size-12 sm:rounded-2xl">
              <Plus className="size-5 sm:size-6" aria-hidden />
            </span>
            <span className="text-[11px] leading-4 font-bold text-brand-700 sm:text-xs sm:leading-5">{locale === "en" ? "Your industry?" : "مجالك؟"}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

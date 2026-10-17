import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/content/services";
import { lp, type Locale } from "@/i18n";

/** ترتيب ظهور الخدمات في الشبكة (2 × 3) */
const order = ["web-development", "e-commerce", "ui-ux-design", "landing-pages", "web-apps", "maintenance-support"];
/** توقيتات طفو متفاوتة حتى لا تتحرك البطاقات معاً */
const delays = ["0s", "-1.8s", "-3.6s", "-2.7s", "-0.9s", "-4.5s"];

/**
 * هيرو صفحة الخدمات: شبكة عائمة من 6 بطاقات زجاجية بأيقونات ثلاثية الأبعاد.
 * كل بطاقة تطفو بتوقيت مختلف، وعند المرور ترتفع الأيقونة مع توهج وظل ناعم.
 */
export function ServicesHeroArt({ locale = "ar" }: { locale?: Locale }) {
  const services = getServices(locale);
  const list = order.map((id) => services.find((s) => s.id === id)!).filter(Boolean);

  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      {/* توهج شعاعي خلف الشبكة */}
      <div aria-hidden className="absolute inset-[-12%] -z-10 bg-[radial-gradient(closest-side,rgb(85_131_186/0.32),rgb(163_191_224/0.16)_60%,transparent)]" />

      <ul className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {list.map((s, i) => (
          <li
            key={s.id}
            className={`sm:motion-safe:animate-[drift_7s_ease-in-out_infinite] ${i % 3 === 1 ? "mt-4 sm:mt-6" : ""}`}
            style={{ animationDelay: delays[i] }}
          >
            <Link
              href={lp(locale, `/services/${s.id}`)}
              className="group relative flex flex-col items-center rounded-2xl border border-white/80 bg-white/90 sm:bg-white/60 p-2 pb-2.5 sm:rounded-3xl sm:p-3 sm:pb-3.5 text-center shadow-[0_14px_36px_-18px_rgb(16_39_74/0.35)] ring-1 ring-slate-900/5 sm:backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/85 hover:shadow-[0_28px_50px_-20px_rgb(16_39_74/0.45)] focus-visible:-translate-y-2"
            >
              {/* توهج يظهر خلف الأيقونة عند المرور */}
              <span
                aria-hidden
                className="absolute inset-x-6 top-3 aspect-square rounded-full bg-accent-400/0 blur-2xl transition-colors duration-500 group-hover:bg-accent-400/35"
              />
              <Image
                src={s.image}
                alt=""
                width={640}
                height={640}
                sizes="(min-width: 1024px) 170px, 30vw"
                priority={i < 3}
                className="relative aspect-[5/4] w-full object-contain drop-shadow-[0_10px_14px_rgb(16_39_74/0.18)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110"
              />
              <span className="relative mt-1 text-[11px] leading-4 font-bold text-slate-800 sm:mt-1.5 sm:text-xs sm:leading-5">{s.short}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

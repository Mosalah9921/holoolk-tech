import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type HeroCard = { icon: LucideIcon; title: string; text: string };

/** أماكن البطاقات العائمة حول المجسم (الأولى أعلى البداية، الثانية منتصف النهاية، الثالثة أسفل البداية) */
const slots = [
  "top-[6%] start-0 sm:-start-4",
  "top-[42%] end-0 sm:-end-6",
  "bottom-[4%] start-[6%] sm:start-0",
];
const delays = ["-1s", "-3.5s", "-5.5s"];

/**
 * هيرو الصفحات الداخلية: مجسم ثلاثي الأبعاد عائم + بطاقات زجاجية بمعلومات حقيقية من الصفحة.
 * - image: صورة ثلاثية الأبعاد (WebP شفافة). بدونها يظهر شعار HT الزجاجي مع مدارات متحركة.
 * - الحركة CSS فقط وتتوقف مع «تقليل الحركة».
 */
export function HeroVisual({ image, cards, className }: { image?: string; cards: HeroCard[]; className?: string }) {
  return (
    <div aria-hidden className={cn("relative mx-auto mt-0 w-full max-w-[270px] sm:max-w-[380px] lg:max-w-[460px]", className)}>
      <div className="relative aspect-square">
        {/* توهج + ظل أرضي */}
        <div className="absolute inset-[-8%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(85_131_186/0.34),rgb(163_191_224/0.16)_60%,transparent)]" />
        <div className="absolute inset-x-[18%] bottom-[8%] -z-10 h-[10%] rounded-[50%] bg-brand-800/15 blur-xl" />

        {image ? (
          <Image
            src={image}
            alt=""
            width={640}
            height={640}
            sizes="(min-width: 1024px) 440px, (min-width: 640px) 380px, 290px"
            priority
            className="absolute inset-[6%] size-[88%] object-contain drop-shadow-[0_24px_30px_rgb(16_39_74/0.22)] motion-safe:animate-[drift_7s_ease-in-out_infinite]"
          />
        ) : (
          <BrandEmblem />
        )}

        {/* بطاقات زجاجية عائمة */}
        {cards.slice(0, 3).map(({ icon: Icon, title, text }, i) => (
          <div
            key={title}
            className={cn("absolute z-10 motion-safe:animate-[drift_8s_ease-in-out_infinite]", slots[i])}
            style={{ animationDelay: delays[i] }}
          >
            <div className="flex max-w-[11.5rem] items-center gap-2.5 rounded-2xl border border-white/80 bg-white/90 sm:bg-white/75 p-2.5 pe-3.5 shadow-[0_16px_36px_-16px_rgb(16_39_74/0.35)] ring-1 ring-slate-900/5 sm:backdrop-blur-xl sm:max-w-[13.5rem] sm:p-3 sm:pe-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-600 to-accent-500 text-white shadow-md shadow-brand-600/25 sm:size-10">
                <Icon className="size-4 sm:size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs leading-5 font-black text-slate-900 sm:text-sm">{title}</span>
                <span className="block text-[11px] leading-4 text-slate-500 sm:text-xs sm:leading-5">{text}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** شعار HT داخل بلاطة زجاجية، تحيط به مدارات تدور ببطء */
function BrandEmblem() {
  return (
    <div className="absolute inset-0 flex items-center justify-center [perspective:900px]">
      {/* مدارات مائلة */}
      <div className="absolute inset-[8%] [transform:rotateX(68deg)]">
        <div className="absolute inset-0 rounded-full border-2 border-brand-200/70 motion-safe:animate-[orbit_22s_linear_infinite]">
          <span className="absolute top-1/2 -start-2 size-4 -translate-y-1/2 rounded-full bg-accent-400 shadow-[0_0_16px_4px_rgb(119_159_205/0.6)]" />
        </div>
        <div className="absolute inset-[14%] rounded-full border border-dashed border-brand-300/60 motion-safe:animate-[orbit_30s_linear_infinite_reverse]">
          <span className="absolute -top-1.5 start-1/2 size-3 rounded-full bg-brand-500 shadow-[0_0_12px_3px_rgb(60_98_151/0.5)]" />
        </div>
      </div>

      {/* البلاطة الزجاجية */}
      <div className="relative w-[46%] motion-safe:animate-[drift_7s_ease-in-out_infinite]">
        <div className="relative aspect-square rotate-[-8deg] rounded-[28%] border border-white/90 bg-linear-to-br from-white/90 via-white/60 to-brand-100/60 shadow-[0_30px_60px_-24px_rgb(16_39_74/0.5),inset_0_2px_0_rgb(255_255_255/0.9)] ring-1 ring-brand-900/5 backdrop-blur-xl">
          <span className="absolute inset-x-[12%] top-[6%] h-[30%] rounded-full bg-linear-to-b from-white/80 to-transparent" />
          <Image src="/brand/mark-en.png" alt="" width={256} height={256} sizes="200px" className="absolute inset-[20%] size-[60%] rotate-[8deg] object-contain drop-shadow-[0_8px_10px_rgb(16_39_74/0.25)]" />
        </div>
        {/* انعكاس أرضي */}
        <div className="mx-auto mt-[12%] h-3 w-[70%] rounded-[50%] bg-brand-800/20 blur-md" />
      </div>
    </div>
  );
}

/**
 * صور الهيرو ثلاثية الأبعاد لكل صفحة: ضع الصورة في public/images/pages/<page>.webp ثم اكتب مسارها هنا.
 * الصفحة التي ليس لها صورة يظهر فيها شعار HT الزجاجي.
 */
export const heroImages: Partial<Record<"work" | "about" | "pricing" | "process" | "blog" | "faq", string>> = {
  work: "/images/pages/work.webp",
  about: "/images/pages/about-crystal.webp",
  pricing: "/images/pages/pricing-blocks.webp",
  process: "/images/pages/process.webp",
  blog: "/images/pages/blog.webp",
  faq: "/images/pages/faq.webp",
};

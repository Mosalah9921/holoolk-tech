import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/** رمز الشعار الموحّد «HT» — نفس الرمز في العربي والإنجليزي */
export function LogoMark({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Image
      src={light ? "/brand/mark-en-light.png" : "/brand/mark-en.png"}
      alt=""
      width={260}
      height={256}
      priority
      className={cn("size-10 object-contain", className)}
    />
  );
}

/**
 * الشعار الكامل.
 * ar: رمز HT + «حلولك تيك» (الأساسي في الموقع)
 * en: رمز HT + الاسم بالإنجليزية
 */
/** light: نسخة للخلفيات الداكنة */
export function Logo({
  className,
  variant = "ar",
  href = "/",
  label,
  light = false,
}: {
  className?: string;
  variant?: "ar" | "en";
  href?: string;
  label?: string;
  light?: boolean;
}) {
  const en = variant === "en";
  return (
    <a
      href={href}
      dir={en ? "ltr" : undefined}
      className={cn("group inline-flex items-center gap-2.5", className)}
      title={label}
    >
      <LogoMark light={light} className="transition-transform duration-300 group-hover:scale-105" />
      <span className="flex flex-col items-start leading-none">
        <Image
          src={`/brand/wordmark-${en ? "en" : "ar"}${light ? "-light" : ""}.png`}
          alt={en ? siteConfig.nameEn : siteConfig.name}
          width={en ? 578 : light ? 551 : 534}
          height={128}
          priority
          className={cn("w-auto", en ? "h-7" : "h-6")}
        />
        {!en && (
          <span dir="ltr" className={cn("mt-1 text-[9px] font-bold tracking-[0.3em] uppercase", light ? "text-white/60" : "text-[#1E3A63]/70")}>
            {siteConfig.nameEn}
          </span>
        )}
      </span>
    </a>
  );
}

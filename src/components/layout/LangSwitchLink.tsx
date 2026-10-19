"use client";

import { usePathname } from "next/navigation";
import { switchLocalePath } from "@/i18n";

/** رابط تبديل اللغة في الفوتر — بيفتح نفس الصفحة باللغة التانية (مش الرئيسية) */
export function LangSwitchLink({ className }: { className?: string }) {
  const other = switchLocalePath(usePathname() ?? "/");
  const toAr = other.locale === "ar";
  return (
    <a href={other.href} hrefLang={other.locale} lang={other.locale} className={className}>
      {toAr ? "العربية" : "English"}
    </a>
  );
}

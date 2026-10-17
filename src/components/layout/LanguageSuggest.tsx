"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Languages, X } from "lucide-react";
import { switchLocalePath, type Locale } from "@/i18n";

const KEY = "holoolk-lang-suggest-dismissed";

/**
 * اقتراح لطيف للغة التانية: لو لغة المتصفح إنجليزي والزائر على صفحة عربية (أو العكس)،
 * يظهر شريط صغير أسفل الشاشة بزرار للنسخة المقابلة لنفس الصفحة. بيختفي للأبد لما يتقفل.
 */
export function LanguageSuggest({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return;
      const langs = (navigator.languages?.length ? navigator.languages : [navigator.language]).map((l) => l.toLowerCase());
      const prefersAr = langs[0]?.startsWith("ar");
      const knowsAr = langs.some((l) => l.startsWith("ar"));
      const wantsOther = locale === "ar" ? !knowsAr && langs[0]?.startsWith("en") : prefersAr;
      if (!wantsOther) return;
      const id = window.setTimeout(() => setShow(true), 1800);
      return () => window.clearTimeout(id);
    } catch {
      /* التخزين مقفول — منظهرش حاجة */
    }
  }, [locale]);

  if (!show) return null;
  const target = switchLocalePath(pathname);
  const toEn = target.locale === "en";
  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* تجاهل */
    }
  };

  return (
    <div
      role="region"
      aria-label={toEn ? "Language suggestion" : "اقتراح اللغة"}
      lang={toEn ? "en" : "ar"}
      dir={toEn ? "ltr" : "rtl"}
      className={`fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-40 mx-auto flex max-w-md sm:inset-x-auto sm:mx-0 ${locale === "ar" ? "sm:right-6" : "sm:left-6"} animate-[step-in_0.4s_cubic-bezier(0.22,1,0.36,1)_both] items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-2xl shadow-slate-900/15 backdrop-blur sm:bottom-6`}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Languages className="size-5" aria-hidden />
      </span>
      <p className="min-w-0 flex-1 text-sm leading-6 font-semibold text-slate-800">{toEn ? "This page is also available in English." : "هذه الصفحة متاحة أيضاً بالعربية."}</p>
      <a href={target.href} hrefLang={target.locale} onClick={dismiss} className="shrink-0 rounded-xl bg-brand-600 px-3.5 py-2 text-sm font-bold text-white hover:bg-brand-700">
        {toEn ? "View in English" : "عرض بالعربية"}
      </a>
      <button type="button" onClick={dismiss} aria-label={toEn ? "Dismiss" : "إغلاق"} className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700">
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}

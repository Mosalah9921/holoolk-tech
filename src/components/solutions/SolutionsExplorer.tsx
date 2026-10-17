"use client";

import { useMemo, useState } from "react";
import { Search, SearchX, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SolutionFinderButton } from "@/components/finder/SolutionFinderButton";
import { tr, type Locale } from "@/i18n";

export type ExplorerItem = {
  id: string;
  group: string;
  /** نص البحث (الاسم + الوصف + الفوائد) */
  text: string;
  /** البطاقة مرسومة على الخادم */
  card: React.ReactNode;
};

/** توحيد الحروف العربية للبحث: الهمزات، التاء المربوطة، الألف المقصورة، التشكيل */
function normalize(s: string) {
  return s
    .replace(/[ً-ْـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .toLowerCase()
    .trim();
}

/** تبويبات فلترة ثابتة أعلى الشاشة + بحث فوري، والبطاقات تظهر بحركة ناعمة */
export function SolutionsExplorer({ groups, items, locale = "ar" }: { groups: { id: string; label: string }[]; items: ExplorerItem[]; locale?: Locale }) {
  const t = tr(locale);
  const [group, setGroup] = useState("all");
  const [query, setQuery] = useState("");

  const q = normalize(query);
  const visible = useMemo(
    () => {
      const words = q.split(/\s+/).filter(Boolean);
      return items.filter((it) => {
        if (group !== "all" && it.group !== group) return false;
        const text = normalize(it.text);
        return words.every((w) => text.includes(w));
      });
    },
    [items, group, q],
  );
  const count = (g: string) => (g === "all" ? items.length : items.filter((it) => it.group === g).length);
  const tabs = [{ id: "all", label: t("كل المجالات", "All industries") }, ...groups];

  return (
    <div>
      <h2 className="sr-only">{t("المجالات التي نخدمها", "Industries we serve")}</h2>
      {/* شريط الفلترة — يثبت أسفل الهيدر أثناء التصفح */}
      <div className="sticky top-[5.25rem] z-30 -mx-4 mb-8 px-4 sm:top-24 sm:mx-0 sm:px-0">
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/85 p-2 shadow-[0_8px_30px_-12px_rgb(16_39_74/0.18)] backdrop-blur-xl lg:flex-row lg:items-center">
          <div role="group" aria-label={t("تصفية حسب القطاع", "Filter by industry")} className="-mb-1 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] lg:mb-0 lg:flex-1 lg:pb-0">
            {tabs.map((tab) => {
              const active = group === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setGroup(tab.id)}
                  className={cn(
                    "inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-bold transition-all duration-200",
                    active ? "bg-brand-600 text-white shadow-md shadow-brand-600/25" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  )}
                >
                  {tab.label}
                  <span className={cn("rounded-md px-1.5 text-[11px] tabular-nums", active ? "bg-white/20" : "bg-slate-100 text-slate-500")}>{count(tab.id)}</span>
                </button>
              );
            })}
          </div>
          <label className="relative block lg:w-64">
            <span className="sr-only">{t("ابحث عن مجالك", "Search for your industry")}</span>
            <Search className="pointer-events-none absolute inset-y-0 start-3 my-auto size-4 text-slate-400" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("ابحث عن مجالك… مثل: عيادة", "Search your industry… e.g. clinic")}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 ps-9 pe-9 text-sm text-slate-900 transition-colors outline-none placeholder:text-slate-400 focus:border-brand-300 focus:bg-white focus:ring-4 focus:ring-brand-100 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label={t("مسح البحث", "Clear search")} className="absolute inset-y-0 end-2 my-auto flex size-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                <X className="size-4" aria-hidden />
              </button>
            )}
          </label>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {t("مجال", visible.length === 1 ? "industry" : "industries")}
      </p>

      {visible.length > 0 ? (
        <ul key={`${group}|${q}`} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((it, i) => (
            <li key={it.id} className="animate-[step-in_0.45s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}>
              {it.card}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <SearchX className="size-7" aria-hidden />
          </span>
          <p className="mt-4 text-lg font-black text-slate-900">{t("لم نجد مجالاً بهذا الاسم", "No industry matches your search")}</p>
          <p className="mt-1.5 max-w-md text-sm leading-7 text-slate-600">{t("لا مشكلة، نبني حلولاً لأي نشاط. دع المستشار الذكي يقترح عليك الحل المناسب في أقل من دقيقة.", "No problem — we build solutions for any business. Let our smart advisor suggest the right fit in under a minute.")}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <SolutionFinderButton locale={locale} />
            <button type="button" onClick={() => { setQuery(""); setGroup("all"); }} className="h-13 rounded-xl px-6 font-bold text-brand-700 hover:bg-brand-50">
              {t("عرض كل المجالات", "Show all industries")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

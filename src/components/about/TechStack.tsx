"use client";

import { useState } from "react";
import { getTracks } from "@/content/stack";
import { tr, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * التقنيات حسب المسار — كل المسارات ظاهرة كشبكة أزرار (من غير سحب أفقي على الموبايل)،
 * واللوحة تحتها بعرض كامل فمفيش مساحات فاضية على الكمبيوتر.
 */
export function TechStack({ locale = "ar" }: { locale?: Locale }) {
  const tl = tr(locale);
  const tracks = getTracks(locale);
  const [active, setActive] = useState(tracks[0].id);
  const track = tracks.find((t) => t.id === active)!;
  const total = tracks.reduce((n, t) => n + t.tech.length, 0);
  const TrackIcon = track.icon;

  // في العربي الوصف بيبدأ بالاسم الإنجليزي للمسار ("Frontend — …") — بنفصله كشارة عشان النص ميتلخبطش
  const [label, desc] = track.text.includes(" — ") ? track.text.split(" — ") : [undefined, track.text];
  const core = track.tech.filter((t) => t.core);
  const extra = track.tech.filter((t) => !t.core);

  return (
    <div>
      <div role="tablist" aria-label={tl("مسارات التقنية", "Technology tracks")} className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        {tracks.map(({ id, icon: Icon, title, tech }) => {
          const on = id === active;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={on}
              aria-controls="stack-panel"
              onClick={() => {
                setActive(id);
                // على الموبايل والتابلت اللوحة تحت الأزرار: ننزل لها بهدوء لو مش ظاهرة
                const panel = document.getElementById("stack-panel");
                if (panel && window.innerWidth < 1024 && panel.getBoundingClientRect().top > window.innerHeight * 0.6) {
                  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                  panel.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
                }
              }}
              className={cn(
                "group flex min-w-0 flex-col items-start gap-2.5 rounded-2xl border p-3.5 text-start transition-all duration-200 sm:flex-row sm:items-center sm:gap-3",
                on
                  ? "border-brand-700 bg-brand-700 text-white shadow-lg shadow-brand-700/20"
                  : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md hover:shadow-slate-900/5",
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                  on ? "bg-white/15 text-white" : "bg-brand-50 text-brand-600 group-hover:bg-brand-100",
                )}
              >
                <Icon className="size-[1.125rem]" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.8125rem] leading-5 font-bold sm:text-sm">{title}</span>
                <span className={cn("block text-[11px] leading-4 tabular-nums", on ? "text-white/70" : "text-slate-500")}>
                  {tl(`${tech.length} ${tech.length <= 10 ? "تقنيات" : "تقنية"}`, `${tech.length} tools`)}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="stack-panel"
        role="tabpanel"
        aria-labelledby={`tab-${track.id}`}
        className="mt-4 min-w-0 scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white sm:mt-5"
      >
        <div key={track.id} className="animate-fade-up grid [animation-duration:350ms] lg:grid-cols-[17rem_1fr]">
          {/* تعريف المسار */}
          <div className="border-b border-slate-100 bg-slate-50/70 p-6 sm:p-8 lg:border-e lg:border-b-0">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand-600 to-brand-800 text-white shadow-lg shadow-brand-600/25">
              <TrackIcon className="size-6" aria-hidden />
            </span>
            {label && (
              <span dir="ltr" className="mt-5 inline-block rounded-md bg-white px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wide text-brand-700 ring-1 ring-brand-100">
                {label}
              </span>
            )}
            <h3 className={cn("text-xl font-black sm:text-2xl", label ? "mt-2" : "mt-5")}>{track.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">{desc}</p>
          </div>

          {/* التقنيات */}
          <div className="p-6 sm:p-8">
            <p className="text-xs font-bold tracking-wide text-slate-500">{tl("الأساسية في مشاريعنا", "Core in our projects")}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {core.map((t) => (
                <li key={t.name} dir="ltr" className="flex items-center gap-2 rounded-xl bg-brand-800 px-3.5 py-2 text-sm font-semibold text-white shadow-sm">
                  <span className="size-1.5 rounded-full bg-accent-300" aria-hidden />
                  {t.name}
                </li>
              ))}
            </ul>
            {extra.length > 0 && (
              <>
                <p className="mt-6 text-xs font-bold tracking-wide text-slate-500">{tl("حسب احتياج المشروع", "When the project calls for it")}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {extra.map((t) => (
                    <li key={t.name} dir="ltr" className="rounded-xl bg-slate-50 px-3.5 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                      {t.name}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-slate-500">
        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 font-black text-brand-700 tabular-nums">{total}</span>
        {tl(`تقنية في ${tracks.length} مسارات؛ نختار منها ما يناسب مشروعك، لا ما يناسبنا.`, `technologies across ${tracks.length} tracks. We pick what suits your project, not what suits us.`)}
      </p>
    </div>
  );
}

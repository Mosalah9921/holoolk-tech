"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Check, Clock } from "lucide-react";
import { getSteps } from "@/content/process";
import { lp, tr, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

/**
 * منهجية العمل كخط زمني تفاعلي:
 * - الكمبيوتر: مسار أفقي مترابط، الضغط (أو المرور) على أي مرحلة يملأ الخط حتى المرحلة ويعرض تفاصيلها.
 * - الموبايل: خط زمني رأسي يعرض كل المراحل بتفاصيلها.
 */
export function Process({ className = "bg-white", withCta = true, locale = "ar" }: { className?: string; withCta?: boolean; locale?: Locale }) {
  const t = tr(locale);
  const steps = getSteps(locale);
  const [active, setActive] = useState(0);
  const total = steps.length;
  const current = steps[active];

  return (
    <Section id="process" aria-labelledby="process-title" className={className}>
      <SectionHeading
        id="process-title"
        align="center"
        title={t("من الفكرة حتى الانطلاق، خطوة بخطوة", "From idea to launch, step by step")}
        description={t("تعرف في كل مرحلة ما نعمل عليه وما ستستلمه، ولا ننتقل لخطوة جديدة قبل اعتمادك.", "At every stage you know what we're working on and what you'll receive, and we never move on without your approval.")}
      />

      {/* ===== الكمبيوتر: مسار أفقي ===== */}
      <div className="hidden md:block">
        <div className="relative">
          {/* الخط الأساسي + الجزء الممتلئ */}
          <div aria-hidden className="absolute inset-x-[10%] top-7 h-1 rounded-full bg-slate-200" />
          <div
            aria-hidden
            className="absolute start-[10%] top-7 h-1 rounded-full bg-linear-to-l from-brand-600 to-accent-500 transition-[width] duration-700 ease-out"
            style={{ width: `${(active / (total - 1)) * 80}%` }}
          />
          <ol role="tablist" aria-label={t("مراحل العمل", "Project stages")} className="relative grid" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
            {steps.map(({ icon: Icon, title, duration }, i) => {
              const done = i < active;
              const isActive = i === active;
              return (
                <li key={title} className="flex justify-center">
                  <button
                    type="button"
                    role="tab"
                    id={`step-tab-${i}`}
                    aria-selected={isActive}
                    aria-controls="step-panel"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex flex-col items-center text-center"
                  >
                    <span
                      className={cn(
                        "relative flex size-14 items-center justify-center rounded-2xl border-2 transition-all duration-300",
                        isActive && "scale-110 border-brand-600 bg-brand-600 text-white shadow-xl shadow-brand-600/30",
                        done && "border-brand-600 bg-white text-brand-600",
                        !isActive && !done && "border-slate-200 bg-white text-slate-400 group-hover:border-brand-200 group-hover:text-brand-600",
                      )}
                    >
                      {done ? <Check className="size-6" aria-hidden /> : <Icon className="size-6" aria-hidden />}
                      {isActive && <span aria-hidden className="absolute inset-0 -z-10 rounded-2xl bg-brand-600/40 motion-safe:animate-ping [animation-duration:2s]" />}
                    </span>
                    <span className="mt-4 text-[11px] font-bold text-slate-500 tabular-nums">{t(`المرحلة ${i + 1}`, `Stage ${i + 1}`)}</span>
                    <span className={cn("mt-1 text-sm font-bold transition-colors", isActive ? "text-slate-900" : "text-slate-600")}>{title}</span>
                    <span className="mt-1 text-xs text-slate-500">{duration}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* تفاصيل المرحلة المختارة */}
        <div
          id="step-panel"
          role="tabpanel"
          aria-labelledby={`step-tab-${active}`}
          key={active}
          className="mx-auto mt-10 grid max-w-4xl gap-6 rounded-3xl border border-brand-100 bg-linear-to-b from-brand-50/70 to-white p-7 animate-[step-in_0.4s_cubic-bezier(0.22,1,0.36,1)_both] md:grid-cols-[1.2fr_1fr] md:p-8"
        >
          <div>
            <p className="text-xs font-bold text-accent-600">
              {t(`المرحلة ${active + 1} من ${total}`, `Stage ${active + 1} of ${total}`)}
            </p>
            <h3 className="mt-1.5 text-xl font-black text-slate-900">{current.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{current.description}</p>
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
              <Clock className="size-3.5 text-brand-600" aria-hidden />
              {t("المدة:", "Duration:")} {current.duration}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <p className="text-sm font-bold text-slate-900">{t("ما ستستلمه", "What you'll receive")}</p>
            <ul className="mt-3 space-y-2.5">
              {current.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ===== الموبايل: خط زمني رأسي ===== */}
      <ol className="relative space-y-6 md:hidden">
        <span aria-hidden className="absolute start-7 top-2 bottom-2 w-0.5 bg-linear-to-b from-brand-600 via-accent-500 to-slate-200" />
        {steps.map(({ icon: Icon, title, description, duration, deliverables }, i) => (
          <li key={title} className="relative flex gap-4">
            <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl border-2 border-brand-600 bg-white text-brand-600">
              <Icon className="size-6" aria-hidden />
            </span>
            <div className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-[11px] font-bold text-slate-500">
                {t(`المرحلة ${i + 1}`, `Stage ${i + 1}`)} · {duration}
              </p>
              <h3 className="mt-1 font-bold text-slate-900">{title}</h3>
              <p className="mt-1.5 text-sm leading-7 text-slate-600">{description}</p>
              <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-xs leading-6 text-slate-700">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-500" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      {withCta && (
        <div className="relative isolate mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-l from-slate-50 to-white px-6 py-7 shadow-[0_4px_20px_-2px_rgb(0_0_0/0.05)] sm:px-8">
          <span aria-hidden className="absolute -top-20 -start-20 -z-10 size-56 rounded-full bg-brand-100/50 blur-3xl" />
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:gap-7 md:text-start">
            <Image
              src="/images/services/planning.webp"
              alt=""
              width={480}
              height={480}
              sizes="128px"
              className="size-28 shrink-0 object-contain drop-shadow-[0_10px_14px_rgb(16_39_74/0.18)] sm:size-32"
            />
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
                {t("خطوة مجانية · جلسة استكشافية", "Free first step · Discovery session")}
              </span>
              <h3 className="mt-3 text-xl leading-8 font-bold text-slate-900">{t("ابدأ بتخطيط مدروس لمشروعك", "Start with a well-planned project")}</h3>
              <p className="mt-1.5 text-sm leading-7 text-[#64748B]">
                {t(
                  "استشارة تقنية مجانية لتحديد نطاق العمل، واقتراح أفضل الحلول البرمجية المناسبة لحجم نشاطك وميزانيتك.",
                  "A free technical consultation to define your scope and recommend the best solution for your business size and budget.",
                )}
              </p>
            </div>
            <ButtonLink href={lp(locale, "/book")} size="lg" className="group w-full shrink-0 shadow-lg shadow-brand-600/20 hover:bg-brand-700 md:w-auto">
              {t("ابدأ بمناقشة مشروعك", "Let's discuss your project")}
              <ArrowLeft className="size-5 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      )}
    </Section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarCheck, Check, Clock, Lightbulb, MessageCircleMore, RotateCcw, Sparkles, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn, whatsappLink } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { getFinderSteps, recommend, whatsappSummary, type Answers } from "@/content/solution-finder";
import { lp, tr, type Locale } from "@/i18n";

/** نافذة «المستشار الذكي»: 3 أسئلة باختيارات سريعة ← توصية + واتساب بملخص الإجابات */
export function SolutionFinder({ open, onClose, locale = "ar" }: { open: boolean; onClose: () => void; locale?: Locale }) {
  const t = tr(locale);
  const finderSteps = getFinderSteps(locale);
  const ref = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const total = finderSteps.length;
  const done = step >= total;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // منع تمرير الصفحة خلف النافذة
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const advancing = useRef(false);
  const choose = (id: string) => {
    if (advancing.current) return;
    advancing.current = true;
    const s = finderSteps[step];
    setAnswers((a) => ({ ...a, [s.id]: id }));
    // تقدّم تلقائي بعد لمسة قصيرة لتأكيد الاختيار بصرياً
    window.setTimeout(() => {
      setStep((n) => n + 1);
      advancing.current = false;
    }, 180);
  };

  const rec = done ? recommend(answers, locale) : null;
  const current = finderSteps[step];

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="finder-title"
      className="fixed inset-x-0 top-auto bottom-0 m-0 max-h-[92dvh] w-full max-w-none overflow-hidden rounded-t-[1.75rem] bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm open:animate-[sheet-in_0.4s_cubic-bezier(0.22,1,0.36,1)] sm:inset-0 sm:m-auto sm:h-fit sm:max-h-[88dvh] sm:max-w-2xl sm:rounded-[1.75rem]"
    >
      <div className="flex max-h-[inherit] flex-col">
        {/* الرأس */}
        <div className="relative isolate overflow-hidden bg-linear-to-br from-brand-700 to-brand-800 px-5 pt-5 pb-6 text-white sm:px-7 sm:pt-6">
          <span aria-hidden className="absolute -top-16 -end-16 -z-10 size-48 rounded-full border-[28px] border-white/[0.06]" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-1.5 text-xs font-bold text-accent-200">
                <Sparkles className="size-3.5" aria-hidden />
                {t("المستشار الذكي", "Smart advisor")}
              </p>
              <h2 id="finder-title" className="mt-1.5 text-lg leading-7 font-black text-white sm:text-xl">
                {done ? t("توصيتنا لنشاطك", "Our recommendation for you") : t("اكتشف الحل الأنسب لنشاطك", "Find the right solution for your business")}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("إغلاق", "Close")}
              className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 transition-colors hover:bg-white/20"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          {/* شريط التقدم */}
          <div className="mt-5 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={Math.min(step, total)} aria-label={t("التقدم", "Progress")}>
              <div className="h-full rounded-full bg-white transition-[width] duration-500 ease-out" style={{ width: `${(Math.min(step, total) / total) * 100}%` }} />
            </div>
            <span className="text-xs font-bold text-white/80 tabular-nums">{done ? t("اكتملت", "Done") : t(`${step + 1} من ${total}`, `${step + 1} of ${total}`)}</span>
          </div>
        </div>

        {/* المحتوى */}
        <div className="overflow-y-auto px-5 py-6 sm:px-7" aria-live="polite">
          {!done && current && (
            <div key={current.id} className="animate-[step-in_0.35s_cubic-bezier(0.22,1,0.36,1)_both]">
              <h3 className="text-lg leading-8 font-black">{current.title}</h3>
              <p className="text-sm leading-6 text-slate-500">{current.hint}</p>
              <ul className={cn("mt-5 grid gap-2.5", current.options.length > 4 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2")}>
                {current.options.map(({ id, label, icon: Icon }) => {
                  const selected = answers[current.id] === id;
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => choose(id)}
                        aria-pressed={selected}
                        className={cn(
                          "group flex h-full min-h-14 w-full items-center gap-3 rounded-2xl border p-3 text-start text-sm leading-6 font-bold transition-all duration-200 active:scale-[0.98]",
                          selected ? "border-brand-600 bg-brand-50 text-brand-800 ring-2 ring-brand-600/15" : "border-slate-200 bg-white text-slate-800 hover:border-brand-200 hover:bg-slate-50",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                            selected ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-600 group-hover:bg-brand-100",
                          )}
                        >
                          {selected ? <Check className="size-4" aria-hidden /> : <Icon className="size-[18px]" aria-hidden />}
                        </span>
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {done && rec && (
            <div className="animate-[step-in_0.4s_cubic-bezier(0.22,1,0.36,1)_both]">
              <div className="rounded-3xl border border-brand-100 bg-linear-to-b from-brand-50/80 to-white p-5 sm:p-6">
                <p className="text-xs font-bold text-accent-600">{t("الحل الأنسب لنشاطك", "Best fit for your business")}</p>
                <h3 className="mt-1.5 text-xl leading-8 font-black text-slate-900">{rec.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{rec.summary}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {rec.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm leading-6 font-medium text-slate-700">
                      <Check className="mt-1 size-4 shrink-0 text-brand-500" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex items-center gap-2 border-t border-brand-100 pt-4 text-sm text-slate-600">
                  <Clock className="size-4 text-brand-600" aria-hidden />
                  {t("المدة التقديرية:", "Estimated timeline:")} <span className="font-bold text-slate-800">{rec.duration}</span>
                </p>
                {rec.note && (
                  <p className="mt-3 flex items-start gap-2 rounded-2xl bg-white p-3 text-sm leading-6 text-slate-600 ring-1 ring-slate-200">
                    <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-500" aria-hidden />
                    {rec.note}
                  </p>
                )}
              </div>

              <div className="mt-5 grid gap-2.5 sm:grid-cols-[1fr_auto]">
                <a
                  href={whatsappLink(siteConfig.contact.whatsapp, whatsappSummary(answers, rec, locale))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("contact", { source: "solution_finder", goal: answers.goal, sector: answers.sector })}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 font-bold text-white shadow-md shadow-emerald-900/15 transition-colors hover:bg-[#1ebe5b]"
                >
                  <MessageCircleMore className="size-5" aria-hidden />
                  {t("بدء تنفيذ هذا الحل عبر واتساب", "Start this solution on WhatsApp")}
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 font-bold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <RotateCcw className="size-4" aria-hidden />
                  {t("إعادة التحديد", "Start over")}
                </button>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
                <Link href={lp(locale, rec.href)} onClick={onClose} className="inline-flex items-center gap-1 font-bold text-brand-700 hover:text-brand-800">
                  {t("تفاصيل هذا الحل", "View solution details")}
                  <ArrowLeft className="size-4" aria-hidden />
                </Link>
                {answers.timeline === "study" && (
                  <Link href={lp(locale, "/book")} onClick={onClose} className="inline-flex items-center gap-1.5 font-bold text-brand-700 hover:text-brand-800">
                    <CalendarCheck className="size-4" aria-hidden />
                    {t("احجز الجلسة الاستشارية", "Book a consultation")}
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* رجوع */}
        {!done && step > 0 && (
          <div className="border-t border-slate-100 px-5 py-3 sm:px-7">
            <button type="button" onClick={() => setStep((n) => n - 1)} className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-900">
              <ArrowRight className="size-4" aria-hidden />
              {t("السابق", "Back")}
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}

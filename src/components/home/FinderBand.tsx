import { Clock, MousePointerClick, Route } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SolutionFinderButton } from "@/components/finder/SolutionFinderButton";
import { tr, type Locale } from "@/i18n";

const facts = [
  { icon: Route, label: { ar: "3 أسئلة فقط", en: "Just 3 questions" } },
  { icon: Clock, label: { ar: "أقل من دقيقة", en: "Under a minute" } },
  { icon: MousePointerClick, label: { ar: "بدون كتابة", en: "No typing" } },
];

/** الرئيسية: قسم خفيف يفتح «المستشار الذكي» */
export function FinderBand({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  return (
    <section aria-labelledby="finder-band-title" className="pb-6 sm:pb-10">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-brand-100 bg-linear-to-br from-brand-50 via-white to-silver-200/40 px-6 py-10 sm:px-12 sm:py-12">
          <span aria-hidden className="absolute -top-24 -start-24 -z-10 size-72 rounded-full border-[40px] border-brand-100/60" />
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <p className="text-sm font-bold text-accent-600">{t("المستشار الذكي", "Solution Advisor")}</p>
              <h2 id="finder-band-title" className="mt-2 text-2xl leading-[1.35] font-black tracking-tight text-slate-900 sm:text-3xl">
                {t("محتار تختار الحل المناسب لنشاطك؟", "Not sure which solution fits your business?")}
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-600">{t("أجب عن 3 أسئلة سريعة، ونقترح عليك الحل الأنسب مع المدة التقديرية، ثم ابدأ النقاش معنا مباشرة.", "Answer 3 quick questions and we'll suggest the right solution with an estimated timeline, then start the conversation with us directly.")}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {facts.map(({ icon: Icon, label: lb }) => {
                  const label = lb[locale];
                  return (
                  <li key={label} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
                    <Icon className="size-3.5 text-brand-600" aria-hidden />
                    {label}
                  </li>
                  );
                })}
              </ul>
            </div>
            <SolutionFinderButton locale={locale} className="w-full shadow-lg shadow-brand-600/20 sm:w-auto" />
          </div>
        </div>
      </Container>
    </section>
  );
}

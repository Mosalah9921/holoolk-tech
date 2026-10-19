import { ArrowLeft, Compass, Clock3, ListChecks, PencilRuler } from "lucide-react";
import { SolutionFinderButton } from "@/components/finder/SolutionFinderButton";
import { ButtonLink } from "@/components/ui/Button";
import { lp, tr, type Locale } from "@/i18n";

/**
 * «مجالك غير موجود؟» — آخر خانة في شبكة الحلول (بيملا الفراغ في آخر صف).
 * التصميم بيتغير حسب عرض الخانة نفسها (container queries):
 * - خانة ضيقة (موبايل أو عمود واحد): كارت رأسي، الزرين تحت بعض.
 * - خانة عريضة (عمودين أو الصف كله): أيقونة + نص + زرين في سطر واحد.
 */
export function CustomSolutionCard({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const perks = [
    { icon: ListChecks, label: t("3 أسئلة فقط", "Just 3 questions") },
    { icon: Clock3, label: t("أقل من دقيقة", "Under a minute") },
    { icon: PencilRuler, label: t("تصميم من الصفر", "Built from scratch") },
  ];
  /** مجالات بنبني لها بشكل مخصص (مش ليها صفحة مستقلة) */
  const examples = locale === "en"
    ? ["Travel agencies", "Beauty salons", "Shipping & delivery", "Events & ticketing", "Professional offices"]
    : ["مكاتب السياحة", "صالونات التجميل", "الشحن والتوصيل", "الفعاليات والتذاكر", "المكاتب المهنية"];
  return (
    <section
      aria-labelledby="custom-title"
      className="@container relative isolate h-full overflow-hidden rounded-3xl border border-brand-100 bg-linear-to-b from-brand-50/80 via-white to-white p-5 shadow-[0_10px_30px_-18px_rgb(16_39_74/0.25)] sm:p-7"
    >
      <span aria-hidden className="absolute -top-24 -start-24 -z-10 size-64 rounded-full bg-brand-200/40 blur-3xl" />
      <span aria-hidden className="bg-grid mask-fade absolute inset-0 -z-10 opacity-60" />

      <div className="flex h-full flex-col justify-center gap-6 @2xl:flex-row @2xl:items-center @2xl:gap-8">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-4 @md:flex-row">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-600 to-accent-500 text-white shadow-lg shadow-brand-600/25 @2xl:size-14">
            <Compass className="size-6 @2xl:size-7" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold text-brand-700">{t("حل مخصص لأي نشاط", "A custom solution for any business")}</p>
            <h2 id="custom-title" className="mt-1 text-xl leading-8 font-black text-slate-900">
              {t("مجالك غير موجود في القائمة؟", "Don’t see your industry?")}
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm leading-7 text-slate-600">
              {t(
                "المستشار الذكي يقترح عليك الحل المناسب لنشاطك، أو صف لنا فكرتك ونصمم لك نظاماً خاصاً بك من الصفر.",
                "Our smart advisor suggests the right fit for your business, or describe your idea and we’ll design a system around it from scratch.",
              )}
            </p>
            <p className="mt-3 text-xs font-bold text-slate-500">{t("من المجالات التي نبني لها حلولاً مخصصة:", "Businesses we also build custom solutions for:")}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={t("أمثلة على المجالات", "Example industries")}>
              {examples.map((e) => (
                <li key={e} className="rounded-full bg-white px-2.5 py-1 text-xs leading-5 font-semibold text-slate-700 ring-1 ring-brand-100">
                  {e}
                </li>
              ))}
            </ul>
            {/* خانة ضيقة: قايمة زي باقي الكروت — خانة عريضة: سطر واحد صغير */}
            <ul className="mt-4 space-y-2.5 border-t border-slate-200/80 pt-4 text-sm font-semibold text-slate-700 @2xl:mt-3 @2xl:flex @2xl:flex-wrap @2xl:gap-x-4 @2xl:gap-y-1.5 @2xl:space-y-0 @2xl:border-0 @2xl:pt-0 @2xl:text-xs @2xl:text-slate-600">
              {perks.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 @2xl:gap-1.5">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 ring-1 ring-brand-100 @2xl:size-auto @2xl:bg-transparent @2xl:ring-0">
                    <Icon className="size-3.5" aria-hidden />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid shrink-0 gap-2.5 @lg:grid-cols-2 @2xl:flex @2xl:flex-col">
          <SolutionFinderButton locale={locale} size="md" className="w-full shadow-md shadow-brand-600/20 @2xl:min-w-52" />
          <ButtonLink href={lp(locale, "/start")} variant="secondary" size="md" className="group w-full bg-white @2xl:min-w-52">
            {t("اطلب حلاً مخصصاً", "Request a custom solution")}
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

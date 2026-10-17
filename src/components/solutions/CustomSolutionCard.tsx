import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SolutionFinderButton } from "@/components/finder/SolutionFinderButton";
import { lp, tr, type Locale } from "@/i18n";

/** ختام صفحة الحلول: مجالك غير موجود؟ المستشار الذكي أو حل مخصص */
export function CustomSolutionCard({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  return (
    <section aria-labelledby="custom-title" className="pt-16 sm:pt-24">
      <Container>
        <div className="relative isolate mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-l ltr:bg-linear-to-r from-slate-50 to-white px-6 py-8 shadow-[0_4px_20px_-2px_rgb(0_0_0/0.05)] sm:px-8">
          <span aria-hidden className="absolute -top-20 -start-20 -z-10 size-56 rounded-full bg-brand-100/50 blur-3xl" />
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:gap-7 md:text-start">
            <span className="relative flex size-20 shrink-0 items-center justify-center rounded-3xl bg-linear-to-br from-brand-600 to-accent-500 text-white shadow-xl shadow-brand-600/25">
              <Compass className="size-10" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
                {t("حل مخصص لأي نشاط", "A custom solution for any business")}
              </span>
              <h2 id="custom-title" className="mt-3 text-xl leading-8 font-bold text-slate-900">
                {t("مجالك غير موجود في القائمة؟", "Don’t see your industry?")}
              </h2>
              <p className="mt-1.5 text-sm leading-7 text-[#64748B]">
                {t("أجب عن 3 أسئلة سريعة، والمستشار الذكي يقترح عليك الحل المناسب في أقل من دقيقة. أو صف لنا نشاطك ونصمم لك نظاماً من الصفر.", "Answer 3 quick questions and our smart advisor will suggest the right solution in under a minute. Or describe your business and we’ll design a system for you from scratch.")}
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col items-center gap-2 md:w-auto">
              <SolutionFinderButton locale={locale} className="w-full shadow-lg shadow-brand-600/20 md:w-auto" />
              <Link href={lp(locale, "/start")} className="group inline-flex items-center gap-1 text-sm font-bold text-brand-700 hover:text-brand-800">
                {t("أو اطلب حلاً مخصصاً", "Or request a custom solution")}
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

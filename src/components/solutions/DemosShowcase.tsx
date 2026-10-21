import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, MousePointerClick } from "lucide-react";
import { getSolutions } from "@/content/solutions";
import { tr, type Locale } from "@/i18n";
import { siteConfig } from "@/config/site";
import { projects } from "@/content/portfolio";

const siteHost = new URL(siteConfig.url).host.replace(/^www\./, "");
import { Section } from "@/components/ui/Section";
import { MobileCollapse } from "@/components/ui/MobileCollapse";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** صور معاينة لكل نموذج (لقطة من الصفحة الرئيسية للنموذج) — من بيانات الأعمال */
const shots: Record<string, string> = Object.fromEntries(projects.filter((p) => p.href && p.image).map((p) => [p.href!, p.image!]));

/** «جرّب بنفسك»: المواقع النموذجية الحية في إطار متصفح — العميل يرى الشغل قبل التواصل */
export function DemosShowcase({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const demos = getSolutions(locale).filter((s) => s.demo);

  return (
    <Section id="demos" aria-labelledby="demos-title" className="scroll-mt-24 bg-white">
      <SectionHeading
        id="demos-title"
        align="center"
        title={t("شاهد الحل يعمل قبل أن تقرر", "See the solution in action before you decide")}
        description={t(`${demos.length} مواقع نموذجية تعمل فعلياً بنيناها لمجالات مختلفة. افتحها وجرّب التصفح والحجز والشراء كما سيفعل عملاؤك.`, `Fully working sample websites we built for ${demos.length} industries. Open them and try browsing, booking and buying just as your customers would. (Demos are in Arabic.)`)}
      />

      {/* على الموبايل: أول نموذج ظاهر والباقي خلف زر (كروت المجالات فوق فيها «جرّبه الآن» أصلاً) */}
      <MobileCollapse more={t(`عرض كل النماذج (${demos.length})`, `Show all demos (${demos.length})`)} less={t("عرض أقل", "Show less")} collapsedHeight="max-md:max-h-[25rem]">
      {/* flex بدل grid: الصف الأخير الناقص بيتوسّط بدل ما يقف على جنب */}
      <ul className="flex flex-wrap justify-center gap-6">
        {demos.map((s) => {
          const demo = s.demo!;
          const host = demo.href.split("/").pop();
          return (
            <li key={s.id} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
              <Link
                href={demo.href}
                target="_blank"
                rel="noopener"
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-800/10 focus-visible:-translate-y-1"
              >
                {/* إطار متصفح مصغّر */}
                <div className="p-3 pb-0 sm:p-4 sm:pb-0">
                  <div className="overflow-hidden rounded-t-2xl border border-b-0 border-slate-200 bg-white shadow-[0_-8px_30px_-16px_rgb(16_39_74/0.25)]">
                    <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2" dir="ltr">
                      <span className="flex gap-1">
                        <span className="size-2 rounded-full bg-rose-300" />
                        <span className="size-2 rounded-full bg-amber-300" />
                        <span className="size-2 rounded-full bg-emerald-300" />
                      </span>
                      <span className="flex-1 truncate rounded-lg bg-slate-100 px-2 py-0.5 text-center text-[11px] text-slate-600">{siteHost}/demos/{host}</span>
                    </div>
                    <div className="relative aspect-[800/478] overflow-hidden">
                      <Image
                        src={shots[demo.href]}
                        alt={t(`معاينة موقع ${demo.label}`, `Preview of the ${demo.label} demo website`)}
                        fill
                        sizes="(min-width: 768px) 30vw, 90vw"
                        className="object-cover object-top transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-brand-800/0 opacity-0 transition-all duration-300 group-hover:bg-brand-800/35 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-brand-800 shadow-lg">
                          <MousePointerClick className="size-4" aria-hidden />
                          {t("افتح النموذج", "Open the demo")}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-between gap-3 border-t border-slate-200 bg-white p-5">
                  <span className="min-w-0">
                    <span className="block text-xs font-bold text-accent-600">{s.name}</span>
                    <span className="mt-0.5 block text-base font-black text-slate-900">{demo.label}</span>
                  </span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <ArrowUpLeft className="size-5" aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      </MobileCollapse>
    </Section>
  );
}

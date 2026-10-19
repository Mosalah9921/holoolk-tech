import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Hammer } from "lucide-react";
import type { Project } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { lp, tr, type Locale } from "@/i18n";
import { CoverPreview, PassArt } from "@/components/portfolio/ProjectArt";

/** كارت مشروع في معرض الأعمال */
export function ProjectCard({ project, locale = "ar" }: { project: Project; locale?: Locale }) {
  const t = tr(locale);
  const demo = project.href?.startsWith("/demos/") ? project.href.split("/").pop() : undefined;
  const mobileShot = demo ? `/images/demos/${demo}-mobile.webp` : undefined;

  return (
    <li className="group relative flex flex-col">
      {/* نافذة متصفح بلقطة الموقع كاملة (16:9 = نفس مقاس اللقطة، فمفيش قص) + هاتف صغير بنسخة الموبايل */}
      <div className="relative pb-5 sm:pb-6">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_50px_-28px_rgb(15_23_42/0.35)] transition-shadow duration-300 group-hover:shadow-[0_30px_60px_-28px_rgb(15_23_42/0.45)] sm:rounded-[1.5rem]">
          <div aria-hidden className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/90 px-3 py-2 sm:px-4 sm:py-2.5" dir="ltr">
            <span className="size-2 rounded-full bg-[#FF5F57] sm:size-2.5" />
            <span className="size-2 rounded-full bg-[#FEBC2E] sm:size-2.5" />
            <span className="size-2 rounded-full bg-[#28C840] sm:size-2.5" />
          </div>
          <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
            {project.image ? (
              <Image
                src={project.image}
                alt={t(`لقطة من موقع ${project.title}`, `Screenshot of the ${project.title} website`)}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : project.cover ? (
              <CoverPreview cover={project.cover} />
            ) : (
              <PassArt title={project.title} locale={locale} />
            )}
          </div>
        </div>

        {mobileShot && (
          <div aria-hidden className="absolute bottom-0 end-3 w-[22%] max-w-[7rem] sm:end-5">
            <div className="rounded-[0.9rem] bg-slate-900 p-[0.18rem] shadow-[0_16px_30px_-12px_rgb(15_23_42/0.55)] ring-1 ring-slate-700 sm:rounded-[1.1rem] sm:p-[0.22rem]">
              <div className="relative aspect-[500/1082] overflow-hidden rounded-[0.75rem] bg-white sm:rounded-[0.9rem]">
                <Image src={mobileShot} alt={t(`نسخة الموبايل من ${project.title}`, `${project.title} on mobile`)} fill sizes="112px" className="object-cover object-top" />
              </div>
            </div>
          </div>
        )}

        {project.status === "building" && (
          <span className="absolute top-12 start-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-amber-700 shadow-sm sm:top-14 sm:start-4">
            <Hammer className="size-3.5" aria-hidden />
            {t("قيد التطوير", "In development")}
          </span>
        )}
        {project.status === "demo" && (
          <span className="absolute top-12 start-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 sm:top-14 sm:start-4 sm:px-3 sm:text-xs">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
            {t("موقع نموذجي", "Sample website")}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-4 px-1 sm:mt-4">
        <div>
          <h3 className="text-lg font-black sm:text-xl">{project.title}</h3>
          <p className="mt-0.5 text-sm font-semibold text-brand-600">{project.category}</p>
          <p className="mt-2 line-clamp-3 max-w-md text-sm leading-7 text-slate-600 sm:line-clamp-none">{project.description}</p>
        </div>

        <Link
          href={lp(locale, `/work/${project.slug}`)}
          aria-label={t(`دراسة حالة ${project.title}`, `${project.title} case study`)}
          className={cn(
            "flex size-11 shrink-0 items-center sm:size-12 justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition-all",
            "after:absolute after:inset-0 after:content-[''] group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white",
          )}
        >
          <ArrowUpLeft className="size-5" aria-hidden />
        </Link>
      </div>
    </li>
  );
}

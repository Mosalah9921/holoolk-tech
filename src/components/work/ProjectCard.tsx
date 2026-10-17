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

  return (
    <li className="group relative flex flex-col">
      <div className="relative aspect-[16/11] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : project.cover ? (
          <CoverPreview cover={project.cover} />
        ) : (
          <PassArt title={project.title} locale={locale} />
        )}

        {project.status === "building" && (
          <span className="absolute top-4 start-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-amber-700 shadow-sm">
            <Hammer className="size-3.5" aria-hidden />
            {t("قيد التطوير", "In development")}
          </span>
        )}
        {project.status === "demo" && (
          <span className="absolute top-4 start-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm">
            {t("موقع نموذجي", "Sample website")}
          </span>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4 px-1">
        <div>
          <h3 className="text-xl font-black">{project.title}</h3>
          <p className="mt-0.5 text-sm font-semibold text-brand-600">{project.category}</p>
          <p className="mt-2 max-w-md text-sm leading-7 text-slate-600">{project.description}</p>
        </div>

        <Link
          href={lp(locale, `/work/${project.slug}`)}
          aria-label={t(`دراسة حالة ${project.title}`, `${project.title} case study`)}
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition-all",
            "after:absolute after:inset-0 after:content-[''] group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white",
          )}
        >
          <ArrowUpLeft className="size-5" aria-hidden />
        </Link>
      </div>
    </li>
  );
}

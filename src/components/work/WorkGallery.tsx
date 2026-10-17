"use client";

import { useMemo, useState } from "react";
import { getProjects } from "@/content/portfolio";
import type { Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

const filters = [
  { id: "all", label: { ar: "الكل", en: "All" } },
  { id: "demo", label: { ar: "مواقع نموذجية", en: "Sample websites" } },
  { id: "building", label: { ar: "منصات قيد التطوير", en: "Platforms in development" } },
  { id: "live", label: { ar: "مشاريع منشورة", en: "Live projects" } },
] as const;

/** معرض الأعمال مع فلترة حسب الحالة */
export function WorkGallery({ locale = "ar" }: { locale?: Locale }) {
  const projects = getProjects(locale);
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const available = filters.filter((f) => f.id === "all" || projects.some((p) => p.status === f.id));
  const list = useMemo(() => (filter === "all" ? projects : projects.filter((p) => p.status === filter)), [filter, projects]);

  return (
    <div>
      <div role="tablist" aria-label={locale === "en" ? "Filter projects" : "تصفية الأعمال"} className="mb-10 flex flex-wrap gap-2">
        {available.map((f) => {
          const count = f.id === "all" ? projects.length : projects.filter((p) => p.status === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition-colors",
                filter === f.id ? "border-brand-600 bg-brand-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
              )}
            >
              {f.label[locale]}
              <span className={cn("rounded-full px-2 text-xs", filter === f.id ? "bg-white/20" : "bg-slate-100 text-slate-500")}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2">
        {list.map((p) => (
          <ProjectCard key={p.slug} project={p} locale={locale} />
        ))}
      </ul>
    </div>
  );
}

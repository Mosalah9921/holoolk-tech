import { Plus } from "lucide-react";
import type { Faq, Stat } from "@/content/service-extras";
import { cn } from "@/lib/utils";

/** شريط أرقام: 2×2 على الموبايل، 4 في صف على التابلت والكمبيوتر (الفواصل بتقنية gap-px) */
export function StatsStrip({ stats, className, dark = false }: { stats: Stat[]; className?: string; dark?: boolean }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-3xl border md:grid-cols-4",
        dark ? "border-white/10 bg-white/10" : "border-slate-200 bg-slate-200 shadow-sm",
        className,
      )}
    >
      {stats.map((s) => (
        <div key={s.label} className={cn("flex flex-col gap-1.5 p-5 sm:p-6", dark ? "bg-brand-800" : "bg-white")}>
          <dt className={cn("order-2 text-xs leading-6 sm:text-sm", dark ? "text-slate-300" : "text-slate-500")}>{s.label}</dt>
          <dd className={cn("order-1 text-xl leading-tight font-black sm:text-2xl", dark ? "text-white" : "text-brand-700")}>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** أسئلة شائعة بسيطة (details/summary — بتشتغل من غير JavaScript وقابلة للوصول بالكيبورد) */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-start text-base leading-7 font-bold text-slate-900 transition-colors hover:bg-slate-50 sm:p-6 sm:text-lg [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-transform duration-300 group-open:rotate-45">
              <Plus className="size-4" aria-hidden />
            </span>
          </summary>
          <p className="px-5 pb-5 leading-8 text-slate-600 sm:px-6 sm:pb-6">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

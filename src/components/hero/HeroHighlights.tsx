import type { LucideIcon } from "lucide-react";

export type Highlight = { icon: LucideIcon; label: string };

/**
 * شريط مزايا مختصر لهيرو صفحات النماذج (تواصل، حجز، ابدأ، أدوات):
 * خفيف جداً ولا يدفع النموذج للأسفل. gauge: عداد أداء صغير يمتلئ (لصفحة فاحص المواقع).
 */
export function HeroHighlights({ items, gauge }: { items: Highlight[]; gauge?: { value: number; label: string } }) {
  return (
    <ul className="flex flex-wrap items-center gap-2.5">
      {gauge && (
        <li className="flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white/75 py-1.5 ps-1.5 pe-4 shadow-[0_10px_30px_-16px_rgb(16_39_74/0.35)] ring-1 ring-slate-900/5 backdrop-blur">
          <Gauge value={gauge.value} />
          <span className="text-sm leading-5 font-bold text-slate-800">{gauge.label}</span>
        </li>
      )}
      {items.map(({ icon: Icon, label }, i) => (
        <li
          key={label}
          className="flex animate-[sheet-in_0.6s_cubic-bezier(0.22,1,0.36,1)_both] items-center gap-2.5 rounded-2xl border border-white/80 bg-white/75 py-1.5 ps-1.5 pe-4 shadow-[0_10px_30px_-16px_rgb(16_39_74/0.35)] ring-1 ring-slate-900/5 backdrop-blur"
          style={{ animationDelay: `${300 + i * 90}ms` }}
        >
          <span className="relative flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-brand-600 to-accent-500 text-white shadow-md shadow-brand-600/25">
            <Icon className="size-[18px]" aria-hidden />
            {i === 0 && <span aria-hidden className="absolute inset-0 -z-10 rounded-xl bg-accent-400/50 motion-safe:animate-ping [animation-duration:2.4s]" />}
          </span>
          <span className="text-sm leading-5 font-bold text-slate-800">{label}</span>
        </li>
      ))}
    </ul>
  );
}

/** عداد دائري صغير يمتلئ حتى القيمة */
function Gauge({ value }: { value: number }) {
  const r = 15;
  const len = 2 * Math.PI * r;
  return (
    <span className="relative flex size-11 items-center justify-center">
      <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="20" cy="20" r={r} fill="none" strokeWidth="4" className="stroke-slate-200" />
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          className="stroke-emerald-500 motion-safe:animate-[gauge_1.6s_cubic-bezier(0.22,1,0.36,1)_0.4s_both]"
          style={{ strokeDasharray: len, strokeDashoffset: len * (1 - value / 100), ["--gauge-len" as string]: len }}
        />
      </svg>
      <span className="text-xs font-black text-emerald-700 tabular-nums">{value}</span>
    </span>
  );
}

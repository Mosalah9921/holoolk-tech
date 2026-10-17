import type { Project } from "@/content/portfolio";

/** غلاف مرسوم بألوان المشروع: نسخة مصغّرة من شكل الموقع */
export function CoverPreview({ cover }: { cover: NonNullable<Project["cover"]> }) {
  return (
    <div className="flex h-full items-end justify-center px-10 pt-10" style={{ background: `linear-gradient(160deg, ${cover.accent}26, #f1f5f9 80%)` }}>
      <div
        aria-hidden
        className="w-full overflow-hidden rounded-t-2xl shadow-2xl shadow-slate-900/15 transition-transform duration-500 group-hover:-translate-y-2"
        style={{ background: cover.bg, color: cover.fg }}
      >
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${cover.fg}14` }}>
          <span className="text-base font-black">{cover.label}</span>
          <span className="flex gap-1.5">
            <span className="h-1.5 w-7 rounded-full opacity-25" style={{ background: cover.fg }} />
            <span className="h-1.5 w-7 rounded-full opacity-25" style={{ background: cover.fg }} />
            <span className="h-4 w-12 rounded-full" style={{ background: cover.accent }} />
          </span>
        </div>
        <div className="grid grid-cols-[1.3fr_1fr] gap-4 p-5 pb-8">
          <div className="space-y-2.5">
            <div className="h-3.5 w-4/5 rounded-full opacity-80" style={{ background: cover.fg }} />
            <div className="h-3.5 w-3/5 rounded-full" style={{ background: cover.accent }} />
            <div className="h-1.5 w-full rounded-full opacity-20" style={{ background: cover.fg }} />
            <div className="h-1.5 w-5/6 rounded-full opacity-20" style={{ background: cover.fg }} />
            <div className="mt-4 h-6 w-24 rounded-lg" style={{ background: cover.accent }} />
          </div>
          <div className="rounded-xl" style={{ background: `${cover.accent}2e` }}>
            <div className="m-auto mt-4 size-12 rounded-full" style={{ background: cover.accent }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** غلاف Engine Pass: كارت هوية رقمية بكود QR */
export function PassArt({ title, locale = "ar" }: { title: string; locale?: "ar" | "en" }) {
  // نمط QR ثابت (للزينة)
  const qr = "111101111101101101111101111010010111011011001000010110111000010101001010111110111";
  return (
    <div aria-hidden className="bg-grid flex h-full items-center justify-center bg-linear-to-br from-brand-50 via-white to-accent-50 p-8">
      <div className="flex w-full max-w-sm -rotate-3 overflow-hidden rounded-3xl bg-white shadow-2xl shadow-brand-600/20 ring-1 ring-slate-200 transition-transform duration-500 group-hover:rotate-0">
        <div className="flex w-2/5 flex-col justify-between bg-linear-to-b from-brand-600 to-accent-500 p-4 text-white">
          <span dir="ltr" className="text-sm font-black">{title}</span>
          <div className="size-12 rounded-full bg-white/25 ring-4 ring-white/30" />
        </div>
        <div className="flex flex-1 items-center gap-4 p-4">
          <div className="flex-1 space-y-2">
            <div className="h-2.5 w-4/5 rounded-full bg-slate-800" />
            <div className="h-2 w-3/5 rounded-full bg-slate-200" />
            <div className="h-2 w-2/3 rounded-full bg-slate-200" />
            <div className="mt-3 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">{locale === "en" ? "Checked in ✓" : "حضور ✓"}</div>
          </div>
          <div className="grid size-16 shrink-0 grid-cols-9 gap-px" dir="ltr">
            {qr.split("").map((b, i) => (
              <span key={i} className={b === "1" ? "bg-slate-900" : "bg-transparent"} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

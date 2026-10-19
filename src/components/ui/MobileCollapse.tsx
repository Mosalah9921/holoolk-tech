"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * يطوي محتوى طويل على الموبايل بس (تحت md): يظهر جزء أول + زر «عرض الكل».
 * التابلت والكمبيوتر بيشوفوا المحتوى كامل دايماً. المحتوى كله موجود في الصفحة (جوجل وقارئ الشاشة بيقروه).
 */
export function MobileCollapse({
  children,
  more,
  less,
  className,
  buttonClassName,
  fadeClassName = "from-white",
  collapsedHeight = "max-md:max-h-[30rem]",
}: {
  children: React.ReactNode;
  more: string;
  less: string;
  className?: string;
  buttonClassName?: string;
  /** لون التدرّج فوق الجزء المقصوص (لازم يطابق لون الخلفية) */
  fadeClassName?: string;
  /** ارتفاع الجزء الظاهر وهو مطوي (كلاس Tailwind) */
  collapsedHeight?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={className}>
      {/* لو حد وصل بالكيبورد (Tab) لعنصر جوه الجزء المطوي، نفتحه عشان يشوف هو فين */}
      <div className={cn("relative", !open && ["max-md:overflow-hidden", collapsedHeight])} onFocusCapture={() => !open && setOpen(true)}>
        {children}
        {!open && <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t to-transparent md:hidden", fadeClassName)} />}
      </div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn("mt-3 flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-brand-700 hover:bg-brand-50 md:hidden", buttonClassName)}
      >
        {open ? less : more}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
    </div>
  );
}

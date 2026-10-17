"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import type { Locale } from "@/i18n";

// النافذة تُحمَّل عند أول ضغطة فقط — لا تزيد حجم الصفحة
const SolutionFinder = dynamic(() => import("./SolutionFinder").then((m) => m.SolutionFinder), { ssr: false });

/** زر «ساعدني في الاختيار» — يفتح المستشار الذكي */
export function SolutionFinderButton({
  label,
  locale = "ar",
  variant = "primary",
  size = "lg",
  className,
}: {
  label?: string;
  locale?: Locale;
  variant?: "primary" | "secondary" | "inverse";
  size?: "md" | "lg";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
        onPointerEnter={() => setLoaded(true)}
        aria-haspopup="dialog"
        className={buttonClasses({ variant, size, className })}
      >
        <Sparkles className="size-[18px]" aria-hidden />
        {label ?? (locale === "en" ? "Help me choose" : "ساعدني في الاختيار")}
      </button>
      {loaded && <SolutionFinder locale={locale} open={open} onClose={() => setOpen(false)} />}
    </>
  );
}

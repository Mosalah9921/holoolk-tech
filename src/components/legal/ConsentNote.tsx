import Link from "next/link";
import { cn } from "@/lib/utils";
import { lp, type Locale } from "@/i18n";

/** سطر موافقة صغير تحت النماذج — بيربط بسياسة الخصوصية */
export function ConsentNote({ className, tone = "light", locale = "ar" }: { className?: string; tone?: "light" | "dark"; locale?: Locale }) {
  const link = tone === "dark" ? "font-semibold text-white underline underline-offset-2" : "font-semibold text-slate-700 underline underline-offset-2 hover:text-brand-700";
  const en = locale === "en";
  return (
    <p className={cn("text-center text-xs leading-6", tone === "dark" ? "text-white/70" : "text-slate-500", className)}>
      {en ? "By submitting, you agree to our" : "بإرسال الطلب، أنت توافق على"}{" "}
      <Link href={lp(locale, "/privacy")} className={link}>
        {en ? "Privacy Policy" : "سياسة الخصوصية"}
      </Link>{" "}
      {en ? "and " : "و"}
      <Link href={lp(locale, "/terms")} className={link}>
        {en ? "Terms" : "الشروط والأحكام"}
      </Link>
      .
    </p>
  );
}

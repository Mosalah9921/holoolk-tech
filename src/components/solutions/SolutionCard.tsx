import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, Check } from "lucide-react";
import type { Solution } from "@/content/solutions";
import { lp, tr, type Locale } from "@/i18n";

/** بطاقة مجال موحدة بلون الهوية: الأيقونة، النتيجة، 3 فوائد، ونموذج حي إن وُجد */
export function SolutionCard({ solution: s, locale = "ar" }: { solution: Solution; locale?: Locale }) {
  const t = tr(locale);
  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-800/[0.08] has-[a:focus-visible]:-translate-y-1">
      {/* أيقونة ثلاثية الأبعاد على منصة متدرجة */}
      <div className="relative -mx-2 -mt-2 flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-b from-brand-50 via-slate-50 to-white">
        <span aria-hidden className="absolute inset-x-12 bottom-3 h-5 rounded-[50%] bg-brand-800/10 blur-md transition-all duration-500 group-hover:inset-x-16 group-hover:bg-brand-800/5" />
        <Image
          src={s.image}
          alt=""
          width={640}
          height={640}
          sizes="160px"
          className="relative h-36 w-auto object-contain drop-shadow-[0_10px_14px_rgb(16_39_74/0.16)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105"
        />
        {s.demo && (
          <span className="absolute top-3 start-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-emerald-700 shadow-sm ring-1 ring-emerald-100 backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 motion-safe:animate-ping" />
              <span className="relative size-2 rounded-full bg-emerald-500" />
            </span>
            {t("موقع نموذجي", "Sample site")}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-lg leading-8 font-black text-slate-900">
        {/* الرابط يغطي البطاقة كلها */}
        <Link href={lp(locale, `/solutions/${s.id}`)} className="outline-none after:absolute after:inset-0 after:rounded-3xl">
          {s.name}
        </Link>
      </h3>
      <p className="mt-1.5 text-sm leading-7 font-semibold text-brand-700">{s.outcome}</p>

      <ul className="mt-5 flex-1 space-y-2.5 border-t border-slate-100 pt-5">
        {s.benefits.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm leading-6 text-slate-700">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Check className="size-3.5" aria-hidden />
            </span>
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex min-h-9 flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <span className="inline-flex items-center gap-1.5 text-sm font-bold whitespace-nowrap text-brand-700">
          {t("استكشف الحل", "Explore the solution")}
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />
        </span>
        {s.demo && (
          <Link
            href={s.demo.href}
            target="_blank"
            className="relative z-10 inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl whitespace-nowrap border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
          >
            {t("جرّبه الآن", "Try it live")}
            <ArrowUpLeft className="size-3.5" aria-hidden />
          </Link>
        )}
      </div>
    </article>
  );
}

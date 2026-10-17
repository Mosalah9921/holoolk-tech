"use client";

import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n";

/** ساعات عمل الاستوديو بتوقيت القاهرة */
const STUDIO_TZ = "Africa/Cairo";
const OPEN = 9;
const CLOSE = 18;

const cities: { tz: string; name: { ar: string; en: string } }[] = [
  { tz: "Africa/Cairo", name: { ar: "القاهرة", en: "Cairo" } },
  { tz: "Asia/Riyadh", name: { ar: "الرياض", en: "Riyadh" } },
  { tz: "Asia/Dubai", name: { ar: "دبي", en: "Dubai" } },
  { tz: "Asia/Kuwait", name: { ar: "الكويت", en: "Kuwait" } },
  { tz: "Europe/London", name: { ar: "لندن", en: "London" } },
  { tz: "Europe/Berlin", name: { ar: "برلين", en: "Berlin" } },
];

/** فرق التوقيت بالدقائق عن UTC لمنطقة معينة في لحظة معينة (بيراعي التوقيت الصيفي تلقائياً) */
function offsetMinutes(tz: string, at: Date) {
  const p = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(at);
  const g = (t: string) => Number(p.find((x) => x.type === t)?.value);
  return (Date.UTC(g("year"), g("month") - 1, g("day"), g("hour"), g("minute")) - Math.floor(at.getTime() / 60000) * 60000) / 60000;
}

const fmtHour = (h: number, locale: Locale) => {
  const n = ((h % 24) + 24) % 24;
  const whole = Math.floor(n);
  const min = Math.round((n - whole) * 60);
  if (locale === "en") {
    const suffix = whole < 12 ? "AM" : "PM";
    const h12 = whole % 12 === 0 ? 12 : whole % 12;
    return `${h12}${min ? `:${String(min).padStart(2, "0")}` : ""} ${suffix}`;
  }
  const suffix = whole < 12 ? "ص" : "م";
  const h12 = whole % 12 === 0 ? 12 : whole % 12;
  return `${h12}${min ? `:${String(min).padStart(2, "0")}` : ""} ${suffix}`;
};

/**
 * لوحة المناطق الزمنية: الوقت الآن في كل مدينة + ساعات عمل الاستوديو بتوقيتها.
 * بتتحسب في المتصفح (عشان الوقت الحالي والتوقيت الصيفي يبقوا مظبوطين دايماً).
 */
export function TimeZoneBoard({ locale = "ar" }: { locale?: Locale }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const en = locale === "en";
  const studioOff = now ? offsetMinutes(STUDIO_TZ, now) : 0;
  const cairoDay = now ? new Intl.DateTimeFormat("en-US", { timeZone: STUDIO_TZ, weekday: "short" }).format(now) : "";
  const cairoHour = now ? (() => {
    const p = new Intl.DateTimeFormat("en-US", { timeZone: STUDIO_TZ, hourCycle: "h23", hour: "2-digit", minute: "2-digit" }).formatToParts(now);
    return Number(p.find((x) => x.type === "hour")?.value) + Number(p.find((x) => x.type === "minute")?.value) / 60;
  })() : 0;
  const isOpen = !!now && cairoDay !== "Fri" && cairoHour >= OPEN && cairoHour < CLOSE;

  return (
    <div className="relative mx-auto w-full max-w-[460px] rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-[0_24px_60px_-28px_rgb(16_39_74/0.45)] ring-1 ring-slate-900/5 backdrop-blur-xl sm:p-6">
      <div aria-hidden className="absolute inset-[-14%] -z-10 bg-[radial-gradient(closest-side,rgb(85_131_186/0.32),rgb(163_191_224/0.14)_60%,transparent)]" />
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <p className="flex items-center gap-2 text-sm font-black whitespace-nowrap text-slate-900">
          <Clock3 className="size-4 text-brand-600" aria-hidden />
          {en ? "Our hours, in your time zone" : "ساعات عملنا بتوقيتك"}
        </p>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold whitespace-nowrap",
            !now ? "bg-slate-100 text-slate-500" : isOpen ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600",
          )}
        >
          <span className={cn("size-1.5 rounded-full", isOpen ? "bg-emerald-500 motion-safe:animate-pulse" : "bg-slate-400")} aria-hidden />
          {!now ? "…" : isOpen ? (en ? "Available now" : "متاحون الآن") : en ? "Back during business hours" : "نعود في ساعات العمل"}
        </span>
      </div>

      <ul className="mt-5 divide-y divide-slate-100">
        {cities.map((c) => {
          const diff = now ? (offsetMinutes(c.tz, now) - studioOff) / 60 : 0;
          const local = now ? new Intl.DateTimeFormat(en ? "en-US" : "ar-EG-u-nu-latn", { timeZone: c.tz, hour: "numeric", minute: "2-digit", hour12: true }).format(now) : "--:--";
          const studio = c.tz === STUDIO_TZ;
          return (
            <li key={c.tz} className="flex items-center justify-between gap-3 py-2.5">
              <span className="min-w-0">
                <span className="block text-sm font-bold text-slate-900">
                  {c.name[locale]}
                  {studio && <span className="ms-2 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-bold text-brand-700">{en ? "Studio" : "الاستوديو"}</span>}
                </span>
                <span className="block text-xs text-slate-500 tabular-nums" dir={en ? undefined : "rtl"}>
                  {now ? `${fmtHour(OPEN + diff, locale)} – ${fmtHour(CLOSE + diff, locale)}` : "—"}
                </span>
              </span>
              <span className="shrink-0 text-end">
                <span className="block text-sm font-black text-slate-800 tabular-nums" dir={en ? "ltr" : "rtl"}>
                  {local}
                </span>
                <span className="block text-[11px] text-slate-500 tabular-nums">
                  {studio || !now ? (en ? "Local time" : "الوقت الآن") : diff === 0 ? (en ? "Same time as Cairo" : "نفس توقيت القاهرة") : `${diff > 0 ? "+" : "−"}${Math.abs(diff)}${en ? "h vs Cairo" : " س عن القاهرة"}`}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-6 text-slate-500">
        {en ? "Saturday to Thursday. Meetings outside these hours can be arranged in advance." : "من السبت إلى الخميس، ويمكن ترتيب اجتماعات خارج هذه الساعات مسبقاً."}
      </p>
    </div>
  );
}

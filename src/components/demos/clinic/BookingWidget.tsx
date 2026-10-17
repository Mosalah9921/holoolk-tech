"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const treatments = ["كشف واستشارة", "تنظيف وتلميع", "تبييض الأسنان", "حشو عصب", "تقويم", "زراعة أسنان"];
const slots = ["11:00", "12:00", "1:00", "3:00", "4:00", "5:00", "6:00", "7:00"];
const booked = new Set(["12:00", "4:00"]); // مواعيد محجوزة (للعرض)

type Day = { key: string; weekday: string; date: string };

function nextDays(count: number): Day[] {
  const days: Day[] = [];
  const d = new Date();
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 5) continue; // الجمعة إجازة
    days.push({
      key: d.toISOString().slice(0, 10),
      weekday: d.toLocaleDateString("ar-EG", { weekday: "long" }),
      date: d.toLocaleDateString("ar-EG", { day: "numeric", month: "short" }),
    });
  }
  return days;
}

export function BookingWidget() {
  // الأيام بتتحسب في المتصفح عشان متختلفش عن السيرفر
  const [days, setDays] = useState<Day[]>([]);
  const [treatment, setTreatment] = useState(treatments[0]);
  const [day, setDay] = useState("");
  const [slot, setSlot] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const d = nextDays(5);
    setDays(d);
    setDay(d[0].key);
  }, []);

  const chosenDay = days.find((d) => d.key === day);

  if (done) {
    return (
      <div role="status" className="rounded-3xl bg-white p-8 text-center shadow-2xl shadow-cyan-900/10">
        <CheckCircle2 className="mx-auto size-14 text-[#0E7490]" aria-hidden />
        <p className="mt-4 text-xl font-bold text-slate-900">تم حجز موعدك مبدئياً</p>
        <p className="mt-2 text-slate-600">
          {treatment} — {chosenDay?.weekday} الساعة {slot}
        </p>
        <p className="mt-4 text-sm text-slate-500">هذا موقع نموذجي؛ في الموقع الفعلي يصل التأكيد إلى المريض والعيادة عبر واتساب.</p>
        <button type="button" onClick={() => setDone(false)} className="mt-5 text-sm font-bold text-[#0E7490] underline underline-offset-4">
          حجز موعد آخر
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (slot) setDone(true);
      }}
      className="rounded-3xl bg-white p-6 shadow-2xl shadow-cyan-900/10 sm:p-7"
    >
      <p className="flex items-center gap-2 text-lg font-bold text-slate-900">
        <CalendarCheck className="size-5 text-[#0E7490]" aria-hidden />
        احجز موعدك إلكترونياً
      </p>

      <label className="mt-5 block">
        <span className="mb-1.5 block text-sm font-semibold text-slate-600">نوع الكشف</span>
        <select
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-[#0E7490] focus:outline-none focus:ring-4 focus:ring-[#0E7490]/15"
        >
          {treatments.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-semibold text-slate-600">اليوم</legend>
        <div className="grid grid-cols-5 gap-2">
          {days.length === 0
            ? Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />)
            : days.map((d) => (
                <button
                  key={d.key}
                  type="button"
                  aria-pressed={day === d.key}
                  onClick={() => setDay(d.key)}
                  className={cn(
                    "flex flex-col items-center rounded-xl border px-1 py-2.5 transition-colors",
                    day === d.key ? "border-[#0E7490] bg-[#0E7490] text-white" : "border-slate-200 text-slate-700 hover:border-[#0E7490]/50",
                  )}
                >
                  <span className="text-[11px] opacity-90">{d.weekday}</span>
                  <span className="text-sm font-bold">{d.date}</span>
                </button>
              ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-semibold text-slate-600">الساعة</legend>
        <div className="grid grid-cols-4 gap-2" dir="ltr">
          {slots.map((s) => {
            const isBooked = booked.has(s);
            return (
              <button
                key={s}
                type="button"
                disabled={isBooked}
                aria-pressed={slot === s}
                onClick={() => setSlot(s)}
                className={cn(
                  "rounded-lg border py-2 text-sm font-bold transition-colors",
                  isBooked && "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300 line-through",
                  !isBooked && (slot === s ? "border-[#0E7490] bg-[#0E7490]/10 text-[#0E7490]" : "border-slate-200 text-slate-700 hover:border-[#0E7490]/50"),
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={!slot}
        className="mt-6 w-full rounded-xl bg-[#0E7490] py-3.5 font-bold text-white transition-colors hover:bg-[#0B5F76] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {slot ? `أكّد الحجز — الساعة ${slot}` : "اختر الساعة أولاً"}
      </button>
    </form>
  );
}

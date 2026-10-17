"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type ClassSlot = { time: string; name: string; coach: string; level: "مبتدئ" | "متوسط" | "متقدم" };

const week: Record<string, ClassSlot[]> = {
  السبت: [
    { time: "07:00", name: "كروس فت", coach: "كابتن عمر", level: "متقدم" },
    { time: "10:00", name: "يوجا", coach: "كابتن نور", level: "مبتدئ" },
    { time: "18:00", name: "HIIT", coach: "كابتن يوسف", level: "متوسط" },
    { time: "20:00", name: "بوكسينج", coach: "كابتن عمر", level: "متوسط" },
  ],
  الأحد: [
    { time: "08:00", name: "زومبا", coach: "كابتن ريم", level: "مبتدئ" },
    { time: "17:00", name: "قوة وعضلات", coach: "كابتن يوسف", level: "متقدم" },
    { time: "19:30", name: "سبينينج", coach: "كابتن نور", level: "متوسط" },
  ],
  الاثنين: [
    { time: "07:00", name: "كروس فت", coach: "كابتن عمر", level: "متقدم" },
    { time: "11:00", name: "بيلاتس", coach: "كابتن ريم", level: "مبتدئ" },
    { time: "18:00", name: "HIIT", coach: "كابتن يوسف", level: "متوسط" },
    { time: "21:00", name: "تمارين حرق", coach: "كابتن نور", level: "مبتدئ" },
  ],
  الثلاثاء: [
    { time: "09:00", name: "يوجا", coach: "كابتن نور", level: "مبتدئ" },
    { time: "18:30", name: "بوكسينج", coach: "كابتن عمر", level: "متوسط" },
    { time: "20:00", name: "قوة وعضلات", coach: "كابتن يوسف", level: "متقدم" },
  ],
  الأربعاء: [
    { time: "07:00", name: "سبينينج", coach: "كابتن نور", level: "متوسط" },
    { time: "17:00", name: "زومبا", coach: "كابتن ريم", level: "مبتدئ" },
    { time: "19:00", name: "كروس فت", coach: "كابتن عمر", level: "متقدم" },
  ],
  الخميس: [
    { time: "10:00", name: "بيلاتس", coach: "كابتن ريم", level: "مبتدئ" },
    { time: "18:00", name: "HIIT", coach: "كابتن يوسف", level: "متوسط" },
    { time: "20:30", name: "بوكسينج", coach: "كابتن عمر", level: "متوسط" },
  ],
};

const days = Object.keys(week);

const levelColor: Record<ClassSlot["level"], string> = {
  مبتدئ: "bg-sky-400/15 text-sky-300",
  متوسط: "bg-amber-400/15 text-amber-300",
  متقدم: "bg-rose-400/15 text-rose-300",
};

export function GymSchedule() {
  const [day, setDay] = useState(days[0]);

  return (
    <div>
      <div role="tablist" aria-label="أيام الأسبوع" className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {days.map((d) => (
          <button
            key={d}
            role="tab"
            type="button"
            aria-selected={day === d}
            aria-controls="schedule-panel"
            onClick={() => setDay(d)}
            className={cn(
              "shrink-0 rounded-lg px-5 py-2.5 font-bold transition-colors",
              day === d ? "bg-[#C6F432] text-black" : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <div id="schedule-panel" role="tabpanel" aria-label={`حصص يوم ${day}`}>
      <ul className="divide-y divide-white/10 rounded-2xl border border-white/10">
        {week[day].map((c) => (
          <li key={c.time + c.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 sm:grid-cols-[6rem_1fr_10rem_6rem] sm:p-5">
            <span dir="ltr" className="text-xl font-bold text-[#C6F432] tabular-nums">
              {c.time}
            </span>
            <span className="text-lg font-bold text-white">{c.name}</span>
            <span className="hidden text-white/60 sm:block">{c.coach}</span>
            <span className={cn("justify-self-end rounded-md px-2.5 py-1 text-xs font-bold", levelColor[c.level])}>{c.level}</span>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

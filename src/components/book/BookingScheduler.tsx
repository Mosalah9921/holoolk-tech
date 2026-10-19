"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarCheck,
  CalendarPlus,
  Check,
  Clock,
  Download,
  MessageCircle,
  Phone,
  Video,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn, whatsappLink } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { ConsentNote } from "@/components/legal/ConsentNote";
import { lp, tr, type Locale } from "@/i18n";

/* ============================================================
   حجز استشارة مجانية — اختيار يوم وساعة بتوقيت القاهرة،
   ثم تأكيد عبر واتساب + إضافة الموعد للتقويم (ملف ics أو جوجل).
   ============================================================ */

const TZ = "Africa/Cairo";
const DURATION_MIN = 30;
const SLOTS = ["10:00", "11:00", "12:00", "13:00", "15:00", "16:00", "17:00"];
const DAYS_AHEAD = 14;
const OFF_DAY = 5; // الجمعة

const methods: { id: string; label: { ar: string; en: string }; icon: LucideIcon }[] = [
  { id: "video", label: { ar: "مكالمة فيديو (Google Meet)\u200F", en: "Video call (Google Meet)" }, icon: Video },
  { id: "whatsapp", label: { ar: "مكالمة واتساب", en: "WhatsApp call" }, icon: MessageCircle },
  { id: "phone", label: { ar: "مكالمة هاتفية", en: "Phone call" }, icon: Phone },
];
const topics = {
  ar: ["موقع أو نظام جديد", "تطوير موقع حالي", "متجر إلكتروني", "استشارة تقنية عامة"],
  en: ["A new website or system", "Improving my current website", "An online store", "General technical advice"],
};
const intlLocale = (l: Locale) => (l === "en" ? "en-GB" : "ar-EG-u-nu-latn");

/** تاريخ اليوم في القاهرة بصيغة y-m-d */
function cairoParts(d: Date) {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(d);
  const get = (t: string) => Number(p.find((x) => x.type === t)?.value);
  return { y: get("year"), m: get("month"), d: get("day"), h: get("hour") % 24, min: get("minute") };
}

/** يحوّل وقت القاهرة إلى لحظة UTC حقيقية (مع مراعاة التوقيت الصيفي) */
function cairoToDate(y: number, m: number, d: number, h: number, min: number) {
  const guess = Date.UTC(y, m - 1, d, h, min);
  const c = cairoParts(new Date(guess));
  const asUtc = Date.UTC(c.y, c.m - 1, c.d, c.h, c.min);
  return new Date(guess - (asUtc - guess));
}

type Day = { key: string; y: number; m: number; d: number; weekday: string; dayNum: string; month: string };

function buildDays(locale: Locale): Day[] {
  const L = intlLocale(locale);
  const now = cairoParts(new Date());
  const out: Day[] = [];
  for (let i = 0; out.length < DAYS_AHEAD && i < DAYS_AHEAD + 4; i++) {
    const base = new Date(Date.UTC(now.y, now.m - 1, now.d + i, 12));
    if (base.getUTCDay() === OFF_DAY) continue;
    const y = base.getUTCFullYear();
    const m = base.getUTCMonth() + 1;
    const d = base.getUTCDate();
    out.push({
      key: `${y}-${m}-${d}`,
      y,
      m,
      d,
      weekday: new Intl.DateTimeFormat(L, { weekday: "short", timeZone: "UTC" }).format(base),
      dayNum: new Intl.DateTimeFormat(L, { day: "numeric", timeZone: "UTC" }).format(base),
      month: new Intl.DateTimeFormat(L, { month: "short", timeZone: "UTC" }).format(base),
    });
  }
  return out;
}

function fmtSlot(s: string, locale: Locale = "ar") {
  const [h, m] = s.split(":").map(Number);
  const suffix = locale === "en" ? (h < 12 ? "AM" : "PM") : h < 12 ? "ص" : "م";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

const icsDate = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function BookingScheduler({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const fmt = (s: string) => fmtSlot(s, locale);
  const days = useMemo(() => buildDays(locale), [locale]);
  const [dayKey, setDayKey] = useState(days[0]?.key ?? "");
  const [slot, setSlot] = useState("");
  const [method, setMethod] = useState(methods[0].id);
  const [topicIdx, setTopicIdx] = useState(0);
  const topic = topics[locale][topicIdx];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [booked, setBooked] = useState<{ start: Date; end: Date; label: string } | null>(null);

  const day = days.find((x) => x.key === dayKey)!;
  const now = Date.now();
  const isPast = (s: string) => {
    const [h, m] = s.split(":").map(Number);
    return cairoToDate(day.y, day.m, day.d, h, m).getTime() < now + 60 * 60 * 1000;
  };
  const dateLabel = day ? new Intl.DateTimeFormat(intlLocale(locale), { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(day.y, day.m - 1, day.d, 12))) : "";
  const methodLabel = methods.find((x) => x.id === method)!.label[locale];

  function confirm(e: React.FormEvent) {
    e.preventDefault();
    if (!slot) return setError(t("يُرجى اختيار الموعد المناسب.", "Please choose a time slot."));
    if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 8) return setError(t("يُرجى إدخال الاسم ورقم هاتف صحيح.", "Please enter your name and a valid phone number."));
    setError("");
    const [h, m] = slot.split(":").map(Number);
    const start = cairoToDate(day.y, day.m, day.d, h, m);
    const end = new Date(start.getTime() + DURATION_MIN * 60 * 1000);
    const label = t(`${dateLabel} — ${fmt(slot)} بتوقيت القاهرة`, `${dateLabel} — ${fmt(slot)} (Cairo time)`);
    const text = (
      locale === "en"
        ? [
            "Hello Holoolk Tech, I'd like to book a free consultation:",
            `• Time: ${label}`,
            `• Session type: ${methodLabel}`,
            `• Topic: ${topic}`,
            `• Name: ${name}`,
            `• Phone: ${phone}`,
          ]
        : [
            "مرحباً حلولك تيك، أود حجز استشارة مجانية:",
            `• الموعد: ${label}`,
            `• طريقة الجلسة: ${methodLabel}`,
            `• الموضوع: ${topic}`,
            `• الاسم: ${name}`,
            `• الهاتف: ${phone}`,
          ]
    ).join("\n");
    window.open(whatsappLink(siteConfig.contact.whatsapp, text), "_blank", "noopener,noreferrer");
    trackEvent("lead", { source: "booking", method, topic });
    setBooked({ start, end, label });
  }

  if (booked) {
    const title = t(`استشارة مع ${siteConfig.name}`, `Consultation with ${siteConfig.nameEn}`);
    const details = `${topic} — ${methodLabel}`;
    const gcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${icsDate(booked.start)}/${icsDate(booked.end)}&details=${encodeURIComponent(details)}`;
    const downloadIcs = () => {
      const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Holoolk Tech//Booking//AR",
        "BEGIN:VEVENT",
        `UID:${booked.start.getTime()}@holoolk.com`,
        `DTSTAMP:${icsDate(new Date())}`,
        `DTSTART:${icsDate(booked.start)}`,
        `DTEND:${icsDate(booked.end)}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${details}`,
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");
      const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "holoolk-consultation.ics";
      a.click();
      URL.revokeObjectURL(url);
    };
    return (
      <div role="status" className="mx-auto max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <CalendarCheck className="size-8" aria-hidden />
        </span>
        <h2 className="mt-5 text-3xl font-black">{t("تم إرسال طلب الحجز.", "Your booking request has been sent.")}</h2>
        <p className="mt-3 leading-8 text-slate-600">{t("سنؤكد موعدك عبر واتساب في أقرب وقت خلال ساعات العمل.", "We’ll confirm your appointment on WhatsApp as soon as possible during business hours.")}</p>
        <p className="mt-6 rounded-2xl bg-slate-50 px-5 py-4 font-bold text-slate-900">{booked.label}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a href={gcal} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 text-sm font-bold text-white hover:bg-brand-700">
            <CalendarPlus className="size-4" aria-hidden />
            {t("أضف إلى تقويم Google", "Add to Google Calendar")}
          </a>
          <button type="button" onClick={downloadIcs} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50">
            <Download className="size-4" aria-hidden />
            {t("تحميل ملف التقويم", "Download calendar file")}
          </button>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-6 text-sm text-slate-500">
          {t("للاستعداد للجلسة، يمكنك", "To prepare for the session, you can")}{" "}
          <Link href={lp(locale, "/start")} className="font-bold text-brand-600 hover:text-brand-700">
            {t("تجهيز ملخص مشروعك", "put together a project brief")}
          </Link>{" "}
          {t("مسبقاً.", "in advance.")}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={confirm} className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]" noValidate>
      {/* الموعد */}
      <div className="min-w-0 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-black">{t("اختر اليوم", "Choose a day")}</h2>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Clock className="size-3.5" aria-hidden />
            {t("بتوقيت القاهرة", "Cairo time")}
          </span>
        </div>
        <div role="radiogroup" aria-label={t("اليوم", "Day")} className="mt-5 flex snap-x gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
          {days.map((x) => {
            const on = x.key === dayKey;
            return (
              <button
                key={x.key}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => {
                  setDayKey(x.key);
                  setSlot("");
                }}
                className={cn(
                  "flex w-[4.5rem] shrink-0 snap-start flex-col items-center rounded-2xl border py-3 transition-colors",
                  on ? "border-brand-600 bg-brand-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
                )}
              >
                <span className={cn("text-xs", on ? "text-white/80" : "text-slate-500")}>{x.weekday}</span>
                <span className="mt-0.5 text-xl font-black">{x.dayNum}</span>
                <span className={cn("text-xs", on ? "text-white/80" : "text-slate-500")}>{x.month}</span>
              </button>
            );
          })}
        </div>

        <h2 className="mt-8 text-xl font-black">{t("اختر الساعة", "Choose a time")}</h2>
        <div role="radiogroup" aria-label={t("الساعة", "Time")} className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {SLOTS.map((s) => {
            const past = isPast(s);
            const on = slot === s;
            return (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={on}
                disabled={past}
                onClick={() => setSlot(s)}
                className={cn(
                  "h-11 rounded-xl border text-sm font-bold transition-colors",
                  on ? "border-brand-600 bg-brand-50 text-brand-700 ring-4 ring-brand-600/10" : "border-slate-200 text-slate-700 hover:border-slate-300",
                  past && "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300 line-through hover:border-slate-100",
                )}
              >
                {fmt(s)}
              </button>
            );
          })}
        </div>
        {SLOTS.every(isPast) && <p className="mt-3 text-sm text-slate-500">{t("انتهت مواعيد اليوم، اختر يوماً آخر.", "No more slots today. Please choose another day.")}</p>}

        <h2 className="mt-8 text-xl font-black">{t("طريقة الجلسة", "Session type")}</h2>
        <div role="radiogroup" aria-label={t("طريقة الجلسة", "Session type")} className="mt-5 grid gap-2 sm:grid-cols-3">
          {methods.map(({ id, label, icon: Icon }) => {
            const on = method === id;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setMethod(id)}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-start text-sm font-semibold transition-colors",
                  on ? "border-brand-600 bg-brand-50/60 text-brand-800" : "border-slate-200 text-slate-700 hover:border-slate-300",
                )}
              >
                <Icon className={cn("size-4.5 shrink-0", on ? "text-brand-600" : "text-slate-400")} aria-hidden />
                {label[locale]}
              </button>
            );
          })}
        </div>
      </div>

      {/* البيانات */}
      <div className="flex min-w-0 flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-28 lg:self-start">
        <h2 className="text-xl font-black">{t("بياناتك", "Your details")}</h2>
        <label className="mt-5 block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">{t("موضوع الاستشارة", "Consultation topic")}</span>
          <select value={topicIdx} onChange={(e) => setTopicIdx(Number(e.target.value))} className={inputCls}>
            {topics[locale].map((x, i) => (
              <option key={x} value={i}>
                {x}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-4 block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">
            {t("الاسم", "Name")} <span className="text-brand-600">*</span>
          </span>
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={inputCls} placeholder={t("الاسم الكامل", "Full name")} />
        </label>
        <label className="mt-4 block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">
            {t("رقم الهاتف (واتساب)", "Phone number (WhatsApp)")} <span className="text-brand-600">*</span>
          </span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" dir="ltr" autoComplete="tel" className={cn(inputCls, "rtl:text-end")} placeholder={t("01xxxxxxxxx", "+20 1xx xxx xxxx")} />
        </label>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm">
          <p className="text-slate-500">{t("ملخص الموعد", "Appointment summary")}</p>
          <p className="mt-1 font-bold text-slate-900">{slot ? `${dateLabel} — ${fmt(slot)}` : t("لم يُحدد بعد", "Not selected yet")}</p>
          <p className="mt-1 text-slate-500">
            {DURATION_MIN} {t("دقيقة", "minutes")} · {methodLabel}
          </p>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm font-semibold text-rose-600">
            {error}
          </p>
        )}

        <button data-cta-band type="submit" className="mt-6 flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-600 font-bold text-white shadow-md shadow-brand-600/20 hover:bg-brand-700">
          {t("تأكيد الحجز", "Confirm booking")}
          <ArrowLeft className="size-5" aria-hidden />
        </button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
          <Check className="size-3.5 text-emerald-600" aria-hidden />
          {t("مجانية بالكامل ودون أي التزام", "Completely free, no obligation")}
        </p>
        <ConsentNote className="mt-1" locale={locale} />
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:outline-none";

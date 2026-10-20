"use client";
import { sendToInbox } from "@/config/forms";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  LayoutTemplate,
  RefreshCw,
  RotateCcw,
  Server,
  ShoppingBag,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { getSolutions } from "@/content/solutions";
import { lp, tr, type Locale } from "@/i18n";
import { siteConfig } from "@/config/site";
import { cn, whatsappLink } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { ConsentNote } from "@/components/legal/ConsentNote";

/* ============================================================
   مخطِّط المشروع — معالج من 6 خطوات بيحفظ التقدّم في المتصفح
   ============================================================ */

type TypeOpt = { id: string; label: string; hint: string; icon: LucideIcon; estimate: string };
const typesBy: Record<Locale, TypeOpt[]> = {
  ar: [
    { id: "landing", label: "صفحة هبوط", hint: "لحملة إعلانية أو منتج", icon: LayoutTemplate, estimate: "أسبوع تقريباً" },
    { id: "business", label: "موقع شركة", hint: "موقع تعريفي متعدد الصفحات", icon: Building2, estimate: "من أسبوعين إلى 3 أسابيع" },
    { id: "store", label: "متجر إلكتروني", hint: "منتجات وطلبات ودفع", icon: ShoppingBag, estimate: "من 3 إلى 5 أسابيع" },
    { id: "app", label: "نظام أو منصة", hint: "لوحات تحكم وأنظمة مخصصة", icon: Server, estimate: "من 4 إلى 8 أسابيع" },
    { id: "redesign", label: "تطوير موقع حالي", hint: "تحسين أو إعادة بناء", icon: RefreshCw, estimate: "من أسبوعين إلى 4 أسابيع" },
  ],
  en: [
    { id: "landing", label: "Landing page", hint: "For an ad campaign or a product", icon: LayoutTemplate, estimate: "About 1 week" },
    { id: "business", label: "Company website", hint: "A multi-page business website", icon: Building2, estimate: "2–3 weeks" },
    { id: "store", label: "Online store", hint: "Products, orders and payments", icon: ShoppingBag, estimate: "3–5 weeks" },
    { id: "app", label: "System or platform", hint: "Dashboards and custom systems", icon: Server, estimate: "4–8 weeks" },
    { id: "redesign", label: "Improve my current website", hint: "Upgrade or rebuild", icon: RefreshCw, estimate: "2–4 weeks" },
  ],
};

const featureOptionsBy: Record<Locale, string[]> = {
  ar: [
    "لوحة تحكم بالمحتوى",
    "حجز مواعيد",
    "دفع إلكتروني",
    "تسجيل دخول للعملاء",
    "نسخة باللغة الإنجليزية",
    "مدونة ومقالات",
    "تهيئة متقدمة لمحركات البحث",
    "ربط واتساب ونماذج التواصل",
    "ربط أدوات التحليل والإعلانات",
  ],
  en: [
    "Content dashboard",
    "Appointment booking",
    "Online payments",
    "Customer login",
    "Arabic version",
    "Blog & articles",
    "Advanced SEO",
    "WhatsApp & contact forms",
    "Analytics & ad tracking",
  ],
};

const timelinesBy: Record<Locale, string[]> = {
  ar: ["خلال أسبوعين", "خلال شهر", "خلال 1–3 أشهر", "لم أحدد بعد"],
  en: ["Within 2 weeks", "Within a month", "In 1–3 months", "Not sure yet"],
};
const contentStatesBy: Record<Locale, string[]> = {
  ar: ["المحتوى جاهز لدي", "أحتاج مساعدة في إعداد المحتوى"],
  en: ["My content is ready", "I need help preparing content"],
};

const stepsMetaBy: Record<Locale, { title: string; hint: string }[]> = {
  ar: [
    { title: "نوع المشروع", hint: "ما الذي تريد بناءه؟" },
    { title: "مجال النشاط", hint: "في أي مجال تعمل؟" },
    { title: "المزايا", hint: "اختر كل ما تحتاجه (اختياري)." },
    { title: "الجدول الزمني", hint: "متى تريد إطلاق الموقع؟" },
    { title: "بيانات التواصل", hint: "كيف نتواصل معك؟" },
    { title: "المراجعة والإرسال", hint: "راجع الملخص قبل الإرسال." },
  ],
  en: [
    { title: "Project type", hint: "What would you like to build?" },
    { title: "Industry", hint: "What field is your business in?" },
    { title: "Features", hint: "Pick everything you need (optional)." },
    { title: "Timeline", hint: "When would you like to launch?" },
    { title: "Contact details", hint: "How can we reach you?" },
    { title: "Review & send", hint: "Check the summary before sending." },
  ],
};

type Draft = {
  type: string;
  industry: string;
  industryOther: string;
  features: string[];
  timeline: string;
  content: string;
  name: string;
  business: string;
  phone: string;
  email: string;
  notes: string;
};

const empty: Draft = { type: "", industry: "", industryOther: "", features: [], timeline: "", content: "", name: "", business: "", phone: "", email: "", notes: "" };
const STORAGE_KEY_BASE = "holoolk-start-draft";

export function ProjectWizard({ locale = "ar" }: { locale?: Locale }) {
  const tl = tr(locale);
  const types = typesBy[locale];
  const featureOptions = featureOptionsBy[locale];
  const timelines = timelinesBy[locale];
  const contentStates = contentStatesBy[locale];
  const stepsMeta = stepsMetaBy[locale];
  const solutions = getSolutions(locale);
  const STORAGE_KEY = locale === "en" ? `${STORAGE_KEY_BASE}-en` : STORAGE_KEY_BASE;
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Draft>(empty);
  const [restored, setRestored] = useState(false);
  const [sent, setSent] = useState(false);
  /** رابط واتساب بالطلب — بيظهر كزرار في شاشة النجاح لو المتصفح منع فتحه تلقائياً */
  const [waHref, setWaHref] = useState("");
  const [touched, setTouched] = useState(false);

  // استرجاع المسودة
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { d: Draft; step: number };
        setD({ ...empty, ...saved.d });
        setStep(Math.min(saved.step ?? 0, 5));
        setRestored(true);
      }
    } catch {
      /* المتصفح مانع التخزين — نكمل عادي */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // حفظ المسودة
  useEffect(() => {
    if (sent) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ d, step }));
    } catch {
      /* تجاهل */
    }
  }, [d, step, sent, STORAGE_KEY]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setD((x) => ({ ...x, [key]: value }));
  const type = types.find((t) => t.id === d.type);
  const industryLabel = d.industry === "other" ? d.industryOther || tl("أخرى", "Other") : solutions.find((s) => s.id === d.industry)?.name;

  const valid = useMemo(
    () => [
      !!d.type,
      !!d.industry && (d.industry !== "other" || d.industryOther.trim().length > 1),
      true,
      !!d.timeline && !!d.content,
      d.name.trim().length > 1 && d.phone.replace(/\D/g, "").length >= 8,
      true,
    ],
    [d],
  );

  function next() {
    setTouched(true);
    if (!valid[step]) return;
    setTouched(false);
    setStep((s) => Math.min(s + 1, 5));
    const top = document.getElementById("wizard")?.getBoundingClientRect().top;
    if (top !== undefined && top < 0) window.scrollBy({ top: top - 100, behavior: "smooth" });
  }
  function back() {
    setTouched(false);
    setStep((s) => Math.max(s - 1, 0));
  }
  function reset() {
    setD(empty);
    setStep(0);
    setSent(false);
    setRestored(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* تجاهل */
    }
  }

  const summary = [
    [tl("نوع المشروع", "Project type"), type?.label],
    [tl("المجال", "Industry"), industryLabel],
    [tl("المزايا", "Features"), d.features.length ? d.features.join(tl("، ", ", ")) : tl("لم تُحدد", "None selected")],
    [tl("الإطلاق المطلوب", "Target launch"), d.timeline],
    [tl("المحتوى", "Content"), d.content],
    [tl("الاسم", "Name"), d.name],
    [tl("النشاط", "Business"), d.business || "—"],
    [tl("الهاتف", "Phone"), d.phone],
    [tl("البريد الإلكتروني", "Email"), d.email || "—"],
    [tl("ملاحظات", "Notes"), d.notes || "—"],
  ] as const;

  function submit() {
    const text = [tl("مرحباً حلولك تيك، أرسلت طلب مشروع من الموقع:", "Hello Holoolk Tech, I just submitted a project request on your website:"), ...summary.map(([k, v]) => `• ${k}: ${v}`)].join("\n");
    const href = whatsappLink(siteConfig.contact.whatsapp, text);
    setWaHref(href);
    window.open(href, "_blank", "noopener,noreferrer");
    trackEvent("lead", { source: "wizard", type: d.type, industry: d.industry });
    sendToInbox({ ...d, _subject: tl(`طلب مشروع جديد — ${d.name}`, `New project request — ${d.name}`), _locale: locale });
    setSent(true);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* تجاهل */
    }
  }

  if (sent) return <SuccessScreen name={d.name} waHref={waHref} onReset={reset} locale={locale} />;

  const progress = Math.round((step / 5) * 100);

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-10">
      {/* الخطوات */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="font-bold text-slate-900">{tl(`الخطوة ${step + 1} من 6`, `Step ${step + 1} of 6`)}</span>
          <span className="text-slate-500">{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-linear-to-l ltr:bg-linear-to-r from-brand-600 to-accent-500 transition-all duration-500" style={{ width: `${Math.max(progress, 4)}%` }} />
        </div>
        <ol className="mt-6 hidden gap-1 lg:grid">
          {stepsMeta.map((s, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={s.title}>
                <button
                  type="button"
                  disabled={i > step}
                  onClick={() => setStep(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm transition-colors",
                    current ? "bg-white font-bold text-slate-900 shadow-sm ring-1 ring-slate-200" : done ? "text-slate-700 hover:bg-white" : "text-slate-500",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      done ? "bg-brand-600 text-white" : current ? "bg-brand-50 text-brand-700 ring-2 ring-brand-600" : "bg-slate-100",
                    )}
                  >
                    {done ? <Check className="size-3.5" aria-hidden /> : i + 1}
                  </span>
                  {s.title}
                </button>
              </li>
            );
          })}
        </ol>
        {restored && step > 0 && (
          <p className="mt-5 flex items-start gap-2 rounded-xl bg-accent-50 p-3 text-xs leading-6 text-accent-800">
            <Sparkles className="mt-0.5 size-4 shrink-0" aria-hidden />
            {tl("استعدنا مسودتك السابقة تلقائياً.", "We’ve restored your previous draft automatically.")}
          </p>
        )}
      </aside>

      {/* المحتوى */}
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
        <div key={step} className="animate-fade-up [animation-duration:350ms]">
          <h2 className="text-2xl font-black sm:text-3xl">{stepsMeta[step].title}</h2>
          <p className="mt-1 text-slate-500">{stepsMeta[step].hint}</p>

          <div className="mt-7">
            {step === 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {types.map(({ id, label, hint, icon: Icon }) => (
                  <Choice key={id} selected={d.type === id} onClick={() => set("type", id)} icon={Icon} label={label} hint={hint} />
                ))}
              </div>
            )}

            {step === 1 && (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  {solutions.map(({ id, name, icon: Icon }) => (
                    <Choice key={id} selected={d.industry === id} onClick={() => set("industry", id)} icon={Icon} label={name} />
                  ))}
                  <Choice selected={d.industry === "other"} onClick={() => set("industry", "other")} icon={Sparkles} label={tl("مجال آخر", "Other industry")} />
                </div>
                {d.industry === "other" && (
                  <Field label={tl("ما مجال نشاطك؟", "What’s your industry?")} className="mt-5">
                    <input autoFocus value={d.industryOther} onChange={(e) => set("industryOther", e.target.value)} className={inputCls} placeholder={tl("مثال: مكتب سياحة", "e.g. Travel agency")} />
                  </Field>
                )}
              </>
            )}

            {step === 2 && (
              <div className="flex flex-wrap gap-2.5">
                {featureOptions.map((f) => {
                  const on = d.features.includes(f);
                  return (
                    <button
                      key={f}
                      type="button"
                      aria-pressed={on}
                      onClick={() => set("features", on ? d.features.filter((x) => x !== f) : [...d.features, f])}
                      className={cn(
                        "flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all",
                        on ? "border-brand-600 bg-brand-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
                      )}
                    >
                      {on && <Check className="size-4" aria-hidden />}
                      {f}
                    </button>
                  );
                })}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-7">
                <fieldset>
                  <legend className="mb-3 text-sm font-bold text-slate-900">{tl("موعد الإطلاق المطلوب", "Target launch date")}</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {timelines.map((t) => (
                      <Choice key={t} selected={d.timeline === t} onClick={() => set("timeline", t)} icon={CalendarClock} label={t} />
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="mb-3 text-sm font-bold text-slate-900">{tl("حالة المحتوى (النصوص والصور)", "Content status (text and images)")}</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {contentStates.map((t) => (
                      <Choice key={t} selected={d.content === t} onClick={() => set("content", t)} label={t} />
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {step === 4 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={tl("الاسم", "Name")} required>
                  <input value={d.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className={inputCls} placeholder={tl("الاسم الكامل", "Full name")} />
                </Field>
                <Field label={tl("اسم النشاط أو الشركة", "Business or company name")}>
                  <input value={d.business} onChange={(e) => set("business", e.target.value)} autoComplete="organization" className={inputCls} placeholder={tl("اختياري", "Optional")} />
                </Field>
                <Field label={tl("رقم الهاتف (واتساب)", "Phone number (WhatsApp)")} required>
                  <input value={d.phone} onChange={(e) => set("phone", e.target.value)} type="tel" dir="ltr" autoComplete="tel" className={cn(inputCls, "rtl:text-end")} placeholder={tl("01xxxxxxxxx", "+20 1xx xxx xxxx")} />
                </Field>
                <Field label={tl("البريد الإلكتروني", "Email")}>
                  <input value={d.email} onChange={(e) => set("email", e.target.value)} type="email" dir="ltr" autoComplete="email" className={cn(inputCls, "rtl:text-end")} placeholder="name@example.com" />
                </Field>
                <Field label={tl("ملاحظات إضافية", "Additional notes")} className="sm:col-span-2">
                  <textarea value={d.notes} onChange={(e) => set("notes", e.target.value)} rows={4} className={cn(inputCls, "resize-none leading-7")} placeholder={tl("مواقع تعجبك، أفكار، أو أي تفاصيل تساعدنا…", "Websites you like, ideas, or any details that help us…")} />
                </Field>
              </div>
            )}

            {step === 5 && (
              <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                <dl className="divide-y divide-slate-100 rounded-2xl border border-slate-200">
                  {summary.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[8rem_1fr] ltr:grid-cols-[9rem_1fr] gap-4 px-5 py-3 text-sm">
                      <dt className="text-slate-500">{k}</dt>
                      <dd className="font-semibold break-words text-slate-900">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex flex-col rounded-2xl bg-linear-to-br from-brand-600 to-accent-500 p-6 text-white">
                  <p className="text-sm text-white/80">{tl("المدة التقديرية للتنفيذ", "Estimated delivery time")}</p>
                  <p className="mt-1 text-2xl font-black">{type?.estimate}</p>
                  <p className="mt-3 flex-1 text-sm leading-6 text-white/85">{tl("تُحدد المدة النهائية في المقترح التفصيلي بعد مراجعة طلبك.", "The final timeline is confirmed in a detailed proposal after we review your request.")}</p>
                  <button type="button" onClick={submit} className="mt-6 flex h-12 items-center justify-center gap-2 rounded-xl bg-white font-bold text-brand-700 hover:bg-brand-50">
                    {tl("إرسال الطلب", "Send request")}
                    <ArrowLeft className="size-5" aria-hidden />
                  </button>
                  <p className="mt-2 text-center text-xs text-white/75">{tl("سيُفتح واتساب برسالة تتضمن الملخص.", "WhatsApp will open with your summary ready to send.")}</p>
                  <ConsentNote tone="dark" className="mt-1" locale={locale} />
                </div>
              </div>
            )}
          </div>

          {touched && !valid[step] && (
            <p role="alert" className="mt-5 text-sm font-semibold text-rose-600">
              {step === 4 ? tl("يُرجى إدخال الاسم ورقم هاتف صحيح.", "Please enter your name and a valid phone number.") : tl("يُرجى إكمال الاختيار للمتابعة.", "Please make a selection to continue.")}
            </p>
          )}
        </div>

        <div data-cta-band className="mt-9 flex items-center justify-between gap-3 border-t border-slate-100 pt-6">
          <div className="flex items-center gap-2">
            {step > 0 && (
              <button type="button" onClick={back} className="flex h-11 items-center gap-1.5 rounded-xl px-4 text-sm font-bold text-slate-600 hover:bg-slate-100">
                <ArrowRight className="size-4" aria-hidden />
                {tl("السابق", "Back")}
              </button>
            )}
            {(step > 0 || d.type) && (
              <button type="button" onClick={reset} className="flex h-11 items-center gap-1.5 rounded-xl px-3 text-sm text-slate-500 hover:text-slate-700">
                <RotateCcw className="size-4" aria-hidden />
                {tl("البدء من جديد", "Start over")}
              </button>
            )}
          </div>
          {step < 5 && (
            <button type="button" onClick={next} className="flex h-11 items-center gap-1.5 rounded-xl bg-brand-600 px-6 text-sm font-bold text-white shadow-md shadow-brand-600/20 hover:bg-brand-700">
              {step === 2 && d.features.length === 0 ? tl("تخطَّ", "Skip") : tl("التالي", "Next")}
              <ArrowLeft className="size-4" aria-hidden />
            </button>
          )}
        </div>
        <p className="mt-4 text-xs leading-6 text-slate-500">
          {tl(
            "تُحفظ مسودتك في متصفحك فقط حتى الإرسال، ويمكنك مسحها بزر «البدء من جديد». بعد الإرسال نراجع طلبك ونرد خلال 24 ساعة عمل.",
            "Your draft is saved only in your browser until you send it, and “Start over” clears it. Once you send it, we review your request and reply within 24 business hours.",
          )}
        </p>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:outline-none";

function Choice({ selected, onClick, icon: Icon, label, hint }: { selected: boolean; onClick: () => void; icon?: LucideIcon; label: string; hint?: string }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-4 rounded-2xl border p-4 text-start transition-all",
        selected ? "border-brand-600 bg-brand-50/60 ring-4 ring-brand-600/10" : "border-slate-200 bg-white hover:border-slate-300",
      )}
    >
      {Icon && (
        <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", selected ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-500")}>
          <Icon className="size-5" aria-hidden />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block font-bold text-slate-900">{label}</span>
        {hint && <span className="mt-0.5 block text-sm text-slate-500">{hint}</span>}
      </span>
      <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-full border-2", selected ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300")}>
        {selected && <Check className="size-3" aria-hidden />}
      </span>
    </button>
  );
}

function Field({ label, required, className, children }: { label: string; required?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-brand-600">*</span>}
      </span>
      {children}
    </label>
  );
}

function SuccessScreen({ name, waHref, onReset, locale }: { name: string; waHref: string; onReset: () => void; locale: Locale }) {
  const tl = tr(locale);
  const next = locale === "en"
    ? [
        { title: "Request review", text: "We review your project details during business hours." },
        { title: "Short intro call", text: "We reach out to clarify any details and understand your goals." },
        { title: "Detailed proposal", text: "We send you the scope and timeline within 24 hours." },
      ]
    : [
        { title: "مراجعة الطلب", text: "نراجع تفاصيل مشروعك خلال ساعات العمل." },
        { title: "جلسة تعارف قصيرة", text: "نتواصل معك لاستيضاح أي تفاصيل وفهم أهدافك." },
        { title: "مقترح تفصيلي", text: "نرسل إليك النطاق والجدول الزمني خلال 24 ساعة." },
      ];
  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12" role="status">
      <CheckCircle2 className="mx-auto size-16 text-brand-600" aria-hidden />
      <h2 className="mt-5 text-3xl font-black">{tl("شكراً لك", "Thank you")}{name ? tl(`، ${name.split(" ")[0]}`, `, ${name.split(" ")[0]}`) : ""}.</h2>
      <p className="mt-3 leading-8 text-slate-600">{tl("تم تجهيز طلبك. أكمل الإرسال من واتساب، وإن لم يُفتح تلقائياً اضغط الزر بالأسفل لإرسال نفس الرسالة.", "Your request is ready. Finish sending it on WhatsApp, and if it didn’t open automatically, use the button below to send the same message.")}</p>
      <ol className="mt-8 grid gap-3 text-start sm:grid-cols-3">
        {next.map((s, i) => (
          <li key={s.title} className="rounded-2xl bg-slate-50 p-4">
            <span className="text-sm font-black text-brand-600">{i + 1}</span>
            <p className="mt-1 font-bold text-slate-900">{s.title}</p>
            <p className="mt-1 text-sm leading-6 text-slate-500">{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        {waHref && (
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center rounded-xl bg-[#1a8f4c] px-5 text-sm font-bold text-white hover:bg-[#157a40]">
            {tl("إرسال الطلب عبر واتساب", "Send request on WhatsApp")}
          </a>
        )}
        <Link href={lp(locale, "/work")} className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-700 hover:bg-slate-50">
          {tl("تصفّح أعمالنا", "Browse our work")}
        </Link>
        <button type="button" onClick={onReset} className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-700 hover:bg-slate-50">
          {tl("طلب مشروع آخر", "Request another project")}
        </button>
      </div>
    </div>
  );
}

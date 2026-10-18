"use client";

import { ConsentNote } from "@/components/legal/ConsentNote";
import { useState } from "react";
import { CheckCircle2, Gauge, MousePointerClick, Search, Smartphone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { Section } from "@/components/ui/Section";
import { tr, type Locale } from "@/i18n";

const checks = [
  { icon: Gauge, label: { ar: "سرعة التحميل", en: "Loading speed" } },
  { icon: Smartphone, label: { ar: "التوافق مع الجوال", en: "Mobile friendliness" } },
  { icon: Search, label: { ar: "الظهور في محركات البحث", en: "Search visibility" } },
  { icon: MousePointerClick, label: { ar: "سهولة التواصل", en: "Ease of contact" } },
];

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 focus:outline-none";

/** "فحص مجاني لموقعك" — صاحب موقع قديم بيبعت رابطه، وإنت بترد عليه بتقرير مختصر */
export function FreeAudit({ bare = false, locale = "ar" }: { bare?: boolean; locale?: Locale }) {
  const t = tr(locale);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = (
      locale === "en"
        ? ["Hello Holoolk Tech, I'd like a free audit of my website:", `Name: ${name}`, `Website: ${url}`]
        : ["مرحباً حلولك تيك، أرغب في تقييم مجاني لموقعي:", `الاسم: ${name}`, `رابط الموقع: ${url}`]
    ).join("\n");
    window.open(whatsappLink(siteConfig.contact.whatsapp, text), "_blank", "noopener,noreferrer");
    trackEvent("lead", { source: "free_audit", locale });
    setSent(true);
  }

  return (
    <Section id="audit" aria-labelledby="audit-title" className={bare ? "pt-0 sm:pt-0 lg:pt-0" : "bg-white"}>
      <div className="grid items-center gap-8 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          {bare ? (
            <h2 id="audit-title" className="text-2xl font-black">{t("ماذا يشمل التقييم؟", "What does the audit cover?")}</h2>
          ) : (
            <h2 id="audit-title" className="text-3xl leading-[1.25] font-black tracking-tight sm:text-4xl">
              {t("تقييم مجاني لموقعك الحالي.", "A free audit of your current website.")}
            </h2>
          )}
          {!bare && (
            <p className="mt-4 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
            {t(
              "أرسل رابط موقعك، وسنوافيك خلال 48 ساعة بتقرير موجز يوضح أبرز ما قد يُفقدك العملاء، مع توصيات عملية لمعالجته، دون أي التزام.",
              "Send us your website link, and within 48 hours we'll send a short report on what may be costing you customers, with practical fixes and no obligation.",
            )}
          </p>
          )}
          <ul className="mt-7 flex flex-wrap gap-2">
            {checks.map(({ icon: Icon, label: lb }) => {
              const label = lb[locale];
              return (
              <li key={label} className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                <Icon className="size-4 text-accent-500" aria-hidden />
                {label}
              </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-7">
          {sent ? (
            <div role="status" className="py-6 text-center">
              <CheckCircle2 className="mx-auto size-12 text-brand-600" aria-hidden />
              <p className="mt-4 text-lg font-bold text-slate-900">{t("تم استلام طلبك بنجاح", "Request received")}</p>
              <p className="mt-1 text-sm text-slate-600">{t("سنرسل إليك التقرير عبر واتساب خلال 48 ساعة.", "We'll send your report on WhatsApp within 48 hours.")}</p>
              <button type="button" onClick={() => setSent(false)} className="mt-4 text-sm font-bold text-brand-600 underline underline-offset-4">
                {t("تقييم موقع آخر", "Audit another website")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">{t("رابط الموقع", "Website URL")}</span>
                <input required type="url" dir="ltr" inputMode="url" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} className={inputCls} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">{t("الاسم", "Name")}</span>
                <input required autoComplete="name" placeholder={t("الاسم أو اسم الشركة", "Your name or company")} value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
              </label>
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center rounded-xl bg-brand-600 font-bold text-white shadow-md shadow-brand-600/20 transition-colors hover:bg-brand-700"
              >
                {t("اطلب التقييم المجاني", "Request my free audit")}
              </button>
              <ConsentNote locale={locale} />
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

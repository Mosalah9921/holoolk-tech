"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { getFaq, faqCategories, faqCategoryLabel, type FaqCategory } from "@/content/faq";
import { tr, type Locale } from "@/i18n";
import { siteConfig } from "@/config/site";
import { cn, whatsappLink } from "@/lib/utils";

const norm = (s: string) =>
  s.replace(/[ً-ٰٟ]/g, "").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").toLowerCase();

/** الأسئلة الشائعة: بحث + تصنيف — ويقرأ ?q= من الرابط (من البحث السريع) */
export function FaqExplorer({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const faq = getFaq(locale);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FaqCategory | "الكل">("الكل");
  const [openQ, setOpenQ] = useState<string | null>(faq[0]?.question ?? null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) {
      setOpenQ(q);
      setTimeout(() => document.getElementById(`q-${faq.findIndex((f) => f.question === q)}`)?.scrollIntoView({ block: "center" }), 50);
    }
  }, []);

  const list = useMemo(() => {
    const q = norm(query.trim());
    return faq
      .map((item, i) => ({ ...item, i }))
      .filter((f) => (category === "الكل" || f.category === category) && (!q || norm(f.question + " " + f.answer).includes(q)));
  }, [query, category]);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <label className="relative block">
          <span className="sr-only">{t("ابحث في الأسئلة", "Search the questions")}</span>
          <Search className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("ابحث في الأسئلة…", "Search the questions…")}
            className="h-13 w-full rounded-2xl border border-slate-200 bg-white ps-12 pe-4 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 focus:outline-none"
          />
        </label>

        <ul className="mt-5 flex flex-wrap gap-2 lg:flex-col">
          {(["الكل", ...faqCategories] as const).map((c) => {
            const count = c === "الكل" ? faq.length : faq.filter((f) => f.category === c).length;
            return (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors",
                    category === c ? "bg-brand-600 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
                  )}
                >
                  {c === "الكل" ? t("الكل", "All") : faqCategoryLabel(locale, c)}
                  <span className={cn("rounded-full px-2 text-xs", category === c ? "bg-white/20" : "bg-slate-100 text-slate-500")}>{count}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 hidden rounded-2xl border border-slate-200 bg-white p-5 lg:block">
          <p className="font-bold text-slate-900">{t("لم تجد إجابتك؟", "Didn’t find your answer?")}</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">{t("نرد على استفسارك مباشرة عبر واتساب.", "We’ll answer your question directly on WhatsApp.")}</p>
          <a
            href={whatsappLink(siteConfig.contact.whatsapp, t("مرحباً حلولك تيك، لدي استفسار:", "Hello Holoolk Tech, I have a question:"))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-10 items-center rounded-xl bg-brand-600 px-4 text-sm font-bold text-white hover:bg-brand-700"
          >
            {t("أرسل استفسارك", "Send your question")}
          </a>
        </div>
      </aside>

      <div>
        <p className="mb-3 text-sm text-slate-500" aria-live="polite">
          {list.length} {list.length === 1 ? t("سؤال", "question") : t("أسئلة", "questions")}
        </p>
        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
            <p className="font-bold text-slate-900">{t("لا توجد أسئلة مطابقة.", "No matching questions.")}</p>
            <p className="mt-1 text-sm text-slate-600">{t("جرّب كلمة أخرى، أو أرسل سؤالك عبر واتساب.", "Try another keyword, or send us your question on WhatsApp.")}</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 rounded-[1.75rem] border border-slate-200 bg-white px-6 shadow-sm sm:px-8">
            {list.map((item) => {
              const isOpen = openQ === item.question;
              return (
                <div key={item.question} id={`q-${item.i}`} className="scroll-mt-28">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`a-${item.i}`}
                      onClick={() => setOpenQ(isOpen ? null : item.question)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-start text-lg font-bold text-slate-900"
                    >
                      <span>
                        {item.question}
                        <span className="ms-2 align-middle text-xs font-semibold text-slate-500">{faqCategoryLabel(locale, item.category)}</span>
                      </span>
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-full ring-1 transition-all",
                          isOpen ? "rotate-45 bg-brand-600 text-white ring-brand-600" : "bg-white text-brand-600 ring-slate-200",
                        )}
                      >
                        <Plus className="size-4" aria-hidden />
                      </span>
                    </button>
                  </h3>
                  <div id={`a-${item.i}`} hidden={!isOpen}>
                    <p className="-mt-1 pb-6 leading-8 text-slate-600">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

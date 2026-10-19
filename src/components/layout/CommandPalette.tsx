"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, FileText, Search, X } from "lucide-react";
import type { SearchEntry } from "@/config/search-index";
import { cn } from "@/lib/utils";
import { tr, type Locale } from "@/i18n";

const OPEN_EVENT = "holoolk:open-search";

/** افتح البحث السريع من أي مكان */
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/** توحيد الحروف العربية عشان البحث يلاقي "أسعار" لو كتبت "اسعار" */
function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[ً-ٰٟ]/g, "") // التشكيل
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/\s+/g, " ")
    .trim();
}

type Indexed = SearchEntry & { key: string };
const cache: Partial<Record<Locale, Indexed[]>> = {};
/** تحميل الفهرس عند أول فتح فقط (ملف منفصل) */
async function loadIndex(locale: Locale): Promise<Indexed[]> {
  if (cache[locale]) return cache[locale]!;
  const { getSearchIndex } = await import("@/config/search-index");
  cache[locale] = getSearchIndex(locale).map((e) => ({ ...e, key: normalize(`${e.title} ${e.hint ?? ""} ${e.group}`) }));
  return cache[locale]!;
}

/** بحث سريع في كل صفحات الموقع — Ctrl+K أو ⌘K */
export function CommandPalette({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [indexed, setIndexed] = useState<Indexed[]>(cache[locale] ?? []);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    if (!cache[locale]) loadIndex(locale).then(setIndexed);
    setQuery("");
    setActive(0);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open, locale]);

  const results = useMemo(() => {
    const q = normalize(query);
    const list = q ? indexed.filter((e) => q.split(" ").every((w) => e.key.includes(w))) : indexed.filter((e) => !e.href.includes("/faq?"));
    return list.slice(0, 40);
  }, [query, indexed]);

  const grouped = useMemo(() => {
    const map = new Map<string, (SearchEntry & { index: number })[]>();
    results.forEach((r, index) => {
      if (!map.has(r.group)) map.set(r.group, []);
      map.get(r.group)!.push({ ...r, index });
    });
    return [...map.entries()];
  }, [results]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function go(entry: SearchEntry | undefined) {
    if (!entry) return;
    setOpen(false);
    router.push(entry.href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label={t("البحث في الموقع", "Search the website")}>
      <div className="animate-fade-up absolute inset-0 bg-slate-900/40 backdrop-blur-sm [animation-duration:200ms]" onClick={() => setOpen(false)} />
      <div className="animate-fade-up relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl [animation-duration:250ms]" onKeyDown={onKeyDown}>
        <div className="flex items-center gap-3 border-b border-slate-100 px-5">
          <Search className="size-5 shrink-0 text-slate-400" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("ابحث عن خدمة أو صفحة أو سؤال…", "Search for a service, page or question…")}
            className="h-14 flex-1 bg-transparent text-base text-slate-900 placeholder:text-slate-500 focus:outline-none"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `search-item-${active}` : undefined}
          />
          <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label={t("إغلاق البحث", "Close search")}>
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <ul id="search-results" ref={listRef} role="listbox" className="max-h-[55vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-4 py-10 text-center text-sm text-slate-500">
              {t(`لا توجد نتائج مطابقة لـ "${query}". جرّب كلمة أخرى، أو تواصل معنا مباشرة.`, `No results for "${query}". Try another word, or contact us directly.`)}
            </li>
          )}
          {grouped.map(([group, items]) => (
            <li key={group} role="presentation">
              <p className="px-3 pt-3 pb-1.5 text-xs font-bold text-slate-500">{group}</p>
              <ul role="presentation">
                {items.map((item) => {
                  const Icon = item.icon ?? FileText;
                  const isActive = item.index === active;
                  return (
                    <li
                      key={item.href}
                      id={`search-item-${item.index}`}
                      data-index={item.index}
                      role="option"
                      aria-selected={isActive}
                      onMouseMove={() => setActive(item.index)}
                      onClick={() => go(item)}
                      className={cn("flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5", isActive ? "bg-brand-50" : "")}
                    >
                      <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", isActive ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-500")}>
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-slate-900">{item.title}</span>
                        {item.hint && <span className="block truncate text-xs text-slate-500">{item.hint}</span>}
                      </span>
                      {isActive && <CornerDownLeft className="size-4 shrink-0 text-brand-600" aria-hidden />}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-2.5 text-xs text-slate-500">
          <span>{t("↑ ↓ للتنقل · Enter للفتح · Esc للإغلاق", "↑ ↓ to navigate · Enter to open · Esc to close")}</span>
          <span className="font-semibold text-slate-500">{t("حلولك تيك", "Holoolk Tech")}</span>
        </div>
      </div>
    </div>
  );
}

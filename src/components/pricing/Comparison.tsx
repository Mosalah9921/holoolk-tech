import { Check, Minus } from "lucide-react";
import { getComparison, getPackages, type ComparisonRow } from "@/content/pricing";
import { siteConfig } from "@/config/site";
import { tr, type Locale } from "@/i18n";
import { cn, whatsappLink } from "@/lib/utils";
import { MobileCollapse } from "@/components/ui/MobileCollapse";

/**
 * مقارنة الباقات — المزايا مقسّمة على مجموعات (التصميم، التسويق، الإدارة، الدعم).
 * - التابلت والكمبيوتر: جدول بأعمدة ثابتة، عمود الميزة بعرض محسوب، والعمود الأكثر طلباً مميز، وزر طلب عرض أسفل كل باقة.
 * - الموبايل: رؤوس الباقات ثابتة أثناء التمرير، وكل ميزة سطر عنوان + 3 خانات تحته.
 */
export function Comparison({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const packages = getPackages(locale);
  const rows: ComparisonRow[] = [
    ...getComparison(locale),
    { label: t("مدة التنفيذ", "Delivery time"), values: packages.map((p) => p.timeline) },
  ];
  const shortName = (name: string) => name.replace(/^باقة\s+/, "");
  const quote = (name: string) =>
    whatsappLink(
      siteConfig.contact.whatsapp,
      t(`مرحباً حلولك تيك، أرغب في الحصول على عرض تفصيلي لـ "${name}".`, `Hello Holoolk Tech, I'd like a detailed quote for the "${name}" package.`),
    );

  const value = (v: boolean | string, mobile = false) =>
    v === true ? (
      <span className="mx-auto flex size-6 items-center justify-center rounded-full bg-brand-600/10 text-brand-700">
        <Check className="size-3.5" strokeWidth={3} aria-label={t("متوفر", "Included")} />
      </span>
    ) : v === false ? (
      <Minus className="mx-auto size-4 text-slate-300" aria-label={t("غير متوفر", "Not included")} />
    ) : (
      <span className={cn("font-bold text-slate-800", mobile ? "text-[11px] leading-4" : "text-[13px] leading-5")}>{v}</span>
    );

  return (
    <>
      {/* ===== التابلت والكمبيوتر ===== */}
      <div className="mx-auto hidden max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_-30px_rgb(15_23_42/0.25)] md:block">
        <table className="w-full table-fixed border-collapse text-sm">
          <caption className="sr-only">{t("مقارنة مزايا الباقات", "Package feature comparison")}</caption>
          <colgroup>
            <col className="w-[36%] lg:w-[31%]" />
            {packages.map((p) => (
              <col key={p.id} />
            ))}
          </colgroup>
          <thead>
            <tr className="border-b border-slate-200">
              <th scope="col" className="bg-slate-50 px-6 py-5 text-start align-middle">
                <span className="block text-base font-black text-slate-900">{t("المزايا", "Features")}</span>
                <span className="mt-0.5 block text-xs font-medium text-slate-500">{t("مقارنة بين الباقات الثلاث", "Across all three packages")}</span>
              </th>
              {packages.map((p) => (
                <th key={p.id} scope="col" className={cn("relative px-3 py-5 text-center align-middle", p.popular ? "bg-brand-600 text-white" : "bg-slate-50 text-slate-900")}>
                  {p.popular && (
                    <span className="absolute inset-x-0 top-1.5 mx-auto w-fit rounded-full bg-white/20 px-2 text-[10px] leading-4 font-bold">
                      {t("مُوصى به", "Recommended")}
                    </span>
                  )}
                  <span className="block text-[15px] leading-6 font-black">{p.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <Group key={row.label} row={row} colSpan={packages.length + 1}>
                <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50/70">
                  <th scope="row" className="px-6 py-3.5 text-start font-semibold text-slate-700">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={i} className={cn("px-3 py-3.5 text-center", packages[i]?.popular && "bg-brand-50/70")}>
                      {value(v)}
                    </td>
                  ))}
                </tr>
              </Group>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="px-6 py-5 text-xs leading-5 text-slate-500">{t("السعر النهائي يُحدَّد في عرض مكتوب بعد مناقشة متطلباتك.", "Final pricing is set in a written proposal after we discuss your needs.")}</td>
              {packages.map((p) => (
                <td key={p.id} className={cn("px-3 py-5 text-center", p.popular && "bg-brand-50/70")}>
                  <a
                    href={quote(p.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex h-10 items-center justify-center rounded-xl px-4 text-[13px] font-bold whitespace-nowrap transition-colors",
                      p.popular ? "bg-brand-600 text-white shadow-md shadow-brand-600/20 hover:bg-brand-700" : "border border-slate-200 bg-white text-slate-800 hover:border-brand-300 hover:text-brand-700",
                    )}
                  >
                    {t("اطلب عرضاً", "Get a quote")}
                  </a>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* ===== الموبايل ===== */}
      <div className="overflow-clip rounded-2xl border border-slate-200 bg-white shadow-sm md:hidden">
      <MobileCollapse more={t(`عرض كل المزايا (${rows.length})`, `Show all features (${rows.length})`)} less={t("إخفاء التفاصيل", "Show less")} buttonClassName="mx-auto mb-3 w-[calc(100%-1.5rem)]">
      <div role="table" aria-label={t("مقارنة مزايا الباقات", "Package feature comparison")}>
        {/* رؤوس الباقات — ثابتة أثناء التمرير (overflow-clip مش hidden عشان الـ sticky يشتغل) */}
        <div role="row" className="sticky top-[4.75rem] z-10 grid grid-cols-3 border-b border-slate-200 bg-white/95 backdrop-blur">
          {packages.map((p) => (
            <div
              key={p.id}
              role="columnheader"
              className={cn("flex min-h-16 flex-col items-center justify-center px-1 py-2.5 text-center", p.popular ? "bg-brand-600 text-white" : "text-slate-900")}
            >
              {p.popular && <span className="mb-1 rounded-full bg-white/20 px-1.5 text-[10px] leading-4 font-bold">{t("مُوصى به", "Recommended")}</span>}
              <span className="text-[13px] leading-4 font-black">{shortName(p.name)}</span>
            </div>
          ))}
        </div>
        {rows.map((row) => (
          <div key={row.label} role="rowgroup">
            {row.group && (
              <div role="row" className="border-b border-slate-100 bg-slate-50 px-4 py-2 text-xs font-black text-brand-700">
                <span role="cell">{row.group}</span>
              </div>
            )}
            <div role="row" className="border-b border-slate-100 last:border-0">
              <div role="rowheader" className="px-4 pt-3 text-center text-xs font-bold text-slate-600">
                {row.label}
              </div>
              <div className="grid grid-cols-3 items-center pt-2 pb-3">
                {row.values.map((v, i) => (
                  <div key={i} role="cell" className="flex min-h-7 items-center justify-center px-1 text-center">
                    {value(v, true)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      </MobileCollapse>
        <div className="grid grid-cols-3 gap-1.5 border-t border-slate-200 bg-slate-50/70 p-2">
          {packages.map((p) => (
            <a
              key={p.id}
              href={quote(p.name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(`اطلب عرضاً لـ ${p.name}`, `Get a quote for ${p.name}`)}
              className={cn(
                "inline-flex h-10 items-center justify-center rounded-xl text-xs font-bold",
                p.popular ? "bg-brand-600 text-white" : "border border-slate-200 bg-white text-slate-800",
              )}
            >
              {t("اطلب عرضاً", "Get a quote")}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

/** صف عنوان المجموعة (لو الصف أول مجموعة) + الصف نفسه */
function Group({ row, colSpan, children }: { row: ComparisonRow; colSpan: number; children: React.ReactNode }) {
  return (
    <>
      {row.group && (
        <tr className="border-b border-slate-100 bg-slate-50/80">
          <th scope="colgroup" colSpan={colSpan} className="px-6 pt-4 pb-2 text-start text-xs font-black tracking-wide text-brand-700">
            {row.group}
          </th>
        </tr>
      )}
      {children}
    </>
  );
}

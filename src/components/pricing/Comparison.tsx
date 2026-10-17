import { Check, Minus } from "lucide-react";
import { getComparison, getPackages } from "@/content/pricing";
import { tr, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

/** جدول مقارنة تفصيلي بين الباقات */
export function Comparison({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const comparison = getComparison(locale);
  const packages = getPackages(locale);
  return (
    <div className="overflow-x-auto rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <caption className="sr-only">{t("مقارنة مزايا الباقات", "Package feature comparison")}</caption>
        <thead>
          <tr className="border-b border-slate-200">
            <th scope="col" className="w-[34%] p-5 text-start font-bold text-slate-500">
              {t("الميزة", "Feature")}
            </th>
            {packages.map((p) => (
              <th key={p.id} scope="col" className={cn("p-5 text-center", p.popular && "bg-brand-50/70")}>
                <span className="block text-base font-black text-slate-900">{p.name}</span>
                {p.popular && <span className="mt-1 inline-block rounded-full bg-brand-600 px-2.5 py-0.5 text-[11px] font-bold text-white">{t("الأكثر طلباً", "Most popular")}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.map((row) => (
            <tr key={row.label} className="border-b border-slate-100 last:border-0">
              <th scope="row" className="p-4 ps-5 text-start font-semibold text-slate-700">
                {row.label}
              </th>
              {row.values.map((v, i) => (
                <td key={i} className={cn("p-4 text-center", packages[i]?.popular && "bg-brand-50/70")}>
                  {v === true ? (
                    <Check className="mx-auto size-5 text-brand-600" aria-label={t("متوفر", "Included")} />
                  ) : v === false ? (
                    <Minus className="mx-auto size-5 text-slate-300" aria-label={t("غير متوفر", "Not included")} />
                  ) : (
                    <span className="font-semibold text-slate-800">{v}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <th scope="row" className="p-4 ps-5 text-start font-semibold text-slate-700">
              {t("مدة التنفيذ", "Delivery time")}
            </th>
            {packages.map((p) => (
              <td key={p.id} className={cn("p-4 text-center font-semibold text-slate-800", p.popular && "bg-brand-50/70")}>
                {p.timeline}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

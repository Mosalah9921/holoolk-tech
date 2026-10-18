import { WalletCards } from "lucide-react";
import { getPaymentStages } from "@/content/pricing";
import { tr, type Locale } from "@/i18n";

/** نظام الدفعات تحت جدول المقارنة */
export function PaymentTerms({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const paymentStages = getPaymentStages(locale);
  return (
    <div className="mx-auto mt-6 max-w-5xl rounded-3xl border border-brand-100 bg-brand-50/60 p-5 sm:p-6">
      <p className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
        <WalletCards className="size-5 text-brand-600" aria-hidden />
        {t("نظام الدفع: على مراحل واضحة مرتبطة بالإنجاز", "Payment terms: clear milestones tied to delivery")}
      </p>
      <ol className="mt-4 grid gap-3 sm:grid-cols-3">
        {paymentStages.map(({ percent, label }, i) => (
          <li key={label} className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-brand-100">
            <span className="text-2xl font-black text-brand-600 tabular-nums" dir="ltr">
              {percent}%
            </span>
            <span className="text-sm leading-6 text-slate-600">
              <span className="sr-only">{t(`المرحلة ${i + 1}: `, `Stage ${i + 1}: `)}</span>
              {label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

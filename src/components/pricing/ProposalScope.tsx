import { CalendarClock, FileText, Globe2, LifeBuoy, PenLine, Receipt } from "lucide-react";
import { tr, type Locale } from "@/i18n";

/** «ما يحدده العرض المكتوب» — يوضّح ما يدخل وما لا يدخل في التكلفة قبل الاتفاق */
export function ProposalScope({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const items = [
    { icon: PenLine, title: t("جولات التعديل", "Revision rounds"), text: t("عددها في كل مرحلة مكتوب في العرض.", "The number per stage is set in the proposal.") },
    { icon: FileText, title: t("المحتوى والمنتجات", "Content and products"), text: t("كتابة المحتوى وإدخال المنتجات تُضاف للعرض إن طلبتها.", "Copywriting and product entry are added if you need them.") },
    { icon: Receipt, title: t("الرسوم الخارجية", "Third-party fees"), text: t("رسوم بوابات الدفع والاشتراكات الخارجية تُدفع لمزوّدها مباشرة.", "Payment-gateway fees and external subscriptions are paid to the provider.") },
    { icon: Globe2, title: t("الدومين والاستضافة", "Domain and hosting"), text: t("مشمولان للسنة الأولى في الباقات التي تذكرهما، والتجديد بسعر المزوّد.", "Included for year one where the package lists them; renewal at the provider’s price.") },
    { icon: LifeBuoy, title: t("الدعم بعد التسليم", "Support after delivery"), text: t("30 يوماً إلى 3 أشهر حسب الباقة، تشمل إصلاح الأخطاء والتعديلات البسيطة، ثم عقد صيانة اختياري يشمل النسخ الاحتياطي.", "30 days to 3 months by package, covering bug fixes and small edits, then an optional care plan that includes backups.") },
    { icon: CalendarClock, title: t("بداية المدة", "When the timeline starts"), text: t("بعد اعتماد العرض واستلام المحتوى الأساسي.", "After the proposal is approved and core content is received.") },
  ];
  return (
    <div className="mx-auto mt-6 max-w-5xl rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
      <p className="text-sm font-black text-slate-900">{t("ما يحدده العرض المكتوب بوضوح", "What the written proposal spells out")}</p>
      <p className="mt-1 text-[13px] leading-6 text-slate-600">
        {t("تستلم العرض المكتوب بالنطاق والتكلفة والجدول الزمني خلال 24 ساعة عمل من مكالمة تحديد المتطلبات، دون أي التزام.", "You receive the written proposal with scope, cost and timeline within 24 business hours of the requirements call, with no obligation.")}
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
              <Icon className="size-[1.125rem]" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold text-slate-900">{title}</span>
              <span className="mt-0.5 block text-[13px] leading-6 text-slate-600">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

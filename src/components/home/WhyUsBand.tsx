import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getReasons } from "@/content/why-us";
import { lp, tr, type Locale } from "@/i18n";

/** الرئيسية: «لماذا حلولك تيك» — 6 أسباب حقيقية نقدر نلتزم بيها، بدون أرقام أو ادعاءات */
export function WhyUsBand({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const reasons = getReasons(locale);
  return (
    <Section id="why-us" aria-labelledby="why-us-title">
      <SectionHeading
        id="why-us-title"
        title={t("لماذا يختارنا أصحاب الأنشطة؟", "Why businesses choose us")}
        description={t(
          "لا نعدك بما لا نستطيع تنفيذه. هذا ما نلتزم به في كل مشروع، مكتوباً وواضحاً من البداية.",
          "We don’t promise what we can’t deliver. This is what we commit to on every project, clearly and in writing from day one.",
        )}
      >
        <Link href={lp(locale, "/about")} className="group inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-800">
          {t("تعرّف علينا أكثر", "More about us")}
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
        </Link>
      </SectionHeading>
      <ul className="grid gap-px overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map(({ icon: Icon, title, description }) => (
          <li key={title} className="flex gap-4 bg-white p-5 sm:p-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-600 to-brand-800 text-white shadow-md shadow-brand-600/20">
              <Icon className="size-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm leading-7 text-slate-600">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

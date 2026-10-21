import { Check, KeyRound, LifeBuoy, Workflow } from "lucide-react";
import { getAbout } from "@/content/about";
import { TechStack } from "@/components/about/TechStack";
import { PageHeader } from "@/components/ui/PageHeader";
import { HeroVisual, heroImages } from "@/components/hero/HeroVisual";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { About } from "@/components/sections/About";
import { MobileCollapse } from "@/components/ui/MobileCollapse";
import { CtaBand } from "@/components/home/CtaBand";
import { StatsStrip } from "@/components/services/ServiceExtras";
import { companyCommitments } from "@/content/service-extras";
import { pageMeta } from "@/i18n/meta";
import { seoFor } from "@/content/seo";
import { lp, tr, type Locale } from "@/i18n";

export function aboutMeta(locale: Locale) {
  return pageMeta(locale, {
    path: "/about",
    ...seoFor("about", locale),
  });
}

export default function AboutView({ locale }: { locale: Locale }) {
  const t = tr(locale);
  const { expertise, values } = getAbout(locale);
  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("من نحن", "About us") }]}
        title={t("نصنع حضوراً رقمياً يليق بطموحك.", "We build a digital presence worthy of your ambition.")}
        description={t(
          "حلولك تيك شركة حلول تقنية متخصصة في تطوير الويب، تجمع بين جودة التنفيذ العالمية وفهم عميق للسوق العربي، وتتعامل فيها مباشرة مع فريق التنفيذ دون وسطاء.",
          "Holoolk Tech is an IT solutions company specializing in web development that pairs world-class execution with a deep understanding of the Arab market, and you work directly with the delivery team, with no middlemen.",
        )}
        aside={
          <HeroVisual
            image={heroImages.about}
            cards={[
              { icon: KeyRound, title: t("ملكية كاملة للكود", "Full code ownership"), text: t("تنتقل إليك بعد السداد، وبياناتك ملكك", "Yours once paid; your data stays yours") },
              { icon: Workflow, title: t("تنفيذ متكامل", "End-to-end delivery"), text: t("من الفكرة حتى الإطلاق", "From idea to launch") },
              { icon: LifeBuoy, title: t("دعم مستمر", "Ongoing support"), text: t("متابعة بعد التسليم", "Follow-up after delivery") },
            ]}
          />
        }
      >
        <ButtonLink href={lp(locale, "/process")} variant="secondary" size="lg">
          {t("تعرّف على منهجيتنا", "See how we work")}
        </ButtonLink>
      </PageHeader>

      <Section id="values" className="bg-white py-12 sm:py-14 lg:py-16">
        <ul className="grid gap-px overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-200 sm:grid-cols-3">
          {values.map((v, i) => (
            <li key={v.title} className="bg-white p-6 sm:p-7 lg:p-8">
              <span className="text-sm font-black text-brand-600 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-2 text-xl font-black sm:mt-3 sm:text-2xl">{v.title}</h2>
              <p className="mt-2 leading-7 text-slate-600">{v.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="expertise" aria-labelledby="expertise-title">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-bold tracking-wide text-brand-700">
              <span className="size-1.5 rounded-full bg-brand-600" aria-hidden />
              {t("مجالات الخبرة", "Areas of expertise")}
            </p>
            <h2 id="expertise-title" className="mt-4 text-[1.75rem] leading-[1.45] font-black sm:text-4xl lg:text-[2.6rem]">
              <span className="block">{t("خبرة متكاملة،", "Complete expertise,")}</span>
              <span className="text-gradient block text-balance">{t("وجهة واحدة مسؤولة عن مشروعك.", "one team accountable for your project.")}</span>
            </h2>
          </div>
          <p className="text-lg leading-8 text-slate-600 lg:pb-1.5">
            {t(
              "نجمع التطوير والأمان والاستشارات التقنية تحت سقف واحد؛ فلا تتنقل بين أكثر من مزوّد، ولا تضيع المسؤولية بين الأطراف.",
              "Development, security and technical consulting under one roof, so you never juggle multiple vendors or lose accountability between them.",
            )}
          </p>
        </div>
        <MobileCollapse className="mt-8 sm:mt-10" more={t(`عرض كل مجالات الخبرة (${expertise.length})`, `Show all areas of expertise (${expertise.length})`)} less={t("عرض أقل", "Show less")} collapsedHeight="max-md:max-h-[27rem]" fadeClassName="from-slate-50">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map(({ icon: Icon, title, text, points }, i) => (
            <li
              key={title}
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 sm:last:col-span-2 lg:last:col-span-1 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-slate-900/[0.06] sm:p-8"
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-right scale-x-0 ltr:origin-left bg-linear-to-r from-brand-600 to-accent-500 transition-transform duration-500 group-hover:scale-x-100 rtl:bg-linear-to-l" />
              <div className="flex items-start justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand-600 to-brand-800 text-white shadow-lg shadow-brand-600/25">
                  <Icon className="size-6" aria-hidden />
                </span>
                {/* رقم زخرفي بالـ CSS (مش نص) — عشان أدوات فحص التباين متعتبروش نص لازم يتقري */}
                <span
                  aria-hidden
                  data-num={String(i + 1).padStart(2, "0")}
                  className="text-3xl font-black text-slate-200 tabular-nums transition-colors duration-300 group-hover:text-brand-200 before:content-[attr(data-num)]"
                />
              </div>
              <h3 className="mt-5 text-xl font-black sm:mt-6">{title}</h3>
              <p className="mt-2.5 leading-7 text-slate-600">{text}</p>
              <ul className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm sm:mt-6 sm:pt-6 font-medium text-slate-700">
                {points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                      <Check className="size-3" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="leading-6">{pt}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        </MobileCollapse>
      </Section>

      <Section id="stack" className="bg-white" aria-labelledby="stack-title">
        <div className="mb-8 grid gap-6 sm:mb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-bold tracking-wide text-brand-700">
              <span className="size-1.5 rounded-full bg-brand-600" aria-hidden />
              {t("التقنيات واللغات البرمجية", "Technologies & languages")}
            </p>
            <h2 id="stack-title" className="mt-4 text-[1.75rem] leading-[1.45] font-black sm:text-4xl lg:text-[2.6rem]">
              <span className="block">{t("أدوات حديثة،", "Modern tools")}</span>
              <span className="text-gradient block text-balance">{t("لكل مرحلة في بناء مشروعك.", "for every layer of your project.")}</span>
            </h2>
          </div>
          <p className="text-lg leading-8 text-slate-600 lg:pb-1.5">
            {t(
              "من الواجهات إلى الخوادم وقواعد البيانات والسحابة والدفع الإلكتروني: نختار لكل جزء من مشروعك تقنية حديثة ومجرّبة تناسبه.",
              "From interfaces to servers, databases, cloud and online payments, we choose a modern, proven technology for every part of your project.",
            )}
          </p>
        </div>
        <TechStack locale={locale} />
      </Section>

      <About locale={locale} />

      {/* التزاماتنا بالأرقام — أرقام قابلة للتحقق من العرض المكتوب ومنهجية العمل (مش أرقام إنجازات) */}
      <Section id="commitments" className="bg-white py-12 sm:py-14 lg:py-16" aria-labelledby="commitments-title">
        <div className="mb-8 grid gap-4 sm:mb-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-bold tracking-wide text-brand-700">
              <span className="size-1.5 rounded-full bg-brand-600" aria-hidden />
              {t("التزاماتنا", "Our commitments")}
            </p>
            <h2 id="commitments-title" className="mt-4 text-[1.6rem] leading-[1.45] font-black sm:text-3xl lg:text-[2.1rem]">
              {t("وضوح تقيسه", "Clarity you can")} <span className="text-gradient">{t("بالأرقام.", "measure.")}</span>
            </h2>
          </div>
          <p className="text-base leading-8 text-slate-600 sm:text-[1.0625rem] lg:pb-1">
            {t(
              "هذه ليست وعوداً تسويقية، بل شروط عمل نكتبها في العرض الذي توقّع عليه: متى تستلم العرض، وكيف تدفع، وما الذي تملكه في النهاية.",
              "These aren't marketing promises. They're working terms written into the proposal you sign: when you get the proposal, how you pay, and what you own at the end.",
            )}
          </p>
        </div>
        <StatsStrip stats={companyCommitments[locale]} />
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}

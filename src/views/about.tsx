import Image from "next/image";
import { Check, KeyRound, LifeBuoy, Workflow } from "lucide-react";
import { getAbout } from "@/content/about";
import { TechStack } from "@/components/about/TechStack";
import { PageHeader } from "@/components/ui/PageHeader";
import { HeroVisual, heroImages } from "@/components/hero/HeroVisual";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { About } from "@/components/sections/About";
import { CtaBand } from "@/components/home/CtaBand";
import { pageMeta } from "@/i18n/meta";
import { lp, tr, type Locale } from "@/i18n";

export function aboutMeta(locale: Locale) {
  const t = tr(locale);
  return pageMeta(locale, {
    path: "/about",
    title: t("من نحن", "About us"),
    description: t(
      "شركة حلول تقنية متخصصة في تطوير الويب بمعايير عالمية، تتواصل فيها مباشرة مع فريق التنفيذ بشفافية كاملة.",
      "An IT solutions company specializing in web development, built to world-class standards, where you work directly with the delivery team, with full transparency.",
    ),
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
              { icon: KeyRound, title: t("ملكية كاملة 100%", "100% ownership"), text: t("الكود والبيانات باسمك", "Your code, your data") },
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
        <ul className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
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

      <Section id="identity" className="bg-white py-12 sm:py-14 lg:py-16" aria-labelledby="identity-title">
        <div className="mb-8 grid gap-4 sm:mb-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-bold tracking-wide text-brand-700">
              <span className="size-1.5 rounded-full bg-brand-600" aria-hidden />
              {t("الهوية البصرية", "Visual identity")}
            </p>
            <h2 id="identity-title" className="mt-4 text-[1.6rem] leading-[1.45] font-black sm:text-3xl lg:text-[2.1rem]">
              {t("شعار واحد،", "One logo,")} <span className="text-gradient">{t("بلغتين.", "two languages.")}</span>
            </h2>
          </div>
          <p className="text-base leading-8 text-slate-600 sm:text-[1.0625rem] lg:pb-1">
            {t(
              "رمز «HT» واحد يجمع هويتنا: الاسم العربي للسوق المحلي والعربي، والإنجليزي للتعاملات والمنصات الدولية، مع نسخة مخصصة للخلفيات الداكنة.",
              "A single “HT” mark anchors our identity: the Arabic name for local and regional audiences, the English name for international platforms, each with a dark-background version.",
            )}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {[
            { label: t("الشعار العربي", "Arabic logo"), key: "ar", ww: 534, alt: "حلولك تيك" },
            { label: t("الشعار الإنجليزي", "English logo"), key: "en", ww: 578, alt: "Holoolk Tech" },
          ].map((l) => (
            <figure key={l.key} className="group overflow-hidden rounded-2xl border border-slate-200 transition-shadow sm:rounded-3xl duration-300 hover:shadow-lg hover:shadow-slate-900/5">
              <div className="bg-grid flex flex-col items-center bg-white px-3 pt-6 pb-5 sm:px-6 sm:pt-10 sm:pb-8">
                <Image src="/brand/mark-en.png" alt={t("رمز HT", "HT mark")} width={260} height={256} className="h-11 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-20" />
                <Image src={`/brand/wordmark-${l.key}.png`} alt={l.alt} width={l.ww} height={128} className="mt-3 h-5 w-auto max-w-full object-contain sm:mt-4 sm:h-9" />
              </div>
              <div className="flex items-center justify-center gap-2 bg-brand-800 px-3 py-3.5 sm:gap-3 sm:px-6 sm:py-5">
                <Image src="/brand/mark-en-light.png" alt={t("رمز HT على خلفية داكنة", "HT mark on a dark background")} width={260} height={256} className="h-6 w-auto sm:h-9" />
                <Image src={`/brand/wordmark-${l.key}-light.png`} alt={t(`${l.alt} على خلفية داكنة`, `${l.alt} on a dark background`)} width={l.key === "ar" ? 551 : l.ww} height={128} className="h-4 w-auto min-w-0 object-contain sm:h-6" />
              </div>
              <figcaption className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-3 py-2.5 text-[11px] font-bold sm:px-5 sm:py-3 sm:text-xs text-slate-500">
                <span>{l.label}</span>
                <span className="flex gap-1.5" role="img" aria-label={t("ألوان الشعار: كحلي، فضي، أبيض", "Logo colors: navy, silver, white")}>
                  <span className="size-3 rounded-full bg-brand-800 sm:size-3.5 ring-1 ring-slate-200" />
                  <span className="size-3 rounded-full sm:size-3.5 bg-silver-300 ring-1 ring-slate-200" />
                  <span className="size-3 rounded-full sm:size-3.5 bg-white ring-1 ring-slate-200" />
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}

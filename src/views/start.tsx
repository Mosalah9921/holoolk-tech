import { FileText, ListChecks, Save } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { HeroHighlights } from "@/components/hero/HeroHighlights";
import { Section } from "@/components/ui/Section";
import { ProjectWizard } from "@/components/start/ProjectWizard";
import { pageMeta } from "@/i18n/meta";
import { tr, type Locale } from "@/i18n";

export function startMeta(locale: Locale) {
  const t = tr(locale);
  return pageMeta(locale, {
    path: "/start",
    title: t("ابدأ مشروعك", "Start your project"),
    description: t(
      "حدّد احتياجات موقعك خطوة بخطوة، واحصل على ملخص ومدة تنفيذ تقديرية ومقترح تفصيلي خلال 24 ساعة.",
      "Define your website needs step by step, and get a summary, an estimated timeline and a detailed proposal within 24 hours.",
    ),
  });
}

export default function StartView({ locale }: { locale: Locale }) {
  const t = tr(locale);
  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("ابدأ مشروعك", "Start your project") }]}
        title={t("لنخطط موقعك معاً.", "Let’s plan your website together.")}
        description={t(
          "ست خطوات سريعة تساعدنا على فهم مشروعك. يُحفظ تقدّمك تلقائياً، فيمكنك المتابعة لاحقاً من حيث توقفت.",
          "Six quick steps that help us understand your project. Your progress saves automatically, so you can pick up right where you left off.",
        )}
        className="pb-8 sm:pb-10"
      >
        <HeroHighlights
          items={[
            { icon: ListChecks, label: t("6 خطوات سريعة", "6 quick steps") },
            { icon: Save, label: t("يُحفظ تقدّمك تلقائياً", "Progress saved automatically") },
            { icon: FileText, label: t("خطة مبدئية بعد الإرسال", "A preliminary plan once you submit") },
          ]}
        />
      </PageHeader>
      <Section id="wizard" className="pt-0 sm:pt-0 lg:pt-0">
        <ProjectWizard locale={locale} />
      </Section>
    </>
  );
}

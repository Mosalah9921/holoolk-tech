import { FileText, ListChecks, Save } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { HeroHighlights } from "@/components/hero/HeroHighlights";
import { Section } from "@/components/ui/Section";
import { ProjectWizard } from "@/components/start/ProjectWizard";
import { pageMeta } from "@/i18n/meta";
import { seoFor } from "@/content/seo";
import { tr, type Locale } from "@/i18n";

export function startMeta(locale: Locale) {
  return pageMeta(locale, {
    path: "/start",
    ...seoFor("start", locale),
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

import { Sparkles, Timer, Wand2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { HeroHighlights } from "@/components/hero/HeroHighlights";
import { TryPreview } from "@/components/sections/TryPreview";
import { CtaBand } from "@/components/home/CtaBand";
import { pageMeta } from "@/i18n/meta";
import { tr, type Locale } from "@/i18n";

export function previewMeta(locale: Locale) {
  const t = tr(locale);
  return pageMeta(locale, {
    path: "/tools/preview",
    title: t("معاينة موقعك", "Website preview"),
    description: t(
      "أدخل اسم نشاطك واختر مجاله، وشاهد تصوّراً أولياً لموقعك خلال ثوانٍ.",
      "Enter your business name, pick your industry, and see a first concept of your website in seconds.",
    ),
  });
}

export default function PreviewView({ locale }: { locale: Locale }) {
  const t = tr(locale);
  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("أدوات مجانية", "Free tools") }, { label: t("معاينة موقعك", "Website preview") }]}
        title={t("عاين موقع نشاطك قبل تنفيذه.", "Preview your website before it’s built.")}
        description={t(
          "أدخل اسم نشاطك واختر مجاله لترى في لحظات تصوّراً أولياً لحضورك الرقمي، ثم نتولى بناءه باحترافية.",
          "Enter your business name and choose your industry to see a first concept of your online presence in moments. Then we’ll build it properly.",
        )}
      >
        <HeroHighlights
          items={[
            { icon: Timer, label: t("معاينة خلال ثوانٍ", "Preview in seconds") },
            { icon: Wand2, label: t("بدون أي تسجيل", "No sign-up needed") },
            { icon: Sparkles, label: t("تصوّر حسب مجالك", "Tailored to your industry") },
          ]}
        />
      </PageHeader>
      <TryPreview bare locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}

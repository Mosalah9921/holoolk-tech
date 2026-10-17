import { BadgeCheck, Timer, Video } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { HeroHighlights } from "@/components/hero/HeroHighlights";
import { Section } from "@/components/ui/Section";
import { BookingScheduler } from "@/components/book/BookingScheduler";
import { pageMeta } from "@/i18n/meta";
import { tr, type Locale } from "@/i18n";

export function bookMeta(locale: Locale) {
  const t = tr(locale);
  return pageMeta(locale, {
    path: "/book",
    title: t("احجز استشارة مجانية", "Book a free consultation"),
    description: t(
      "اختر اليوم والساعة المناسبين لجلسة استشارية مجانية مدتها 30 دقيقة مع حلولك تيك.",
      "Pick a day and time that suits you for a free 30-minute consultation with Holoolk Tech.",
    ),
  });
}

export default function BookView({ locale }: { locale: Locale }) {
  const t = tr(locale);
  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("احجز استشارة مجانية", "Book a free consultation") }]}
        title={t("جلسة استشارية مجانية لمدة 30 دقيقة.", "A free 30-minute consultation.")}
        description={t(
          "نناقش فكرتك وأهدافك، ونقترح عليك الحل التقني الأنسب وخطة التنفيذ؛ دون أي التزام.",
          "We’ll talk through your idea and goals, then recommend the right technical approach and a delivery plan, with no obligation.",
        )}
        className="pb-10 sm:pb-12"
      >
        <HeroHighlights
          items={[
            { icon: Timer, label: t("30 دقيقة", "30 minutes") },
            { icon: BadgeCheck, label: t("مجانية بدون التزام", "Free, no obligation") },
            { icon: Video, label: t("أونلاين من أي مكان", "Online, from anywhere") },
          ]}
        />
      </PageHeader>
      <Section id="booking" className="pt-0 sm:pt-0">
        <BookingScheduler locale={locale} />
      </Section>
    </>
  );
}

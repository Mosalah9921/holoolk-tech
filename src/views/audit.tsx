import { BadgeCheck, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { HeroHighlights } from "@/components/hero/HeroHighlights";
import { FreeAudit } from "@/components/sections/FreeAudit";
import { CtaBand } from "@/components/home/CtaBand";
import { pageMeta } from "@/i18n/meta";
import { tr, type Locale } from "@/i18n";

export function auditMeta(locale: Locale) {
  const t = tr(locale);
  return pageMeta(locale, {
    path: "/tools/audit",
    title: t("تقييم مجاني لموقعك", "Free website audit"),
    description: t(
      "أرسل رابط موقعك، واحصل خلال 48 ساعة على تقرير موجز بأبرز نقاط التحسين.",
      "Send us your website link and get a short report on the most important improvements within 48 hours.",
    ),
  });
}

export default function AuditView({ locale }: { locale: Locale }) {
  const t = tr(locale);
  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("أدوات مجانية", "Free tools") }, { label: t("تقييم موقعك", "Website audit") }]}
        title={t("تقييم مجاني لموقعك الحالي.", "A free audit of your current website.")}
        description={t(
          "أرسل رابط موقعك، وسنوافيك خلال 48 ساعة بتقرير موجز يوضح أبرز ما قد يُفقدك العملاء، مع توصيات عملية لمعالجته.",
          "Send us your website link and within 48 hours we’ll send a short report on what may be costing you customers, with practical recommendations to fix it.",
        )}
      >
        <HeroHighlights
          gauge={{ value: 95, label: t("سرعة · سيو · تجربة", "Speed · SEO · UX") }}
          items={[
            { icon: FileText, label: t("تقرير خلال 48 ساعة", "Report within 48 hours") },
            { icon: BadgeCheck, label: t("مجاني بالكامل", "Completely free") },
          ]}
        />
      </PageHeader>
      <FreeAudit bare locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}

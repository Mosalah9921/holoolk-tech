import { BadgeCheck, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { HeroHighlights } from "@/components/hero/HeroHighlights";
import { FreeAudit } from "@/components/sections/FreeAudit";
import { CtaBand } from "@/components/home/CtaBand";
import { pageMeta } from "@/i18n/meta";
import { seoFor } from "@/content/seo";
import { tr, type Locale } from "@/i18n";

export function auditMeta(locale: Locale) {
  return pageMeta(locale, {
    path: "/tools/audit",
    ...seoFor("audit", locale),
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
          gauge={{ value: 95, label: t("مثال للتقرير: السرعة · الظهور · التجربة", "Sample report: Speed · SEO · UX") }}
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

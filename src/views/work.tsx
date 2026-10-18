import { Palette, PlayCircle, Smartphone } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { HeroVisual, heroImages } from "@/components/hero/HeroVisual";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { WorkGallery } from "@/components/work/WorkGallery";
import { CtaBand } from "@/components/home/CtaBand";
import { FoundingClients } from "@/components/work/FoundingClients";
import { pageMeta } from "@/i18n/meta";
import { lp, tr, type Locale } from "@/i18n";
import { getProjects } from "@/content/portfolio";

export function workMeta(locale: Locale) {
  const t = tr(locale);
  return pageMeta(locale, {
    path: "/work",
    title: t("أعمالنا", "Our work"),
    description: t(
      "مشاريع ومواقع نموذجية متكاملة لمتاجر ومطاعم وعيادات ومنصات تعليمية، صُمّم كلٌّ منها بهوية مستقلة، ويمكنك تصفّحها وتجربتها بنفسك.",
      "Projects and fully working sample websites for stores, restaurants, clinics and learning platforms, each with its own identity, ready for you to browse and try.",
    ),
  });
}

export default function WorkView({ locale }: { locale: Locale }) {
  const t = tr(locale);
  const demos = getProjects(locale).filter((p) => p.status === "demo").length;
  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("أعمالنا", "Our work") }]}
        title={t("أعمال يمكنك تصفّحها وتجربتها بنفسك.", "Work you can browse and try for yourself.")}
        description={t(
          "مشاريع ومواقع نموذجية متكاملة، صُمّم كلٌّ منها بهوية مستقلة تناسب طبيعة النشاط. افتح أي موقع وجرّب الحجز والتنقل كما يفعل العميل تماماً.",
          "Projects and fully working sample websites, each with its own identity designed around the business. Open any site and try booking and browsing exactly as a customer would.",
        )}
        aside={
          <HeroVisual
            image={heroImages.work}
            cards={[
              { icon: PlayCircle, title: t(`${demos} نماذج حية`, `${demos} live demos`), text: t("جرّبها كما يفعل عميلك", "Try them as your customers would") },
              { icon: Palette, title: t("هوية مستقلة", "Distinct identities"), text: t("تصميم خاص لكل نشاط", "A unique design for each business") },
              { icon: Smartphone, title: t("متجاوبة بالكامل", "Fully responsive"), text: t("موبايل وتابلت وكمبيوتر", "Mobile, tablet and desktop") },
            ]}
          />
        }
      >
        <ButtonLink href={lp(locale, "/tools/preview")} variant="secondary" size="lg">
          {t("عاين موقع نشاطك", "Preview your website")}
        </ButtonLink>
      </PageHeader>
      <Section id="work" className="pt-0 sm:pt-0 lg:pt-0">
        <WorkGallery locale={locale} />
      </Section>
      <FoundingClients locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}

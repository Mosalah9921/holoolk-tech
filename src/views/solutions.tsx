import { PlayCircle } from "lucide-react";
import { getSolutions, groupLabel, solutionGroups } from "@/content/solutions";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";
import { SolutionFinderButton } from "@/components/finder/SolutionFinderButton";
import { SolutionsHeroArt } from "@/components/solutions/SolutionsHeroArt";
import { SolutionsExplorer } from "@/components/solutions/SolutionsExplorer";
import { SolutionCard } from "@/components/solutions/SolutionCard";
import { SolutionsFoundation } from "@/components/solutions/SolutionsFoundation";
import { DemosShowcase } from "@/components/solutions/DemosShowcase";
import { CustomSolutionCard } from "@/components/solutions/CustomSolutionCard";
import { pageMeta } from "@/i18n/meta";
import { tr, type Locale } from "@/i18n";

export function solutionsMeta(locale: Locale) {
  const t = tr(locale);
  return pageMeta(locale, {
    path: "/solutions",
    title: t("الحلول حسب المجال", "Solutions by industry"),
    description: t(
      "حلول رقمية مصممة لطبيعة نشاطك: المطاعم، والمتاجر، والعيادات، والتعليم، والأندية الرياضية، والعقارات، والشركات، مع نماذج حية تجربها بنفسك وحلول مخصصة لأي نشاط آخر.",
      "Digital solutions for restaurants, retail, clinics, education, gyms, real estate and companies, with live demos to try and custom builds for any other business.",
    ),
  });
}

/** كلمات بحث إضافية (المفرد والمرادفات الشائعة) — في اللغتين عشان البحث يلاقي أي كلمة */
const keywords: Record<string, string> = {
  restaurants: "مطعم كافيه كافية قهوة اكل طعام مشويات حلويات منيو كاشير restaurant cafe coffee food menu bakery",
  clinics: "عيادة عيادات طبيب دكتور مستشفى مركز طبي اسنان صيدلية علاج clinic doctor medical dental hospital health",
  education: "تعليم مدرسة اكاديمية دورات كورسات تدريب جامعة سنتر education school academy courses training tutoring",
  fitness: "جيم نادي رياضة لياقة تمارين يوجا gym fitness sports yoga training club",
  stores: "متجر محل تجارة بيع ملابس منتجات براند علامة تجارية store shop ecommerce retail fashion brand products",
  "real-estate": "عقار عقارات شقق وحدات مقاولات تطوير كمبوند real estate property apartments developer construction",
  companies: "شركة شركات مؤسسة مؤسسات مصنع مكتب خدمات crm erp ادارة موظفين بوابة company business corporate organization factory office services employees portal",
};

export default function SolutionsView({ locale }: { locale: Locale }) {
  const t = tr(locale);
  const solutions = getSolutions(locale);
  const groups = solutionGroups.map((g) => ({ id: g, label: groupLabel(locale, g, true) }));
  const items = solutions.map((s) => ({
    id: s.id,
    group: s.group,
    text: [s.name, s.short, s.outcome, ...s.benefits, groupLabel(locale, s.group), keywords[s.id] ?? ""].join(" "),
    card: <SolutionCard solution={s} locale={locale} />,
  }));

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ label: t("الحلول", "Solutions") }]}
        title={t("حلول جاهزة لطبيعة نشاطك.", "Solutions built for how your business works.")}
        description={t(
          "مجالات نعرف تحدياتها جيداً ونبني لها بثقة. اختر مجالك لترى ما نبنيه لك، أو جرّب أحد نماذجنا الحية بنفسك. نشاطك مختلف؟ نصمم له حلاً مخصصاً.",
          "Industries whose challenges we know well and build for with confidence. Choose yours to see what we’d build, or try a live demo yourself. Different business? We’ll design a custom solution.",
        )}
        aside={
          // على الموبايل الأيقونات بتكرر قائمة المجالات اللي تحتها مباشرة — بتظهر من التابلت وطالع
          <div className="mt-2 hidden sm:block lg:mt-0">
            <SolutionsHeroArt locale={locale} />
          </div>
        }
      >
        <SolutionFinderButton locale={locale} className="shadow-lg shadow-brand-600/20" />
        <ButtonLink href="#demos" variant="secondary" size="lg">
          <PlayCircle className="size-5" aria-hidden />
          {t("جرّب نموذجاً حياً", "Try a live demo")}
        </ButtonLink>
      </PageHeader>

      <Section id="solutions-list" className="pt-0 sm:pt-0 lg:pt-0">
        <SolutionsExplorer groups={groups} items={items} locale={locale} footer={<CustomSolutionCard locale={locale} />} />
      </Section>

      <SolutionsFoundation locale={locale} />
      <DemosShowcase locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}

import type { Locale } from "@/i18n";

/**
 * رسالة واتساب الجاهزة لما الزائر يضغط أي زرار واتساب عام في الموقع.
 * قصيرة وطبيعية، وفيها 3 خانات بس يكمّلها العميل في ثواني.
 * من غير إيموجي عن قصد: بعض نسخ واتساب (الكمبيوتر خصوصاً) بتعرض الإيموجي اللي جاية من الرابط كعلامة «�».
 * intro: سطر مخصص حسب الصفحة (خدمة معيّنة، عميل من خارج مصر…)، وإلا بيتحط السطر العام.
 */
export function waInquiry(locale: Locale, intro?: string) {
  if (locale === "en") {
    return [
      "Hi Holoolk Tech,",
      intro ?? "I came across your website and I'd like to know more about your services.",
      "",
      "Name: ",
      "Business: ",
      "Looking for: Website / Online store / Management system",
    ].join("\n");
  }
  return [
    "مرحباً حلولك تيك،",
    intro ?? "اطّلعت على موقعكم، وأودّ معرفة تفاصيل أكثر عن خدماتكم.",
    "",
    "الاسم: ",
    "نوع النشاط: ",
    "المطلوب: موقع / متجر إلكتروني / نظام إدارة",
  ].join("\n");
}

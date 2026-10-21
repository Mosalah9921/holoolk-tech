import type { Locale } from "@/i18n";

/**
 * رسالة واتساب الجاهزة لما الزائر يضغط أي زرار واتساب عام في الموقع.
 * منظّمة وفيها خانات صغيرة يكمّلها العميل — فبيوصلنا طلب واضح من أول رسالة.
 * intro: سطر مخصص حسب الصفحة (خدمة معيّنة، عميل من خارج مصر…)، وإلا بيتحط السطر العام.
 */
export function waInquiry(locale: Locale, intro?: string) {
  if (locale === "en") {
    return [
      "Hello Holoolk Tech team 👋",
      intro ?? "I found you through your website and I'd like to learn more about your services.",
      "",
      "📌 A few details about my request:",
      "• Name: ",
      "• Business type: ",
      "• Service needed: (Business website / Online store / Dashboard / Other)",
      "• Current website (if any): ",
      "",
      "Looking forward to hearing from you. Thank you!",
    ].join("\n");
  }
  return [
    "مرحباً فريق حلولك تيك 👋",
    intro ?? "تواصلت معكم من خلال موقعكم الإلكتروني، وأرغب في الاستفسار عن خدماتكم.",
    "",
    "📌 بيانات مبدئية عن طلبي:",
    "• الاسم: ",
    "• نوع النشاط: ",
    "• الخدمة المطلوبة: (موقع شركة / متجر إلكتروني / لوحة تحكم / أخرى)",
    "• رابط الموقع الحالي (إن وُجد): ",
    "",
    "في انتظار ردكم، وشكراً لكم.",
  ].join("\n");
}

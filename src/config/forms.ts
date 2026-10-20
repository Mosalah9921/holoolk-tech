/**
 * Formspree — نسخة من كل طلب (تواصل / ابدأ مشروعك / حجز استشارة) بتوصل على info@holoolktech.com.
 * ممكن يتغيّر من NEXT_PUBLIC_FORM_ENDPOINT في Vercel.
 */
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "https://formspree.io/f/moejoewj";

/** إرسال صامت في الخلفية — أي خطأ بيتجاهل لأن واتساب هو القناة الأساسية */
export function sendToInbox(data: Record<string, unknown>) {
  if (!FORM_ENDPOINT) return;
  fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
    keepalive: true,
  }).catch(() => {});
}

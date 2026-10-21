/**
 * Formspree — نسخة من كل طلب (تواصل / ابدأ مشروعك / حجز استشارة) بتوصل على info@holoolktech.com.
 * ممكن يتغيّر من NEXT_PUBLIC_FORM_ENDPOINT في Vercel.
 */
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "https://formspree.io/f/moejoewj";

/**
 * إرسال نسخة الطلب للإيميل في الخلفية.
 * - بيضيف الصفحة اللي الطلب جه منها ووقت الإرسال (بتوقيت القاهرة) عشان المتابعة تبقى أسهل.
 * - لو الإرسال فشل (نت ضعيف مثلاً) بيحاول تاني مرة واحدة بعد ثانيتين.
 * - keepalive: الطلب بيكمل حتى لو الزائر اتنقل لواتساب أو قفل الصفحة.
 */
export function sendToInbox(data: Record<string, unknown>) {
  if (!FORM_ENDPOINT || typeof window === "undefined") return;
  const payload = {
    ...data,
    _page: window.location.href,
    _sent_at: new Date().toLocaleString("en-GB", { timeZone: "Africa/Cairo" }),
  };
  const send = () =>
    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).then((r) => {
      if (!r.ok) throw new Error(String(r.status));
    });
  send().catch(() => setTimeout(() => send().catch(() => {}), 2000));
}

/** فحص بسيط لرقم الهاتف (8 أرقام على الأقل بعد حذف الرموز والمسافات) */
export const isValidPhone = (v: string) => v.replace(/\D/g, "").length >= 8;
/** فحص بسيط للبريد الإلكتروني */
export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/**
 * تتبّع الأحداث المهمة (طلب تواصل، استخدام الحاسبة...) في Google Analytics و Facebook Pixel.
 * لو المعرّفات مش متضافة في .env.local، الدالة مش بتعمل حاجة.
 */
type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: "lead" | "contact", params: Params = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name === "lead" ? "generate_lead" : name, params);
  if (name === "lead") window.fbq?.("track", "Lead", params);
  if (name === "contact") window.fbq?.("track", "Contact", params);
}

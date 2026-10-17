import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** دمج كلاسات Tailwind بدون تعارض */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** رابط واتساب برسالة جاهزة */
export function whatsappLink(phone: string, message?: string) {
  const base = `https://wa.me/${phone.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * تنسيق العناوين: بيربط الرقم بالكلمة اللي بعده بمسافة غير قابلة للكسر
 * عشان الرقم ميقعش لوحده في آخر السطر (مثال: "8 أسباب" / "8 Reasons").
 */
export function keepNumbers(text: string) {
  return text.replace(/(\d+)\s+(?=\S)/g, "$1 ");
}

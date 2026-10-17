"use client";

import { useEffect, useState } from "react";
import { MessageCircleMore } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn, whatsappLink } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/i18n";

/**
 * زر واتساب عائم — ثابت في الركن السفلي (يسار في العربي، يمين في الإنجليزي تلقائياً عبر end).
 * يختفي فقط أثناء ظهور الشريط الختامي (فيه زر واتساب بالفعل) حتى لا يغطي أزراره على الموبايل.
 */
export function FloatingWhatsApp({ locale = "ar", message, label }: { locale?: Locale; message?: string; label?: string }) {
  const en = locale === "en";
  message ??= en ? "Hello Holoolk Tech, I'd like to discuss a new digital project." : "مرحباً حلولك تيك، أود الاستفسار ومناقشة مشروع رقمي جديد.";
  label ??= en ? "Chat with us on WhatsApp" : "تواصل معنا عبر واتساب";
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-cta-band]");
    if (!targets.length || !("IntersectionObserver" in window)) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setHidden(visible.size > 0);
      },
      { threshold: 0.25 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={whatsappLink(siteConfig.contact.whatsapp, message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("contact", { source: "floating_button" })}
      aria-label={label}
      title={label}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden || undefined}
      className={cn(
        "group fixed end-4 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/25 ring-4 ring-white/70 transition-all duration-300 hover:scale-105 hover:bg-[#1ebe5b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:end-6",
        "bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]",
        hidden ? "pointer-events-none translate-y-4 scale-90 opacity-0" : "opacity-100",
      )}
    >
      {/* نبض خفيف — يتوقف لمن يفضّل تقليل الحركة */}
      <span aria-hidden className="absolute inset-0 -z-10 rounded-full bg-[#25D366]/50 motion-safe:animate-ping motion-safe:[animation-duration:2.4s]" />
      <MessageCircleMore className="size-7" strokeWidth={2.2} aria-hidden />
      {/* تلميح نصي على الكمبيوتر */}
      <span
        aria-hidden
        className="pointer-events-none absolute end-full me-3 hidden translate-x-0 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
      >
        {label}
      </span>
    </a>
  );
}

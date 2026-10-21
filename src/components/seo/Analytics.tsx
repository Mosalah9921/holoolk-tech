"use client";

import { useEffect } from "react";

/**
 * Google Analytics 4 + Facebook (Meta) Pixel.
 *
 * سكربت جوجل حجمه ~180KB وكان بيبطّأ أول ظهور للموقع على الموبايل (Lighthouse نزل من ~87 لـ ~65).
 * الحل: بيتحمّل بعد أول تفاعل من الزائر (لمس/سكرول/ماوس/كيبورد) أو بعد 5 ثواني من تحميل الصفحة —
 * أيهما أسبق. الزيارة بتتسجل عادي، بس الصفحة بتظهر الأول.
 *
 * GA4 الرسمي للموقع: G-DB548NJ00R (ممكن يتغيّر من NEXT_PUBLIC_GA_ID في Vercel).
 * الـ Pixel بيتفعّل بس لما تحط NEXT_PUBLIC_FB_PIXEL_ID.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-DB548NJ00R";
const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

type W = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
  _fbq?: unknown;
  __htAnalytics?: boolean;
};

function loadScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function boot() {
  const w = window as W;
  if (w.__htAnalytics) return;
  w.__htAnalytics = true;

  if (GA_ID) {
    w.dataLayer = w.dataLayer || [];
    // gtag لازم يبعت arguments نفسها (مش array) — ده الشكل الرسمي من جوجل
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
    w.gtag("js", new Date());
    w.gtag("config", GA_ID);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
  }

  if (PIXEL_ID && !w.fbq) {
    const n = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args);
      else n.queue!.push(args);
    } as NonNullable<W["fbq"]>;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    w.fbq = n;
    w._fbq = n;
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    w.fbq("init", PIXEL_ID);
    w.fbq("track", "PageView");
  }
}

export function Analytics() {
  useEffect(() => {
    if (!GA_ID && !PIXEL_ID) return;
    const events = ["pointerdown", "keydown", "scroll", "touchstart", "mousemove"] as const;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      cleanup();
      boot();
    };
    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, start));
      if (timer) clearTimeout(timer);
    };
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    const arm = () => (timer = setTimeout(start, 5000));
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return cleanup;
  }, []);
  return null;
}

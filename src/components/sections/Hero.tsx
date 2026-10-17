"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, Cloud, Hammer, LifeBuoy, ShieldCheck } from "lucide-react";
import { getProjects, type Project } from "@/content/portfolio";
import { siteConfig } from "@/config/site";
import { lp, tr, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CoverPreview, PassArt } from "@/components/portfolio/ProjectArt";

/* ============================================================
   الهيرو: معرض أعمال حيّ
   المواقع النموذجية بتشتغل فعلاً جوه نافذة متصفح (iframe)،
   بتتبدّل لوحدها مع شريط تقدّم، وبتنزل بهدوء عشان تبان كاملة.
   ============================================================ */

const showcaseFor = (locale: Locale): Project[] => {
  const projects = getProjects(locale);
  return [...projects.filter((p) => p.status === "demo"), ...projects.filter((p) => p.status === "live" || p.status === "building")];
};
const siteHost = new URL(siteConfig.url).host;

const SLIDE_MS = 6500;
const FRAME_WIDTH = 1280; // عرض الصفحة الحقيقي اللي بنصغّره جوه النافذة

const promises = [
  { icon: Cloud, label: { ar: "بنية سحابية قابلة للتوسع", en: "Scalable cloud architecture" } },
  { icon: ShieldCheck, label: { ar: "أمان وحماية عالية", en: "Built-in security" } },
  { icon: LifeBuoy, label: { ar: "دعم وضمان مستمر", en: "Ongoing support" } },
];

export function Hero({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const showcase = showcaseFor(locale);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visited, setVisited] = useState<number[]>([0]);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const go = useCallback((i: number) => {
    setIndex(i);
    setVisited((v) => (v.includes(i) ? v : [...v, i]));
  }, []);

  const next = useCallback(() => go((index + 1) % showcase.length), [go, index]);
  const active = showcase[index];

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade absolute inset-0" />
        <div className="absolute top-20 -start-40 h-[360px] w-[420px] rounded-full bg-brand-200/45 blur-[80px] sm:h-[560px] sm:w-[760px] sm:blur-[130px] lg:start-auto lg:-end-20" />
        <div className="absolute top-72 end-1/3 hidden h-[300px] w-[420px] rounded-full bg-accent-200/50 blur-[110px] sm:block" />
      </div>

      <Container className="grid items-center gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
        {/* النص */}
        <div className="min-w-0 animate-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 py-1.5 ps-2 pe-4 text-sm font-semibold text-brand-700 shadow-sm backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-600" />
            </span>
            {t("شريكك التقني في التحول الرقمي", "Your technology partner for digital growth")}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.3rem] leading-[1.3] font-black tracking-tight text-balance text-slate-900 sm:text-5xl sm:leading-[1.25] lg:text-[3.2rem]"
          >
            {t("نبتكر حلولاً رقمية تقود نمو عملك", "Digital solutions that drive your business")}{" "}
            <span className="text-gradient">{t("نحو المستقبل", "forward")}</span>
          </h1>
          <p className="mt-5 max-w-[34rem] text-lg leading-[2] text-pretty text-slate-600 sm:text-[1.15rem]">
            {t(
              "نحوّل أفكارك إلى منصات رقمية وحلول برمجية متكاملة، مصممة خصيصاً لزيادة مبيعاتك وتسريع وتيرة أعمالك.",
              "We turn your ideas into complete digital platforms and custom software, built to grow your sales and streamline the way you work.",
            )}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={lp(locale, "/start")} size="lg" className="shadow-lg shadow-brand-600/25">
              {t("ابدأ مشروعك الآن", "Start your project")}
              <ArrowLeft className="size-5" aria-hidden />
            </ButtonLink>
            <ButtonLink href={lp(locale, "/work")} variant="secondary" size="lg">
              {t("استكشف أعمالنا", "Explore our work")}
            </ButtonLink>
          </div>

          <ul className="mt-9 grid gap-3 border-t border-slate-200/80 pt-6 sm:grid-cols-3 sm:gap-0">
            {promises.map(({ icon: Icon, label: lb }, i) => {
              const label = lb[locale];
              return (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-2.5 text-sm leading-6 font-semibold text-slate-700 sm:flex-col sm:items-start sm:gap-2 sm:text-[0.8125rem] sm:leading-5",
                  i > 0 && "sm:border-s sm:border-slate-200 sm:ps-5",
                  i < promises.length - 1 && "sm:pe-5",
                )}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <Icon className="size-3.5" aria-hidden />
                </span>
                {label}
              </li>
              );
            })}
          </ul>
        </div>

        {/* المعرض */}
        <div
          className="min-w-0 animate-fade-up [animation-delay:150ms]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <Stage showcase={showcase} active={index} visited={visited} reduced={reduced} locale={locale} />

          {/* اختيار المشروع + شريط التقدم — صف واحد (وبيتسحب أفقياً على الشاشات الصغيرة) */}
          <div
            role="tablist"
            aria-label={t("أعمالنا", "Our work")}
            className="-mx-4 mt-10 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible"
          >
            {showcase.map((p, i) => {
              const isActive = i === index;
              return (
                <button
                  key={p.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => go(i)}
                  className={cn(
                    "group relative min-w-0 shrink-0 snap-start overflow-hidden rounded-2xl border px-3 pt-3 pb-3.5 text-start transition-all duration-300 lg:flex lg:flex-col lg:justify-start lg:px-3.5",
                    isActive ? "border-slate-200 bg-white shadow-lg shadow-slate-900/[0.06]" : "border-transparent hover:bg-white/70",
                  )}
                >
                  <span className="flex items-center gap-2 lg:items-start">
                    <span className="size-2.5 shrink-0 rounded-full ring-2 ring-white lg:mt-[0.3rem]" style={{ background: p.cover?.accent ?? "#1E3F6E" }} aria-hidden />
                    <span className={cn("min-w-0 truncate text-sm font-bold whitespace-nowrap transition-colors lg:whitespace-normal lg:[overflow:visible] lg:leading-5", isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700")}>
                      {p.title}
                    </span>
                  </span>
                  <span className={cn("mt-0.5 block ps-[1.125rem] text-xs whitespace-nowrap lg:whitespace-normal lg:leading-4", isActive ? "text-brand-600" : "text-slate-500")}>{p.category}</span>
                  <span className="absolute inset-x-3 bottom-1.5 block h-[3px] overflow-hidden rounded-full bg-slate-100" aria-hidden>
                    {isActive && (
                      <span
                        key={`${i}-${reduced}`}
                        onAnimationEnd={reduced ? undefined : next}
                        className={cn("absolute inset-0 origin-right rounded-full bg-brand-600 ltr:origin-left", reduced ? "scale-x-100" : "animate-progress")}
                        style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="sr-only" aria-live="polite">
            {t("المعروض حالياً:", "Now showing:")} {active.title}
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- */

/** اسم النموذج من الرابط: /demos/store → store (لصور الموبايل) */
const demoName = (p: Project) => (p.href?.startsWith("/demos/") ? p.href.split("/").pop() : undefined);

function Stage({
  showcase,
  active,
  visited,
  reduced,
  locale,
}: {
  showcase: Project[];
  active: number;
  visited: number[];
  reduced: boolean;
  locale: Locale;
}) {
  const t = tr(locale);
  const project = showcase[active];
  const nextProject = showcase[(active + 1) % showcase.length];
  /** نحمّل المعروض + اللي بعده مسبقاً عشان التبديل يبقى من غير وميض */
  const shown = (i: number) => i === 0 || visited.includes(i) || i === (active + 1) % showcase.length;

  return (
    <div className="relative pt-6 sm:px-6">
      {/* نوافذ ورا — بتوحي بإن فيه شغل كتير */}
      <div
        aria-hidden
        className="absolute inset-x-10 top-0 bottom-10 hidden rotate-[-2.5deg] rounded-[1.75rem] border border-slate-200 bg-white/70 shadow-sm transition-colors duration-700 sm:inset-x-16 md:block"
        style={{ background: `${nextProject.cover?.accent ?? "#1E3F6E"}14` }}
      />
      <div aria-hidden className="absolute inset-x-6 top-3 bottom-6 hidden rotate-[1.5deg] rounded-[1.75rem] border border-slate-200 bg-white shadow-sm sm:inset-x-12 md:block" />

      {/* الكمبيوتر: نافذة متصفح بالموقع الحقيقي */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_40px_80px_-35px_rgb(15_23_42/0.45)] sm:rounded-[1.5rem]">
        <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/90 px-3 py-2.5 sm:gap-2 sm:px-4 sm:py-3" dir="ltr">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
          <div className="mx-auto flex w-[58%] min-w-0 items-center justify-center gap-1.5 truncate rounded-lg border border-slate-200 bg-white px-3 py-1 text-center text-[11px] text-slate-500">
            <svg viewBox="0 0 16 16" className="size-3 shrink-0 text-emerald-600" aria-hidden>
              <path fill="currentColor" d="M8 1a3.5 3.5 0 0 0-3.5 3.5V6H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-.5V4.5A3.5 3.5 0 0 0 8 1Zm2 5H6V4.5a2 2 0 1 1 4 0V6Z" />
            </svg>
            <span className="truncate">{project.href ? `${siteHost}${project.href}` : t("قريباً", "Coming soon")}</span>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500 motion-reduce:animate-none" />
            LIVE
          </span>
        </div>

        <div className="relative aspect-[16/10] bg-slate-100">
          {showcase.map((p, i) => {
            const poster = p.image ? (
              <Image src={p.image} alt="" fill priority={i === 0} sizes="(min-width: 1024px) 760px, 90vw" className="object-cover object-top" />
            ) : p.cover ? (
              <CoverPreview cover={p.cover} />
            ) : (
              <PassArt title={p.title} />
            );
            return shown(i) ? (
              <div
                key={p.slug}
                aria-hidden={i !== active}
                className={cn("absolute inset-0 transition-opacity duration-700", i === active ? "opacity-100" : "pointer-events-none opacity-0")}
              >
                {p.href?.startsWith("/") ? (
                  <LiveFrame src={p.href} title={t(`معاينة ${p.title}`, `${p.title} preview`)} active={i === active} reduced={reduced} fallback={poster} />
                ) : (
                  poster
                )}
              </div>
            ) : null;
          })}
        </div>
      </div>

      {/* الموبايل: هاتف بنسخة الموبايل من نفس الموقع (على الكمبيوتر بيظهر فوق النافذة) */}
      <div aria-hidden className="absolute -bottom-12 end-0 hidden w-[8.75rem] lg:block xl:w-[9.75rem]">
        <div className="relative rounded-[1.6rem] bg-slate-900 p-[0.3rem] shadow-[0_30px_60px_-20px_rgb(15_23_42/0.6)] ring-1 ring-slate-700">
          <span aria-hidden className="absolute top-1.5 left-1/2 z-10 h-2 w-[34%] -translate-x-1/2 rounded-full bg-slate-900" />
          <div className="relative aspect-[500/1082] overflow-hidden rounded-[1.35rem] bg-white">
            {showcase.map((p, i) => {
              const name = demoName(p);
              if (!name || !shown(i)) return null;
              return (
                <Image
                  key={p.slug}
                  src={`/images/demos/${name}-mobile.webp`}
                  alt=""
                  fill
                  sizes="160px"
                  className={cn("object-cover object-top transition-opacity duration-700", i === active ? "opacity-100" : "opacity-0")}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* كارت المشروع الحالي */}
      <div className="absolute start-0 -bottom-5 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white/95 py-1.5 ps-3 pe-1.5 shadow-lg backdrop-blur sm:start-2 sm:gap-3 sm:rounded-2xl sm:py-2.5 sm:ps-4 sm:pe-2.5 max-md:inset-x-0 max-md:mx-auto max-md:w-max">
        <span className="text-xs sm:text-sm">
          <span className="block font-bold text-slate-900">{project.title}</span>
          <span className="hidden text-xs text-slate-500 sm:block">{project.status === "demo" ? t("نموذج تفاعلي — جرّبه بنفسك", "Live demo — try it yourself") : project.category}</span>
        </span>
        {project.href ? (
          <Link
            href={project.href}
            target="_blank"
            className="flex size-8 items-center justify-center rounded-lg bg-brand-600 text-white transition-colors hover:bg-brand-700 sm:size-10 sm:rounded-xl"
            aria-label={t(`افتح ${project.title}`, `Open ${project.title}`)}
          >
            <ArrowUpLeft className="size-5" aria-hidden />
          </Link>
        ) : (
          <span className="flex items-center gap-1 rounded-xl bg-amber-50 px-2.5 py-2 text-xs font-bold text-amber-700">
            <Hammer className="size-3.5" aria-hidden />
            {t("قيد التطوير", "In development")}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * صفحة حقيقية مصغّرة جوه iframe:
 * بتتحمّل بعرض 1280px وتتصغّر على مقاس النافذة، وبتنزل لوحدها بهدوء وهي معروضة.
 */
function LiveFrame({
  src,
  title,
  active,
  reduced,
  fallback,
}: {
  src: string;
  title: string;
  active: boolean;
  reduced: boolean;
  fallback: React.ReactNode;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  // الأداء: المعاينة الحية بتتحمّل بعد ما الصفحة تخلص والمتصفح يفضى،
  // ومش بتتحمّل خالص على الاتصالات البطيئة أو مع وضع توفير البيانات (بيظهر الغلاف بدلها)
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || /2g/.test(conn?.effectiveType ?? "")) return;
    // على الموبايل الإطار صغير جداً ويستهلك المعالج: تكفي صورة الغلاف الثابتة
    if (window.matchMedia("(max-width: 767px)").matches) return;
    let idle = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const go = () => {
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      else timer = setTimeout(() => setReady(true), 1200);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      if (idle) window.cancelIdleCallback(idle);
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // نزول هادي جوه الصفحة وهي معروضة
  useEffect(() => {
    const win = frameRef.current?.contentWindow;
    if (!win || !loaded || !active) return;
    win.scrollTo(0, 0);
    if (reduced) return;

    let raf = 0;
    const start = performance.now() + 900;
    const duration = 4800;
    const distance = Math.min(720, Math.max(0, (win.document.documentElement.scrollHeight ?? 0) - win.innerHeight));
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const step = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      win.scrollTo(0, distance * ease(t));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, loaded, reduced]);

  function handleLoad() {
    try {
      const doc = frameRef.current?.contentDocument;
      if (doc) {
        const style = doc.createElement("style");
        style.textContent =
          "[data-demo-chrome]{display:none!important}html{scroll-behavior:auto!important;scrollbar-width:none}::-webkit-scrollbar{display:none}";
        doc.head.appendChild(style);
      }
    } catch {
      /* نفس الدومين دايماً — مفيش مشكلة متوقعة */
    }
    // نستنى أول رسم كامل جوه الإطار قبل ما يظهر — عشان ميبانش فوق الغلاف كصورة مزدوجة
    requestAnimationFrame(() => requestAnimationFrame(() => setLoaded(true)));
  }

  const scale = size.w / FRAME_WIDTH;

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0">{fallback}</div>
      {ready && scale > 0 && (
        <iframe
          ref={frameRef}
          src={src}
          title={title}
          tabIndex={-1}
          aria-hidden
          loading="lazy"
          onLoad={handleLoad}
          className={cn("pointer-events-none absolute top-0 left-0 origin-top-left border-0 bg-white transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0")}
          style={{ width: FRAME_WIDTH, height: size.h / scale, transform: `scale(${scale})` }}
        />
      )}
    </div>
  );
}

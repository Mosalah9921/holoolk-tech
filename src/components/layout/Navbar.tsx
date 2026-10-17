"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ChevronDown, Languages, Menu, Search, X } from "lucide-react";
import { getMainNav, type NavGroup } from "@/config/navigation";
import { lp, switchLocalePath, tr, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";
import { Logo } from "@/components/ui/Logo";
import { openCommandPalette } from "@/components/layout/CommandPalette";

function isGroupActive(group: NavGroup, pathname: string) {
  if (group.href && group.href !== "/" && group.href !== "/en" && pathname.startsWith(group.href)) return true;
  return group.items?.some((i) => pathname === i.href || pathname.startsWith(i.href + "/")) ?? false;
}

/** ناف بار عائم + قوائم منسدلة كبيرة (Mega menu) + قائمة موبايل */
export function Navbar({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const mainNav = getMainNav(locale);
  const pathname = usePathname();
  const other = switchLocalePath(pathname);
  const scrolled = useScrolled();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // اقفل كل حاجة عند تغيير الصفحة
  useEffect(() => {
    setOpenMenu(null);
    setDrawer(false);
  }, [pathname]);

  // Escape + الضغط برّه القائمة
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openMenu]);

  const enter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  const closeDrawer = useCallback(() => setDrawer(false), []);
  const activeGroup = mainNav.find((g) => g.label === openMenu);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-[calc(0.75rem+env(safe-area-inset-top))] sm:px-6 sm:pt-[calc(1rem+env(safe-area-inset-top))]">
        <nav
          ref={navRef}
          aria-label={t("القائمة الرئيسية", "Main navigation")}
          onMouseLeave={leave}
          className={cn(
            "relative mx-auto max-w-7xl rounded-2xl border transition-all duration-300",
            scrolled || openMenu || drawer
              ? "border-slate-200/80 bg-white/90 shadow-[0_8px_30px_-12px_rgb(15_23_42/0.18)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <div className="flex h-16 items-center justify-between gap-4 px-3 ps-4">
            <Logo variant={locale} href={lp(locale, "/")} label={t("حلولك تيك — الرئيسية", "Holoolk Tech — Home")} />

            <ul className="hidden items-center gap-0.5 xl:flex">
              {mainNav.map((group) => {
                const active = isGroupActive(group, pathname);
                if (!group.items) {
                  return (
                    <li key={group.label}>
                      <Link
                        href={group.href!}
                        onMouseEnter={() => setOpenMenu(null)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors",
                          active ? "text-brand-700" : "text-slate-600 hover:text-slate-900",
                        )}
                      >
                        {group.label}
                      </Link>
                    </li>
                  );
                }
                const isOpen = openMenu === group.label;
                return (
                  <li key={group.label} onMouseEnter={() => enter(group.label)}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls="mega-menu"
                      onClick={() => setOpenMenu(isOpen ? null : group.label)}
                      className={cn(
                        "flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors",
                        isOpen ? "bg-slate-100 text-slate-900" : active ? "text-brand-700" : "text-slate-600 hover:text-slate-900",
                      )}
                    >
                      {group.label}
                      <ChevronDown className={cn("size-4 transition-transform", isOpen && "rotate-180")} aria-hidden />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openCommandPalette}
                aria-label={t("البحث في الموقع (Ctrl + K)", "Search the website (Ctrl + K)")}
                aria-keyshortcuts="Control+K Meta+K"
                className="group/search relative inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 active:scale-95"
              >
                <Search className="size-[1.125rem] transition-transform duration-200 group-hover/search:scale-110" strokeWidth={2.25} aria-hidden />
                {/* تلميح عند المرور: الاسم + الاختصار */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-[calc(100%+10px)] left-1/2 hidden -translate-x-1/2 translate-y-1 items-center gap-2 rounded-lg bg-slate-900 py-1.5 ps-3 pe-1.5 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-200 group-hover/search:translate-y-0 group-hover/search:opacity-100 group-focus-visible/search:translate-y-0 group-focus-visible/search:opacity-100 md:flex"
                >
                  {t("بحث", "Search")}
                  <kbd className="rounded-md bg-white/15 px-1.5 py-0.5 font-sans text-[10px] font-bold text-white" dir="ltr">
                    Ctrl K
                  </kbd>
                  <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-slate-900" />
                </span>
              </button>
              <a
                href={other.href}
                hrefLang={other.locale}
                lang={other.locale}
                title={t("English version", "النسخة العربية")}
                className="hidden size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition-all duration-200 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 active:scale-95 md:inline-flex"
              >
                {t("EN", "ع")}
              </a>
              <Link
                href={lp(locale, "/start")}
                className="hidden h-10 items-center rounded-xl bg-brand-600 px-4 text-sm font-bold text-white shadow-md shadow-brand-600/20 transition-colors hover:bg-brand-700 sm:inline-flex"
              >
                {t("ابدأ مشروعك", "Start a project")}
              </Link>
              <button
                type="button"
                onClick={() => setDrawer(true)}
                className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 transition-colors hover:bg-slate-50 xl:hidden"
                aria-label={t("فتح القائمة", "Open menu")}
                aria-expanded={drawer}
                aria-controls="mobile-drawer"
              >
                <Menu className="size-5" aria-hidden />
              </button>
            </div>
          </div>

          {/* القائمة المنسدلة الكبيرة */}
          {activeGroup?.items && (
            <div
              id="mega-menu"
              onMouseEnter={() => enter(activeGroup.label)}
              className="animate-fade-up absolute inset-x-0 top-[calc(100%+8px)] hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_30px_60px_-20px_rgb(15_23_42/0.25)] [animation-duration:250ms] xl:block"
            >
              <div className="grid grid-cols-[1fr_16rem] gap-3">
                <div className="flex flex-col p-2">
                  <div className="mb-3 flex items-center justify-between gap-4 px-3 pt-1">
                    <p className="text-xs font-bold tracking-wide text-slate-500">{activeGroup.intro}</p>
                    {activeGroup.href && !activeGroup.footerLink && (
                      <Link href={activeGroup.href} className="flex items-center gap-1 text-sm font-bold text-brand-700 hover:text-brand-800">
                        {t("عرض الكل", "View all")}
                        <ArrowLeft className="size-4" aria-hidden />
                      </Link>
                    )}
                  </div>
                  <ul className={cn("grid flex-1 auto-rows-fr content-start gap-3", activeGroup.items.length > 8 ? "grid-cols-3" : "grid-cols-2")}>
                    {activeGroup.items.map(({ label, href, description, icon: Icon, image }) => (
                      <li key={href} className="min-w-0">
                        <Link
                          href={href}
                          className={cn(
                            "group flex h-full items-center gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50",
                            pathname === href && "bg-brand-50/60",
                          )}
                        >
                          {image ? (
                            <span className="relative flex size-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand-50 to-slate-100 ring-1 ring-brand-100/70 transition-all duration-300 group-hover:from-brand-100 group-hover:to-brand-50 group-hover:shadow-md group-hover:shadow-brand-600/10">
                              <Image
                                src={image}
                                alt=""
                                width={640}
                                height={640}
                                sizes="64px"
                                loading="eager"
                                className="size-12 object-contain drop-shadow-[0_4px_6px_rgb(16_39_74/0.18)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                              />
                            </span>
                          ) : (
                            Icon && (
                              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                                <Icon className="size-5" aria-hidden />
                              </span>
                            )
                          )}
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm leading-6 font-bold text-slate-900">{label}</span>
                            {!activeGroup.compact && description && <span className="mt-0.5 block truncate text-xs leading-5 text-slate-600">{description}</span>}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {activeGroup.footerLink && (
                    <Link
                      href={activeGroup.footerLink.href}
                      className="group mx-3 mt-3 flex items-center justify-between border-t border-slate-100 pt-3.5 pb-1 text-sm font-bold text-brand-700 transition-colors hover:text-brand-800"
                    >
                      {activeGroup.footerLink.label}
                      <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
                    </Link>
                  )}
                </div>

                <MenuFeature group={activeGroup} locale={locale} />
              </div>
            </div>
          )}
        </nav>
      </header>

      <MobileDrawer open={drawer} onClose={closeDrawer} pathname={pathname} locale={locale} nav={mainNav} other={other} />
    </>
  );
}

function MenuFeature({ group, locale }: { group: NavGroup; locale: Locale }) {
  const t = tr(locale);
  const f = group.feature ?? {
    title: t("ابدأ مشروعك", "Start your project"),
    text: t("حدّد احتياجاتك في دقائق، وسنعود إليك بمقترح مفصّل.", "Define your needs in minutes, and we'll get back to you with a detailed proposal."),
    href: lp(locale, "/start"),
    cta: t("ابدأ الآن", "Get started"),
  };
  return (
    <Link
      href={f.href}
      className="group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-linear-to-br from-brand-700 to-brand-800 p-6 text-white"
    >
      {/* رمز الشعار كعلامة مائية */}
      <Image
        src="/brand/mark-en-light.png"
        alt=""
        aria-hidden
        width={260}
        height={256}
        loading="eager"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-36 -translate-x-1/2 -translate-y-1/2 -rotate-12 opacity-10 brightness-0 invert transition-[rotate,scale] duration-700 select-none group-hover:scale-105 group-hover:-rotate-6"
      />
      <span>
        <span className="block text-base leading-7 font-black">{f.title}</span>
        <span className="mt-1.5 block text-sm leading-6 text-white/75">{f.text}</span>
      </span>
      <span className="mt-6 flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-white/10 text-sm font-bold ring-1 ring-white/20 backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-brand-800">
        {f.cta}
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}

/* ============================ Mobile Drawer ============================ */

function MobileDrawer({
  open,
  onClose,
  pathname,
  locale,
  nav,
  other,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  locale: Locale;
  nav: NavGroup[];
  other: { locale: Locale; href: string };
}) {
  const t = tr(locale);
  const mainNav = nav;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), summary");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const mq = window.matchMedia("(min-width: 1280px)");
    const onResize = () => mq.matches && onClose();
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div className={cn("fixed inset-0 z-[60] transition-[visibility] duration-300 xl:hidden", open ? "visible" : "invisible")} aria-hidden={!open}>
      <div onClick={onClose} className={cn("absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity duration-300", open ? "opacity-100" : "opacity-0")} />
      <div
        id="mobile-drawer"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("قائمة التنقل", "Navigation menu")}
        className={cn(
          "absolute inset-x-3 top-3 bottom-3 flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20 transition-all duration-300 ease-out",
          open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-4 ps-5">
          <Logo variant={locale} href={lp(locale, "/")} />
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
            aria-label={t("إغلاق القائمة", "Close menu")}
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              openCommandPalette();
            }}
            tabIndex={open ? 0 : -1}
            className="mb-2 flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
          >
            <Search className="size-4" aria-hidden />
            {t("ابحث في الموقع…", "Search the website…")}
          </button>

          <ul className="grid gap-1">
            {mainNav.map((group) =>
              group.items ? (
                <li key={group.label}>
                  <details className="group" open={isGroupActive(group, pathname)}>
                    <summary
                      tabIndex={open ? 0 : -1}
                      className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-lg font-bold text-slate-900 hover:bg-slate-50"
                    >
                      {group.label}
                      <ChevronDown className="size-5 text-slate-400 transition-transform group-open:rotate-180" aria-hidden />
                    </summary>
                    <ul className="mb-2 grid gap-0.5 ps-3">
                      {group.href && (
                        <li>
                          <Link href={group.href} tabIndex={open ? 0 : -1} className="block rounded-lg px-4 py-2.5 text-sm font-bold text-brand-700">
                            {t(`عرض كل ${group.label}`, `View all ${group.label.toLowerCase()}`)}
                          </Link>
                        </li>
                      )}
                      {group.items.map(({ label, href, icon: Icon, image }) => (
                        <li key={href}>
                          <Link
                            href={href}
                            tabIndex={open ? 0 : -1}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-4 py-2.5 text-[15px] text-slate-700 hover:bg-slate-50",
                              pathname === href && "bg-brand-50 font-bold text-brand-700",
                            )}
                          >
                            {image ? (
                              <Image src={image} alt="" width={640} height={640} sizes="32px" className="size-8 shrink-0 object-contain" />
                            ) : (
                              Icon && <Icon className="size-4 shrink-0 text-slate-400" aria-hidden />
                            )}
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={group.label}>
                  <Link
                    href={group.href!}
                    tabIndex={open ? 0 : -1}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-lg font-bold",
                      isGroupActive(group, pathname) ? "bg-brand-50 text-brand-700" : "text-slate-900 hover:bg-slate-50",
                    )}
                  >
                    {group.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-2 border-t border-slate-100 p-4">
          <a
            href={other.href}
            hrefLang={other.locale}
            lang={other.locale}
            tabIndex={open ? 0 : -1}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 font-bold text-slate-700"
          >
            <Languages className="size-4" aria-hidden />
            {t("English", "العربية")}
          </a>
          <Link
            href={lp(locale, "/start")}
            tabIndex={open ? 0 : -1}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-brand-600 font-bold text-white"
          >
            {t("ابدأ مشروعك", "Start a project")}
          </Link>
        </div>
      </div>
    </div>
  );
}

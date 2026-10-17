"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, BadgeCheck, Check, ChevronDown, Minus, Plus, RefreshCcw, Search, ShieldCheck, ShoppingBag, Truck, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FREE_SHIPPING, SHIPPING_FEE, categoryLabel, egp, products, type Category, type Product } from "./data";

/* ============================================================
   متجر نموذجي: «رَكض RAKD» للملابس الرياضية (نشاط وهمي)
   كتالوج بفلترة وترتيب، اختيار اللون والمقاس، سلة جانبية،
   شريط شحن مجاني، وصفحة إتمام طلب — كل ده بيشتغل فعلاً.
   ============================================================ */

/** برتقالي بتباين كافٍ للنصوص والأزرار، والفاتح للزخارف فقط */
const ORANGE = "#CC4A12";
const BRIGHT = "#FF5A1F";
type Line = { key: string; product: Product; size: string; qty: number };
type Sort = "featured" | "low" | "high";

export function RakdStore() {
  const [cat, setCat] = useState<Category | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [query, setQuery] = useState("");
  const [quick, setQuick] = useState<Product | null>(null);
  const [cart, setCart] = useState<Line[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [toast, setToast] = useState("");

  const list = useMemo(() => {
    let l = products.filter((p) => (cat === "all" || p.category === cat) && (!query.trim() || p.name.includes(query.trim())));
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [cat, sort, query]);

  const count = cart.reduce((n, l) => n + l.qty, 0);
  const subtotal = cart.reduce((n, l) => n + l.qty * l.product.price, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE;

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    document.body.style.overflow = quick || cartOpen || checkout ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [quick, cartOpen, checkout]);

  const add = (p: Product, size: string, qty = 1) => {
    const key = `${p.id}|${size}`;
    setCart((c) => (c.some((l) => l.key === key) ? c.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l)) : [...c, { key, product: p, size, qty }]));
    setToast(`تمت إضافة «${p.name}» إلى السلة`);
  };
  const setQty = (key: string, qty: number) => setCart((c) => (qty <= 0 ? c.filter((l) => l.key !== key) : c.map((l) => (l.key === key ? { ...l, qty } : l))));

  return (
    <>
      {/* شريط العروض */}
      <div className="bg-[#111] py-2 text-center text-xs font-semibold text-white sm:text-sm">
        شحن مجاني للطلبات فوق {egp(FREE_SHIPPING)} · استبدال مجاني خلال 14 يوماً
      </div>

      {/* الهيدر */}
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#F4F3EF]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg text-lg font-black text-white" style={{ background: ORANGE }}>
              ر
            </span>
            <span dir="ltr" className="text-2xl font-black tracking-[0.18em]">
              RAKD
            </span>
          </a>
          <nav aria-label="أقسام المتجر" className="hidden items-center gap-7 text-sm font-bold text-black/70 md:flex">
            {(["jerseys", "training", "shoes", "bags"] as const).map((c) => (
              <a key={c} href="#shop" onClick={() => setCat(c)} className="hover:text-black">
                {categoryLabel[c]}
              </a>
            ))}
            <a href="#shop" onClick={() => setSort("featured")} style={{ color: "#C2410C" }}>
              العروض
            </a>
          </nav>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex h-10 items-center gap-2 rounded-full bg-[#111] px-4 text-sm font-bold text-white"
            aria-label={`السلة، ${count} منتج`}
          >
            <ShoppingBag className="size-4.5" aria-hidden />
            <span className="hidden sm:inline">السلة</span>
            <span className="flex size-5 items-center justify-center rounded-full text-[11px] font-black text-white tabular-nums" style={{ background: ORANGE }}>
              {count}
            </span>
          </button>
        </div>
      </header>

      <main id="top">
        {/* الهيرو */}
        <section className="relative isolate overflow-hidden">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:py-20 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold shadow-sm ring-1 ring-black/5">
                <span className="size-2 rounded-full" style={{ background: BRIGHT }} />
                تشكيلة موسم 2025/26 وصلت
              </p>
              <h1 className="mt-5 text-5xl leading-[1.1] font-black sm:text-7xl">
                اتحرّك
                <br />
                <span style={{ color: ORANGE }}>بلا حدود.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-black/65">
                قمصان الأندية والمنتخبات، وملابس التمرين، وأحذية الكرة والشنط الرياضية في مكان واحد، بأسعار واضحة وتوصيل لباب البيت.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#shop" className="inline-flex h-13 items-center gap-2 rounded-full px-7 font-bold text-white transition-transform hover:-translate-y-0.5" style={{ background: ORANGE }}>
                  تسوّق الآن
                  <ArrowLeft className="size-5" aria-hidden />
                </a>
                <a href="#shop" onClick={() => setCat("jerseys")} className="inline-flex h-13 items-center rounded-full border border-black/15 bg-white px-7 font-bold hover:border-black/30">
                  قمصان الأندية
                </a>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-black/60">
                {["الدفع عند الاستلام", "شحن لكل المحافظات", "استبدال خلال 14 يوماً"].map((x) => (
                  <li key={x} className="flex items-center gap-1.5">
                    <Check className="size-4" style={{ color: BRIGHT }} aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative grid grid-cols-2 gap-4" aria-hidden>
              <div className="absolute -inset-6 -z-10 rounded-[3rem] opacity-20 blur-3xl" style={{ background: BRIGHT }} />
              <div className="relative row-span-2 overflow-hidden rounded-[2rem] bg-white shadow-xl">
                <Image src="/images/demos/store/half-zip.webp" alt="" fill priority sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white shadow-xl">
                <Image src="/images/demos/store/ahly-home.webp" alt="" fill priority sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white shadow-xl">
                <Image src="/images/demos/store/turf-blue.webp" alt="" fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* الأقسام */}
        <section aria-labelledby="cats-title" className="mx-auto max-w-7xl px-4 pb-6">
          <h2 id="cats-title" className="sr-only">
            تسوّق حسب القسم
          </h2>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {([
              { c: "jerseys", src: "ahly-third" },
              { c: "training", src: "navy-jacket" },
              { c: "shoes", src: "turf-collection" },
              { c: "bags", src: "backpack-duo" },
            ] as const).map(({ c, src }) => (
              <li key={c}>
                <a href="#shop" onClick={() => setCat(c)} className="group relative block overflow-hidden rounded-3xl bg-white">
                  <span className="relative block aspect-[4/3]">
                    <Image src={`/images/demos/store/${src}.webp`} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </span>
                  <span className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl bg-white/90 px-4 py-2.5 text-sm font-black backdrop-blur sm:text-base">
                    {categoryLabel[c]}
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* الكتالوج */}
        <section id="shop" aria-labelledby="shop-title" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 id="shop-title" className="text-3xl font-black sm:text-4xl">
                {cat === "all" ? "كل المنتجات" : categoryLabel[cat]}
              </h2>
              <p className="mt-1 text-sm text-black/55">{list.length} {list.length === 1 ? "منتج" : list.length <= 10 ? "منتجات" : "منتجاً"}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="relative">
                <span className="sr-only">ابحث في المتجر</span>
                <Search className="pointer-events-none absolute inset-y-0 start-3 my-auto size-4 text-black/40" aria-hidden />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث عن منتج…"
                  className="h-11 w-full rounded-full border border-black/10 bg-white ps-9 pe-4 text-sm outline-none focus:border-black/30 sm:w-56"
                />
              </label>
              <label className="relative">
                <span className="sr-only">ترتيب المنتجات</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="h-11 w-full appearance-none rounded-full border border-black/10 bg-white ps-4 pe-9 text-sm font-semibold outline-none sm:w-auto"
                >
                  <option value="featured">الأكثر طلباً</option>
                  <option value="low">السعر: من الأقل</option>
                  <option value="high">السعر: من الأعلى</option>
                </select>
                <ChevronDown className="pointer-events-none absolute inset-y-0 end-3 my-auto size-4 text-black/50" aria-hidden />
              </label>
            </div>
          </div>

          <div role="group" aria-label="تصفية حسب القسم" className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {(Object.keys(categoryLabel) as (Category | "all")[]).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={cn("h-10 shrink-0 rounded-full px-5 text-sm font-bold transition-colors", cat === c ? "bg-[#111] text-white" : "bg-white text-black/70 ring-1 ring-black/10 hover:ring-black/25")}
              >
                {categoryLabel[c]}
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <p className="mt-16 text-center text-black/55">لا توجد منتجات مطابقة لبحثك.</p>
          ) : (
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
              {list.map((p) => (
                <li key={p.id} className="group">
                  <button type="button" onClick={() => setQuick(p)} className="relative block w-full overflow-hidden rounded-3xl text-start">
                    <span className="relative block aspect-square bg-white">
                      <Image src={p.images[0]} alt={p.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                    </span>
                    {p.badge && (
                      <span className="absolute top-3 start-3 rounded-full px-2.5 py-1 text-[11px] font-black text-white" style={{ background: p.badge === "خصم" ? ORANGE : "#111" }}>
                        {p.badge}
                      </span>
                    )}
                    <span className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-white py-2.5 text-center text-sm font-black opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100 max-md:hidden">
                      إضافة سريعة
                    </span>
                  </button>
                  <div className="mt-3 flex items-start justify-between gap-2 px-1">
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 text-sm leading-6 font-bold sm:text-base">{p.name}</h3>
                      <p className="mt-1 flex items-baseline gap-2 text-sm">
                        <span className="font-black">{egp(p.price)}</span>
                        {p.oldPrice && <span className="text-xs text-black/55 line-through">{egp(p.oldPrice)}</span>}
                      </p>
                    </div>
                    {p.images.length > 1 && <span className="shrink-0 pt-1 text-[11px] font-semibold text-black/55">+{p.images.length - 1} صور</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* المزايا */}
        <section aria-label="مزايا التسوق" className="border-y border-black/10 bg-white">
          <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
            {[
              { icon: Truck, t: "شحن سريع", d: "توصيل خلال 2–4 أيام عمل لكل المحافظات." },
              { icon: ShieldCheck, t: "دفع آمن", d: "بطاقات ومحافظ إلكترونية أو عند الاستلام." },
              { icon: RefreshCcw, t: "استبدال سهل", d: "استبدال مجاني للمقاس خلال 14 يوماً." },
              { icon: BadgeCheck, t: "جودة مضمونة", d: "أقمشة مختبرة لتحمّل التمرين اليومي." },
            ].map(({ icon: Icon, t, d }) => (
              <li key={t}>
                <Icon className="size-6" style={{ color: BRIGHT }} aria-hidden />
                <p className="mt-3 font-black">{t}</p>
                <p className="mt-1 text-sm leading-6 text-black/60">{d}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* بانر */}
        <section className="mx-auto max-w-7xl px-4 py-14">
          <div className="relative isolate grid items-center gap-8 overflow-hidden rounded-[2.5rem] bg-[#111] p-8 text-white sm:p-12 md:grid-cols-[1.2fr_1fr]">
            <div aria-hidden className="absolute -top-20 -end-20 -z-10 size-80 rounded-full opacity-40 blur-3xl" style={{ background: BRIGHT }} />
            <div>
              <p className="text-sm font-bold" style={{ color: BRIGHT }}>
                لفترة محدودة
              </p>
              <h2 className="mt-2 text-3xl leading-tight font-black text-white sm:text-5xl">خصم 20% على أحذية الكرة</h2>
              <p className="mt-4 max-w-md leading-8 text-white/70">استخدم الكود عند إتمام الطلب، والعرض ساري حتى نفاد الكمية.</p>
              <p dir="ltr" className="mt-6 inline-block rounded-xl border border-dashed border-white/40 px-5 py-2.5 font-mono text-lg font-bold tracking-widest">
                RUN20
              </p>
            </div>
            <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-[2rem] bg-white" aria-hidden>
              <Image src="/images/demos/store/turf-collection.webp" alt="" fill sizes="(min-width: 768px) 28rem, 90vw" className="object-cover" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 bg-white py-10 pb-28 text-sm text-black/55">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <span dir="ltr" className="text-lg font-black tracking-[0.18em] text-black">
            RAKD
          </span>
          <p>© رَكض للملابس الرياضية. موقع نموذجي من تصميم حلولك تيك.</p>
        </div>
      </footer>

      {/* إشعار الإضافة */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-[85] flex justify-center px-4">
        {toast && (
          <p className="animate-fade-up flex items-center gap-2 rounded-full bg-[#111] px-5 py-3 text-sm font-bold text-white shadow-2xl">
            <Check className="size-4" style={{ color: BRIGHT }} aria-hidden />
            {toast}
          </p>
        )}
      </div>

      {quick && <QuickView product={quick} onClose={() => setQuick(null)} onAdd={(s, q) => { add(quick, s, q); setQuick(null); }} />}

      {/* السلة */}
      <div className={cn("fixed inset-0 z-[80] transition-opacity", cartOpen ? "opacity-100" : "pointer-events-none opacity-0")} inert={!cartOpen}>
        <button type="button" tabIndex={-1} aria-label="إغلاق السلة" onClick={() => setCartOpen(false)} className="absolute inset-0 bg-black/40" />
        <aside
          role="dialog"
          aria-label="سلة التسوق"
          className={cn("absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300", cartOpen ? "translate-x-0" : "-translate-x-full")}
        >
          <div className="flex items-center justify-between border-b border-black/10 p-5">
            <p className="text-lg font-black">سلة التسوق ({count})</p>
            <button type="button" onClick={() => setCartOpen(false)} aria-label="إغلاق" className="flex size-9 items-center justify-center rounded-full hover:bg-black/5">
              <X className="size-5" aria-hidden />
            </button>
          </div>
          {cart.length > 0 && (
            <div className="border-b border-black/10 px-5 py-4">
              <p className="text-sm font-semibold">
                {subtotal >= FREE_SHIPPING ? "🎉 طلبك مؤهل للشحن المجاني" : `أضف ${egp(FREE_SHIPPING - subtotal)} لتحصل على شحن مجاني`}
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/10">
                <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%`, background: BRIGHT }} />
              </div>
            </div>
          )}
          <div className="flex-1 overflow-y-auto p-5">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingBag className="size-12 text-black/20" aria-hidden />
                <p className="mt-4 font-bold">سلتك فارغة</p>
                <button type="button" onClick={() => setCartOpen(false)} className="mt-4 rounded-full px-6 py-2.5 text-sm font-bold text-white" style={{ background: ORANGE }}>
                  ابدأ التسوق
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {cart.map((l) => (
                  <li key={l.key} className="flex gap-3">
                    <span className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-[#F4F3EF]">
                      <Image src={l.product.images[0]} alt="" fill sizes="80px" className="object-cover" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{l.product.name}</p>
                      <p className="mt-0.5 text-xs text-black/55">
                        المقاس: {l.size}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="flex items-center rounded-full ring-1 ring-black/15">
                          <button type="button" onClick={() => setQty(l.key, l.qty - 1)} aria-label="إنقاص الكمية" className="flex size-8 items-center justify-center">
                            <Minus className="size-3.5" aria-hidden />
                          </button>
                          <span className="w-6 text-center text-sm font-bold tabular-nums">{l.qty}</span>
                          <button type="button" onClick={() => setQty(l.key, l.qty + 1)} aria-label="زيادة الكمية" className="flex size-8 items-center justify-center">
                            <Plus className="size-3.5" aria-hidden />
                          </button>
                        </span>
                        <span className="text-sm font-black">{egp(l.qty * l.product.price)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {cart.length > 0 && (
            <div className="space-y-2 border-t border-black/10 p-5 text-sm">
              <p className="flex justify-between">
                <span className="text-black/60">المجموع الفرعي</span>
                <span className="font-bold">{egp(subtotal)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-black/60">الشحن</span>
                <span className="font-bold">{shipping === 0 ? "مجاني" : egp(shipping)}</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  setCartOpen(false);
                  setCheckout(true);
                }}
                className="mt-3 flex h-13 w-full items-center justify-center gap-2 rounded-full font-black text-white"
                style={{ background: ORANGE }}
              >
                إتمام الطلب · {egp(subtotal + shipping)}
              </button>
            </div>
          )}
        </aside>
      </div>

      {checkout && <Checkout lines={cart} subtotal={subtotal} shipping={shipping} onClose={() => setCheckout(false)} onDone={() => setCart([])} />}
    </>
  );
}

function QuickView({ product: p, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: (size: string, qty: number) => void }) {
  const [shot, setShot] = useState(0);
  const [size, setSize] = useState(p.sizes.length === 1 ? p.sizes[0] : "");
  const [qty, setQty] = useState(1);
  const [err, setErr] = useState(false);
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={p.name}>
      <button type="button" tabIndex={-1} aria-label="إغلاق" onClick={onClose} className="absolute inset-0 bg-black/45" />
      <div className="animate-fade-up relative grid max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-white sm:rounded-[2rem] md:grid-cols-[1.1fr_1fr]">
        <button type="button" onClick={onClose} aria-label="إغلاق" className="absolute top-3 end-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 shadow">
          <X className="size-5" aria-hidden />
        </button>
        <div className="bg-[#F4F3EF] p-3">
          <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-white">
            <Image src={p.images[shot]} alt={p.name} fill sizes="(min-width: 768px) 32rem, 100vw" className="object-cover" />
          </div>
          {p.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {p.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setShot(i)}
                  aria-label={`الصورة ${i + 1}`}
                  aria-pressed={shot === i}
                  className={cn("relative size-16 overflow-hidden rounded-xl bg-white ring-2 transition", shot === i ? "ring-[#111]" : "ring-transparent opacity-70 hover:opacity-100")}
                >
                  <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-xs font-bold text-black/50">{categoryLabel[p.category]}</p>
          <h3 className="mt-1 text-2xl font-black">{p.name}</h3>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black">{egp(p.price)}</span>
            {p.oldPrice && <span className="text-sm text-black/55 line-through">{egp(p.oldPrice)}</span>}
          </p>
          <p className="mt-3 text-sm leading-7 text-black/60">{p.note}</p>

          <p className="mt-6 text-sm font-bold">المقاس</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s);
                  setErr(false);
                }}
                aria-pressed={size === s}
                className={cn("h-10 min-w-12 rounded-xl px-3 text-sm font-bold ring-1 transition", size === s ? "bg-[#111] text-white ring-[#111]" : "ring-black/15 hover:ring-black/40")}
              >
                {s}
              </button>
            ))}
          </div>
          {err && <p className="mt-2 text-sm font-semibold text-red-600">اختر المقاس أولاً.</p>}

          <div className="mt-6 flex items-center gap-3">
            <span className="flex items-center rounded-full ring-1 ring-black/15">
              <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="إنقاص الكمية" className="flex size-11 items-center justify-center">
                <Minus className="size-4" aria-hidden />
              </button>
              <span className="w-7 text-center font-bold tabular-nums">{qty}</span>
              <button type="button" onClick={() => setQty(qty + 1)} aria-label="زيادة الكمية" className="flex size-11 items-center justify-center">
                <Plus className="size-4" aria-hidden />
              </button>
            </span>
            <button
              type="button"
              onClick={() => (size ? onAdd(size, qty) : setErr(true))}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full font-black text-white"
              style={{ background: ORANGE }}
            >
              <ShoppingBag className="size-5" aria-hidden />
              أضف إلى السلة
            </button>
          </div>
          <ul className="mt-6 space-y-2 border-t border-black/10 pt-5 text-sm text-black/60">
            <li className="flex items-center gap-2">
              <Truck className="size-4" aria-hidden />
              توصيل خلال 2–4 أيام عمل
            </li>
            <li className="flex items-center gap-2">
              <RefreshCcw className="size-4" aria-hidden />
              استبدال مجاني للمقاس خلال 14 يوماً
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Checkout({ lines, subtotal, shipping, onClose, onDone }: { lines: Line[]; subtotal: number; shipping: number; onClose: () => void; onDone: () => void }) {
  const [pay, setPay] = useState<"cod" | "card" | "wallet">("cod");
  const [code, setCode] = useState("");
  const [done, setDone] = useState(false);
  const shoesTotal = lines.filter((l) => l.product.category === "shoes").reduce((n, l) => n + l.qty * l.product.price, 0);
  const discount = code.trim().toUpperCase() === "RUN20" ? Math.round(shoesTotal * 0.2) : 0;
  const total = subtotal + shipping - discount;
  const field = "h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-sm outline-none focus:border-black/40";

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="إتمام الطلب">
      <button type="button" tabIndex={-1} aria-label="إغلاق" onClick={onClose} className="absolute inset-0 bg-black/45" />
      <div className="animate-fade-up relative max-h-[94dvh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-[#F4F3EF] sm:rounded-[2rem]">
        <button type="button" onClick={onClose} aria-label="إغلاق" className="absolute top-4 end-4 z-10 flex size-9 items-center justify-center rounded-full bg-white shadow">
          <X className="size-5" aria-hidden />
        </button>
        {done ? (
          <div role="status" className="p-10 text-center sm:p-16">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full text-white" style={{ background: ORANGE }}>
              <Check className="size-8" aria-hidden />
            </span>
            <p className="mt-5 text-2xl font-black">تم استلام طلبك!</p>
            <p dir="ltr" className="mt-2 font-mono text-black/60">#RK-{String(Date.now()).slice(-6)}</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-black/60">
              هذا متجر نموذجي؛ في المتجر الفعلي يصلك تأكيد الطلب عبر واتساب والبريد، ويظهر الطلب فوراً في لوحة تحكم صاحب المتجر.
            </p>
            <button type="button" onClick={onClose} className="mt-6 rounded-full bg-[#111] px-7 py-3 font-bold text-white">
              العودة إلى المتجر
            </button>
          </div>
        ) : (
          <form
            className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1.2fr_1fr]"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
              onDone();
            }}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-black">إتمام الطلب</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <input required aria-label="الاسم بالكامل" placeholder="الاسم بالكامل" className={field} />
                <input required aria-label="رقم الهاتف" type="tel" dir="ltr" placeholder="01xxxxxxxxx" className={`${field} text-end`} />
              </div>
              <select required aria-label="المحافظة" defaultValue="" className={field}>
                <option value="" disabled>
                  المحافظة
                </option>
                {["القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "أسيوط"].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
              <input required aria-label="العنوان بالتفصيل" placeholder="العنوان بالتفصيل" className={field} />
              <fieldset>
                <legend className="mb-2 text-sm font-bold">طريقة الدفع</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {([
                    ["cod", "عند الاستلام"],
                    ["card", "بطاقة بنكية"],
                    ["wallet", "محفظة إلكترونية"],
                  ] as const).map(([v, l]) => (
                    <label key={v} className={cn("flex cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold ring-1", pay === v ? "ring-2 ring-[#111]" : "ring-black/15")}>
                      <input type="radio" name="pay" value={v} checked={pay === v} onChange={() => setPay(v)} className="accent-[#FF5A1F]" />
                      {l}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className="rounded-3xl bg-white p-5">
              <p className="font-black">ملخص الطلب</p>
              <ul className="mt-4 max-h-48 space-y-3 overflow-y-auto">
                {lines.map((l) => (
                  <li key={l.key} className="flex items-center gap-3 text-sm">
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-[#F4F3EF]">
                      <Image src={l.product.images[0]} alt="" fill sizes="48px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1 truncate">
                      {l.product.name} × {l.qty}
                    </span>
                    <span className="font-bold">{egp(l.qty * l.product.price)}</span>
                  </li>
                ))}
              </ul>
              <label className="mt-4 flex gap-2">
                <span className="sr-only">كود الخصم</span>
                <input value={code} onChange={(e) => setCode(e.target.value)} dir="ltr" placeholder="كود الخصم (جرّب RUN20)" className={`${field} h-11 text-end`} />
              </label>
              <div className="mt-4 space-y-1.5 border-t border-black/10 pt-4 text-sm">
                <p className="flex justify-between">
                  <span className="text-black/60">المجموع الفرعي</span>
                  <span className="font-bold">{egp(subtotal)}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-black/60">الشحن</span>
                  <span className="font-bold">{shipping === 0 ? "مجاني" : egp(shipping)}</span>
                </p>
                {discount > 0 && (
                  <p className="flex justify-between" style={{ color: ORANGE }}>
                    <span>خصم RUN20</span>
                    <span className="font-bold">− {egp(discount)}</span>
                  </p>
                )}
                <p className="flex justify-between pt-2 text-base">
                  <span className="font-black">الإجمالي</span>
                  <span className="font-black">{egp(total)}</span>
                </p>
              </div>
              <button type="submit" className="mt-5 h-13 w-full rounded-full font-black text-white" style={{ background: ORANGE }}>
                تأكيد الطلب
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { Award, BookOpen, Check, ChevronDown, Clock, Lock, MonitorPlay, PlayCircle, Search, Sparkles, Users, Video, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { courses, egp, paths, tracks, type Course, type Level, type Track } from "./data";

/* ============================================================
   منصة تعليمية نموذجية: «أكاديمية مَدار» (نشاط وهمي)
   كتالوج دورات بالبحث والفلترة، صفحة دورة بالمنهج الكامل،
   تسجيل، مسارات تعلم، لوحة الطالب، واشتراك شهري/سنوي.
   ============================================================ */

const INDIGO = "#3B2DB8";
const AMBER = "#FFB020";

const initials = (name: string) =>
  name
    .replace(/^(م\.|أ\.|د\.)\s*/, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join(" ");

/** غلاف الدورة: تدرّج لوني بمسار الدورة + نمط هندسي + أيقونة */
export function CourseCover({ course, className }: { course: Course; className?: string }) {
  const tr = tracks[course.track];
  const Icon = tr.icon;
  return (
    <div aria-hidden className={cn("relative isolate overflow-hidden", className)} style={{ background: `linear-gradient(135deg, ${tr.from}, ${tr.to})` }}>
      <div className="absolute inset-0 -z-10 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1.2px, transparent 0)", backgroundSize: "18px 18px" }} />
      <div className="absolute -bottom-10 -start-10 size-40 rounded-full border-[18px] border-white/15" />
      <div className="absolute top-4 end-4 flex size-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur">
        <Icon className="size-7" />
      </div>
      <p className="absolute start-4 bottom-4 max-w-[75%] text-lg leading-7 font-bold text-white">{tr.label}</p>
    </div>
  );
}

export function MadarAcademy() {
  const [track, setTrack] = useState<Track | "all">("all");
  const [level, setLevel] = useState<Level | "all">("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Course | null>(null);
  const [yearly, setYearly] = useState(true);
  const [faq, setFaq] = useState<number | null>(0);

  const list = useMemo(
    () => courses.filter((c) => (track === "all" || c.track === track) && (level === "all" || c.level === level) && (!query.trim() || c.title.includes(query.trim()))),
    [track, level, query],
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <a href="#top" className="flex items-center gap-2.5" aria-label="أكاديمية مَدار — الرئيسية">
            <span className="relative flex size-9 items-center justify-center rounded-full" style={{ background: INDIGO }}>
              <span className="size-3.5 rounded-full" style={{ background: AMBER }} />
              <span className="absolute inset-1 rounded-full border-2 border-white/30" />
            </span>
            <span className="text-xl font-bold">أكاديمية مَدار</span>
          </a>
          <nav aria-label="أقسام المنصة" className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <a href="#courses" className="hover:text-slate-900">الدورات</a>
            <a href="#paths" className="hover:text-slate-900">المسارات</a>
            <a href="#experience" className="hover:text-slate-900">تجربة الطالب</a>
            <a href="#pricing" className="hover:text-slate-900">الاشتراك</a>
          </nav>
          <a href="#pricing" className="rounded-full px-5 py-2.5 text-sm font-bold text-white" style={{ background: INDIGO }}>
            ابدأ مجاناً
          </a>
        </div>
      </header>

      <main id="top">
        {/* الهيرو */}
        <section className="relative isolate overflow-hidden">
          <div aria-hidden className="absolute -top-40 -end-40 -z-10 size-[560px] rounded-full opacity-25 blur-[120px]" style={{ background: INDIGO }} />
          <div aria-hidden className="absolute top-60 -start-40 -z-10 size-[420px] rounded-full opacity-20 blur-[120px]" style={{ background: AMBER }} />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold" style={{ color: INDIGO }}>
                <Sparkles className="size-3.5" aria-hidden />
                تعلّم بالعربي، بمستوى عالمي
              </p>
              <h1 className="mt-5 text-4xl leading-[1.25] font-bold text-slate-900 sm:text-6xl">
                تعلّم المهارة،
                <br />
                <span style={{ color: INDIGO }}>وابدأ مسيرتك.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                دورات عملية في البرمجة والتصميم والتسويق والبيانات، يقدمها مدربون يعملون في السوق فعلاً، مع مشاريع حقيقية وشهادة إتمام.
              </p>
              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-indigo-900/10 ring-1 ring-slate-200"
              >
                <Search className="ms-2 size-5 shrink-0 text-slate-400" aria-hidden />
                <label className="flex-1">
                  <span className="sr-only">ابحث عن دورة</span>
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ماذا تريد أن تتعلم اليوم؟" className="h-11 w-full bg-transparent text-sm outline-none" />
                </label>
                <button type="submit" className="h-11 rounded-xl px-5 text-sm font-bold text-white" style={{ background: INDIGO }}>
                  ابحث
                </button>
              </form>
              <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-slate-600">
                <li className="flex items-center gap-2"><MonitorPlay className="size-4.5" style={{ color: INDIGO }} aria-hidden />{courses.length} دورات عملية</li>
                <li className="flex items-center gap-2"><Video className="size-4.5" style={{ color: INDIGO }} aria-hidden />جلسات مباشرة أسبوعية</li>
                <li className="flex items-center gap-2"><Award className="size-4.5" style={{ color: INDIGO }} aria-hidden />شهادة إتمام لكل دورة</li>
              </ul>
            </div>

            {/* بطاقة الطالب */}
            <div className="relative mx-auto w-full max-w-md" aria-hidden>
              <div className="rounded-[2rem] bg-white p-6 shadow-2xl shadow-indigo-900/15 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: INDIGO }}>
                    س ع
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">أهلاً سارة 👋</p>
                    <p className="text-xs text-slate-500">واصلي من حيث توقفتِ</p>
                  </div>
                </div>
                <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-slate-200">
                  <CourseCover course={courses[0]} className="h-32" />
                  <div className="p-4">
                    <p className="text-sm font-bold text-slate-900">{courses[0].title}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>الدرس 41 من {courses[0].lessons}</span>
                      <span className="font-bold" style={{ color: INDIGO }}>64%</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[64%] rounded-full" style={{ background: INDIGO }} />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-amber-50 p-3.5">
                  <Video className="size-5 shrink-0 text-amber-600" />
                  <p className="text-xs leading-5 text-amber-900">
                    <b>جلسة مباشرة اليوم 8:00 م</b>
                    <br />
                    مراجعة مشروع React مع م. كريم
                  </p>
                </div>
              </div>
              <div className="absolute -start-6 -bottom-6 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-slate-200">
                <Award className="size-6" style={{ color: AMBER }} />
                <span className="text-xs font-bold text-slate-800">
                  شهادة جديدة!
                  <br />
                  <span className="font-medium text-slate-500">تحليل البيانات بـ Excel</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* الدورات */}
        <section id="courses" aria-labelledby="courses-title" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="courses-title" className="text-3xl font-bold text-slate-900 sm:text-4xl">
                الدورات
              </h2>
              <p className="mt-1 text-sm text-slate-500">{list.length} دورة متاحة الآن</p>
            </div>
            <label className="relative">
              <span className="sr-only">المستوى</span>
              <select value={level} onChange={(e) => setLevel(e.target.value as Level | "all")} className="h-11 appearance-none rounded-xl border border-slate-200 bg-white ps-4 pe-9 text-sm font-semibold outline-none">
                <option value="all">كل المستويات</option>
                <option value="مبتدئ">مبتدئ</option>
                <option value="متوسط">متوسط</option>
                <option value="متقدم">متقدم</option>
              </select>
              <ChevronDown className="pointer-events-none absolute inset-y-0 end-3 my-auto size-4 text-slate-400" aria-hidden />
            </label>
          </div>
          <div role="group" aria-label="تصفية حسب المجال" className="mt-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {(["all", ...Object.keys(tracks)] as (Track | "all")[]).map((t) => {
              const on = track === t;
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setTrack(t)}
                  className={cn("h-10 shrink-0 rounded-full px-5 text-sm font-bold transition-colors", on ? "text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300")}
                  style={on ? { background: INDIGO } : undefined}
                >
                  {t === "all" ? "كل المجالات" : tracks[t].label}
                </button>
              );
            })}
          </div>

          {list.length === 0 ? (
            <p className="mt-16 text-center text-slate-500">لا توجد دورات مطابقة. جرّب مجالاً أو مستوى آخر.</p>
          ) : (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((c) => (
                <li key={c.id}>
                  <button type="button" onClick={() => setOpen(c)} className="group flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white text-start shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-900/10">
                    <div className="relative">
                      <CourseCover course={c} className="h-36" />
                      {c.tag && (
                        <span className="absolute top-3 start-3 rounded-full px-2.5 py-1 text-[11px] font-bold" style={c.tag === "مباشر" ? { background: "#DC2626", color: "#fff" } : { background: AMBER, color: "#2A1B00" }}>
                          {c.tag === "مباشر" ? "● مباشر" : c.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-xs font-bold" style={{ color: INDIGO }}>
                        {c.level}
                      </span>
                      <h3 className="mt-1.5 leading-7 font-bold text-slate-900">{c.title}</h3>
                      <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                        <span className="flex size-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-700">{initials(c.instructor.name)}</span>
                        {c.instructor.name}
                      </p>
                      <p className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                        <span className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><BookOpen className="size-3.5" aria-hidden />{c.lessons} درساً</span>
                          <span className="flex items-center gap-1"><Clock className="size-3.5" aria-hidden />{c.hours} ساعة</span>
                        </span>
                        <span className="text-sm font-bold text-slate-900">{egp(c.price)}</span>
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* المسارات */}
        <section id="paths" aria-labelledby="paths-title" className="scroll-mt-20 bg-[#12102B] py-16 text-white">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-sm font-bold" style={{ color: AMBER }}>
              مسارات مهنية
            </p>
            <h2 id="paths-title" className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              لا تتعلم دورات متفرقة. اتبع مساراً واضحاً.
            </h2>
            <ul className="mt-10 grid gap-5 lg:grid-cols-3">
              {paths.map((p) => {
                const tr = tracks[p.track];
                const Icon = tr.icon;
                return (
                  <li key={p.title} className="rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10">
                    <div className="flex items-center justify-between">
                      <span className="flex size-12 items-center justify-center rounded-2xl" style={{ background: `linear-gradient(135deg, ${tr.from}, ${tr.to})` }}>
                        <Icon className="size-6" aria-hidden />
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">{p.months} أشهر</span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-white">{p.title}</h3>
                    <ol className="mt-5 space-y-3">
                      {p.steps.map((s, i) => (
                        <li key={s} className="flex items-center gap-3 text-sm text-white/80">
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-[#12102B]" style={{ background: i === p.steps.length - 1 ? AMBER : "#fff" }}>
                            {i + 1}
                          </span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* تجربة الطالب */}
        <section id="experience" aria-labelledby="exp-title" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16">
          <h2 id="exp-title" className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            كل ما تحتاجه لتتعلم فعلاً
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: PlayCircle, t: "دروس قصيرة مركّزة", d: "فيديوهات من 10 إلى 30 دقيقة تشاهدها في أي وقت ومن أي جهاز." },
              { icon: Video, t: "جلسات مباشرة", d: "أسئلتك تُجاب أسبوعياً مع المدرب ومجتمع الدارسين." },
              { icon: BookOpen, t: "مشاريع وتقييمات", d: "تطبيق عملي واختبارات قصيرة بعد كل وحدة." },
              { icon: Award, t: "شهادة إتمام", d: "شهادة برمز تحقق تضيفها إلى سيرتك الذاتية." },
            ].map(({ icon: Icon, t, d }) => (
              <li key={t} className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-indigo-50" style={{ color: INDIGO }}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-bold text-slate-900">{t}</h3>
                <p className="mt-1.5 text-sm leading-7 text-slate-600">{d}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* الاشتراك */}
        <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-20 bg-indigo-50/60 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 id="pricing-title" className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
              اشترك مرة، وتعلّم بلا حدود
            </h2>
            <div className="mt-6 flex justify-center">
              <div role="group" aria-label="مدة الاشتراك" className="inline-flex rounded-full bg-white p-1 ring-1 ring-slate-200">
                {[false, true].map((y) => (
                  <button
                    key={String(y)}
                    type="button"
                    aria-pressed={yearly === y}
                    onClick={() => setYearly(y)}
                    className={cn("rounded-full px-5 py-2 text-sm font-bold", yearly === y ? "text-white" : "text-slate-600")}
                    style={yearly === y ? { background: INDIGO } : undefined}
                  >
                    {y ? "سنوي (وفّر 35%)" : "شهري"}
                  </button>
                ))}
              </div>
            </div>
            <ul className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
              {[
                { name: "دورة واحدة", price: "من 890", per: "ج.م مرة واحدة", items: ["وصول دائم للدورة", "مشاريع وتقييمات", "شهادة إتمام"], featured: false },
                { name: "مَدار بلس", price: yearly ? "199" : "299", per: "ج.م / شهرياً", items: ["كل الدورات الحالية والجديدة", "الجلسات المباشرة الأسبوعية", "مسارات مهنية كاملة", "شهادات غير محدودة"], featured: true },
                { name: "للشركات", price: "حسب الفريق", per: "", items: ["حسابات لفريقك", "تقارير تقدم لكل موظف", "مسارات مخصصة لشركتك"], featured: false },
              ].map((p) => (
                <li key={p.name} className={cn("flex flex-col rounded-3xl p-7", p.featured ? "text-white shadow-2xl shadow-indigo-900/25" : "bg-white ring-1 ring-slate-200")} style={p.featured ? { background: INDIGO } : undefined}>
                  {p.featured && (
                    <span className="mb-3 self-start rounded-full px-3 py-1 text-xs font-bold text-[#2A1B00]" style={{ background: AMBER }}>
                      الأكثر اختياراً
                    </span>
                  )}
                  <h3 className={cn("text-xl font-bold", p.featured ? "text-white" : "text-slate-900")}>{p.name}</h3>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{p.price}</span>
                    <span className={p.featured ? "text-white/70" : "text-slate-500"}>{p.per}</span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {p.items.map((x) => (
                      <li key={x} className="flex items-center gap-2">
                        <Check className="size-4 shrink-0" style={{ color: p.featured ? AMBER : INDIGO }} aria-hidden />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <a href="#courses" className={cn("mt-7 rounded-xl py-3 text-center font-bold", p.featured ? "bg-white text-slate-900" : "text-white")} style={p.featured ? undefined : { background: INDIGO }}>
                    {p.name === "للشركات" ? "تواصل معنا" : "ابدأ الآن"}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* أسئلة */}
        <section aria-labelledby="faq-title" className="mx-auto max-w-3xl px-4 py-16">
          <h2 id="faq-title" className="text-center text-3xl font-bold text-slate-900">
            أسئلة شائعة
          </h2>
          <div className="mt-8 divide-y divide-slate-200 rounded-3xl bg-white ring-1 ring-slate-200">
            {[
              ["هل أحتاج خبرة سابقة؟", "لا. دورات المستوى المبتدئ تبدأ من الصفر، وتوضح كل دورة مستواها والمتطلبات قبل التسجيل."],
              ["إلى متى يمكنني مشاهدة الدورة؟", "عند شراء دورة منفردة يبقى الوصول إليها دائماً، ومع اشتراك مَدار بلس تصل لكل الدورات طوال مدة الاشتراك."],
              ["هل الشهادة معتمدة؟", "تحصل على شهادة إتمام برمز تحقق إلكتروني يمكن لأي جهة التأكد منه."],
              ["هل يمكنني التجربة قبل الدفع؟", "نعم، أول درس في كل دورة مجاني، ويمكنك مشاهدته من صفحة الدورة."],
            ].map(([q, a], i) => (
              <div key={q}>
                <button type="button" aria-expanded={faq === i} onClick={() => setFaq(faq === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-start font-bold text-slate-900">
                  {q}
                  <ChevronDown className={cn("size-5 shrink-0 text-slate-400 transition-transform", faq === i && "rotate-180")} aria-hidden />
                </button>
                {faq === i && <p className="-mt-2 px-5 pb-5 text-sm leading-7 text-slate-600">{a}</p>}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-10 pb-28 text-center text-sm text-slate-500">© أكاديمية مَدار. موقع نموذجي من تصميم حلولك تيك.</footer>

      {open && <CourseSheet course={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function CourseSheet({ course: c, onClose }: { course: Course; onClose: () => void }) {
  const [mod, setMod] = useState(0);
  const [enrolled, setEnrolled] = useState(false);
  const total = c.modules.reduce((n, m) => n + m.lessons.length, 0);
  const field = "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-indigo-400";
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={c.title}>
      <button type="button" tabIndex={-1} aria-label="إغلاق" onClick={onClose} className="absolute inset-0 bg-slate-900/50" />
      <div className="animate-fade-up relative max-h-[94dvh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-white sm:rounded-[2rem]">
        <button type="button" onClick={onClose} aria-label="إغلاق" className="absolute top-4 start-4 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 shadow">
          <X className="size-5" aria-hidden />
        </button>
        <CourseCover course={c} className="h-40 sm:h-48" />
        <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-sm font-bold" style={{ color: INDIGO }}>
              {tracks[c.track].label} · {c.level}
            </p>
            <h3 className="mt-1 text-2xl leading-9 font-bold text-slate-900">{c.title}</h3>
            <p className="mt-3 leading-8 text-slate-600">{c.summary}</p>

            <p className="mt-6 font-bold text-slate-900">ماذا ستتعلم</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {c.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="mt-0.5 size-4 shrink-0" style={{ color: INDIGO }} aria-hidden />
                  {o}
                </li>
              ))}
            </ul>

            <p className="mt-7 font-bold text-slate-900">
              محتوى الدورة <span className="text-sm font-medium text-slate-500">· عيّنة من {total} دروس</span>
            </p>
            <div className="mt-3 divide-y divide-slate-200 rounded-2xl ring-1 ring-slate-200">
              {c.modules.map((m, i) => (
                <div key={m.title}>
                  <button type="button" aria-expanded={mod === i} onClick={() => setMod(mod === i ? -1 : i)} className="flex w-full items-center justify-between gap-3 p-4 text-start text-sm font-bold text-slate-900">
                    <span>
                      <span className="me-2 text-slate-400 tabular-nums">{i + 1}.</span>
                      {m.title}
                    </span>
                    <ChevronDown className={cn("size-4 shrink-0 text-slate-400 transition-transform", mod === i && "rotate-180")} aria-hidden />
                  </button>
                  {mod === i && (
                    <ul className="space-y-1 px-4 pb-4">
                      {m.lessons.map((l) => (
                        <li key={l.title} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                          <span className="flex items-center gap-2">
                            {l.free ? <PlayCircle className="size-4" style={{ color: INDIGO }} aria-hidden /> : <Lock className="size-4 text-slate-300" aria-hidden />}
                            {l.title}
                            {l.free && <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold" style={{ color: INDIGO }}>مجاني</span>}
                          </span>
                          <span className="shrink-0 text-xs text-slate-400 tabular-nums">{l.min} د</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <aside className="md:sticky md:top-6 md:self-start">
            <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-3xl font-bold text-slate-900">{egp(c.price)}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                <li className="flex items-center gap-2"><BookOpen className="size-4" aria-hidden />{c.lessons} درساً · {c.hours} ساعة</li>
                <li className="flex items-center gap-2"><Users className="size-4" aria-hidden />مجتمع للدارسين وجلسات أسئلة</li>
                <li className="flex items-center gap-2"><Award className="size-4" aria-hidden />شهادة إتمام برمز تحقق</li>
              </ul>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-200 pt-4">
                <span className="flex size-11 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: INDIGO }}>
                  {initials(c.instructor.name)}
                </span>
                <span className="text-sm">
                  <span className="block font-bold text-slate-900">{c.instructor.name}</span>
                  <span className="text-slate-500">{c.instructor.role}</span>
                </span>
              </div>
              {enrolled ? (
                <div role="status" className="mt-5 rounded-2xl bg-emerald-50 p-4 text-center text-sm text-emerald-800">
                  <Check className="mx-auto size-7" aria-hidden />
                  <p className="mt-2 font-bold">تم تسجيلك بنجاح!</p>
                  <p className="mt-1 text-xs leading-5 opacity-80">هذه منصة نموذجية؛ في المنصة الفعلية تُفتح الدورة فوراً في حسابك ويصلك بريد ترحيبي.</p>
                </div>
              ) : (
                <form
                  className="mt-5 space-y-2.5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEnrolled(true);
                  }}
                >
                  <input required aria-label="الاسم" placeholder="الاسم" className={field} />
                  <input required aria-label="البريد الإلكتروني" type="email" dir="ltr" placeholder="name@example.com" className={`${field} text-end`} />
                  <button type="submit" className="h-12 w-full rounded-xl font-bold text-white" style={{ background: INDIGO }}>
                    سجّل في الدورة
                  </button>
                  <p className="text-center text-xs text-slate-500">ضمان استرداد خلال 7 أيام</p>
                </form>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

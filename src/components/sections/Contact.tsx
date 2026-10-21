"use client";
import { isValidPhone, sendToInbox } from "@/config/forms";

import { useState } from "react";
import { ArrowLeft, Clock3, Mail, MapPin, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ConsentNote } from "@/components/legal/ConsentNote";
import { getServices } from "@/content/services";
import { tr, type Locale } from "@/i18n";
import { cn, whatsappLink } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";
import { waInquiry } from "@/lib/whatsapp-messages";

const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 transition-colors focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/10";

/**
 * نموذج التواصل: بيفتح واتساب برسالة جاهزة.
 * ونسخة من الطلب بتتبعت على info@holoolktech.com عبر Formspree (src/config/forms.ts) — فمفيش عميل يضيع حتى لو مكملش على واتساب.
 */

export function Contact({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const en = locale === "en";
  const services = getServices(locale);
  const contactItems = [
    {
      icon: MessageCircle,
      label: t("واتساب", "WhatsApp"),
      value: siteConfig.contact.phoneDisplay,
      href: whatsappLink(siteConfig.contact.whatsapp, waInquiry(locale)),
      ltr: true,
    },
    { icon: Mail, label: t("البريد الإلكتروني", "Email"), value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}`, ltr: true },
    { icon: MapPin, label: t("العنوان", "Location"), value: en ? siteConfig.contact.locationEn : siteConfig.contact.location },
    { icon: Clock3, label: t("مواعيد العمل", "Working hours"), value: en ? siteConfig.contact.hoursEn : siteConfig.contact.hours },
  ];
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [waHref, setWaHref] = useState("");

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // فخ للرسائل المزعجة: خانة مخفية عن الزوار، لو اتملت يبقى برنامج آلي — نتجاهل الطلب بهدوء
    if (new FormData(e.currentTarget).get("company_site")) return setSent(true);
    if (!form.name.trim() || !form.message.trim()) {
      setError(t("يُرجى إدخال الاسم وتفاصيل المشروع.", "Please enter your name and project details."));
      return;
    }
    if (form.phone.trim() && !isValidPhone(form.phone)) {
      setError(t("يُرجى إدخال رقم هاتف صحيح، أو ترك الخانة فارغة.", "Please enter a valid phone number, or leave it empty."));
      return;
    }
    setError("");

    const text = (
      en
        ? [
            "Hello Holoolk Tech,",
            `Name: ${form.name}`,
            form.phone && `Phone: ${form.phone}`,
            form.service && `Service: ${form.service}`,
            `Project details: ${form.message}`,
          ]
        : [
            "مرحباً حلولك تيك،",
            `الاسم: ${form.name}`,
            form.phone && `رقم الهاتف: ${form.phone}`,
            form.service && `الخدمة: ${form.service}`,
            `تفاصيل المشروع: ${form.message}`,
          ]
    )
      .filter(Boolean)
      .join("\n");

    // واتساب الأول (لازم يتفتح مباشرة بعد الضغط عشان المتصفح ميمنعوش)
    const href = whatsappLink(siteConfig.contact.whatsapp, text);
    setWaHref(href);
    window.open(href, "_blank", "noopener,noreferrer");
    trackEvent("lead", { service: form.service || "unspecified", locale });

    // نسخة احتياطية على الإيميل
    sendToInbox({ ...form, _subject: t(`طلب جديد من الموقع — ${form.name}`, `New website inquiry — ${form.name}`), locale });
    setSent(true);
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 px-3 py-6 sm:px-6 sm:py-10">
      <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-900 py-12 sm:rounded-[2.5rem] sm:py-16 lg:py-20">
        <div aria-hidden className="absolute -top-40 -end-40 -z-10 size-[520px] rounded-full bg-brand-600/40 blur-[120px]" />
        <div aria-hidden className="absolute -bottom-40 -start-20 -z-10 size-[420px] rounded-full bg-accent-500/25 blur-[120px]" />

        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* الدعوة */}
          <div>
            <h2 id="contact-title" className="text-4xl leading-[1.2] font-black tracking-tight text-white sm:text-5xl">
              {t("لنبدأ بناء موقعك.", "Let's build your website.")}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-9 text-slate-300">
              {t(
                "شاركنا فكرتك، وسنتواصل معك خلال 24 ساعة بخطة مبدئية ومقترح تفصيلي، دون أي التزام.",
                "Share your idea, and we'll get back to you within 24 hours with an initial plan and a detailed proposal, with no obligation.",
              )}
            </p>

            <a
              href={whatsappLink(siteConfig.contact.whatsapp, waInquiry(locale, t("أرغب في بدء مشروع موقع إلكتروني، وأودّ مناقشة التفاصيل معكم.", "I'd like to start a website project and discuss the details with you.")))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("contact", { source: "final_cta" })}
              className="mt-8 inline-flex h-14 items-center gap-3 rounded-2xl bg-white px-6 text-base font-bold text-slate-900 shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#25D366] text-white">
                <MessageCircle className="size-4.5" aria-hidden />
              </span>
              {t("تواصل عبر واتساب", "Chat on WhatsApp")}
              <ArrowLeft className="size-5" aria-hidden />
            </a>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {contactItems.map(({ icon: Icon, label, value, href, ltr }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon className="mt-1 size-5 shrink-0 text-accent-300" aria-hidden />
                  <span className="min-w-0">
                    <span className="block text-xs text-slate-400">{label}</span>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        dir={ltr ? "ltr" : undefined}
                        className="mt-0.5 block truncate text-sm font-bold text-white hover:text-accent-200"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="mt-0.5 block text-sm font-bold text-white">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* النموذج */}
          <form
            method="post"
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
            aria-describedby={error ? "form-error" : undefined}
          >
            <p className="text-lg font-black text-slate-900">{t("أو أرسل تفاصيل مشروعك", "Or send us your project details")}</p>
            <input type="text" name="company_site" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -start-[9999px] size-px opacity-0" />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label={t("الاسم", "Name")} htmlFor="name" required>
                <input id="name" name="name" maxLength={80} required aria-required="true" autoComplete="name" value={form.name} onChange={update("name")} placeholder={t("الاسم أو اسم الشركة", "Your name or company")} className={inputClasses} />
              </Field>
              <Field label={t("رقم الهاتف", "Phone")} htmlFor="phone">
                <input
                  id="phone"
                  name="phone"
                  maxLength={20}
                  type="tel"
                  dir="ltr"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder={t("01xxxxxxxxx", "+20 1xx xxx xxxx")}
                  className={cn(inputClasses, "rtl:text-end")}
                />
              </Field>
            </div>

            <Field label={t("الخدمة المطلوبة", "Service")} htmlFor="service" className="mt-4">
              <select id="service" name="service" value={form.service} onChange={update("service")} className={inputClasses}>
                <option value="">{t("اختر الخدمة", "Choose a service")}</option>
                {services.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value={t("غير محدد", "Not sure yet")}>{t("لست متأكداً — أحتاج إلى استشارة", "Not sure yet: I need advice")}</option>
              </select>
            </Field>

            <Field label={t("تفاصيل المشروع", "Project details")} htmlFor="message" required className="mt-4">
              <textarea
                id="message"
                name="message"
                maxLength={1500}
                required
                aria-required="true"
                rows={4}
                value={form.message}
                onChange={update("message")}
                placeholder={t("صف لنا نشاطك وما تحتاجه من الموقع…", "Tell us about your business and what you need from the website…")}
                className={cn(inputClasses, "resize-none leading-7")}
              />
            </Field>

            {error && (
              <p id="form-error" role="alert" className="mt-4 text-sm font-semibold text-rose-600">
                {error}
              </p>
            )}

            <button data-cta-band type="submit" className={buttonClasses({ size: "lg", className: "mt-6 w-full" })}>
              {t("إرسال التفاصيل", "Send details")}
            </button>
            <p className="mt-3 text-center text-xs text-slate-500" role="status">
              {sent
                ? (
                    <>
                      {t("شكراً لتواصلك. أكمل الإرسال من واتساب، وإن لم يُفتح تلقائياً ", "Thanks for reaching out. Finish sending on WhatsApp; if it didn't open automatically, ")}
                      {waHref ? (
                        <a href={waHref} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-700 underline underline-offset-4">
                          {t("اضغط هنا لإرسال رسالتك", "tap here to send your message")}
                        </a>
                      ) : (
                        t("راسلنا على الرقم الموضّح", "message us on the number shown")
                      )}
                      .
                    </>
                  )
                : t("سيُفتح واتساب برسالة جاهزة تتضمن بياناتك.", "WhatsApp will open with a ready-made message containing your details.")}
            </p>
            <ConsentNote className="mt-1" locale={locale} />
          </form>
        </Container>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      {children}
    </div>
  );
}

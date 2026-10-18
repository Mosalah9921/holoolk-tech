import { CalendarCheck, CreditCard, LayoutDashboard, MessageCircleMore, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { tr, type Locale } from "@/i18n";

const itemsEn: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: CalendarCheck, title: "Bookings & scheduling", text: "Self-service booking with automatic confirmations and reminders." },
  { icon: CreditCard, title: "Online payments", text: "Secure local and international gateways, with optional deposits." },
  { icon: LayoutDashboard, title: "Dashboard & reports", text: "Manage everything yourself and see your numbers in real time." },
  { icon: MessageCircleMore, title: "WhatsApp notifications", text: "Instant alerts for you and your customer on every new order or booking." },
];
const items: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: CalendarCheck, title: "حجز ومواعيد", text: "حجز ذاتي للعميل بتأكيد وتذكير تلقائي." },
  { icon: CreditCard, title: "دفع إلكتروني", text: "بوابات دفع محلية ودولية آمنة وعربون اختياري." },
  { icon: LayoutDashboard, title: "لوحة تحكم وتقارير", text: "تدير كل شيء بنفسك وترى أرقامك لحظياً." },
  { icon: MessageCircleMore, title: "إشعارات واتساب", text: "تنبيه فوري لك ولعميلك بكل طلب أو حجز جديد." },
];

/** أساس مشترك في كل حل — يطمئن العميل أن القاعدة قوية أياً كان مجاله */
export function SolutionsFoundation({ locale = "ar" }: { locale?: Locale }) {
  const t = tr(locale);
  const list = locale === "en" ? itemsEn : items;
  return (
    <section aria-labelledby="foundation-title" className="pb-12 sm:pb-16">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-800 px-6 py-10 text-white sm:px-10 sm:py-12">
          <span aria-hidden className="absolute -top-32 -end-32 -z-10 size-80 rounded-full bg-accent-500/25 blur-[100px]" />
          <div className="grid gap-8 lg:grid-cols-[0.75fr_2fr] lg:items-center lg:gap-12">
            <div>
              <p className="text-sm font-bold text-accent-200">{t("مهما كان مجالك", "Whatever your industry")}</p>
              <h2 id="foundation-title" className="mt-2 text-2xl leading-[1.35] font-black text-white sm:text-3xl">
                {t("أساس قوي مدمج في كل حل", "A solid foundation built into every solution")}
              </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {list.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 transition-colors hover:bg-white/10">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-accent-200">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <p className="mt-4 font-bold text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/65">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

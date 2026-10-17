import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/utils";

/**
 * شريط "نموذج تجريبي" أعلى كل موقع نموذجي + زرار عائم "اطلب موقع زي ده".
 * مهم: بيوضح للزائر إن البيانات وهمية وإن الموقع من شغل حلولك تيك.
 */
export function DemoBanner({ name }: { name: string }) {
  return (
    <div data-demo-chrome className="relative z-[70] bg-[#090D16] font-[family-name:var(--font-base)] text-white" dir="rtl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 text-xs sm:text-sm">
        <p className="flex items-center gap-2">
          <Sparkles className="size-4 shrink-0 text-emerald-400" aria-hidden />
          <span>
            <b>موقع نموذجي</b> من تصميم {siteConfig.name} — &quot;{name}&quot; نشاط افتراضي والبيانات لأغراض العرض فقط.
          </span>
        </p>
        <Link href="/work" className="flex items-center gap-1 font-bold text-emerald-300 hover:text-emerald-200">
          <ArrowRight className="size-4" aria-hidden />
          العودة إلى أعمالنا
        </Link>
      </div>
    </div>
  );
}

export function DemoCTA({ name }: { name: string }) {
  return (
    <a
      href={whatsappLink(siteConfig.contact.whatsapp, `مرحباً حلولك تيك، اطّلعت على النموذج "${name}" وأرغب في موقع مماثل.`)}
      target="_blank"
      rel="noopener noreferrer"
      data-demo-chrome
      className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-[#090D16]/95 px-5 py-3 font-[family-name:var(--font-base)] text-sm font-bold whitespace-nowrap text-white shadow-2xl shadow-black/40 backdrop-blur transition-transform hover:scale-105"
    >
      <span className="size-2 animate-pulse rounded-full bg-emerald-400" aria-hidden />
      هل تريد موقعاً مماثلاً؟ تواصل مع {siteConfig.nameEn}
    </a>
  );
}

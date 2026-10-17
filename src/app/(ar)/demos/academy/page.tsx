import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import { DemoBanner, DemoCTA } from "@/components/demos/DemoChrome";
import { MadarAcademy } from "@/components/demos/academy/MadarAcademy";

/* موقع نموذجي: «أكاديمية مَدار» منصة تعليمية (نشاط وهمي) — نيلي + كهرماني */
const readex = Readex_Pro({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  alternates: { canonical: "/demos/academy" },
  title: "نموذج: أكاديمية مَدار — منصة تعليمية",
  description: "منصة تعليمية نموذجية: كتالوج دورات بالبحث والفلترة، صفحة دورة بالمنهج، مسارات مهنية، واشتراكات. من تصميم حلولك تيك.",
};

export default function AcademyDemo() {
  return (
    <div className={`${readex.className} min-h-dvh bg-[#FAFAFE] text-slate-800`}>
      <DemoBanner name="أكاديمية مَدار" />
      <MadarAcademy />
      <DemoCTA name="أكاديمية مَدار" />
    </div>
  );
}

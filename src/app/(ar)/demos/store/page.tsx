import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { DemoBanner, DemoCTA } from "@/components/demos/DemoChrome";
import { RakdStore } from "@/components/demos/store/RakdStore";

/* موقع نموذجي: متجر «رَكض RAKD» للملابس الرياضية (نشاط وهمي) — أوف وايت + أسود + برتقالي */
const plex = IBM_Plex_Sans_Arabic({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  alternates: { canonical: "/demos/store" },
  title: "نموذج: متجر رَكض للملابس الرياضية",
  description: "متجر إلكتروني نموذجي للملابس الرياضية: كتالوج بفلترة، اختيار اللون والمقاس، سلة وشحن مجاني وإتمام طلب. من تصميم حلولك تيك.",
};

export default function StoreDemo() {
  return (
    <div className={`${plex.className} min-h-dvh bg-[#F4F3EF] text-[#111]`}>
      <DemoBanner name="متجر رَكض" />
      <RakdStore />
      <DemoCTA name="متجر رَكض" />
    </div>
  );
}

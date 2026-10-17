import type { Metadata } from "next";

/**
 * المواقع النموذجية (/demos/...) — أنشطة وهمية لعرض أسلوب الشغل.
 * مقفولة عن فهرسة جوجل عشان متتعرضش كأنها أنشطة حقيقية.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="main" className="[color-scheme:light] [--heading-color:currentColor]">
      {/* ?shot=1 → إخفاء شريط «موقع نموذجي» (لالتقاط صور المعاينة فقط) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `if(/[?&]shot=1/.test(location.search)){var s=document.createElement("style");s.textContent="[data-demo-chrome]{display:none!important}";document.head.appendChild(s)}`,
        }}
      />
      {children}
    </div>
  );
}

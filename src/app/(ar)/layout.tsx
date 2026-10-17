import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { siteConfig, siteIndexable } from "@/config/site";
import { Analytics } from "@/components/seo/Analytics";
import "../globals.css";

export { viewport } from "@/lib/root-meta";

/** خط Cairo — بيتحمّل ويتخزن محلياً تلقائياً (بدون طلبات لجوجل وقت التصفح) */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-base",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.nameEn} — تطوير المواقع والأنظمة الرقمية`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["تصميم مواقع", "تطوير مواقع", "برمجة مواقع مصر", "متجر إلكتروني", "نظام حجز", "لوحات تحكم", "تطوير أنظمة ويب", "Holoolk Tech", "حلولك تيك"],
  authors: [{ name: siteConfig.nameEn }],
  robots: { index: siteIndexable, follow: siteIndexable },
};

/** الجذر العربي (RTL) — كل الصفحات بدون بادئة + المواقع النموذجية */
export default function ArabicRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      {/* suppressHydrationWarning: إضافات المتصفح بتضيف خصائص على body قبل React */}
      <body className="min-h-dvh font-sans" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:font-bold focus:text-white"
        >
          الانتقال إلى المحتوى
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

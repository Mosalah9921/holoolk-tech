import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { brandKeywords, siteKeywords } from "@/content/seo";
import { siteConfig, siteIndexable } from "@/config/site";
import { Analytics } from "@/components/seo/Analytics";
import { preloadFont } from "@/lib/font-preload";
import "../globals.css";

export { viewport } from "@/lib/root-meta";

/** خط Inter للنسخة الإنجليزية — مصمم للشاشات وواضح في كل الأحجام */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-base",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.nameEn} | Web Design & Development in Egypt`,
    template: `%s | ${siteConfig.nameEn}`,
  },
  description: siteConfig.descriptionEn,
  keywords: [...siteKeywords.en, ...brandKeywords.en],
  authors: [{ name: siteConfig.nameEn, url: siteConfig.url }],
  creator: siteConfig.nameEn,
  publisher: siteConfig.nameEn,
  applicationName: siteConfig.nameEn,
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: siteIndexable, follow: siteIndexable },
};

/** الجذر الإنجليزي (LTR) — كل الصفحات تحت /en */
export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  preloadFont("Inter");
  return (
    <html lang="en" dir="ltr" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-dvh font-sans" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

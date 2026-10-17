import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig, siteIndexable } from "@/config/site";
import { Analytics } from "@/components/seo/Analytics";
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
    default: `${siteConfig.nameEn} — Web Development Studio`,
    template: `%s | ${siteConfig.nameEn}`,
  },
  description: siteConfig.descriptionEn,
  keywords: ["web development Egypt", "website design", "web design Cairo", "online store development", "booking system", "custom web applications", "Next.js agency", "Arabic website design", "Holoolk Tech"],
  authors: [{ name: siteConfig.nameEn }],
  robots: { index: siteIndexable, follow: siteIndexable },
};

/** الجذر الإنجليزي (LTR) — كل الصفحات تحت /en */
export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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

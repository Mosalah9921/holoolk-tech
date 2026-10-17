import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import NotFoundView from "@/views/not-found";
import { siteConfig } from "@/config/site";
import "./globals.css";

/** 404 احتياطية لأي مسار خارج المجموعتين (مطلوبة مع وجود أكثر من root layout) */
const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "700", "900"], variable: "--font-base", display: "swap" });

export const metadata: Metadata = { metadataBase: new URL(siteConfig.url), title: "الصفحة غير موجودة | حلولك تيك", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="min-h-dvh font-sans">
        <NotFoundView locale="ar" />
      </body>
    </html>
  );
}

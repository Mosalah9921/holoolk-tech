import type { NextConfig } from "next";

/**
 * عنوان الموقع:
 * 1) NEXT_PUBLIC_SITE_URL لو اتحطت يدوياً في إعدادات Vercel
 * 2) وإلا الدومين الأساسي للمشروع على Vercel (بيتغير لوحده للدومين الحقيقي أول ما تربطه)
 * 3) وإلا holoolk.com (التشغيل المحلي)
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://holoolk.com");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_SITE_URL: siteUrl.replace(/\/$/, "") },
  poweredByHeader: false,
  /** إخفاء أيقونة Next.js في وضع التطوير (كانت فوق زر الواتساب) */
  devIndicators: false,
  /** 404 موحّدة لأي مسار خارج المجموعتين (العربي والإنجليزي لكل منهما root layout مستقل) */
  experimental: {
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /** رؤوس أمان أساسية لكل الصفحات */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;

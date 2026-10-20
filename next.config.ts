import type { NextConfig } from "next";

/**
 * عنوان الموقع الرسمي: https://www.holoolktech.com
 * (NEXT_PUBLIC_SITE_URL في Vercel بيغيّره لو اتحط بدومين تاني — لكن أي رابط vercel.app بيتجاهل،
 *  عشان جوجل والمشاركة يشوفوا الدومين الرسمي بس)
 */
const OFFICIAL_URL = "https://www.holoolktech.com";
const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl = envUrl && !/\.vercel\.app/i.test(envUrl) ? envUrl : OFFICIAL_URL;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_SITE_URL: siteUrl.replace(/\/$/, "") },
  poweredByHeader: false,
  /** إخفاء أيقونة Next.js في وضع التطوير (كانت فوق زر الواتساب) */
  devIndicators: false,
  /** 404 موحّدة لأي مسار خارج المجموعتين (العربي والإنجليزي لكل منهما root layout مستقل) */
  experimental: {
    globalNotFound: true,
    /** الـ CSS بيتحط جوه الصفحة نفسها بدل ملف منفصل — أول رسم أسرع على الموبايل */
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /** تحويلات دائمة: (1) أي زيارة على holoolk-tech.vercel.app → نفس الصفحة على الدومين الرسمي  (2) مجالات اتشالت → /solutions */
  async redirects() {
    const removed = ["travel", "beauty", "logistics", "events"];
    return [
      { source: "/:path*", has: [{ type: "host", value: "holoolk-tech.vercel.app" }], destination: `${OFFICIAL_URL}/:path*`, permanent: true },
      ...removed.flatMap((id) => [
        { source: `/solutions/${id}`, destination: "/solutions", permanent: true },
        { source: `/en/solutions/${id}`, destination: "/en/solutions", permanent: true },
      ]),
    ];
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

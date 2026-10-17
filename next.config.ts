import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
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

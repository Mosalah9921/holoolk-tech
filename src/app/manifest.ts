import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** /manifest.webmanifest — يخلي الموقع يتضاف للشاشة الرئيسية في الموبايل بشكل مظبوط */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} | ${siteConfig.nameEn}`,
    short_name: siteConfig.nameEn,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    dir: "rtl",
    lang: "ar",
    background_color: "#F8FAFC",
    theme_color: "#1E3A63",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

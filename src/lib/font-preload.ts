import fs from "node:fs";
import path from "node:path";
import { preload } from "react-dom";

/**
 * تحميل مسبق لملفات الخط الأساسي.
 * مع inlineCss، Next.js مابيضيفش <link rel="preload"> للخطوط، فالمتصفح مابيطلبهاش إلا بعد ما يحسب التنسيق
 * (متأخر ~100ms+)، والعنوان الرئيسي (أكبر عنصر في الشاشة) بيستنى الخط.
 * هنا بنقرا أسماء الملفات من CSS المبني وقت البناء (الصفحات static) ونطلب تحميلها بدري.
 * لو الملفات مش موجودة (وضع التطوير مثلاً) مابيحصلش حاجة.
 */
const cache = new Map<string, string[]>();

function findFontUrls(family: string): string[] {
  const hit = cache.get(family);
  if (hit) return hit;
  const urls = new Set<string>();
  try {
    const dir = path.join(process.cwd(), ".next", "static", "css");
    const walk = (d: string) => {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name);
        if (e.isDirectory()) walk(p);
        else if (e.name.endsWith(".css")) {
          const css = fs.readFileSync(p, "utf8");
          for (const m of css.matchAll(/@font-face\{[^}]*\}/g)) {
            if (!m[0].includes(`font-family:${family};`) && !m[0].includes(`font-family:"${family}";`) && !m[0].includes(`font-family:'${family}';`)) continue;
            for (const u of m[0].matchAll(/url\(["']?([^"')]+\.p\.woff2)["']?\)/g)) urls.add(u[1]);
          }
        }
      }
    };
    walk(dir);
  } catch {
    /* مفيش CSS مبني — نكمل من غير preload */
  }
  const list = [...urls].slice(0, 3);
  cache.set(family, list);
  return list;
}

/** يتنادى جوه الـ root layout (Server Component) */
export function preloadFont(family: string) {
  for (const href of findFontUrls(family)) preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
}

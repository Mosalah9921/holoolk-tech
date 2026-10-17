import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * صورة المعاينة اللي بتظهر لما حد يشارك لينك الموقع (فيسبوك، واتساب، لينكدإن).
 * بتستخدم ملفات الشعار من public/brand. النص بالإنجليزي لأن مولّد الصور مش بيدعم تشكيل الحروف العربية.
 */
export const alt = "Holoolk Tech — IT Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function asset(name: string) {
  const buf = await readFile(join(process.cwd(), "public", "brand", name));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

export default async function OpengraphImage() {
  const [markEn, wordEn] = await Promise.all([asset("mark-en-light.png"), asset("wordmark-en-light.png")]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#10274A",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(85,131,186,0.45), transparent 50%), radial-gradient(circle at 0% 100%, rgba(163,173,187,0.18), transparent 45%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markEn} width={104} height={102} alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={wordEn} width={361} height={80} alt="" />
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 820 }}>Digital solutions that drive your business forward.</div>
            <div style={{ fontSize: 28, color: "#C5CCD6" }}>Websites · E-commerce · Web apps · Cloud systems</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

import { notFound } from "next/navigation";

/** أي رابط غير معروف → صفحة 404 بلغة القسم (داخل الـ layout الصحيح) */
export default function CatchAll() {
  notFound();
}

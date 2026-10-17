import type { Metadata } from "next";
import NotFoundView from "@/views/not-found";

export const metadata: Metadata = { title: "الصفحة غير موجودة", robots: { index: false } };

/** 404 داخل الموقع (بالقائمة والفوتر) */
export default function NotFound() {
  return <NotFoundView locale="ar" inSite />;
}

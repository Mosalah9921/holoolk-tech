import type { Metadata } from "next";
import NotFoundView from "@/views/not-found";

export const metadata: Metadata = { title: "الصفحة غير موجودة", robots: { index: false } };

export default function NotFound() {
  return <NotFoundView locale="ar" />;
}

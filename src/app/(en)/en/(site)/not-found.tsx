import type { Metadata } from "next";
import NotFoundView from "@/views/not-found";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

/** 404 داخل الموقع (بالقائمة والفوتر) */
export default function NotFound() {
  return <NotFoundView locale="en" inSite />;
}

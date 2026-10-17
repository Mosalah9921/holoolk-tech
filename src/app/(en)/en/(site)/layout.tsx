import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { CommandPalette } from "@/components/layout/CommandPalette";

/** غلاف صفحات الموقع الإنجليزي (ما عدا المواقع النموذجية): القائمة + الفوتر + البحث + واتساب */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar locale="en" />
      <main id="main">{children}</main>
      <Footer locale="en" />
      <FloatingWhatsApp locale="en" />
      <CommandPalette locale="en" />
    </>
  );
}

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { LanguageSuggest } from "@/components/layout/LanguageSuggest";

/** غلاف صفحات الموقع العربي (ما عدا المواقع النموذجية): القائمة + الفوتر + البحث + واتساب */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar locale="ar" />
      <main id="main">{children}</main>
      <Footer locale="ar" />
      <FloatingWhatsApp locale="ar" />
      <CommandPalette locale="ar" />
      <LanguageSuggest locale="ar" />
    </>
  );
}

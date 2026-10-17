"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Dish = { name: string; description: string; price: number; tag?: string };

const menu: Record<string, Dish[]> = {
  مشويات: [
    { name: "مشكل مشويات سُفرة", description: "كفتة وشيش طاووق وريش ضاني، مع أرز بالشعرية وسلطات", price: 420, tag: "الأكثر طلباً" },
    { name: "كفتة على الفحم", description: "نصف كيلو كفتة بلدي بتتبيلتنا الخاصة", price: 260 },
    { name: "ريش ضاني", description: "ريش متبّلة لمدة 12 ساعة، مشوية على الفحم", price: 380 },
    { name: "فراخ مشوية", description: "نصف دجاجة بتتبيلة الليمون والثوم", price: 190 },
  ],
  طواجن: [
    { name: "طاجن بامية باللحمة", description: "بامية صغيرة ولحم بتلو في الفخار", price: 230, tag: "طبق اليوم" },
    { name: "طاجن ورق عنب بالكوارع", description: "وصفة الجمعة الأصلية", price: 260 },
    { name: "طاجن أرز معمّر", description: "أرز بالقشطة واللبن في الفرن", price: 150 },
    { name: "طاجن فتة باللحمة", description: "خبز محمّص وأرز وصلصة الخل والثوم", price: 240 },
  ],
  مقبلات: [
    { name: "بابا غنوج", description: "باذنجان مشوي بالطحينة والرمان", price: 65 },
    { name: "حمّص بالزيت الحار", description: "حمّص ناعم وزيت زيتون وشطة", price: 60 },
    { name: "محشي مشكّل", description: "كوسة وباذنجان وفلفل وورق عنب", price: 120, tag: "نباتي" },
    { name: "سلطة سُفرة", description: "خضراوات طازجة ورمان ودبس الرمان", price: 55 },
  ],
  حلويات: [
    { name: "أم علي", description: "بالقشطة والمكسرات، طازجة من الفرن", price: 85, tag: "الأكثر طلباً" },
    { name: "كنافة بالقشطة", description: "كنافة يدوية بشراب خفيف", price: 90 },
    { name: "رز بلبن بالمستكة", description: "يُقدّم بارداً أو ساخناً حسب اختيارك", price: 50 },
    { name: "بسبوسة بالقشطة", description: "بسبوسة بالسمن البلدي", price: 60 },
  ],
};

const categories = Object.keys(menu);

export function RestaurantMenu() {
  const [active, setActive] = useState(categories[0]);

  return (
    <div>
      <div role="tablist" aria-label="أقسام القائمة" className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            type="button"
            aria-selected={active === c}
            aria-controls="menu-panel"
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-5 py-2 text-base font-bold transition-colors",
              active === c
                ? "border-[#B9461F] bg-[#B9461F] text-[#FBF6EE]"
                : "border-[#2B1D14]/15 text-[#2B1D14]/70 hover:border-[#B9461F]/50 hover:text-[#B9461F]",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div id="menu-panel" role="tabpanel">
      <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
        {menu[active].map((dish) => (
          <li key={dish.name} className="animate-fade-up">
            <div className="flex items-baseline gap-3">
              <h3 className="text-xl font-bold text-[#2B1D14]">{dish.name}</h3>
              <span aria-hidden className="mb-1.5 flex-1 border-b-2 border-dotted border-[#2B1D14]/20" />
              <span className="text-xl font-bold text-[#B9461F]">
                {dish.price} <span className="text-sm font-normal">ج.م</span>
              </span>
            </div>
            <p className="mt-1.5 flex items-center gap-2 text-[#2B1D14]/65">
              {dish.description}
              {dish.tag && (
                <span className="rounded-full bg-[#5B6B3A]/15 px-2 py-0.5 text-xs font-bold whitespace-nowrap text-[#5B6B3A]">
                  {dish.tag}
                </span>
              )}
            </p>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

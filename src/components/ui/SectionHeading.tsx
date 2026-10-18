import { cn } from "@/lib/utils";

/** عنوان سكشن: عنوان واضح + سطر شرح — من غير زخرفة */
export function SectionHeading({
  id,
  title,
  description,
  align = "start",
  className,
  children,
}: {
  id?: string;
  title: string;
  description?: string;
  align?: "center" | "start";
  className?: string;
  /** زرار أو لينك جنب العنوان (اختياري) */
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:mb-10 md:gap-6",
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        <h2 id={id} className="text-3xl leading-[1.25] font-black tracking-tight sm:text-4xl lg:text-[2.6rem]">
          {title}
        </h2>
        {description && <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{description}</p>}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
}

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  /** الزرار الأساسي: Indigo بنص أبيض */
  primary: "bg-brand-600 text-white shadow-md shadow-brand-600/20 hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/25",
  /** زرار ثانوي: أبيض بإطار */
  secondary: "border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  /** للاستخدام فوق خلفية ملونة */
  inverse: "bg-white text-brand-700 shadow-md hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-bold whitespace-nowrap transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
};

/** زر على شكل رابط (للتنقل بين السكاشن أو الروابط الخارجية) */
export function ButtonLink({ variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <a className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </a>
  );
}

import { cn } from "@/lib/utils";
import { Container } from "./Container";

/** غلاف موحّد لكل سكشن. id بيستخدم للتنقل من الناف بار (#services ...) */
export function Section({
  id,
  className,
  containerClassName,
  children,
  "aria-labelledby": labelledBy,
}: {
  id: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  "aria-labelledby"?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative scroll-mt-24 py-14 sm:py-[4.5rem] lg:py-[5.5rem]", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

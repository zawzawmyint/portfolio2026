import { cn } from "@/lib/utils";

export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid auto-rows-auto grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-7", className)}>
      {children}
    </div>
  );
}

export function BentoGridItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "skeuo-panel group relative overflow-hidden rounded-2xl p-6 transition duration-500 hover:-translate-y-1 hover:border-brand/40 sm:p-8",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgb(var(--brand-primary)/0.09),transparent_44%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

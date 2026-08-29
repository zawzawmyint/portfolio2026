import { cn } from "@/lib/utils";

export function MovingBorder({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl p-px",
        containerClassName
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -inset-[150%] motion-safe:animate-aceternity-spin"
        style={{
          backgroundImage:
            "conic-gradient(from 90deg at 50% 50%, transparent 0deg, transparent 250deg, rgb(var(--brand-primary) / 0.72) 290deg, rgb(var(--brand-secondary) / 0.62) 325deg, transparent 360deg)",
        }}
      />
      <div
        className={cn(
          "skeuo-control relative rounded-[calc(1rem-1px)] border border-white/10 bg-background/90 backdrop-blur-xl",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

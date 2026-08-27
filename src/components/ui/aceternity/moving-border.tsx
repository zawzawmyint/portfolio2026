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
        className="absolute -inset-[150%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0deg,transparent_250deg,rgba(99,102,241,0.72)_290deg,rgba(34,211,238,0.62)_325deg,transparent_360deg)] motion-safe:animate-aceternity-spin"
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

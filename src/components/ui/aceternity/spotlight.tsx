import { cn } from "@/lib/utils";

export function Spotlight({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgb(var(--brand-primary) / 0.24) 0%, rgb(var(--brand-secondary) / 0.08) 35%, transparent 70%)",
      }}
      className={cn(
        "pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[58rem] -translate-x-1/2 rounded-full blur-2xl motion-safe:animate-aceternity-pulse",
        className
      )}
    />
  );
}

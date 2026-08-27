import { cn } from "@/lib/utils";

export function Spotlight({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[58rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.24)_0%,rgba(59,130,246,0.08)_35%,transparent_70%)] blur-2xl motion-safe:animate-aceternity-pulse",
        className
      )}
    />
  );
}

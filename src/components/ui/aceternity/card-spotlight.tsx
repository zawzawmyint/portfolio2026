"use client";

import { cn } from "@/lib/utils";

export function CardSpotlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
      }}
      className={cn(
        "skeuo-panel group relative overflow-hidden rounded-2xl [--spotlight-x:50%] [--spotlight-y:50%]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spotlight-x) var(--spotlight-y), rgba(99,102,241,0.13), transparent 50%)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

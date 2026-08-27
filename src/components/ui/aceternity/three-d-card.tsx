"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "motion/react";
import { useRef } from "react";

export function ThreeDCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="h-full [perspective:1200px]"
      onMouseMove={(event) => {
        if (reduceMotion || !cardRef.current) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -7;
        const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
        cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      }}
      onMouseLeave={() => {
        if (cardRef.current) cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px)";
      }}
    >
      <div
        ref={cardRef}
        className={cn(
          "h-full transform-gpu transition-transform duration-300 ease-out [transform-style:preserve-3d]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";

export function TextGenerateEffect({
  words,
  className,
}: {
  words: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const hasWordSpaces = /\s/u.test(words.trim());
  const parts = hasWordSpaces
    ? words.trim().split(/\s+/u)
    : Array.from(
        new Intl.Segmenter("en", { granularity: "grapheme" }).segment(words),
        ({ segment }) => segment,
      );

  return (
    <span className={cn("inline", className)} aria-label={words}>
      {parts.map((word, index) => (
        <motion.span
          aria-hidden="true"
          className="inline-block"
          key={`${word}-${index}`}
          initial={reduceMotion ? false : { opacity: 0, filter: "blur(8px)", y: 10 }}
          animate={reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.45,
            delay: Math.min(index * (hasWordSpaces ? 0.055 : 0.035), 0.7),
          }}
        >
          {word}
          {hasWordSpaces && index < parts.length - 1 ? "\u00a0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

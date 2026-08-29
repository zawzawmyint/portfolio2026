"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/lib/dictionaries/types";
import { useState } from "react";
import { EditorialArrow } from "@/components/ui/EditorialArrow";

export function Navs({
  dictionary,
  onNavigate,
  variant = "default",
}: {
  dictionary: Dictionary["common"]["navigation"];
  onNavigate?: () => void;
  variant?: "default" | "drawer";
}) {
  const pathname = usePathname();
  const params = useParams();
  const lang = params.lang as string;
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const components = [
    { title: dictionary.home, href: "/" },
    { title: dictionary.about, href: "/about" },
    { title: dictionary.projects, href: "/projects" },
    { title: dictionary.blogs, href: "/blogs" },
    { title: dictionary.contact, href: "/contact" },
  ];

  return (
    <nav aria-label={dictionary.label}>
      <ul
        className={cn(
          "flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-1",
          variant === "drawer" &&
            "w-full items-stretch gap-0 divide-y divide-border/70 sm:flex-col sm:gap-0",
        )}
        onMouseLeave={() => setHoveredHref(null)}
      >
        {components.map((nav, index) => {
          const href = `/${lang}${nav.href}`;
          const active = pathname === href || (nav.href === "/" && pathname === `/${lang}`);
          const highlighted = hoveredHref ? hoveredHref === href : active;

          return (
            <li key={nav.title} className={cn(variant === "drawer" && "w-full")}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                onBlur={() => setHoveredHref(null)}
                onFocus={() => setHoveredHref(href)}
                onMouseEnter={() => setHoveredHref(href)}
                onClick={onNavigate}
                className={cn(
                  "relative flex min-h-11 items-center justify-center rounded-full px-4 text-3xl font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:min-h-9 sm:px-3 sm:text-[0.82rem]",
                  variant === "drawer" &&
                    "group/link min-h-[4.25rem] w-full justify-start gap-4 rounded-none px-0 text-start text-3xl sm:min-h-[4.25rem] sm:px-0 sm:text-3xl",
                  active
                    ? "font-semibold text-foreground"
                    : highlighted
                      ? "text-foreground"
                      : "text-muted-foreground"
                )}
              >
                {variant === "drawer" && (
                  <span className="font-mono text-[0.62rem] tracking-[0.2em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
                {variant === "default" && highlighted && (
                  <motion.span
                    aria-hidden="true"
                    layoutId="active-navigation-pill"
                    className="skeuo-inset absolute inset-0 overflow-hidden rounded-full"
                    transition={{ type: "spring", bounce: 0.16, duration: 0.46 }}
                  >
                    <span className="absolute inset-0 rounded-full bg-brand/10" />
                  </motion.span>
                )}
                <span className={cn("relative z-10", variant === "drawer" && "flex-1")}>
                  {nav.title}
                </span>
                {variant === "drawer" && (
                  <EditorialArrow className="size-5" />
                )}
                {variant === "default" && active && (
                  <span
                    aria-hidden="true"
                    className="absolute start-1.5 top-1/2 z-20 h-3 w-1 -translate-y-1/2 rounded-full bg-brass shadow-[0_0_10px_rgb(var(--brand-secondary)/0.8)] ring-2 ring-brass/15"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

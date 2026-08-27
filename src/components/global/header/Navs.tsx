"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/lib/dictionaries/types";
import { useState } from "react";

export function Navs({ dictionary }: { dictionary: Dictionary["common"]["navigation"] }) {
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
        className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-1"
        onMouseLeave={() => setHoveredHref(null)}
      >
        {components.map((nav) => {
          const href = `/${lang}${nav.href}`;
          const active = pathname === href || (nav.href === "/" && pathname === `/${lang}`);
          const highlighted = hoveredHref ? hoveredHref === href : active;

          return (
            <li key={nav.title}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                onBlur={() => setHoveredHref(null)}
                onFocus={() => setHoveredHref(href)}
                onMouseEnter={() => setHoveredHref(href)}
                className={cn(
                  "relative flex min-h-11 items-center justify-center rounded-full px-4 text-3xl font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 sm:min-h-9 sm:px-3 sm:text-[0.82rem]",
                  active
                    ? "font-semibold text-foreground"
                    : highlighted
                      ? "text-foreground"
                      : "text-muted-foreground"
                )}
              >
                {highlighted && (
                  <motion.span
                    aria-hidden="true"
                    layoutId="active-navigation-pill"
                    className="skeuo-inset absolute inset-0 overflow-hidden rounded-full"
                    transition={{ type: "spring", bounce: 0.16, duration: 0.46 }}
                  >
                    <span className="absolute inset-0 rounded-full bg-indigo-500/10" />
                  </motion.span>
                )}
                <span className="relative z-10">{nav.title}</span>
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute start-1.5 top-1/2 z-20 h-3 w-1 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.95)] ring-2 ring-cyan-400/15"
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

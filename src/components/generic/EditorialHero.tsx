"use client";

import Image from "next/image";
import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type EditorialHeroVariant = "home" | "about" | "projects" | "blogs" | "contact";

type EditorialHeroProps = {
  variant: EditorialHeroVariant;
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  videoSrc: string;
  poster: string;
  meta?: string[];
  children?: React.ReactNode;
};

const layouts: Record<EditorialHeroVariant, { shell: string; copy: string; media: string }> = {
  home: {
    shell: "lg:grid-cols-[1.2fr_0.8fr] lg:min-h-[39rem]",
    copy: "lg:py-24",
    media: "min-h-[22rem] lg:min-h-[35rem]",
  },
  about: {
    shell: "lg:grid-cols-[0.82fr_1.18fr]",
    copy: "lg:order-2 lg:py-20",
    media: "min-h-[24rem] lg:order-1 lg:min-h-[32rem]",
  },
  projects: {
    shell: "lg:grid-cols-[0.92fr_1.08fr]",
    copy: "lg:py-20",
    media: "min-h-[20rem] lg:min-h-[29rem]",
  },
  blogs: {
    shell: "lg:grid-cols-[1.32fr_0.68fr]",
    copy: "lg:py-20",
    media: "min-h-[26rem] lg:min-h-[34rem]",
  },
  contact: {
    shell: "lg:grid-cols-[1.1fr_0.9fr]",
    copy: "lg:py-24",
    media: "min-h-[22rem] lg:min-h-[31rem]",
  },
};

export default function EditorialHero({
  variant,
  index,
  eyebrow,
  title,
  description,
  videoSrc,
  poster,
  meta = [],
  children,
}: EditorialHeroProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = React.useState(false);
  const [documentVisible, setDocumentVisible] = React.useState(false);
  const layout = layouts[variant];
  const entrance = reduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0 },
      };

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const handleVisibilityChange = () => setDocumentVisible(document.visibilityState === "visible");
    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVisible && documentVisible && !reduceMotion) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [documentVisible, isVisible, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate mx-auto w-full max-w-[90rem] overflow-hidden px-4 pt-4 sm:px-6 sm:pt-6"
    >
      <div
        className={cn(
          "relative grid overflow-hidden rounded-[1.75rem] border border-border/70 bg-background/80 shadow-[0_30px_100px_-55px_rgba(15,23,42,0.7)] lg:items-stretch",
          layout.shell,
        )}
      >
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,hsl(var(--border)/0.32)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.24)_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:linear-gradient(to_right,black,transparent_72%)]" />

        <motion.div
          className={cn("relative z-10 flex flex-col justify-between p-6 sm:p-10 lg:p-14", layout.copy)}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={reduceMotion ? undefined : { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          <div className="flex items-center justify-between gap-6 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
            <motion.span variants={entrance} transition={{ duration: 0.42 }}>{eyebrow}</motion.span>
            <motion.span key={index} variants={entrance} transition={{ duration: 0.42 }} aria-hidden="true" dir="ltr">{index} / 05</motion.span>
          </div>

          <motion.div className="mt-20 max-w-4xl lg:mt-24" variants={entrance} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-brand">
              <span className="size-2 rounded-full bg-brass shadow-[0_0_14px_rgb(var(--brand-secondary)/0.7)]" />
              Portfolio · 2026
            </p>
            <h1 className="text-balance text-[clamp(2.75rem,7vw,6.8rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
              {title}
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              {description}
            </p>
            {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
          </motion.div>

          {meta.length > 0 && (
            <motion.ul variants={entrance} transition={{ duration: 0.45 }} className="mt-14 flex flex-wrap gap-x-7 gap-y-2 border-t border-border/70 pt-5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
              {meta.map((item) => <li key={item}>{item}</li>)}
            </motion.ul>
          )}
        </motion.div>

        <motion.figure
          initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={cn("relative m-3 overflow-hidden rounded-[1.25rem] bg-slate-950", layout.media)}
        >
          {reduceMotion ? (
            <Image src={poster} alt="" fill priority={variant === "home"} sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          ) : (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload={variant === "home" ? "metadata" : "none"}
              poster={poster}
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />
          <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/75">
            <span>{eyebrow}</span>
            <span dir="ltr">{index} / 05</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

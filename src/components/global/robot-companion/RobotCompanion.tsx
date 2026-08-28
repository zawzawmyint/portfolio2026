"use client";

import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import * as React from "react";
import type { Dictionary } from "@/lib/dictionaries/types";
import { useHasFinePointer, useRobotFollowing } from "./robot-preference";

const MODEL_PATH = "/models/cute-flying-robot.glb";
const POSTER_PATH = "/images/3d/cute-flying-robot-poster.jpg";
const ModelViewer = "model-viewer" as React.ElementType;

type CompanionDictionary = Dictionary["common"]["robotCompanion"];
type GuideDictionary = Dictionary["common"]["robotGuide"];
type CompanionPage = keyof CompanionDictionary;
type GuideSection = keyof GuideDictionary;

type SectionGreeting = {
  id: GuideSection;
  message: string;
  pathname: string;
};

const getCompanionPage = (pathname: string): CompanionPage => {
  const page = pathname.split("/").filter(Boolean)[1];
  if (page === "about" || page === "projects" || page === "blogs" || page === "contact") {
    return page;
  }
  return "home";
};

function PageGreeting({
  message,
  direction,
  duration = 4400,
}: {
  message: string;
  direction: "ltr" | "rtl";
  duration?: number;
}) {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), duration);
    return () => window.clearTimeout(timer);
  }, [duration]);

  return (
    <div
      role="status"
      aria-live="polite"
      dir={direction}
      className={`relative w-56 rounded-2xl border border-white/15 bg-slate-950/85 px-4 py-3 text-xs font-medium leading-5 text-slate-100 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl transition-all duration-300 motion-reduce:transition-none ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "-translate-y-1 scale-95 opacity-0"
      }`}
    >
      {message}
    </div>
  );
}

export default function RobotCompanion({
  dictionary,
  sectionDictionary,
  direction,
}: {
  dictionary: CompanionDictionary;
  sectionDictionary: GuideDictionary;
  direction: "ltr" | "rtl";
}) {
  const layerRef = React.useRef<HTMLDivElement>(null);
  const bubblePositionRef = React.useRef<HTMLDivElement>(null);
  const targetRef = React.useRef({ x: 0, y: 0 });
  const positionRef = React.useRef({ x: 0, y: 0 });
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const preferenceAllowsFollowing = useRobotFollowing();
  const shouldFollow = preferenceAllowsFollowing && !reduceMotion;
  const hasFinePointer = useHasFinePointer();
  const [moduleReady, setModuleReady] = React.useState(false);
  const [sectionGreeting, setSectionGreeting] = React.useState<SectionGreeting | null>(null);

  React.useEffect(() => {
    if (!hasFinePointer) return;
    let cancelled = false;
    const load = () => {
      void import("@google/model-viewer").then(() => {
        if (!cancelled) setModuleReady(true);
      });
    };
    const idleCallback = window.setTimeout(load, 900);

    return () => {
      cancelled = true;
      window.clearTimeout(idleCallback);
    };
  }, [hasFinePointer]);

  React.useEffect(() => {
    const layer = layerRef.current;
    if (!layer || !hasFinePointer) return;

    const companionSize = 144;
    const restingPosition = {
      x: Math.max(16, window.innerWidth - companionSize - 28),
      y: Math.max(16, window.innerHeight - companionSize - 28),
    };
    targetRef.current = restingPosition;
    positionRef.current = restingPosition;
    layer.style.opacity = "1";
    if (bubblePositionRef.current) {
      bubblePositionRef.current.style.left = "auto";
      bubblePositionRef.current.style.right = "78%";
    }

    if (reduceMotion) {
      layer.style.transform = `translate3d(${restingPosition.x}px, ${restingPosition.y}px, 0)`;
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bubble = bubblePositionRef.current;
      if (bubble) {
        const placeBubbleOnLeft = event.clientX > window.innerWidth / 2;
        bubble.style.left = placeBubbleOnLeft ? "auto" : "78%";
        bubble.style.right = placeBubbleOnLeft ? "78%" : "auto";
      }
      const overIntroductionRobot = Boolean(
        document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-robot-scene]"),
      );
      layer.style.opacity = overIntroductionRobot ? "0" : "1";
      targetRef.current = {
        x: Math.max(8, Math.min(window.innerWidth - companionSize - 8, event.clientX + 28)),
        y: Math.max(8, Math.min(window.innerHeight - companionSize - 8, event.clientY + 22)),
      };
    };

    const handleResize = () => {
      targetRef.current = {
        x: Math.min(targetRef.current.x, window.innerWidth - companionSize - 8),
        y: Math.min(targetRef.current.y, window.innerHeight - companionSize - 8),
      };
    };

    let animationFrame = 0;
    const animate = (time: number) => {
      const position = positionRef.current;
      const target = targetRef.current;
      position.x += (target.x - position.x) * 0.075;
      position.y += (target.y - position.y) * 0.075;
      const bob = Math.sin(time / 420) * 3;
      const tilt = Math.max(-3, Math.min(3, (target.x - position.x) * 0.035));
      layer.style.transform = `translate3d(${position.x}px, ${position.y + bob}px, 0) rotate(${tilt}deg)`;
      animationFrame = window.requestAnimationFrame(animate);
    };

    if (shouldFollow) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }
    window.addEventListener("resize", handleResize, { passive: true });
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      if (shouldFollow) {
        window.removeEventListener("pointermove", handlePointerMove);
      }
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrame);
      layer.style.opacity = "";
      layer.style.transform = "";
    };
  }, [hasFinePointer, reduceMotion, shouldFollow]);

  React.useEffect(() => {
    if (!hasFinePointer) return;

    const seen = new Set<GuideSection>();
    let cooldownUntil = 0;
    let cooldownTimer = 0;
    let animationFrame = 0;
    let sections: HTMLElement[] = [];

    const isMeaningfullyVisible = (section: HTMLElement) => {
      const bounds = section.getBoundingClientRect();
      const visibleHeight = Math.max(
        0,
        Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0),
      );
      const comparableHeight = Math.min(bounds.height, window.innerHeight);
      return comparableHeight > 0 && visibleHeight / comparableHeight >= 0.4;
    };

    const evaluateSections = () => {
      animationFrame = 0;
      const now = Date.now();

      if (now < cooldownUntil) {
        window.clearTimeout(cooldownTimer);
        cooldownTimer = window.setTimeout(evaluateSections, cooldownUntil - now);
        return;
      }

      const section = sections.find((candidate) => {
        const id = candidate.getAttribute("data-robot-guide") as GuideSection | null;
        return Boolean(id && !seen.has(id) && isMeaningfullyVisible(candidate));
      });
      const id = section?.getAttribute("data-robot-guide") as GuideSection | null;
      if (!id || !(id in sectionDictionary)) return;

      seen.add(id);
      cooldownUntil = now + 4200;
      setSectionGreeting({
        id,
        message: sectionDictionary[id],
        pathname,
      });
      cooldownTimer = window.setTimeout(evaluateSections, 4200);
    };

    const requestEvaluation = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(evaluateSections);
      }
    };

    const startTimer = window.setTimeout(() => {
      sections = Array.from(document.querySelectorAll<HTMLElement>("[data-robot-guide]"));
      window.addEventListener("scroll", requestEvaluation, { passive: true });
      window.addEventListener("resize", requestEvaluation, { passive: true });
      requestEvaluation();
    }, 4800);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(cooldownTimer);
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestEvaluation);
      window.removeEventListener("resize", requestEvaluation);
    };
  }, [hasFinePointer, pathname, sectionDictionary]);

  if (!hasFinePointer) return null;

  const modelSource =
    typeof window === "undefined"
      ? MODEL_PATH
      : new URL(MODEL_PATH, window.location.origin).href;
  const page = getCompanionPage(pathname);
  const activeSectionGreeting =
    sectionGreeting?.pathname === pathname ? sectionGreeting : null;
  const greetingMessage = activeSectionGreeting?.message ?? dictionary[page];
  const greetingKey = activeSectionGreeting
    ? `${pathname}:${activeSectionGreeting.id}`
    : pathname;

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed left-0 top-0 z-40 size-36 opacity-0 transition-opacity duration-300 motion-reduce:transition-none"
    >
      <div
        ref={bubblePositionRef}
        className="absolute top-1 z-20"
        style={{ right: "78%" }}
      >
        <PageGreeting
          key={greetingKey}
          message={greetingMessage}
          direction={direction}
          duration={activeSectionGreeting ? 3600 : 4400}
        />
      </div>
      {moduleReady && (
        <ModelViewer
          aria-hidden="true"
          src={modelSource}
          poster={POSTER_PATH}
          alt=""
          auto-rotate={!reduceMotion}
          auto-rotate-delay="0"
          rotation-per-second="10deg"
          interaction-prompt="none"
          shadow-intensity="0.8"
          shadow-softness="0.9"
          environment-image="neutral"
          camera-orbit="0deg 75deg auto"
          field-of-view="26deg"
          loading="eager"
          reveal="auto"
          className="h-full w-full bg-transparent drop-shadow-[0_12px_20px_rgba(34,211,238,0.2)]"
          tabIndex={-1}
        />
      )}
    </div>
  );
}

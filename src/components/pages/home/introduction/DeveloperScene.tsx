"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Rotate3D } from "lucide-react";
import { useReducedMotion } from "motion/react";
import * as React from "react";
import { useHasFinePointer } from "@/components/global/robot-companion/robot-preference";
import type { Dictionary } from "@/lib/dictionaries/types";

const MODEL_PATH = "/models/cute-flying-robot.glb";
const POSTER_PATH = "/images/3d/cute-flying-robot-poster.jpg";
const MODEL_URL =
  "https://sketchfab.com/3d-models/kawaii-cute-flying-robot-e8e85bce90644fa486ac21e033c71d92";
const LICENSE_URL = "https://creativecommons.org/licenses/by/4.0/";

type SceneDictionary = Dictionary["home"]["introduction"]["scene"];
type ModelViewerElement = HTMLElement & {
  play?: () => void;
  pause?: () => void;
};

const ModelViewer = "model-viewer" as React.ElementType;
const subscribeToClientReady = () => () => undefined;
const getClientReadySnapshot = () => true;
const getServerReadySnapshot = () => false;

const supportsWebGl = () => {
  const canvas = document.createElement("canvas");
  return Boolean(
    window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl")),
  );
};

export function DeveloperScene({ dictionary }: { dictionary: SceneDictionary }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const motionLayerRef = React.useRef<HTMLDivElement>(null);
  const viewerRef = React.useRef<ModelViewerElement | null>(null);
  const pointerTargetRef = React.useRef({ x: 0, y: 0 });
  const pointerPositionRef = React.useRef({ x: 0, y: 0 });
  const isDraggingRef = React.useRef(false);
  const reduceMotion = useReducedMotion();
  const hasFinePointer = useHasFinePointer();
  const pointerCapabilityReady = React.useSyncExternalStore(
    subscribeToClientReady,
    getClientReadySnapshot,
    getServerReadySnapshot,
  );
  const [mobileActivated, setMobileActivated] = React.useState(false);
  const [documentVisible, setDocumentVisible] = React.useState(true);
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [moduleReady, setModuleReady] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      setDocumentVisible(document.visibilityState === "visible");
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (hasFinePointer && entry.isIntersecting) {
          setShouldLoad(true);
          preloadObserver.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );

    preloadObserver.observe(container);
    visibilityObserver.observe(container);

    return () => {
      preloadObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [hasFinePointer]);

  React.useEffect(() => {
    if (!shouldLoad) return;
    let cancelled = false;
    const loadViewer = async () => {
      if (!supportsWebGl()) throw new Error("WebGL is unavailable");
      await import("@google/model-viewer");
    };

    void loadViewer()
      .then(() => {
        if (!cancelled) setModuleReady(true);
      })
      .catch(() => {
        if (!cancelled) setHasError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [shouldLoad]);

  React.useEffect(() => {
    if (!moduleReady) return;
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleLoad = () => {
      setProgress(1);
      setIsLoaded(true);
    };
    const handleError = () => setHasError(true);
    const handleProgress = (event: Event) => {
      const detail = (event as CustomEvent<{ totalProgress?: number }>).detail;
      setProgress(detail?.totalProgress ?? 0);
    };

    viewer.addEventListener("load", handleLoad);
    viewer.addEventListener("error", handleError);
    viewer.addEventListener("progress", handleProgress);

    return () => {
      viewer.removeEventListener("load", handleLoad);
      viewer.removeEventListener("error", handleError);
      viewer.removeEventListener("progress", handleProgress);
    };
  }, [moduleReady]);

  React.useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !isLoaded) return;

    if (isVisible && documentVisible && hasFinePointer && !reduceMotion) {
      viewer.play?.();
    } else {
      viewer.pause?.();
    }
  }, [documentVisible, hasFinePointer, isLoaded, isVisible, reduceMotion]);

  React.useEffect(() => {
    const layer = motionLayerRef.current;
    const supportsPointerFollow = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (
      !layer ||
      !isLoaded ||
      !isVisible ||
      !documentVisible ||
      reduceMotion ||
      !supportsPointerFollow
    ) {
      pointerTargetRef.current = { x: 0, y: 0 };
      pointerPositionRef.current = { x: 0, y: 0 };
      if (layer) layer.style.transform = "";
      return;
    }

    let animationFrame = 0;
    const animate = () => {
      const current = pointerPositionRef.current;
      const target = pointerTargetRef.current;
      current.x += (target.x - current.x) * 0.09;
      current.y += (target.y - current.y) * 0.09;
      layer.style.transform = `translate3d(${current.x * 18}px, ${current.y * 14}px, 0) rotateX(${current.y * -1.25}deg) rotateY(${current.x * 1.5}deg) scale(1.035)`;
      animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      layer.style.transform = "";
    };
  }, [documentVisible, isLoaded, isVisible, reduceMotion]);

  const resetPointerTarget = () => {
    pointerTargetRef.current = { x: 0, y: 0 };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      isDraggingRef.current ||
      reduceMotion ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerTargetRef.current = {
      x: Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1)),
      y: Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1)),
    };
  };

  const loadingPercent = Math.round(progress * 100);
  const shouldAnimate =
    hasFinePointer && isVisible && documentVisible && !reduceMotion;
  const showMobileActivation =
    pointerCapabilityReady && !hasFinePointer && !mobileActivated;
  const modelSource =
    typeof window === "undefined"
      ? MODEL_PATH
      : new URL(MODEL_PATH, window.location.origin).href;

  return (
    <div
      ref={containerRef}
      data-robot-scene
      className="skeuo-screen skeuo-screws relative h-full min-h-[23rem] overflow-hidden rounded-[0.875rem] bg-slate-950"
      aria-label={dictionary.label}
      onPointerMove={handlePointerMove}
      onPointerDown={() => {
        isDraggingRef.current = true;
        resetPointerTarget();
      }}
      onPointerUp={() => {
        isDraggingRef.current = false;
        resetPointerTarget();
      }}
      onPointerCancel={() => {
        isDraggingRef.current = false;
        resetPointerTarget();
      }}
      onPointerLeave={() => {
        isDraggingRef.current = false;
        resetPointerTarget();
      }}
    >
      <Image
        src={POSTER_PATH}
        alt=""
        fill
        priority={false}
        sizes="(max-width: 1024px) 100vw, 34vw"
        className={`object-cover transition-opacity duration-500 ${isLoaded ? "opacity-0" : "opacity-100"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-slate-950/20" />
      <div className="aceternity-grid absolute inset-0 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      {moduleReady && !hasError && (
        <div
          ref={motionLayerRef}
          className="absolute inset-0 z-10 origin-center will-change-transform"
        >
          <ModelViewer
            ref={viewerRef}
            src={modelSource}
            poster={POSTER_PATH}
            alt={dictionary.label}
            camera-controls
            disable-zoom
            autoplay={shouldAnimate}
            auto-rotate={shouldAnimate}
            auto-rotate-delay="900"
            rotation-per-second="7deg"
            interaction-prompt="auto"
            shadow-intensity="1"
            shadow-softness="0.8"
            environment-image="neutral"
            camera-orbit="0deg 75deg auto"
            min-camera-orbit="auto 55deg auto"
            max-camera-orbit="auto 95deg auto"
            field-of-view="30deg"
            loading="eager"
            reveal="auto"
            className="h-full w-full bg-transparent"
            tabIndex={0}
          />
        </div>
      )}

      {showMobileActivation && (
        <button
          type="button"
          onClick={() => {
            setMobileActivated(true);
            setShouldLoad(true);
          }}
          className="absolute left-1/2 top-1/2 z-20 inline-flex min-h-11 -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/20 bg-slate-950/80 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-cyan-950/30 backdrop-blur-md transition-colors hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          aria-label={dictionary.view3d}
        >
          <Box className="size-4 text-cyan-300" aria-hidden="true" />
          {dictionary.view3d}
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-4 top-4 z-20 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/55 px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-100 backdrop-blur-md">
          <Box className="size-3.5 text-cyan-300" aria-hidden="true" />
          {dictionary.badge}
        </span>
        {isLoaded && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/55 px-3 py-1.5 text-xs text-slate-200 backdrop-blur-md">
            <Rotate3D className="size-3.5 text-indigo-300" aria-hidden="true" />
            {dictionary.hint}
          </span>
        )}
      </div>

      {!hasError && shouldLoad && !isLoaded && (
        <div className="absolute inset-x-5 bottom-16 z-20" role="status" aria-live="polite">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-200">
            <span>{dictionary.loading}</span>
            <span aria-hidden="true">{loadingPercent}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300 transition-[width] duration-300"
              style={{ width: `${Math.max(6, loadingPercent)}%` }}
            />
          </div>
        </div>
      )}

      {hasError && (
        <p className="absolute inset-x-5 bottom-16 z-20 rounded-xl border border-white/10 bg-slate-950/65 px-4 py-3 text-sm leading-6 text-slate-200 backdrop-blur-md" role="status">
          {dictionary.fallback}
        </p>
      )}

      <div className="absolute inset-x-4 bottom-4 z-20 flex flex-wrap items-center justify-between gap-2 text-[0.68rem] text-slate-300">
        <Link
          href={MODEL_URL}
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto underline decoration-white/30 underline-offset-4 hover:text-white"
        >
          {dictionary.attribution}
        </Link>
        <Link
          href={LICENSE_URL}
          target="_blank"
          rel="noreferrer license"
          className="pointer-events-auto underline decoration-white/30 underline-offset-4 hover:text-white"
        >
          {dictionary.license}
        </Link>
      </div>
    </div>
  );
}

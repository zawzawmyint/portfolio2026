"use client";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import * as React from "react";
import { useReducedMotion } from "motion/react";

const imagePaths = [
  "/images/intro/moulake.jpg",
  "/images/intro/cbjm.jpg",
  "/images/intro/unl.jpg",
  "/images/intro/inlake.jpg",
  "/images/intro/dt.jpg",
  "/images/intro/myktlake.jpg",
];

export function IntroCarousel({ label, imageAlts }: { label: string; imageAlts: string[] }) {
  const reduceMotion = useReducedMotion();
  const plugins = React.useMemo(
    () => (reduceMotion ? [] : [Autoplay({ delay: 7000, stopOnInteraction: false })]),
    [reduceMotion]
  );

  return (
    <Carousel
      plugins={plugins}
      opts={{
        align: "start",
        loop: true,
      }}
      className="h-full w-full rounded-[0.875rem] [&>div]:h-full"
    >
      <CarouselContent className="h-full rounded-[0.875rem]">
        {imagePaths.map((path, index) => (
          <CarouselItem key={path} className="h-full">
            <div className="skeuo-screen relative h-full min-h-[23rem] overflow-hidden rounded-[0.875rem]">
              <Image
                src={path}
                alt={imageAlts[index] ?? label}
                fill
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-slate-950/35 px-3 py-1 text-xs text-white backdrop-blur-md">
                {label} · {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

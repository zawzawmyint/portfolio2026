import React from "react";
import { Reveal } from "../ui/aceternity/reveal";
import { Spotlight } from "../ui/aceternity/spotlight";
import { TextGenerateEffect } from "../ui/aceternity/text-generate-effect";

interface MainTitleDescProps {
  title: string;
  desc: string;
  high?: string;
  url?: string;
  children?: React.ReactNode;
}

const MainTitleDesc = ({
  title,
  desc,
  high = "min-h-[400px]",
  url = "https://www.pexels.com/download/video/6864603/",
  children,
}: MainTitleDescProps) => {
  return (
    <section
      className={`skeuo-screen skeuo-screws relative isolate mx-auto w-[calc(100%-1.5rem)] overflow-hidden rounded-2xl sm:w-[calc(100%-2.5rem)] ${high}`}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
      >
        <source src={url} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-slate-950/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-slate-950/35 to-background" />
      <div className="aceternity-grid absolute inset-0 opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_90%)] motion-safe:animate-grid-drift" />
      <Spotlight />

      <div className="relative z-20 mx-auto flex min-h-[inherit] max-w-5xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8 sm:py-28">
        <span className="skeuo-inset mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.26em] text-cyan-50 backdrop-blur-md sm:mb-5">
          <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
          Portfolio · 2026
        </span>
        <h1 className="max-w-4xl break-words text-balance font-mono text-[2.125rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white drop-shadow-2xl sm:text-[clamp(3rem,6vw,4.5rem)]">
          <TextGenerateEffect words={title} />
        </h1>
        <Reveal delay={0.18}>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-[0.95rem] leading-7 text-slate-200 drop-shadow-md sm:mt-5 sm:text-lg sm:leading-8">
            {desc}
          </p>
        </Reveal>

        {children && (
          <Reveal className="mt-6 space-y-4 sm:mt-7" delay={0.3}>
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default MainTitleDesc;

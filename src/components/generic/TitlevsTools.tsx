import ToolCard from "@/components/card/ToolCard";
import { Reveal } from "@/components/ui/aceternity/reveal";
import { type Tool } from "@/lib/types/definitions";
import React from "react";

const TitlevsTools = ({
  title = "title",
  tools,
  robotGuide,
}: {
  title: string;
  tools: Tool[];
  robotGuide?: string;
}) => {
  return (
    <section className="grid gap-8 border-t border-border/70 pt-8 lg:grid-cols-[0.42fr_1.58fr] lg:gap-14" data-robot-guide={robotGuide}>
      <Reveal>
        <div className="lg:sticky lg:top-28"><span className="block h-px w-10 bg-brand" /><h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2></div>
      </Reveal>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
        {tools.map((tool, i) => (
          <ToolCard key={`${tool.text}-${i}`} tool={tool} />
        ))}
      </div>
    </section>
  );
};

export default TitlevsTools;

import ToolCard from "@/components/card/ToolCard";
import { Reveal } from "@/components/ui/aceternity/reveal";
import { type Tool } from "@/lib/types/definitions";
import React from "react";

const TitlevsTools = ({
  title = "title",
  tools,
}: {
  title: string;
  tools: Tool[];
}) => {
  return (
    <section className="space-y-5">
      <Reveal>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      </Reveal>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4">
        {tools.map((tool, i) => (
          <ToolCard key={`${tool.text}-${i}`} tool={tool} />
        ))}
      </div>
    </section>
  );
};

export default TitlevsTools;

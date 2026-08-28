import React from "react";
import { AvatarAva } from "../generic/avatar/AvatarAva";
import { type Tool } from "@/lib/types/definitions";
import { Reveal } from "../ui/aceternity/reveal";

interface ToolCardProps {
  tool: Tool;
}
const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <Reveal>
      <div className="h-full bg-background transition-colors hover:bg-muted/55">
        <div className="flex items-center gap-3 p-5 sm:p-6">
          <AvatarAva tool={tool} />
          <div className="space-y-1">
            <h3 className="font-semibold">{tool.text}</h3>
            <p className="text-sm text-muted-foreground">{tool.level}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default ToolCard;

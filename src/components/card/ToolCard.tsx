import React from "react";
import { AvatarAva } from "../generic/avatar/AvatarAva";
import { type Tool } from "@/lib/types/definitions";
import { CardSpotlight } from "../ui/aceternity/card-spotlight";
import { Reveal } from "../ui/aceternity/reveal";

interface ToolCardProps {
  tool: Tool;
}
const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <Reveal>
      <CardSpotlight className="h-full transition duration-500 hover:-translate-y-1">
        <div className="flex items-center gap-3 p-5">
          <AvatarAva tool={tool} />
          <div className="space-y-1">
            <h3 className="font-semibold">{tool.text}</h3>
            <p className="text-sm text-muted-foreground">{tool.level}</p>
          </div>
        </div>
      </CardSpotlight>
    </Reveal>
  );
};

export default ToolCard;

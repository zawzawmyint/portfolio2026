import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Tool } from "@/lib/types/definitions";

interface AvatarAvaTool {
  tool: Tool;
}
export function AvatarAva({ tool }: AvatarAvaTool) {
  return (
    <Avatar>
      <AvatarImage
        src={tool.image}
        alt={tool.text}
        className="hover:scale-110 duration-500"
      />
      <AvatarFallback>{tool.text.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
}

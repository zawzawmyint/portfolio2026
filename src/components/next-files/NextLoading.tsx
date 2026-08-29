import BaseContainer from "@/components/global/base-container/BaseContainer";
import { LoaderCircle } from "lucide-react";
import { MovingBorder } from "../ui/aceternity/moving-border";

export default function NextLoading({
  text,
  children,
}: {
  text?: string;
  children?: React.ReactNode;
}) {
  // Or a custom loading skeleton component
  return (
    <BaseContainer>
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
        <MovingBorder className="grid size-20 place-items-center rounded-[calc(1rem-1px)]">
          <LoaderCircle className="size-8 animate-spin text-brand" aria-hidden="true" />
        </MovingBorder>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground" role="status">
          {text || "Loading experience"}
        </p>
        <div>{children}</div>
      </div>
    </BaseContainer>
  );
}

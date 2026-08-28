import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type EditorialArrowProps = {
  className?: string;
  interactionGroup?: "link" | "image" | "none";
};

const interactionClasses = {
  link: "group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 rtl:group-hover/link:-translate-x-0.5 motion-reduce:group-hover/link:translate-x-0 motion-reduce:group-hover/link:translate-y-0",
  image:
    "group-hover/image:-translate-y-0.5 group-hover/image:translate-x-0.5 rtl:group-hover/image:-translate-x-0.5 motion-reduce:group-hover/image:translate-x-0 motion-reduce:group-hover/image:translate-y-0",
  none: "",
} as const;

export function EditorialArrow({
  className,
  interactionGroup = "link",
}: EditorialArrowProps) {
  return (
    <ArrowUpRight
      className={cn(
        "shrink-0 transition-transform duration-300 rtl:-scale-x-100 motion-reduce:transition-none",
        interactionClasses[interactionGroup],
        className,
      )}
    />
  );
}

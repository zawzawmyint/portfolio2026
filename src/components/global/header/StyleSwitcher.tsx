"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dictionary } from "@/lib/dictionaries/types";
import { DESIGN_STYLES, isDesignStyleId } from "@/lib/styles/registry";
import { setDesignStyle, useDesignStyle } from "@/lib/styles/style-preference";

export default function StyleSwitcher({
  controls,
  styles,
}: {
  controls: Dictionary["common"]["controls"];
  styles: Dictionary["common"]["styles"];
}) {
  const style = useDesignStyle();

  return (
    <Select
      onValueChange={(value) => {
        if (isDesignStyleId(value)) setDesignStyle(value);
      }}
      value={style}
    >
      <SelectTrigger
        aria-label={controls.selectStyle}
        className="skeuo-control h-9 w-[6.75rem] gap-1 rounded-xl bg-background/70 px-2.5 text-xs font-semibold"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="min-w-[9rem] rounded-xl">
        <SelectGroup>
          {DESIGN_STYLES.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {styles[item.labelKey]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

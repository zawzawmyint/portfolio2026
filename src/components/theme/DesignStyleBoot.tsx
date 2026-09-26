"use client";

import * as React from "react";
import { applyDesignStyle, readDesignStyle } from "@/lib/styles/style-preference";

export function DesignStyleBoot() {
  React.useLayoutEffect(() => {
    applyDesignStyle(readDesignStyle());
  }, []);

  return null;
}

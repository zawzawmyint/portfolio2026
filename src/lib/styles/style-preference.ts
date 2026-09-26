"use client";

import * as React from "react";
import {
  DEFAULT_DESIGN_STYLE,
  DESIGN_STYLE_STORAGE_KEY,
  isDesignStyleId,
  type DesignStyleId,
} from "@/lib/styles/registry";

const CHANGE_EVENT = "portfolio:design-style-change";

export const readDesignStyle = (): DesignStyleId => {
  try {
    const stored = window.localStorage.getItem(DESIGN_STYLE_STORAGE_KEY);
    return isDesignStyleId(stored) ? stored : DEFAULT_DESIGN_STYLE;
  } catch {
    return DEFAULT_DESIGN_STYLE;
  }
};

export const applyDesignStyle = (style: DesignStyleId) => {
  document.documentElement.dataset.style = style;
};

const subscribe = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
};

export const useDesignStyle = () =>
  React.useSyncExternalStore(subscribe, readDesignStyle, () => DEFAULT_DESIGN_STYLE);

export const setDesignStyle = (style: DesignStyleId) => {
  window.localStorage.setItem(DESIGN_STYLE_STORAGE_KEY, style);
  applyDesignStyle(style);
  window.dispatchEvent(new Event(CHANGE_EVENT));
};

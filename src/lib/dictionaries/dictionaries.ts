import "server-only";

const dictionaries = {
  "en-US": () => import("./en.json").then((module) => module.default),
  "en-PH": () => import("./en.json").then((module) => module.default),
  "ja-JP": () => import("./ja.json").then((module) => module.default),
  "ar-SA": () => import("./ar.json").then((module) => module.default),
  "TH": () => import("./th.json").then((module) => module.default),
  "MM": () => import("./mm.json").then((module) => module.default),
} as const;

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

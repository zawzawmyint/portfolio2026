export const DESIGN_STYLES = [
  { id: "current", labelKey: "current" },
  { id: "neo", labelKey: "neo" },
  { id: "nineties", labelKey: "nineties" },
] as const;

export type DesignStyleId = (typeof DESIGN_STYLES)[number]["id"];
export type DesignStyleLabelKey = (typeof DESIGN_STYLES)[number]["labelKey"];

export const DEFAULT_DESIGN_STYLE: DesignStyleId = "current";
export const DESIGN_STYLE_STORAGE_KEY = "portfolio:design-style";

const styleIds = DESIGN_STYLES.map((style) => style.id);

export const isDesignStyleId = (value: string | null): value is DesignStyleId =>
  styleIds.some((styleId) => styleId === value);

export const designStyleBootScript = `(function(){try{var allowed=${JSON.stringify(styleIds)};var stored=localStorage.getItem(${JSON.stringify(DESIGN_STYLE_STORAGE_KEY)});document.documentElement.dataset.style=allowed.indexOf(stored)===-1?${JSON.stringify(DEFAULT_DESIGN_STYLE)}:stored;}catch(e){document.documentElement.dataset.style=${JSON.stringify(DEFAULT_DESIGN_STYLE)};}})();`;

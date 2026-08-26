export const THEMES = [
  { id: "editorial", name: "Editorial" },
  { id: "retro", name: "Retro Print" },
  { id: "minimal", name: "Minimal" },
  { id: "indian-print", name: "Indian Print" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "editorial";

export const THEME_STORAGE_KEY = "portfolio-theme";

export function isThemeId(value: string): value is ThemeId {
  return THEMES.some((theme) => theme.id === value);
}

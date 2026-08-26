"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  THEMES,
  isThemeId,
  type ThemeId,
} from "@/lib/themes";
import styles from "./ThemeSwitcher.module.css";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && isThemeId(stored)) {
      setTheme(stored);
    }
    setMounted(true);
  }, []);

  function selectTheme(next: ThemeId) {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }

  return (
    <div role="group" aria-label="Colour theme" className={styles.switcher}>
      <span className={styles.label}>Theme</span>
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => selectTheme(t.id)}
          aria-pressed={mounted && theme === t.id}
          className={styles.button}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import styles from "./ThemeSwitcher.module.css";

const THEMES = [
  { id: "editorial", name: "Editorial" },
  { id: "retro", name: "Retro Print" },
  { id: "minimal", name: "Minimal" },
  { id: "indian-print", name: "Indian Print" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("editorial");

  function selectTheme(next: ThemeId) {
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }

  return (
    <div role="group" aria-label="Colour theme" className={styles.switcher}>
      <span className={styles.label}>Theme</span>
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => selectTheme(t.id)}
          aria-pressed={theme === t.id}
          className={styles.button}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}

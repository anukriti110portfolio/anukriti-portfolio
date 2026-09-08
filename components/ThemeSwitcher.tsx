"use client";

import { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && isThemeId(stored)) {
      setTheme(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function selectTheme(next: ThemeId) {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
    setOpen(false);
  }

  return (
    <div className={styles.switcher} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.swatch} aria-hidden="true" />
        <span className={styles.triggerLabel}>Theme</span>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`} aria-hidden="true">
          ▾
        </span>
      </button>

      {open ? (
        <div role="group" aria-label="Colour theme" className={styles.panel}>
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => selectTheme(t.id)}
              aria-pressed={mounted && theme === t.id}
              className={styles.option}
            >
              {t.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

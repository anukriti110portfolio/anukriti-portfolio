"use client";

import { useEffect, useState } from "react";
import styles from "./TypingGreeting.module.css";

type TypingGreetingProps = {
  /** Lines typed one after the other. */
  lines: { text: string; lang?: string; className?: string }[];
  /** Milliseconds per character. */
  speed?: number;
  /** Pause between lines, in milliseconds. */
  pause?: number;
};

function graphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (part) => part.segment);
  }
  return Array.from(text);
}

/**
 * Types each line in turn with a caret. The full text is always rendered
 * (hidden) so the layout never shifts and screen readers read it at once.
 */
export default function TypingGreeting({
  lines,
  speed = 60,
  pause = 450,
}: TypingGreetingProps) {
  const [typed, setTyped] = useState<number[] | null>(null);
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const parts = lines.map((line) => graphemes(line.text));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let line = 0;
    let count = 0;
    let timer: ReturnType<typeof setTimeout>;

    if (reduce) {
      timer = setTimeout(() => {
        setTyped(parts.map((p) => p.length));
        setActiveLine(parts.length - 1);
      }, 0);
      return () => clearTimeout(timer);
    }

    const tick = () => {
      if (line >= parts.length) return;
      count += 1;
      const currentLine = line;
      const currentCount = count;
      setTyped((prev) => {
        const next = [...(prev ?? parts.map(() => 0))];
        next[currentLine] = currentCount;
        return next;
      });
      if (count >= parts[line].length) {
        if (line === parts.length - 1) return;
        line += 1;
        count = 0;
        setActiveLine(line);
        timer = setTimeout(tick, pause);
      } else {
        timer = setTimeout(tick, speed);
      }
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [lines, speed, pause]);

  return (
    <>
      {lines.map((line, index) => {
        const parts = graphemes(line.text);
        const count = typed ? typed[index] : 0;
        const visible = parts.slice(0, count).join("");
        const showCaret = index === activeLine;
        return (
          <span
            key={line.text}
            className={`${styles.line} ${line.className ?? ""}`}
            lang={line.lang}
          >
            <span className={styles.ghost}>{line.text}</span>
            <span className={styles.typed} aria-hidden="true">
              {visible}
              {showCaret ? <span className={styles.caret} /> : null}
            </span>
          </span>
        );
      })}
    </>
  );
}

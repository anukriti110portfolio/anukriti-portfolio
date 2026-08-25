"use client";

import { useState } from "react";
import PlaygroundCard, { type PlaygroundSummary } from "@/components/PlaygroundCard";
import styles from "./PlaygroundBrowser.module.css";

type PlaygroundBrowserProps = {
  items: PlaygroundSummary[];
  categories: string[];
};

export default function PlaygroundBrowser({
  items,
  categories,
}: PlaygroundBrowserProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const visibleItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div>
      <div role="group" aria-label="Filter by category" className={styles.filterBar}>
        <span className={styles.label}>Filter</span>
        {["All", ...categories].map((category) => (
          <button
            key={category}
            type="button"
            className={styles.filter}
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {visibleItems.length > 0 ? (
        <ul className={styles.grid}>
          {visibleItems.map((item) => (
            <PlaygroundCard key={item.slug} item={item} />
          ))}
        </ul>
      ) : (
        <p className={styles.emptyState}>
          No experiments in this category yet — new ones land as they are made.
        </p>
      )}
    </div>
  );
}

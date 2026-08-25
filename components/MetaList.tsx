import type { ReactNode } from "react";
import styles from "./MetaList.module.css";

export type MetaEntry = {
  label: string;
  value: ReactNode;
  isTags?: boolean;
};

type MetaListProps = {
  entries: MetaEntry[];
};

export default function MetaList({ entries }: MetaListProps) {
  if (entries.length === 0) return null;

  return (
    <div className={styles.metaBand}>
      {entries.map((entry) => (
        <div key={entry.label} className={styles.metaItem}>
          <span className={styles.metaLabel}>{entry.label}</span>
          <span className={entry.isTags ? styles.tagsRow : styles.metaValue}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

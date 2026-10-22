import type { ReactNode } from "react";
import styles from "./Section.module.css";

type SectionProps = {
  title: string;
  children: ReactNode;
};

/**
 * Editorial row for long-form playground pages: a quiet label on the left,
 * content on the right. Collapses to a single column on small screens.
 */
export default function Section({ title, children }: SectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.label}>{title}</h2>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

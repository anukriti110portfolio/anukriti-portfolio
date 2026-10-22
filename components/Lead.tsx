import type { ReactNode } from "react";
import styles from "./Lead.module.css";

export default function Lead({ children }: { children: ReactNode }) {
  return <p className={styles.lead}>{children}</p>;
}

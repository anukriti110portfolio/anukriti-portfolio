import styles from "./Flow.module.css";

type FlowProps = {
  items: string[];
};

/** A short left-to-right sequence, e.g. Rotate → Align → Push → Infuse. */
export default function Flow({ items }: FlowProps) {
  return (
    <ol className={styles.flow}>
      {items.map((item) => (
        <li key={item} className={styles.step}>
          {item}
        </li>
      ))}
    </ol>
  );
}

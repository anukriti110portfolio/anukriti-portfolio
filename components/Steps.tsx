import styles from "./Steps.module.css";

type StepItem = {
  title: string;
  text: string;
};

export default function Steps({ items }: { items: StepItem[] }) {
  return (
    <ol className={styles.steps}>
      {items.map((item, index) => (
        <li key={item.title} className={styles.step}>
          <span className={styles.number} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.text}>{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

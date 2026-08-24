import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  id: string;
  kicker: string;
  title: string;
};

export default function SectionHeader({ id, kicker, title }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <p className={styles.kicker}>{kicker}</p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
    </div>
  );
}

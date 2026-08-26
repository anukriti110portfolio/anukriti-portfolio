import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  id: string;
  kicker: string;
  title: string;
  headingLevel?: 1 | 2;
};

export default function SectionHeader({
  id,
  kicker,
  title,
  headingLevel = 2,
}: SectionHeaderProps) {
  const HeadingTag = (`h${headingLevel}` as "h1" | "h2");

  return (
    <div className={styles.header}>
      <p className={styles.kicker}>{kicker}</p>
      <HeadingTag id={id} className={styles.title}>
        {title}
      </HeadingTag>
    </div>
  );
}

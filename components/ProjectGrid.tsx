import styles from "./ProjectGrid.module.css";

type ProjectGridProps = {
  children: React.ReactNode;
};

export default function ProjectGrid({ children }: ProjectGridProps) {
  return <ul className={styles.grid}>{children}</ul>;
}

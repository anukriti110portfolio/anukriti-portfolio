import type { Project } from "@/lib/projects";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const plateNumber = String(index + 1).padStart(2, "0");

  return (
    <li>
      <article className={styles.card}>
        <div className={styles.cover} aria-hidden="true">
          <span className={styles.plate}>PLATE {plateNumber}</span>
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.meta}>
          {project.category ? `${project.category} · ` : ""}Case study in progress
        </p>
      </article>
    </li>
  );
}

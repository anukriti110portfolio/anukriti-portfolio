import Link from "next/link";
import type { ContentFile, ProjectFrontmatter } from "@/lib/content";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: ContentFile<ProjectFrontmatter>;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const plateNumber = String(index + 1).padStart(2, "0");
  const fm = project.frontmatter;

  return (
    <li>
      <Link href={`/work/${project.slug}`} className={styles.link}>
        <article className={styles.card}>
          <div className={styles.cover} aria-hidden="true">
            <span className={styles.plate}>PLATE {plateNumber}</span>
          </div>
          <h3 className={styles.title}>{fm.title}</h3>
          <p className={styles.meta}>
            {[fm.category, fm.year].filter(Boolean).join(" · ") ||
              "Case study in progress"}
          </p>
        </article>
    </Link>
    </li>
  );
}

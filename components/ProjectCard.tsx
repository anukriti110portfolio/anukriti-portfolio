import Link from "next/link";
import Image from "next/image";
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
        <article className={styles.strip}>
          <div className={styles.cover}>
            {fm.cover ? (
              <Image
                src={fm.cover}
                alt=""
                fill
                sizes="(max-width: 56rem) 100vw, 26rem"
              />
            ) : (
              <span className={styles.plate} aria-hidden="true">
                PLATE {plateNumber}
              </span>
            )}
            {fm.category ? (
              <span className={styles.categoryTab} aria-hidden="true">
                {fm.category}
              </span>
            ) : null}
          </div>

          <div className={styles.content}>
            <p className={styles.number}>{plateNumber}</p>
            <h3 className={styles.title}>{fm.title}</h3>
            {fm.whatIf ? (
              <p className={styles.hook}>
                <span className={styles.hookKicker}>What if</span>
                {" "}
                {fm.whatIf}
              </p>
            ) : null}
            {fm.subtitle ? (
              <p className={styles.description}>{fm.subtitle}</p>
            ) : null}
            <span className={styles.caseLink}>
              View full case study <span aria-hidden="true">→</span>
            </span>
          </div>
        </article>
      </Link>
    </li>
  );
}

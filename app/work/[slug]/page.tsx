import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MdxContent from "@/components/MdxContent";
import Tag from "@/components/Tag";
import { getProject, getProjects } from "@/lib/content";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((file) => ({ slug: file.slug }));
}

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const { title, subtitle } = project.frontmatter;
  return {
    title: `${title} — Anukriti Tripathi`,
    description: subtitle ?? `${title} — case study.`,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const fm = project.frontmatter;

  const metaEntries = (
    [
      ["Year", fm.year],
      ["Role", fm.role],
      ["Duration", fm.duration],
      ["Category", fm.category],
    ] as const
  ).filter(([, value]) => Boolean(value));

  return (
    <main className="wrap page">
      <Link href="/work" className="text-link">
        All work
      </Link>

      <header className={styles.header}>
        <p className={styles.kicker}>{fm.category ?? "Case study"}</p>
        <h1 className={styles.title}>{fm.title}</h1>
        {fm.subtitle ? <p className={styles.subtitle}>{fm.subtitle}</p> : null}
      </header>

      {(metaEntries.length > 0 || fm.tools?.length) && (
        <div className={styles.metaBand}>
          {metaEntries.map(([label, value]) => (
            <div key={label} className={styles.metaItem}>
              <span className={styles.metaLabel}>{label}</span>
              <span className={styles.metaValue}>{value}</span>
            </div>
          ))}
          {fm.tools?.length ? (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Tools</span>
              <span className={styles.toolsRow}>
                {fm.tools.map((tool) => (
                  <Tag key={tool}>{tool}</Tag>
                ))}
              </span>
            </div>
          ) : null}
        </div>
      )}

      <div className={styles.cover} aria-hidden="true">
        <span className={styles.plate}>COVER IMAGE — TO BE ADDED</span>
      </div>

      <MdxContent source={project.body} />

      <div className={styles.footerNav}>
        <Link href="/work" className="text-link">
          Back to all work
        </Link>
      </div>
    </main>
  );
}

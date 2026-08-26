import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MdxContent from "@/components/MdxContent";
import MetaList from "@/components/MetaList";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import { getProject, getProjectNeighbors, getProjects } from "@/lib/content";
import { buildPageMetadata } from "@/lib/site";
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
  return buildPageMetadata({
    title,
    description: subtitle ?? `${title} — case study.`,
    path: `/work/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const fm = project.frontmatter;
  const { prev, next } = getProjectNeighbors(slug);

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

      <MetaList
        entries={[
          ...(metaEntries.map(([label, value]) => ({ label, value }))),
          ...(fm.tools?.length
            ? [
                {
                  label: "Tools",
                  isTags: true,
                  value: (
                    <>
                      {fm.tools.map((tool) => (
                        <Tag key={tool}>{tool}</Tag>
                      ))}
                    </>
                  ),
                },
              ]
            : []),
        ]}
      />

      {fm.cover ? (
        <div className={styles.cover}>
          <Image
            src={fm.cover}
            alt={`${fm.title} cover image`}
            fill
            sizes="(max-width: 76rem) 100vw, 72rem"
          />
        </div>
      ) : (
        <div className={styles.cover} aria-hidden="true">
          <span className={styles.plate}>COVER IMAGE — TO BE ADDED</span>
        </div>
      )}

      {(fm.video || fm.prototypeUrl) && (
        <div className={styles.mediaLinks}>
          {fm.video ? (
            <a href={fm.video} className="text-link" target="_blank" rel="noopener noreferrer">
              Watch process video
            </a>
          ) : null}
          {fm.prototypeUrl ? (
            <Button href={fm.prototypeUrl} variant="outline">
              {fm.prototypeLabel ?? "View prototype"}
            </Button>
          ) : null}
        </div>
      )}

      <MdxContent source={project.body} />

      <nav aria-label="More projects" className={styles.neighborNav}>
        {prev ? (
          <Link href={`/work/${prev.slug}`} className={styles.neighbor}>
            <span className={styles.neighborLabel}>Previous</span>
            <span className={styles.neighborTitle}>{prev.frontmatter.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className={`${styles.neighbor} ${styles.neighborNext}`}
          >
            <span className={styles.neighborLabel}>Next</span>
            <span className={styles.neighborTitle}>{next.frontmatter.title}</span>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}

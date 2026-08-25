import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MdxContent from "@/components/MdxContent";
import MetaList, { type MetaEntry } from "@/components/MetaList";
import Tag from "@/components/Tag";
import {
  formatDate,
  getPlaygroundItem,
  getPlaygroundItems,
} from "@/lib/content";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPlaygroundItems().map((file) => ({ slug: file.slug }));
}

type ExperimentPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ExperimentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPlaygroundItem(slug);
  if (!item) return {};

  const { title, description } = item.frontmatter;
  return {
    title: `${title} — Playground — Anukriti Tripathi`,
    description: description ?? `${title} — playground experiment.`,
  };
}

export default async function ExperimentPage({ params }: ExperimentPageProps) {
  const { slug } = await params;
  const item = getPlaygroundItem(slug);
  if (!item) notFound();

  const fm = item.frontmatter;

  const entries: MetaEntry[] = [];
  if (fm.category) entries.push({ label: "Category", value: fm.category });
  if (fm.date) entries.push({ label: "Date", value: formatDate(fm.date) });
  if (fm.tools?.length) {
    entries.push({
      label: "Tools",
      isTags: true,
      value: (
        <>
          {fm.tools.map((tool) => (
            <Tag key={tool}>{tool}</Tag>
          ))}
        </>
      ),
    });
  }
  if (fm.skills?.length) {
    entries.push({
      label: "Skills shown",
      isTags: true,
      value: (
        <>
          {fm.skills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </>
      ),
    });
  }

  return (
    <main className="wrap page">
      <Link href="/playground" className="text-link">
        All experiments
      </Link>

      <header className={styles.header}>
        <p className={styles.kicker}>{fm.category}</p>
        <h1 className={styles.title}>{fm.title}</h1>
        {fm.description ? <p>{fm.description}</p> : null}
      </header>

      <MetaList entries={entries} />

      {(fm.figmaUrl || fm.externalUrl || fm.codeUrl || fm.video) && (
        <div className={styles.linksRow}>
          {fm.figmaUrl ? (
            <a href={fm.figmaUrl} className="text-link" target="_blank" rel="noopener noreferrer">
              Open in Figma
            </a>
          ) : null}
          {fm.externalUrl ? (
            <a href={fm.externalUrl} className="text-link" target="_blank" rel="noopener noreferrer">
              External link
            </a>
          ) : null}
          {fm.codeUrl ? (
            <a href={fm.codeUrl} className="text-link" target="_blank" rel="noopener noreferrer">
              View code
            </a>
          ) : null}
          {fm.video ? (
            <a href={fm.video} className="text-link" target="_blank" rel="noopener noreferrer">
              Watch video
            </a>
          ) : null}
        </div>
      )}

      <MdxContent source={item.body} />
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MdxContent from "@/components/MdxContent";
import Tag from "@/components/Tag";
import {
  formatDate,
  getNote,
  getNotes,
  getReadingTime,
} from "@/lib/content";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getNotes().map((file) => ({ slug: file.slug }));
}

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};

  const { title, description } = note.frontmatter;
  return {
    title: `${title} — Field Notes — Anukriti Tripathi`,
    description: description ?? `${title} — field note.`,
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const fm = note.frontmatter;
  const kickerParts = [
    fm.category,
    fm.date ? formatDate(fm.date) : null,
    `${getReadingTime(note.body)} min read`,
  ].filter(Boolean);

  return (
    <main className="wrap page">
      <Link href="/field-notes" className="text-link">
        All field notes
      </Link>

      <header className={styles.header}>
        <p className={styles.kicker}>{kickerParts.join(" · ")}</p>
        <h1 className={styles.title}>{fm.title}</h1>
        {fm.tags?.length ? (
          <div className={styles.tagsRow}>
            {fm.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        ) : null}
      </header>

      {fm.cover ? (
        <div className={styles.cover}>
          <Image
            src={fm.cover}
            alt=""
            fill
            sizes="(max-width: 76rem) 100vw, 72rem"
          />
        </div>
      ) : null}

      <MdxContent source={note.body} />

      <div className={styles.footerNav}>
        <Link href="/field-notes" className="text-link">
          Back to field notes
        </Link>
      </div>
    </main>
  );
}

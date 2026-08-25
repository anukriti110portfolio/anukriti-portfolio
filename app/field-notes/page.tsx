import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { formatDate, getNotes, getReadingTime } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Field Notes — Anukriti Tripathi",
  description:
    "Notes on design, human behaviour, research, technology, and visual culture.",
};

export default function FieldNotesPage() {
  const notes = getNotes();

  return (
    <main className="wrap page">
      <SectionHeader id="field-notes-title" kicker="Writing" title="Field Notes" />
      <p className={styles.intro}>
        Observations from the field — written as I learn, in public.
      </p>

      {notes.length > 0 ? (
        <ul className={styles.list}>
          {notes.map((note) => (
            <li key={note.slug} className={styles.row}>
              <span className={styles.meta}>
                {[
                  note.frontmatter.date ? formatDate(note.frontmatter.date) : null,
                  note.frontmatter.category,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
              <Link href={`/field-notes/${note.slug}`} className={styles.link}>
                <h2 className={styles.title}>{note.frontmatter.title}</h2>
              </Link>
              <span className={styles.meta}>
                {getReadingTime(note.body)} min read
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.intro}>First notes are being written.</p>
      )}
    </main>
  );
}

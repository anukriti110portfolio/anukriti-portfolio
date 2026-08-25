import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import PlaygroundBrowser from "@/components/PlaygroundBrowser";
import { getPlaygroundItems } from "@/lib/content";
import styles from "./page.module.css";

const CANONICAL_CATEGORIES = [
  "Figma",
  "Interaction",
  "Motion",
  "Typography",
  "Visual Design",
  "3D",
  "Physical Design",
  "Code",
  "AI",
  "Research",
];

export const metadata: Metadata = {
  title: "Playground — Anukriti Tripathi",
  description: "A living archive of design experiments and skills in action.",
};

export default function PlaygroundPage() {
  const items = getPlaygroundItems().map((file) => ({
    slug: file.slug,
    title: file.frontmatter.title,
    category: file.frontmatter.category,
    date: file.frontmatter.date,
    description: file.frontmatter.description,
    cover: file.frontmatter.cover,
  }));

  const usedCategories = CANONICAL_CATEGORIES.filter((category) =>
    items.some((item) => item.category === category)
  );

  return (
    <main className="wrap page">
      <SectionHeader
        id="playground-title"
        kicker="Experiments"
        title="Playground"
      />
      <p className={styles.intro}>
        A living proof-of-skills archive. Not a list of tools — evidence of
        what happens when I take an idea apart to see how it works.
      </p>
      <PlaygroundBrowser items={items} categories={usedCategories} />
    </main>
  );
}

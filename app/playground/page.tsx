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

import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Playground",
  description:
    "What I learned and explored in my academics at IIT Guwahati: form studies, mechanisms, 3D printing and fabrication.",
  path: "/playground",
});

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
        headingLevel={1}
      />
      <p className={styles.intro}>
        What I have learned and explored in my academics at IIT Guwahati: form
        studies, mechanisms, 3D printing and sheet metal fabrication. Each
        project follows an idea from sketch to CAD to a physical prototype,
        including the attempts that didn’t work.
      </p>
      <PlaygroundBrowser items={items} categories={usedCategories} />
    </main>
  );
}

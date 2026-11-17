import SectionHeader from "@/components/SectionHeader";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectCard from "@/components/ProjectCard";
import { getResearchItems } from "@/lib/content";
import { buildPageMetadata } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = buildPageMetadata({
  title: "Research Exploration",
  description:
    "Exploratory research studies: starting from a simple brief, finding the real problem, and mapping the gaps a designer can work on.",
  path: "/research-exploration",
});

export default function ResearchExplorationPage() {
  const items = getResearchItems();

  return (
    <main className="wrap page">
      <SectionHeader
        id="research-title"
        kicker="Research"
        title="Research Exploration"
        headingLevel={1}
      />
      <p className={styles.intro}>
        Exploratory studies that start from a simple brief, look for the real
        problem behind it, and map the gaps a designer can work on.
      </p>
      <ProjectGrid>
        {items.map((item, index) => (
          <ProjectCard
            key={item.slug}
            project={item}
            index={index}
            basePath="/research-exploration"
          />
        ))}
      </ProjectGrid>
    </main>
  );
}

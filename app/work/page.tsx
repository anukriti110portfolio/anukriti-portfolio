import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Work — Anukriti Tripathi",
  description: "Selected case studies across digital and physical product design.",
};

export default function WorkPage() {
  const projects = getProjects();

  return (
    <main className="wrap page">
      <SectionHeader id="work-title" kicker="Archive" title="Work" headingLevel={1} />
      <p className={styles.intro}>
        Case studies across UX, digital product design, physical product
        design, and research — written the way the work actually happened.
      </p>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </ProjectGrid>
    </main>
  );
}

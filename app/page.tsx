import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectCard from "@/components/ProjectCard";
import Tag from "@/components/Tag";
import ContactCTA from "@/components/ContactCTA";
import PlaygroundCard from "@/components/PlaygroundCard";
import { getNotes, getPlaygroundItems, getProjects } from "@/lib/content";
import styles from "./page.module.css";

const PLAYGROUND_CATEGORIES = ["3D", "Physical Design"];

const FIELD_NOTE_CATEGORIES = [
  "Design",
  "Human Behaviour",
  "Research",
  "Technology",
  "Visual Culture",
  "Learning",
  "Experiments",
];

export default function Home() {
  const projects = getProjects();
  const latestNote = getNotes()[0];
  const playgroundTeasers = getPlaygroundItems()
    .slice(0, 2)
    .map((file) => ({
      slug: file.slug,
      title: file.frontmatter.title,
      category: file.frontmatter.category,
      date: file.frontmatter.date,
      description: file.frontmatter.description,
      cover: file.frontmatter.cover,
    }));

  return (
    <main className="wrap page">
      <Hero />

      <Reveal>
        <section aria-labelledby="selected-work" className={`${styles.section} ${styles.firstSection}`}>
          <SectionHeader id="selected-work" kicker="01 · Project" title="Case Studies" />
          <div className={styles.sectionBody}>
            <ProjectGrid>
              {projects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </ProjectGrid>
            <p className={styles.sectionNote}>
              Each case study covers problem, research, process, and outcome.
            </p>
            <a href="/work" className="text-link">
              All work
            </a>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <div className={styles.spread}>
        <section aria-labelledby="playground-preview">
          <SectionHeader
            id="playground-preview"
            kicker="02 · Experiments"
            title="Playground"
          />
          <p>
            What I have learned and explored in my academics at IIT Guwahati:
            form studies, mechanisms, 3D printing and sheet metal fabrication,
            from first sketch to physical prototype.
          </p>
          <ul className={styles.teaserGrid} aria-label="Featured playground projects">
            {playgroundTeasers.map((item) => (
              <PlaygroundCard key={item.slug} item={item} />
            ))}
          </ul>
          <ul className={styles.chipRow} aria-label="Playground categories">
            {PLAYGROUND_CATEGORIES.map((category) => (
              <li key={category}>
                <Tag>{category}</Tag>
              </li>
            ))}
          </ul>
          <a href="/playground" className="text-link">
            Browse the playground
          </a>
        </section>

        <section aria-labelledby="field-notes-preview">
          <SectionHeader
            id="field-notes-preview"
            kicker="03 · Writing"
            title="Blog"
          />
          <p>
            Short observations from the field — design, human behaviour,
            research, and visual culture, written as I learn.
          </p>
          {latestNote ? (
            <p className={styles.sectionNote}>
              Latest:{" "}
              <a href={`/field-notes/${latestNote.slug}`} className={styles.noteLink}>
                {latestNote.frontmatter.title}
              </a>
            </p>
          ) : null}
          <ul className={styles.chipRow} aria-label="Field note categories">
            {FIELD_NOTE_CATEGORIES.map((category) => (
              <li key={category}>
                <Tag>{category}</Tag>
              </li>
            ))}
          </ul>
          <a href="/field-notes" className="text-link">
            Read the blog
          </a>
        </section>
        </div>
      </Reveal>

      <ContactCTA />
    </main>
  );
}

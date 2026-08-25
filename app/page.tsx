import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectCard from "@/components/ProjectCard";
import Tag from "@/components/Tag";
import ContactCTA from "@/components/ContactCTA";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { getNotes, getProjects } from "@/lib/content";
import styles from "./page.module.css";

const PLAYGROUND_CATEGORIES = [
  "Figma",
  "Interaction",
  "Motion",
  "Typography",
  "Visual Design",
  "3D",
  "Physical Design",
  "Code",
  "Research",
];

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

  return (
    <main className="wrap page">
      <Hero />

      <section aria-labelledby="selected-work" className={styles.section}>
        <SectionHeader id="selected-work" kicker="01 · Archive" title="Selected work" />
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

      <div className={styles.spread}>
        <section aria-labelledby="playground-preview">
          <SectionHeader
            id="playground-preview"
            kicker="02 · Experiments"
            title="Playground"
          />
          <p>
            A living proof-of-skills archive: micro-interactions, motion and
            type studies, code experiments, and physical prototypes. Not a
            list of skills — evidence of them.
          </p>
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
            title="Field Notes"
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
            Read field notes
          </a>
        </section>
      </div>

      <section aria-labelledby="studio-preview" className={styles.section}>
        <SectionHeader id="studio-preview" kicker="04 · Process" title="Studio" />
        <div className={styles.sectionBody}>
          <div className={styles.studioBand}>
            <p>
              A visual archive — branding experiments, visual studies, and
              process work collected like archival plates rather than a social
              feed.
            </p>
            <a href="/studio" className="text-link">
              Enter the archive
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-preview" className={styles.section}>
        <SectionHeader id="about-preview" kicker="05 · Person" title="About" />
        <div className={styles.readingColumn}>
          <p>
            I move between digital tools and workshop materials. The common
            thread is curiosity about how people actually use things — which
            is why my process usually starts with research and ends with
            something you can click or hold.
          </p>
          <a href="/about" className="text-link">
            More about me
          </a>
        </div>
      </section>

      <ContactCTA />

      <div className={styles.devRow}>
        <ThemeSwitcher />
      </div>
    </main>
  );
}

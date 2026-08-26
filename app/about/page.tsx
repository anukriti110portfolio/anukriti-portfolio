import Image from "next/image";
import Link from "next/link";
import Tag from "@/components/Tag";
import { buildPageMetadata } from "@/lib/site";
import ContactCTA from "@/components/ContactCTA";
import { getPlaygroundItems } from "@/lib/content";
import styles from "./page.module.css";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "About Anukriti Tripathi, a designer working across digital and physical products.",
  path: "/about",
});

const PRINCIPLES = [
  {
    title: "Curiosity first",
    text: "Every project starts with a question worth answering, not a deliverable to fill.",
  },
  {
    title: "Research with people, not about them",
    text: "Assumptions are cheap; conversations and observation are cheaper than building the wrong thing.",
  },
  {
    title: "Digital and physical are one practice",
    text: "Materials teach interfaces patience; interfaces teach materials feedback. The two disciplines sharpen each other.",
  },
  {
    title: "Make it real early",
    text: "Rough prototypes settle arguments that polished slides cannot.",
  },
];

const DESIGN_TOOLS = ["Figma", "Pen & paper"];
const CODE_TOOLS = ["HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript"];

const INTERESTS = [
  "Design research",
  "Vernacular print culture",
  "Ergonomics of everyday objects",
  "Human behaviour",
  "Typography",
];

export default function AboutPage() {
  const experiments = getPlaygroundItems().slice(0, 3);

  return (
    <main className="wrap page">
      <h1 className={styles.pageTitle}>About</h1>
      <div className={styles.grid}>
        <div className={styles.aside}>
          <div className={styles.portrait}>
            <Image
              src="/images/about/portrait.svg"
              alt="Portrait placeholder â€” replace with a photo of Anukriti"
              fill
              sizes="(max-width: 56rem) 100vw, 22rem"
            />
          </div>
          <p className={styles.caption}>
            Portrait â€” replace /images/about/portrait.svg
          </p>
        </div>

        <div className={styles.content}>
          <header>
            <p className={styles.intro}>
              I&apos;m Anukriti Tripathi â€” a product and interaction designer
              working across digital and physical products. My work usually
              starts with questions about people and ends in things you can
              click, hold, or both.
            </p>
          </header>

          <section aria-labelledby="philosophy" className={styles.section}>
            <h2 id="philosophy" className={styles.sectionTitle}>
              Design philosophy
            </h2>
            <ol className={styles.principles}>
              {PRINCIPLES.map((principle) => (
                <li key={principle.title} className={styles.principle}>
                  <div className={styles.principleText}>
                    <strong>{principle.title}</strong>
                    <p>{principle.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="education" className={styles.section}>
            <h2 id="education" className={styles.sectionTitle}>
              Education
            </h2>
            <div className={styles.slotBox}>
              <p className={styles.slotLabel}>Content needed</p>
              <p>
                Degree(s), institution(s), and year(s) go here. Edit{" "}
                <code>app/about/page.tsx</code> or move this section into MDX
                later.
              </p>
            </div>
          </section>

          <section aria-labelledby="learning" className={styles.section}>
            <h2 id="learning" className={styles.sectionTitle}>
              Currently learning
            </h2>
            <ul className={styles.learningList}>
              <li>Frontend development â€” this website is the coursework</li>
              <li>Motion and interaction design</li>
              <li>[CONTENT NEEDED] What else is on your desk right now?</li>
            </ul>
          </section>

          <section aria-labelledby="toolbox" className={styles.section}>
            <h2 id="toolbox" className={styles.sectionTitle}>
              Toolbox
            </h2>
            <div className={styles.tagGroups}>
              <div>
                <p className={styles.tagGroupLabel}>Design</p>
                <div className={styles.tagRow}>
                  {DESIGN_TOOLS.map((tool) => (
                    <Tag key={tool}>{tool}</Tag>
                  ))}
                </div>
              </div>
              <div>
                <p className={styles.tagGroupLabel}>Code (learning)</p>
                <div className={styles.tagRow}>
                  {CODE_TOOLS.map((tool) => (
                    <Tag key={tool}>{tool}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="interests" className={styles.section}>
            <h2 id="interests" className={styles.sectionTitle}>
              Interests
            </h2>
            <ul className={styles.learningList}>
              {INTERESTS.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </section>

          {experiments.length > 0 && (
            <section aria-labelledby="experiments" className={styles.section}>
              <h2 id="experiments" className={styles.sectionTitle}>
                Selected experiments
              </h2>
              <ul className={styles.experimentsList}>
                {experiments.map((experiment) => (
                  <li key={experiment.slug} className={styles.experimentRow}>
                    <Link
                      href={`/playground/${experiment.slug}`}
                      className={`link ${styles.experimentLink}`}
                    >
                      <span className={styles.experimentTitle}>
                        {experiment.frontmatter.title}
                      </span>
                    </Link>
                    <span className={styles.caption}>
                      {experiment.frontmatter.category}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/playground" className="text-link">
                All experiments
              </Link>
            </section>
          )}
        </div>
      </div>

      <ContactCTA />
    </main>
  );
}

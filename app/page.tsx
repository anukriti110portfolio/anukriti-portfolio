import ThemeSwitcher from "@/components/ThemeSwitcher";
import styles from "./page.module.css";

const COLOUR_TOKENS = [
  { name: "--background", note: "paper" },
  { name: "--surface", note: "cards" },
  { name: "--foreground", note: "ink" },
  { name: "--muted", note: "secondary text" },
  { name: "--accent", note: "vermilion" },
  { name: "--line", note: "rules & borders" },
];

const SPACING_TOKENS = [
  "--space-3xs",
  "--space-2xs",
  "--space-xs",
  "--space-sm",
  "--space-md",
  "--space-lg",
  "--space-xl",
  "--space-2xl",
];

export default function Home() {
  return (
    <main className={styles.specimen}>
      <header className={styles.header}>
        <p className={styles.kicker}>Phase 03 · Token specimen</p>
        <h1 className={styles.title}>
          Anukriti Tripathi
          <span className={styles.hindi} lang="hi">
            {" "}
            अनुकृति
          </span>
        </h1>
        <p className={styles.lede}>
          Temporary specimen page. It exists only to prove the design tokens
          work — the real homepage arrives in Phase 06.
        </p>
        <ThemeSwitcher />
      </header>

      <section aria-labelledby="type-scale" className={styles.section}>
        <h2 id="type-scale" className={styles.sectionTitle}>
          Type scale
        </h2>
        <p className={styles.sampleHero}>Display / Hero</p>
        <p className={styles.sample2xl}>Heading level two</p>
        <p className={styles.sampleLg}>Section heading</p>
        <p className={styles.sampleBase}>
          Body text at base size, set for comfortable reading measure across a
          forty-two character column.
        </p>
        <p className={styles.sampleMono}>MONO LABEL · 001 · IBM PLEX MONO</p>
      </section>

      <section aria-labelledby="colours" className={styles.section}>
        <h2 id="colours" className={styles.sectionTitle}>
          Colour tokens
        </h2>
        <ul className={styles.swatches}>
          {COLOUR_TOKENS.map((token) => (
            <li key={token.name} className={styles.swatchItem}>
              <span
                className={styles.swatch}
                style={{ background: `var(${token.name})` }}
              />
              <span className={styles.swatchName}>{token.name}</span>
              <span className={styles.swatchNote}>{token.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="spacing" className={styles.section}>
        <h2 id="spacing" className={styles.sectionTitle}>
          Spacing scale
        </h2>
        <ul className={styles.spacingList}>
          {SPACING_TOKENS.map((token) => (
            <li key={token} className={styles.spacingRow}>
              <span className={styles.spacingName}>{token}</span>
              <span className={styles.spacingBar} style={{ width: `var(${token})` }} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="print-detail" className={styles.section}>
        <h2 id="print-detail" className={styles.sectionTitle}>
          Print detail
        </h2>
        <div className={styles.printCard}>
          <p className={styles.printCardLabel}>Hard offset shadow</p>
          <p>
            A print-inspired alternative to blurry drop shadows. Radius stays
            small; rules stay crisp.
          </p>
        </div>
      </section>
    </main>
  );
}

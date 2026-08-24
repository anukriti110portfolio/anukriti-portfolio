import ThemeSwitcher from "@/components/ThemeSwitcher";
import SectionHeader from "@/components/SectionHeader";
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
    <main className={`wrap ${styles.page}`}>
      <header className={styles.intro}>
        <p className={styles.kicker}>Phases 03–04 · Token &amp; layout specimen</p>
        <h1 className={styles.title}>
          Anukriti Tripathi
          <span className={styles.hindi} lang="hi">
            {" "}
            अनुकृति
          </span>
        </h1>
        <p className={styles.lede}>
          Temporary specimen page. It exists to prove the design tokens and
          layout system work — the real homepage arrives in Phase 06.
        </p>
        <ThemeSwitcher />
      </header>

      <section aria-labelledby="editorial-type" className={styles.section}>
        <SectionHeader
          id="editorial-type"
          kicker="01 · Typography"
          title="Editorial defaults"
        />
        <div className={styles.typeDemo}>
          <p className="dropcap">
            Body text is set for a comfortable reading measure of roughly
            sixty-five characters. The first letter of an opening paragraph can
            be dropped into the column, the way newspapers and old Indian print
            journals set their features. Everything you see here comes from the
            shared base styles, not from this page.
          </p>
          <blockquote>
            A pull-quote borrows the display serif and leans on a heavy accent
            rule, like a magazine spread.
          </blockquote>
          <figure>
            <div className={styles.figurePlaceholder} aria-hidden="true">
              FIG.
            </div>
            <figcaption>FIG. 01 — Caption style for images and video</figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="colours" className={styles.section}>
        <SectionHeader id="colours" kicker="02 · Colour" title="Colour tokens" />
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
        <SectionHeader id="spacing" kicker="03 · Rhythm" title="Spacing scale" />
        <ul className={styles.spacingList}>
          {SPACING_TOKENS.map((token) => (
            <li key={token} className={styles.spacingRow}>
              <span className={styles.spacingName}>{token}</span>
              <span
                className={styles.spacingBar}
                style={{ width: `var(${token})` }}
              />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="print-detail" className={styles.section}>
        <SectionHeader
          id="print-detail"
          kicker="04 · Detail"
          title="Print detail"
        />
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

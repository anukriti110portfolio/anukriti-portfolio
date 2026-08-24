import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <div>
          <p className={styles.name}>Anukriti Tripathi</p>
          <p className={styles.tagline}>Design across digital &amp; physical products</p>
        </div>
        <p className={styles.colophon}>
          Set in Fraunces, Inter &amp; IBM Plex Mono · Built with Next.js
          <br />© {year} Anukriti Tripathi
        </p>
      </div>
    </footer>
  );
}

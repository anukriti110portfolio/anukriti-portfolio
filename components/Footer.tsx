import ThemeSwitcher from "@/components/ThemeSwitcher";
import { siteConfig } from "@/lib/site";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <div>
          <p className={styles.name}>{siteConfig.name}</p>
          <p className={styles.tagline}>Design across digital &amp; physical products</p>
          <ThemeSwitcher />
        </div>
        <p className={styles.colophon}>
          Set in Fraunces, Inter &amp; IBM Plex Mono · Built with Next.js
          <br />© {year} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}

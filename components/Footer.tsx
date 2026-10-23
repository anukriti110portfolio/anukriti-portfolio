import { siteConfig } from "@/lib/site";
import Button from "@/components/Button";
import styles from "./Footer.module.css";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V9h4v1.5A5.98 5.98 0 0 1 16 8z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: siteConfig.linkedin || "#", icon: <LinkedInIcon /> },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <div>
          <p className={styles.name}>
            {siteConfig.name}
            <span className={styles.devanagari} lang="hi" aria-hidden="true">
              {siteConfig.nameDevanagari}
            </span>
          </p>
          <p className={styles.tagline}>Design across digital &amp; physical products</p>
        </div>

        <div className={styles.linksGroup}>
          <ul className={styles.socials} aria-label="Social links">
            {SOCIAL_LINKS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
          {siteConfig.resumePath && (
            <Button href={siteConfig.resumePath} variant="outline" className={styles.cvButton}>
              CV
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
}

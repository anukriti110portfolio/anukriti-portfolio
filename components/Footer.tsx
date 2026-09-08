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

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: siteConfig.linkedin || "#", icon: <LinkedInIcon /> },
  { label: "GitHub", href: siteConfig.github || "#", icon: <GitHubIcon /> },
  { label: "Instagram", href: siteConfig.instagram || "#", icon: <InstagramIcon /> },
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
          <Button href={siteConfig.resumePath || "#"} variant="outline" className={styles.cvButton}>
            CV
          </Button>
        </div>
      </div>
    </footer>
  );
}

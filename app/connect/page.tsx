import type { Metadata } from "next";
import CopyEmail from "@/components/CopyEmail";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Connect — Anukriti Tripathi",
  description: "Start a conversation with Anukriti Tripathi.",
};

type Channel = {
  label: string;
  url: string;
  display?: string;
};

export default function ConnectPage() {
  const channels: Channel[] = [
    { label: "LinkedIn", url: siteConfig.linkedin },
    { label: "Instagram", url: siteConfig.instagram },
    { label: "GitHub", url: siteConfig.github },
    { label: "Resume", url: siteConfig.resumePath, display: "Download PDF" },
  ];

  return (
    <main className="wrap page">
      <p className={styles.pageTitle}>Connect</p>
      <h1 className={styles.title}>Let&apos;s start a conversation.</h1>
      <p className={styles.lede}>
        A project, a question about my work, an experiment you think I should
        see — my inbox is open to all of it.
      </p>

      <div className={styles.emailPlate}>
        <div className={styles.emailGroup}>
          <span className={styles.emailLabel}>Email</span>
          <a href={`mailto:${siteConfig.email}`} className={styles.emailLink}>
            {siteConfig.email}
          </a>
        </div>
        <CopyEmail email={siteConfig.email} />
      </div>

      <dl className={styles.directory}>
        {channels.map((channel) => (
          <div key={channel.label} className={styles.row}>
            <dt className={styles.rowLabel}>{channel.label}</dt>
            {channel.url ? (
              <dd className={styles.rowValue}>
                <a
                  href={channel.url}
                  className={`rowLink ${styles.rowLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {channel.display ?? channel.url.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </dd>
            ) : (
              <dd className={`${styles.rowValue} ${styles.missing}`}>
                Coming soon
              </dd>
            )}
          </div>
        ))}
      </dl>

      {!siteConfig.linkedin && !siteConfig.instagram && !siteConfig.github && (
        <p className={styles.missing} style={{ marginTop: "var(--space-md)" }}>
          Add your links in lib/site.ts — one file, every page updates.
        </p>
      )}
    </main>
  );
}

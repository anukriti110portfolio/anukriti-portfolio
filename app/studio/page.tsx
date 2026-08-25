import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { getStudioItems } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Studio — Anukriti Tripathi",
  description: "A visual archive of experiments, process, and explorations.",
};

export default function StudioPage() {
  const items = getStudioItems();

  return (
    <main className="wrap page">
      <SectionHeader id="studio-title" kicker="Archive" title="Studio" />
      <p className={styles.intro}>
        A visual archive — branding experiments, visual studies, process
        recordings, and design explorations. Collected like archival plates,
        not a feed.
      </p>

      {items.length > 0 ? (
        <ul className={styles.wall}>
          {items.map((item, index) => {
            const plateNumber = String(index + 1).padStart(2, "0");
            const hasVideo = Boolean(item.frontmatter.videoUrl);
            const hasExternal = Boolean(item.frontmatter.externalUrl);

            return (
              <li key={item.slug} className={styles.plate}>
                {hasVideo || hasExternal ? (
                  <a
                    href={item.frontmatter.videoUrl ?? item.frontmatter.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PlateImage image={item.frontmatter.image} alt={item.frontmatter.title} />
                  </a>
                ) : (
                  <div className={styles.image} aria-hidden="true">
                    {item.frontmatter.image ? (
                      <Image
                        src={item.frontmatter.image}
                        alt=""
                        fill
                        sizes="(max-width: 48rem) 100vw, (max-width: 76rem) 50vw, 33vw"
                      />
                    ) : null}
                  </div>
                )}
                <span className={styles.caption}>
                  PL.{plateNumber}
                  {item.frontmatter.year ? ` · ${item.frontmatter.year}` : ""}
                  {item.frontmatter.kind ? ` · ${item.frontmatter.kind}` : ""}
                </span>
                <h2 className={styles.title}>{item.frontmatter.title}</h2>
                {item.frontmatter.description ? (
                  <p className={styles.captionNormal}>{item.frontmatter.description}</p>
                ) : null}
                {(hasVideo || hasExternal) && (
                  <div className={styles.linksRow}>
                    {hasVideo ? (
                      <a
                        href={item.frontmatter.videoUrl}
                        className="text-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch
                      </a>
                    ) : null}
                    {hasExternal ? (
                      <a
                        href={item.frontmatter.externalUrl}
                        className="text-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open post
                      </a>
                    ) : null}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={styles.intro}>The archive is being catalogued.</p>
      )}

      <p className={`${styles.intro} ${styles.colophonNote}`}>
        Videos open on their original platforms; nothing is embedded or
        scraped.
      </p>
    </main>
  );

  function PlateImage({ image, alt }: { image?: string; alt: string }) {
    if (!image) {
      return (
        <div className={styles.image} aria-hidden="true">
          <span className={styles.caption}>PL.</span>
        </div>
      );
    }
    return (
      <div className={styles.image}>
        <Image src={image} alt={alt} fill sizes="(max-width: 48rem) 100vw, (max-width: 76rem) 50vw, 33vw" />
      </div>
    );
  }
}

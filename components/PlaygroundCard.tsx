import Link from "next/link";
import Image from "next/image";
import styles from "./PlaygroundCard.module.css";

export type PlaygroundSummary = {
  slug: string;
  title: string;
  category: string;
  date?: string;
  description?: string;
  cover?: string;
};

export default function PlaygroundCard({ item }: { item: PlaygroundSummary }) {
  return (
    <li>
      <Link href={`/playground/${item.slug}`} className={styles.link}>
        <article className={styles.card}>
          <div className={styles.thumb}>
            {item.cover ? (
              <Image
                src={item.cover}
                alt=""
                fill
                sizes="(max-width: 48rem) 100vw, (max-width: 76rem) 50vw, 33vw"
              />
            ) : (
              <span className={styles.plate} aria-hidden="true">
                EXP
              </span>
            )}
          </div>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.meta}>{[item.category, item.date].filter(Boolean).join(" · ")}</p>
        </article>
      </Link>
    </li>
  );
}

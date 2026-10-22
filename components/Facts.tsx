import styles from "./Facts.module.css";

type FactItem = {
  title: string;
  text?: string;
  bullets?: string[];
  images?: { src: string; alt: string }[];
};

type FactsProps = {
  items: FactItem[];
  cols?: number;
};

/** Quiet grid of short titled notes — each can carry a line of text, bullets and images. */
export default function Facts({ items, cols = 3 }: FactsProps) {
  return (
    <div
      className={styles.facts}
      style={{ "--cols": cols } as React.CSSProperties}
    >
      {items.map((item) => (
        <article key={item.title} className={styles.fact}>
          <h3 className={styles.title}>{item.title}</h3>
          {item.images?.length ? (
            <div className={styles.images}>
              {item.images.map((image) => (
                <div key={image.src} className={styles.frame}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </div>
              ))}
            </div>
          ) : null}
          {item.text ? <p className={styles.text}>{item.text}</p> : null}
          {item.bullets?.length ? (
            <ul className={styles.bullets}>
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}
    </div>
  );
}

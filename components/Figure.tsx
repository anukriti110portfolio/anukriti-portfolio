import styles from "./Figure.module.css";

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
};

export default function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className={styles.figure}>
      <img src={src} alt={alt} loading="lazy" />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

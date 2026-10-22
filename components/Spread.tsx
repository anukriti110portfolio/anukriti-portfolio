import styles from "./Spread.module.css";

type SpreadImage = {
  src: string;
  alt: string;
  caption?: string;
};

type SpreadProps = {
  images: SpreadImage[];
  /** Columns on large screens. Default 3. */
  cols?: number;
  /** Tile shape, e.g. "4 / 3". Default "4 / 3". */
  ratio?: string;
  /**
   * contain (default) shows the whole image on a quiet mat — nothing is cropped.
   * cover fills the tile. natural keeps each image's own proportions.
   */
  fit?: "contain" | "cover" | "natural";
};

/** A calm, even grid of images. Images are never cropped unless fit="cover". */
export default function Spread({
  images,
  cols = 3,
  ratio = "4 / 3",
  fit = "contain",
}: SpreadProps) {
  return (
    <div
      className={styles.spread}
      data-fit={fit}
      style={{ "--cols": cols, "--ratio": ratio } as React.CSSProperties}
    >
      {images.map((image) => (
        <figure key={image.src} className={styles.tile}>
          <div className={styles.frame}>
            <img src={image.src} alt={image.alt} loading="lazy" />
          </div>
          {image.caption ? <figcaption>{image.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

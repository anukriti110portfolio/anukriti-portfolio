import Figure from "@/components/Figure";
import styles from "./ImageGallery.module.css";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type ImageGalleryProps = {
  images: GalleryImage[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className={styles.grid}>
      {images.map((image) => (
        <Figure key={image.src} {...image} />
      ))}
    </div>
  );
}

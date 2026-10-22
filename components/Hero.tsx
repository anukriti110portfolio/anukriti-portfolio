import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.text}>
        <p className={styles.kicker}>
          Anukriti Tripathi · Product &amp; Interaction Designer
        </p>
        <h1 id="hero-title" className={styles.title}>
          Pixels, <em>paper</em>, plastic, people.
        </h1>
        <p className={styles.lede}>
          I design across digital and physical products — researching,
          sketching, prototyping, and building work that has to survive contact
          with real people.
        </p>
      </div>
      <div className={styles.portrait}>
        <Image
          src="/images/profile/anukriti.jpg"
          alt="Portrait of Anukriti Tripathi seated against a grey backdrop"
          width={960}
          height={1280}
          sizes="(max-width: 48rem) 80vw, 24rem"
          priority
        />
      </div>
    </section>
  );
}

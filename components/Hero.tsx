import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <p className={styles.kicker}>
        Anukriti Tripathi · Product &amp; Interaction Designer
      </p>
      <h1 id="hero-title" className={styles.title}>
        Pixels, <em>paper</em>, plastic, people.
      </h1>
      <p className={styles.lede}>
        I design across digital and physical products — researching, sketching,
        prototyping, and building work that has to survive contact with real
        people.
      </p>
    </section>
  );
}

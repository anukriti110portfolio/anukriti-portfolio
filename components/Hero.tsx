import Image from "next/image";
import TypingGreeting from "@/components/TypingGreeting";
import styles from "./Hero.module.css";

const GREETING_LINES = [
  { text: "Hi, I am Anukriti" },
  { text: "नमस्ते!", lang: "hi", className: "devanagari" },
];

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.text}>
        <h1
          id="hero-title"
          className={styles.title}
          aria-label="Hi, I am Anukriti. नमस्ते!"
        >
          <TypingGreeting lines={GREETING_LINES} />
        </h1>
        <p className={styles.tagline}>
          I observe, listen, question, understand, and create.
        </p>
        <p className={styles.lede}>
          I design across digital and physical products — researching,
          sketching, prototyping, and building ideas that have to survive
          contact with people.
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

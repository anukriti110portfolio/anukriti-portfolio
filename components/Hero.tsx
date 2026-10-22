import Image from "next/image";
import TypingGreeting from "@/components/TypingGreeting";
import { siteConfig } from "@/lib/site";
import styles from "./Hero.module.css";

const GREETING_LINES = [
  { text: "Hi, I am Anukriti Tripathi" },
  {
    text: `नमस्ते, मैं ${siteConfig.nameDevanagari} हूँ`,
    lang: "hi",
    className: "devanagari",
  },
];

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.text}>
        <p className={styles.kicker}>Product &amp; Interaction Designer</p>
        <h1
          id="hero-title"
          className={styles.title}
          aria-label="Hi, I am Anukriti Tripathi. नमस्ते, मैं अनुकृति त्रिपाठी हूँ"
        >
          <TypingGreeting lines={GREETING_LINES} />
        </h1>
        <p className={styles.lede}>
          I design across digital and physical products — researching,
          sketching, prototyping, and building work that has to survive contact
          with real people.
        </p>
        <p className={styles.about}>
          M.Des student in Electronic Product Design at the Indian Institute of
          Technology Guwahati.
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

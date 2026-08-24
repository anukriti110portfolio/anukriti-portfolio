import Button from "@/components/Button";
import styles from "./ContactCTA.module.css";

export default function ContactCTA() {
  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      <p className={styles.kicker}>Open for conversations</p>
      <h2 id="cta-title" className={styles.title}>
        A project, a question, or just curiosity — all good reasons to write.
      </h2>
      <Button href="/connect">Start a conversation</Button>
    </section>
  );
}

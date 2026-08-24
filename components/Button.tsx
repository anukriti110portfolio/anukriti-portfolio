import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = {
  href: string;
  variant?: "solid" | "outline";
  children: React.ReactNode;
};

export default function Button({ href, variant = "solid", children }: ButtonProps) {
  const variantClass = variant === "solid" ? styles.solid : styles.outline;

  return (
    <Link href={href} className={`${styles.base} ${variantClass}`}>
      {children}
    </Link>
  );
}

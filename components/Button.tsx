import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = {
  href: string;
  variant?: "solid" | "outline";
  children: React.ReactNode;
};

export default function Button({ href, variant = "solid", children }: ButtonProps) {
  const variantClass = variant === "solid" ? styles.solid : styles.outline;
  const className = `${styles.base} ${variantClass}`;
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

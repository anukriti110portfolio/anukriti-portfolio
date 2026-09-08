import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = {
  href: string;
  variant?: "solid" | "outline";
  children: React.ReactNode;
  className?: string;
};

export default function Button({ href, variant = "solid", children, className: extraClassName }: ButtonProps) {
  const variantClass = variant === "solid" ? styles.solid : styles.outline;
  const className = `${styles.base} ${variantClass}${extraClassName ? ` ${extraClassName}` : ""}`;
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

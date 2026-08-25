"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CopyEmail.module.css";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyToClipboard}
      className={`${styles.button} ${copied ? styles.copied : ""}`}
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

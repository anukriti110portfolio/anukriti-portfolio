"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import Button from "@/components/Button";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Case Studies" },
  { href: "/field-notes", label: "Blogs" },
  { href: "/playground", label: "Playground" },
  { href: "/about", label: "My Story" },
  { href: "/connect", label: "Connect" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.wordmark} onClick={closeMenu}>
          <span className={styles.fullName}>{siteConfig.name}</span>
          <span className={styles.initials}>A.&thinsp;T.</span>
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav
          id="site-nav"
          aria-label="Main"
          className={`${styles.nav} ${open ? styles.open : ""}`}
        >
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.link}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className={styles.themeItem}>
              <ThemeSwitcher />
            </li>
            <li className={styles.cvItem}>
              <Button
                href={siteConfig.resumePath || "#"}
                variant="solid"
                className={styles.cvButton}
              >
                My CV
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

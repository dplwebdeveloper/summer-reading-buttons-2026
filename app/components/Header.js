"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  let selectedClass = "";
  if (pathname === "/") {
    selectedClass = styles.buttons;
  } else if (pathname === "/map") {
    selectedClass = styles.map;
  } else if (pathname === "/about") {
    selectedClass = styles.about;
  }

  return (
    <header className={styles.header}>
      <h1>
        <span className={styles.headerIntro}>Summer Reading 2026</span>
        <span>Library Button Exchange</span>
      </h1>
      <nav className={styles.nav}>
        <div className={styles.wrapper}>
          <div
            aria-hidden="true"
            className={`${styles.selectedIndicator} ${selectedClass}`}
          ></div>
          <ul>
            <li className={pathname === "/" ? styles.selected : ""}>
              <Link href="/">Buttons</Link>
            </li>
            <li className={pathname === "/map" ? styles.selected : ""}>
              <Link href="/map">Map</Link>
            </li>
            <li className={pathname === "/about" ? styles.selected : ""}>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

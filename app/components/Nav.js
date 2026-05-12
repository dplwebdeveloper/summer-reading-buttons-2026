import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.header}>
      <h1>
        <span className={styles.headerIntro}>Summer Reading 2026</span>
        <span>Library Button Exchange</span>
      </h1>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">Buttons</Link>
          </li>
          <li>
            <Link href="/map">Map</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

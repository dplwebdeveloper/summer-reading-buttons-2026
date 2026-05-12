import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        This button exchange was organized by the{" "}
        <Link href="https://guildoflibrarymakers.com">
          Guild of Library Makers
        </Link>
        .
      </p>
      <p>
        Website created by the{" "}
        <Link href="https://detroitpubliclibrary.org">
          Detroit Public Library
        </Link>
        .
      </p>
      <p>Check your local library for summer reading fun! 🦖🌺</p>
    </footer>
  );
}

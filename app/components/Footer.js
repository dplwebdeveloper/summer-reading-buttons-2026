import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>This button exchange was organized by the Guild of Library Makers.</p>
      <p>Website created by the Detroit Public Library.</p>
      <p>Check your local library for summer reading fun! 🦖🌺</p>
    </footer>
  );
}

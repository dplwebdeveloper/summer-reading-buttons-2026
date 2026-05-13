import Image from "next/image";
import styles from "./page.module.css";
import dinos from "./assets/hero/dinos.webp";
import ButtonsList from "./components/ButtonsList";

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <div className={styles.rainbow}>
          <Image
            className={styles.dino}
            src={dinos}
            width={875}
            height={404}
            alt="Smiling dinosaurs have received a box of buttons in the mail and are inspecting one!"
          />
        </div>
      </div>
      <ButtonsList />
    </main>
  );
}

import Image from "next/image";
import styles from "./page.module.css";
import dino1 from "./assets/hero/dino-1.png";
import dino2 from "./assets/hero/dino-2.png";
import Link from "next/link";
import ButtonsList from "./components/ButtonsList";

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <div className={styles.rainbow}>
          <Image
            className={styles.dino}
            src={dino1}
            width={400}
            height={400}
            alt="Green dino on a skateboard"
          />
          <Image
            className={styles.dino}
            src={dino2}
            width={400}
            height={400}
            alt="Orange dino on a skateboard"
          />
        </div>
      </div>
      <ButtonsList />
    </main>
  );
}

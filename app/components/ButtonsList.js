"use client";

import Image from "next/image";
import { allButtons } from "../data/libraries";
import styles from "./ButtonsList.module.css";
import { useEffect, useState } from "react";
import { getRandomInt, shuffle } from "../helpers";
import Link from "next/link";
import Refresh from "./icons/Refresh";
import { useButtonsContext } from "./ButtonsProvider";

export default function ButtonsList() {
  const [shuffleKey, setShuffleKey] = useState(0);
  // Shuffled buttons
  const { buttons, setButtons } = useButtonsContext();

  useEffect(() => setShuffleKey(1), []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.actions}>
        <p>Click any button to learn where it came from!</p>
        <button
          className={styles.shuffleBtn}
          onClick={() => {
            setButtons(shuffle(allButtons));
            setShuffleKey(shuffleKey + 1);
          }}
        >
          Shuffle Buttons <Refresh shuffleKey={shuffleKey} />
        </button>
      </div>
      {shuffleKey > 0 && (
        <div className={styles.buttons} key={shuffleKey}>
          {buttons.map((b, i) => (
            <Link
              href={`/${b.libraryId}?btn=${b.index}`}
              key={`${b.libraryId}_${b.index}`}
            >
              <Image
                className={i < 20 ? styles[`delay${getRandomInt(0, 3)}`] : ""}
                src={b?.image.src}
                width={b?.image.width}
                height={b?.image.height}
                blurDataURL={b?.image.blurDataURL}
                alt=""
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

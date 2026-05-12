"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { libraryData } from "@/app/data/libraries";
import { redirect, useParams, useSearchParams } from "next/navigation";
import LocationMap from "./LocationMap";
import { useButtonsContext } from "@/app/components/ButtonsProvider";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Caveat, Special_Elite } from "next/font/google";
import LeftArrow from "@/app/components/icons/LeftArrow";
import RightArrow from "@/app/components/icons/RightArrow";

const caveatFont = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const specialElite = Special_Elite({
  weight: "400",
  variable: "--font-special-elite",
  subsets: ["latin"],
});

export default function LibraryPage() {
  const { libraryId } = useParams();
  const searchParams = useSearchParams();
  const btnParam = searchParams.get("btn"); // button index
  const btn = btnParam === "" || btnParam === null ? "0" : btnParam;
  const btnIndex = Number(btn);
  const { buttons } = useButtonsContext();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(true), []);

  const currentIndex = buttons.findIndex(
    (b) => b.libraryId === libraryId && `${b.index}` === btn,
  );

  const nextIndex = (currentIndex + 1) % buttons.length;
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
  const nextButton = buttons[nextIndex];
  const prevButton = buttons[prevIndex];

  const libraryInfo = libraryData.find((l) => l.id === libraryId);

  if (!libraryInfo) {
    redirect("/");
  }

  return (
    <main
      className={`${styles.main} ${caveatFont.variable} ${specialElite.variable}`}
    >
      <div className={styles.postcard}>
        <h2>
          <span>This Button Came From</span> {libraryInfo.name}
        </h2>
        <div className={styles.content}>
          <div
            className={`${styles.buttons} ${libraryInfo.images.length > 9 ? styles.extraSmall : libraryInfo.images.length > 6 ? styles.small : libraryInfo.images.length > 4 ? styles.medium : ""}`}
          >
            <Image
              src={libraryInfo.images[btnIndex].src}
              width={libraryInfo.images[btnIndex].width}
              height={libraryInfo.images[btnIndex].height}
              blurDataURL={libraryInfo.images[btnIndex].blurDataURL}
              alt=""
            />
            {/* {libraryInfo.images?.map((image, i) => (
              <div key={`btn_${i}`}>
                <Image
                  className={`${i}` === btn ? styles.selected : ""}
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  blurDataURL={image.blurDataURL}
                  alt=""
                />
              </div>
            ))} */}
          </div>
          <div className={styles.info}>
            <h3>{libraryInfo.city}, MI</h3>
            <LocationMap loc={libraryInfo} />
          </div>
        </div>
      </div>
      {/* Wait until mount to load these since they change on refresh */}
      {loaded && (
        <div className={styles.prevAndNext}>
          <Link href={`/${prevButton.libraryId}?btn=${prevButton.index}`}>
            <Image
              src={prevButton.image.src}
              width={prevButton.image.width}
              height={prevButton.image.height}
              blurDataURL={prevButton.image.blurDataURL}
              alt=""
            />
            <span>
              <LeftArrow /> Previous
            </span>
          </Link>
          <Link href={`/${nextButton.libraryId}?btn=${nextButton.index}`}>
            <Image
              src={nextButton.image.src}
              width={nextButton.image.width}
              height={nextButton.image.height}
              blurDataURL={nextButton.image.blurDataURL}
              alt=""
            />
            <span>
              Next <RightArrow />
            </span>
          </Link>
        </div>
      )}
      <div className={styles.all}>
        <Link href="/">All Buttons</Link>
        <Link href="/map">All Participants</Link>
        <Link href="/about">About</Link>
      </div>
    </main>
  );
}

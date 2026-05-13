import Link from "next/link";
import { libraryData } from "../data/libraries";
import { alphaSortOnKey } from "../helpers";
import styles from "./LocationsList.module.css";

const sortedLocations = libraryData.sort(alphaSortOnKey("name"));

export default function LocationsList() {
  return (
    <>
      <ul className={styles.ul}>
        {sortedLocations.map((l, i) => (
          <li key={`${l.id}_${i}`}>
            <Link href={`/${l.id}`}>
              <p>{l.name}</p>
              {/* <p>{l.address}</p> */}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.summerReadingNote}>
        <h3>Not Seeing Your Library on This List?</h3>
        <p>You can still check out your library for summer reading fun! :)</p>
        <p>99%* of U.S. libraries offer some sort of summer reading program.</p>
        <p>
          Take a trip to your local library and see what events and activities
          they have in store for the summer.
        </p>
        <p className={styles.footnote}>
          * According to the 2022 Public Library Association Annual Survey
        </p>
        <em>
          <p>
            Does your library or library-affiliated organization want to join
            next year? Learn more.
          </p>
        </em>
      </div>
      <div className={styles.summerReadingNote}>
        <h3>Not Seeing Your Library on This List?</h3>
        <p>You can still check out your library for summer reading fun! :)</p>
        <p>99%* of U.S. libraries offer some sort of summer reading program.</p>
        <p>
          Take a trip to your local library and see what events and activities
          they have in store for the summer.
        </p>
        <p className={styles.footnote}>
          * According to the 2022 Public Library Association Annual Survey
        </p>
        <em>
          <p>
            Does your library or library-affiliated organization want to join
            next year? Learn more.
          </p>
        </em>
      </div>
    </>
  );
}

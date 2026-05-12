"use client";

import styles from "./page.module.css";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import LocationsList from "@/app/components/LocationsList";

function LocationsMap() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/Map"), {
        loading: () => (
          <div
            style={{
              height: "680px",
              width: "900px",
              borderRadius: "10px",
              border: "1px solid grey",
            }}
          ></div>
        ),
        ssr: false,
      }),
    [],
  );

  return <Map />;
}

export default function MapPage({ params, searchParams }) {
  return (
    <main className={styles.main}>
      <LocationsMap />
      <h2>2026 Participants</h2>
      <LocationsList />
    </main>
  );
}

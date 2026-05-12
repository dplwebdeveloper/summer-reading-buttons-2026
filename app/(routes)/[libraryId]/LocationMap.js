"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function LocationMap({ loc }) {
  const MiniMap = useMemo(
    () =>
      dynamic(() => import("@/app/components/MiniMap"), {
        loading: () => (
          <div
            style={{ height: "300px", width: "280px", borderRadius: "30px" }}
          ></div>
        ),
        ssr: false,
      }),
    [],
  );

  return <MiniMap loc={loc} />;
}

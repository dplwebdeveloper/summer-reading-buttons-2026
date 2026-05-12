"use client";

import "leaflet/dist/leaflet.css";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import styles from "./Map.module.css";
import { libraryData } from "../data/libraries";
import { Nunito } from "next/font/google";

const INITIAL_POSITION = [44.664115457128254, -85.57832625370403];

const voyager = {
  url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

const activeIcon = new L.Icon({
  iconUrl: "pin.svg",
  iconRetinaUrl: "pin.svg",
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
  iconSize: [24, 24],
});

const nunitoFont = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export default function Map() {
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const initialZoomDesktop = 6.8;
  const initialZoomMobile = 6;

  if (typeof window === "undefined") {
    return null;
  }

  const theme = voyager;

  // https://leaflet-extras.github.io/leaflet-providers/preview/
  const TILE_MAP_URL = theme.url;
  const TILE_MAP_ATTR = theme.attr;

  const getOnMarkerClick = (slug) => () => {
    setSelectedLocation(slug);
  };

  return (
    <MapContainer
      center={INITIAL_POSITION}
      zoom={L.Browser.mobile ? initialZoomMobile : initialZoomDesktop}
      maxZoom={18}
      minZoom={6}
      scrollWheelZoom={false}
      maxBounds={[
        [49.6, -94.8],
        [38.8, -76.8],
      ]}
      maxBoundsViscosity={0.8}
      style={{
        height: L.Browser.mobile ? "400px" : "680px",
        width: "900px",
        maxWidth: "100%",
        borderRadius: "10px",
        border: "1px solid #a1631150",
      }}
      dragging={!L.Browser.mobile}
      ref={setMap}
    >
      <TileLayer url={TILE_MAP_URL} attribution={TILE_MAP_ATTR} />
      {map && (
        <>
          {libraryData.map((loc) => {
            return (
              <Marker
                key={`${loc.id}_marker`}
                position={loc.coords}
                icon={activeIcon}
                eventHandlers={{
                  click: getOnMarkerClick(loc.id),
                }}
              >
                <Popup>
                  {loc.id === selectedLocation && (
                    <div className={nunitoFont.className}>
                      <p className={styles.popupTitle}>{loc.name}</p>
                      <div className={styles.leafletContent}>
                        <p>{loc.city}, MI</p>
                      </div>
                    </div>
                  )}
                </Popup>
              </Marker>
            );
          })}
        </>
      )}
    </MapContainer>
  );
}

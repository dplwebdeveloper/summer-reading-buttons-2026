"use client";

import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import styles from "./Map.module.css";
import { Nunito } from "next/font/google";

const INITIAL_POSITION = [44.664115457128254, -85.57832625370403];

const voyager = {
  url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
  attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

const activeIcon = new L.Icon({
  iconUrl: "pin.svg",
  iconRetinaUrl: "pin.svg",
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
  iconSize: [36, 36],
});

const nunitoFont = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export default function MiniMap({ loc }) {
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const zoom = 5.3;

  if (typeof window === "undefined") {
    return null;
  }

  const theme = voyager;
  const TILE_MAP_URL = theme.url;
  const TILE_MAP_ATTR = theme.attr;

  const getOnMarkerClick = (slug) => () => {
    setSelectedLocation(slug);
  };

  return (
    <MapContainer
      center={INITIAL_POSITION}
      zoom={zoom}
      maxZoom={18}
      minZoom={5}
      zoomSnap={0.1}
      scrollWheelZoom={false}
      maxBounds={[
        [49.6, -94.8],
        [38.8, -76.8],
      ]}
      maxBoundsViscosity={0.8}
      style={{
        height: "300px",
        width: "280px",
        borderRadius: "30px",
        // border: "1px solid grey",
      }}
      ref={setMap}
      zoomControl={false}
    >
      <TileLayer url={TILE_MAP_URL} attribution={TILE_MAP_ATTR} />
      {map && (
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
      )}
    </MapContainer>
  );
}

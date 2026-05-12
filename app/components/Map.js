"use client";

// #0088ce

import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import L from "leaflet";
// import { FONT_PREF_OPEN_DYSLEXIC } from "@/app/constants/cookies";
import styles from "./Map.module.css";
import Link from "next/link";
import { libraryData } from "../data/libraries";
import { Nunito } from "next/font/google";

const INITIAL_POSITION = [44.664115457128254, -85.57832625370403];

const voyager = {
  url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

const stamen = {
  url: "https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}{r}.png",
  attr: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

const darkMatter = {
  url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

const light = {
  url: "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
  attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

const dark = {
  url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  attr: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

// var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
// 	minZoom: 0,
// 	maxZoom: 20,
// 	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	ext: 'png'
// });

// var Jawg_Matrix = L.tileLayer(
//   "https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}",
//   {
//     attribution:
//       '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     minZoom: 0,
//     maxZoom: 22,
//     accessToken: "<your accessToken>",
//   }
// );

// var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}', {
//   minZoom: 0,
//   maxZoom: 20,
//   attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//   ext: 'png'
// });

/**
 * var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});
 */

const bright = {
  url: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
  attr: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

const positron = {
  url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

const activeIcon = new L.Icon({
  iconUrl: "pin.svg",
  iconRetinaUrl: "pin.svg",
  iconAnchor: [12, 24],
  // popupAnchor: null,
  // shadowUrl: null,
  // shadowSize: null,
  // shadowAnchor: null,
  popupAnchor: [0, -24],
  iconSize: [24, 24],
});

const nunitoFont = Nunito({
  // weight: '400',
  variable: "--font-nunito",
  subsets: ["latin"],
});

// const inactiveIcon = new L.Icon({
//   iconUrl: "location-inactive.svg",
//   iconRetinaUrl: "location-inactive.svg",
//   iconAnchor: [18, 36],
//   // popupAnchor: null,
//   // shadowUrl: null,
//   // shadowSize: null,
//   // shadowAnchor: null,
//   popupAnchor: [0, -36],
//   iconSize: [36, 36],
// });

// const clearIcon = L.divIcon({
//   className: "leaflet-mouse-marker",
//   iconSize: [0, 0],
// });'

export default function Map() {
  const [map, setMap] = useState(null);
  // const markerRef = useRef(null);
  // const [markerPosition, setMarkerPosition] = useState(INITIAL_POSITION);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const zoom = 6.8;

  if (typeof window === "undefined") {
    return null;
  }

  // Updating theme seems to reset position, skipping for now.
  const theme = voyager;
  // const theme = darkMode ? dark : voyager;

  // https://leaflet-extras.github.io/leaflet-providers/preview/
  const TILE_MAP_URL = theme.url;
  const TILE_MAP_ATTR = theme.attr;

  const getOnMarkerClick = (slug) => () => {
    setSelectedLocation(slug);
  };

  // top left: 47.611625410177496, -90.81325150643274
  // top right: 47.49319646931661, -81.30849899868296
  // bottom left: 40.887859195957745, -91.310423223362
  // bottom right: 40.86574621503593, -80.89906348065801

  return (
    <MapContainer
      center={INITIAL_POSITION}
      zoom={zoom}
      maxZoom={18}
      minZoom={6}
      // zoomSnap={0.1}
      scrollWheelZoom={false}
      maxBounds={[
        [49.6, -94.8],
        [38.8, -76.8],
      ]}
      maxBoundsViscosity={0.8}
      style={{
        height: "680px",
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

                        {/* <Link href={`/locations/${loc.slug}`}>
                            View{" "}
                            {loc.locationType === "branch"
                              ? "branch"
                              : "location"}{" "}
                            →
                          </Link> */}
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

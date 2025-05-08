"use client";
import { mapStyle } from "./mapStyle";
import styles from "./page.module.scss";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState } from "react";
import Heading4 from "@/components/headings/heading4/Heading4";
import Heading1 from "@/components/headings/heading1/Heading1";
import SightingDetail from "@/components/home/sighting_details/SightingDetail";
import MarkerWithInfoWindow from "@/components/map/marker_with_info_window/MarkerWithInfoWindow";

export type SightingPreviewPlaceholder = {
  name: string;
  species: string;
  breed: string;
  imageSource: string;
  lastSpotted: string;
  coordinates: Coordinates;
  id: number;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export default function HomePage() {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const centerPos = {
    lat: 35.962611,
    lng: -90.194861,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  // for opening the sighting detail window

  // TODO:
  // - make api call here to get SightingPreview objects
  const [openDetail, setOpenDetail] = useState(false);

  const sightingPreviewPlaceholder: SightingPreviewPlaceholder[] = [
    {
      name: "Mano",
      species: "cat",
      breed: "tabby",
      imageSource: "images/test_cats/mano.jpg",
      lastSpotted: "spotted 3 hours ago",
      coordinates: {
        lat: 35.962611,
        lng: -90.194861,
      },
      id: 1,
    },
    {
      name: "Name unknown",
      species: "cat",
      breed: "breed unknown",
      imageSource: "images/test_cats/straycat1.jpg",
      lastSpotted: "spotted 5 hours ago",
      coordinates: {
        lat: 35.99,
        lng: -90.3,
      },
      id: 2,
    },
  ];

  return (
    <div className={styles.sighting_details_map_wrapper}>
      <div className={styles.map_container}>
        {isLoaded && (
          <GoogleMap
            options={{
              styles: mapStyle,
              disableDefaultUI: true,
            }}
            mapContainerStyle={containerStyle}
            center={centerPos}
            zoom={17}
          >
            {sightingPreviewPlaceholder.map((preview, index) => (
              <MarkerWithInfoWindow
                key={index}
                previewDetails={preview}
                setOpenDetail={() => setOpenDetail(true)}
              />
            ))}
          </GoogleMap>
        )}
      </div>
      <SightingDetail
        onCloseClick={() => setOpenDetail(false)}
        className={`${styles.sighting_details} ${openDetail && styles.open}`}
      />
    </div>
  );
}

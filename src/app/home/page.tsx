"use client";
import { mapStyle } from "./mapStyle";
import styles from "./page.module.scss";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import SightingDetail from "@/components/home/sighting_details/SightingDetail";
import MarkerWithInfoWindow from "@/components/map/marker_with_info_window/MarkerWithInfoWindow";
import { api } from "../api";
import { Coordinates, SightingPreview } from "@/swagger/swagger";

// testing api
export default function HomePage() {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const centerPos = {
    latitude: 39.95875593972431,
    longitude: -75.19256400832441,
  };

  // TODO:
  // - make api call here to get SightingPreview objects

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const [openDetail, setOpenDetail] = useState(false);
  const [sightings, setSightings] = useState<SightingPreview[]>([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const fetchSightings = async (center: Coordinates) => {
    try {
      const res = await api.sighting.previews(center);
      if (res.ok && Array.isArray(res.data)) {
        setSightings(res.data);
      } else {
        console.error("api error!: ", res.error?.Message);
      }
    } catch (err) {
      console.error("failed to fetch sightings!: ", err);
    }
  };

  const handleMapIdle = () => {
    if (!mapRef.current) return;

    const center = mapRef.current.getCenter();
    if (!center) return;

    const coords: Coordinates = {
      latitude: center.lat(),
      longitude: center.lng(),
    };

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchSightings(coords);
    }, 3000);
  };

  useEffect(() => {
    fetchSightings(centerPos);
  }, []);

  return (
    <div className={styles.sighting_details_map_wrapper}>
      <div className={styles.map_container}>
        {isLoaded && (
          <GoogleMap
            // new for testing api calls
            onLoad={(map: google.maps.Map) => {
              mapRef.current = map;
              map.setCenter({
                lat: centerPos.latitude,
                lng: centerPos.longitude,
              });
            }}
            onIdle={handleMapIdle}
            //
            options={{
              styles: mapStyle,
              disableDefaultUI: true,
            }}
            mapContainerStyle={containerStyle}
            zoom={17}
          >
            {sightings.map((preview, index) => (
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

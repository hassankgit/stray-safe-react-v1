"use client";
import { mapStyle } from "../mapStyle";
import styles from "./page.module.scss";
import { GoogleMap, Libraries, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import MarkerWithInfoWindow from "@/components/map/marker_with_info_window/MarkerWithInfoWindow";
import { api } from "../../api";
import {
  Coordinates,
  SightingDetailDto,
  SightingPreview,
} from "@/swagger/swagger";
import SightingDetailPanel from "@/components/home/sighting_details/SightingDetail";

const libraries: Libraries = ["places"];
export default function MapPage() {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  // TODO: Temporary, switch out for location services or ask for a starting location through search
  const centerPos = {
    latitude: 39.95875593972431,
    longitude: -75.19256400832441,
  };

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const [detailsPanelContent, setDetailsPanelContent] =
    useState<SightingDetailDto>();
  const [openDetail, setOpenDetail] = useState(false);
  const [sightings, setSightings] = useState<SightingPreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const handleGetDetailsPanelContent = async (id: number) => {
    setIsLoading(true);
    const res = await api.sighting.detailById(id);
    if (res.ok) {
      setDetailsPanelContent(res.data);
      setIsLoading(false);
    } else {
      setDetailsPanelContent(undefined);
    }
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
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
    if (!mapRef.current || !isUserInteracting) {
      return;
    }
    const center = mapRef.current.getCenter();
    if (!center) {
      return;
    }
    const coords: Coordinates = {
      latitude: center.lat(),
      longitude: center.lng(),
    };
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchSightings(coords);
      setIsUserInteracting(false);
    }, 1500);
  };

  useEffect(() => {
    fetchSightings(centerPos);
  }, []);

  return (
    <div className={styles.sighting_details_map_wrapper}>
      <div className={styles.map_container}>
        {isLoaded && (
          <GoogleMap
            onLoad={(map: google.maps.Map) => {
              mapRef.current = map;
              map.setCenter({
                lat: centerPos.latitude,
                lng: centerPos.longitude,
              });
              map.addListener("dragstart", () => setIsUserInteracting(true));
              map.addListener("zoom_changed", () => setIsUserInteracting(true));
            }}
            onIdle={handleMapIdle}
            options={{
              styles: mapStyle,
              disableDefaultUI: true,
              clickableIcons: false,
              gestureHandling: "greedy",
              mapTypeControl: false,
            }}
            mapContainerStyle={containerStyle}
            zoom={17}
          >
            {sightings.map(
              (preview, index) =>
                preview.coordinates.latitude &&
                preview.coordinates.longitude && (
                  <MarkerWithInfoWindow
                    handleGetDetailsPanelContent={handleGetDetailsPanelContent}
                    key={index}
                    previewDetails={preview}
                    setOpenDetail={() => setOpenDetail(true)}
                  />
                )
            )}
          </GoogleMap>
        )}
      </div>
      <SightingDetailPanel
        open={openDetail}
        isLoading={isLoading}
        sightingDetails={detailsPanelContent}
        onCloseClick={() => setOpenDetail(false)}
        className={`${styles.sighting_details} ${openDetail && styles.open}`}
      />
    </div>
  );
}

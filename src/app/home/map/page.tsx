"use client";
import { mapStyle } from "../mapStyle";
import styles from "./page.module.scss";
import { GoogleMap } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import MarkerWithInfoWindow from "@/components/map/marker_with_info_window/MarkerWithInfoWindow";
import { api } from "../../api";
import {
  Coordinates,
  SightingDetailDto,
  SightingPreview,
} from "@/swagger/swagger";
import SightingDetailPanel from "@/components/home/sighting_details/SightingDetail";
import { useGoogleMaps } from "../../context/GoogleMapsLoaderContext";
import AddressAutocomplete from "@/components/input/address_autocomplete/AddressAutocomplete";

export default function MapPage() {
  const [centerPos, setCenterPos] = useState<Coordinates>({
    latitude: 39.95875593972431,
    longitude: -75.19256400832441,
  });
  const { isLoaded } = useGoogleMaps();
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const [detailsPanelContent, setDetailsPanelContent] =
    useState<SightingDetailDto>();
  const [openDetail, setOpenDetail] = useState(false);
  const [sightings, setSightings] = useState<SightingPreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [gettingCurrentLocation, setGettingCurrentLocaton] = useState(false);

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
    setGettingCurrentLocaton(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords: Coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setCenterPos(userCoords);
        fetchSightings(userCoords);
        setGettingCurrentLocaton(false);
      },
      (error) => {
        console.log(error.message);
        setCenterPos(centerPos);
        fetchSightings(centerPos);
        setGettingCurrentLocaton(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <div className={styles.sighting_details_map_wrapper}>
      {isLoaded && !openDetail && !gettingCurrentLocation && (
        <div className={styles.map_search_input_wrapper}>
          <AddressAutocomplete
            className={styles.map_search_input}
            onSelect={(address, coords) => {
              setCenterPos({
                latitude: coords.lat,
                longitude: coords.lng,
              });

              if (mapRef.current) {
                mapRef.current.setCenter(coords);
              }

              fetchSightings({
                latitude: coords.lat,
                longitude: coords.lng,
              });
            }}
          />
        </div>
      )}

      <div className={styles.map_container}>
        {isLoaded && !gettingCurrentLocation && (
          <GoogleMap
            onLoad={(map: google.maps.Map) => {
              mapRef.current = map;
              map.setCenter({
                lat: centerPos.latitude!,
                lng: centerPos.longitude!,
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

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

  const [hovered, setHovered] = useState(true);

  // for opening the sighting detail window
  // const [openDetail, setOpenDetail] = useState(true);

  // if hovering over marker, show info window
  // if hovering over info window, show info window
  // if hovering over neither, do not show info window

  const handleMouseEnter = () => {
    setTimeout(() => {
      setHovered(true);
    }, 200);
    // setHovered(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setHovered(false);
    }, 200);
    // setHovered(true);
  };

  return (
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
          <div onMouseLeave={handleMouseLeave}>
            {/* TODO : create markerf + infowindowf component, markerwithinfowindow */}
            <MarkerF
              position={centerPos}
              onMouseOver={handleMouseEnter}
              icon={{
                url: "/images/straysafelogosquare.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              // onClick={() => setOpenDetail(true)} // uncomment when opening sighting detail window
            />
            {hovered && (
              <InfoWindowF
                position={centerPos}
                zIndex={1}
                options={{
                  pixelOffset: new window.google.maps.Size(0, -50),
                  disableAutoPan: true,
                }}
                onCloseClick={() => setHovered(false)}
              >
                <div className={styles.sighting_on_hover}>
                  <div className={styles.sighting_preview}>
                    <div className={styles.sighting_image_wrapper}>
                      <img
                        alt="cat test"
                        className={styles.sighting_image}
                        src="images/mano.jpg"
                      />
                    </div>
                    <div className={styles.sighting_preview_description}>
                      <Heading1 text={"Mano - cat- Tabby"} />
                      <Heading4 text={"spotted 3 hours ago"} />
                    </div>
                  </div>
                </div>
              </InfoWindowF>
            )}
          </div>
        </GoogleMap>
      )}
    </div>
  );
}

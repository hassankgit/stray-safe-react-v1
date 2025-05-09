import { getSpottedTimeAgo } from "@/app/utils/getSpottedTimeAgo";
import styles from "./MarkerWithInfoWindow.module.scss";
import Heading1 from "@/components/headings/heading1/Heading1";
import Heading4 from "@/components/headings/heading4/Heading4";
import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SightingPreview } from "@/swagger/swagger";

type MarkerWithInfoWindowProps = {
  setOpenDetail: () => void;
  handleGetDetailsPanelContent: (id: number) => Promise<void>;
  previewDetails: SightingPreview;
};

export default function MarkerWithInfoWindow(props: MarkerWithInfoWindowProps) {
  const [hovered, setHovered] = useState(false);

  let hoverTimeout: NodeJS.Timeout;

  const handleMouseOver = () => {
    clearTimeout(hoverTimeout);
    setHovered(true);
  };

  const handleMouseOut = () => {
    hoverTimeout = setTimeout(() => {
      setHovered(false);
    }, 200);
  };

  return (
    <>
      <MarkerF
        position={{
          lat: props.previewDetails.coordinates.latitude!,
          lng: props.previewDetails.coordinates.longitude!,
        }}
        icon={{
          url: "/images/straysafelogored.png",
          scaledSize: new window.google.maps.Size(35, 48),
        }}
        animation={hovered ? window.google.maps.Animation.BOUNCE : undefined}
        onClick={() => {
          props.setOpenDetail();
          props.handleGetDetailsPanelContent(
            props.previewDetails.sightingDetailId ?? -1
          );
        }}
        // onClick, send ID to backend GET Sighting/Detail/{id}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <AnimatePresence>
        {hovered && (
          <InfoWindowF
            position={{
              lat: props.previewDetails.coordinates.latitude!,
              lng: props.previewDetails.coordinates.longitude!,
            }}
            zIndex={1}
            options={{
              pixelOffset: new window.google.maps.Size(0, -70),
              disableAutoPan: true,
            }}
            onCloseClick={() => setHovered(false)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={handleMouseOver}
              onMouseLeave={handleMouseOut}
              className={styles.sighting_on_hover}
            >
              <div
                className={styles.sighting_on_hover}
                onMouseEnter={handleMouseOver}
                onMouseLeave={handleMouseOut}
              >
                <div className={styles.sighting_preview}>
                  <div className={styles.sighting_image_wrapper}>
                    {props.previewDetails.imageUrl && (
                      <img
                        alt="cat test"
                        className={styles.sighting_image}
                        src={props.previewDetails.imageUrl}
                      />
                    )}
                  </div>
                  <div className={styles.sighting_preview_description}>
                    <Heading1
                      text={`${props.previewDetails.name ?? "name unknown"}`}
                    />
                    <Heading1
                      text={`${
                        props.previewDetails.species ?? "species unknown"
                      } - ${props.previewDetails.breed ?? "breed unknown"}`}
                    />
                    <Heading4
                      text={
                        props.previewDetails.lastSpotted
                          ? getSpottedTimeAgo(props.previewDetails.lastSpotted)
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </InfoWindowF>
        )}
      </AnimatePresence>
    </>
  );
}

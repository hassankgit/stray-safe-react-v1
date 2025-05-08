import { SightingPreviewPlaceholder } from "@/app/home/page";
import styles from "./MarkerWithInfoWindow.module.scss";
import Heading1 from "@/components/headings/heading1/Heading1";
import Heading4 from "@/components/headings/heading4/Heading4";
import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type MarkerWithInfoWindowProps = {
  setOpenDetail: () => void;
  previewDetails: SightingPreviewPlaceholder;
};

export default function MarkerWithInfoWindow(props: MarkerWithInfoWindowProps) {
  const [hovered, setHovered] = useState(false);

  let hoverTimeout: NodeJS.Timeout;

  const handleMouseOver = () => {
    clearTimeout(hoverTimeout);
    setHovered(true);
    console.log("hovered: true");
  };

  const handleMouseOut = () => {
    // Add small delay so it doesn't flicker if user moves between marker and info window
    hoverTimeout = setTimeout(() => {
      setHovered(false);
      console.log("hovered: false");
    }, 200);
  };

  return (
    <>
      <MarkerF
        position={{
          lat: props.previewDetails.coordinates.lat,
          lng: props.previewDetails.coordinates.lng,
        }}
        icon={{
          url: "/images/markerdarkoutline.png",
          scaledSize: new window.google.maps.Size(40, 40),
        }}
        animation={hovered ? window.google.maps.Animation.BOUNCE : undefined}
        onClick={props.setOpenDetail}
        // onClick, send ID to backend GET Sighting/Detail/{id}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <AnimatePresence>
        {hovered && (
          <InfoWindowF
            position={{
              lat: props.previewDetails.coordinates.lat,
              lng: props.previewDetails.coordinates.lng,
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
                    <img
                      alt="cat test"
                      className={styles.sighting_image}
                      src={props.previewDetails.imageSource}
                    />
                  </div>
                  <div className={styles.sighting_preview_description}>
                    <Heading1
                      text={`${props.previewDetails.name} - ${props.previewDetails.species} - ${props.previewDetails.breed}`}
                    />
                    <Heading4 text={props.previewDetails.lastSpotted} />
                  </div>
                </div>
              </div>
            </motion.div>
          </InfoWindowF>
        )}
      </AnimatePresence>
    </>
  );

  //   return (
  //     <div onMouseLeave={handleMouseLeave}>
  //       {/* TODO : create markerf + infowindowf component, markerwithinfowindow */}
  //       <MarkerF
  //         position={{
  //           lat: props.previewDetails.coordinates.lat,
  //           lng: props.previewDetails.coordinates.lng,
  //         }}
  //         onMouseOver={handleMouseEnter}
  //         icon={{
  //           url: "/images/straysafelogosquare.png",
  //           scaledSize: new window.google.maps.Size(40, 40),
  //         }}
  //         onClick={props.setOpenDetail}
  //       />
  //       {hovered && (
  //         <InfoWindowF
  //           position={{
  //             lat: props.previewDetails.coordinates.lat,
  //             lng: props.previewDetails.coordinates.lng,
  //           }}
  //           zIndex={1}
  //           options={{
  //             pixelOffset: new window.google.maps.Size(0, -50),
  //             disableAutoPan: true,
  //           }}
  //           onCloseClick={() => setHovered(false)}
  //         >
  //           <div className={styles.sighting_on_hover}>
  //             <div className={styles.sighting_preview}>
  //               <div className={styles.sighting_image_wrapper}>
  //                 <img
  //                   alt="cat test"
  //                   className={styles.sighting_image}
  //                   src="images/mano.jpg"
  //                 />
  //               </div>
  //               <div className={styles.sighting_preview_description}>
  //                 <Heading1
  //                   text={`${props.previewDetails.name} - ${props.previewDetails.species} - ${props.previewDetails.breed}`}
  //                 />
  //                 <Heading4 text={props.previewDetails.lastSpotted} />
  //               </div>
  //             </div>
  //           </div>
  //         </InfoWindowF>
  //       )}
  //     </div>
  //   );
}

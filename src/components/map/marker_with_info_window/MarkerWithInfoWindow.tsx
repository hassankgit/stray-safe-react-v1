"use client";

import { OverlayViewF } from "@react-google-maps/api";
import styles from "./MarkerWithInfoWindow.module.scss";
import { SightingPreview } from "@/swagger/swagger";

type MarkerWithInfoWindowProps = {
  setOpenDetail: () => void;
  handleGetDetailsPanelContent: (id: number) => Promise<void>;
  previewDetails: SightingPreview;
};

export default function MarkerWithInfoWindow(props: MarkerWithInfoWindowProps) {
  const lat = props.previewDetails.coordinates.latitude!;
  const lng = props.previewDetails.coordinates.longitude!;

  return (
    <OverlayViewF
      position={{ lat: lat, lng: lng }}
      mapPaneName="overlayMouseTarget"
    >
      <div
        className={styles.marker_wrapper}
        onClick={() => {
          props.setOpenDetail();
          if (props.previewDetails.sightingDetailId != null) {
            props.handleGetDetailsPanelContent(
              props.previewDetails.sightingDetailId
            );
          }
        }}
      >
        <img
          src={props.previewDetails.imageUrl ?? ""}
          alt="animal"
          className={styles.image}
        />
        <img
          src="/images/markerframewithstroke.png"
          alt="marker frame"
          className={styles.frame}
        />
      </div>
    </OverlayViewF>
  );
}

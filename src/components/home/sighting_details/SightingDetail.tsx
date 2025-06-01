import { FaDog, FaMapMarkerAlt } from "react-icons/fa";
import styles from "./SightingDetail.module.scss";
import Heading1 from "@/components/headings/heading1/Heading1";
import Heading4 from "@/components/headings/heading4/Heading4";
import Tag from "@/components/tag/Tag";
import InformationItem from "@/components/information/item/InformationItem";
import TextArea from "@/components/input/custom_input/TextArea";
import { SightingDetailDto } from "@/swagger/swagger";
import { getSpottedTimeAgo } from "@/app/utils/getSpottedTimeAgo";

type SightingDetailProps = {
  className: string;
  onCloseClick: () => void;
  sightingDetails?: SightingDetailDto;
  isLoading?: boolean;
  open?: boolean;
};

// TODO move elsewhere
const tagColors: { [key: string]: string } = {
  "still roaming": "yellow",
  friendly: "green",
  healthy: "green",
  female: "pink",
  male: "blue",
  default: "gray",
};

export default function SightingDetailPanel(props: SightingDetailProps) {
  return (
    <div
      className={`${styles.sighting_details} ${props.open && styles.open}`}
      onClick={props.onCloseClick}
    >
      {props.isLoading ? (
        <FaDog className={styles.loader} />
      ) : (
        <>
          <div className={styles.sighting_detail}>
            <div className={styles.image_wrapper}>
              {props.sightingDetails?.imageUrl && (
                <img
                  alt="animal image"
                  className={styles.image}
                  src={props.sightingDetails?.imageUrl}
                />
              )}
            </div>
            <div className={styles.information}>
              <div className={styles.heading}>
                <div className={styles.title}>
                  <Heading1
                    text={props.sightingDetails?.name ?? "Unknown name"}
                  />
                  <Heading1
                    className={styles.subheading}
                    text={`${
                      props.sightingDetails?.species ?? "Unknown species"
                    } - ${props.sightingDetails?.breed ?? "Unknown breed"}`}
                  />
                </div>
                <Heading4
                  text={
                    props.sightingDetails?.lastSpotted
                      ? getSpottedTimeAgo(props.sightingDetails?.lastSpotted)
                      : "spotted an unknown time ago"
                  }
                />
                <div className={styles.location_wrapper}>
                  <FaMapMarkerAlt className={styles.location_icon} />
                  <Heading4
                    text={props.sightingDetails?.location ?? "Unknown location"}
                  />
                </div>
              </div>
              <div className={styles.tag_section}>
                <Heading4 text="This animal is..." />

                <div className={styles.tag_wrapper}>
                  {props.sightingDetails?.tags &&
                    props.sightingDetails?.tags.map((text, index) => (
                      <Tag key={index} text={text} color={tagColors[text]} />
                    ))}
                </div>
              </div>
              <div className={styles.information_table}>
                <Heading4 text="Information:" />
                <div className={styles.information_wrapper}>
                  <InformationItem
                    label="Species"
                    tagLabel={props.sightingDetails?.species ?? "Unknown"}
                  />
                  <InformationItem
                    label="Breed"
                    tagLabel={props.sightingDetails?.breed ?? "Unknown"}
                  />
                  <InformationItem
                    label="Age"
                    tagLabel={props.sightingDetails?.age ?? "Unknown"}
                  />
                  <InformationItem
                    label="Sex"
                    tagLabel={props.sightingDetails?.sex ?? "Unknown"}
                    tagColor={tagColors[props.sightingDetails?.sex ?? "gray"]}
                  />
                </div>
              </div>
              <TextArea
                label={`Notes from ${
                  props.sightingDetails?.submittedByName ?? "Unknown user"
                }: `}
                className={styles.notes}
                text={props.sightingDetails?.notes ?? ""}
              />
              <Heading4
                text={`Sighted by ${
                  props.sightingDetails?.submittedByName ?? "Unknown user"
                }`}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

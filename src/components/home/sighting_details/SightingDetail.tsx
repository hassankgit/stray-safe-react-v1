import { FaDog, FaMapMarkerAlt } from "react-icons/fa";
import styles from "./SightingDetail.module.scss";
import Heading1 from "@/components/headings/heading1/Heading1";
import Heading4 from "@/components/headings/heading4/Heading4";
import Tag from "@/components/tag/Tag";
import InformationItem from "@/components/information/item/InformationItem";
import TextArea from "@/components/input/custom_input/TextArea";
import ButtonPrimary from "@/components/input/button_primary/ButtonPrimary";
import { IoClose } from "react-icons/io5";
import { SightingDetailDto } from "@/swagger/swagger";
import { getSpottedTimeAgo } from "@/app/utils/getSpottedTimeAgo";

type SightingDetailProps = {
  className: string;
  onCloseClick: () => void;
  sightingDetails?: SightingDetailDto;
  isLoading?: boolean;
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
    <div className={props.className}>
      {props.isLoading ? (
        <FaDog className={styles.loader} />
      ) : (
        <>
          <div className={styles.sighting_detail}>
            <IoClose
              className={styles.close_button}
              onClick={props.onCloseClick}
            />
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
                <Heading4 text={"this animal is..."} />

                <div className={styles.tag_wrapper}>
                  {props.sightingDetails?.tags &&
                    props.sightingDetails?.tags.map((text, index) => (
                      <Tag key={index} text={text} color={tagColors[text]} />
                    ))}
                </div>
              </div>
              <div className={styles.information_table}>
                <Heading4 text="information:" />
                <div className={styles.information_wrapper}>
                  <InformationItem
                    label="species"
                    tagLabel={
                      props.sightingDetails?.species ?? "unknown species"
                    }
                  />
                  <InformationItem
                    label="breed"
                    tagLabel={props.sightingDetails?.breed ?? "unknown"}
                  />
                  <InformationItem
                    label="age"
                    tagLabel={props.sightingDetails?.age ?? "unknown"}
                  />
                  <InformationItem
                    label="sex"
                    tagLabel={props.sightingDetails?.sex ?? "unknown"}
                    tagColor={tagColors[props.sightingDetails?.sex ?? "gray"]}
                  />
                </div>
              </div>
              <TextArea
                label={`notes from ${
                  props.sightingDetails?.submittedByName ?? "unknown user"
                }: `}
                className={styles.notes}
                text={props.sightingDetails?.notes ?? ""}
              />
              <Heading4
                text={`sighted by ${
                  props.sightingDetails?.submittedByName ?? "unknown user"
                }: `}
              />
              <ButtonPrimary type="submit" label="contact sighter" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

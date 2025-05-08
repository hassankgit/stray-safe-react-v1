import { FaMapMarkerAlt } from "react-icons/fa";
import styles from "./SightingDetail.module.scss";
import Heading1 from "@/components/headings/heading1/Heading1";
import Heading4 from "@/components/headings/heading4/Heading4";
import Tag from "@/components/tag/Tag";
import InformationItem from "@/components/information/item/InformationItem";
import TextArea from "@/components/input/custom_input/TextArea";
import ButtonPrimary from "@/components/input/button_primary/ButtonPrimary";

type SightingDetailProps = {
  className: string;
};

const sightingDetails = {
  name: "Mano",
  species: "cat",
  breed: "tabby",
  age: "6-12 months",
  sex: "female",
  whenSpotted: "spotted april 16, 5:55 pm",
  location: "100 E Penn Square, Philadelphia, PA, 19104",
  tags: ["still roaming", "friendly", "healthy"],
  notes:
    "friendly neighborhood cat mano that runs up and down the block this manos block be sure to feedher when u run by ykwis ong magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamcolaboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velitesse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpaqui officia deserunt mollit anim id est laborum.",
  sightedBy: "straysafeuser1",
};

// TODO move elsewhere
const tagColors: { [key: string]: string } = {
  "still roaming": "yellow",
  friendly: "green",
  healthy: "green",
  female: "pink",
  male: "blue",
};

export default function SightingDetail(props: SightingDetailProps) {
  return (
    <div className={props.className}>
      <div className={styles.sighting_detail}>
        <img className={styles.image} src="images/mano.jpg" />
        <div className={styles.information}>
          <div className={styles.heading}>
            <div className={styles.title}>
              <Heading1 text={sightingDetails.name} />
              <Heading1
                text={`${sightingDetails.species} - ${sightingDetails.breed}`}
              />
            </div>
            <Heading4 text={sightingDetails.whenSpotted} />
            <div className={styles.location_wrapper}>
              <FaMapMarkerAlt className={styles.location_icon} />
              <Heading4 text={sightingDetails.location} />
            </div>
          </div>
          <div className={styles.tag_section}>
            <Heading4 text={"this animal is..."} />

            <div className={styles.tag_wrapper}>
              {sightingDetails.tags.map((text, index) => (
                <Tag key={index} text={text} color={tagColors[text]} />
              ))}
            </div>
          </div>
          <div className={styles.information_table}>
            <Heading4 text="information:" />
            <div className={styles.information_wrapper}>
              <InformationItem
                label="species"
                tagLabel={sightingDetails.species}
              />
              <InformationItem label="breed" tagLabel={sightingDetails.breed} />
              <InformationItem label="age" tagLabel={sightingDetails.age} />
              <InformationItem
                label="sex"
                tagLabel={sightingDetails.sex}
                tagColor={tagColors[sightingDetails.sex]}
              />
            </div>
          </div>
          <TextArea
            label={`notes from ${sightingDetails.sightedBy}: `}
            className={styles.notes}
            text={sightingDetails.notes}
          />
          <Heading4 text={`sighted by ${sightingDetails.sightedBy}: `} />
          <ButtonPrimary type="submit" label="contact sighter" />
        </div>
      </div>
    </div>
  );
}

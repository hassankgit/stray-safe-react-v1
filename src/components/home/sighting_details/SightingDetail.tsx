import { FaMapMarkerAlt } from "react-icons/fa";
import styles from "./SightingDetail.module.scss";
import Heading1 from "@/components/headings/heading1/Heading1";
import Heading4 from "@/components/headings/heading4/Heading4";
import Tag from "@/components/tag/Tag";
import InformationItem from "@/components/information/item/InformationItem";
import TextArea from "@/components/input/custom_input/TextArea";

type SightingDetailProps = {
  className: string;
};

export default function SightingDetail(props: SightingDetailProps) {
  return (
    <div className={props.className}>
      <div className={styles.sighting_detail}>
        <img className={styles.image} src="images/mano.jpg" />
        <div className={styles.information}>
          <div className={styles.heading}>
            <div className={styles.title}>
              <Heading1 text={"Mano"} />
              <Heading1 text={"cat - tabby"} />
            </div>
            <Heading4 text={"spotted april 16, 5:55 pm"} />
            <div className={styles.location_wrapper}>
              <FaMapMarkerAlt className={styles.location_icon} />
              <Heading4
                text={"around 100 E Penn Square, Philadelphia, PA, 19104"}
              />
            </div>
          </div>
          <div className={styles.tag_section}>
            <Heading4 text={"this animal is..."} />
            <div className={styles.tag_wrapper}>
              <Tag text="still roaming" color="yellow" />
              <Tag text="friendly" color="green" />
              <Tag text="healthy" color="green" />
            </div>
          </div>
          <div className={styles.information_table}>
            <Heading4 text="information:" />
            <div className={styles.information_wrapper}>
              <InformationItem label="species" tagLabel="cat" />
              <InformationItem label="breed" tagLabel="tabby" />
              <InformationItem label="age" tagLabel="6-12 months" />
              <InformationItem label="sex" tagLabel="female" tagColor="pink" />
            </div>
          </div>
          <TextArea
            className={styles.notes}
            text="friendly neighborhood cat mano that runs up and down the block this mano’s block be sure to feed her when u run by ykwis ong magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          />
        </div>
      </div>
    </div>
  );
}

import Heading4 from "@/components/headings/heading4/Heading4";
import styles from "./InformationItem.module.scss";
import Tag from "@/components/tag/Tag";

type InformationItemProps = {
  label: string;
  tagLabel: string;
  tagColor?: string;
};
export default function InformationItem(props: InformationItemProps) {
  return (
    <div className={styles.information_item}>
      <Heading4 text={props.label} />
      <Tag text={props.tagLabel} color={props.tagColor} />
    </div>
  );
}

import Heading4 from "@/components/headings/heading4/Heading4";
import styles from "./TextArea.module.scss";

type TextAreaProps = {
  className?: string;
  label?: string;
  sublabel?: string;
  text: string;
};

export default function TextArea(props: TextAreaProps) {
  return (
    <div className={styles.text_area_wrapper}>
      {props.label && <Heading4 text={props.label} />}
      <p className={`${styles.text_area} ${props.className}`}>{props.text}</p>
      {props.sublabel && (
        <p className={styles.text_area_sublabel}>{props.sublabel}</p>
      )}
    </div>
  );
}

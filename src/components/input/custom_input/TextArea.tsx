import styles from "./TextArea.module.scss";

type TextAreaProps = {
  className?: string;
  text: string;
};

export default function TextArea(props: TextAreaProps) {
  return (
    <p className={`${styles.text_area} ${props.className}`}>{props.text}</p>
  );
}

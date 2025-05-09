import styles from "./Tag.module.scss";

type TagProps = {
  text: string;
  color?: string;
};

export default function Tag(props: TagProps) {
  let tagColor = props.color;
  if (!tagColor) {
    tagColor = "none";
  }

  return (
    <div className={`${styles.tag_wrapper} ${styles[tagColor]}`}>
      <p>{props.text}</p>
    </div>
  );
}

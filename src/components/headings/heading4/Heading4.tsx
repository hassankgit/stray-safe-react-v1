import styles from "./Heading4.module.scss";

type Heading4Props = {
  text: string;
  className?: string;
};

export default function Heading4(props: Heading4Props) {
  return (
    <h4 className={`${styles.default} ${props.className}`}>{props.text}</h4>
  );
}

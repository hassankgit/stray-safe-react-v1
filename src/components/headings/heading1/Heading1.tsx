import styles from "./Heading1.module.scss";

type Heading1Props = {
  text: string;
  className?: string;
};

export default function Heading1(props: Heading1Props) {
  return <h1 className={styles.default}>{props.text}</h1>;
}

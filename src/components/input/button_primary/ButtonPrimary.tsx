import styles from "./ButtonPrimary.module.scss";

type ButtonPrimaryProps = {
  label: string;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  disabled?: boolean;
};

export default function ButtonPrimary(props: ButtonPrimaryProps) {
  return (
    <button
      type={props.type}
      className={`${styles.primary}`}
      disabled={props.disabled}
    >
      <p className={styles.primary_label}>{props.label}</p>
    </button>
  );
}

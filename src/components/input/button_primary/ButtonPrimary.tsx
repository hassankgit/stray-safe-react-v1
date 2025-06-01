import styles from "./ButtonPrimary.module.scss";

type ButtonPrimaryProps = {
  label: string;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function ButtonPrimary(props: ButtonPrimaryProps) {
  return (
    <button
      type={props.type}
      className={`${styles.primary} ${props.className}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <p className={styles.primary_label}>{props.label}</p>
    </button>
  );
}

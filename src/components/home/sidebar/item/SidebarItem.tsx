import styles from "./SidebarItem.module.scss";
import { IconType } from "react-icons";

type SidebarItemProps = {
  icon: IconType;
  label: string;
  isOpen: boolean;
};

export default function SidebarItem({
  icon: Icon,
  label,
  isOpen,
}: SidebarItemProps) {
  return (
    <div className={styles.sidebar_item}>
      <Icon className={styles.sidebar_item_icon} />
      <span
        className={`${styles.sidebar_item_label} ${
          isOpen ? styles.visible : styles.hidden
        }`}
      >
        {label}
      </span>
    </div>
  );
}

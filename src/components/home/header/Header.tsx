import styles from "./Header.module.scss";
import { HiOutlineMenuAlt2, HiUserCircle } from "react-icons/hi";

type HeaderProps = {
  toggleSidebar: () => void;
};

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.left_wrapper}>
        <HiOutlineMenuAlt2
          className={styles.header_button}
          onClick={toggleSidebar}
        />
        <div className={styles.title_logo_wrapper}>
          <img
            src="/images/straysafelogored.png"
            alt="straysafe logo"
            className={styles.logo}
          />
          <p className={styles.title}>straysafe</p>
        </div>
      </div>
      <HiUserCircle className={styles.header_button} />
    </div>
  );
}

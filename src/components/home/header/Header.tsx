import styles from "./Header.module.scss";
import { LuLogOut } from "react-icons/lu";
import { handleSignOut } from "@/app/api";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.left_wrapper}>
        <div className={styles.title_logo_wrapper}>
          <img
            src="/images/straysafelogored.png"
            alt="straysafe logo"
            className={styles.logo}
          />
          <p className={styles.title}>straysafe</p>
        </div>
      </div>
      <div className={styles.header_button_wrapper}>
        <LuLogOut onClick={handleSignOut} className={styles.header_button} />
      </div>
    </div>
  );
}

import { Dialog } from "@base-ui-components/react";
import styles from "./Header.module.scss";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Heading1 from "@/components/headings/heading1/Heading1";
import Heading4 from "@/components/headings/heading4/Heading4";
import { LuLogOut } from "react-icons/lu";

type HeaderProps = {
  toggleSidebar?: () => void;
};

const handleSignOut = () => {
  localStorage.clear();
  window.location.href = "/";
};

export default function Header({ toggleSidebar }: HeaderProps) {
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
      <LuLogOut onClick={handleSignOut} className={styles.header_button} />
    </div>
  );
}

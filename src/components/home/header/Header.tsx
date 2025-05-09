import { Dialog } from "@base-ui-components/react";
import styles from "./Header.module.scss";
import { HiOutlineMenuAlt2, HiUserCircle } from "react-icons/hi";
import Heading1 from "@/components/headings/heading1/Heading1";
import Heading4 from "@/components/headings/heading4/Heading4";

type HeaderProps = {
  toggleSidebar: () => void;
};

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.left_wrapper}>
        {/* this is temporary while sidebar is disabled, will be removed later */}
        <Dialog.Root>
          <Dialog.Trigger className={styles.header_button_wrapper}>
            <HiOutlineMenuAlt2
              className={styles.header_button}
              onClick={toggleSidebar}
            />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className={styles.Backdrop} />
            <Dialog.Popup className={styles.Popup}>
              <Heading1 text={"oops!"} />
              <Heading4
                text={
                  "sidebar is currently disabled while i'm fixing some bugs with submitting sightings D: check back soon!"
                }
              />

              <div className={styles.Actions}>
                <Dialog.Close className={styles.Button}>close</Dialog.Close>
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
        {/* end of temporary */}

        {/* 
        <HiOutlineMenuAlt2
          className={styles.header_button}
          onClick={toggleSidebar}
        /> */}
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

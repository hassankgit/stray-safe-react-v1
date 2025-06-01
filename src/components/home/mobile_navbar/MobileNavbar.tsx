"use client";

import {
  Camera,
  GlobalSearch,
  Messages3,
  ProfileCircle,
  Warning2,
} from "iconsax-reactjs";
import styles from "./MobileNavbar.module.scss";
import DisabledFeatureDialog from "@/components/disabled_feature_dialog/DisabledFeatureDialog";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function MobileNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isTabActive = (tab: string) => {
    return pathname == tab ? styles.active : "";
  };

  return (
    <div className={styles.navbar_wrapper}>
      <div className={styles.navbar_tabs}>
        <DisabledFeatureDialog>
          <div
            className={`${styles.navbar_button_wrapper} ${isTabActive(
              "/home/reports"
            )}`}
          >
            <Warning2 className={styles.button} />
            <p className={styles.label}>Reports</p>
          </div>
        </DisabledFeatureDialog>
        <div
          className={`${styles.navbar_button_wrapper} ${isTabActive(
            "/home/upload"
          )}`}
          onClick={() => {
            router.push("/home/upload");
          }}
        >
          <Camera className={styles.button} />
          <p className={styles.label}>Upload</p>
        </div>
        <div
          className={`${styles.navbar_button_wrapper} ${isTabActive(
            "/home/map"
          )}`}
          onClick={() => {
            router.push("/home/map");
          }}
        >
          <GlobalSearch className={styles.button} />
          <p className={styles.label}>Map</p>
        </div>
        <DisabledFeatureDialog>
          <div
            className={`${styles.navbar_button_wrapper} ${isTabActive(
              "/home/messages"
            )}`}
          >
            <Messages3 className={styles.button} />
            <p className={styles.label}>Messages</p>
          </div>
        </DisabledFeatureDialog>
        <DisabledFeatureDialog>
          <div
            className={`${styles.navbar_button_wrapper} ${isTabActive(
              "/home/profile"
            )}`}
            // TODO: Uncomment this when profile page is done
            // onClick={() => {
            //   router.push("/home/profile");
            // }}
          >
            <ProfileCircle className={styles.button} />
            <p className={styles.label}>Profile</p>
          </div>
        </DisabledFeatureDialog>
      </div>
    </div>
  );
}

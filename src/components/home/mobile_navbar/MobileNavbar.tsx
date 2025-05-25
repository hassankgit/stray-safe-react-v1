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
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function MobileNavbar() {
  const isTabActive = (tab: string) => {
    const pathname = usePathname();
    return pathname == tab ? styles.active : "";
  };

  return (
    <div className={styles.navbar_wrapper}>
      <div className={styles.navbar_tabs}>
        <DisabledFeatureDialog>
          <div
            className={`${styles.navbar_button_wrapper} ${isTabActive(
              "/reports"
            )}`}
          >
            <Warning2 className={styles.button} />
            <p className={styles.label}>Reports</p>
          </div>
        </DisabledFeatureDialog>
        <DisabledFeatureDialog>
          <div
            className={`${styles.navbar_button_wrapper} ${isTabActive(
              "/upload"
            )}`}
          >
            <Camera className={styles.button} />
            <p className={styles.label}>Upload</p>
          </div>
        </DisabledFeatureDialog>
        <div
          className={`${styles.navbar_button_wrapper} ${isTabActive("/home")}`}
          onClick={() => {
            window.location.href = "/home";
          }}
        >
          <GlobalSearch className={styles.button} />
          <p className={styles.label}>Map</p>
        </div>
        <DisabledFeatureDialog>
          <div
            className={`${styles.navbar_button_wrapper} ${isTabActive(
              "/messages"
            )}`}
          >
            <Messages3 className={styles.button} />
            <p className={styles.label}>Messages</p>
          </div>
        </DisabledFeatureDialog>
        <DisabledFeatureDialog>
          <div
            className={`${styles.navbar_button_wrapper} ${isTabActive(
              "/profile"
            )}`}
          >
            <ProfileCircle className={styles.button} />
            <p className={styles.label}>Profile</p>
          </div>
        </DisabledFeatureDialog>
      </div>
    </div>
  );
}

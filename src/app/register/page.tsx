"use client";
import { hideLogin } from "../utils/utils";
import styles from "./page.module.scss";
import Register from "@/components/register/Register";

export default function RegisterForm() {
  return (
    <div className={styles.app_wrapper}>
      <div className={styles.app_body}>
        <div className={styles.body}>
          <p className={styles.heading}>Let&apos;s get you started</p>
          {hideLogin ? (
            <p style={{ margin: "20px", fontSize: "16px" }}> coming soon! </p>
          ) : (
            <Register />
          )}
        </div>
        <div className={styles.trees_wrapper}>
          <img
            alt="bottom register banner"
            src="/images/loginbannerwidebottomhalf.png"
            className={styles.trees}
          />
        </div>
      </div>
    </div>
  );
}

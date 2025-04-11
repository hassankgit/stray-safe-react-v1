"use client";
import styles from "./page.module.scss";
import Register from "@/components/register/Register";

const deployed = true;

export default function RegisterForm() {
  return (
    <div className={styles.app_wrapper}>
      <div className={styles.app_body}>
        <div className={styles.app_banner_top_wrapper}>
          <h1>let&apos;s get you started</h1>
          {deployed ? (
            <Register />
          ) : (
            <p style={{ margin: "20px", fontSize: "16px" }}> coming soon! </p>
          )}
        </div>
        <div className={styles.app_banner_bottom_wrapper}>
          <img
            src="/images/loginbannerwidebottomhalf.png"
            className={styles.app_banner_bottom}
          />
        </div>
      </div>
    </div>
  );
}

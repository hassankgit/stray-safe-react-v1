"use client";
import styles from "./page.module.scss";
import Login from "../components/login/Login";
import { hideLogin } from "./utils/utils";

export default function Home() {
  return (
    <div className={styles.app_wrapper}>
      <div className={styles.app_body}>
        <div className={styles.body}>
          <div className={styles.heading}>
            <div className={styles.title_and_logo}>
              <img
                src="/images/straysafelogo.png"
                alt="straysafe logo"
                className={styles.logo}
              />
              <img
                src="/images/straysafetext.png"
                alt="stray safe text"
                className={styles.title}
              />
            </div>
            <p className={styles.subheading}>
              Report a stray, or find a lost pet
            </p>
          </div>
          {hideLogin ? (
            <p style={{ margin: "20px", fontSize: "16px" }}> coming soon! </p>
          ) : (
            <Login />
          )}
        </div>
        <div className={styles.trees_wrapper}>
          <img
            alt="bottom login banner"
            src="/images/loginbannerwidebottomhalf.png"
            className={styles.trees}
          />
        </div>
      </div>
    </div>
  );
}

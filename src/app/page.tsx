// TODO: add types to the endpoints
"use client";
import styles from "./page.module.scss";
import Login from "../components/login/Login";

const deployed = false;

export default function Home() {

  return (
    <div className={styles.app_wrapper}>
      <div className={styles.app_body}>
            <div className={styles.app_banner_top_wrapper}>
              <div className={styles.app_banner_top_wrapper_logo}>
                <img src="/images/straysafelogo.png" alt="straysafe logo" className={styles.app_banner_top_logo}/>
                <img src="/images/straysafetext.png" alt="stray safe text" className={styles.app_banner_top_text}/>
              </div>
              {deployed ? <Login/> : <p style={{margin:"20px", fontSize:"16px"}}> coming soon! </p> }
            </div>
            <div className={styles.app_banner_bottom_wrapper}>
              <img src="/images/loginbannerwidebottomhalf.png" className={styles.app_banner_bottom}/>
            </div>
      </div>
    </div>
  );
}

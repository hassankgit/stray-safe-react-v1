// TODO: add types to the endpoints
"use client";
import styles from "./page.module.scss";
import { api } from "./api"
import Login from "../components/login/Login";

async function fetchToDo() {

const res = await api.admin.allUsers();
  console.log("res:", res);
  console.log("data:", res.data);
}

export default function Home() {

  return (
    <div className={styles.app_wrapper}>
      <div className={styles.app_left}>
            <div className={styles.app_banner_top_wrapper}>
              <img src="/images/straysafetext.png" className={styles.app_banner_top}/>
            </div>
            <div className={styles.app_banner_bottom_wrapper}>
              <img src="/images/loginbannerbottomhalfnobackground.png" className={styles.app_banner_bottom}/>
            </div>
      </div>
      <div className={styles.app_right}>
        <Login />
      </div>
    </div>
  );
}

import { Camera, GlobalSearch, Messages3, ProfileCircle, Warning2 } from "iconsax-reactjs";
import styles from "./MobileNavbar.module.scss";

export default function MobileNavbar() {
    return(
        <div className={styles.navbar_wrapper}>
            <div className={styles.navbar_tabs}>
                <div className={styles.navbar_button_wrapper}>
                    <Warning2 className={styles.button}/>
                </div>
                <div
                    className={styles.navbar_button_wrapper}
                    onClick={() =>  window.location.href = "/home"}    
                >
                    <GlobalSearch className={styles.button}/>
                </div>
                <div className={styles.navbar_button_wrapper_middle}>
                    <Camera className={styles.button}/>
                </div>
                <div className={styles.navbar_button_wrapper}>
                    <Messages3 className={styles.button}/>
                </div>
                <div 
                    className={styles.navbar_button_wrapper}
                    onClick={() =>  window.location.href = "/profile"}
                >
                    <ProfileCircle className={styles.button}/>
                </div>
            </div>
        </div>
    );
}
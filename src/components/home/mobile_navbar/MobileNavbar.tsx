import { Camera, GlobalSearch, Messages3, ProfileCircle, Warning2 } from "iconsax-reactjs";
import styles from "./MobileNavbar.module.scss";

export default function MobileNavbar() {
    return(
        <div className={styles.navbar_wrapper}>
            <div className={styles.navbar_buttons}>
                <Warning2 className={styles.button}/>
                <GlobalSearch className={styles.button}/>
                <div className={styles.navbar_middle}>
                    <Camera className={styles.button}/>
                </div>
                <Messages3 className={styles.button}/>
                <ProfileCircle className={styles.button}/>
            </div>
        </div>
    );
}
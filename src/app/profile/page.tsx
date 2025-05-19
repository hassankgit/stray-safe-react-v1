import styles from "./page.module.scss";
import HomeLayout from "../home/layout";
import { ProfileCircle } from "iconsax-reactjs";
import Heading1 from "@/components/headings/heading1/Heading1";

// TODO:
//      extract avatarcard to component
//      finish

export default function ProfilePage() {
    return(
        <HomeLayout>
            <div className={styles.profile_wrapper}>
                <div className={styles.content}>
                    <div className={styles.body}>
                        <div className={styles.avatar_card}>
                            <ProfileCircle />
                            <div className={styles.name_and_email}>
                                <Heading1 text={"name"}/>
                                <Heading1 text={"testing@straysafe.net"}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.button_wrapper}>

                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
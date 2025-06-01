import { Dialog } from "@base-ui-components/react";
import styles from "./Header.module.scss";
import { LuLogOut } from "react-icons/lu";
import { handleSignOut } from "@/app/api";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft2 } from "iconsax-reactjs";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    "/home/map": "straysafe",
    "/home/upload": "Upload",
    "/home/messages": "Messages",
    "/home/profile": "Profile",
    "/home/sighting": "Sighting",
  };

  const getPageTitle = () => pageTitles[pathname] || "straysafe";
  const showBackButton = getPageTitle() != "straysafe";
  const showLogo = getPageTitle() == "straysafe";

  return (
    <div className={styles.header}>
      <div className={styles.title_and_buttons}>
        <div className={styles.button_wrapper}>
          {showBackButton && (
            <ArrowLeft2
              className={styles.button}
              onClick={() => router.back()}
            />
          )}
        </div>
        <div className={styles.title_logo_wrapper}>
          {showLogo && (
            <img
              src="/images/straysafelogored.png"
              alt="straysafe logo"
              className={styles.logo}
            />
          )}
          <p className={styles.title}>{getPageTitle()}</p>
        </div>
        <div className={styles.button_wrapper}>
          <LuLogOut onClick={handleSignOut} className={styles.button} />
        </div>
      </div>
    </div>
  );
}

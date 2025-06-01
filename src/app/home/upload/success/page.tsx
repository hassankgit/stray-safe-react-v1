"use client";

import { TickCircle } from "iconsax-reactjs";
import styles from "./page.module.scss";
import Heading4 from "@/components/headings/heading4/Heading4";
import ButtonPrimary from "@/components/input/button_primary/ButtonPrimary";
import { useRouter } from "next/navigation";

export default function UploadSuccess() {
  const router = useRouter();
  return (
    <div className={styles.body}>
      <TickCircle className={styles.checkmark} />
      <Heading4 text="Your sighting was successfully submitted. Thank you!" />
      <div className={styles.button_wrapper}>
        <ButtonPrimary
          onClick={() => router.push("/home/upload")}
          label="Submit another sighting"
          className={styles.button}
        />
        <ButtonPrimary
          onClick={() => router.push("/home/map")}
          label="Back to the map"
          className={styles.button}
        />
      </div>
    </div>
  );
}

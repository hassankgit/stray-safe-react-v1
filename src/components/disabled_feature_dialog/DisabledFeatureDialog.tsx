import { Dialog } from "@base-ui-components/react";
import styles from "./DisabledFeatureDialog.module.scss";
import Heading4 from "../headings/heading4/Heading4";
import Heading1 from "../headings/heading1/Heading1";

export default function DisabledFeatureDialog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={styles.header_button_wrapper}>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.Backdrop} />
        <Dialog.Popup className={styles.Popup}>
          <Heading1 text={"Sorry!"} />
          <Heading4
            text={"This feature is currently disabled. Check back soon!"}
          />
          <div className={styles.Actions}>
            <Dialog.Close className={styles.Button}>Close</Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

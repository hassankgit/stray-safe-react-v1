"use client";

import styles from "./Sidebar.module.scss";
import { MdAddAPhoto } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { MdChat } from "react-icons/md";
import SidebarItem from "./item/SidebarItem";

type SidebarProps = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.collapsed}`}
    >
      <div className={styles.sidebar_items}>
        <SidebarItem icon={MdAddAPhoto} isOpen={isOpen} label={"submit"} />
        <SidebarItem icon={IoMdPhotos} isOpen={isOpen} label={"gallery"} />
        <SidebarItem icon={MdChat} isOpen={isOpen} label={"messages"} />
      </div>
    </div>
  );
}

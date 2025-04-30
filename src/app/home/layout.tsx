// TODO: make home dashboard based on figma
// after this is done, can make next release
"use client";

import Header from "@/components/home/header/Header";
import Sidebar from "@/components/home/sidebar/Sidebar";
import styles from "./layout.module.scss";
import { useState } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.header_sidebar_body_wrapper}>
      <Header toggleSidebar={() => setIsSidebarOpen((x) => !x)} />
      <div className={styles.sidebar_body_wrapper}>
        <Sidebar isOpen={isSidebarOpen} />
        <div className={styles.page_body}>{children}</div>
      </div>
    </div>
  );
}

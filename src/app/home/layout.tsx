"use client";

// The sidebar is currently hidden while I'm bugfixing. A lot of these comments
// will be removed in a future update.

import Header from "@/components/home/header/Header";
import styles from "./layout.module.scss";
// import { useState } from "react";
import { useRedirectIfUnauthenticated } from "../hooks/useRedirectIfUnauthenticated";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const authorized = useRedirectIfUnauthenticated();
  if (!authorized) return null;

  const authorized = useRedirectIfUnauthenticated();
  if (!authorized) return null;

  return (
    <div className={styles.header_sidebar_body_wrapper}>
      <Header
      //  toggleSidebar={() => setIsSidebarOpen((x) => !x)}
      />
      <div className={styles.sidebar_body_wrapper}>
        {/* <Sidebar isOpen={isSidebarOpen} /> */}
        <div className={styles.page_body}>{children}</div>
      </div>
    </div>
  );
}

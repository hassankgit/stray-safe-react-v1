// TODO: make home dashboard based on figma
// after this is done, can make next release
"use client";

import Header from "@/components/home/header/Header";
import Sidebar from "@/components/home/sidebar/Sidebar";
import styles from "./layout.module.scss";
import { useState } from "react";
import { useRedirectIfUnauthenticated } from "../hooks/useRedirectIfUnauthenticated";
import SightingDetail from "@/components/home/sighting_details/SightingDetail";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const authorized = useRedirectIfUnauthenticated();
  if (!authorized) return null;

  return (
    <div className={styles.header_sidebar_body_wrapper}>
      <Header toggleSidebar={() => setIsSidebarOpen((x) => !x)} />
      <div className={styles.sidebar_body_wrapper}>
        {/* hiding sidebar for now, bugfixing submitting a sighting
        <Sidebar isOpen={isSidebarOpen} /> */}
        <div className={styles.page_body}>{children}</div>
      </div>
    </div>
  );
}

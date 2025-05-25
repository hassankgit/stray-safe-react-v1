"use client";

import Header from "@/components/home/header/Header";
import styles from "./layout.module.scss";
import { useRedirectIfUnauthenticated } from "../hooks/useRedirectIfUnauthenticated";
import MobileNavbar from "@/components/home/mobile_navbar/MobileNavbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authorized = useRedirectIfUnauthenticated();
  if (!authorized) return null;

  return (
    <div className={styles.page_wrapper}>
      <Header />
      <div className={styles.page_body}>{children}</div>
      <MobileNavbar />
    </div>
  );
}

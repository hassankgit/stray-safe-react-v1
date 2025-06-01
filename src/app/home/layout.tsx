"use client";

// The sidebar is currently hidden while I'm bugfixing. A lot of these comments
// will be removed in a future update.

import Header from "@/components/home/header/Header";
import styles from "./layout.module.scss";
import { useRedirectIfUnauthenticated } from "../hooks/useRedirectIfUnauthenticated";
import MobileNavbar from "@/components/home/mobile_navbar/MobileNavbar";
import { GoogleMapsLoaderProvider } from "../context/GoogleMapsLoaderContext";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authorized = useRedirectIfUnauthenticated();
  if (!authorized) return null;

  return (
    <GoogleMapsLoaderProvider>
      <div className={styles.page_wrapper}>
        <Header />
        <div className={styles.page_body}>{children}</div>
        <MobileNavbar />
      </div>
    </GoogleMapsLoaderProvider>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "straysafe",
  description: "straysafe: in progress! :D",
  icons: [{ url: "images/straysafelogosquare.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="Root">{children}</body>
    </html>
  );
}

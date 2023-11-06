"use client";

import "./globals.css";
import { Poppins } from "next/font/google";

export const metadata = {
  title: "DKSH HR Portal",
  description: "Automation of HR Processes",
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400"
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  )
}

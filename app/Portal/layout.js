"use client";

import styles from "./portal.module.css";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import Sidebar from "./Sidebar";
import sidebarData from "./SidebarData";

export default function PortalLayout({ children }) {
  const { status } = useSession();
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(true);

  if (status === "loading") {
    return <>Loading...</>;
  }

  if (status === "unauthenticated") {
    signIn();
    return <></>;
  }

  return (
    <div className={styles["portal-main"]}>
      <Sidebar show={showSidebar} />
      <div className={styles["portal-content"]}>
        <div className={styles["portal-header"]}>
          <AiOutlineMenu
            className={styles["portal-header-menu"]}
            color="black"
            size="25"
            onClick={() => {
              setShowSidebar(!showSidebar);
            }}
          />
          <div className={styles["portal-header-logo"]}>
            <Image
              src="/dksh_logo.png"
              alt="DKSH Logo"
              fill
              unoptimized
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          {/* <span className={styles["portal-header-title"]}>
            {sidebarData.find((item) => item.title === pathname).title}
          </span> */}
        </div>
        {children}
      </div>
    </div>
  );
}

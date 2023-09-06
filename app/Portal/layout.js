"use client"

import styles from "./portal.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRef, useState, useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
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

  let headerTitle
  for (const menu of sidebarData) {
    if (menu.path) {
      if (menu.path === pathname) {
        headerTitle = menu.title;
        break;
      }
    } else {
      const subMenu = menu.subnav.find(subMenu => subMenu.path === pathname);
      if (subMenu) {
        headerTitle = `${menu.title} - ${subMenu.title}`;
        break;
      }
    }
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
          <span className={styles["portal-header-title"]}>{headerTitle}</span>
        </div>
        {children}
      </div>
    </div>
  );
}
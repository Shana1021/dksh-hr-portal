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

  if (status === "loading") {
    return <>Loading...</>;
  }

  if (status === "unauthenticated") {
    signIn();
    return <></>;
  }

  return <Portal>{children}</Portal>;
}

function Portal({ children }) {
  const pathname = usePathname();
  const windowWidth = useSyncExternalStore(
    callback => {
      window.addEventListener("resize", callback);
      return () => {
        window.removeEventListener("resize", callback);
      };
    },
    () => window.innerWidth,
    () => 0
  );
  const sidebarRef = useRef(null);
  const [sidebarWidth, setSidebarWidth] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    setSidebarWidth(sidebarRef.current.clientWidth);
  }, []);

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
      <Sidebar ref={sidebarRef} show={showSidebar} />
      {sidebarWidth && <div
        className={styles["portal-content"]}
        style={{width: showSidebar ? windowWidth - sidebarWidth : windowWidth}}
      >
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
      </div>}
    </div>
  );
}
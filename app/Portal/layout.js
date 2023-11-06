"use client";

import styles from "./portal.module.css";
import { SessionProvider, useSession } from "next-auth/react";
import { useRef, useState, useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
import Sidebar from "./Sidebar";
import sidebarData from "./SidebarData";
import ReactLoading from "react-loading";

export default function PortalLayout({ children }) {
  return (
    <SessionProvider>
      <PortalLayoutSession>
        {children}
      </PortalLayoutSession>
    </SessionProvider>
  );
}

function PortalLayoutSession({ children }) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className={styles["loading-screen"]}>
        <ReactLoading type="spinningBubbles" height="75px" width="75px" color="#be0028" />
      </div>
    );
  }

  return <Portal>{children}</Portal>;
}

function Portal({ children }) {
  const pathname = usePathname();
  const windowWidth = useSyncExternalStore(
    (callback) => {
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

  let headerTitle;
  for (const menu of sidebarData) {
    if (menu.path) {
      if (menu.path === pathname) {
        headerTitle = menu.title;
        break;
      }
    } else {
      const subMenu = menu.subnav.find((subMenu) => subMenu.path === pathname);
      if (subMenu) {
        headerTitle = `${menu.title} - ${subMenu.title}`;
        break;
      }
    }
  }

  return (
    <div className={styles["portal-main"]}>
      <Sidebar ref={sidebarRef} show={showSidebar} />
      {sidebarWidth && (
        <div
          className={styles["portal-content"]}
          style={{
            width: showSidebar ? windowWidth - sidebarWidth : windowWidth,
          }}
        >
          <div className={styles["portal-header"]}>
            <AiOutlineMenu
              className={styles["portal-header-menu"]}
              color="black"
              size="28"
              onClick={() => {
                setShowSidebar(!showSidebar);
              }}
            />
            <span className={styles["portal-header-title"]}>{headerTitle}</span>
          </div>
          <div className={styles["page-content"]}>{children}</div>
        </div>
      )}
    </div>
  );
}

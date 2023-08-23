import styles from "./sidebar.module.css";
import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import SidebarMenu from "./SidebarMenu";
import SidebarMenuDropdown from "./SidebarMenuDropdown";
import sidebarData from "./SidebarData";

export default function Sidebar({ show }) {
  const [sidebarWidth, setSidebarWidth] = useState(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    setSidebarWidth(sidebarRef.current.clientWidth);
  }, []);

  return (
    <div
      className={`${styles["sidebar-container"]} ${show ? "" : styles["closed"]}`}
      style={sidebarWidth && {width: show ? sidebarWidth : 0}}
    >
      <div
        ref={sidebarRef}
        className={styles["sidebar"]}
        style={{width: sidebarWidth}}
      >
        <div className={styles["sidebar-navigation"]}>
          {sidebarData.map((item, index) =>
            item.subnav ? (
              <SidebarMenuDropdown key={index} item={item} />
            ) : (
              <SidebarMenu key={index} item={item} />
            )
          )}
        </div>
        <button
          className={styles["sidebar-logout"]}
          onClick={() => {
            signOut({ callbackUrl: "/Login" });
          }}
        >
          <BiLogOut size="35" /> Logout
        </button>
      </div>
    </div>
  );
}

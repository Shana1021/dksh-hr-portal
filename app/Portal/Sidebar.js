import styles from "./sidebar.module.css";
import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import SidebarMenu from "./SidebarMenu";
import SidebarMenuDropdown from "./SidebarMenuDropdown";
import sidebarData from "./SidebarData";
import Image from "next/image";
export default forwardRef(function Sidebar({ show }, ref) {
  const [sidebarWidth, setSidebarWidth] = useState(null);
  const sidebarRef = useRef(null);

  useImperativeHandle(ref, () => sidebarRef.current);

  useEffect(() => {
    setSidebarWidth(sidebarRef.current.clientWidth);
  }, []);

  return (
    <div
      className={styles["sidebar-container"]}
      style={sidebarWidth && { width: show ? sidebarWidth : 0 }}
    >
      {/* <div className={styles["portal-header-logo"]}>
        <Image
          src="/dksh_logo.png"
          alt="DKSH Logo"
          fill
          unoptimized
          style={{ objectFit: "contain" }}
          priority
        />
      </div> */}

      <div
        ref={sidebarRef}
        className={styles["sidebar"]}
        style={{ width: sidebarWidth }}
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
});

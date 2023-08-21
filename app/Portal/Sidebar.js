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
      className={`sidebar-container ${show ? "" : "closed"}`}
      style={sidebarWidth && {width: show ? sidebarWidth : 0}}
    >
      <div
        ref={sidebarRef}
        className="sidebar"
        style={{width: sidebarWidth}}
      >
        <div className="sidebar-navigation">
          {sidebarData.map((item, index) =>
            item.subnav ? (
              <SidebarMenuDropdown key={index} item={item} />
            ) : (
              <SidebarMenu key={index} item={item} />
            )
          )}
        </div>
        <button
          className="sidebar-logout"
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

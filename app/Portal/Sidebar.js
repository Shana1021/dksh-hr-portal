import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import SidebarMenu from "./SidebarMenu";
import SidebarMenuDropdown from "./SidebarMenuDropdown";
import sidebarData from "./sidebarData";

export default function Sidebar({ show }) {
  return (
    <div className={`sidebar-container ${show ? "" : "closed"}`}>
      <div className="sidebar">
        <div className="sidebar-navigation">
          {sidebarData.map((item, index) => item.subnav ? (
            <SidebarMenuDropdown key={index} item={item} />
          ) : (
            <SidebarMenu key={index} item={item} />
          ))}
        </div>
        <button
          className="sidebar-logout"
          onClick={() => { signOut({callbackUrl: "/Login"}); }}
        >
          <BiLogOut size="35" /> Logout
        </button>
      </div>
    </div>
  );
}

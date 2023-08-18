import SidebarMenu from "./SidebarMenu";
import SidebarMenuDropdown from "./SidebarMenuDropdown";
import sidebarData from "./sidebarData";

export default function Sidebar({ show }) {
  return (
    <div className={`sidebar-container ${show ? "" : "closed"}`}>
      <div className="sidebar">
        {sidebarData.map((item, index) => item.subnav ? (
          <SidebarMenuDropdown key={index} item={item} />
        ) : (
          <SidebarMenu key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

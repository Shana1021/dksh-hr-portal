import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import SidebarMenu from "./SidebarMenu";

export default function SidebarMenuDropdown({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarContentHeight, setSidebarContentHeight] = useState(null);
  const sidebarContentRef = useRef(null);

  useEffect(() => {
    setSidebarContentHeight(sidebarContentRef.current.clientHeight);
  }, []);

  return (
    <div className="sidebar-menu">
      <div className="sidebar-title">
        <button onClick={() => { setIsOpen(!isOpen); }}>
          {item.icon}
          {item.title}
          <FaAngleDown className={`sidebar-menu-arrow ${isOpen ? "open" : ""}`} />
        </button>
      </div>
      <div
        ref={sidebarContentRef}
        className="sidebar-content"
        style={sidebarContentHeight && {height: isOpen ? sidebarContentHeight : 0}}
      >
        {item.subnav.map((subItem, index) => (
          <SidebarMenu key={index} item={subItem} />
        ))}
      </div>
    </div>
  );
}
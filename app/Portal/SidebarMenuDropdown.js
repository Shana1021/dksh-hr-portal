import styles from "./sidebar.module.css";
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
    <div className={styles["sidebar-menu"]}>
      <div className={styles["sidebar-title"]}>
        <button onClick={() => { setIsOpen(!isOpen); }}>
          <span className={styles["sidebar-menu-icon"]}>{item.icon}</span>
          {item.title}
          <FaAngleDown className={`${styles["sidebar-menu-arrow"]} ${isOpen ? styles["open"] : ""}`} />
        </button>
      </div>
      <div
        ref={sidebarContentRef}
        className={styles["sidebar-content"]}
        style={sidebarContentHeight && {height: isOpen ? sidebarContentHeight : 0}}
      >
        {item.subnav.map((subItem, index) => (
          <SidebarMenu key={index} item={subItem} />
        ))}
      </div>
    </div>
  );
}
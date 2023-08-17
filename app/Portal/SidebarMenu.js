import React from "react";
import { FaRegChartBar } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { useState } from "react";

export default function SidebarMenu({ item }) {
  const { open, setOpen } = useState(true);

  if (item.title === "Log Out") {
    return (
      <a href={item.path || "#"} className="sidebar-menu">
        <span className="test">
          {item.icon}
          {item.title}
        </span>
      </a>
    );
  }

  if (item.subnav) {
    return (
      <div className={open ? "sidebar-menu2" : "sidebar-menu"}>
        <div className="sidebar-title">
          <span className="test">
            {item.icon}
            {item.title}
            <FaArrowDown
              className="icon"
              id="toggle-btn"
              onClick={() => setOpen(!open)}
            />
          </span>
        </div>
        <div className="sidebar-content"></div>
      </div>
    );
  } else {
    return (
      <a href={item.path || "#"} className="sidebar-menu">
        <span className="test">
          {item.icon}
          {item.title}
        </span>
      </a>
    );
  }
}

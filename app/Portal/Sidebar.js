"use client";

import "./Sidebar.css";
import SidebarMenu from "./SidebarMenu";
import { SidebarData } from "./SidebarData";

export default function Sidebar() {
  return (
    <div className="sidebar">
      {SidebarData.map((item, index) => (
        <SidebarMenu key={index} item={item} />
      ))}
    </div>
  );
}

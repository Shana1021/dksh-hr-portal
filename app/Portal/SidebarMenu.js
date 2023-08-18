import React from "react";
import Link from "next/link";

export default function SidebarMenu({ item }) {
  return (
    <div className="sidebar-menu">
      <div className="sidebar-title">
        <Link href={item.path}>
          {item.icon}
          {item.title}
        </Link>
      </div>
    </div>
  );
}

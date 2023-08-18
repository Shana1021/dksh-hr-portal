import React from "react";
import Link from "next/link";

export default function SidebarMenu({ item }) {
  return (
    <div className="sidebar-menu">
      <div className="sidebar-title">
        <Link href={item.path}>
          {item.icon || <div className="icon" />}
          {item.title}
        </Link>
      </div>
    </div>
  );
}

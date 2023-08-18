"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import Sidebar from "./Sidebar";
import sidebarData from "./sidebarData";
import "./portal.css";

export default function PortalLayout({ children }) {
  const { status } = useSession();
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(true);

  if (status === "loading") {
    return <>Loading...</>;
  }

  if (status === "unauthenticated") {
    signIn();
    return <></>;
  }

  return (
    <div className="portal-main">
      <Sidebar show={showSidebar} />
      <div className="portal-content">
        <div className="portal-header">
          <AiOutlineMenu
            className="portal-header-menu"
            color="black"
            size="25"
            onClick={() => { setShowSidebar(!showSidebar); }}
          />
          <div className="portal-header-logo">
            <Image
              src="/dksh_logo.png"
              alt="DKSH Logo"
              fill
              unoptimized
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <span className="portal-header-title">
            {sidebarData.find(item => item.path === pathname).title}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
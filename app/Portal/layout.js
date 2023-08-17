"use client";

import { signIn, useSession } from "next-auth/react";
import Sidebar from "./Sidebar";
import "./Portal.css";

export default function PortalLayout({ children }) {
  const { status } = useSession();

  if (status === "loading") {
    return <>Loading...</>;
  }

  if (status === "unauthenticated") {
    signIn();
    return <></>;
  }

  return (
    <div className="main">
      <Sidebar />
      {children}
    </div>
  );
}
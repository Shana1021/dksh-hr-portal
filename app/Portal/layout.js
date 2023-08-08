"use client";

import { signIn, useSession } from "next-auth/react";

export default function PortalLayout({ children }) {
  const { status } = useSession();

  if (status === "unauthenticated") {
    signIn();
    return <></>;
  }

  return children;
}
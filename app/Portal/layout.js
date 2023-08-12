"use client";

import { signIn, useSession } from "next-auth/react";

export default function AuthGuard({ children }) {
  const { status } = useSession();

  if (status === "loading") {
    return <>Loading...</>;
  }

  if (status === "unauthenticated") {
    signIn();
    return <></>;
  }

  return children;
}
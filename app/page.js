"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Index() {
  const { status } = useSession();

  if (status === "loading") {
    return <></>;
  }
  
  if (status === "unauthenticated") {
    redirect("/Login");
  }

  redirect("/Dashboard");
}
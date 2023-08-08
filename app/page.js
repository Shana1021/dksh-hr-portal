"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Index() {
  const { status } = useSession();
  
  if (status === "unauthenticated") {
    redirect("/Login");
  }

  redirect("/Portal/Dashboard");
}
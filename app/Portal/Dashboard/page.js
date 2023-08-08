"use client";

import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession();

  console.log(session);
  console.log(status);

  return (
    <h1>Dashboard</h1>
  )
}

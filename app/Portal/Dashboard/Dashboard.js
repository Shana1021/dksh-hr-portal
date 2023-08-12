"use client";

import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  console.log(session.user);

  return (
    <>
      <h1>Dashboard</h1>
      ID: {session.user._id}
      <br />
      <button onClick={() => signOut({callbackUrl: "/Login"})}>Test sign out button</button>
    </>
  );
}

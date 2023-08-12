"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <>Loading...</>;
  }
  
  if (status === "unauthenticated") {
    signIn();
    return <></>;
  }

  return (
    <>
      <h1>Dashboard</h1>
      ID: {session.user._id}
      <br />
      <button onClick={() => signOut({callbackUrl: "/Login"})}>Test sign out button</button>
    </>
  );
}

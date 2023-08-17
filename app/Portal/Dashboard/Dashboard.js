"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

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
    <div className="container">
      <h1 className="header">Container</h1>
      <p className="content">content</p>
      <h1>Dashboard</h1>
      ID: {session.user._id}
      <br />
      <button onClick={() => signOut({ callbackUrl: "/Login" })}>
        Test sign out button
      </button>
      <button>
        <Link href="/Portal/HR-List">Hr List</Link>
      </button>
      <button>
        <Link href="/Portal/Settings">Settings</Link>
      </button>
    </div>
  );
}

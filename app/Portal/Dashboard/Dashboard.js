"use client";

import "./dashboard.css"
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="container">
      <h1 className="header">Container</h1>
      <p className="content">content</p>
      <h1>Dashboard</h1>
      ID: {session.user._id}
      <br />
    </div>
  );
}

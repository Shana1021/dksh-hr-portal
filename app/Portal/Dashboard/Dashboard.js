"use client";
import "./dashboard.css";
import { useSession } from "next-auth/react";

export default function Dashboard({ data }) {
  const { data: session, status } = useSession();

  console.log(session);
  console.log(status);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Fetched data:</p>
      <ul>
        {data.map((d) => (
          <li key={d.id}>{d.test}</li>
        ))}
      </ul>
    </>
  );
}

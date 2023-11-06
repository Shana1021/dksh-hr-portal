import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  console.log("Daily cron is running...");

  const client = await clientPromise;
  const db = await client.db();

  const cutOffDate = new Date();
  cutOffDate.setHours(0, 0, 0, 0);
  cutOffDate.setDate(cutOffDate.getDate() - 90);

  await db.collection("probationary").updateMany(
    { completed: false, createdAt: { $lt: cutOffDate } },
    {
      $set: {
        completed: true
      }
    }
  );

  return NextResponse.json({ status: "success" });
}
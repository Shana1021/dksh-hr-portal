import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();

  const client = await clientPromise;
  const db = await client.db();
  
  if (await db.collection("probationary").countDocuments({ _id: formData.get("_id") }, { limit: 1 }) === 0) {
    return NextResponse.json({ status: "idDoesNotExist"});
  }

  if (await db.collection("resignation_requests").countDocuments({ _id: formData.get("_id") }, { limit: 1 }) > 0) {
    return NextResponse.json({ status: "alreadyResigned" });
  }

  await Promise.all([
    db.collection("resignation_requests").updateOne(
      { _id: formData.get("_id") },
      {
        $set: {
          reason: formData.get("reason")
        },
        $currentDate: { createdAt: true }
      },
      { upsert: true }
    ),
    db.collection("onboarding_checklists").updateOne(
      { _id: formData.get("_id") },
      {
        $set: {
          completed: true
        }
      }
    )
  ]);

  return NextResponse.json({ status: "success" });
}
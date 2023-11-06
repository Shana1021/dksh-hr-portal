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
    return NextResponse.json({ status: "requestExists" });
  }

  if (await db.collection("accepted_resignations").countDocuments({ employeeId: formData.get("_id") }, { limit: 1 }) > 0) {
    return NextResponse.json({ status: "alreadyResigned" });
  }

  await db.collection("resignation_requests").insertOne({
    _id: formData.get("_id"),
    reason: formData.get("reason"),
    createdAt: new Date()
  });

  return NextResponse.json({ status: "success" });
}
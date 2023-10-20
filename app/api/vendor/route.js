import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();

  const client = await clientPromise;
  const db = await client.db();
  
  const [vendorCount, trainingCount] = await Promise.all([
    db.collection("vendors").countDocuments({ _id: formData.get("_id") }),
    db.collection("trainings").countDocuments({ "vendor._id": formData.get("_id") })
  ]);

  if (vendorCount > 0 || trainingCount > 0) {
    return NextResponse.json({ status: "vendorCodeAlreadyExists" });
  }

  await db.collection("vendors").insertOne({
    _id: formData.get("_id"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    createdAt: new Date()
  });

  return NextResponse.json({ status: "success" });
}